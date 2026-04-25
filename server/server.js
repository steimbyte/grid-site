/**
 * Site Grid Server
 * A beautiful HTML site manager with user authentication
 * 
 * Built with: Express, JWT, bcryptjs
 */

import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ═══════════════════════════════════════════════════════════════════
// Configuration
// ═══════════════════════════════════════════════════════════════════
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
  port: parseInt(process.env.PORT || '3000'),
  jwtSecret: process.env.JWT_SECRET || randomUUID(),
  jwtExpiresIn: '7d',
  saltRounds: 12,
  sitesDir: process.env.SITES_DIR || '/sites',
  usersDir: process.env.USERS_DIR || '/users',
  frontendUrl: process.env.FRONTEND_URL || ''
};

// Settings Manager
class SettingsManager {
  static #settingsFile = join(CONFIG.usersDir, 'settings.json');

  static #loadSettings() {
    if (!existsSync(this.#settingsFile)) return { uploadsEnabled: false, userSettings: {} };
    try { return JSON.parse(readFileSync(this.#settingsFile, 'utf-8')); }
    catch { return { uploadsEnabled: false, userSettings: {} }; }
  }

  static #saveSettings(data) {
    writeFileSync(this.#settingsFile, JSON.stringify(data, null, 2));
  }

  // Global uploads setting
  static isUploadsEnabled() {
    return this.#loadSettings().uploadsEnabled !== false;
  }

  static setUploadsEnabled(enabled) {
    const settings = this.#loadSettings();
    settings.uploadsEnabled = enabled;
    this.#saveSettings(settings);
  }

  // Per-user uploads setting (null = use global, true/false = override)
  static canUserUpload(userId) {
    const settings = this.#loadSettings();
    // Per-user check takes priority
    if (settings.userSettings && settings.userSettings[userId] !== undefined) {
      return settings.userSettings[userId];
    }
    // Fall back to global setting
    return settings.uploadsEnabled === true;
  }

  static setUserUpload(userId, enabled) {
    const settings = this.#loadSettings();
    if (!settings.userSettings) settings.userSettings = {};
    settings.userSettings[userId] = enabled;
    this.#saveSettings(settings);
  }

  static getSettings() {
    return this.#loadSettings();
  }

  static updateSettings(updates) {
    const settings = { ...this.#loadSettings(), ...updates };
    this.#saveSettings(settings);
    return settings;
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log('  Site Grid Server');
console.log('═══════════════════════════════════════════════════════');

// Ensure directories
[CONFIG.sitesDir, join(CONFIG.sitesDir, 'thumbnails'), CONFIG.usersDir].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

// ═══════════════════════════════════════════════════════════════════
// User Manager
// ═══════════════════════════════════════════════════════════════════
class UserManager {
  static #usersFile = join(CONFIG.usersDir, 'users.json');

  static #loadData() {
    if (!existsSync(this.#usersFile)) return { users: [] };
    try { return JSON.parse(readFileSync(this.#usersFile, 'utf-8')); }
    catch { return { users: [] }; }
  }

  static #saveData(data) {
    writeFileSync(this.#usersFile, JSON.stringify(data, null, 2));
  }

  static #sanitizeUser(user) {
    const { password, ...safe } = user;
    return safe;
  }

  static async createUser({ username, password, role = 'user' }) {
    const data = this.#loadData();
    if (!username || username.length < 2 || username.length > 20) throw new Error('Username must be 2-20 characters');
    if (!password || password.length < 3) throw new Error('Password must be at least 3 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username can only contain letters, numbers, and underscores');
    if (data.users.find(u => u.username.toLowerCase() === username.toLowerCase())) throw new Error('Username already exists');

    const hashedPassword = await bcrypt.hash(password, CONFIG.saltRounds);
    const user = { id: randomUUID(), username: username.trim(), password: hashedPassword, role, visits: 0, createdAt: new Date().toISOString(), lastVisit: null };
    data.users.push(user);
    this.#saveData(data);
    console.log(`✓ User created: ${user.username} (${role})`);
    return this.#sanitizeUser(user);
  }

  static async verifyUser({ username, password }) {
    const data = this.#loadData();
    const user = data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    user.visits = (user.visits || 0) + 1;
    user.lastVisit = new Date().toISOString();
    this.#saveData(data);
    return this.#sanitizeUser(user);
  }

  static getUsers() { return this.#loadData().users.map(u => this.#sanitizeUser(u)); }
  static getUser(id) { const user = this.#loadData().users.find(u => u.id === id); return user ? this.#sanitizeUser(user) : null; }

  static async updateUser(id, updates, callerRole = 'user') {
    const data = this.#loadData();
    const idx = data.users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    
    // Only admin can change password or role
    if (updates.password && callerRole !== 'admin') throw new Error('Forbidden');
    if (updates.role && callerRole !== 'admin') throw new Error('Forbidden');
    
    // Hash password if provided
    if (updates.password) updates.password = await bcrypt.hash(updates.password, CONFIG.saltRounds);
    
    // Validate username
    if (updates.username && !/^[a-zA-Z0-9_]+$/.test(updates.username)) throw new Error('Invalid username');
    
    // Allowed fields only
    const allowed = ['username', 'password'];
    if (callerRole === 'admin') allowed.push('role', 'visits');
    
    const sanitized = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) sanitized[key] = updates[key];
    }
    
    data.users[idx] = { ...data.users[idx], ...sanitized, updatedAt: new Date().toISOString() };
    this.#saveData(data);
    return this.#sanitizeUser(data.users[idx]);
  }

  static deleteUser(id) {
    const data = this.#loadData();
    const user = data.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    if (user.role === 'admin' && data.users.filter(u => u.role === 'admin').length === 1) throw new Error('Cannot delete last admin');
    data.users = data.users.filter(u => u.id !== id);
    this.#saveData(data);
    return true;
  }

  static getLeaderboard(limit = 10) {
    return this.#loadData().users
      .map(u => ({ username: u.username, visits: u.visits || 0, role: u.role }))
      .sort((a, b) => b.visits - a.visits).slice(0, limit);
  }

  static async initializeAdmin() {
    const data = this.#loadData();
    if (!data.users.find(u => u.role === 'admin')) {
      console.log('  Creating default admin...');
      await this.createUser({ username: process.env.ADMIN_USERNAME || 'admin', password: process.env.ADMIN_PASSWORD || 'admin', role: 'admin' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// Stats Manager
// ═══════════════════════════════════════════════════════════════════
class StatsManager {
  static #statsFile = join(CONFIG.usersDir, 'stats.json');

  static #loadStats() {
    if (!existsSync(this.#statsFile)) return { totalLogins: 0, siteViews: {}, createdAt: new Date().toISOString() };
    try { return JSON.parse(readFileSync(this.#statsFile, 'utf-8')); }
    catch { return { totalLogins: 0, siteViews: {}, createdAt: new Date().toISOString() }; }
  }

  static #saveStats(data) { writeFileSync(this.#statsFile, JSON.stringify(data, null, 2)); }
  static recordLogin() { const s = this.#loadStats(); s.totalLogins = (s.totalLogins || 0) + 1; this.#saveStats(s); }
  static recordSiteView(id) { const s = this.#loadStats(); s.siteViews[id] = (s.siteViews[id] || 0) + 1; this.#saveStats(s); }

  static getStats() {
    const s = this.#loadStats();
    return { totalLogins: s.totalLogins || 0, totalUsers: UserManager.getUsers().length, totalSites: readdirSync(CONFIG.sitesDir).filter(f => f.endsWith('.json')).length, siteViews: s.siteViews || {} };
  }
}

// ═══════════════════════════════════════════════════════════════════
// Tags Manager
// ═══════════════════════════════════════════════════════════════════
class TagsManager {
  static #tagsFile = join(CONFIG.usersDir, 'tags.json');

  static #loadTags() {
    if (!existsSync(this.#tagsFile)) return { tags: [], siteTags: {} };
    try { return JSON.parse(readFileSync(this.#tagsFile, 'utf-8')); }
    catch { return { tags: [], siteTags: {} }; }
  }

  static #saveTags(data) { writeFileSync(this.#tagsFile, JSON.stringify(data, null, 2)); }

  static getTags() { return this.#loadTags().tags; }
  
  static addTag(name, color) {
    const data = this.#loadTags();
    if (data.tags.find(t => t.name.toLowerCase() === name.toLowerCase())) throw new Error('Tag exists');
    data.tags.push({ id: randomUUID(), name, color });
    this.#saveTags(data);
    return data.tags;
  }

  static deleteTag(id) {
    const data = this.#loadTags();
    data.tags = data.tags.filter(t => t.id !== id);
    delete data.siteTags[id];
    this.#saveTags(data);
    return data.tags;
  }

  static setSiteTag(siteId, tagIds) {
    const data = this.#loadTags();
    data.siteTags[siteId] = tagIds;
    this.#saveTags(data);
  }

  static getSiteTags(siteId) {
    const data = this.#loadTags();
    return data.siteTags[siteId] || [];
  }

  static getTagsForSite(siteId) {
    const data = this.#loadTags();
    const tagIds = data.siteTags[siteId] || [];
    return data.tags.filter(t => tagIds.includes(t.id));
  }
}

// ═══════════════════════════════════════════════════════════════════
// JWT Auth
// ═══════════════════════════════════════════════════════════════════
function generateToken(user) { return jwt.sign({ userId: user.id, username: user.username, role: user.role }, CONFIG.jwtSecret, { expiresIn: CONFIG.jwtExpiresIn }); }
function verifyToken(token) { try { return jwt.verify(token, CONFIG.jwtSecret); } catch { return null; } }
function authMiddleware(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });
    if (roles.length && !roles.includes(decoded.role)) return res.status(403).json({ error: 'Insufficient permissions' });
    req.user = decoded; next();
  };
}

// ═══════════════════════════════════════════════════════════════════
// Express App
// ═══════════════════════════════════════════════════════════════════
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try { const { username, password } = req.body; if (!username || !password) return res.status(400).json({ error: 'Required' }); const user = await UserManager.createUser({ username, password }); res.status(201).json({ token: generateToken(user), ...user }); }
  catch (err) { res.status(400).json({ error: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try { const { username, password } = req.body; if (!username || !password) return res.status(400).json({ error: 'Required' }); const user = await UserManager.verifyUser({ username, password }); if (!user) return res.status(401).json({ error: 'Invalid credentials' }); StatsManager.recordLogin(); res.json({ token: generateToken(user), ...user }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/logout', (req, res) => res.json({ success: true }));
app.get('/api/auth/me', authMiddleware(), (req, res) => res.json(req.user));

// Admin Routes
app.get('/api/admin/users', authMiddleware(['admin']), (req, res) => res.json(UserManager.getUsers()));
app.get('/api/admin/users/:id', authMiddleware(['admin']), (req, res) => { const u = UserManager.getUser(req.params.id); if (!u) return res.status(404).json({ error: 'Not found' }); res.json(u); });
app.put('/api/admin/users/:id', authMiddleware(['admin']), async (req, res) => { try { res.json(await UserManager.updateUser(req.params.id, req.body, req.user.role)); } catch (err) { res.status(400).json({ error: err.message }); } });
app.delete('/api/admin/users/:id', authMiddleware(['admin']), (req, res) => { try { UserManager.deleteUser(req.params.id); res.json({ success: true }); } catch (err) { res.status(400).json({ error: err.message }); } });

// Stats & Leaderboard
app.get('/api/stats', authMiddleware(), (req, res) => res.json(StatsManager.getStats()));
app.get('/api/leaderboard', authMiddleware(), (req, res) => res.json(UserManager.getLeaderboard(parseInt(req.query.limit) || 10)));

// Tags
app.get('/api/tags', (req, res) => res.json(TagsManager.getTags()));
app.post('/api/tags', authMiddleware(['admin']), (req, res) => { try { res.json(TagsManager.addTag(req.body.name, req.body.color)); } catch (err) { res.status(400).json({ error: err.message }); } });
app.delete('/api/tags/:id', authMiddleware(['admin']), (req, res) => { try { res.json(TagsManager.deleteTag(req.params.id)); } catch (err) { res.status(400).json({ error: err.message }); } });

// Sites
app.get('/api/sites', authMiddleware(), (req, res) => {
  try {
    const stats = StatsManager.getStats();
    const sites = readdirSync(CONFIG.sitesDir).filter(f => f.endsWith('.json')).map(f => {
      try {
        const content = readFileSync(join(CONFIG.sitesDir, f), 'utf-8');
        const site = JSON.parse(content);
        const tags = TagsManager.getTagsForSite(site.id);
        return { id: site.id, name: site.name, uploadedAt: site.uploadedAt, uploadedBy: site.uploadedBy, views: stats.siteViews[site.id] || 0, tags, icon: site.icon };
      } catch { return null; }
    }).filter(Boolean).sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(sites);
  } catch { res.json([]); }
});

app.get('/api/sites/:id', authMiddleware(), (req, res) => {
  try {
    const filename = join(CONFIG.sitesDir, `${req.params.id}.json`);
    if (!existsSync(filename)) return res.status(404).json({ error: 'Not found' });
    StatsManager.recordSiteView(req.params.id);
    const site = JSON.parse(readFileSync(filename, 'utf-8'));
    site.tags = TagsManager.getTagsForSite(req.params.id);
    res.json(site);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/sites', authMiddleware(), (req, res) => {
  try {
    // Admin can always upload
    if (req.user.role !== 'admin') {
      // Check global setting
      if (!SettingsManager.isUploadsEnabled()) {
        return res.status(403).json({ error: 'Uploads are globally disabled' });
      }
      // Check per-user setting
      if (!SettingsManager.canUserUpload(req.user.userId)) {
        return res.status(403).json({ error: 'Uploads are disabled for your account' });
      }
    }
    const { name, content, tags } = req.body;
    if (!name || !content) return res.status(400).json({ error: 'Name and content required' });
    const id = randomUUID();
    // Sanitize name to prevent XSS
    const sanitizeHtml = (str) => str.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
    const site = { id, name: sanitizeHtml(name.trim()), content, uploadedAt: new Date().toISOString(), uploadedBy: req.user.username, order: Date.now(), icon: req.body.icon?.replace(/[^a-z0-9-]/gi, '') || 'file' };
    writeFileSync(join(CONFIG.sitesDir, `${id}.json`), JSON.stringify(site, null, 2));
    writeFileSync(join(CONFIG.sitesDir, `${id}.html`), content);
    if (tags && tags.length) TagsManager.setSiteTag(id, tags);
    console.log(`✓ Site uploaded: ${site.name}`);
    res.status(201).json({ success: true, id, name: site.name });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/sites/:id', authMiddleware(), (req, res) => {
  try {
    const filename = join(CONFIG.sitesDir, `${req.params.id}.json`);
    if (!existsSync(filename)) return res.status(404).json({ error: 'Not found' });
    const site = JSON.parse(readFileSync(filename, 'utf-8'));
    if (site.uploadedBy !== req.user.username && req.user.role !== 'admin') return res.status(403).json({ error: 'Not allowed' });
    const updated = { ...site, ...req.body, id: site.id, updatedAt: new Date().toISOString() };
    writeFileSync(filename, JSON.stringify(updated, null, 2));
    if (req.body.content) writeFileSync(join(CONFIG.sitesDir, `${site.id}.html`), req.body.content);
    if (req.body.tags !== undefined) TagsManager.setSiteTag(site.id, req.body.tags);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/sites/:id/order', authMiddleware(), (req, res) => {
  try {
    const filename = join(CONFIG.sitesDir, `${req.params.id}.json`);
    if (!existsSync(filename)) return res.status(404).json({ error: 'Not found' });
    const site = JSON.parse(readFileSync(filename, 'utf-8'));
    site.order = req.body.order || 0;
    writeFileSync(filename, JSON.stringify(site, null, 2));
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/sites/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const id = req.params.id;
    ['.json', '.html'].forEach(ext => { const f = join(CONFIG.sitesDir, `${id}${ext}`); if (existsSync(f)) unlinkSync(f); });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Export ZIP
app.get('/api/export', authMiddleware(), (req, res) => {
  try {
    const files = readdirSync(CONFIG.sitesDir).filter(f => f.endsWith('.html'));
    res.attachment('sites.txt');
    let content = files.map(f => `=== ${f} ===\n${readFileSync(join(CONFIG.sitesDir, f), 'utf-8')}`).join('\n\n');
    res.send(content);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Static (auth protected)
app.get('/api/thumbnails/:id', authMiddleware(), (req, res) => {
  const f = join(CONFIG.sitesDir, 'thumbnails', `${req.params.id}.png`);
  existsSync(f) ? res.type('image/png').sendFile(f) : res.status(404).json({ error: 'Not found' });
});

app.get('/sites/:id', authMiddleware(), (req, res) => {
  const f = join(CONFIG.sitesDir, `${req.params.id}.html`);
  existsSync(f) ? res.type('text/html').sendFile(f) : res.status(404).send('Not found');
});

// Config (no auth needed, only public info)
app.get('/api/config', (req, res) => {
  const url = CONFIG.frontendUrl || req.protocol + '://' + req.get('host');
  // Remove trailing slash to avoid double slashes when client adds /api
  res.json({ frontendUrl: url.replace(/\/$/, '') });
});

// Settings (admin only)
app.get('/api/settings', authMiddleware(['admin']), (req, res) => res.json(SettingsManager.getSettings()));
app.put('/api/settings', authMiddleware(['admin']), (req, res) => {
  try { res.json(SettingsManager.updateSettings(req.body)); }
  catch (err) { res.status(400).json({ error: err.message }); }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Start
async function start() {
  await UserManager.initializeAdmin();
  app.listen(CONFIG.port, '0.0.0.0', () => {
    console.log(`✓ Running on http://localhost:${CONFIG.port}`);
    console.log(`  Admin: ${process.env.ADMIN_USERNAME || 'admin'} / ${process.env.ADMIN_PASSWORD || 'admin'}\n`);
  });
}
start().catch(console.error);
