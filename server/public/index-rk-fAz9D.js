var c=Object.defineProperty;var h=(o,e,i)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var a=(o,e,i)=>h(o,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();class v{static render(e){return`
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
    `}static init(e,i){const n=e.querySelector("#file-input"),t=e.querySelector(".uploader");n.addEventListener("change",s=>{var d;const r=(d=s.target.files)==null?void 0:d[0];r&&(r.name.endsWith(".html")||r.name.endsWith(".htm"))&&(i(r),n.value="")}),t.addEventListener("dragover",s=>{s.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>{t.classList.remove("drag-over")}),t.addEventListener("drop",s=>{var d;s.preventDefault(),t.classList.remove("drag-over");const r=(d=s.dataTransfer)==null?void 0:d.files[0];r&&(r.name.endsWith(".html")||r.name.endsWith(".htm"))&&i(r)})}}class l{static render(e,i,n){return e.length===0?`
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Noch keine Sites</h3>
          <p>Lade deine erste HTML-Datei hoch</p>
        </div>
      `:`<div class="site-grid">${e.map(s=>{const r=l.extractPreview(s.content),d=new Date(s.uploadedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"short",year:"numeric"});return`
        <div class="site-card" data-id="${s.id}">
          <div class="card-preview">
            <iframe srcdoc="${r}"></iframe>
          </div>
          <div class="card-info">
            <h3 class="card-title">${l.escapeHtml(s.name)}</h3>
            <p class="card-date">${d}</p>
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
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        </div>
      `}).join("")}</div>`}static extractPreview(e){const i=new DOMParser().parseFromString(e,"text/html"),n=i.body,t=i.createElement("style");return t.textContent=`
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
    `,n.prepend(t),n.innerHTML}static escapeHtml(e){const i=document.createElement("div");return i.textContent=e,i.innerHTML}}class u{constructor(e,i){a(this,"site");a(this,"onClose");a(this,"blobUrl",null);this.site=e,this.onClose=i}open(){const e=new Blob([this.site.content],{type:"text/html"});this.blobUrl=URL.createObjectURL(e),window.open(this.blobUrl,"_blank"),setTimeout(()=>{this.blobUrl&&(URL.revokeObjectURL(this.blobUrl),this.blobUrl=null)},6e4),this.onClose()}render(){return`
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
    `}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}class p{static render(){return`
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
    `}}class f{static render(e){return`
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
    `}}class m{constructor(){a(this,"sites",[]);a(this,"filteredSites",[]);a(this,"searchQuery","");a(this,"viewer",null);this.loadSites(),this.initCursorGlow(),this.render()}initCursorGlow(){const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",i=>{e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`}),document.addEventListener("mouseleave",()=>{e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{e.style.opacity="0.6"})}loadSites(){const e=localStorage.getItem("site-grid-sites");if(e){const i=JSON.parse(e);this.sites=i.map(n=>({...n,uploadedAt:new Date(n.uploadedAt)}))}this.filteredSites=[...this.sites]}saveSites(){localStorage.setItem("site-grid-sites",JSON.stringify(this.sites))}filterSites(){if(!this.searchQuery)this.filteredSites=[...this.sites];else{const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(i=>i.name.toLowerCase().includes(e))}}render(){const e=document.getElementById("app");e.innerHTML=`
      <div class="app-container">
        ${p.render()}
        
        <div class="upload-section">
          ${f.render(this.handleSearch.bind(this))}
          ${v.render(this.handleUpload.bind(this))}
        </div>
        
        <div class="grid-section">
          ${l.render(this.filteredSites,this.handleDelete.bind(this),this.handleView.bind(this))}
        </div>
        
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners()}attachEventListeners(){const e=document.getElementById("app"),i=e.querySelector(".search-input");i==null||i.addEventListener("input",t=>{this.searchQuery=t.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const r=t.dataset.id;this.handleDelete(r)})}),e.querySelectorAll(".view-btn").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const r=t.dataset.id;this.handleView(r)})}),e.querySelectorAll(".site-card").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.id;this.handleView(s)})});const n=e.querySelector("#close-viewer");n==null||n.addEventListener("click",()=>this.closeViewer())}updateGrid(){const e=document.querySelector(".grid-section");e&&(e.innerHTML=l.render(this.filteredSites,this.handleDelete.bind(this),this.handleView.bind(this)),this.attachEventListeners())}handleUpload(e){const i=new FileReader;i.onload=n=>{var r;const t=(r=n.target)==null?void 0:r.result,s={id:crypto.randomUUID(),name:e.name.replace(/\.(html|htm)$/i,""),content:t,uploadedAt:new Date};this.sites.unshift(s),this.saveSites(),this.filterSites(),this.render()},i.readAsText(e)}handleDelete(e){this.sites=this.sites.filter(i=>i.id!==e),this.saveSites(),this.filterSites(),this.render()}handleView(e){const i=this.sites.find(n=>n.id===e);i&&(this.viewer=new u(i,()=>{this.viewer=null,this.render()}),this.viewer.open())}closeViewer(){this.viewer=null,this.render()}handleSearch(e){this.searchQuery=e,this.filterSites(),this.updateGrid()}}document.addEventListener("DOMContentLoaded",()=>{new m});
