var $=Object.defineProperty;var C=(p,t,e)=>t in p?$(p,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):p[t]=e;var y=(p,t,e)=>C(p,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class k{static render(){return`
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `}static init(){}}class w{static render(t,e=!1,i=[]){return t.length===0?`
        <div class="empty-state">
          <i data-lucide="folder-open"></i>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`
      <div class="site-grid">
        ${t.map(s=>{const n=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
            <div class="site-card" data-id="${s.id}" draggable="true">
              <div class="card-preview">
                <div class="card-icon-display" data-site-id="${s.id}">
                  <i data-lucide="${s.icon||"globe"}"></i>
                </div>
                <div class="card-views" title="Views">
                  <i data-lucide="eye"></i>
                  <span>${s.views||0}</span>
                </div>
                ${s.tags&&s.tags.length?`
                  <div class="card-tags">
                    ${s.tags.map(a=>`<span class="card-tag" style="background:${a.color}">${w.escapeHtml(a.name)}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <div class="card-info">
                <h3 class="card-title">${w.escapeHtml(s.name)}</h3>
                <p class="card-date">${n}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
                  <i data-lucide="eye"></i>
                </button>
                ${e?`
                <button class="action-btn icon-btn" data-id="${s.id}" title="Icon waehlen">
                  <i data-lucide="smile"></i>
                </button>
                <button class="action-btn rename-btn" data-id="${s.id}" data-name="${w.escapeHtml(s.name)}" title="Umbenennen">
                  <i data-lucide="pencil"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${s.id}" title="Loeschen">
                  <i data-lucide="trash-2"></i>
                </button>
                `:""}
              </div>
            </div>
          `}).join("")}
      </div>
    `}static renderSkeleton(t=6){return`
      <div class="site-grid">
        ${Array.from({length:t}).map(()=>`
          <div class="skeleton-card">
            <div class="skeleton-preview skeleton-shimmer"></div>
            <div class="skeleton-info">
              <div class="skeleton-line skeleton-shimmer medium"></div>
              <div class="skeleton-line skeleton-shimmer short"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `}static escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}}class x{constructor(t,e){y(this,"site");y(this,"onClose");this.site=t,this.onClose=e}escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}open(){var u;const t=document.querySelector(".app-container");if(!t)return;const e=document.createElement("div");e.className="viewer-overlay",e.innerHTML=this.render(),t.appendChild(e),window.lucide&&window.lucide.createIcons();const i=document.getElementById("site-iframe"),s=document.getElementById("iframe-loader"),n=document.getElementById("iframe-error"),a=document.getElementById("iframe-retry"),c=document.getElementById("viewer-reload"),o=setTimeout(()=>{s==null||s.classList.add("hidden"),n==null||n.removeAttribute("hidden"),i.style.display="none"},1e4),r=()=>{if(clearTimeout(o),s==null||s.classList.remove("hidden"),n==null||n.setAttribute("hidden",""),i.style.display="",i.classList.remove("loaded"),i&&this.site.content){const d=getComputedStyle(document.documentElement).getPropertyValue("--bg-deep")||"#0a0a0f",g=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#c9a227",f=getComputedStyle(document.documentElement).getPropertyValue("--border-accent")||"#333";i.srcdoc=`<html><body style="background:${d};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
					<div style="width:48px;height:48px;border:3px solid ${f};border-top-color:${g};border-radius:50%;animation:spin 1s linear infinite;"></div>
					<style>@keyframes spin{to{transform:rotate(360deg)}}</style>
				</body></html>`,setTimeout(()=>{i.srcdoc=this.site.content},100)}};i&&(i.onload=()=>{clearTimeout(o),s==null||s.classList.add("hidden"),i.classList.add("loaded");try{const d=i.contentDocument;d&&(d.documentElement.style.backgroundColor="#0a0a0f",d.body.style.backgroundColor="#0a0a0f")}catch{}},i.onerror=()=>{clearTimeout(o),s==null||s.classList.add("hidden"),n==null||n.removeAttribute("hidden"),i.style.display="none"}),(u=document.getElementById("viewer-close"))==null||u.addEventListener("click",()=>{e.remove(),this.onClose()}),a==null||a.addEventListener("click",r),c==null||c.addEventListener("click",r),e.addEventListener("click",d=>{d.target===e&&(e.remove(),this.onClose())}),document.addEventListener("keydown",d=>{d.key==="Escape"&&(e.remove(),this.onClose()),d.ctrlKey&&d.key==="r"&&(d.preventDefault(),r())}),r()}render(){return`
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
		`}}class T{static render(t,e,i,s,n,a,c,o,r,u){return`
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <i data-lucide="layout-grid"></i>
            <h1>Site Grid</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="role-badge ${t}">${e}</span>
            </div>
            <button class="icon-btn" id="grid-size-btn" title="Grid Size">
              <i data-lucide="layout-grid"></i>
            </button>
            <button class="icon-btn" id="leaderboard-btn" title="Leaderboard">
              <i data-lucide="bar-chart-3"></i>
            </button>
            <button class="icon-btn" id="export-btn" title="Export Sites">
              <i data-lucide="download"></i>
            </button>
            ${t==="admin"?`
            <button class="icon-btn" id="users-btn" title="User Management">
              <i data-lucide="users"></i>
            </button>
            <button class="icon-btn" id="tags-btn" title="Manage Tags">
              <i data-lucide="tag"></i>
            </button>
            <button class="icon-btn" id="site-settings-btn" title="Site Settings">
              <i data-lucide="sliders"></i>
            </button>
            `:""}
            <button class="icon-btn" id="settings-btn" title="Settings">
              <i data-lucide="settings"></i>
            </button>
            <button class="icon-btn logout-btn" id="logout-btn" title="Logout">
              <i data-lucide="log-out"></i>
            </button>
          </div>
        </div>
      </header>
    `}static init(){}}class I{static render(){return`
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Sites durchsuchen..."
          id="search-input"
        >
      </div>
    `}}class S{static render(){return`
      <div class="login-bg">
      </div>
      
      <div class="login-form-card" id="login-card">
        <div class="card-glow" id="card-glow"></div>
        <div class="form-inner">
          <div class="form-logo">
            <i data-lucide="layout-grid"></i>
          </div>
          
          <h2>Welcome to Grid-View</h2>
          
          <div class="field">
            <input 
              type="text" 
              id="login-username" 
              placeholder="Username"
              autocomplete="username"
            >
          </div>
          
          <div class="field">
            <input 
              type="password" 
              id="login-password" 
              placeholder="Password"
              autocomplete="current-password"
            >
          </div>
          
          <button class="submit-btn" id="btn-login">
            <span class="btn-text">Sign In</span>
            <span class="btn-loader"></span>
          </button>
          
          <div class="login-toggle">
            <span id="toggle-text">New user?</span>
            <button id="btn-toggle">Create account</button>
          </div>
        </div>
      </div>
      
      <div class="login-error" id="login-error"></div>
    `}static init(t){const e=document.getElementById("login-username"),i=document.getElementById("login-password"),s=document.getElementById("btn-login"),n=s.querySelector(".btn-text"),a=document.getElementById("btn-toggle"),c=document.getElementById("toggle-text"),o=document.getElementById("login-error"),r=document.getElementById("login-card"),u=document.getElementById("card-glow");let d=!1;r==null||r.addEventListener("mousemove",v=>{if(!r||!u)return;const l=r.getBoundingClientRect(),m=v.clientX-l.left,E=v.clientY-l.top;u.style.background=`radial-gradient(circle at ${m}px ${E}px, var(--glow) 0%, transparent 50%)`,u.style.opacity="1"}),r==null||r.addEventListener("mouseleave",()=>{u&&(u.style.opacity="0")});const g=()=>{d=!d,d?(n.textContent="Create Account",c.textContent="Have an account?",a.textContent="Sign in"):(n.textContent="Sign In",c.textContent="New user?",a.textContent="Create account"),o.classList.remove("show")},f=async()=>{const v=e.value.trim(),l=i.value;if(!v){e.classList.add("shake"),o.textContent="Enter username",o.classList.add("show"),setTimeout(()=>e.classList.remove("shake"),400);return}if(!l){i.classList.add("shake"),o.textContent="Enter password",o.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}s.classList.add("loading"),s.disabled=!0,o.classList.remove("show");try{await t(v,l,d)}catch(m){o.textContent=m instanceof Error?m.message:"Something went wrong",o.classList.add("show"),s.classList.remove("loading"),s.disabled=!1}};s==null||s.addEventListener("click",f),a==null||a.addEventListener("click",g),i==null||i.addEventListener("keydown",v=>{v.key==="Enter"&&f()}),e==null||e.addEventListener("input",()=>{o.classList.remove("show")}),setTimeout(()=>e==null?void 0:e.focus(),100)}}const L={accentColor:"#c9a227",gridSize:"normal"};class b{static load(){const t=localStorage.getItem("site-grid-settings");return t?{...L,...JSON.parse(t)}:{...L}}static save(t){localStorage.setItem("site-grid-settings",JSON.stringify(t)),this.apply(t)}static apply(t){const e=t.accentColor.replace("#",""),i=parseInt(e.slice(0,2),16),s=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16);document.documentElement.style.setProperty("--accent",t.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${n}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${i}, ${s}, ${n}, 0.5)`);const a=Math.max(0,i-20),c=Math.max(0,s-30),o=Math.max(0,n-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${a}, ${c}, ${o})`);const r=Math.max(0,i-80),u=Math.min(255,s+30),d=Math.min(255,n+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${r}, ${u}, ${d})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${n}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${n}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${n}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${i}, ${s}, ${n}, 0.4)`)}static render(t){return`
      <div class="settings-popup">
        <h3>Settings</h3>
        
        <div class="settings-row">
          <label>Accent Color</label>
          <div class="color-picker-row">
            <input type="color" id="accent-color" value="${t.accentColor}">
            <span>${t.accentColor.toUpperCase()}</span>
          </div>
        </div>
        
        <div class="settings-presets">
          <button class="preset" data-color="#c9a227" style="background: #c9a227;" title="Gold"></button>
          <button class="preset" data-color="#e07020" style="background: #e07020;" title="Copper"></button>
          <button class="preset" data-color="#5a8a6a" style="background: #5a8a6a;" title="Sage"></button>
          <button class="preset" data-color="#c04040" style="background: #c04040;" title="Crimson"></button>
          <button class="preset" data-color="#4080c0" style="background: #4080c0;" title="Steel"></button>
          <button class="preset" data-color="#8060c0" style="background: #8060c0;" title="Amethyst"></button>
        </div>
        
        <div class="settings-row">
          <label>Grid Size</label>
          <div class="grid-size-options">
            <button class="grid-option ${t.gridSize==="small"?"active":""}" data-size="small">S</button>
            <button class="grid-option ${t.gridSize==="normal"?"active":""}" data-size="normal">M</button>
            <button class="grid-option ${t.gridSize==="large"?"active":""}" data-size="large">L</button>
          </div>
        </div>
        
        <button class="settings-close" id="settings-close"><i data-lucide="x"></i> Close</button>
      </div>
    `}static init(t){const e=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),a=document.querySelectorAll(".preset"),c=document.querySelectorAll(".grid-option");i==null||i.addEventListener("click",()=>n==null?void 0:n.remove()),s==null||s.addEventListener("input",o=>{const r=o.target.value,u=e==null?void 0:e.querySelector(".color-picker-row span");u&&(u.textContent=r.toUpperCase());const d=b.load();t({...d,accentColor:r})}),a.forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.color;s&&(s.value=r);const u=e==null?void 0:e.querySelector(".color-picker-row span");u&&(u.textContent=r.toUpperCase());const d=b.load();t({...d,accentColor:r})})}),c.forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.size,u=b.load();t({...u,gridSize:r}),c.forEach(d=>d.classList.remove("active")),o.classList.add("active"),document.body.className=`grid-${r}`})})}}const q={success:"check-circle",error:"alert-circle",info:"info",warning:"alert-triangle"};class N{constructor(){y(this,"container");this.container=this.createContainer()}createContainer(){const t=document.getElementById("toast-container");if(t)return t;const e=document.createElement("div");return e.id="toast-container",e.setAttribute("role","alert"),e.setAttribute("aria-live","polite"),document.body.appendChild(e),e}show(t,e="info",i={}){var u;const{duration:s=4e3,dismissible:n=!0}=i,a=document.createElement("div");a.className=`toast toast-${e}`;const c=document.createElement("i");c.setAttribute("data-lucide",q[e]),c.className="toast-icon",a.appendChild(c);const o=document.createElement("span");if(o.className="toast-message",o.textContent=t,a.appendChild(o),n){const d=document.createElement("button");d.className="toast-close",d.setAttribute("aria-label","Close"),d.textContent="×",a.appendChild(d)}this.container.appendChild(a),window.lucide&&window.lucide.createIcons({nodes:[a]}),requestAnimationFrame(()=>{a.classList.add("show")});const r=setTimeout(()=>this.dismiss(a),s);n&&((u=a.querySelector(".toast-close"))==null||u.addEventListener("click",()=>{clearTimeout(r),this.dismiss(a)}))}dismiss(t){t.classList.remove("show"),t.classList.add("hide"),setTimeout(()=>t.remove(),300)}success(t,e){this.show(t,"success",e)}error(t,e){this.show(t,"error",{...e,duration:(e==null?void 0:e.duration)??6e3})}info(t,e){this.show(t,"info",e)}warning(t,e){this.show(t,"warning",e)}}const A=new N;let h="http://localhost:3000/api";class B{constructor(){y(this,"session",null);y(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});y(this,"sites",[]);y(this,"filteredSites",[]);y(this,"tags",[]);y(this,"searchQuery","");y(this,"viewer",null);this.settings=b.load(),b.apply(this.settings),this.initCursorGlow(),this.initApiUrl()}async initApiUrl(){try{const e=await(await fetch("/api/config")).json();e.frontendUrl&&(h=`${e.frontendUrl.replace(/\/$/,"")}/api`)}catch{}this.loadTags(),await this.checkSession()}getAuthHeaders(){var t;return{Authorization:`Bearer ${((t=this.session)==null?void 0:t.token)??""}`,"Content-Type":"application/json"}}async apiRequest(t,e={}){const i=await fetch(t,{...e,headers:{...this.getAuthHeaders(),...e.headers}});if(!i.ok){const s=await i.json().catch(()=>({error:"Request failed"}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}async checkSession(){const t=localStorage.getItem("site-grid-session");if(t)try{this.session=JSON.parse(t);const e=document.getElementById("app");e&&(e.innerHTML=`
            <div class="skeleton-header">
              <div class="skeleton-logo"></div>
              <div class="skeleton-actions"></div>
            </div>
            ${w.renderSkeleton(6)}
          `),await this.loadSites(),await this.loadTags(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const t=document.createElement("div");t.className="cursor-glow",document.body.appendChild(t),document.addEventListener("mousemove",e=>{t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${h}/tags`).then(t=>t.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${h}/sites`),this.filterSites()}catch{A.error("Failed to load sites")}}filterSites(){const t=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(e=>{var i;return e.name.toLowerCase().includes(t)||((i=e.content)==null?void 0:i.toLowerCase().includes(t))})}createOverlay(t){const e=document.createElement("div");return e.className="settings-overlay",e.innerHTML=t,document.body.appendChild(e),e.addEventListener("click",i=>{i.target===e&&e.remove()}),e}showSettings(){var e;if(document.querySelector(".settings-overlay"))return;const t=this.createOverlay(b.render(this.settings));b.init(i=>{this.settings=i,b.save(i),b.apply(i)}),(e=document.getElementById("settings-close"))==null||e.addEventListener("click",()=>t.remove())}showLeaderboard(){var e;if(document.querySelector(".settings-overlay"))return;const t=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(e=document.getElementById("settings-close"))==null||e.addEventListener("click",()=>t.remove()),this.apiRequest(`${h}/leaderboard`).then(i=>{const s=document.getElementById("leaderboard-list");if(s)if(s.textContent="",i.length)i.forEach((n,a)=>{const c=document.createElement("div");c.className=`leaderboard-item ${a===0?"gold":a===1?"silver":a===2?"bronze":""}`;const o=document.createElement("span");o.className="name",o.textContent=n.username;const r=document.createElement("span");r.className="rank",r.textContent=`#${a+1}`,c.append(r),c.appendChild(o);const u=document.createElement("span");u.className="visits",u.textContent=`${n.visits} visits`,c.appendChild(u),s.appendChild(c)});else{const n=document.createElement("div");n.className="empty",n.textContent="No visits yet",s.appendChild(n)}}).catch(()=>{const i=document.getElementById("leaderboard-list");if(i){i.textContent="";const s=document.createElement("div");s.className="empty",s.textContent="Failed to load",i.appendChild(s)}})}showUserManagement(){var e,i;if(((e=this.session)==null?void 0:e.role)!=="admin"||document.querySelector(".settings-overlay"))return;const t=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>t.remove()),this.loadUserList()}async loadUserList(){const t=document.getElementById("user-list");if(t)try{const[e,i]=await Promise.all([this.apiRequest(`${h}/admin/users`),this.apiRequest(`${h}/settings`)]);t.textContent="",e.forEach(s=>{var u;const n=document.createElement("div");n.className="user-item";const a=document.createElement("div");a.className="user-info";const c=document.createElement("span");c.className="user-name",c.textContent=s.username;const o=document.createElement("span");o.className=`user-role ${s.role}`,o.textContent=s.role,a.append(c,o);const r=document.createElement("div");if(r.className="user-stats",r.textContent=`${s.visits} visits`,n.append(a,r),s.role!=="admin"){const d=document.createElement("div");d.className="user-upload-toggle",d.innerHTML=`<label><input type="checkbox" class="user-upload-perm" data-id="${s.id}" ${((u=i.userSettings)==null?void 0:u[s.id])!==!1?"checked":""}> <span>Upload</span></label>`,n.append(d);const g=document.createElement("div");g.className="user-actions",g.innerHTML=`<button class="user-btn promote" data-id="${s.id}">Promote</button><button class="user-btn delete" data-id="${s.id}">Delete</button>`,n.append(g)}else{const d=document.createElement("div");d.className="user-actions",d.innerHTML=`<button class="user-btn delete" data-id="${s.id}">Delete</button>`,n.append(d)}t.appendChild(n)}),t.querySelectorAll(".user-upload-perm").forEach(s=>{s.addEventListener("change",async n=>{const a=n.target.dataset.id,c=n.target.checked;await this.apiRequest(`${h}/settings`,{method:"PUT",body:JSON.stringify({userSettings:{...i.userSettings,[a]:c}})})})}),t.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),t.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{t.textContent="";const e=document.createElement("div");e.className="error",e.textContent="Failed",t.appendChild(e)}}async promoteUser(t){if(confirm("Promote?"))try{await this.apiRequest(`${h}/admin/users/${t}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(e){alert(e instanceof Error?e.message:"Error")}}async deleteUser(t){if(confirm("Delete?"))try{await this.apiRequest(`${h}/admin/users/${t}`,{method:"DELETE"}),this.loadUserList()}catch(e){alert(e instanceof Error?e.message:"Error")}}showTags(){var e,i,s;if(((e=this.session)==null?void 0:e.role)!=="admin"||document.querySelector(".settings-overlay"))return;const t=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>t.remove()),this.renderTags(),(s=document.getElementById("add-tag-btn"))==null||s.addEventListener("click",async()=>{var c,o;const n=(c=document.getElementById("new-tag-name"))==null?void 0:c.value,a=(o=document.getElementById("new-tag-color"))==null?void 0:o.value;n&&(await fetch(`${h}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:n,color:a})}),this.tags=await fetch(`${h}/tags`).then(r=>r.json()),this.renderTags())})}async showSiteSettings(){var i,s,n,a;if(((i=this.session)==null?void 0:i.role)!=="admin"||document.querySelector(".settings-overlay"))return;const t=await this.apiRequest(`${h}/settings`),e=this.createOverlay(`<div class="settings-popup"><h3>Site Settings</h3><div class="setting-row"><label><input type="checkbox" id="uploads-enabled" ${t.uploadsEnabled!==!1?"checked":""}> <span>Uploads erlaubt</span></label></div><button class="settings-close" id="settings-close">Close</button></div>`);(s=window.lucide)==null||s.createIcons(),(n=document.getElementById("settings-close"))==null||n.addEventListener("click",()=>e.remove()),(a=document.getElementById("uploads-enabled"))==null||a.addEventListener("change",async c=>{const o=c.target.checked;await this.apiRequest(`${h}/settings`,{method:"PUT",body:JSON.stringify({uploadsEnabled:o})})})}async renderTags(){const t=document.getElementById("tags-list");t&&(t.textContent="",this.tags.forEach(e=>{const i=document.createElement("div");i.className="tag-item";const s=document.createElement("span");s.className="tag-dot",s.style.background=e.color;const n=document.createElement("span");n.textContent=e.name;const a=document.createElement("button");a.className="tag-delete",a.dataset.id=e.id,a.textContent="X",i.append(s,n,a),t.appendChild(i)}),t.querySelectorAll(".tag-delete").forEach(e=>e.addEventListener("click",async()=>{await fetch(`${h}/tags/${e.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${h}/tags`).then(i=>i.json()),this.renderTags()})))}toggleGridSize(){const t=["small","normal","large"],e=t.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=t[(e+1)%t.length],b.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${h}/export`,"_blank")}renderLogin(){const t=document.getElementById("app");t&&(t.innerHTML=S.render(),S.init(this.handleAuth.bind(this)))}async handleAuth(t,e,i){try{const s=await this.apiRequest(`${h}/auth/${i?"register":"login"}`,{method:"POST",body:JSON.stringify({username:t,password:e})});this.session={token:s.token,role:s.role,username:s.username,userId:s.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(s){throw s}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var e,i,s,n;const t=document.getElementById("app");t&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,t.innerHTML=`
      <div class="app-container">
        ${T.render(((e=this.session)==null?void 0:e.role)??"user",((i=this.session)==null?void 0:i.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((s=this.session)==null?void 0:s.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this),this.showSiteSettings.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${I.render()}
            <div class="grid-section">
              ${w.render(this.filteredSites,((n=this.session)==null?void 0:n.role)==="admin",this.tags)}
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
            ${k.render()}
          </aside>
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var n,a,c,o,r,u,d,g,f,v;window.lucide&&!document.querySelector(".lucide-create-icons-called")&&(window.lucide.createIcons(),document.body.classList.add("lucide-create-icons-called"));const t=document.getElementById("app");if(!t)return;(n=t.querySelector("#logout-btn"))==null||n.addEventListener("click",()=>this.handleLogout()),(a=t.querySelector("#settings-btn"))==null||a.addEventListener("click",()=>this.showSettings()),(c=t.querySelector("#leaderboard-btn"))==null||c.addEventListener("click",()=>this.showLeaderboard()),(o=t.querySelector("#grid-size-btn"))==null||o.addEventListener("click",()=>this.toggleGridSize()),(r=t.querySelector("#sidebar-upload-btn"))==null||r.addEventListener("click",()=>{var l;return(l=document.querySelector("#file-input"))==null?void 0:l.click()}),(u=t.querySelector("#users-btn"))==null||u.addEventListener("click",()=>this.showUserManagement()),(d=t.querySelector("#tags-btn"))==null||d.addEventListener("click",()=>this.showTags()),(g=t.querySelector("#site-settings-btn"))==null||g.addEventListener("click",()=>this.showSiteSettings()),(f=t.querySelector("#export-btn"))==null||f.addEventListener("click",()=>this.exportZip());const e=t.querySelector(".search-input");e==null||e.addEventListener("input",l=>{this.searchQuery=l.target.value,this.filterSites(),this.updateGrid()}),t.querySelectorAll(".delete-btn").forEach(l=>l.addEventListener("click",m=>{var E;m.stopPropagation(),((E=this.session)==null?void 0:E.role)==="admin"&&this.handleDelete(l.dataset.id)})),t.querySelectorAll(".rename-btn").forEach(l=>l.addEventListener("click",m=>{m.stopPropagation(),this.handleRename(l.dataset.id,l.dataset.name)})),t.querySelectorAll(".icon-btn").forEach(l=>l.addEventListener("click",m=>{m.stopPropagation(),this.showIconPicker(l.dataset.id)})),t.querySelectorAll(".view-btn").forEach(l=>{l.addEventListener("click",m=>{m.stopPropagation(),this.handleView(l.dataset.id)})}),t.querySelectorAll(".site-card").forEach(l=>{l.addEventListener("click",m=>{m.target.closest(".card-actions")||this.handleView(l.dataset.id)})});const i=t.querySelector("#file-input");i==null||i.addEventListener("change",async l=>{const m=l.target.files;m!=null&&m.length&&(await this.handleUploadMultiple(Array.from(m)),i.value="")});const s=t.querySelector(".uploader");s==null||s.addEventListener("dragover",l=>{l.preventDefault(),s.classList.add("drag-over")}),s==null||s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s==null||s.addEventListener("drop",async l=>{var E;l.preventDefault(),s.classList.remove("drag-over");const m=(E=l.dataTransfer)==null?void 0:E.files;m!=null&&m.length&&await this.handleUploadMultiple(Array.from(m))}),(v=t.querySelector("#back-btn"))==null||v.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",l=>{var m;l.target instanceof HTMLInputElement||(l.key==="/"&&(l.preventDefault(),e==null||e.focus()),(l.key==="n"||l.key==="N")&&(l.preventDefault(),(m=document.querySelector("#file-input"))==null||m.click()))})}async loadSidebarData(){try{const e=await this.apiRequest(`${h}/stats`);document.getElementById("stat-logins").textContent=String(e.totalLogins),document.getElementById("stat-users").textContent=String(e.totalUsers),document.getElementById("stat-sites").textContent=String(e.totalSites)}catch{}const t=document.getElementById("sidebar-leaderboard");if(t)try{const e=await this.apiRequest(`${h}/leaderboard?limit=5`);if(t.textContent="",e.length)e.forEach((i,s)=>{const n=document.createElement("div");n.className=`sidebar-item ${s===0?"gold":s===1?"silver":s===2?"bronze":""}`;const a=document.createElement("span");a.className="sidebar-rank",a.textContent=String(s+1);const c=document.createElement("span");c.className="sidebar-name",c.textContent=i.username;const o=document.createElement("span");o.className="sidebar-visits",o.textContent=String(i.visits),n.append(a,c,o),t.appendChild(n)});else{const i=document.createElement("div");i.className="empty",i.textContent="No visits",t.appendChild(i)}}catch{t.textContent="";const e=document.createElement("div");e.className="empty",e.textContent="Failed",t.appendChild(e)}}updateGrid(){var e;const t=document.querySelector(".grid-section");t&&(t.innerHTML=w.render(this.filteredSites,((e=this.session)==null?void 0:e.role)==="admin",this.tags),this.attachEventListeners())}async handleUploadMultiple(t){if(!this.session||t.length===0)return;let e=0,i=0;for(const s of t)try{const n=await s.text();await this.apiRequest(`${h}/sites`,{method:"POST",body:JSON.stringify({name:s.name.replace(/\.(html?)$/i,""),content:n})}),e++}catch{i++}await this.loadSites(),this.render(),i>0?alert(`${e} uploaded, ${i} failed`):e>1&&alert(`${e} files uploaded`)}async handleDelete(t){if(confirm("Delete?"))try{await this.apiRequest(`${h}/sites/${t}`,{method:"DELETE"}),this.sites=this.sites.filter(e=>e.id!==t),this.filterSites(),this.render()}catch(e){console.error(e)}}async handleRename(t,e){const i=prompt("Neuer Name:",e);if(!(!i||i===e))try{await this.apiRequest(`${h}/sites/${t}`,{method:"PUT",body:JSON.stringify({name:i})}),await this.loadSites(),this.render()}catch(s){console.error(s),alert("Rename failed")}}async showIconPicker(t){var o;const e=this.sites.find(r=>r.id===t);if(!e)return;const i=document.createElement("div");i.className="settings-overlay",i.innerHTML=`
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,document.body.appendChild(i);let s=[];try{const d=(await(await fetch("https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js")).text()).matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);for(const g of d){const v=g[1].replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");s.push(v)}}catch{s=["globe","file","image","code","link","star","heart"]}const n=document.getElementById("icon-grid"),a=document.getElementById("icon-search"),c=r=>{var d;const u=r?s.filter(g=>g.toLowerCase().includes(r.toLowerCase())):s.slice(0,200);n.innerHTML=u.slice(0,80).map(g=>`<button class="icon-option ${e.icon===g?"selected":""}" data-icon="${g}" title="${g}">
          <i data-lucide="${g}"></i>
        </button>`).join(""),(d=window.lucide)==null||d.createIcons()};c(""),n.addEventListener("click",async r=>{const u=r.target.closest(".icon-option");if(!u)return;const d=u.dataset.icon;try{await this.apiRequest(`${h}/sites/${t}`,{method:"PUT",body:JSON.stringify({icon:d})}),await this.loadSites(),this.render(),i.remove()}catch{alert("Icon update failed")}}),a.addEventListener("input",()=>c(a.value)),(o=document.getElementById("settings-close"))==null||o.addEventListener("click",()=>i.remove()),i.addEventListener("click",r=>{r.target===i&&i.remove()})}async handleView(t){if(this.session)try{const e=await this.apiRequest(`${h}/sites/${t}`);this.viewer=new x(e,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(e){console.error(e)}}}async function U(){try{const t=await(await fetch("/assets/icons/sprite.svg")).text(),e=document.createElement("div");e.id="icon-sprite",e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;",e.innerHTML=t,document.body.insertBefore(e,document.body.firstChild)}catch(p){console.warn("Could not load icon sprite:",p)}}U();document.addEventListener("DOMContentLoaded",()=>new B);
