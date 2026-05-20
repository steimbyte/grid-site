export class SiteViewer {
	private site: any;
	private onClose: () => void;

	constructor(site: any, onClose: () => void) {
		this.site = site;
		this.onClose = onClose;
	}

	private escapeHtml(text: string): string {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	open(): void {
		const container = document.querySelector(".app-container");
		if (!container) return;

		const overlay = document.createElement("div");
		overlay.className = "viewer-overlay";
		overlay.innerHTML = this.render();
		container.appendChild(overlay);

		// Initialize Lucide icons for the viewer
		if ((window as any).lucide) (window as any).lucide.createIcons();

		// Load content into iframe
		const iframe = document.getElementById("site-iframe") as HTMLIFrameElement;
		const loader = document.getElementById("iframe-loader");
		const errorDiv = document.getElementById("iframe-error");
		const retryBtn = document.getElementById("iframe-retry");
		const reloadBtn = document.getElementById("viewer-reload");

		// Error timeout (if iframe doesn't load within 10s)
		const errorTimeout = setTimeout(() => {
			loader?.classList.add("hidden");
			errorDiv?.removeAttribute("hidden");
			iframe.style.display = "none";
		}, 10000);

		// Reload function
		const loadContent = () => {
			clearTimeout(errorTimeout);
			loader?.classList.remove("hidden");
			errorDiv?.setAttribute("hidden", "");
			iframe.style.display = "";
			iframe.classList.remove("loaded");

			if (iframe && this.site.content) {
				// Show themed loader first
				const bgColor =
					getComputedStyle(document.documentElement).getPropertyValue(
						"--bg-deep",
					) || "#0a0a0f";
				const accentColor =
					getComputedStyle(document.documentElement).getPropertyValue(
						"--accent",
					) || "#c9a227";
				const borderColor =
					getComputedStyle(document.documentElement).getPropertyValue(
						"--border-accent",
					) || "#333";

				iframe.srcdoc = `<html><body style="background:${bgColor};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
					<div style="width:48px;height:48px;border:3px solid ${borderColor};border-top-color:${accentColor};border-radius:50%;animation:spin 1s linear infinite;"></div>
					<style>@keyframes spin{to{transform:rotate(360deg)}}</style>
				</body></html>`;

				setTimeout(() => {
					iframe.srcdoc = this.site.content;
				}, 100);
			}
		};

		if (iframe) {
			iframe.onload = () => {
				clearTimeout(errorTimeout);
				loader?.classList.add("hidden");
				iframe.classList.add("loaded");
				// Fix white flash
				try {
					const doc = iframe.contentDocument;
					if (doc) {
						doc.documentElement.style.backgroundColor = "#0a0a0f";
						doc.body.style.backgroundColor = "#0a0a0f";
					}
				} catch {}
			};

			iframe.onerror = () => {
				clearTimeout(errorTimeout);
				loader?.classList.add("hidden");
				errorDiv?.removeAttribute("hidden");
				iframe.style.display = "none";
			};
		}

		// Event listeners
		document.getElementById("viewer-close")?.addEventListener("click", () => {
			overlay.remove();
			this.onClose();
		});

		retryBtn?.addEventListener("click", loadContent);
		reloadBtn?.addEventListener("click", loadContent);

		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) {
				overlay.remove();
				this.onClose();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				overlay.remove();
				this.onClose();
			}
			if (e.ctrlKey && e.key === "r") {
				e.preventDefault();
				loadContent();
			}
		});

		// Start loading
		loadContent();
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
						<h2 class="viewer-title">${this.escapeHtml(this.site.name)}</h2>
						<div class="viewer-actions">
							<button class="viewer-action-btn" id="viewer-reload" title="Reload (Ctrl+R)">
								<i data-lucide="refresh-cw"></i>
							</button>
						</div>
					</div>
					<div class="viewer-frame">
						<div class="iframe-loader" id="iframe-loader">
							<div class="loader-spinner"></div>
						</div>
						<div class="iframe-error" id="iframe-error" hidden>
							<i data-lucide="alert-triangle"></i>
							<p>Failed to load content</p>
							<button id="iframe-retry">Try Again</button>
						</div>
						<iframe id="site-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
					</div>
				</div>
			</div>
		`;
	}
}
