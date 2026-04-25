export class SiteViewer {
  private site: any;
  private onClose: () => void;

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

    // Initialize Lucide icons for the viewer
    if ((window as any).lucide) (window as any).lucide.createIcons();

    // Load content into iframe
    const iframe = document.getElementById('site-iframe') as HTMLIFrameElement;
    const loader = document.getElementById('iframe-loader');

    if (iframe && this.site.content) {
      iframe.onload = () => {
        loader?.classList.add('hidden');
        iframe.classList.add('loaded');
        // Fix white flash
        try {
          const doc = iframe.contentDocument;
          if (doc) {
            doc.documentElement.style.backgroundColor = '#0a0a0f';
            doc.body.style.backgroundColor = '#0a0a0f';
          }
        } catch {}
      };
      // Show themed loader first
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-deep') || '#0a0a0f';
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#c9a227';
      const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-accent') || '#333';
      
      iframe.srcdoc = `<html><body style="background:${bgColor};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:48px;height:48px;border:3px solid ${borderColor};border-top-color:${accentColor};border-radius:50%;animation:spin 1s linear infinite;"></div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      </body></html>`;
      
      setTimeout(() => {
        iframe.srcdoc = this.site.content;
      }, 100);
    }

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
              <i data-lucide="arrow-left"></i>
              <span>Back</span>
            </button>
            <h2 class="viewer-title">${this.site.name}</h2>
            <div style="width: 80px;"></div>
          </div>
          <div class="viewer-frame">
            <div class="iframe-loader" id="iframe-loader">
              <div class="loader-spinner"></div>
            </div>
            <iframe id="site-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>
      </div>
    `;
  }
}
