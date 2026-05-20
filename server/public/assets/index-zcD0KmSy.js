var $=Object.defineProperty;var C=(p,e,t)=>e in p?$(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var b=(p,e,t)=>C(p,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class k{static render(){return`
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `}static init(){}}class w{static render(e,t=!1,n=[]){return e.length===0?`
        <div class="empty-state">
          <i data-lucide="folder-open"></i>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`
      <div class="site-grid">
        ${e.map(s=>{const i=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
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
                <p class="card-date">${i}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
                  <i data-lucide="eye"></i>
                </button>
                ${t?`
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
    `}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class x{constructor(e,t){b(this,"site");b(this,"onClose");this.site=e,this.onClose=t}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}open(){var i;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t),window.lucide&&window.lucide.createIcons();const n=document.getElementById("site-iframe"),s=document.getElementById("iframe-loader");if(n&&this.site.content){n.onload=()=>{s==null||s.classList.add("hidden"),n.classList.add("loaded");try{const o=n.contentDocument;o&&(o.documentElement.style.backgroundColor="#0a0a0f",o.body.style.backgroundColor="#0a0a0f")}catch{}};const a=getComputedStyle(document.documentElement).getPropertyValue("--bg-deep")||"#0a0a0f",c=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#c9a227",r=getComputedStyle(document.documentElement).getPropertyValue("--border-accent")||"#333";n.srcdoc=`<html><body style="background:${a};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:48px;height:48px;border:3px solid ${r};border-top-color:${c};border-radius:50%;animation:spin 1s linear infinite;"></div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      </body></html>`,setTimeout(()=>{n.srcdoc=this.site.content},100)}(i=document.getElementById("viewer-close"))==null||i.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",a=>{a.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",a=>{a.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
      <div class="viewer-container">
        <div class="viewer-glow-border">
          <div class="viewer-header">
            <button class="viewer-back" id="viewer-close">
              <i data-lucide="arrow-left"></i>
              <span>Back</span>
            </button>
            <h2 class="viewer-title">${this.escapeHtml(this.site.name)}</h2>
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
    `}}class q{static render(e,t,n,s,i,a,c,r,o,l){return`
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
    `}static init(e){const t=document.getElementById("login-username"),n=document.getElementById("login-password"),s=document.getElementById("btn-login"),i=s.querySelector(".btn-text"),a=document.getElementById("btn-toggle"),c=document.getElementById("toggle-text"),r=document.getElementById("login-error"),o=document.getElementById("login-card"),l=document.getElementById("card-glow");let u=!1;o==null||o.addEventListener("mousemove",v=>{if(!o||!l)return;const d=o.getBoundingClientRect(),m=v.clientX-d.left,f=v.clientY-d.top;l.style.background=`radial-gradient(circle at ${m}px ${f}px, var(--glow) 0%, transparent 50%)`,l.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{l&&(l.style.opacity="0")});const h=()=>{u=!u,u?(i.textContent="Create Account",c.textContent="Have an account?",a.textContent="Sign in"):(i.textContent="Sign In",c.textContent="New user?",a.textContent="Create account"),r.classList.remove("show")},E=async()=>{const v=t.value.trim(),d=n.value;if(!v){t.classList.add("shake"),r.textContent="Enter username",r.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!d){n.classList.add("shake"),r.textContent="Enter password",r.classList.add("show"),setTimeout(()=>n.classList.remove("shake"),400);return}s.classList.add("loading"),s.disabled=!0,r.classList.remove("show");try{await e(v,d,u)}catch(m){r.textContent=m instanceof Error?m.message:"Something went wrong",r.classList.add("show"),s.classList.remove("loading"),s.disabled=!1}};s==null||s.addEventListener("click",E),a==null||a.addEventListener("click",h),n==null||n.addEventListener("keydown",v=>{v.key==="Enter"&&E()}),t==null||t.addEventListener("input",()=>{r.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const L={accentColor:"#c9a227",gridSize:"normal"};class y{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...L,...JSON.parse(e)}:{...L}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),n=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${n}, ${s}, ${i}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${n}, ${s}, ${i}, 0.5)`);const a=Math.max(0,n-20),c=Math.max(0,s-30),r=Math.max(0,i-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${a}, ${c}, ${r})`);const o=Math.max(0,n-80),l=Math.min(255,s+30),u=Math.min(255,i+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${o}, ${l}, ${u})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${n}, ${s}, ${i}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${n}, ${s}, ${i}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${n}, ${s}, ${i}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${n}, ${s}, ${i}, 0.4)`)}static render(e){return`
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
    `}static init(e){const t=document.querySelector(".settings-popup"),n=document.getElementById("settings-close"),s=document.getElementById("accent-color"),i=document.querySelector(".settings-overlay"),a=document.querySelectorAll(".preset"),c=document.querySelectorAll(".grid-option");n==null||n.addEventListener("click",()=>i==null?void 0:i.remove()),s==null||s.addEventListener("input",r=>{const o=r.target.value,l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const u=y.load();e({...u,accentColor:o})}),a.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.color;s&&(s.value=o);const l=t==null?void 0:t.querySelector(".color-picker-row span");l&&(l.textContent=o.toUpperCase());const u=y.load();e({...u,accentColor:o})})}),c.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.size,l=y.load();e({...l,gridSize:o}),c.forEach(u=>u.classList.remove("active")),r.classList.add("active"),document.body.className=`grid-${o}`})})}}let g="http://localhost:3000/api";class T{constructor(){b(this,"session",null);b(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});b(this,"sites",[]);b(this,"filteredSites",[]);b(this,"tags",[]);b(this,"searchQuery","");b(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),this.initApiUrl()}async initApiUrl(){try{const t=await(await fetch("/api/config")).json();t.frontendUrl&&(g=`${t.frontendUrl.replace(/\/$/,"")}/api`)}catch{}this.loadTags(),await this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const n=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!n.ok){const s=await n.json().catch(()=>({error:"Request failed"}));throw new Error(s.error||`HTTP ${n.status}`)}return n.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${g}/tags`).then(e=>e.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${g}/sites`),this.filterSites()}catch{this.clearSession(),this.renderLogin()}}filterSites(){const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>{var n;return t.name.toLowerCase().includes(e)||((n=t.content)==null?void 0:n.toLowerCase().includes(e))})}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",n=>{n.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(y.render(this.settings));y.init(n=>{this.settings=n,y.save(n),y.apply(n)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),this.apiRequest(`${g}/leaderboard`).then(n=>{const s=document.getElementById("leaderboard-list");if(s)if(s.textContent="",n.length)n.forEach((i,a)=>{const c=document.createElement("div");c.className=`leaderboard-item ${a===0?"gold":a===1?"silver":a===2?"bronze":""}`;const r=document.createElement("span");r.className="name",r.textContent=i.username;const o=document.createElement("span");o.className="rank",o.textContent=`#${a+1}`,c.append(o),c.appendChild(r);const l=document.createElement("span");l.className="visits",l.textContent=`${i.visits} visits`,c.appendChild(l),s.appendChild(c)});else{const i=document.createElement("div");i.className="empty",i.textContent="No visits yet",s.appendChild(i)}}).catch(()=>{const n=document.getElementById("leaderboard-list");if(n){n.textContent="";const s=document.createElement("div");s.className="empty",s.textContent="Failed to load",n.appendChild(s)}})}showUserManagement(){var t,n;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(n=document.getElementById("settings-close"))==null||n.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(e)try{const[t,n]=await Promise.all([this.apiRequest(`${g}/admin/users`),this.apiRequest(`${g}/settings`)]);e.textContent="",t.forEach(s=>{var l;const i=document.createElement("div");i.className="user-item";const a=document.createElement("div");a.className="user-info";const c=document.createElement("span");c.className="user-name",c.textContent=s.username;const r=document.createElement("span");r.className=`user-role ${s.role}`,r.textContent=s.role,a.append(c,r);const o=document.createElement("div");if(o.className="user-stats",o.textContent=`${s.visits} visits`,i.append(a,o),s.role!=="admin"){const u=document.createElement("div");u.className="user-upload-toggle",u.innerHTML=`<label><input type="checkbox" class="user-upload-perm" data-id="${s.id}" ${((l=n.userSettings)==null?void 0:l[s.id])!==!1?"checked":""}> <span>Upload</span></label>`,i.append(u);const h=document.createElement("div");h.className="user-actions",h.innerHTML=`<button class="user-btn promote" data-id="${s.id}">Promote</button><button class="user-btn delete" data-id="${s.id}">Delete</button>`,i.append(h)}else{const u=document.createElement("div");u.className="user-actions",u.innerHTML=`<button class="user-btn delete" data-id="${s.id}">Delete</button>`,i.append(u)}e.appendChild(i)}),e.querySelectorAll(".user-upload-perm").forEach(s=>{s.addEventListener("change",async i=>{const a=i.target.dataset.id,c=i.target.checked;await this.apiRequest(`${g}/settings`,{method:"PUT",body:JSON.stringify({userSettings:{...n.userSettings,[a]:c}})})})}),e.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),e.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{e.textContent="";const t=document.createElement("div");t.className="error",t.textContent="Failed",e.appendChild(t)}}async promoteUser(e){if(confirm("Promote?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}async deleteUser(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}showTags(){var t,n,s;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(n=document.getElementById("settings-close"))==null||n.addEventListener("click",()=>e.remove()),this.renderTags(),(s=document.getElementById("add-tag-btn"))==null||s.addEventListener("click",async()=>{var c,r;const i=(c=document.getElementById("new-tag-name"))==null?void 0:c.value,a=(r=document.getElementById("new-tag-color"))==null?void 0:r.value;i&&(await fetch(`${g}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:i,color:a})}),this.tags=await fetch(`${g}/tags`).then(o=>o.json()),this.renderTags())})}async showSiteSettings(){var n,s,i,a;if(((n=this.session)==null?void 0:n.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=await this.apiRequest(`${g}/settings`),t=this.createOverlay(`<div class="settings-popup"><h3>Site Settings</h3><div class="setting-row"><label><input type="checkbox" id="uploads-enabled" ${e.uploadsEnabled!==!1?"checked":""}> <span>Uploads erlaubt</span></label></div><button class="settings-close" id="settings-close">Close</button></div>`);(s=window.lucide)==null||s.createIcons(),(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>t.remove()),(a=document.getElementById("uploads-enabled"))==null||a.addEventListener("change",async c=>{const r=c.target.checked;await this.apiRequest(`${g}/settings`,{method:"PUT",body:JSON.stringify({uploadsEnabled:r})})})}async renderTags(){const e=document.getElementById("tags-list");e&&(e.textContent="",this.tags.forEach(t=>{const n=document.createElement("div");n.className="tag-item";const s=document.createElement("span");s.className="tag-dot",s.style.background=t.color;const i=document.createElement("span");i.textContent=t.name;const a=document.createElement("button");a.className="tag-delete",a.dataset.id=t.id,a.textContent="X",n.append(s,i,a),e.appendChild(n)}),e.querySelectorAll(".tag-delete").forEach(t=>t.addEventListener("click",async()=>{await fetch(`${g}/tags/${t.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${g}/tags`).then(n=>n.json()),this.renderTags()})))}toggleGridSize(){const e=["small","normal","large"],t=e.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=e[(t+1)%e.length],y.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${g}/export`,"_blank")}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=S.render(),S.init(this.handleAuth.bind(this)))}async handleAuth(e,t,n){try{const s=await this.apiRequest(`${g}/auth/${n?"register":"login"}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:s.token,role:s.role,username:s.username,userId:s.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(s){throw s}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var t,n,s,i;const e=document.getElementById("app");e&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,e.innerHTML=`
      <div class="app-container">
        ${q.render(((t=this.session)==null?void 0:t.role)??"user",((n=this.session)==null?void 0:n.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((s=this.session)==null?void 0:s.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this),this.showSiteSettings.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${I.render()}
            <div class="grid-section">
              ${w.render(this.filteredSites,((i=this.session)==null?void 0:i.role)==="admin",this.tags)}
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
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var i,a,c,r,o,l,u,h,E,v;window.lucide&&!document.querySelector(".lucide-create-icons-called")&&(window.lucide.createIcons(),document.body.classList.add("lucide-create-icons-called"));const e=document.getElementById("app");if(!e)return;(i=e.querySelector("#logout-btn"))==null||i.addEventListener("click",()=>this.handleLogout()),(a=e.querySelector("#settings-btn"))==null||a.addEventListener("click",()=>this.showSettings()),(c=e.querySelector("#leaderboard-btn"))==null||c.addEventListener("click",()=>this.showLeaderboard()),(r=e.querySelector("#grid-size-btn"))==null||r.addEventListener("click",()=>this.toggleGridSize()),(o=e.querySelector("#sidebar-upload-btn"))==null||o.addEventListener("click",()=>{var d;return(d=document.querySelector("#file-input"))==null?void 0:d.click()}),(l=e.querySelector("#users-btn"))==null||l.addEventListener("click",()=>this.showUserManagement()),(u=e.querySelector("#tags-btn"))==null||u.addEventListener("click",()=>this.showTags()),(h=e.querySelector("#site-settings-btn"))==null||h.addEventListener("click",()=>this.showSiteSettings()),(E=e.querySelector("#export-btn"))==null||E.addEventListener("click",()=>this.exportZip());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",d=>{this.searchQuery=d.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(d=>d.addEventListener("click",m=>{var f;m.stopPropagation(),((f=this.session)==null?void 0:f.role)==="admin"&&this.handleDelete(d.dataset.id)})),e.querySelectorAll(".rename-btn").forEach(d=>d.addEventListener("click",m=>{m.stopPropagation(),this.handleRename(d.dataset.id,d.dataset.name)})),e.querySelectorAll(".icon-btn").forEach(d=>d.addEventListener("click",m=>{m.stopPropagation(),this.showIconPicker(d.dataset.id)})),e.querySelectorAll(".view-btn").forEach(d=>{d.addEventListener("click",m=>{m.stopPropagation(),this.handleView(d.dataset.id)})}),e.querySelectorAll(".site-card").forEach(d=>{d.addEventListener("click",m=>{m.target.closest(".card-actions")||this.handleView(d.dataset.id)})});const n=e.querySelector("#file-input");n==null||n.addEventListener("change",async d=>{const m=d.target.files;m!=null&&m.length&&(await this.handleUploadMultiple(Array.from(m)),n.value="")});const s=e.querySelector(".uploader");s==null||s.addEventListener("dragover",d=>{d.preventDefault(),s.classList.add("drag-over")}),s==null||s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s==null||s.addEventListener("drop",async d=>{var f;d.preventDefault(),s.classList.remove("drag-over");const m=(f=d.dataTransfer)==null?void 0:f.files;m!=null&&m.length&&await this.handleUploadMultiple(Array.from(m))}),(v=e.querySelector("#back-btn"))==null||v.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",d=>{var m;d.target instanceof HTMLInputElement||(d.key==="/"&&(d.preventDefault(),t==null||t.focus()),(d.key==="n"||d.key==="N")&&(d.preventDefault(),(m=document.querySelector("#file-input"))==null||m.click()))})}async loadSidebarData(){try{const t=await this.apiRequest(`${g}/stats`);document.getElementById("stat-logins").textContent=String(t.totalLogins),document.getElementById("stat-users").textContent=String(t.totalUsers),document.getElementById("stat-sites").textContent=String(t.totalSites)}catch{}const e=document.getElementById("sidebar-leaderboard");if(e)try{const t=await this.apiRequest(`${g}/leaderboard?limit=5`);if(e.textContent="",t.length)t.forEach((n,s)=>{const i=document.createElement("div");i.className=`sidebar-item ${s===0?"gold":s===1?"silver":s===2?"bronze":""}`;const a=document.createElement("span");a.className="sidebar-rank",a.textContent=String(s+1);const c=document.createElement("span");c.className="sidebar-name",c.textContent=n.username;const r=document.createElement("span");r.className="sidebar-visits",r.textContent=String(n.visits),i.append(a,c,r),e.appendChild(i)});else{const n=document.createElement("div");n.className="empty",n.textContent="No visits",e.appendChild(n)}}catch{e.textContent="";const t=document.createElement("div");t.className="empty",t.textContent="Failed",e.appendChild(t)}}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=w.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin",this.tags),this.attachEventListeners())}async handleUploadMultiple(e){if(!this.session||e.length===0)return;let t=0,n=0;for(const s of e)try{const i=await s.text();await this.apiRequest(`${g}/sites`,{method:"POST",body:JSON.stringify({name:s.name.replace(/\.(html?)$/i,""),content:i})}),t++}catch{n++}await this.loadSites(),this.render(),n>0?alert(`${t} uploaded, ${n} failed`):t>1&&alert(`${t} files uploaded`)}async handleDelete(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error(t)}}async handleRename(e,t){const n=prompt("Neuer Name:",t);if(!(!n||n===t))try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({name:n})}),await this.loadSites(),this.render()}catch(s){console.error(s),alert("Rename failed")}}async showIconPicker(e){var r;const t=this.sites.find(o=>o.id===e);if(!t)return;const n=document.createElement("div");n.className="settings-overlay",n.innerHTML=`
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,document.body.appendChild(n);let s=[];try{const u=(await(await fetch("https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js")).text()).matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);for(const h of u){const v=h[1].replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");s.push(v)}}catch{s=["globe","file","image","code","link","star","heart"]}const i=document.getElementById("icon-grid"),a=document.getElementById("icon-search"),c=o=>{var u;const l=o?s.filter(h=>h.toLowerCase().includes(o.toLowerCase())):s.slice(0,200);i.innerHTML=l.slice(0,80).map(h=>`<button class="icon-option ${t.icon===h?"selected":""}" data-icon="${h}" title="${h}">
          <i data-lucide="${h}"></i>
        </button>`).join(""),(u=window.lucide)==null||u.createIcons()};c(""),i.addEventListener("click",async o=>{const l=o.target.closest(".icon-option");if(!l)return;const u=l.dataset.icon;try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({icon:u})}),await this.loadSites(),this.render(),n.remove()}catch{alert("Icon update failed")}}),a.addEventListener("input",()=>c(a.value)),(r=document.getElementById("settings-close"))==null||r.addEventListener("click",()=>n.remove()),n.addEventListener("click",o=>{o.target===n&&n.remove()})}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${g}/sites/${e}`);this.viewer=new x(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error(t)}}}async function N(){try{const e=await(await fetch("/assets/icons/sprite.svg")).text(),t=document.createElement("div");t.id="icon-sprite",t.style.cssText="position:absolute;width:0;height:0;overflow:hidden;",t.innerHTML=e,document.body.insertBefore(t,document.body.firstChild)}catch(p){console.warn("Could not load icon sprite:",p)}}N();document.addEventListener("DOMContentLoaded",()=>new T);
