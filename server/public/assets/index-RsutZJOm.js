var $=Object.defineProperty;var k=(v,e,t)=>e in v?$(v,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):v[e]=t;var b=(v,e,t)=>k(v,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();class C{static render(){return`
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `}static init(){}}class w{static render(e,t=!1,s=[]){return e.length===0?`
        <div class="empty-state">
          <i data-lucide="folder-open"></i>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`
      <div class="site-grid">
        ${e.map(i=>{const a=new Date(i.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
            <div class="site-card" data-id="${i.id}" draggable="true">
              <div class="card-preview">
                <div class="card-icon-display" data-site-id="${i.id}">
                  <i data-lucide="${i.icon||"globe"}"></i>
                </div>
                <div class="card-views" title="Views">
                  <i data-lucide="eye"></i>
                  <span>${i.views||0}</span>
                </div>
                ${i.tags&&i.tags.length?`
                  <div class="card-tags">
                    ${i.tags.map(r=>`<span class="card-tag" style="background:${r.color}">${w.escapeHtml(r.name)}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <div class="card-info">
                <h3 class="card-title">${w.escapeHtml(i.name)}</h3>
                <p class="card-date">${a}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn view-btn" data-id="${i.id}" title="Ansehen">
                  <i data-lucide="eye"></i>
                </button>
                ${t?`
                <button class="action-btn icon-btn" data-id="${i.id}" title="Icon waehlen">
                  <i data-lucide="smile"></i>
                </button>
                <button class="action-btn rename-btn" data-id="${i.id}" data-name="${w.escapeHtml(i.name)}" title="Umbenennen">
                  <i data-lucide="pencil"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${i.id}" title="Loeschen">
                  <i data-lucide="trash-2"></i>
                </button>
                `:""}
              </div>
            </div>
          `}).join("")}
      </div>
    `}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class x{constructor(e,t){b(this,"site");b(this,"onClose");this.site=e,this.onClose=t}open(){var a;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t),window.lucide&&window.lucide.createIcons();const s=document.getElementById("site-iframe"),i=document.getElementById("iframe-loader");if(s&&this.site.content){s.onload=()=>{i==null||i.classList.add("hidden"),s.classList.add("loaded");try{const o=s.contentDocument;o&&(o.documentElement.style.backgroundColor="#0a0a0f",o.body.style.backgroundColor="#0a0a0f")}catch{}};const r=getComputedStyle(document.documentElement).getPropertyValue("--bg-deep")||"#0a0a0f",h=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#c9a227",d=getComputedStyle(document.documentElement).getPropertyValue("--border-accent")||"#333";s.srcdoc=`<html><body style="background:${r};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:48px;height:48px;border:3px solid ${d};border-top-color:${h};border-radius:50%;animation:spin 1s linear infinite;"></div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      </body></html>`,setTimeout(()=>{s.srcdoc=this.site.content},100)}(a=document.getElementById("viewer-close"))==null||a.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",r=>{r.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",r=>{r.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
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
    `}}class T{static render(e,t,s,i,a,r,h,d,o){return`
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <i data-lucide="layout-grid"></i>
            <h1>Site Grid</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="role-badge ${e}">${t}</span>
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
            ${e==="admin"?`
            <button class="icon-btn" id="users-btn" title="User Management">
              <i data-lucide="users"></i>
            </button>
            <button class="icon-btn" id="tags-btn" title="Manage Tags">
              <i data-lucide="tag"></i>
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
    `}static init(){}}class q{static render(){return`
      <div class="search-container">
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
    `}static init(e){const t=document.getElementById("login-username"),s=document.getElementById("login-password"),i=document.getElementById("btn-login"),a=i.querySelector(".btn-text"),r=document.getElementById("btn-toggle"),h=document.getElementById("toggle-text"),d=document.getElementById("login-error"),o=document.getElementById("login-card"),c=document.getElementById("card-glow");let u=!1;o==null||o.addEventListener("mousemove",n=>{if(!o||!c)return;const l=o.getBoundingClientRect(),y=n.clientX-l.left,S=n.clientY-l.top;c.style.background=`radial-gradient(circle at ${y}px ${S}px, var(--glow) 0%, transparent 50%)`,c.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{c&&(c.style.opacity="0")});const m=()=>{u=!u,u?(a.textContent="Create Account",h.textContent="Have an account?",r.textContent="Sign in"):(a.textContent="Sign In",h.textContent="New user?",r.textContent="Create account"),d.classList.remove("show")},f=async()=>{const n=t.value.trim(),l=s.value;if(!n){t.classList.add("shake"),d.textContent="Enter username",d.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!l){s.classList.add("shake"),d.textContent="Enter password",d.classList.add("show"),setTimeout(()=>s.classList.remove("shake"),400);return}i.classList.add("loading"),i.disabled=!0,d.classList.remove("show");try{await e(n,l,u)}catch(y){d.textContent=y instanceof Error?y.message:"Something went wrong",d.classList.add("show"),i.classList.remove("loading"),i.disabled=!1}};i==null||i.addEventListener("click",f),r==null||r.addEventListener("click",m),s==null||s.addEventListener("keydown",n=>{n.key==="Enter"&&f()}),t==null||t.addEventListener("input",()=>{d.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const L={accentColor:"#c9a227",gridSize:"normal"};class p{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...L,...JSON.parse(e)}:{...L}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),s=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${s}, ${i}, ${a}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${s}, ${i}, ${a}, 0.5)`);const r=Math.max(0,s-20),h=Math.max(0,i-30),d=Math.max(0,a-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${r}, ${h}, ${d})`);const o=Math.max(0,s-80),c=Math.min(255,i+30),u=Math.min(255,a+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${o}, ${c}, ${u})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${s}, ${i}, ${a}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${s}, ${i}, ${a}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${s}, ${i}, ${a}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${s}, ${i}, ${a}, 0.4)`)}static render(e){return`
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
        
        <button class="settings-close" id="settings-close"><i data-lucide="x"></i> Close</button>
      </div>
    `}static init(e){const t=document.querySelector(".settings-popup"),s=document.getElementById("settings-close"),i=document.getElementById("accent-color"),a=document.querySelector(".settings-overlay"),r=document.querySelectorAll(".preset"),h=document.querySelectorAll(".grid-option");s==null||s.addEventListener("click",()=>a==null?void 0:a.remove()),i==null||i.addEventListener("input",d=>{const o=d.target.value,c=t==null?void 0:t.querySelector(".color-picker-row span");c&&(c.textContent=o.toUpperCase());const u=p.load();e({...u,accentColor:o})}),r.forEach(d=>{d.addEventListener("click",()=>{const o=d.dataset.color;i&&(i.value=o);const c=t==null?void 0:t.querySelector(".color-picker-row span");c&&(c.textContent=o.toUpperCase());const u=p.load();e({...u,accentColor:o})})}),h.forEach(d=>{d.addEventListener("click",()=>{const o=d.dataset.size,c=p.load();e({...c,gridSize:o}),h.forEach(u=>u.classList.remove("active")),d.classList.add("active"),document.body.className=`grid-${o}`})})}}const g="http://localhost:3000/api";class I{constructor(){b(this,"session",null);b(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});b(this,"sites",[]);b(this,"filteredSites",[]);b(this,"tags",[]);b(this,"searchQuery","");b(this,"viewer",null);this.settings=p.load(),p.apply(this.settings),this.initCursorGlow(),this.loadTags(),this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const s=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!s.ok){const i=await s.json().catch(()=>({error:"Request failed"}));throw new Error(i.error||`HTTP ${s.status}`)}return s.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${g}/tags`).then(e=>e.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${g}/sites`),this.filterSites()}catch{this.clearSession(),this.renderLogin()}}filterSites(){const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>{var s;return t.name.toLowerCase().includes(e)||((s=t.content)==null?void 0:s.toLowerCase().includes(e))})}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",s=>{s.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(p.render(this.settings));p.init(s=>{this.settings=s,p.save(s),p.apply(s)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),fetch(`${g}/leaderboard`).then(s=>s.json()).then(s=>{const i=document.getElementById("leaderboard-list");i&&(i.innerHTML=s.length?s.map((a,r)=>`<div class="leaderboard-item ${r===0?"gold":r===1?"silver":r===2?"bronze":""}"><span class="rank">#${r+1}</span><span class="name">${a.username}</span><span class="visits">${a.visits} visits</span></div>`).join(""):'<div class="empty">No visits yet</div>')})}showUserManagement(){var t,s;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(s=document.getElementById("settings-close"))==null||s.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(e)try{const t=await this.apiRequest(`${g}/admin/users`);e.innerHTML=t.map(s=>`<div class="user-item"><div class="user-info"><span class="user-name">${s.username}</span><span class="user-role ${s.role}">${s.role}</span></div><div class="user-stats">${s.visits} visits</div><div class="user-actions">${s.role!=="admin"?`<button class="user-btn promote" data-id="${s.id}">Promote</button>`:""}<button class="user-btn delete" data-id="${s.id}">Delete</button></div></div>`).join(""),e.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),e.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{e.innerHTML='<div class="error">Failed</div>'}}async promoteUser(e){if(confirm("Promote?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}async deleteUser(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}showTags(){var t,s,i;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(s=document.getElementById("settings-close"))==null||s.addEventListener("click",()=>e.remove()),this.renderTags(),(i=document.getElementById("add-tag-btn"))==null||i.addEventListener("click",async()=>{var h,d;const a=(h=document.getElementById("new-tag-name"))==null?void 0:h.value,r=(d=document.getElementById("new-tag-color"))==null?void 0:d.value;a&&(await fetch(`${g}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:a,color:r})}),this.tags=await fetch(`${g}/tags`).then(o=>o.json()),this.renderTags())})}async renderTags(){const e=document.getElementById("tags-list");e&&(e.innerHTML=this.tags.map(t=>`<div class="tag-item"><span class="tag-dot" style="background:${t.color}"></span><span>${t.name}</span><button class="tag-delete" data-id="${t.id}">X</button></div>`).join(""),e.querySelectorAll(".tag-delete").forEach(t=>t.addEventListener("click",async()=>{await fetch(`${g}/tags/${t.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${g}/tags`).then(s=>s.json()),this.renderTags()})))}toggleGridSize(){const e=["small","normal","large"],t=e.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=e[(t+1)%e.length],p.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${g}/export`,"_blank")}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=E.render(),E.init(this.handleAuth.bind(this)))}async handleAuth(e,t,s){try{const i=await this.apiRequest(`${g}/auth/${s?"register":"login"}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:i.token,role:i.role,username:i.username,userId:i.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(i){throw i}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var t,s,i,a;const e=document.getElementById("app");e&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,e.innerHTML=`
      <div class="app-container">
        ${T.render(((t=this.session)==null?void 0:t.role)??"user",((s=this.session)==null?void 0:s.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((i=this.session)==null?void 0:i.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${q.render()}
            <div class="grid-section">
              ${w.render(this.filteredSites,((a=this.session)==null?void 0:a.role)==="admin",this.tags)}
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
            ${C.render()}
          </aside>
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var a,r,h,d,o,c,u,m,f;window.lucide&&!document.querySelector(".lucide-create-icons-called")&&(window.lucide.createIcons(),document.body.classList.add("lucide-create-icons-called"));const e=document.getElementById("app");if(!e)return;(a=e.querySelector("#logout-btn"))==null||a.addEventListener("click",()=>this.handleLogout()),(r=e.querySelector("#settings-btn"))==null||r.addEventListener("click",()=>this.showSettings()),(h=e.querySelector("#leaderboard-btn"))==null||h.addEventListener("click",()=>this.showLeaderboard()),(d=e.querySelector("#grid-size-btn"))==null||d.addEventListener("click",()=>this.toggleGridSize()),(o=e.querySelector("#sidebar-upload-btn"))==null||o.addEventListener("click",()=>{var n;return(n=document.querySelector("#file-input"))==null?void 0:n.click()}),(c=e.querySelector("#users-btn"))==null||c.addEventListener("click",()=>this.showUserManagement()),(u=e.querySelector("#tags-btn"))==null||u.addEventListener("click",()=>this.showTags()),(m=e.querySelector("#export-btn"))==null||m.addEventListener("click",()=>this.exportZip());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",n=>{this.searchQuery=n.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(n=>n.addEventListener("click",l=>{var y;l.stopPropagation(),((y=this.session)==null?void 0:y.role)==="admin"&&this.handleDelete(n.dataset.id)})),e.querySelectorAll(".rename-btn").forEach(n=>n.addEventListener("click",l=>{l.stopPropagation(),this.handleRename(n.dataset.id,n.dataset.name)})),e.querySelectorAll(".icon-btn").forEach(n=>n.addEventListener("click",l=>{l.stopPropagation(),this.showIconPicker(n.dataset.id)})),e.querySelectorAll(".view-btn, .site-card").forEach(n=>n.addEventListener("click",()=>void this.handleView(n.dataset.id)));const s=e.querySelector("#file-input");s==null||s.addEventListener("change",async n=>{const l=n.target.files;l!=null&&l.length&&(await this.handleUploadMultiple(Array.from(l)),s.value="")});const i=e.querySelector(".uploader");i==null||i.addEventListener("dragover",n=>{n.preventDefault(),i.classList.add("drag-over")}),i==null||i.addEventListener("dragleave",()=>i.classList.remove("drag-over")),i==null||i.addEventListener("drop",async n=>{var y;n.preventDefault(),i.classList.remove("drag-over");const l=(y=n.dataTransfer)==null?void 0:y.files;l!=null&&l.length&&await this.handleUploadMultiple(Array.from(l))}),(f=e.querySelector("#back-btn"))==null||f.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",n=>{var l;n.target instanceof HTMLInputElement||(n.key==="/"&&(n.preventDefault(),t==null||t.focus()),(n.key==="n"||n.key==="N")&&(n.preventDefault(),(l=document.querySelector("#file-input"))==null||l.click()))})}async loadSidebarData(){try{const t=await fetch(`${g}/stats`).then(s=>s.json());document.getElementById("stat-logins").textContent=String(t.totalLogins),document.getElementById("stat-users").textContent=String(t.totalUsers),document.getElementById("stat-sites").textContent=String(t.totalSites)}catch{}const e=document.getElementById("sidebar-leaderboard");if(e)try{const t=await fetch(`${g}/leaderboard?limit=5`).then(s=>s.json());e.innerHTML=t.length?t.map((s,i)=>`<div class="sidebar-item ${i===0?"gold":i===1?"silver":i===2?"bronze":""}"><span class="sidebar-rank">${i+1}</span><span class="sidebar-name">${s.username}</span><span class="sidebar-visits">${s.visits}</span></div>`).join(""):'<div class="empty">No visits</div>'}catch{e.innerHTML='<div class="empty">Failed</div>'}}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=w.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin",this.tags),this.attachEventListeners())}async handleUpload(e){if(this.session)try{const t=await e.text();await this.apiRequest(`${g}/sites`,{method:"POST",body:JSON.stringify({name:e.name.replace(/\.(html?)$/i,""),content:t})}),await this.loadSites(),this.render()}catch(t){console.error(t),alert("Upload failed")}}async handleUploadMultiple(e){if(!this.session||e.length===0)return;let t=0,s=0;for(const i of e)try{const a=await i.text();await this.apiRequest(`${g}/sites`,{method:"POST",body:JSON.stringify({name:i.name.replace(/\.(html?)$/i,""),content:a})}),t++}catch{s++}await this.loadSites(),this.render(),s>0?alert(`${t} uploaded, ${s} failed`):t>1&&alert(`${t} files uploaded`)}async handleDelete(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error(t)}}async handleRename(e,t){const s=prompt("Neuer Name:",t);if(!(!s||s===t))try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({name:s})}),await this.loadSites(),this.render()}catch(i){console.error(i),alert("Rename failed")}}async showIconPicker(e){var d;const t=this.sites.find(o=>o.id===e);if(!t)return;const s=document.createElement("div");s.className="settings-overlay",s.innerHTML=`
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,document.body.appendChild(s);let i=[];try{const u=(await(await fetch("https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js")).text()).matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);for(const m of u){const n=m[1].replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");i.push(n)}}catch{i=["globe","file","image","code","link","star","heart"]}const a=document.getElementById("icon-grid"),r=document.getElementById("icon-search"),h=o=>{var u;const c=o?i.filter(m=>m.toLowerCase().includes(o.toLowerCase())):i.slice(0,200);a.innerHTML=c.slice(0,80).map(m=>`<button class="icon-option ${t.icon===m?"selected":""}" data-icon="${m}" title="${m}">
          <i data-lucide="${m}"></i>
        </button>`).join(""),(u=window.lucide)==null||u.createIcons()};h(""),a.addEventListener("click",async o=>{const c=o.target.closest(".icon-option");if(!c)return;const u=c.dataset.icon;try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({icon:u})}),await this.loadSites(),this.render(),s.remove()}catch{alert("Icon update failed")}}),r.addEventListener("input",()=>h(r.value)),(d=document.getElementById("settings-close"))==null||d.addEventListener("click",()=>s.remove()),s.addEventListener("click",o=>{o.target===s&&s.remove()})}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${g}/sites/${e}`);this.viewer=new x(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error(t)}}}document.addEventListener("DOMContentLoaded",()=>new I);
