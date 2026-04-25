export class SiteViewer {
  private site: any;
  private onClose: () => void;
  private iframe: HTMLIFrameElement | null = null;

  constructor(site: any, onClose: () => void) {
    this.site = site;
    this.onClose = onClose;
  }

  open(): void {
    const container = document.querySelector('.app-container');
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.className = 'viewer-overlay';
    overlay.innerHTML = this.render();
    container.appendChild(overlay);

    // Load content into iframe
    setTimeout(() => {
      const iframe = document.getElementById('site-iframe') as HTMLIFrameElement;
      if (iframe && this.site.content) {
        iframe.srcdoc = this.site.content;
      }
    }, 100);

    // Event listeners
    document.getElementById('viewer-close')?.addEventListener('click', () => {
      overlay.remove();
      this.onClose();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        this.onClose();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        this.onClose();
      }
    });
  }

  render(): string {
    return `
      <div class="viewer-container">
        <div class="viewer-glow-border">
          <div class="viewer-header">
            <button class="viewer-back" id="viewer-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Close</span>
            </button>
            <h2 class="viewer-title">${this.site.name}</h2>
            <a class="viewer-newtab" href="/sites/${this.site.id}" target="_blank" title="Open in new tab">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          <div class="viewer-frame">
            <iframe id="site-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>
      </div>
    `;
  }
}
