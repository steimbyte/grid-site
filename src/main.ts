/**
 * Site Grid - Main Application
 */

import { FileUploader } from "./components/FileUploader";
import { SiteGrid } from "./components/SiteGrid";
import { SiteViewer } from "./components/SiteViewer";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { LoginScreen } from "./components/LoginScreen";
import { Settings } from "./components/Settings";

interface Site {
	id: string;
	name: string;
	content?: string;
	uploadedAt: string;
	uploadedBy?: string;
	views?: number;
	tags?: Tag[];
	icon?: string;
}
interface User {
	id: string;
	username: string;
	role: "user" | "admin";
	visits: number;
}
interface Tag {
	id: string;
	name: string;
	color: string;
}
interface Session {
	token: string;
	role: "user" | "admin";
	username: string;
	userId: string;
}

let API = "http://localhost:3000/api";

class App {
	private session: Session | null = null;
	private settings: Settings = {
		accentColor: "#c9a227",
		gridSize: "normal" as "small" | "normal" | "large",
	};
	private sites: Site[] = [];
	private filteredSites: Site[] = [];
	private tags: Tag[] = [];
	private searchQuery = "";
	private viewer: SiteViewer | null = null;

	constructor() {
		this.settings = Settings.load();
		Settings.apply(this.settings);
		this.initCursorGlow();
		void this.initApiUrl();
	}

	private async initApiUrl(): Promise<void> {
		try {
			const res = await fetch("/api/config");
			const config = await res.json();
			if (config.frontendUrl) {
				// Remove trailing slash to avoid double slashes
				const baseUrl = config.frontendUrl.replace(/\/$/, "");
				API = `${baseUrl}/api`;
			}
		} catch {
			// Config is optional; proceed with default API URL
		}
		this.loadTags();
		await this.checkSession();
	}

	private getAuthHeaders(): HeadersInit {
		return {
			Authorization: `Bearer ${this.session?.token ?? ""}`,
			"Content-Type": "application/json",
		};
	}

	private async apiRequest<T>(
		url: string,
		options: RequestInit = {},
	): Promise<T> {
		const res = await fetch(url, {
			...options,
			headers: { ...this.getAuthHeaders(), ...options.headers },
		});
		if (!res.ok) {
			const err = await res.json().catch(() => ({ error: "Request failed" }));
			throw new Error(err.error || `HTTP ${res.status}`);
		}
		return res.json();
	}

	private async checkSession(): Promise<void> {
		const saved = localStorage.getItem("site-grid-session");
		if (saved) {
			try {
				this.session = JSON.parse(saved);
				await this.loadSites();
				this.render();
				return;
			} catch {
				/* invalid */
			}
		}
		this.clearSession();
		this.renderLogin();
	}

	private clearSession(): void {
		this.session = null;
		localStorage.removeItem("site-grid-session");
	}

	private initCursorGlow(): void {
		if (document.querySelector(".cursor-glow")) return;
		const glow = document.createElement("div");
		glow.className = "cursor-glow";
		document.body.appendChild(glow);
		document.addEventListener("mousemove", (e) => {
			glow.style.left = `${e.clientX}px`;
			glow.style.top = `${e.clientY}px`;
		});
	}

	private async loadTags(): Promise<void> {
		try {
			this.tags = await fetch(`${API}/tags`).then((r) => r.json());
		} catch {
			this.tags = [];
		}
	}

	private async loadSites(): Promise<void> {
		try {
			this.sites = await this.apiRequest<Site[]>(`${API}/sites`);
			this.filterSites();
		} catch {
			this.clearSession();
			this.renderLogin();
		}
	}

	private filterSites(): void {
		const q = this.searchQuery.toLowerCase();
		this.filteredSites = this.sites.filter(
			(s) =>
				s.name.toLowerCase().includes(q) ||
				s.content?.toLowerCase().includes(q),
		);
	}

