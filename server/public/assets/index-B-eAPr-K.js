var k=Object.defineProperty;var E=(d,t,e)=>t in d?k(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var u=(d,t,e)=>E(d,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class S{static render(){return`
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
    `}}class w{static render(t,e=!1){return t.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${t.map(s=>{const n=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
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
            <p class="card-date">${n}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            ${e?`
            <button class="action-btn delete-btn" data-id="${s.id}" title="Löschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            `:""}
          </div>
        </div>
      `}).join("")}</div>`}static escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}}class C{constructor(t,e){u(this,"site");u(this,"onClose");u(this,"iframe",null);this.site=t,this.onClose=e}open(){var i;const t=document.querySelector(".app-container");if(!t)return;const e=document.createElement("div");e.className="viewer-overlay",e.innerHTML=this.render(),t.appendChild(e),setTimeout(()=>{const s=document.getElementById("site-iframe");s&&this.site.content&&(s.srcdoc=this.site.content)},100),(i=document.getElementById("viewer-close"))==null||i.addEventListener("click",()=>{e.remove(),this.onClose()}),e.addEventListener("click",s=>{s.target===e&&(e.remove(),this.onClose())}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(e.remove(),this.onClose())})}render(){return`
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
    `}}class ${static render(t,e,i,s,n){return`
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
              <span class="role-badge ${t}">${t==="admin"?"Admin":"Guest"}</span>
            </div>
            <button class="icon-btn" id="leaderboard-btn" title="Leaderboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 21v-6m4 6v-10m4 10v-14"/>
                <rect x="4" y="12" width="4" height="9"/>
                <rect x="12" y="6" width="4" height="15"/>
                <rect x="16" y="3" width="4" height="18"/>
              </svg>
            </button>
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
    `}static init(t){const e=document.getElementById("login-username"),i=document.getElementById("login-password"),s=document.getElementById("btn-login"),n=document.getElementById("btn-toggle"),c=document.getElementById("toggle-text"),o=document.getElementById("login-error"),a=document.getElementById("login-card"),r=document.getElementById("card-glow");let l=!1;a==null||a.addEventListener("mousemove",g=>{if(!a||!r)return;const m=a.getBoundingClientRect(),f=g.clientX-m.left,L=g.clientY-m.top;r.style.background=`radial-gradient(circle at ${f}px ${L}px, var(--glow) 0%, transparent 50%)`,r.style.opacity="1"}),a==null||a.addEventListener("mouseleave",()=>{r&&(r.style.opacity="0")});const h=()=>{l=!l,l?(s.querySelector("span").textContent="Create Account",c.textContent="Have an account?",n.textContent="Sign in"):(s.querySelector("span").textContent="Sign In",c.textContent="New user?",n.textContent="Create account"),o.classList.remove("show")},p=async()=>{const g=e.value.trim(),m=i.value;if(!g){e.classList.add("shake"),o.textContent="Enter username",o.classList.add("show"),setTimeout(()=>e.classList.remove("shake"),400);return}if(!m){i.classList.add("shake"),o.textContent="Enter password",o.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}s.classList.add("loading"),o.classList.remove("show");try{await t(g,m,l)}catch(f){o.textContent=f instanceof Error?f.message:"Something went wrong",o.classList.add("show")}s.classList.remove("loading")};s==null||s.addEventListener("click",p),n==null||n.addEventListener("click",h),i==null||i.addEventListener("keydown",g=>{g.key==="Enter"&&p()}),e==null||e.addEventListener("input",()=>{o.classList.remove("show")}),setTimeout(()=>e==null?void 0:e.focus(),100)}}const x={accentColor:"#c9a227"};class y{static load(){const t=localStorage.getItem("site-grid-settings");return t?{...x,...JSON.parse(t)}:{...x}}static save(t){localStorage.setItem("site-grid-settings",JSON.stringify(t)),this.apply(t)}static apply(t){const e=t.accentColor.replace("#",""),i=parseInt(e.slice(0,2),16),s=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16);document.documentElement.style.setProperty("--accent",t.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${n}, 0.4)`);const c=Math.min(255,i+30),o=Math.max(0,s-50),a=Math.max(0,n-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${c}, ${o}, ${a})`);const r=Math.max(0,i-100),l=Math.min(255,s+40),h=Math.min(255,n+20);document.documentElement.style.setProperty("--accent-sage",`rgb(${r}, ${l}, ${h})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${n}, 0.05)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${n}, 0.08)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${n}, 0.3)`)}static render(t){return`
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
        
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `}static init(t){const e=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),c=document.querySelectorAll(".preset");i==null||i.addEventListener("click",()=>n==null?void 0:n.remove()),s==null||s.addEventListener("input",o=>{const a=o.target.value,r=e==null?void 0:e.querySelector(".color-picker-row span");r&&(r.textContent=a.toUpperCase()),t({accentColor:a})}),c.forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.color;s&&(s.value=a);const r=e==null?void 0:e.querySelector(".color-picker-row span");r&&(r.textContent=a.toUpperCase()),t({accentColor:a})})})}}const v="http://localhost:3000/api";class M{constructor(){u(this,"session",null);u(this,"settings",{accentColor:"#c9a227"});u(this,"sites",[]);u(this,"filteredSites",[]);u(this,"searchQuery","");u(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),this.checkSession()}async checkSession(){const t=localStorage.getItem("site-grid-session");if(t){try{this.session=JSON.parse(t);const e=await fetch(`${v}/sites`,{headers:{"X-Auth-Token":this.session.token}});if(e.ok){this.sites=await e.json(),this.filteredSites=[...this.sites],this.render();return}}catch{}this.session=null,localStorage.removeItem("site-grid-session")}this.renderLogin()}saveSession(){this.session?localStorage.setItem("site-grid-session",JSON.stringify(this.session)):localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",i=>{e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`})}filterSites(){if(!this.searchQuery)this.filteredSites=[...this.sites];else{const t=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(e=>e.name.toLowerCase().includes(t))}}showSettings(){if(document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=y.render(this.settings),y.init(i=>{this.settings=i,y.save(i)}),e.addEventListener("click",i=>{i.target===e&&e.remove()})}showLeaderboard(){var i;if(document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=`
      <div class="settings-popup">
        <h3>🏆 Leaderboard</h3>
        <div class="leaderboard-list" id="leaderboard-list">
          <div class="leaderboard-loading">Loading...</div>
        </div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),e.addEventListener("click",s=>{s.target===e&&e.remove()}),fetch(`${v}/leaderboard`).then(s=>s.json()).then(s=>{const n=document.getElementById("leaderboard-list");if(n){if(s.length===0){n.innerHTML='<div class="leaderboard-empty">No visits yet</div>';return}n.innerHTML=s.map((c,o)=>`
          <div class="leaderboard-item ${o===0?"gold":o===1?"silver":o===2?"bronze":""}">
            <span class="rank">#${o+1}</span>
            <span class="name">${c.username}</span>
            <span class="visits">${c.visits} visits</span>
          </div>
        `).join("")}}).catch(()=>{const s=document.getElementById("leaderboard-list");s&&(s.innerHTML='<div class="leaderboard-empty">Failed to load</div>')})}renderLogin(){const t=document.getElementById("app");t.innerHTML=b.render(),b.init(this.handleAuth.bind(this))}async handleAuth(t,e,i){const s=i?"/api/auth/register":"/api/auth/login";try{const n=await fetch(`${v}${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:e})});if(!n.ok){const a=await n.json();throw new Error(a.error||"Auth failed")}const c=await n.json();this.session={token:c.token,role:c.role,username:c.username},this.saveSession();const o=await fetch(`${v}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await o.json(),this.filteredSites=[...this.sites],this.render()}catch(n){throw n}}async handleLogout(){this.session&&await fetch(`${v}/auth/logout`,{method:"POST",headers:{"X-Auth-Token":this.session.token}}),this.session=null,this.saveSession(),this.sites=[],this.filteredSites=[],this.renderLogin()}render(){var i,s,n;const t=document.getElementById("app"),e=((i=this.session)==null?void 0:i.role)==="admin";t.innerHTML=`
      <div class="app-container">
        ${$.render(((s=this.session)==null?void 0:s.role)||"guest",((n=this.session)==null?void 0:n.username)||"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this))}        
        <div class="upload-section">
          ${T.render()}
          ${S.render()}
        </div>
        
        <div class="grid-section">
          ${w.render(this.filteredSites,e)}
        </div>
        
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){const t=document.getElementById("app"),e=t.querySelector("#logout-btn");e==null||e.addEventListener("click",()=>this.handleLogout());const i=t.querySelector("#settings-btn");i==null||i.addEventListener("click",()=>this.showSettings());const s=t.querySelector("#leaderboard-btn");s==null||s.addEventListener("click",()=>this.showLeaderboard());const n=t.querySelector(".search-input");n==null||n.addEventListener("input",r=>{this.searchQuery=r.target.value,this.filterSites(),this.updateGrid()}),t.querySelectorAll(".delete-btn").forEach(r=>{r.addEventListener("click",async l=>{var p;if(l.stopPropagation(),((p=this.session)==null?void 0:p.role)!=="admin")return;const h=r.dataset.id;await this.handleDelete(h)})}),t.querySelectorAll(".view-btn").forEach(r=>{r.addEventListener("click",async l=>{l.stopPropagation();const h=r.dataset.id;await this.handleView(h)})}),t.querySelectorAll(".site-card").forEach(r=>{r.addEventListener("click",async()=>{const l=r.dataset.id;await this.handleView(l)})});const c=t.querySelector("#file-input");c==null||c.addEventListener("change",async r=>{var h;const l=(h=r.target.files)==null?void 0:h[0];l&&(await this.handleUpload(l),c.value="")});const o=t.querySelector(".uploader");o==null||o.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over")}),o==null||o.addEventListener("dragleave",()=>{o.classList.remove("drag-over")}),o==null||o.addEventListener("drop",async r=>{var h;r.preventDefault(),o.classList.remove("drag-over");const l=(h=r.dataTransfer)==null?void 0:h.files[0];l&&await this.handleUpload(l)});const a=t.querySelector("#back-btn");a==null||a.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){var e;const t=document.querySelector(".grid-section");t&&(t.innerHTML=w.render(this.filteredSites,((e=this.session)==null?void 0:e.role)==="admin"),this.attachEventListeners())}async handleUpload(t){if(this.session)try{const e=await t.text(),i=t.name.replace(/\.(html|htm)$/i,"");await fetch(`${v}/sites`,{method:"POST",headers:{"Content-Type":"application/json","X-Auth-Token":this.session.token},body:JSON.stringify({name:i,content:e})});const s=await fetch(`${v}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await s.json(),this.filterSites(),this.render()}catch(e){console.error("Upload failed:",e),alert("Upload failed")}}async handleDelete(t){if(!(!this.session||this.session.role!=="admin")&&confirm("Delete this site?"))try{await fetch(`${v}/sites/${t}`,{method:"DELETE",headers:{"X-Auth-Token":this.session.token}});const e=await fetch(`${v}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await e.json(),this.filterSites(),this.render()}catch(e){console.error("Delete failed:",e)}}async handleView(t){if(this.session)try{const i=await(await fetch(`${v}/sites/${t}`,{headers:{"X-Auth-Token":this.session.token}})).json();this.viewer=new C(i,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(e){console.error("Load failed:",e)}}}document.addEventListener("DOMContentLoaded",()=>{new M});
