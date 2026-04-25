var S=Object.defineProperty;var $=(m,e,t)=>e in m?S(m,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):m[e]=t;var y=(m,e,t)=>$(m,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();class k{static render(){return`
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
    `}}class w{static render(e,t=!1,s=[]){return e.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${e.map(n=>{const r=new Date(n.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${n.id}" draggable="true">
          <div class="card-preview">
            <div class="card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>${w.escapeHtml(n.name)}</span>
            </div>
            <div class="card-views" title="Views">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>${n.views||0}</span>
            </div>
            ${n.tags&&n.tags.length?`
              <div class="card-tags">
                ${n.tags.map(c=>`<span class="card-tag" style="background:${c.color}">${w.escapeHtml(c.name)}</span>`).join("")}
              </div>
            `:""}
          </div>
          <div class="card-info">
            <h3 class="card-title">${w.escapeHtml(n.name)}</h3>
            <p class="card-date">${r}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${n.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            ${t?`
            <button class="action-btn delete-btn" data-id="${n.id}" title="Loeschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
              </svg>
            </button>
            `:""}
          </div>
        </div>
      `}).join("")}</div>`}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class C{constructor(e,t){y(this,"site");y(this,"onClose");this.site=e,this.onClose=t}open(){var n;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t);const s=document.getElementById("site-iframe"),i=document.getElementById("iframe-loader");s&&this.site.content&&(s.onload=()=>{i==null||i.classList.add("hidden"),s.classList.add("loaded")},setTimeout(()=>{s.srcdoc=this.site.content},50)),(n=document.getElementById("viewer-close"))==null||n.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",r=>{r.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",r=>{r.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
      <div class="viewer-container">
        <div class="viewer-glow-border">
          <div class="viewer-header">
            <button class="viewer-back" id="viewer-close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
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
    `}}class B{static render(e,t,s,i,n,r,c,a,o){return`
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
              <span class="role-badge ${e}">${t}</span>
            </div>
            <button class="icon-btn" id="grid-size-btn" title="Toggle Grid Size (N)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button class="icon-btn" id="leaderboard-btn" title="Leaderboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 21v-6m4 6v-10m4 10v-14"/>
                <rect x="4" y="12" width="4" height="9"/>
                <rect x="12" y="6" width="4" height="15"/>
                <rect x="16" y="3" width="4" height="18"/>
              </svg>
            </button>
            <button class="icon-btn" id="export-btn" title="Export ZIP">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            ${e==="admin"?`
            <button class="icon-btn" id="users-btn" title="User Management">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </button>
            <button class="icon-btn" id="tags-btn" title="Manage Tags">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </button>
            `:""}
            <button class="icon-btn" id="settings-btn" title="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06"/>
              </svg>
            </button>
            <button class="icon-btn logout-btn" id="logout-btn" title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    `}}class T{static render(){return`
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
    `}}class E{static render(){return`
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
    `}static init(e){const t=document.getElementById("login-username"),s=document.getElementById("login-password"),i=document.getElementById("btn-login"),n=i.querySelector(".btn-text"),r=document.getElementById("btn-toggle"),c=document.getElementById("toggle-text"),a=document.getElementById("login-error"),o=document.getElementById("login-card"),l=document.getElementById("card-glow");let u=!1;o==null||o.addEventListener("mousemove",g=>{if(!o||!l)return;const b=o.getBoundingClientRect(),f=g.clientX-b.left,x=g.clientY-b.top;l.style.background=`radial-gradient(circle at ${f}px ${x}px, var(--glow) 0%, transparent 50%)`,l.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{l&&(l.style.opacity="0")});const d=()=>{u=!u,u?(n.textContent="Create Account",c.textContent="Have an account?",r.textContent="Sign in"):(n.textContent="Sign In",c.textContent="New user?",r.textContent="Create account"),a.classList.remove("show")},v=async()=>{const g=t.value.trim(),b=s.value;if(!g){t.classList.add("shake"),a.textContent="Enter username",a.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!b){s.classList.add("shake"),a.textContent="Enter password",a.classList.add("show"),setTimeout(()=>s.classList.remove("shake"),400);return}i.classList.add("loading"),i.disabled=!0,a.classList.remove("show");try{await e(g,b,u)}catch(f){a.textContent=f instanceof Error?f.message:"Something went wrong",a.classList.add("show"),i.classList.remove("loading"),i.disabled=!1}};i==null||i.addEventListener("click",v),r==null||r.addEventListener("click",d),s==null||s.addEventListener("keydown",g=>{g.key==="Enter"&&v()}),t==null||t.addEventListener("input",()=>{a.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const L={accentColor:"#c9a227",gridSize:"normal"};class p{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...L,...JSON.parse(e)}:{...L}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),s=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),n=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${s}, ${i}, ${n}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${s}, ${i}, ${n}, 0.5)`);const r=Math.max(0,s-20),c=Math.max(0,i-30),a=Math.max(0,n-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${r}, ${c}, ${a})`);const o=Math.max(0,s-80),l=Math.min(255,i+30),u=Math.min(255,n+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${o}, ${l}, ${u})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${s}, ${i}, ${n}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${s}, ${i}, ${n}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${s}, ${i}, ${n}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${s}, ${i}, ${n}, 0.4)`)}static render(e){return`
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
        
        <div class="settings-row">
          <label>Grid Size</label>
          <div class="grid-size-options">
            <button class="grid-option ${e.gridSize==="small"?"active":""}" data-size="small">S</button>
            <button class="grid-option ${e.gridSize==="normal"?"active":""}" data-size="normal">M</button>
            <button class="grid-option ${e.gridSize==="large"?"active":""}" data-size="large">L</button>
          </div>
        </div>
        
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `}static init(e){const t=document.querySelector(".settings-popup"),s=document.getElementById("settings-close"),i=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),r=document.querySelectorAll(".preset"),c=document.querySelectorAll(".grid-option");s==null||s.addEventListener("click",()=>n==null?void 0:n.remove()),i==null||i.addEventListener("input",a=>{const o=a.target.value,l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const u=p.load();e({...u,accentColor:o})}),r.forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.color;i&&(i.value=o);const l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const u=p.load();e({...u,accentColor:o})})}),c.forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.size,l=p.load();e({...l,gridSize:o}),c.forEach(u=>u.classList.remove("active")),a.classList.add("active"),document.body.className=`grid-${o}`})})}}const h="http://localhost:3000/api";class M{constructor(){y(this,"session",null);y(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});y(this,"sites",[]);y(this,"filteredSites",[]);y(this,"tags",[]);y(this,"searchQuery","");y(this,"viewer",null);this.settings=p.load(),p.apply(this.settings),this.initCursorGlow(),this.loadTags(),this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const s=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!s.ok){const i=await s.json().catch(()=>({error:"Request failed"}));throw new Error(i.error||`HTTP ${s.status}`)}return s.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${h}/tags`).then(e=>e.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${h}/sites`),this.filterSites()}catch{this.clearSession(),this.renderLogin()}}filterSites(){const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>{var s;return t.name.toLowerCase().includes(e)||((s=t.content)==null?void 0:s.toLowerCase().includes(e))})}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",s=>{s.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(p.render(this.settings));p.init(s=>{this.settings=s,p.save(s),p.apply(s)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),fetch(`${h}/leaderboard`).then(s=>s.json()).then(s=>{const i=document.getElementById("leaderboard-list");i&&(i.innerHTML=s.length?s.map((n,r)=>`<div class="leaderboard-item ${r===0?"gold":r===1?"silver":r===2?"bronze":""}"><span class="rank">#${r+1}</span><span class="name">${n.username}</span><span class="visits">${n.visits} visits</span></div>`).join(""):'<div class="empty">No visits yet</div>')})}showUserManagement(){var t,s;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(s=document.getElementById("settings-close"))==null||s.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(e)try{const t=await this.apiRequest(`${h}/admin/users`);e.innerHTML=t.map(s=>`<div class="user-item"><div class="user-info"><span class="user-name">${s.username}</span><span class="user-role ${s.role}">${s.role}</span></div><div class="user-stats">${s.visits} visits</div><div class="user-actions">${s.role!=="admin"?`<button class="user-btn promote" data-id="${s.id}">Promote</button>`:""}<button class="user-btn delete" data-id="${s.id}">Delete</button></div></div>`).join(""),e.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),e.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{e.innerHTML='<div class="error">Failed</div>'}}async promoteUser(e){if(confirm("Promote?"))try{await this.apiRequest(`${h}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}async deleteUser(e){if(confirm("Delete?"))try{await this.apiRequest(`${h}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}showTags(){var t,s,i;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(s=document.getElementById("settings-close"))==null||s.addEventListener("click",()=>e.remove()),this.renderTags(),(i=document.getElementById("add-tag-btn"))==null||i.addEventListener("click",async()=>{var c,a;const n=(c=document.getElementById("new-tag-name"))==null?void 0:c.value,r=(a=document.getElementById("new-tag-color"))==null?void 0:a.value;n&&(await fetch(`${h}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:n,color:r})}),this.tags=await fetch(`${h}/tags`).then(o=>o.json()),this.renderTags())})}async renderTags(){const e=document.getElementById("tags-list");e&&(e.innerHTML=this.tags.map(t=>`<div class="tag-item"><span class="tag-dot" style="background:${t.color}"></span><span>${t.name}</span><button class="tag-delete" data-id="${t.id}">X</button></div>`).join(""),e.querySelectorAll(".tag-delete").forEach(t=>t.addEventListener("click",async()=>{await fetch(`${h}/tags/${t.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${h}/tags`).then(s=>s.json()),this.renderTags()})))}toggleGridSize(){const e=["small","normal","large"],t=e.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=e[(t+1)%e.length],p.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${h}/export`,"_blank")}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=E.render(),E.init(this.handleAuth.bind(this)))}async handleAuth(e,t,s){try{const i=await this.apiRequest(`${h}/auth/${s?"register":"login"}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:i.token,role:i.role,username:i.username,userId:i.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(i){throw i}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var t,s,i,n;const e=document.getElementById("app");e&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,e.innerHTML=`
      <div class="app-container">
        ${B.render(((t=this.session)==null?void 0:t.role)??"user",((s=this.session)==null?void 0:s.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((i=this.session)==null?void 0:i.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            <div class="upload-section">
              ${T.render()}
              ${k.render()}
            </div>
            <div class="grid-section">
              ${w.render(this.filteredSites,((n=this.session)==null?void 0:n.role)==="admin",this.tags)}
            </div>
          </div>
          <aside class="sidebar-panel">
            <div class="stats-card"><h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> Statistics</h4><div class="stats-grid" id="stats-grid"><div class="stat-item"><span class="stat-value" id="stat-logins">-</span><span class="stat-label">Logins</span></div><div class="stat-item"><span class="stat-value" id="stat-users">-</span><span class="stat-label">Users</span></div><div class="stat-item"><span class="stat-value" id="stat-sites">-</span><span class="stat-label">Sites</span></div></div></div>
            <div class="leaderboard-card"><h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21v-6m4 6v-10m4 10v-14"/><rect x="4" y="12" width="4" height="9"/><rect x="12" y="6" width="4" height="15"/><rect x="16" y="3" width="4" height="18"/></svg> Top Users</h4><div class="sidebar-leaderboard" id="sidebar-leaderboard"><div class="loading">Loading...</div></div></div>
          </aside>
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var n,r,c,a,o,l,u;const e=document.getElementById("app");if(!e)return;(n=e.querySelector("#logout-btn"))==null||n.addEventListener("click",()=>this.handleLogout()),(r=e.querySelector("#settings-btn"))==null||r.addEventListener("click",()=>this.showSettings()),(c=e.querySelector("#leaderboard-btn"))==null||c.addEventListener("click",()=>this.showLeaderboard()),(a=e.querySelector("#users-btn"))==null||a.addEventListener("click",()=>this.showUserManagement()),(o=e.querySelector("#tags-btn"))==null||o.addEventListener("click",()=>this.showTags()),(l=e.querySelector("#export-btn"))==null||l.addEventListener("click",()=>this.exportZip());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",d=>{this.searchQuery=d.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(d=>d.addEventListener("click",v=>{var g;v.stopPropagation(),((g=this.session)==null?void 0:g.role)==="admin"&&this.handleDelete(d.dataset.id)})),e.querySelectorAll(".view-btn, .site-card").forEach(d=>d.addEventListener("click",()=>void this.handleView(d.dataset.id)));const s=e.querySelector("#file-input");s==null||s.addEventListener("change",async d=>{var g;const v=(g=d.target.files)==null?void 0:g[0];v&&(await this.handleUpload(v),s.value="")});const i=e.querySelector(".uploader");i==null||i.addEventListener("dragover",d=>{d.preventDefault(),i.classList.add("drag-over")}),i==null||i.addEventListener("dragleave",()=>i.classList.remove("drag-over")),i==null||i.addEventListener("drop",async d=>{var g;d.preventDefault(),i.classList.remove("drag-over");const v=(g=d.dataTransfer)==null?void 0:g.files[0];v&&await this.handleUpload(v)}),(u=e.querySelector("#back-btn"))==null||u.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",d=>{var v;d.target instanceof HTMLInputElement||(d.key==="/"&&(d.preventDefault(),t==null||t.focus()),(d.key==="n"||d.key==="N")&&(d.preventDefault(),(v=document.querySelector("#file-input"))==null||v.click()))})}async loadSidebarData(){try{const t=await fetch(`${h}/stats`).then(s=>s.json());document.getElementById("stat-logins").textContent=String(t.totalLogins),document.getElementById("stat-users").textContent=String(t.totalUsers),document.getElementById("stat-sites").textContent=String(t.totalSites)}catch{}const e=document.getElementById("sidebar-leaderboard");if(e)try{const t=await fetch(`${h}/leaderboard?limit=5`).then(s=>s.json());e.innerHTML=t.length?t.map((s,i)=>`<div class="sidebar-item ${i===0?"gold":i===1?"silver":i===2?"bronze":""}"><span class="sidebar-rank">${i+1}</span><span class="sidebar-name">${s.username}</span><span class="sidebar-visits">${s.visits}</span></div>`).join(""):'<div class="empty">No visits</div>'}catch{e.innerHTML='<div class="empty">Failed</div>'}}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=w.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin",this.tags),this.attachEventListeners())}async handleUpload(e){if(this.session)try{const t=await e.text();await this.apiRequest(`${h}/sites`,{method:"POST",body:JSON.stringify({name:e.name.replace(/\.(html?)$/i,""),content:t})}),await this.loadSites(),this.render()}catch(t){console.error(t),alert("Upload failed")}}async handleDelete(e){if(confirm("Delete?"))try{await this.apiRequest(`${h}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error(t)}}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${h}/sites/${e}`);this.viewer=new C(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error(t)}}}document.addEventListener("DOMContentLoaded",()=>new M);