	private createOverlay(content: string): HTMLDivElement {
		const overlay = document.createElement("div");
		overlay.className = "settings-overlay";
		overlay.innerHTML = content;
		document.body.appendChild(overlay);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) overlay.remove();
		});
		return overlay;
	}

	private showSettings(): void {
		if (document.querySelector(".settings-overlay")) return;
		const overlay = this.createOverlay(Settings.render(this.settings));
		Settings.init((s) => {
			this.settings = s;
			Settings.save(s);
			Settings.apply(s);
		});
		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());
	}

	private showLeaderboard(): void {
		if (document.querySelector(".settings-overlay")) return;
		const overlay = this.createOverlay(
			`<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>`,
		);
		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());
		this.apiRequest<Array<{ username: string; visits: number }>>(
			`${API}/leaderboard`,
		)
			.then((data) => {
				const list = document.getElementById("leaderboard-list");
				if (!list) return;
				list.textContent = "";
				if (data.length) {
					data.forEach((e, i) => {
						const item = document.createElement("div");
						item.className = `leaderboard-item ${i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : ""}`;
						const nameSpan = document.createElement("span");
						nameSpan.className = "name";
						nameSpan.textContent = e.username;
						const rankSpan = document.createElement("span");
						rankSpan.className = "rank";
						rankSpan.textContent = `#${i + 1}`;
						item.append(rankSpan);
						item.appendChild(nameSpan);
						const visitsSpan = document.createElement("span");
						visitsSpan.className = "visits";
						visitsSpan.textContent = `${e.visits} visits`;
						item.appendChild(visitsSpan);
						list.appendChild(item);
					});
				} else {
					const empty = document.createElement("div");
					empty.className = "empty";
					empty.textContent = "No visits yet";
					list.appendChild(empty);
				}
			})
			.catch(() => {
				const list = document.getElementById("leaderboard-list");
				if (list) {
					list.textContent = "";
					const err = document.createElement("div");
					err.className = "empty";
					err.textContent = "Failed to load";
					list.appendChild(err);
				}
			});
	}

	private showUserManagement(): void {
		if (this.session?.role !== "admin") return;
		if (document.querySelector(".settings-overlay")) return;
		const overlay = this.createOverlay(
			`<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>`,
		);
		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());
		void this.loadUserList();
	}

	private async loadUserList(): Promise<void> {
		const list = document.getElementById("user-list");
		if (!list) return;
		try {
			const [users, settings] = await Promise.all([
				this.apiRequest<User[]>(`${API}/admin/users`),
				this.apiRequest<{
					uploadsEnabled: boolean;
					userSettings: Record<string, boolean>;
				}>(`${API}/settings`),
			]);
			list.textContent = "";
			users.forEach((u) => {
				const item = document.createElement("div");
				item.className = "user-item";

				const userInfo = document.createElement("div");
				userInfo.className = "user-info";

				const nameSpan = document.createElement("span");
				nameSpan.className = "user-name";
				nameSpan.textContent = u.username;

				const roleSpan = document.createElement("span");
				roleSpan.className = `user-role ${u.role}`;
				roleSpan.textContent = u.role;

				userInfo.append(nameSpan, roleSpan);

				const statsDiv = document.createElement("div");
				statsDiv.className = "user-stats";
				statsDiv.textContent = `${u.visits} visits`;

				item.append(userInfo, statsDiv);

				if (u.role !== "admin") {
					const uploadToggle = document.createElement("div");
					uploadToggle.className = "user-upload-toggle";
					uploadToggle.innerHTML = `<label><input type="checkbox" class="user-upload-perm" data-id="${u.id}" ${settings.userSettings?.[u.id] !== false ? "checked" : ""}> <span>Upload</span></label>`;
					item.append(uploadToggle);

					const actions = document.createElement("div");
					actions.className = "user-actions";
					actions.innerHTML = `<button class="user-btn promote" data-id="${u.id}">Promote</button><button class="user-btn delete" data-id="${u.id}">Delete</button>`;
					item.append(actions);
				} else {
					const actions = document.createElement("div");
					actions.className = "user-actions";
					actions.innerHTML = `<button class="user-btn delete" data-id="${u.id}">Delete</button>`;
					item.append(actions);
				}

				list.appendChild(item);
			});

			list.querySelectorAll(".user-upload-perm").forEach((cb) => {
				cb.addEventListener("change", async (e) => {
					const userId = (e.target as HTMLElement).dataset.id;
					const enabled = (e.target as HTMLInputElement).checked;
					await this.apiRequest(`${API}/settings`, {
						method: "PUT",
						body: JSON.stringify({
							userSettings: { ...settings.userSettings, [userId!]: enabled },
						}),
					});
				});
			});

			list
				.querySelectorAll(".promote")
				.forEach((b) =>
					b.addEventListener(
						"click",
						() => void this.promoteUser((b as HTMLElement).dataset.id!),
					),
				);
			list
				.querySelectorAll(".delete")
				.forEach((b) =>
					b.addEventListener(
						"click",
						() => void this.deleteUser((b as HTMLElement).dataset.id!),
					),
				);
		} catch {
			list.textContent = "";
			const err = document.createElement("div");
			err.className = "error";
			err.textContent = "Failed";
			list.appendChild(err);
		}
	}

	private async promoteUser(id: string): Promise<void> {
		if (!confirm("Promote?")) return;
		try {
			await this.apiRequest(`${API}/admin/users/${id}`, {
				method: "PUT",
				body: JSON.stringify({ role: "admin" }),
			});
			void this.loadUserList();
		} catch (err) {
			alert(err instanceof Error ? err.message : "Error");
		}
	}
	private async deleteUser(id: string): Promise<void> {
		if (!confirm("Delete?")) return;
		try {
			await this.apiRequest(`${API}/admin/users/${id}`, { method: "DELETE" });
			void this.loadUserList();
		} catch (err) {
			alert(err instanceof Error ? err.message : "Error");
		}
	}

	private showTags(): void {
		if (this.session?.role !== "admin") return;
		if (document.querySelector(".settings-overlay")) return;
		const overlay = this.createOverlay(
			`<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>`,
		);
		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());
		this.renderTags();
		document
			.getElementById("add-tag-btn")
			?.addEventListener("click", async () => {
				const name = (
					document.getElementById("new-tag-name") as HTMLInputElement
				)?.value;
				const color = (
					document.getElementById("new-tag-color") as HTMLInputElement
				)?.value;
				if (!name) return;
				await fetch(`${API}/tags`, {
					method: "POST",
					headers: this.getAuthHeaders(),
					body: JSON.stringify({ name, color }),
				});
				this.tags = await fetch(`${API}/tags`).then((r) => r.json());
				this.renderTags();
			});
	}

	private async showSiteSettings(): Promise<void> {
		if (this.session?.role !== "admin") return;
		if (document.querySelector(".settings-overlay")) return;

		const settings = await this.apiRequest<{ uploadsEnabled: boolean }>(
			`${API}/settings`,
		);
		const overlay = this.createOverlay(
			`<div class="settings-popup"><h3>Site Settings</h3><div class="setting-row"><label><input type="checkbox" id="uploads-enabled" ${settings.uploadsEnabled !== false ? "checked" : ""}> <span>Uploads erlaubt</span></label></div><button class="settings-close" id="settings-close">Close</button></div>`,
		);
		(window as any).lucide?.createIcons();

		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());

		document
			.getElementById("uploads-enabled")
			?.addEventListener("change", async (e) => {
				const enabled = (e.target as HTMLInputElement).checked;
				await this.apiRequest(`${API}/settings`, {
					method: "PUT",
					body: JSON.stringify({ uploadsEnabled: enabled }),
				});
			});
	}

	private async renderTags(): Promise<void> {
		const list = document.getElementById("tags-list");
		if (!list) return;
		list.textContent = "";
		this.tags.forEach((t) => {
			const item = document.createElement("div");
			item.className = "tag-item";

			const dotSpan = document.createElement("span");
			dotSpan.className = "tag-dot";
			dotSpan.style.background = t.color;

			const nameSpan = document.createElement("span");
			nameSpan.textContent = t.name;

			const btn = document.createElement("button");
			btn.className = "tag-delete";
			btn.dataset.id = t.id;
			btn.textContent = "X";

			item.append(dotSpan, nameSpan, btn);
			list.appendChild(item);
		});
		list.querySelectorAll(".tag-delete").forEach((b) =>
			b.addEventListener("click", async () => {
				await fetch(`${API}/tags/${(b as HTMLElement).dataset.id}`, {
					method: "DELETE",
					headers: this.getAuthHeaders(),
				});
				this.tags = await fetch(`${API}/tags`).then((r) => r.json());
				this.renderTags();
			}),
		);
	}

	private toggleGridSize(): void {
		const sizes: ("small" | "normal" | "large")[] = [
			"small",
			"normal",
			"large",
		];
		const idx = sizes.indexOf(this.settings.gridSize || "normal");
		this.settings.gridSize = sizes[(idx + 1) % sizes.length];
		Settings.save(this.settings);
		document.body.className = `grid-${this.settings.gridSize}`;
	}

	private async exportZip(): Promise<void> {
		window.open(`${API}/export`, "_blank");
	}

	private renderLogin(): void {
		const app = document.getElementById("app");
		if (!app) return;
		app.innerHTML = LoginScreen.render();
		LoginScreen.init(this.handleAuth.bind(this));
	}

	private async handleAuth(
		username: string,
		password: string,
		isRegister: boolean,
	): Promise<void> {
		try {
			const data = await this.apiRequest<Session & { id: string }>(
				`${API}/auth/${isRegister ? "register" : "login"}`,
				{ method: "POST", body: JSON.stringify({ username, password }) },
			);
			this.session = {
				token: data.token,
				role: data.role,
				username: data.username,
				userId: data.id,
			};
			localStorage.setItem("site-grid-session", JSON.stringify(this.session));
			await this.loadSites();
			await this.loadTags();
			this.render();
		} catch (err) {
			throw err;
		}
	}

	private async handleLogout(): Promise<void> {
		this.clearSession();
		this.sites = [];
		this.filteredSites = [];
		this.viewer = null;
		this.renderLogin();
	}

	private render(): void {
		const app = document.getElementById("app");
		if (!app) return;
		document.body.className = `grid-${this.settings.gridSize || "normal"}`;

		app.innerHTML = `
      <div class="app-container">
        ${Header.render(this.session?.role ?? "user", this.session?.username ?? "User", this.handleLogout.bind(this), this.showSettings.bind(this), this.showLeaderboard.bind(this), this.session?.role === "admin" ? this.showUserManagement.bind(this) : undefined, this.toggleGridSize.bind(this), this.showTags.bind(this), this.exportZip.bind(this), this.showSiteSettings.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${SearchBar.render()}
            <div class="grid-section">
              ${SiteGrid.render(this.filteredSites, this.session?.role === "admin", this.tags)}
            </div>
          </div>
          <aside class="sidebar-panel">
            <div class="stats-card">
              <h4><i data-lucide="bar-chart-3"></i> Statistics</h4>
              <div class="stats-grid" id="stats-grid">
                <div class="stat-item"><span class="stat-value" id="stat-logins">-</span><span class="stat-label">Logins</span></div>
                <div class="stat-item"><span class="stat-value" id="stat-users">-</span><span class="stat-label">Users</span></div>
                <div class="stat-item"><span class="stat-value" id="stat-sites">-</span><span class="stat-label">Sites</span></div>
              </div>
            </div>
            <div class="sidebar-separator"></div>
            <div class="leaderboard-card">
              <h4><i data-lucide="trophy"></i> Top Users</h4>
              <div class="sidebar-leaderboard" id="sidebar-leaderboard"><div class="loading">Loading...</div></div>
            </div>
            <div class="sidebar-separator"></div>
            <div class="upload-card-sidebar" id="sidebar-upload-btn">
              <i data-lucide="upload"></i>
              <span>Upload Site</span>
            </div>
            ${FileUploader.render()}
          </aside>
        </div>
        ${this.viewer ? this.viewer.render() : ""}
      </div>
    `;
		this.attachEventListeners();
		void this.loadSidebarData();
	}

	private attachEventListeners(): void {
		// Re-init Lucide icons after dynamic content (only once)
		if (
			(window as any).lucide &&
			!document.querySelector(".lucide-create-icons-called")
		) {
			(window as any).lucide.createIcons();
			document.body.classList.add("lucide-create-icons-called");
		}
		const app = document.getElementById("app");
		if (!app) return;
		app
			.querySelector("#logout-btn")
			?.addEventListener("click", () => this.handleLogout());
		app
			.querySelector("#settings-btn")
			?.addEventListener("click", () => this.showSettings());
		app
			.querySelector("#leaderboard-btn")
			?.addEventListener("click", () => this.showLeaderboard());
		app
			.querySelector("#grid-size-btn")
			?.addEventListener("click", () => this.toggleGridSize());
		app
			.querySelector("#sidebar-upload-btn")
			?.addEventListener("click", () =>
				document.querySelector<HTMLInputElement>("#file-input")?.click(),
			);
		app
			.querySelector("#users-btn")
			?.addEventListener("click", () => this.showUserManagement());
		app
			.querySelector("#tags-btn")
			?.addEventListener("click", () => this.showTags());
		app
			.querySelector("#site-settings-btn")
			?.addEventListener("click", () => this.showSiteSettings());
		app
			.querySelector("#export-btn")
			?.addEventListener("click", () => this.exportZip());

		const searchInput = app.querySelector(".search-input") as HTMLInputElement;
		searchInput?.addEventListener("input", (e) => {
			this.searchQuery = (e.target as HTMLInputElement).value;
			this.filterSites();
			this.updateGrid();
		});

		app.querySelectorAll(".delete-btn").forEach((btn) =>
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				if (this.session?.role === "admin")
					void this.handleDelete((btn as HTMLElement).dataset.id!);
			}),
		);
		app.querySelectorAll(".rename-btn").forEach((btn) =>
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				void this.handleRename(
					(btn as HTMLElement).dataset.id!,
					(btn as HTMLElement).dataset.name!,
				);
			}),
		);
		app.querySelectorAll(".icon-btn").forEach((btn) =>
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				void this.showIconPicker((btn as HTMLElement).dataset.id!);
			}),
		);
		app.querySelectorAll(".view-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				void this.handleView((btn as HTMLElement).dataset.id!);
			});
		});
		app.querySelectorAll(".site-card").forEach((card) => {
			card.addEventListener("click", (e) => {
				if ((e.target as HTMLElement).closest(".card-actions")) return;
				void this.handleView((card as HTMLElement).dataset.id!);
			});
		});

		const fileInput = app.querySelector("#file-input") as HTMLInputElement;
		fileInput?.addEventListener("change", async (e) => {
			const files = (e.target as HTMLInputElement).files;
			if (files?.length) {
				await this.handleUploadMultiple(Array.from(files));
				fileInput.value = "";
			}
		});

		const uploader = app.querySelector(".uploader") as HTMLElement;
		uploader?.addEventListener("dragover", (e) => {
			e.preventDefault();
			uploader.classList.add("drag-over");
		});
		uploader?.addEventListener("dragleave", () =>
			uploader.classList.remove("drag-over"),
		);
		uploader?.addEventListener("drop", async (e) => {
			e.preventDefault();
			uploader.classList.remove("drag-over");
			const files = (e as DragEvent).dataTransfer?.files;
			if (files?.length) await this.handleUploadMultiple(Array.from(files));
		});

		app.querySelector("#back-btn")?.addEventListener("click", () => {
			this.viewer = null;
			this.render();
		});

		// Keyboard shortcuts
		document.addEventListener("keydown", (e) => {
			if (e.target instanceof HTMLInputElement) return;
			if (e.key === "/") {
				e.preventDefault();
				searchInput?.focus();
			}
			if (e.key === "n" || e.key === "N") {
				e.preventDefault();
				(document.querySelector("#file-input") as HTMLInputElement)?.click();
			}
		});
	}

	private async loadSidebarData(): Promise<void> {
		try {
			const stats = await this.apiRequest<{
				totalLogins: number;
				totalUsers: number;
				totalSites: number;
			}>(`${API}/stats`);
			document.getElementById("stat-logins")!.textContent = String(
				stats.totalLogins,
			);
			document.getElementById("stat-users")!.textContent = String(
				stats.totalUsers,
			);
			document.getElementById("stat-sites")!.textContent = String(
				stats.totalSites,
			);
		} catch {
			/* ignore */
		}

		const lb = document.getElementById("sidebar-leaderboard");
		if (!lb) return;
		try {
			const data = await this.apiRequest<
				Array<{ username: string; visits: number }>
			>(`${API}/leaderboard?limit=5`);
			lb.textContent = "";
			if (data.length) {
				data.forEach((e, i) => {
					const item = document.createElement("div");
					item.className = `sidebar-item ${i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : ""}`;
					const rankSpan = document.createElement("span");
					rankSpan.className = "sidebar-rank";
					rankSpan.textContent = String(i + 1);
					const nameSpan = document.createElement("span");
					nameSpan.className = "sidebar-name";
					nameSpan.textContent = e.username;
					const visitsSpan = document.createElement("span");
					visitsSpan.className = "sidebar-visits";
					visitsSpan.textContent = String(e.visits);
					item.append(rankSpan, nameSpan, visitsSpan);
					lb.appendChild(item);
				});
			} else {
				const empty = document.createElement("div");
				empty.className = "empty";
				empty.textContent = "No visits";
				lb.appendChild(empty);
			}
		} catch {
			lb.textContent = "";
			const err = document.createElement("div");
			err.className = "empty";
			err.textContent = "Failed";
			lb.appendChild(err);
		}
	}

	private updateGrid(): void {
		const g = document.querySelector(".grid-section");
		if (g) {
			g.innerHTML = SiteGrid.render(
				this.filteredSites,
				this.session?.role === "admin",
				this.tags,
			);
			this.attachEventListeners();
		}
	}

	private async handleUploadMultiple(files: File[]): Promise<void> {
		if (!this.session || files.length === 0) return;
		let uploaded = 0;
		let failed = 0;
		for (const file of files) {
			try {
				const content = await file.text();
				await this.apiRequest(`${API}/sites`, {
					method: "POST",
					body: JSON.stringify({
						name: file.name.replace(/\.(html?)$/i, ""),
						content,
					}),
				});
				uploaded++;
			} catch {
				failed++;
			}
		}
		await this.loadSites();
		this.render();
		if (failed > 0) alert(`${uploaded} uploaded, ${failed} failed`);
		else if (uploaded > 1) alert(`${uploaded} files uploaded`);
	}

	private async handleDelete(id: string): Promise<void> {
		if (!confirm("Delete?")) return;
		try {
			await this.apiRequest(`${API}/sites/${id}`, { method: "DELETE" });
			this.sites = this.sites.filter((s) => s.id !== id);
			this.filterSites();
			this.render();
		} catch (err) {
			console.error(err);
		}
	}

	private async handleRename(id: string, currentName: string): Promise<void> {
		const newName = prompt("Neuer Name:", currentName);
		if (!newName || newName === currentName) return;
		try {
			await this.apiRequest(`${API}/sites/${id}`, {
				method: "PUT",
				body: JSON.stringify({ name: newName }),
			});
			await this.loadSites();
			this.render();
		} catch (err) {
			console.error(err);
			alert("Rename failed");
		}
	}

	private async showIconPicker(siteId: string): Promise<void> {
		const site = this.sites.find((s) => s.id === siteId);
		if (!site) return;

		const overlay = document.createElement("div");
		overlay.className = "settings-overlay";
		overlay.innerHTML = `
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `;
		document.body.appendChild(overlay);

		// Fetch icons from Lucide ESM module
		let allIcons: string[] = [];
		try {
			const res = await fetch(
				"https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js",
			);
			const text = await res.text();
			const matches = text.matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);
			for (const match of matches) {
				const name = match[1];
				const kebab = name
					.replace(/([A-Z])/g, "-$1")
					.toLowerCase()
					.replace(/^-/, "");
				allIcons.push(kebab);
			}
		} catch {
			allIcons = ["globe", "file", "image", "code", "link", "star", "heart"];
		}

		const grid = document.getElementById("icon-grid")!;
		const searchInput = document.getElementById(
			"icon-search",
		) as HTMLInputElement;

		const renderIcons = (filter: string) => {
			const filtered = filter
				? allIcons.filter((i) => i.toLowerCase().includes(filter.toLowerCase()))
				: allIcons.slice(0, 200);
			grid.innerHTML = filtered
				.slice(0, 80)
				.map(
					(icon) =>
						`<button class="icon-option ${site.icon === icon ? "selected" : ""}" data-icon="${icon}" title="${icon}">
          <i data-lucide="${icon}"></i>
        </button>`,
				)
				.join("");
			(window as any).lucide?.createIcons();
		};

		renderIcons("");

		grid.addEventListener("click", async (e) => {
			const btn = (e.target as Element).closest(".icon-option") as HTMLElement;
			if (!btn) return;
			const icon = btn.dataset.icon!;
			try {
				await this.apiRequest(`${API}/sites/${siteId}`, {
					method: "PUT",
					body: JSON.stringify({ icon }),
				});
				await this.loadSites();
				this.render();
				overlay.remove();
			} catch {
				alert("Icon update failed");
			}
		});

		searchInput.addEventListener("input", () => renderIcons(searchInput.value));
		document
			.getElementById("settings-close")
			?.addEventListener("click", () => overlay.remove());
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) overlay.remove();
		});
	}

	private async handleView(id: string): Promise<void> {
		if (!this.session) return;
		try {
			const site = await this.apiRequest<Site>(`${API}/sites/${id}`);
			this.viewer = new SiteViewer(site, () => {
				this.viewer = null;
				this.render();
			});
			this.viewer.open();
		} catch (err) {
			console.error(err);
		}
	}
}

// Load Lucide sprite locally
async function loadIconSprite() {
	try {
		const res = await fetch("/assets/icons/sprite.svg");
		const svg = await res.text();
		const div = document.createElement("div");
		div.id = "icon-sprite";
		div.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
		div.innerHTML = svg;
		document.body.insertBefore(div, document.body.firstChild);
	} catch (e) {
		console.warn("Could not load icon sprite:", e);
	}
}

loadIconSprite();

document.addEventListener("DOMContentLoaded", () => new App());
