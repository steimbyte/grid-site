var $=Object.defineProperty;var k=(p,e,t)=>e in p?$(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var b=(p,e,t)=>k(p,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class C{static render(){return`
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `}static init(){}}class E{static render(e,t=!1,i=[]){return e.length===0?`
        <div class="empty-state">
          <i data-lucide="folder-open"></i>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`
      <div class="site-grid">
        ${e.map(s=>{const a=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
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
                    ${s.tags.map(n=>`<span class="card-tag" style="background:${n.color}">${E.escapeHtml(n.name)}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <div class="card-info">
                <h3 class="card-title">${E.escapeHtml(s.name)}</h3>
                <p class="card-date">${a}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
                  <i data-lucide="eye"></i>
                </button>
                ${t?`
                <button class="action-btn icon-btn" data-id="${s.id}" title="Icon waehlen">
                  <i data-lucide="smile"></i>
                </button>
                <button class="action-btn rename-btn" data-id="${s.id}" data-name="${E.escapeHtml(s.name)}" title="Umbenennen">
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
    `}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class x{constructor(e,t){b(this,"site");b(this,"onClose");this.site=e,this.onClose=t}open(){var a;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t),window.lucide&&window.lucide.createIcons();const i=document.getElementById("site-iframe"),s=document.getElementById("iframe-loader");if(i&&this.site.content){i.onload=()=>{s==null||s.classList.add("hidden"),i.classList.add("loaded");try{const o=i.contentDocument;o&&(o.documentElement.style.backgroundColor="#0a0a0f",o.body.style.backgroundColor="#0a0a0f")}catch{}};const n=getComputedStyle(document.documentElement).getPropertyValue("--bg-deep")||"#0a0a0f",g=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#c9a227",d=getComputedStyle(document.documentElement).getPropertyValue("--border-accent")||"#333";i.srcdoc=`<html><body style="background:${n};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:48px;height:48px;border:3px solid ${d};border-top-color:${g};border-radius:50%;animation:spin 1s linear infinite;"></div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      </body></html>`,setTimeout(()=>{i.srcdoc=this.site.content},100)}(a=document.getElementById("viewer-close"))==null||a.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",n=>{n.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",n=>{n.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
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
    `}}class q{static render(e,t,i,s,a,n,g,d,o,l){return`
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
    `}static init(){}}class T{static render(){return`
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
    `}static init(e){const t=document.getElementById("login-username"),i=document.getElementById("login-password"),s=document.getElementById("btn-login"),a=s.querySelector(".btn-text"),n=document.getElementById("btn-toggle"),g=document.getElementById("toggle-text"),d=document.getElementById("login-error"),o=document.getElementById("login-card"),l=document.getElementById("card-glow");let h=!1;o==null||o.addEventListener("mousemove",v=>{if(!o||!l)return;const r=o.getBoundingClientRect(),c=v.clientX-r.left,f=v.clientY-r.top;l.style.background=`radial-gradient(circle at ${c}px ${f}px, var(--glow) 0%, transparent 50%)`,l.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{l&&(l.style.opacity="0")});const m=()=>{h=!h,h?(a.textContent="Create Account",g.textContent="Have an account?",n.textContent="Sign in"):(a.textContent="Sign In",g.textContent="New user?",n.textContent="Create account"),d.classList.remove("show")},w=async()=>{const v=t.value.trim(),r=i.value;if(!v){t.classList.add("shake"),d.textContent="Enter username",d.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!r){i.classList.add("shake"),d.textContent="Enter password",d.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}s.classList.add("loading"),s.disabled=!0,d.classList.remove("show");try{await e(v,r,h)}catch(c){d.textContent=c instanceof Error?c.message:"Something went wrong",d.classList.add("show"),s.classList.remove("loading"),s.disabled=!1}};s==null||s.addEventListener("click",w),n==null||n.addEventListener("click",m),i==null||i.addEventListener("keydown",v=>{v.key==="Enter"&&w()}),t==null||t.addEventListener("input",()=>{d.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const L={accentColor:"#c9a227",gridSize:"normal"};class y{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...L,...JSON.parse(e)}:{...L}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),i=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${a}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${i}, ${s}, ${a}, 0.5)`);const n=Math.max(0,i-20),g=Math.max(0,s-30),d=Math.max(0,a-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${n}, ${g}, ${d})`);const o=Math.max(0,i-80),l=Math.min(255,s+30),h=Math.min(255,a+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${o}, ${l}, ${h})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${a}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${a}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${a}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${i}, ${s}, ${a}, 0.4)`)}static render(e){return`
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
    `}static init(e){const t=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),a=document.querySelector(".settings-overlay"),n=document.querySelectorAll(".preset"),g=document.querySelectorAll(".grid-option");i==null||i.addEventListener("click",()=>a==null?void 0:a.remove()),s==null||s.addEventListener("input",d=>{const o=d.target.value,l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const h=y.load();e({...h,accentColor:o})}),n.forEach(d=>{d.addEventListener("click",()=>{const o=d.dataset.color;s&&(s.value=o);const l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const h=y.load();e({...h,accentColor:o})})}),g.forEach(d=>{d.addEventListener("click",()=>{const o=d.dataset.size,l=y.load();e({...l,gridSize:o}),g.forEach(h=>h.classList.remove("active")),d.classList.add("active"),document.body.className=`grid-${o}`})})}}let u="http://localhost:3000/api";class I{constructor(){b(this,"session",null);b(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});b(this,"sites",[]);b(this,"filteredSites",[]);b(this,"tags",[]);b(this,"searchQuery","");b(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),this.initApiUrl()}async initApiUrl(){try{const t=await(await fetch("/api/config")).json();t.frontendUrl&&(u=`${t.frontendUrl}/api`)}catch{}this.loadTags(),await this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const i=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!i.ok){const s=await i.json().catch(()=>({error:"Request failed"}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${u}/tags`).then(e=>e.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${u}/sites`),this.filterSites()}catch{this.clearSession(),this.renderLogin()}}filterSites(){const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>{var i;return t.name.toLowerCase().includes(e)||((i=t.content)==null?void 0:i.toLowerCase().includes(e))})}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",i=>{i.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(y.render(this.settings));y.init(i=>{this.settings=i,y.save(i),y.apply(i)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),fetch(`${u}/leaderboard`).then(i=>i.json()).then(i=>{const s=document.getElementById("leaderboard-list");s&&(s.innerHTML=i.length?i.map((a,n)=>`<div class="leaderboard-item ${n===0?"gold":n===1?"silver":n===2?"bronze":""}"><span class="rank">#${n+1}</span><span class="name">${a.username}</span><span class="visits">${a.visits} visits</span></div>`).join(""):'<div class="empty">No visits yet</div>')})}showUserManagement(){var t,i;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(e)try{const[t,i]=await Promise.all([this.apiRequest(`${u}/admin/users`),this.apiRequest(`${u}/settings`)]);e.innerHTML=t.map(s=>{var a;return`
        <div class="user-item">
          <div class="user-info">
            <span class="user-name">${s.username}</span>
            <span class="user-role ${s.role}">${s.role}</span>
          </div>
          <div class="user-stats">${s.visits} visits</div>
          ${s.role!=="admin"?`
          <div class="user-upload-toggle">
            <label><input type="checkbox" class="user-upload-perm" data-id="${s.id}" ${((a=i.userSettings)==null?void 0:a[s.id])!==!1?"checked":""}> <span>Upload</span></label>
          </div>
          `:""}
          <div class="user-actions">
            ${s.role!=="admin"?`<button class="user-btn promote" data-id="${s.id}">Promote</button>`:""}
            <button class="user-btn delete" data-id="${s.id}">Delete</button>
          </div>
        </div>`}).join(""),e.querySelectorAll(".user-upload-perm").forEach(s=>{s.addEventListener("change",async a=>{const n=a.target.dataset.id,g=a.target.checked;await this.apiRequest(`${u}/settings`,{method:"PUT",body:JSON.stringify({userSettings:{...i.userSettings,[n]:g}})})})}),e.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),e.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{e.innerHTML='<div class="error">Failed</div>'}}async promoteUser(e){if(confirm("Promote?"))try{await this.apiRequest(`${u}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}async deleteUser(e){if(confirm("Delete?"))try{await this.apiRequest(`${u}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}showTags(){var t,i,s;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),this.renderTags(),(s=document.getElementById("add-tag-btn"))==null||s.addEventListener("click",async()=>{var g,d;const a=(g=document.getElementById("new-tag-name"))==null?void 0:g.value,n=(d=document.getElementById("new-tag-color"))==null?void 0:d.value;a&&(await fetch(`${u}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:a,color:n})}),this.tags=await fetch(`${u}/tags`).then(o=>o.json()),this.renderTags())})}async showSiteSettings(){var i,s,a,n;if(((i=this.session)==null?void 0:i.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=await this.apiRequest(`${u}/settings`),t=this.createOverlay(`<div class="settings-popup"><h3>Site Settings</h3><div class="setting-row"><label><input type="checkbox" id="uploads-enabled" ${e.uploadsEnabled!==!1?"checked":""}> <span>Uploads erlaubt</span></label></div><button class="settings-close" id="settings-close">Close</button></div>`);(s=window.lucide)==null||s.createIcons(),(a=document.getElementById("settings-close"))==null||a.addEventListener("click",()=>t.remove()),(n=document.getElementById("uploads-enabled"))==null||n.addEventListener("change",async g=>{const d=g.target.checked;await this.apiRequest(`${u}/settings`,{method:"PUT",body:JSON.stringify({uploadsEnabled:d})})})}async renderTags(){const e=document.getElementById("tags-list");e&&(e.innerHTML=this.tags.map(t=>`<div class="tag-item"><span class="tag-dot" style="background:${t.color}"></span><span>${t.name}</span><button class="tag-delete" data-id="${t.id}">X</button></div>`).join(""),e.querySelectorAll(".tag-delete").forEach(t=>t.addEventListener("click",async()=>{await fetch(`${u}/tags/${t.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${u}/tags`).then(i=>i.json()),this.renderTags()})))}toggleGridSize(){const e=["small","normal","large"],t=e.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=e[(t+1)%e.length],y.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${u}/export`,"_blank")}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=S.render(),S.init(this.handleAuth.bind(this)))}async handleAuth(e,t,i){try{const s=await this.apiRequest(`${u}/auth/${i?"register":"login"}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:s.token,role:s.role,username:s.username,userId:s.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(s){throw s}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var t,i,s,a;const e=document.getElementById("app");e&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,e.innerHTML=`
      <div class="app-container">
        ${q.render(((t=this.session)==null?void 0:t.role)??"user",((i=this.session)==null?void 0:i.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((s=this.session)==null?void 0:s.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this),this.showSiteSettings.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${T.render()}
            <div class="grid-section">
              ${E.render(this.filteredSites,((a=this.session)==null?void 0:a.role)==="admin",this.tags)}
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
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var a,n,g,d,o,l,h,m,w,v;window.lucide&&!document.querySelector(".lucide-create-icons-called")&&(window.lucide.createIcons(),document.body.classList.add("lucide-create-icons-called"));const e=document.getElementById("app");if(!e)return;(a=e.querySelector("#logout-btn"))==null||a.addEventListener("click",()=>this.handleLogout()),(n=e.querySelector("#settings-btn"))==null||n.addEventListener("click",()=>this.showSettings()),(g=e.querySelector("#leaderboard-btn"))==null||g.addEventListener("click",()=>this.showLeaderboard()),(d=e.querySelector("#grid-size-btn"))==null||d.addEventListener("click",()=>this.toggleGridSize()),(o=e.querySelector("#sidebar-upload-btn"))==null||o.addEventListener("click",()=>{var r;return(r=document.querySelector("#file-input"))==null?void 0:r.click()}),(l=e.querySelector("#users-btn"))==null||l.addEventListener("click",()=>this.showUserManagement()),(h=e.querySelector("#tags-btn"))==null||h.addEventListener("click",()=>this.showTags()),(m=e.querySelector("#site-settings-btn"))==null||m.addEventListener("click",()=>this.showSiteSettings()),(w=e.querySelector("#export-btn"))==null||w.addEventListener("click",()=>this.exportZip());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",r=>{this.searchQuery=r.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(r=>r.addEventListener("click",c=>{var f;c.stopPropagation(),((f=this.session)==null?void 0:f.role)==="admin"&&this.handleDelete(r.dataset.id)})),e.querySelectorAll(".rename-btn").forEach(r=>r.addEventListener("click",c=>{c.stopPropagation(),this.handleRename(r.dataset.id,r.dataset.name)})),e.querySelectorAll(".icon-btn").forEach(r=>r.addEventListener("click",c=>{c.stopPropagation(),this.showIconPicker(r.dataset.id)})),e.querySelectorAll(".view-btn").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation(),this.handleView(r.dataset.id)})}),e.querySelectorAll(".site-card").forEach(r=>{r.addEventListener("click",c=>{c.target.closest(".card-actions")||this.handleView(r.dataset.id)})});const i=e.querySelector("#file-input");i==null||i.addEventListener("change",async r=>{const c=r.target.files;c!=null&&c.length&&(await this.handleUploadMultiple(Array.from(c)),i.value="")});const s=e.querySelector(".uploader");s==null||s.addEventListener("dragover",r=>{r.preventDefault(),s.classList.add("drag-over")}),s==null||s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s==null||s.addEventListener("drop",async r=>{var f;r.preventDefault(),s.classList.remove("drag-over");const c=(f=r.dataTransfer)==null?void 0:f.files;c!=null&&c.length&&await this.handleUploadMultiple(Array.from(c))}),(v=e.querySelector("#back-btn"))==null||v.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",r=>{var c;r.target instanceof HTMLInputElement||(r.key==="/"&&(r.preventDefault(),t==null||t.focus()),(r.key==="n"||r.key==="N")&&(r.preventDefault(),(c=document.querySelector("#file-input"))==null||c.click()))})}async loadSidebarData(){try{const t=await fetch(`${u}/stats`).then(i=>i.json());document.getElementById("stat-logins").textContent=String(t.totalLogins),document.getElementById("stat-users").textContent=String(t.totalUsers),document.getElementById("stat-sites").textContent=String(t.totalSites)}catch{}const e=document.getElementById("sidebar-leaderboard");if(e)try{const t=await fetch(`${u}/leaderboard?limit=5`).then(i=>i.json());e.innerHTML=t.length?t.map((i,s)=>`<div class="sidebar-item ${s===0?"gold":s===1?"silver":s===2?"bronze":""}"><span class="sidebar-rank">${s+1}</span><span class="sidebar-name">${i.username}</span><span class="sidebar-visits">${i.visits}</span></div>`).join(""):'<div class="empty">No visits</div>'}catch{e.innerHTML='<div class="empty">Failed</div>'}}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=E.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin",this.tags),this.attachEventListeners())}async handleUpload(e){if(this.session)try{const t=await e.text();await this.apiRequest(`${u}/sites`,{method:"POST",body:JSON.stringify({name:e.name.replace(/\.(html?)$/i,""),content:t})}),await this.loadSites(),this.render()}catch(t){console.error(t),alert("Upload failed")}}async handleUploadMultiple(e){if(!this.session||e.length===0)return;let t=0,i=0;for(const s of e)try{const a=await s.text();await this.apiRequest(`${u}/sites`,{method:"POST",body:JSON.stringify({name:s.name.replace(/\.(html?)$/i,""),content:a})}),t++}catch{i++}await this.loadSites(),this.render(),i>0?alert(`${t} uploaded, ${i} failed`):t>1&&alert(`${t} files uploaded`)}async handleDelete(e){if(confirm("Delete?"))try{await this.apiRequest(`${u}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error(t)}}async handleRename(e,t){const i=prompt("Neuer Name:",t);if(!(!i||i===t))try{await this.apiRequest(`${u}/sites/${e}`,{method:"PUT",body:JSON.stringify({name:i})}),await this.loadSites(),this.render()}catch(s){console.error(s),alert("Rename failed")}}async showIconPicker(e){var d;const t=this.sites.find(o=>o.id===e);if(!t)return;const i=document.createElement("div");i.className="settings-overlay",i.innerHTML=`
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,document.body.appendChild(i);let s=[];try{const h=(await(await fetch("https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js")).text()).matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);for(const m of h){const v=m[1].replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");s.push(v)}}catch{s=["globe","file","image","code","link","star","heart"]}const a=document.getElementById("icon-grid"),n=document.getElementById("icon-search"),g=o=>{var h;const l=o?s.filter(m=>m.toLowerCase().includes(o.toLowerCase())):s.slice(0,200);a.innerHTML=l.slice(0,80).map(m=>`<button class="icon-option ${t.icon===m?"selected":""}" data-icon="${m}" title="${m}">
          <i data-lucide="${m}"></i>
        </button>`).join(""),(h=window.lucide)==null||h.createIcons()};g(""),a.addEventListener("click",async o=>{const l=o.target.closest(".icon-option");if(!l)return;const h=l.dataset.icon;try{await this.apiRequest(`${u}/sites/${e}`,{method:"PUT",body:JSON.stringify({icon:h})}),await this.loadSites(),this.render(),i.remove()}catch{alert("Icon update failed")}}),n.addEventListener("input",()=>g(n.value)),(d=document.getElementById("settings-close"))==null||d.addEventListener("click",()=>i.remove()),i.addEventListener("click",o=>{o.target===i&&i.remove()})}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${u}/sites/${e}`);this.viewer=new x(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error(t)}}}document.addEventListener("DOMContentLoaded",()=>new I);
