import { FileUploader } from './components/FileUploader';
import { SiteGrid } from './components/SiteGrid';
import { SiteViewer } from './components/SiteViewer';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { LoginScreen } from './components/LoginScreen';
import { Settings } from './components/Settings';

interface Site {
  id: string;
  name: string;
  content?: string;
  uploadedAt: string;
}

interface Session {
  token: string;
  role: 'guest' | 'admin';
  username: string;
}

interface LeaderboardEntry {
  username: string;
  visits: number;
  role: string;
}

const API = 'http://localhost:3000/api';

class App {
  private session: Session | null = null;
  private settings: Settings = { accentColor: '#c9a227' };
  private sites: Site[] = [];
  private filteredSites: Site[] = [];
  private searchQuery: string = '';
  private viewer: SiteViewer | null = null;

  constructor() {
    this.settings = Settings.load();
    Settings.apply(this.settings);
    this.initCursorGlow();
    this.checkSession();
  }

  private async checkSession(): Promise<void> {
    const saved = localStorage.getItem('site-grid-session');
    if (saved) {
      try {
        this.session = JSON.parse(saved);
        const res = await fetch(`${API}/sites`, {
          headers: { 'X-Auth-Token': this.session!.token }
        });
        if (res.ok) {
          this.sites = await res.json();
          this.filteredSites = [...this.sites];
          this.render();
          return;
        }
      } catch {
        // Invalid session
      }
      this.session = null;
      localStorage.removeItem('site-grid-session');
    }
    this.renderLogin();
  }

  private saveSession(): void {
    if (this.session) {
      localStorage.setItem('site-grid-session', JSON.stringify(this.session));
    } else {
      localStorage.removeItem('site-grid-session');
    }
  }

