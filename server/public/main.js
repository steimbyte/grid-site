var v=Object.defineProperty;var p=(o,e,t)=>e in o?v(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var d=(o,e,t)=>p(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();class u{static render(){return`
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
    `}}class c{static render(e){return e.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${e.map(s=>{const i=c.extractPreview(s.content),n=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${s.id}">
          <div class="card-preview">
            <iframe srcdoc="${i}"></iframe>
          </div>
          <div class="card-info">
            <h3 class="card-title">${c.escapeHtml(s.name)}</h3>
            <p class="card-date">${n}</p>
          </div>
          <div class="card-actions">
            <button class="action-btn view-btn" data-id="${s.id}" title="Ansehen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button class="action-btn delete-btn" data-id="${s.id}" title="Löschen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `}).join("")}</div>`}static extractPreview(e){const t=new DOMParser().parseFromString(e,"text/html"),s=t.body,i=t.createElement("style");return i.textContent=`
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: system-ui, -apple-system, sans-serif; 
        transform: scale(0.25); 
        transform-origin: top left; 
        width: 400%; 
        background: #0f172a;
        color: #f1f5f9;
        padding: 20px;
      }
    `,s.prepend(i),s.innerHTML}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class f{constructor(e,t){d(this,"site");d(this,"onClose");d(this,"blobUrl",null);this.site=e,this.onClose=t}open(){const e=new Blob([this.site.content],{type:"text/html"});this.blobUrl=URL.createObjectURL(e),window.open(this.blobUrl,"_blank"),setTimeout(()=>{this.blobUrl&&(URL.revokeObjectURL(this.blobUrl),this.blobUrl=null)},6e4),this.onClose()}render(){return`
      <div class="viewer-overlay" id="viewer-overlay">
        <div class="viewer-modal">
          <div class="viewer-header">
            <h2>${this.escapeHtml(this.site.name)}</h2>
            <button class="close-btn" id="close-viewer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="viewer-content">
            <iframe srcdoc="${this.escapeHtml(this.site.content)}"></iframe>
          </div>
          <div class="viewer-footer">
            <a href="#" class="open-link" id="open-external">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              In neuem Tab öffnen
            </a>
          </div>
        </div>
      </div>
    `}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}class w{static render(){return`
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <h1>Site Grid</h1>
          </div>
          <p class="subtitle">Upload and preview your HTML sites</p>
        </div>
      </header>
    `}}class y{static render(){return`
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
    `}}const h="http://localhost:3000/api";class g{constructor(){d(this,"sites",[]);d(this,"filteredSites",[]);d(this,"searchQuery","");d(this,"viewer",null);this.initCursorGlow(),this.loadSites(),this.render()}async loadSites(){try{const e=await fetch(`${h}/sites`);this.sites=await e.json(),this.filteredSites=[...this.sites]}catch(e){console.error("Failed to load sites:",e),this.sites=[],this.filteredSites=[]}}initCursorGlow(){const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}filterSites(){if(!this.searchQuery)this.filteredSites=[...this.sites];else{const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>t.name.toLowerCase().includes(e))}}render(){const e=document.getElementById("app");e.innerHTML=`
      <div class="app-container">
        ${w.render()}
        
        <div class="upload-section">
          ${y.render()}
          ${u.render()}
        </div>
        
        <div class="grid-section">
          ${c.render(this.filteredSites)}
        </div>
        
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){const e=document.getElementById("app"),t=e.querySelector(".search-input");t==null||t.addEventListener("input",r=>{this.searchQuery=r.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(r=>{r.addEventListener("click",async a=>{a.stopPropagation();const l=r.dataset.id;await this.handleDelete(l)})}),e.querySelectorAll(".view-btn").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const l=r.dataset.id;this.handleView(l)})}),e.querySelectorAll(".site-card").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.id;this.handleView(a)})});const s=e.querySelector("#file-input");s==null||s.addEventListener("change",async r=>{var l;const a=(l=r.target.files)==null?void 0:l[0];a&&(await this.handleUpload(a),s.value="")});const i=e.querySelector(".uploader");i==null||i.addEventListener("dragover",r=>{r.preventDefault(),i.classList.add("drag-over")}),i==null||i.addEventListener("dragleave",()=>{i.classList.remove("drag-over")}),i==null||i.addEventListener("drop",async r=>{var l;r.preventDefault(),i.classList.remove("drag-over");const a=(l=r.dataTransfer)==null?void 0:l.files[0];a&&await this.handleUpload(a)});const n=e.querySelector("#close-viewer");n==null||n.addEventListener("click",()=>{this.viewer=null,this.render()})}updateGrid(){const e=document.querySelector(".grid-section");e&&(e.innerHTML=c.render(this.filteredSites),this.attachEventListeners())}async handleUpload(e){try{const t=await e.text(),s=e.name.replace(/\.(html|htm)$/i,"");await fetch(`${h}/sites`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,content:t})}),await this.loadSites(),this.filterSites(),this.render()}catch(t){console.error("Upload failed:",t),alert("Upload fehlgeschlagen!")}}async handleDelete(e){try{await fetch(`${h}/sites/${e}`,{method:"DELETE"}),await this.loadSites(),this.filterSites(),this.render()}catch(t){console.error("Delete failed:",t)}}handleView(e){const t=this.sites.find(s=>s.id===e);t&&(this.viewer=new f(t,()=>{this.viewer=null,this.render()}),this.viewer.open())}}document.addEventListener("DOMContentLoaded",()=>{new g});
