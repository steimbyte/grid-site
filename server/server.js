import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SITES_DIR = process.env.SITES_DIR || '/sites';
const USERS_DIR = process.env.USERS_DIR || '/users';
const THUMBNAILS_DIR = join(SITES_DIR, 'thumbnails');

// Auth config from env
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SESSION_SECRET = process.env.SESSION_SECRET || randomUUID();

// In-memory sessions
const sessions = new Map();

console.log('Auth config:');
console.log(`  Admin password: ${ADMIN_PASSWORD.substring(0, 2)}***`);
console.log(`  Users directory: ${USERS_DIR}`);

// Ensure directories exist
if (!existsSync(SITES_DIR)) mkdirSync(SITES_DIR, { recursive: true });
if (!existsSync(THUMBNAILS_DIR)) mkdirSync(THUMBNAILS_DIR, { recursive: true });
if (!existsSync(USERS_DIR)) mkdirSync(USERS_DIR, { recursive: true });

// Users file
const USERS_FILE = join(USERS_DIR, 'users.json');

function loadUsers() {
  if (!existsSync(USERS_FILE)) {
    return { users: [], visits: {} };
  }
  try {
    return JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
  } catch {
    return { users: [], visits: {} };
  }
}

function saveUsers(data) {
  writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function getUsers() {
  return loadUsers();
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Simple auth middleware
function requireAuth(minLevel = 'guest') {
  return (req, res, next) => {
    const token = req.headers['x-auth-token'];
    const session = token ? sessions.get(token) : null;
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const levels = { guest: 1, admin: 2 };
    if (levels[session.role] < levels[minLevel]) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    req.session = session;
    next();
  };
}

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Auth Routes

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  if (username.length < 2 || username.length > 20) {
    return res.status(400).json({ error: 'Username must be 2-20 characters' });
  }
  
  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters' });
  }
  
  const data = getUsers();
  
  // Check if username exists
  if (data.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(409).json({ error: 'Username already taken' });
  }
  
  // Create user
  const user = {
    id: randomUUID(),
    username: username.trim(),
    password: password, // In production, hash this!
    role: 'guest',
    createdAt: new Date().toISOString()
  };
  
  data.users.push(user);
  data.visits[user.id] = 0;
  saveUsers(data);
  
  // Auto-login
  const token = randomUUID();
  sessions.set(token, { 
    userId: user.id, 
    username: user.username, 
    role: user.role, 
    createdAt: Date.now() 
  });
  
  res.json({ token, role: user.role, username: user.username });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  const data = getUsers();
  const user = data.users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Track visit
  data.visits[user.id] = (data.visits[user.id] || 0) + 1;
  saveUsers(data);
  
  const token = randomUUID();
  sessions.set(token, { 
    userId: user.id, 
    username: user.username, 
    role: user.role, 
    createdAt: Date.now() 
  });
  
  res.json({ token, role: user.role, username: user.username });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const token = req.headers['x-auth-token'];
  if (token) sessions.delete(token);
  res.json({ success: true });
});

// Check session
app.get('/api/auth/me', requireAuth(), (req, res) => {
  res.json({ 
    role: req.session.role, 
    username: req.session.username,
    userId: req.session.userId 
  });
});

// Leaderboard
app.get('/api/leaderboard', (req, res) => {
  const data = getUsers();
  const leaderboard = data.users
    .map(u => ({
      username: u.username,
      visits: data.visits[u.id] || 0,
      role: u.role,
      lastVisit: u.lastVisit || null
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10); // Top 10
  
  res.json(leaderboard);
});

// API Routes

// Get all sites (auth required)
app.get('/api/sites', requireAuth('guest'), (req, res) => {
  try {
    const files = readdirSync(SITES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const content = readFileSync(join(SITES_DIR, f), 'utf-8');
        const site = JSON.parse(content);
        return {
          id: site.id,
          name: site.name,
          uploadedAt: site.uploadedAt
        };
      })
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    res.json(files);
  } catch (err) {
    console.error('Error reading sites:', err);
    res.json([]);
  }
});

// Get single site with content
app.get('/api/sites/:id', requireAuth('guest'), (req, res) => {
  try {
    const filename = join(SITES_DIR, `${req.params.id}.json`);
    if (!existsSync(filename)) {
      return res.status(404).json({ error: 'Not found' });
    }
    const site = JSON.parse(readFileSync(filename, 'utf-8'));
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a site (auth required)
app.post('/api/sites', requireAuth('guest'), (req, res) => {
  try {
    const { name, content } = req.body;
    
    if (!name || !content) {
      return res.status(400).json({ error: 'Name and content required' });
    }
    
    const id = randomUUID();
    
    const site = {
      id,
      name,
      content,
      uploadedAt: new Date().toISOString()
    };
    
    writeFileSync(join(SITES_DIR, `${id}.json`), JSON.stringify(site, null, 2));
    writeFileSync(join(SITES_DIR, `${id}.html`), content);
    
    res.json({ success: true, id, name });
  } catch (err) {
    console.error('Error saving site:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete site (admin only)
app.delete('/api/sites/:id', requireAuth('admin'), (req, res) => {
  try {
    const id = req.params.id;
    ['.json', '.html'].forEach(ext => {
      const f = join(SITES_DIR, `${id}${ext}`);
      if (existsSync(f)) unlinkSync(f);
    });
    const thumb = join(THUMBNAILS_DIR, `${id}.png`);
    if (existsSync(thumb)) unlinkSync(thumb);
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get thumbnails
app.get('/api/thumbnails/:id', (req, res) => {
  const thumbnailFile = join(THUMBNAILS_DIR, `${req.params.id}.png`);
  if (existsSync(thumbnailFile)) {
    res.type('image/png').sendFile(thumbnailFile);
  } else {
    res.status(404).json({ error: 'Thumbnail not found' });
  }
});

// Serve HTML file
app.get('/sites/:id', (req, res) => {
  const htmlFile = join(SITES_DIR, `${req.params.id}.html`);
  if (existsSync(htmlFile)) {
    res.type('text/html').sendFile(htmlFile);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Sites directory: ${SITES_DIR}`);
  console.log(`Users directory: ${USERS_DIR}`);
});