  private initCursorGlow(): void {
    const existing = document.querySelector('.cursor-glow');
    if (existing) return;
    
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  private filterSites(): void {
    if (!this.searchQuery) {
      this.filteredSites = [...this.sites];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredSites = this.sites.filter(site =>
        site.name.toLowerCase().includes(query)
      );
    }
  }

  private showSettings(): void {
    const existing = document.querySelector('.settings-overlay');
    if (existing) return;

    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    document.body.appendChild(overlay);

    overlay.innerHTML = Settings.render(this.settings);
    Settings.init((s) => {
      this.settings = s;
      Settings.save(s);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

  private showLeaderboard(): void {
    const existing = document.querySelector('.settings-overlay');
    if (existing) return;

    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    document.body.appendChild(overlay);

    overlay.innerHTML = `
      <div class="settings-popup">
        <h3>🏆 Leaderboard</h3>
        <div class="leaderboard-list" id="leaderboard-list">
          <div class="leaderboard-loading">Loading...</div>
        </div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `;

    document.getElementById('settings-close')?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // Fetch leaderboard
    fetch(`${API}/leaderboard`)
      .then(res => res.json())
      .then((data: LeaderboardEntry[]) => {
        const list = document.getElementById('leaderboard-list');
        if (!list) return;

        if (data.length === 0) {
          list.innerHTML = '<div class="leaderboard-empty">No visits yet</div>';
          return;
        }

        list.innerHTML = data.map((entry, i) => `
          <div class="leaderboard-item ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">
            <span class="rank">#${i + 1}</span>
            <span class="name">${entry.username}</span>
            <span class="visits">${entry.visits} visits</span>
          </div>
        `).join('');
      })
      .catch(() => {
        const list = document.getElementById('leaderboard-list');
        if (list) list.innerHTML = '<div class="leaderboard-empty">Failed to load</div>';
      });
  }

  private renderLogin(): void {
    const app = document.getElementById('app')!;
    app.innerHTML = LoginScreen.render();
    LoginScreen.init(this.handleAuth.bind(this));
  }

  private async handleAuth(username: string, password: string, isRegister: boolean): Promise<void> {
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Auth failed');
      }

      const data = await res.json();
      this.session = { 
        token: data.token, 
        role: data.role, 
        username: data.username 
      };
      this.saveSession();

      const sitesRes = await fetch(`${API}/sites`, {
        headers: { 'X-Auth-Token': this.session.token }
      });
      this.sites = await sitesRes.json();
      this.filteredSites = [...this.sites];

      this.render();
    } catch (err) {
      throw err; // Let LoginScreen handle the error display
    }
  }

  private async handleLogout(): Promise<void> {
    if (this.session) {
      await fetch(`${API}/auth/logout`, {
        method: 'POST',
        headers: { 'X-Auth-Token': this.session.token }
      });
    }
    this.session = null;
    this.saveSession();
    this.sites = [];
    this.filteredSites = [];
    this.renderLogin();
  }

  private render(): void {
    const app = document.getElementById('app')!;
    const isAdmin = this.session?.role === 'admin';

    app.innerHTML = `
      <div class="app-container">
        ${Header.render(
          this.session?.role || 'guest', 
          this.session?.username || 'User',
          this.handleLogout.bind(this), 
          this.showSettings.bind(this),
          this.showLeaderboard.bind(this)
        )}        
        <div class="upload-section">
          ${SearchBar.render()}
          ${FileUploader.render()}
        </div>
        
        <div class="grid-section">
          ${SiteGrid.render(this.filteredSites, isAdmin)}
        </div>
        
        ${this.viewer ? this.viewer.render() : ''}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const app = document.getElementById('app')!;

    const logoutBtn = app.querySelector('#logout-btn');
    logoutBtn?.addEventListener('click', () => this.handleLogout());

    const settingsBtn = app.querySelector('#settings-btn');
    settingsBtn?.addEventListener('click', () => this.showSettings());

    const leaderboardBtn = app.querySelector('#leaderboard-btn');
    leaderboardBtn?.addEventListener('click', () => this.showLeaderboard());

    const searchInput = app.querySelector('.search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      this.filterSites();
      this.updateGrid();
    });

    app.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (this.session?.role !== 'admin') return;
        const id = (btn as HTMLElement).dataset.id!;
        await this.handleDelete(id);
      });
    });

    app.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = (btn as HTMLElement).dataset.id!;
        await this.handleView(id);
      });
    });

    app.querySelectorAll('.site-card').forEach(card => {
      card.addEventListener('click', async () => {
        const id = (card as HTMLElement).dataset.id!;
        await this.handleView(id);
      });
    });

    const fileInput = app.querySelector('#file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await this.handleUpload(file);
        fileInput.value = '';
      }
    });

    const uploader = app.querySelector('.uploader') as HTMLElement;
    uploader?.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploader.classList.add('drag-over');
    });
    uploader?.addEventListener('dragleave', () => {
      uploader.classList.remove('drag-over');
    });
    uploader?.addEventListener('drop', async (e) => {
      e.preventDefault();
      uploader.classList.remove('drag-over');
      const file = (e as DragEvent).dataTransfer?.files[0];
      if (file) await this.handleUpload(file);
    });

    const backBtn = app.querySelector('#back-btn');
    backBtn?.addEventListener('click', () => {
      this.viewer = null;
      this.render();
    });
  }

  private updateGrid(): void {
    const gridSection = document.querySelector('.grid-section');
    if (gridSection) {
      gridSection.innerHTML = SiteGrid.render(this.filteredSites, this.session?.role === 'admin');
      this.attachEventListeners();
    }
  }

  private async handleUpload(file: File): Promise<void> {
    if (!this.session) return;

    try {
      const content = await file.text();
      const name = file.name.replace(/\.(html|htm)$/i, '');
      
      await fetch(`${API}/sites`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': this.session.token
        },
        body: JSON.stringify({ name, content })
      });
      
      const res = await fetch(`${API}/sites`, {
        headers: { 'X-Auth-Token': this.session.token }
      });
      this.sites = await res.json();
      this.filterSites();
      this.render();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
  }

  private async handleDelete(id: string): Promise<void> {
    if (!this.session || this.session.role !== 'admin') return;
    if (!confirm('Delete this site?')) return;

    try {
      await fetch(`${API}/sites/${id}`, {
        method: 'DELETE',
        headers: { 'X-Auth-Token': this.session.token }
      });
      
      const res = await fetch(`${API}/sites`, {
        headers: { 'X-Auth-Token': this.session.token }
      });
      this.sites = await res.json();
      this.filterSites();
      this.render();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  private async handleView(id: string): Promise<void> {
    if (!this.session) return;

    try {
      const res = await fetch(`${API}/sites/${id}`, {
        headers: { 'X-Auth-Token': this.session.token }
      });
      const site = await res.json();
      
      this.viewer = new SiteViewer(site, () => {
        this.viewer = null;
        this.render();
      });
      this.viewer.open();
    } catch (err) {
      console.error('Load failed:', err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
