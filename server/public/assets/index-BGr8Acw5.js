var E=Object.defineProperty;var k=(l,s,e)=>s in l?E(l,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[s]=e;var g=(l,s,e)=>k(l,typeof s!="symbol"?s+"":s,e);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();class S{static render(){return`
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
    `}}class w{static render(s,e=!1){return s.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${s.map(t=>{const n=new Date(t.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${t.id}">
          <div class="card-preview">
            <div class="card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>${w.escapeHtml(t.name)}</span>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${w.escapeHtml(t.name)}</h3>
            <p class="card-date">${n}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${t.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            ${e?`
            <button class="action-btn delete-btn" data-id="${t.id}" title="Löschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            `:""}
          </div>
        </div>
      `}).join("")}</div>`}static escapeHtml(s){const e=document.createElement("div");return e.textContent=s,e.innerHTML}}class ${constructor(s,e){g(this,"site");g(this,"onClose");g(this,"iframe",null);this.site=s,this.onClose=e}open(){var i;const s=document.querySelector(".app-container");if(!s)return;const e=document.createElement("div");e.className="viewer-overlay",e.innerHTML=this.render(),s.appendChild(e),setTimeout(()=>{const t=document.getElementById("site-iframe");t&&this.site.content&&(t.srcdoc=this.site.content)},100),(i=document.getElementById("viewer-close"))==null||i.addEventListener("click",()=>{e.remove(),this.onClose()}),e.addEventListener("click",t=>{t.target===e&&(e.remove(),this.onClose())}),document.addEventListener("keydown",t=>{t.key==="Escape"&&(e.remove(),this.onClose())})}render(){return`
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
    `}}class C{static render(s,e,i,t,n,o){return`
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
              <span class="username">${e}</span>
              <span class="role-badge ${s}">${s}</span>
            </div>
            <button class="icon-btn" id="leaderboard-btn" title="Leaderboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 21v-6m4 6v-10m4 10v-14"/>
                <rect x="4" y="12" width="4" height="9"/>
                <rect x="12" y="6" width="4" height="15"/>
                <rect x="16" y="3" width="4" height="18"/>
              </svg>
            </button>
            ${s==="admin"?`
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
    `}static init(s){const e=document.getElementById("login-username"),i=document.getElementById("login-password"),t=document.getElementById("btn-login"),n=document.getElementById("btn-toggle"),o=document.getElementById("toggle-text"),r=document.getElementById("login-error"),a=document.getElementById("login-card"),c=document.getElementById("card-glow");let d=!1;a==null||a.addEventListener("mousemove",m=>{if(!a||!c)return;const p=a.getBoundingClientRect(),f=m.clientX-p.left,x=m.clientY-p.top;c.style.background=`radial-gradient(circle at ${f}px ${x}px, var(--glow) 0%, transparent 50%)`,c.style.opacity="1"}),a==null||a.addEventListener("mouseleave",()=>{c&&(c.style.opacity="0")});const h=()=>{d=!d,d?(t.querySelector("span").textContent="Create Account",o.textContent="Have an account?",n.textContent="Sign in"):(t.querySelector("span").textContent="Sign In",o.textContent="New user?",n.textContent="Create account"),r.classList.remove("show")},u=async()=>{const m=e.value.trim(),p=i.value;if(!m){e.classList.add("shake"),r.textContent="Enter username",r.classList.add("show"),setTimeout(()=>e.classList.remove("shake"),400);return}if(!p){i.classList.add("shake"),r.textContent="Enter password",r.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}t.classList.add("loading"),r.classList.remove("show");try{await s(m,p,d)}catch(f){r.textContent=f instanceof Error?f.message:"Something went wrong",r.classList.add("show")}t.classList.remove("loading")};t==null||t.addEventListener("click",u),n==null||n.addEventListener("click",h),i==null||i.addEventListener("keydown",m=>{m.key==="Enter"&&u()}),e==null||e.addEventListener("input",()=>{r.classList.remove("show")}),setTimeout(()=>e==null?void 0:e.focus(),100)}}const L={accentColor:"#c9a227"};class y{static load(){const s=localStorage.getItem("site-grid-settings");return s?{...L,...JSON.parse(s)}:{...L}}static save(s){localStorage.setItem("site-grid-settings",JSON.stringify(s)),this.apply(s)}static apply(s){const e=s.accentColor.replace("#",""),i=parseInt(e.slice(0,2),16),t=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16);document.documentElement.style.setProperty("--accent",s.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${t}, ${n}, 0.4)`);const o=Math.min(255,i+30),r=Math.max(0,t-50),a=Math.max(0,n-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${o}, ${r}, ${a})`);const c=Math.max(0,i-100),d=Math.min(255,t+40),h=Math.min(255,n+20);document.documentElement.style.setProperty("--accent-sage",`rgb(${c}, ${d}, ${h})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${t}, ${n}, 0.05)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${t}, ${n}, 0.08)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${t}, ${n}, 0.3)`)}static render(s){return`
      <div class="settings-popup">
        <h3>Settings</h3>
        
        <div class="settings-row">
          <label>Accent Color</label>
          <div class="color-picker-row">
            <input type="color" id="accent-color" value="${s.accentColor}">
            <span>${s.accentColor.toUpperCase()}</span>
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
    `}static init(s){const e=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),t=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),o=document.querySelectorAll(".preset");i==null||i.addEventListener("click",()=>n==null?void 0:n.remove()),t==null||t.addEventListener("input",r=>{const a=r.target.value,c=e==null?void 0:e.querySelector(".color-picker-row span");c&&(c.textContent=a.toUpperCase()),s({accentColor:a})}),o.forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.color;t&&(t.value=a);const c=e==null?void 0:e.querySelector(".color-picker-row span");c&&(c.textContent=a.toUpperCase()),s({accentColor:a})})})}}const v="http://localhost:3000/api";class H{constructor(){g(this,"session",null);g(this,"settings",{accentColor:"#c9a227"});g(this,"sites",[]);g(this,"filteredSites",[]);g(this,"searchQuery","");g(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),this.checkSession()}authHeaders(){var s;return{Authorization:`Bearer ${(s=this.session)==null?void 0:s.token}`,"Content-Type":"application/json"}}async checkSession(){const s=localStorage.getItem("site-grid-session");if(s){try{this.session=JSON.parse(s);const e=await fetch(`${v}/api/sites`,{headers:this.authHeaders()});if(e.ok){this.sites=await e.json(),this.filteredSites=[...this.sites],this.render();return}}catch{}this.session=null,localStorage.removeItem("site-grid-session")}this.renderLogin()}saveSession(){this.session?localStorage.setItem("site-grid-session",JSON.stringify(this.session)):localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",i=>{e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`})}filterSites(){this.filteredSites=this.searchQuery?this.sites.filter(s=>s.name.toLowerCase().includes(this.searchQuery.toLowerCase())):[...this.sites]}showSettings(){if(document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=y.render(this.settings),y.init(i=>{this.settings=i,y.save(i)}),e.addEventListener("click",i=>{i.target===e&&e.remove()})}showLeaderboard(){var i;if(document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=`
      <div class="settings-popup">
        <h3>🏆 Leaderboard</h3>
        <div class="leaderboard-list" id="leaderboard-list"><div class="leaderboard-loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),e.addEventListener("click",t=>{t.target===e&&e.remove()}),fetch(`${v}/api/leaderboard`).then(t=>t.json()).then(t=>{const n=document.getElementById("leaderboard-list");if(n){if(!t.length){n.innerHTML='<div class="leaderboard-empty">No visits yet</div>';return}n.innerHTML=t.map((o,r)=>`
          <div class="leaderboard-item ${r===0?"gold":r===1?"silver":r===2?"bronze":""}">
            <span class="rank">#${r+1}</span>
            <span class="name">${o.username}</span>
            <span class="visits">${o.visits} visits</span>
          </div>
        `).join("")}})}showUserManagement(){var i,t;if(((i=this.session)==null?void 0:i.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=`
      <div class="settings-popup user-management">
        <h3>👥 User Management</h3>
        <div class="user-list" id="user-list"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),e.addEventListener("click",n=>{n.target===e&&e.remove()}),this.loadUserList()}async loadUserList(){const s=document.getElementById("user-list");if(s)try{const i=await(await fetch(`${v}/api/admin/users`,{headers:this.authHeaders()})).json();s.innerHTML=i.map(t=>`
        <div class="user-item">
          <div class="user-info">
            <span class="user-name">${t.username}</span>
            <span class="user-role ${t.role}">${t.role}</span>
          </div>
          <div class="user-stats">
            <span>${t.visits} visits</span>
          </div>
          <div class="user-actions">
            ${t.role!=="admin"?`<button class="user-btn promote" data-id="${t.id}">Promote</button>`:""}
            <button class="user-btn delete" data-id="${t.id}">Delete</button>
          </div>
        </div>
      `).join(""),s.querySelectorAll(".promote").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.id;await fetch(`${v}/api/admin/users/${n}`,{method:"PUT",headers:this.authHeaders(),body:JSON.stringify({role:"admin"})}),this.loadUserList()})}),s.querySelectorAll(".delete").forEach(t=>{t.addEventListener("click",async()=>{if(!confirm("Delete this user?"))return;const n=t.dataset.id;await fetch(`${v}/api/admin/users/${n}`,{method:"DELETE",headers:this.authHeaders()}),this.loadUserList()})})}catch{s.innerHTML='<div class="error">Failed to load</div>'}}renderLogin(){const s=document.getElementById("app");s.innerHTML=b.render(),b.init(this.handleAuth.bind(this))}async handleAuth(s,e,i){const t=i?"/api/auth/register":"/api/auth/login";try{const n=await fetch(`${v}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:e})});if(!n.ok){const a=await n.json();throw new Error(a.error||"Auth failed")}const o=await n.json();this.session={token:o.token,role:o.role,username:o.username,userId:o.id},this.saveSession();const r=await fetch(`${v}/api/sites`,{headers:this.authHeaders()});this.sites=await r.json(),this.filteredSites=[...this.sites],this.render()}catch(n){throw n}}async handleLogout(){this.session=null,this.saveSession(),this.sites=[],this.filteredSites=[],this.renderLogin()}render(){var e,i,t,n;const s=document.getElementById("app");s.innerHTML=`
      <div class="app-container">
        ${C.render(((e=this.session)==null?void 0:e.role)||"user",((i=this.session)==null?void 0:i.username)||"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((t=this.session)==null?void 0:t.role)==="admin"?this.showUserManagement.bind(this):void 0)}
        <div class="upload-section">
          ${M.render()}
          ${S.render()}
        </div>
        <div class="grid-section">
          ${w.render(this.filteredSites,((n=this.session)==null?void 0:n.role)==="admin")}
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){var n,o,r,a,c;const s=document.getElementById("app");(n=s.querySelector("#logout-btn"))==null||n.addEventListener("click",()=>this.handleLogout()),(o=s.querySelector("#settings-btn"))==null||o.addEventListener("click",()=>this.showSettings()),(r=s.querySelector("#leaderboard-btn"))==null||r.addEventListener("click",()=>this.showLeaderboard()),(a=s.querySelector("#users-btn"))==null||a.addEventListener("click",()=>this.showUserManagement());const e=s.querySelector(".search-input");e==null||e.addEventListener("input",d=>{this.searchQuery=d.target.value,this.filterSites(),this.updateGrid()}),s.querySelectorAll(".delete-btn").forEach(d=>{d.addEventListener("click",async h=>{var u;h.stopPropagation(),((u=this.session)==null?void 0:u.role)==="admin"&&await this.handleDelete(d.dataset.id)})}),s.querySelectorAll(".view-btn, .site-card").forEach(d=>{d.addEventListener("click",async()=>{await this.handleView(d.dataset.id)})});const i=s.querySelector("#file-input");i==null||i.addEventListener("change",async d=>{var u;const h=(u=d.target.files)==null?void 0:u[0];h&&(await this.handleUpload(h),i.value="")});const t=s.querySelector(".uploader");t==null||t.addEventListener("dragover",d=>{d.preventDefault(),t.classList.add("drag-over")}),t==null||t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t==null||t.addEventListener("drop",async d=>{var u;d.preventDefault(),t.classList.remove("drag-over");const h=(u=d.dataTransfer)==null?void 0:u.files[0];h&&await this.handleUpload(h)}),(c=s.querySelector("#back-btn"))==null||c.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){var e;const s=document.querySelector(".grid-section");s&&(s.innerHTML=w.render(this.filteredSites,((e=this.session)==null?void 0:e.role)==="admin"),this.attachEventListeners())}async handleUpload(s){if(this.session)try{const e=await s.text();await fetch(`${v}/api/sites`,{method:"POST",headers:this.authHeaders(),body:JSON.stringify({name:s.name.replace(/\.(html|htm)$/i,""),content:e})});const i=await fetch(`${v}/api/sites`,{headers:this.authHeaders()});this.sites=await i.json(),this.filterSites(),this.render()}catch(e){console.error("Upload failed:",e)}}async handleDelete(s){if(!(!this.session||this.session.role!=="admin"||!confirm("Delete this site?")))try{await fetch(`${v}/api/sites/${s}`,{method:"DELETE",headers:this.authHeaders()}),this.sites=this.sites.filter(e=>e.id!==s),this.filterSites(),this.render()}catch(e){console.error("Delete failed:",e)}}async handleView(s){if(this.session)try{const e=await fetch(`${v}/api/sites/${s}`,{headers:this.authHeaders()});this.viewer=new $(await e.json(),()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(e){console.error("Load failed:",e)}}}document.addEventListener("DOMContentLoaded",()=>new H);
