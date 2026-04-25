var f=Object.defineProperty;var m=(l,e,t)=>e in l?f(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var d=(l,e,t)=>m(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class b{static render(){return`
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
    `}}class g{static render(e,t=!1){return e.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${e.map(s=>{const n=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${s.id}">
          <div class="card-preview">
            <div class="card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>${g.escapeHtml(s.name)}</span>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${g.escapeHtml(s.name)}</h3>
            <p class="card-date">${n}</p>
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
      `}).join("")}</div>`}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class k{constructor(e,t){d(this,"site");d(this,"onClose");d(this,"blobUrl",null);this.site=e,this.onClose=t}open(){const e=new Blob([this.site.content],{type:"text/html"});this.blobUrl=URL.createObjectURL(e),window.open(this.blobUrl,"_blank"),setTimeout(()=>{this.blobUrl&&URL.revokeObjectURL(this.blobUrl)},6e4),this.onClose()}render(){return`
      <div class="viewer-overlay" id="viewer-overlay">
        <div class="viewer-glow-frame">
          <!-- Corner glows -->
          <div class="corner-glow corner-tl"></div>
          <div class="corner-glow corner-tr"></div>
          <div class="corner-glow corner-bl"></div>
          <div class="corner-glow corner-br"></div>
          
          <!-- Header -->
          <div class="viewer-header">
            <button class="back-btn" id="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Zurück
            </button>
            <h2>${this.escapeHtml(this.site.name)}</h2>
            <a href="${this.getFullUrl()}" target="_blank" class="open-new-tab">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          
          <!-- Content iframe -->
          <div class="viewer-content">
            <iframe srcdoc="${this.escapeHtml(this.site.content)}"></iframe>
          </div>
        </div>
      </div>
    `}getFullUrl(){return`/sites/${this.site.id}`}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}class x{static render(e,t,i){return`
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
            <span class="role-badge ${e}">
              ${e==="admin"?"Admin":"Guest"}
            </span>
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
    `}}class S{static render(){return`
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
    `}}class y{static render(){return`
      <div class="login-container">
        <div class="login-card">
          <div class="login-logo">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          
          <h1>Site Grid</h1>
          <p class="login-subtitle">Access your workspace</p>
          
          <div class="login-form">
            <input 
              type="password" 
              id="login-password" 
              class="login-input"
              placeholder="Enter password..."
              autocomplete="current-password"
            >
            <div class="login-error">Access denied</div>
            
            <div class="login-buttons">
              <button class="login-btn guest" id="btn-guest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Guest
              </button>
              <button class="login-btn admin" id="btn-admin">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Admin
              </button>
            </div>
          </div>
          
          <p class="login-hint">
            Default: <code>guest</code> or <code>admin</code>
          </p>
        </div>
      </div>
    `}static init(e){const t=document.getElementById("login-password"),i=document.getElementById("btn-guest"),s=document.getElementById("btn-admin"),n=document.querySelector(".login-error"),r=async c=>{i.disabled=!0,s.disabled=!0,n.classList.remove("show"),await e(c),i.disabled=!1,s.disabled=!1};i==null||i.addEventListener("click",()=>r("guest")),s==null||s.addEventListener("click",()=>r("admin")),t==null||t.addEventListener("keypress",c=>{c.key==="Enter"&&r(t.value)})}}const w={accentColor:"#c9a227"};class v{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...w,...JSON.parse(e)}:{...w}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){document.documentElement.style.setProperty("--accent",e.accentColor);const t=e.accentColor.replace("#",""),i=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),n=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${n}, 0.4)`)}static render(e){return`
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
    `}static init(e){const t=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),r=document.querySelectorAll(".preset");i==null||i.addEventListener("click",()=>n==null?void 0:n.remove()),s==null||s.addEventListener("input",c=>{const o=c.target.value,a=t==null?void 0:t.querySelector(".color-picker-row span");a&&(a.textContent=o.toUpperCase()),e({accentColor:o})}),r.forEach(c=>{c.addEventListener("click",()=>{const o=c.dataset.color;s&&(s.value=o);const a=t==null?void 0:t.querySelector(".color-picker-row span");a&&(a.textContent=o.toUpperCase()),e({accentColor:o})})})}}const u="http://localhost:3000/api";class L{constructor(){d(this,"session",null);d(this,"settings",{accentColor:"#c9a227"});d(this,"sites",[]);d(this,"filteredSites",[]);d(this,"searchQuery","");d(this,"viewer",null);this.settings=v.load(),v.apply(this.settings),this.initCursorGlow(),this.checkSession()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e){try{this.session=JSON.parse(e);const t=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});if(t.ok){this.sites=await t.json(),this.filteredSites=[...this.sites],this.render();return}}catch{}this.session=null,localStorage.removeItem("site-grid-session")}this.renderLogin()}saveSession(){this.session?localStorage.setItem("site-grid-session",JSON.stringify(this.session)):localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const t=document.createElement("div");t.className="cursor-glow",document.body.appendChild(t),document.addEventListener("mousemove",i=>{t.style.left=`${i.clientX}px`,t.style.top=`${i.clientY}px`})}filterSites(){if(!this.searchQuery)this.filteredSites=[...this.sites];else{const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>t.name.toLowerCase().includes(e))}}showSettings(){if(document.querySelector(".settings-overlay"))return;const t=document.createElement("div");t.className="settings-overlay",document.body.appendChild(t),t.innerHTML=v.render(this.settings),v.init(i=>{this.settings=i,v.save(i)}),t.addEventListener("click",i=>{i.target===t&&t.remove()})}renderLogin(){const e=document.getElementById("app");e.innerHTML=y.render(),y.init(this.handleLogin.bind(this))}async handleLogin(e){try{const t=await fetch(`${u}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!t.ok){const n=await t.json();throw new Error(n.error||"Login failed")}const i=await t.json();this.session={token:i.token,role:i.role},this.saveSession();const s=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await s.json(),this.filteredSites=[...this.sites],this.render()}catch(t){const i=document.querySelector(".login-error");i&&(i.textContent=t instanceof Error?t.message:"Access denied",i.classList.add("show"))}}async handleLogout(){this.session&&await fetch(`${u}/auth/logout`,{method:"POST",headers:{"X-Auth-Token":this.session.token}}),this.session=null,this.saveSession(),this.sites=[],this.filteredSites=[],this.renderLogin()}render(){var i,s;const e=document.getElementById("app"),t=((i=this.session)==null?void 0:i.role)==="admin";e.innerHTML=`
      <div class="app-container">
        ${x.render(((s=this.session)==null?void 0:s.role)||"guest",this.handleLogout.bind(this),this.showSettings.bind(this))}        
        <div class="upload-section">
          ${S.render()}
          ${b.render()}
        </div>
        
        <div class="grid-section">
          ${g.render(this.filteredSites,t)}
        </div>
        
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){const e=document.getElementById("app"),t=e.querySelector("#logout-btn");t==null||t.addEventListener("click",()=>this.handleLogout());const i=e.querySelector("#settings-btn");i==null||i.addEventListener("click",()=>this.showSettings());const s=e.querySelector(".search-input");s==null||s.addEventListener("input",o=>{this.searchQuery=o.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(o=>{o.addEventListener("click",async a=>{var p;if(a.stopPropagation(),((p=this.session)==null?void 0:p.role)!=="admin")return;const h=o.dataset.id;await this.handleDelete(h)})}),e.querySelectorAll(".view-btn").forEach(o=>{o.addEventListener("click",async a=>{a.stopPropagation();const h=o.dataset.id;await this.handleView(h)})}),e.querySelectorAll(".site-card").forEach(o=>{o.addEventListener("click",async()=>{const a=o.dataset.id;await this.handleView(a)})});const n=e.querySelector("#file-input");n==null||n.addEventListener("change",async o=>{var h;const a=(h=o.target.files)==null?void 0:h[0];a&&(await this.handleUpload(a),n.value="")});const r=e.querySelector(".uploader");r==null||r.addEventListener("dragover",o=>{o.preventDefault(),r.classList.add("drag-over")}),r==null||r.addEventListener("dragleave",()=>{r.classList.remove("drag-over")}),r==null||r.addEventListener("drop",async o=>{var h;o.preventDefault(),r.classList.remove("drag-over");const a=(h=o.dataTransfer)==null?void 0:h.files[0];a&&await this.handleUpload(a)});const c=e.querySelector("#back-btn");c==null||c.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=g.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin"),this.attachEventListeners())}async handleUpload(e){if(this.session)try{const t=await e.text(),i=e.name.replace(/\.(html|htm)$/i,"");await fetch(`${u}/sites`,{method:"POST",headers:{"Content-Type":"application/json","X-Auth-Token":this.session.token},body:JSON.stringify({name:i,content:t})});const s=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await s.json(),this.filterSites(),this.render()}catch(t){console.error("Upload failed:",t),alert("Upload failed")}}async handleDelete(e){if(!(!this.session||this.session.role!=="admin")&&confirm("Delete this site?"))try{await fetch(`${u}/sites/${e}`,{method:"DELETE",headers:{"X-Auth-Token":this.session.token}});const t=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await t.json(),this.filterSites(),this.render()}catch(t){console.error("Delete failed:",t)}}async handleView(e){if(this.session)try{const i=await(await fetch(`${u}/sites/${e}`,{headers:{"X-Auth-Token":this.session.token}})).json();this.viewer=new k(i,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error("Load failed:",t)}}}document.addEventListener("DOMContentLoaded",()=>{new L});
