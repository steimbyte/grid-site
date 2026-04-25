interface Site {
  id: string;
  name: string;
  uploadedAt: string;
  views?: number;
  tags?: { id: string; name: string; color: string }[];
  icon?: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

export class SiteGrid {
  static render(sites: Site[], isAdmin: boolean = false, tags: Tag[] = []): string {
    if (sites.length === 0) {
      return `
        <div class="empty-state">
          <i data-lucide="folder-open"></i>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `;
    }

    return `
      <div class="site-grid">
        ${sites.map(site => {
          const date = new Date(site.uploadedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' });
          return `
            <div class="site-card" data-id="${site.id}" draggable="true">
              <div class="card-preview">
                <div class="card-icon-display" data-site-id="${site.id}">
                  <i data-lucide="${site.icon || 'globe'}"></i>
                </div>
                <div class="card-views" title="Views">
                  <i data-lucide="eye"></i>
                  <span>${site.views || 0}</span>
                </div>
                ${site.tags && site.tags.length ? `
                  <div class="card-tags">
                    ${site.tags.map(t => `<span class="card-tag" style="background:${t.color}">${SiteGrid.escapeHtml(t.name)}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="card-info">
                <h3 class="card-title">${SiteGrid.escapeHtml(site.name)}</h3>
                <p class="card-date">${date}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn view-btn" data-id="${site.id}" title="Ansehen">
                  <i data-lucide="eye"></i>
                </button>
                ${isAdmin ? `
                <button class="action-btn icon-btn" data-id="${site.id}" title="Icon waehlen">
                  <i data-lucide="smile"></i>
                </button>
                <button class="action-btn rename-btn" data-id="${site.id}" data-name="${SiteGrid.escapeHtml(site.name)}" title="Umbenennen">
                  <i data-lucide="pencil"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${site.id}" title="Loeschen">
                  <i data-lucide="trash-2"></i>
                </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
