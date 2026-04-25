interface Site {
  id: string;
  name: string;
  uploadedAt: string;
}

const API = 'http://localhost:3000/api';

export class SiteGrid {
  static render(sites: Site[], isAdmin: boolean = false): string {
    if (sites.length === 0) {
      return `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `;
    }

    const cards = sites.map(site => {
      const date = new Date(site.uploadedAt).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      return `
        <div class="site-card" data-id="${site.id}">
          <div class="card-preview">
            <div class="card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>${SiteGrid.escapeHtml(site.name)}</span>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${SiteGrid.escapeHtml(site.name)}</h3>
            <p class="card-date">${date}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${site.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            ${isAdmin ? `
            <button class="action-btn delete-btn" data-id="${site.id}" title="Löschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `<div class="site-grid">${cards}</div>`;
  }

  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
