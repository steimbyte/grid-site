var w=Object.defineProperty;var f=(c,t,e)=>t in c?w(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var h=(c,t,e)=>f(c,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class b{static render(){return`
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
    `}}class p{static render(t,e=!1){return t.length===0?`
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
              <span>${p.escapeHtml(s.name)}</span>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${p.escapeHtml(s.name)}</h3>
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
      `}).join("")}</div>`}static escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}}class k{constructor(t,e){h(this,"site");h(this,"onClose");h(this,"blobUrl",null);this.site=t,this.onClose=e}open(){const t=new Blob([this.site.content],{type:"text/html"});this.blobUrl=URL.createObjectURL(t),window.open(this.blobUrl,"_blank"),setTimeout(()=>{this.blobUrl&&URL.revokeObjectURL(this.blobUrl)},6e4),this.onClose()}render(){return`
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
    `}getFullUrl(){return`/sites/${this.site.id}`}escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}class x{static render(t,e,i){return`
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
            <span class="role-badge ${t}">
              ${t==="admin"?"Admin":"Guest"}
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
    `}}class L{static render(){return`
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
              type="password" 
              id="login-password" 
              placeholder="Enter password"
              autocomplete="current-password"
            >
          </div>
          
          <button class="submit-btn" id="btn-login">
            <span>Sign In</span>
          </button>
        </div>
      </div>
      
      <div class="login-error" id="login-error"></div>
    `}static init(t){const e=document.getElementById("login-password"),i=document.getElementById("btn-login"),s=document.getElementById("login-error"),n=document.getElementById("login-card"),r=document.getElementById("card-glow");n==null||n.addEventListener("mousemove",o=>{if(!n||!r)return;const a=n.getBoundingClientRect(),d=o.clientX-a.left,g=o.clientY-a.top;r.style.background=`radial-gradient(circle at ${d}px ${g}px, var(--glow) 0%, transparent 50%)`,r.style.opacity="1"}),n==null||n.addEventListener("mouseleave",()=>{r&&(r.style.opacity="0")});const l=async o=>{if(!o.trim()){e.classList.add("shake"),s.textContent="Enter password",s.classList.add("show"),setTimeout(()=>e.classList.remove("shake"),400);return}i.classList.add("loading"),s.classList.remove("show"),await t(o),i.classList.remove("loading")};i==null||i.addEventListener("click",()=>l(e.value)),e==null||e.addEventListener("keydown",o=>{o.key==="Enter"&&l(e.value)}),setTimeout(()=>e==null?void 0:e.focus(),100)}}const m={accentColor:"#c9a227"};class v{static load(){const t=localStorage.getItem("site-grid-settings");return t?{...m,...JSON.parse(t)}:{...m}}static save(t){localStorage.setItem("site-grid-settings",JSON.stringify(t)),this.apply(t)}static apply(t){const e=t.accentColor.replace("#",""),i=parseInt(e.slice(0,2),16),s=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16);document.documentElement.style.setProperty("--accent",t.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${n}, 0.4)`);const r=Math.min(255,i+30),l=Math.max(0,s-50),o=Math.max(0,n-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${r}, ${l}, ${o})`);const a=Math.max(0,i-100),d=Math.min(255,s+40),g=Math.min(255,n+20);document.documentElement.style.setProperty("--accent-sage",`rgb(${a}, ${d}, ${g})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${n}, 0.05)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${n}, 0.08)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${n}, 0.3)`)}static render(t){return`
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
    `}static init(t){const e=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),n=document.querySelector(".settings-overlay"),r=document.querySelectorAll(".preset");i==null||i.addEventListener("click",()=>n==null?void 0:n.remove()),s==null||s.addEventListener("input",l=>{const o=l.target.value,a=e==null?void 0:e.querySelector(".color-picker-row span");a&&(a.textContent=o.toUpperCase()),t({accentColor:o})}),r.forEach(l=>{l.addEventListener("click",()=>{const o=l.dataset.color;s&&(s.value=o);const a=e==null?void 0:e.querySelector(".color-picker-row span");a&&(a.textContent=o.toUpperCase()),t({accentColor:o})})})}}const u="http://localhost:3000/api";class S{constructor(){h(this,"session",null);h(this,"settings",{accentColor:"#c9a227"});h(this,"sites",[]);h(this,"filteredSites",[]);h(this,"searchQuery","");h(this,"viewer",null);this.settings=v.load(),v.apply(this.settings),this.initCursorGlow(),this.checkSession()}async checkSession(){const t=localStorage.getItem("site-grid-session");if(t){try{this.session=JSON.parse(t);const e=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});if(e.ok){this.sites=await e.json(),this.filteredSites=[...this.sites],this.render();return}}catch{}this.session=null,localStorage.removeItem("site-grid-session")}this.renderLogin()}saveSession(){this.session?localStorage.setItem("site-grid-session",JSON.stringify(this.session)):localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",i=>{e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`})}filterSites(){if(!this.searchQuery)this.filteredSites=[...this.sites];else{const t=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(e=>e.name.toLowerCase().includes(t))}}showSettings(){if(document.querySelector(".settings-overlay"))return;const e=document.createElement("div");e.className="settings-overlay",document.body.appendChild(e),e.innerHTML=v.render(this.settings),v.init(i=>{this.settings=i,v.save(i)}),e.addEventListener("click",i=>{i.target===e&&e.remove()})}renderLogin(){const t=document.getElementById("app");t.innerHTML=y.render(),y.init(this.handleLogin.bind(this))}async handleLogin(t){try{const e=await fetch(`${u}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})});if(!e.ok){const n=await e.json();throw new Error(n.error||"Login failed")}const i=await e.json();this.session={token:i.token,role:i.role},this.saveSession();const s=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await s.json(),this.filteredSites=[...this.sites],this.render()}catch(e){const i=document.querySelector(".login-error");i&&(i.textContent=e instanceof Error?e.message:"Access denied",i.classList.add("show"))}}async handleLogout(){this.session&&await fetch(`${u}/auth/logout`,{method:"POST",headers:{"X-Auth-Token":this.session.token}}),this.session=null,this.saveSession(),this.sites=[],this.filteredSites=[],this.renderLogin()}render(){var i,s;const t=document.getElementById("app"),e=((i=this.session)==null?void 0:i.role)==="admin";t.innerHTML=`
      <div class="app-container">
        ${x.render(((s=this.session)==null?void 0:s.role)||"guest",this.handleLogout.bind(this),this.showSettings.bind(this))}        
        <div class="upload-section">
          ${L.render()}
          ${b.render()}
        </div>
        
        <div class="grid-section">
          ${p.render(this.filteredSites,e)}
        </div>
        
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){const t=document.getElementById("app"),e=t.querySelector("#logout-btn");e==null||e.addEventListener("click",()=>this.handleLogout());const i=t.querySelector("#settings-btn");i==null||i.addEventListener("click",()=>this.showSettings());const s=t.querySelector(".search-input");s==null||s.addEventListener("input",o=>{this.searchQuery=o.target.value,this.filterSites(),this.updateGrid()}),t.querySelectorAll(".delete-btn").forEach(o=>{o.addEventListener("click",async a=>{var g;if(a.stopPropagation(),((g=this.session)==null?void 0:g.role)!=="admin")return;const d=o.dataset.id;await this.handleDelete(d)})}),t.querySelectorAll(".view-btn").forEach(o=>{o.addEventListener("click",async a=>{a.stopPropagation();const d=o.dataset.id;await this.handleView(d)})}),t.querySelectorAll(".site-card").forEach(o=>{o.addEventListener("click",async()=>{const a=o.dataset.id;await this.handleView(a)})});const n=t.querySelector("#file-input");n==null||n.addEventListener("change",async o=>{var d;const a=(d=o.target.files)==null?void 0:d[0];a&&(await this.handleUpload(a),n.value="")});const r=t.querySelector(".uploader");r==null||r.addEventListener("dragover",o=>{o.preventDefault(),r.classList.add("drag-over")}),r==null||r.addEventListener("dragleave",()=>{r.classList.remove("drag-over")}),r==null||r.addEventListener("drop",async o=>{var d;o.preventDefault(),r.classList.remove("drag-over");const a=(d=o.dataTransfer)==null?void 0:d.files[0];a&&await this.handleUpload(a)});const l=t.querySelector("#back-btn");l==null||l.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){var e;const t=document.querySelector(".grid-section");t&&(t.innerHTML=p.render(this.filteredSites,((e=this.session)==null?void 0:e.role)==="admin"),this.attachEventListeners())}async handleUpload(t){if(this.session)try{const e=await t.text(),i=t.name.replace(/\.(html|htm)$/i,"");await fetch(`${u}/sites`,{method:"POST",headers:{"Content-Type":"application/json","X-Auth-Token":this.session.token},body:JSON.stringify({name:i,content:e})});const s=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await s.json(),this.filterSites(),this.render()}catch(e){console.error("Upload failed:",e),alert("Upload failed")}}async handleDelete(t){if(!(!this.session||this.session.role!=="admin")&&confirm("Delete this site?"))try{await fetch(`${u}/sites/${t}`,{method:"DELETE",headers:{"X-Auth-Token":this.session.token}});const e=await fetch(`${u}/sites`,{headers:{"X-Auth-Token":this.session.token}});this.sites=await e.json(),this.filterSites(),this.render()}catch(e){console.error("Delete failed:",e)}}async handleView(t){if(this.session)try{const i=await(await fetch(`${u}/sites/${t}`,{headers:{"X-Auth-Token":this.session.token}})).json();this.viewer=new k(i,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(e){console.error("Load failed:",e)}}}document.addEventListener("DOMContentLoaded",()=>{new S});
