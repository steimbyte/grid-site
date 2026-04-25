var x=Object.defineProperty;var S=(c,e,t)=>e in c?x(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var v=(c,e,t)=>S(c,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class k{static render(){return`
      <div class="uploader" id="uploader">
        <div class="uploader-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <h2>HTML-Datei hochladen</h2>
        <p>Ziehe eine Datei hierher oder klicke zum Auswählen</p>
        <input type="file" id="file-input" accept=".html,.htm" class="file-input">
        <label for="file-input" class="upload-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Datei auswählen
        </label>
      </div>
    `}}class w{static render(e,t=!1){return e.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${e.map(s=>{const r=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${s.id}">
          <div class="card-preview">
            <div class="card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>${w.escapeHtml(s.name)}</span>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${w.escapeHtml(s.name)}</h3>
            <p class="card-date">${r}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            ${t?`
            <button class="action-btn delete-btn" data-id="${s.id}" title="Löschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            `:""}
          </div>
        </div>
      `}).join("")}</div>`}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class ${constructor(e,t){v(this,"site");v(this,"onClose");v(this,"iframe",null);this.site=e,this.onClose=t}open(){var i;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t),setTimeout(()=>{const s=document.getElementById("site-iframe");s&&this.site.content&&(s.srcdoc=this.site.content)},100),(i=document.getElementById("viewer-close"))==null||i.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",s=>{s.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
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
    `}}class C{static render(e,t,i,s,r,d){return`
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <h1>Site Grid</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="username">${t}</span>
              <span class="role-badge ${e}">${e}</span>
            </div>
            <button class="icon-btn" id="leaderboard-btn" title="Leaderboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 21v-6m4 6v-10m4 10v-14"/>
                <rect x="4" y="12" width="4" height="9"/>
                <rect x="12" y="6" width="4" height="15"/>
                <rect x="16" y="3" width="4" height="18"/>
              </svg>
            </button>
            ${e==="admin"?`
            <button class="icon-btn" id="users-btn" title="User Management">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </button>
            `:""}
            <button class="icon-btn" id="settings-btn" title="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0 .33 1.82V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0 1-1.51 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1-2.83 0l-.06.06a1.65 1.65 0 0 0-.33-1.82V9a2 2 0 0 1 2-2 2 2 0 0 1 2 2h.09a1.65 1.65 0 0 0 1-1.51 1.65 1.65 0 0 0 1.82.33l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-.33-1.82V9a2 2 0 0 1 2-2 2 2 0 0 1 2 2h.09a1.65 1.65 0 0 0 1-1.51"/>
              </svg>
            </button>
            <button class="icon-btn logout-btn" id="logout-btn" title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    `}}class M{static render(){return`
      <div class="search-container">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Sites durchsuchen..."
          id="search-input"
        >
      </div>
    `}}class b{static render(){return`
      <div class="login-bg">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
      </div>
      
      <div class="login-form-card" id="login-card">
        <div class="card-glow" id="card-glow"></div>
        <div class="form-inner">
          <div class="form-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
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
            <span>Sign In</span>
          </button>
          
          <div class="login-toggle">
            <span id="toggle-text">New user?</span>
            <button id="btn-toggle">Create account</button>
          </div>
        </div>
      </div>
      
      <div class="login-error" id="login-error"></div>
    `}static init(e){const t=document.getElementById("login-username"),i=document.getElementById("login-password"),s=document.getElementById("btn-login"),r=document.getElementById("btn-toggle"),d=document.getElementById("toggle-text"),a=document.getElementById("login-error"),o=document.getElementById("login-card"),l=document.getElementById("card-glow");let n=!1;o==null||o.addEventListener("mousemove",m=>{if(!o||!l)return;const p=o.getBoundingClientRect(),f=m.clientX-p.left,E=m.clientY-p.top;l.style.background=`radial-gradient(circle at ${f}px ${E}px, var(--glow) 0%, transparent 50%)`,l.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{l&&(l.style.opacity="0")});const h=()=>{n=!n,n?(s.querySelector("span").textContent="Create Account",d.textContent="Have an account?",r.textContent="Sign in"):(s.querySelector("span").textContent="Sign In",d.textContent="New user?",r.textContent="Create account"),a.classList.remove("show")},u=async()=>{const m=t.value.trim(),p=i.value;if(!m){t.classList.add("shake"),a.textContent="Enter username",a.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!p){i.classList.add("shake"),a.textContent="Enter password",a.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}s.classList.add("loading"),a.classList.remove("show");try{await e(m,p,n)}catch(f){a.textContent=f instanceof Error?f.message:"Something went wrong",a.classList.add("show")}s.classList.remove("loading")};s==null||s.addEventListener("click",u),r==null||r.addEventListener("click",h),i==null||i.addEventListener("keydown",m=>{m.key==="Enter"&&u()}),t==null||t.addEventListener("input",()=>{a.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const L={accentColor:"#c9a227"};class y{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...L,...JSON.parse(e)}:{...L}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),i=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${r}, 0.4)`);const d=Math.min(255,i+30),a=Math.max(0,s-50),o=Math.max(0,r-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${d}, ${a}, ${o})`);const l=Math.max(0,i-100),n=Math.min(255,s+40),h=Math.min(255,r+20);document.documentElement.style.setProperty("--accent-sage",`rgb(${l}, ${n}, ${h})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${r}, 0.05)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${r}, 0.08)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${r}, 0.3)`)}static render(e){return`
      <div class="settings-popup">
        <h3>Settings</h3>
        
        <div class="settings-row">
          <label>Accent Color</label>
          <div class="color-picker-row">
            <input type="color" id="accent-color" value="${e.accentColor}">
            <span>${e.accentColor.toUpperCase()}</span>
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
        
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `}static init(e){const t=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),r=document.querySelector(".settings-overlay"),d=document.querySelectorAll(".preset");i==null||i.addEventListener("click",()=>r==null?void 0:r.remove()),s==null||s.addEventListener("input",a=>{const o=a.target.value,l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase()),e({accentColor:o})}),d.forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.color;s&&(s.value=o);const l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase()),e({accentColor:o})})})}}const g="http://localhost:3000/api";class B{constructor(){v(this,"session",null);v(this,"settings",{accentColor:"#c9a227"});v(this,"sites",[]);v(this,"filteredSites",[]);v(this,"searchQuery","");v(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const i=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!i.ok){const s=await i.json().catch(()=>({error:"Request failed"}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{console.warn("Invalid session, clearing...")}this.clearSession(),this.renderLogin()}saveSession(){this.session&&localStorage.setItem("site-grid-session",JSON.stringify(this.session))}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}async loadSites(){try{this.sites=await this.apiRequest(`${g}/sites`),this.filteredSites=[...this.sites]}catch(e){console.error("Failed to load sites:",e),this.clearSession(),this.renderLogin()}}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}filterSites(){if(!this.searchQuery){this.filteredSites=[...this.sites];return}const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>t.name.toLowerCase().includes(e))}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",i=>{i.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(y.render(this.settings));y.init(i=>{this.settings=i,y.save(i)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(`
      <div class="settings-popup">
        <h3>🏆 Leaderboard</h3>
        <div class="leaderboard-list" id="leaderboard-list">
          <div class="leaderboard-loading">Loading...</div>
        </div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `);(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),this.loadLeaderboard()}async loadLeaderboard(){const e=document.getElementById("leaderboard-list");if(e)try{const t=await fetch(`${g}/leaderboard`).then(i=>i.json());if(!t.length){e.innerHTML='<div class="leaderboard-empty">No visits yet</div>';return}e.innerHTML=t.map((i,s)=>`
        <div class="leaderboard-item ${s===0?"gold":s===1?"silver":s===2?"bronze":""}">
          <span class="rank">#${s+1}</span>
          <span class="name">${this.escapeHtml(i.username)}</span>
          <span class="visits">${i.visits} visits</span>
        </div>
      `).join("")}catch{e.innerHTML='<div class="leaderboard-empty">Failed to load</div>'}}showUserManagement(){var t,i;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay(`
      <div class="settings-popup user-management">
        <h3>👥 User Management</h3>
        <div class="user-list" id="user-list">
          <div class="loading">Loading...</div>
        </div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `);(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(!(!e||!this.session))try{const t=await this.apiRequest(`${g}/admin/users`);e.innerHTML=t.map(i=>`
        <div class="user-item" data-id="${i.id}">
          <div class="user-info">
            <span class="user-name">${this.escapeHtml(i.username)}</span>
            <span class="user-role ${i.role}">${i.role}</span>
          </div>
          <div class="user-stats">
            <span>${i.visits} visits</span>
          </div>
          <div class="user-actions">
            ${i.role!=="admin"?`<button class="user-btn promote" data-id="${i.id}">Promote</button>`:""}
            ${t.filter(s=>s.role==="admin").length>1||i.role!=="admin"?`<button class="user-btn delete" data-id="${i.id}">Delete</button>`:""}
          </div>
        </div>
      `).join(""),e.querySelectorAll(".promote").forEach(i=>{i.addEventListener("click",()=>void this.promoteUser(i.dataset.id))}),e.querySelectorAll(".delete").forEach(i=>{i.addEventListener("click",()=>void this.deleteUser(i.dataset.id))})}catch{e.innerHTML='<div class="error">Failed to load</div>'}}async promoteUser(e){if(confirm("Promote this user to admin?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Failed to promote")}}async deleteUser(e){if(confirm("Delete this user?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Failed to delete")}}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=b.render(),b.init(this.handleAuth.bind(this)))}render(){var t,i,s,r;const e=document.getElementById("app");e&&(e.innerHTML=`
      <div class="app-container">
        ${C.render(((t=this.session)==null?void 0:t.role)??"user",((i=this.session)==null?void 0:i.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((s=this.session)==null?void 0:s.role)==="admin"?this.showUserManagement.bind(this):void 0)}
        <div class="upload-section">
          ${M.render()}
          ${k.render()}
        </div>
        <div class="grid-section">
          ${w.render(this.filteredSites,((r=this.session)==null?void 0:r.role)==="admin")}
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners())}attachEventListeners(){var r,d,a,o,l;const e=document.getElementById("app");if(!e)return;(r=e.querySelector("#logout-btn"))==null||r.addEventListener("click",()=>this.handleLogout()),(d=e.querySelector("#settings-btn"))==null||d.addEventListener("click",()=>this.showSettings()),(a=e.querySelector("#leaderboard-btn"))==null||a.addEventListener("click",()=>this.showLeaderboard()),(o=e.querySelector("#users-btn"))==null||o.addEventListener("click",()=>this.showUserManagement());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",n=>{this.searchQuery=n.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",h=>{var u;h.stopPropagation(),((u=this.session)==null?void 0:u.role)==="admin"&&this.handleDelete(n.dataset.id)})}),e.querySelectorAll(".view-btn, .site-card").forEach(n=>{n.addEventListener("click",()=>{this.handleView(n.dataset.id)})});const i=e.querySelector("#file-input");i==null||i.addEventListener("change",async n=>{var u;const h=(u=n.target.files)==null?void 0:u[0];h&&(await this.handleUpload(h),i.value="")});const s=e.querySelector(".uploader");s==null||s.addEventListener("dragover",n=>{n.preventDefault(),s.classList.add("drag-over")}),s==null||s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s==null||s.addEventListener("drop",async n=>{var u;n.preventDefault(),s.classList.remove("drag-over");const h=(u=n.dataTransfer)==null?void 0:u.files[0];h&&await this.handleUpload(h)}),(l=e.querySelector("#back-btn"))==null||l.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=w.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin"),this.attachEventListeners())}async handleAuth(e,t,i){const s=i?"/auth/register":"/auth/login";try{const r=await this.apiRequest(`${g}${s}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:r.token,role:r.role,username:r.username,userId:r.id},this.saveSession(),await this.loadSites(),this.render()}catch(r){throw r}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}async handleUpload(e){if(this.session)try{const t=await e.text();await this.apiRequest(`${g}/sites`,{method:"POST",body:JSON.stringify({name:e.name.replace(/\.(html?)$/i,""),content:t})}),await this.loadSites(),this.render()}catch(t){console.error("Upload failed:",t),alert("Upload failed")}}async handleDelete(e){if(confirm("Delete this site?"))try{await this.apiRequest(`${g}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error("Delete failed:",t)}}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${g}/sites/${e}`);this.viewer=new $(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error("Load failed:",t)}}}document.addEventListener("DOMContentLoaded",()=>new B);
