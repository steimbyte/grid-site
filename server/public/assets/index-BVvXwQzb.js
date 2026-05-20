var $=Object.defineProperty;var k=(p,e,t)=>e in p?$(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var h=(p,e,t)=>k(p,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class _{static render(){return`
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `}static init(){}}class S{static render(e,t=!1,i=[]){return e.length===0?`
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
                    ${s.tags.map(n=>`<span class="card-tag" style="background:${n.color}">${S.escapeHtml(n.name)}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <div class="card-info">
                <h3 class="card-title">${S.escapeHtml(s.name)}</h3>
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
                <button class="action-btn rename-btn" data-id="${s.id}" data-name="${S.escapeHtml(s.name)}" title="Umbenennen">
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
    `}static escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}class U{constructor(e,t){h(this,"site");h(this,"onClose");this.site=e,this.onClose=t}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}open(){var a;const e=document.querySelector(".app-container");if(!e)return;const t=document.createElement("div");t.className="viewer-overlay",t.innerHTML=this.render(),e.appendChild(t),window.lucide&&window.lucide.createIcons();const i=document.getElementById("site-iframe"),s=document.getElementById("iframe-loader");if(i&&this.site.content){i.onload=()=>{s==null||s.classList.add("hidden"),i.classList.add("loaded");try{const o=i.contentDocument;o&&(o.documentElement.style.backgroundColor="#0a0a0f",o.body.style.backgroundColor="#0a0a0f")}catch{}};const n=getComputedStyle(document.documentElement).getPropertyValue("--bg-deep")||"#0a0a0f",c=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#c9a227",r=getComputedStyle(document.documentElement).getPropertyValue("--border-accent")||"#333";i.srcdoc=`<html><body style="background:${n};margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="width:48px;height:48px;border:3px solid ${r};border-top-color:${c};border-radius:50%;animation:spin 1s linear infinite;"></div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      </body></html>`,setTimeout(()=>{i.srcdoc=this.site.content},100)}(a=document.getElementById("viewer-close"))==null||a.addEventListener("click",()=>{t.remove(),this.onClose()}),t.addEventListener("click",n=>{n.target===t&&(t.remove(),this.onClose())}),document.addEventListener("keydown",n=>{n.key==="Escape"&&(t.remove(),this.onClose())})}render(){return`
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
    `}}class T{static render(e,t,i,s,a,n,c,r,o,d){return`
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
    `}static init(){}}class A{static render(){return`
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Sites durchsuchen..."
          id="search-input"
        >
      </div>
    `}}class L{static render(){return`
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
    `}static init(e){const t=document.getElementById("login-username"),i=document.getElementById("login-password"),s=document.getElementById("btn-login"),a=s.querySelector(".btn-text"),n=document.getElementById("btn-toggle"),c=document.getElementById("toggle-text"),r=document.getElementById("login-error"),o=document.getElementById("login-card"),d=document.getElementById("card-glow");let u=!1;o==null||o.addEventListener("mousemove",f=>{if(!o||!d)return;const l=o.getBoundingClientRect(),m=f.clientX-l.left,b=f.clientY-l.top;d.style.background=`radial-gradient(circle at ${m}px ${b}px, var(--glow) 0%, transparent 50%)`,d.style.opacity="1"}),o==null||o.addEventListener("mouseleave",()=>{d&&(d.style.opacity="0")});const v=()=>{u=!u,u?(a.textContent="Create Account",c.textContent="Have an account?",n.textContent="Sign in"):(a.textContent="Sign In",c.textContent="New user?",n.textContent="Create account"),r.classList.remove("show")},w=async()=>{const f=t.value.trim(),l=i.value;if(!f){t.classList.add("shake"),r.textContent="Enter username",r.classList.add("show"),setTimeout(()=>t.classList.remove("shake"),400);return}if(!l){i.classList.add("shake"),r.textContent="Enter password",r.classList.add("show"),setTimeout(()=>i.classList.remove("shake"),400);return}s.classList.add("loading"),s.disabled=!0,r.classList.remove("show");try{await e(f,l,u)}catch(m){r.textContent=m instanceof Error?m.message:"Something went wrong",r.classList.add("show"),s.classList.remove("loading"),s.disabled=!1}};s==null||s.addEventListener("click",w),n==null||n.addEventListener("click",v),i==null||i.addEventListener("keydown",f=>{f.key==="Enter"&&w()}),t==null||t.addEventListener("input",()=>{r.classList.remove("show")}),setTimeout(()=>t==null?void 0:t.focus(),100)}}const x={accentColor:"#c9a227",gridSize:"normal"};class y{static load(){const e=localStorage.getItem("site-grid-settings");return e?{...x,...JSON.parse(e)}:{...x}}static save(e){localStorage.setItem("site-grid-settings",JSON.stringify(e)),this.apply(e)}static apply(e){const t=e.accentColor.replace("#",""),i=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--accent",e.accentColor),document.documentElement.style.setProperty("--glow",`rgba(${i}, ${s}, ${a}, 0.4)`),document.documentElement.style.setProperty("--glow-warm",`rgba(${i}, ${s}, ${a}, 0.5)`);const n=Math.max(0,i-20),c=Math.max(0,s-30),r=Math.max(0,a-30);document.documentElement.style.setProperty("--accent-warm",`rgb(${n}, ${c}, ${r})`);const o=Math.max(0,i-80),d=Math.min(255,s+30),u=Math.min(255,a+30);document.documentElement.style.setProperty("--accent-sage",`rgb(${o}, ${d}, ${u})`),document.documentElement.style.setProperty("--bg-accent-tint",`rgba(${i}, ${s}, ${a}, 0.06)`),document.documentElement.style.setProperty("--glass-tint",`rgba(${i}, ${s}, ${a}, 0.12)`),document.documentElement.style.setProperty("--border-accent",`rgba(${i}, ${s}, ${a}, 0.4)`),document.documentElement.style.setProperty("--cursor-glow",`rgba(${i}, ${s}, ${a}, 0.4)`)}static render(e){return`
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
    `}static init(e){const t=document.querySelector(".settings-popup"),i=document.getElementById("settings-close"),s=document.getElementById("accent-color"),a=document.querySelector(".settings-overlay"),n=document.querySelectorAll(".preset"),c=document.querySelectorAll(".grid-option");i==null||i.addEventListener("click",()=>a==null?void 0:a.remove()),s==null||s.addEventListener("input",r=>{const o=r.target.value,d=t==null?void 0:t.querySelector(".color-picker-row span");d&&(d.textContent=o.toUpperCase());const u=y.load();e({...u,accentColor:o})}),n.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.color;s&&(s.value=o);const d=t==null?void 0:t.querySelector(".color-picker-row span");d&&(d.textContent=o.toUpperCase());const u=y.load();e({...u,accentColor:o})})}),c.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.size,d=y.load();e({...d,gridSize:o}),c.forEach(u=>u.classList.remove("active")),r.classList.add("active"),document.body.className=`grid-${o}`})})}}class I{constructor(){h(this,"canvas");h(this,"gl");h(this,"program");h(this,"startTime");h(this,"animationId",0);h(this,"mouseX",.5);h(this,"mouseY",.5);h(this,"isRunning",!1);h(this,"colors",{lime1:[.333,1,0],lime2:[.949,1,0],lime3:[.067,1,0],lime4:[.824,1,.38],orange1:[1,.42,0],orange2:[1,.6,0]});h(this,"vertexShaderSource",`
    attribute vec2 a_position;
    varying vec2 v_uv;
    
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `);h(this,"fragmentShaderSource",`
    precision mediump float;
    
    varying vec2 v_uv;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    // Colors - Yellow/Green variant
    uniform vec3 u_lime1;
    uniform vec3 u_lime2;
    uniform vec3 u_lime3;
    uniform vec3 u_lime4;
    uniform vec3 u_orange1;
    uniform vec3 u_orange2;
    
    // Swirl parameters
    uniform float u_swirlRadius;
    uniform float u_swirlAngle;
    
    // Fluted glass parameters
    uniform float u_flutedFreq;
    uniform float u_flutedAngle;
    uniform float u_flutedRefraction;
    uniform float u_aberration;
    
    // Film grain
    uniform float u_grainStrength;
    
    // Hash function for noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    
    // Smooth noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Rotate 2D point
    vec2 rotate(vec2 p, float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
    }
    
    // Swirl distortion
    vec2 swirl(vec2 uv, vec2 center, float radius, float angle) {
      vec2 delta = uv - center;
      float dist = length(delta);
      
      if (dist < radius) {
        float percent = (radius - dist) / radius;
        float theta = percent * percent * angle;
        float s = sin(theta);
        float c = cos(theta);
        delta = vec2(delta.x * c - delta.y * s, delta.x * s + delta.y * c);
      }
      
      return center + delta;
    }
    
    // Fluted glass effect
    vec2 flutedGlass(vec2 uv, float frequency, float angle, float refraction) {
      vec2 rotated = rotate(uv - 0.5, angle);
      
      // Create sine wave pattern
      float wave = sin(rotated.y * frequency * 6.28318);
      
      // Apply refraction offset
      vec2 offset = vec2(wave * refraction * 0.01, 0.0);
      
      return rotate(uv + offset, -angle);
    }
    
    // ChromaFlow - animated color streaks
    vec3 chromaFlow(vec2 uv, float time) {
      // Create flowing streaks
      float flowSpeed = 0.3;
      float flowY = uv.y + time * flowSpeed;
      
      // Multiple streak layers
      float streak1 = sin(flowY * 3.0 + uv.x * 2.0 + time * 0.5) * 0.5 + 0.5;
      float streak2 = sin(flowY * 5.0 - uv.x * 3.0 + time * 0.7) * 0.5 + 0.5;
      float streak3 = sin(flowY * 2.0 + uv.x * 4.0 - time * 0.3) * 0.5 + 0.5;
      
      // Blend streaks with colors
      vec3 color = u_lime1 * streak1;
      color = mix(color, u_lime2, streak2 * 0.6);
      color = mix(color, u_lime3, streak3 * 0.4);
      
      // Add orange edges
      float edgeFade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
      edgeFade = 1.0 - edgeFade;
      vec3 orangeMix = mix(u_orange1, u_orange2, uv.y);
      color = mix(color, orangeMix * 0.3, edgeFade * 0.5);
      
      return color;
    }
    
    // Light streak effect
    vec3 lightStreaks(vec2 uv, float time) {
      vec3 streaks = vec3(0.0);
      
      // Animated diagonal streaks
      float angle = -0.785; // 45 degrees
      
      for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float xPos = 0.1 + fi * 0.15;
        float yOffset = sin(time * 0.2 + fi * 1.5) * 0.05;
        
        vec2 streakUV = rotate(uv - vec2(xPos, 0.5 + yOffset), angle);
        float streak = exp(-pow(streakUV.x * 8.0, 2.0));
        
        // Color based on position
        vec3 streakColor;
        if (fi < 2.0) {
          streakColor = mix(u_orange1, u_orange2, fi * 0.5);
        } else if (fi < 5.0) {
          float t = (fi - 2.0) / 3.0;
          streakColor = mix(u_lime1, u_lime2, t);
        } else {
          streakColor = u_lime3;
        }
        
        streaks += streakColor * streak * 0.4;
      }
      
      return streaks;
    }
    
    void main() {
      vec2 uv = v_uv;
      float aspect = u_resolution.x / u_resolution.y;
      
      // Adjust for aspect ratio
      vec2 centeredUV = uv;
      centeredUV.x *= aspect;
      vec2 center = vec2(0.5 * aspect, 0.5);
      
      // Apply swirl
      vec2 swirledUV = swirl(centeredUV, center, u_swirlRadius, u_swirlAngle + u_time * 0.1);
      
      // Apply fluted glass distortion
      vec2 flutedUV = flutedGlass(swirledUV, u_flutedFreq, u_flutedAngle, u_flutedRefraction);
      
      // Chromatic aberration
      float aberr = u_aberration * 0.005;
      vec2 uvR = flutedUV + vec2(aberr, 0.0);
      vec2 uvB = flutedUV - vec2(aberr, 0.0);
      
      // Get chroma colors with aberration
      vec3 colorR = chromaFlow(uvR, u_time * 0.5);
      vec3 colorG = chromaFlow(flutedUV, u_time * 0.5);
      vec3 colorB = chromaFlow(uvB, u_time * 0.5);
      
      vec3 color = vec3(colorR.r, colorG.g, colorB.b);
      
      // Add light streaks
      color += lightStreaks(uv, u_time);
      
      // Dark base (Swirl component)
      float darkBase = noise(uv * 20.0 + u_time * 0.05) * 0.03;
      color = mix(color, vec3(0.0), 0.85 - darkBase);
      
      // Film grain
      float grain = hash(uv * u_resolution + u_time * 100.0) * 2.0 - 1.0;
      grain = sign(grain) * (1.0 - sqrt(1.0 - abs(grain)));
      color += grain * u_grainStrength;
      
      // Diagonal line pattern (fluted glass visual)
      float linePattern = sin((swirledUV.y - swirledUV.x) * 100.0) * 0.02;
      color += linePattern;
      
      // Vignette
      float vignette = 1.0 - length(uv - 0.5) * 0.5;
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `);h(this,"render",()=>{this.isRunning&&(this.setUniforms(),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.animationId=requestAnimationFrame(this.render))});this.canvas=this.createCanvas(),this.gl=this.canvas.getContext("webgl",{alpha:!1,antialias:!1,preserveDrawingBuffer:!1}),this.program=this.createProgram(),this.startTime=Date.now(),this.setupGeometry(),this.setupMouseEvents(),this.resize()}createCanvas(){const e=document.createElement("canvas");return e.className="undertones-canvas",e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      pointer-events: none;
    `,document.body.appendChild(e),e}createShader(e,t){const i=this.gl.createShader(e);if(this.gl.shaderSource(i,t),this.gl.compileShader(i),!this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS))throw console.error("Shader compile error:",this.gl.getShaderInfoLog(i)),this.gl.deleteShader(i),new Error("Shader compilation failed");return i}createProgram(){const e=this.createShader(this.gl.VERTEX_SHADER,this.vertexShaderSource),t=this.createShader(this.gl.FRAGMENT_SHADER,this.fragmentShaderSource),i=this.gl.createProgram();if(this.gl.attachShader(i,e),this.gl.attachShader(i,t),this.gl.linkProgram(i),!this.gl.getProgramParameter(i,this.gl.LINK_STATUS))throw console.error("Program link error:",this.gl.getProgramInfoLog(i)),new Error("Program linking failed");return i}setupGeometry(){const e=new Float32Array([-1,-1,1,-1,-1,1,1,1]),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,e,this.gl.STATIC_DRAW);const i=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0)}setupMouseEvents(){document.addEventListener("mousemove",e=>{this.mouseX=e.clientX/window.innerWidth,this.mouseY=1-e.clientY/window.innerHeight})}resize(){const e=Math.min(window.devicePixelRatio||1,2);this.canvas.width=window.innerWidth*e,this.canvas.height=window.innerHeight*e,this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}setUniforms(){const e=(Date.now()-this.startTime)/1e3;this.gl.useProgram(this.program),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_time"),e),this.gl.uniform2f(this.gl.getUniformLocation(this.program,"u_resolution"),this.canvas.width,this.canvas.height),this.gl.uniform2f(this.gl.getUniformLocation(this.program,"u_mouse"),this.mouseX,this.mouseY),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_lime1"),this.colors.lime1),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_lime2"),this.colors.lime2),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_lime3"),this.colors.lime3),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_lime4"),this.colors.lime4),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_orange1"),this.colors.orange1),this.gl.uniform3fv(this.gl.getUniformLocation(this.program,"u_orange2"),this.colors.orange2),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_swirlRadius"),.5),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_swirlAngle"),2),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_flutedFreq"),8),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_flutedAngle"),-.785),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_flutedRefraction"),4),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_aberration"),.61),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_grainStrength"),.05)}start(){this.isRunning||(this.isRunning=!0,window.addEventListener("resize",this.resize),this.resize(),this.render())}stop(){this.isRunning=!1,this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.resize)}destroy(){this.stop(),this.canvas.remove(),this.gl.deleteProgram(this.program)}}let E=null;function C(){return E&&E.destroy(),E=new I,E.start(),E}let g="http://localhost:3000/api";class q{constructor(){h(this,"session",null);h(this,"settings",{accentColor:"#c9a227",gridSize:"normal"});h(this,"sites",[]);h(this,"filteredSites",[]);h(this,"tags",[]);h(this,"searchQuery","");h(this,"viewer",null);this.settings=y.load(),y.apply(this.settings),this.initCursorGlow(),C(),this.initApiUrl()}async initApiUrl(){try{const t=await(await fetch("/api/config")).json();t.frontendUrl&&(g=`${t.frontendUrl.replace(/\/$/,"")}/api`)}catch{}this.loadTags(),await this.checkSession()}getAuthHeaders(){var e;return{Authorization:`Bearer ${((e=this.session)==null?void 0:e.token)??""}`,"Content-Type":"application/json"}}async apiRequest(e,t={}){const i=await fetch(e,{...t,headers:{...this.getAuthHeaders(),...t.headers}});if(!i.ok){const s=await i.json().catch(()=>({error:"Request failed"}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}async checkSession(){const e=localStorage.getItem("site-grid-session");if(e)try{this.session=JSON.parse(e),await this.loadSites(),this.render();return}catch{}this.clearSession(),this.renderLogin()}clearSession(){this.session=null,localStorage.removeItem("site-grid-session")}initCursorGlow(){if(document.querySelector(".cursor-glow"))return;const e=document.createElement("div");e.className="cursor-glow",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`})}async loadTags(){try{this.tags=await fetch(`${g}/tags`).then(e=>e.json())}catch{this.tags=[]}}async loadSites(){try{this.sites=await this.apiRequest(`${g}/sites`),this.filterSites()}catch{this.clearSession(),this.renderLogin()}}filterSites(){const e=this.searchQuery.toLowerCase();this.filteredSites=this.sites.filter(t=>{var i;return t.name.toLowerCase().includes(e)||((i=t.content)==null?void 0:i.toLowerCase().includes(e))})}createOverlay(e){const t=document.createElement("div");return t.className="settings-overlay",t.innerHTML=e,document.body.appendChild(t),t.addEventListener("click",i=>{i.target===t&&t.remove()}),t}showSettings(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay(y.render(this.settings));y.init(i=>{this.settings=i,y.save(i),y.apply(i)}),(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove())}showLeaderboard(){var t;if(document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Leaderboard</h3><div class="leaderboard-list" id="leaderboard-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(t=document.getElementById("settings-close"))==null||t.addEventListener("click",()=>e.remove()),this.apiRequest(`${g}/leaderboard`).then(i=>{const s=document.getElementById("leaderboard-list");if(s)if(s.textContent="",i.length)i.forEach((a,n)=>{const c=document.createElement("div");c.className=`leaderboard-item ${n===0?"gold":n===1?"silver":n===2?"bronze":""}`;const r=document.createElement("span");r.className="name",r.textContent=a.username;const o=document.createElement("span");o.className="rank",o.textContent=`#${n+1}`,c.append(o),c.appendChild(r);const d=document.createElement("span");d.className="visits",d.textContent=`${a.visits} visits`,c.appendChild(d),s.appendChild(c)});else{const a=document.createElement("div");a.className="empty",a.textContent="No visits yet",s.appendChild(a)}}).catch(()=>{const i=document.getElementById("leaderboard-list");if(i){i.textContent="";const s=document.createElement("div");s.className="empty",s.textContent="Failed to load",i.appendChild(s)}})}showUserManagement(){var t,i;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup user-management"><h3>User Management</h3><div class="user-list" id="user-list"><div class="loading">Loading...</div></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),this.loadUserList()}async loadUserList(){const e=document.getElementById("user-list");if(e)try{const[t,i]=await Promise.all([this.apiRequest(`${g}/admin/users`),this.apiRequest(`${g}/settings`)]);e.textContent="",t.forEach(s=>{var d;const a=document.createElement("div");a.className="user-item";const n=document.createElement("div");n.className="user-info";const c=document.createElement("span");c.className="user-name",c.textContent=s.username;const r=document.createElement("span");r.className=`user-role ${s.role}`,r.textContent=s.role,n.append(c,r);const o=document.createElement("div");if(o.className="user-stats",o.textContent=`${s.visits} visits`,a.append(n,o),s.role!=="admin"){const u=document.createElement("div");u.className="user-upload-toggle",u.innerHTML=`<label><input type="checkbox" class="user-upload-perm" data-id="${s.id}" ${((d=i.userSettings)==null?void 0:d[s.id])!==!1?"checked":""}> <span>Upload</span></label>`,a.append(u);const v=document.createElement("div");v.className="user-actions",v.innerHTML=`<button class="user-btn promote" data-id="${s.id}">Promote</button><button class="user-btn delete" data-id="${s.id}">Delete</button>`,a.append(v)}else{const u=document.createElement("div");u.className="user-actions",u.innerHTML=`<button class="user-btn delete" data-id="${s.id}">Delete</button>`,a.append(u)}e.appendChild(a)}),e.querySelectorAll(".user-upload-perm").forEach(s=>{s.addEventListener("change",async a=>{const n=a.target.dataset.id,c=a.target.checked;await this.apiRequest(`${g}/settings`,{method:"PUT",body:JSON.stringify({userSettings:{...i.userSettings,[n]:c}})})})}),e.querySelectorAll(".promote").forEach(s=>s.addEventListener("click",()=>void this.promoteUser(s.dataset.id))),e.querySelectorAll(".delete").forEach(s=>s.addEventListener("click",()=>void this.deleteUser(s.dataset.id)))}catch{e.textContent="";const t=document.createElement("div");t.className="error",t.textContent="Failed",e.appendChild(t)}}async promoteUser(e){if(confirm("Promote?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"PUT",body:JSON.stringify({role:"admin"})}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}async deleteUser(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/admin/users/${e}`,{method:"DELETE"}),this.loadUserList()}catch(t){alert(t instanceof Error?t.message:"Error")}}showTags(){var t,i,s;if(((t=this.session)==null?void 0:t.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=this.createOverlay('<div class="settings-popup"><h3>Manage Tags</h3><div class="tags-list" id="tags-list"></div><div class="add-tag"><input type="text" id="new-tag-name" placeholder="Tag name"><input type="color" id="new-tag-color" value="#c9a227"><button id="add-tag-btn">Add</button></div><button class="settings-close" id="settings-close">Close</button></div>');(i=document.getElementById("settings-close"))==null||i.addEventListener("click",()=>e.remove()),this.renderTags(),(s=document.getElementById("add-tag-btn"))==null||s.addEventListener("click",async()=>{var c,r;const a=(c=document.getElementById("new-tag-name"))==null?void 0:c.value,n=(r=document.getElementById("new-tag-color"))==null?void 0:r.value;a&&(await fetch(`${g}/tags`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({name:a,color:n})}),this.tags=await fetch(`${g}/tags`).then(o=>o.json()),this.renderTags())})}async showSiteSettings(){var i,s,a,n;if(((i=this.session)==null?void 0:i.role)!=="admin"||document.querySelector(".settings-overlay"))return;const e=await this.apiRequest(`${g}/settings`),t=this.createOverlay(`<div class="settings-popup"><h3>Site Settings</h3><div class="setting-row"><label><input type="checkbox" id="uploads-enabled" ${e.uploadsEnabled!==!1?"checked":""}> <span>Uploads erlaubt</span></label></div><button class="settings-close" id="settings-close">Close</button></div>`);(s=window.lucide)==null||s.createIcons(),(a=document.getElementById("settings-close"))==null||a.addEventListener("click",()=>t.remove()),(n=document.getElementById("uploads-enabled"))==null||n.addEventListener("change",async c=>{const r=c.target.checked;await this.apiRequest(`${g}/settings`,{method:"PUT",body:JSON.stringify({uploadsEnabled:r})})})}async renderTags(){const e=document.getElementById("tags-list");e&&(e.textContent="",this.tags.forEach(t=>{const i=document.createElement("div");i.className="tag-item";const s=document.createElement("span");s.className="tag-dot",s.style.background=t.color;const a=document.createElement("span");a.textContent=t.name;const n=document.createElement("button");n.className="tag-delete",n.dataset.id=t.id,n.textContent="X",i.append(s,a,n),e.appendChild(i)}),e.querySelectorAll(".tag-delete").forEach(t=>t.addEventListener("click",async()=>{await fetch(`${g}/tags/${t.dataset.id}`,{method:"DELETE",headers:this.getAuthHeaders()}),this.tags=await fetch(`${g}/tags`).then(i=>i.json()),this.renderTags()})))}toggleGridSize(){const e=["small","normal","large"],t=e.indexOf(this.settings.gridSize||"normal");this.settings.gridSize=e[(t+1)%e.length],y.save(this.settings),document.body.className=`grid-${this.settings.gridSize}`}async exportZip(){window.open(`${g}/export`,"_blank")}renderLogin(){const e=document.getElementById("app");e&&(e.innerHTML=L.render(),L.init(this.handleAuth.bind(this)))}async handleAuth(e,t,i){try{const s=await this.apiRequest(`${g}/auth/${i?"register":"login"}`,{method:"POST",body:JSON.stringify({username:e,password:t})});this.session={token:s.token,role:s.role,username:s.username,userId:s.id},localStorage.setItem("site-grid-session",JSON.stringify(this.session)),await this.loadSites(),await this.loadTags(),this.render()}catch(s){throw s}}async handleLogout(){this.clearSession(),this.sites=[],this.filteredSites=[],this.viewer=null,this.renderLogin()}render(){var t,i,s,a;const e=document.getElementById("app");e&&(document.body.className=`grid-${this.settings.gridSize||"normal"}`,e.innerHTML=`
      <div class="app-container">
        ${T.render(((t=this.session)==null?void 0:t.role)??"user",((i=this.session)==null?void 0:i.username)??"User",this.handleLogout.bind(this),this.showSettings.bind(this),this.showLeaderboard.bind(this),((s=this.session)==null?void 0:s.role)==="admin"?this.showUserManagement.bind(this):void 0,this.toggleGridSize.bind(this),this.showTags.bind(this),this.exportZip.bind(this),this.showSiteSettings.bind(this))}
        <div class="main-content">
          <div class="left-panel">
            ${A.render()}
            <div class="grid-section">
              ${S.render(this.filteredSites,((a=this.session)==null?void 0:a.role)==="admin",this.tags)}
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
            ${_.render()}
          </aside>
        </div>
        ${this.viewer?this.viewer.render():""}
      </div>
    `,this.attachEventListeners(),this.loadSidebarData())}attachEventListeners(){var a,n,c,r,o,d,u,v,w,f;window.lucide&&!document.querySelector(".lucide-create-icons-called")&&(window.lucide.createIcons(),document.body.classList.add("lucide-create-icons-called"));const e=document.getElementById("app");if(!e)return;(a=e.querySelector("#logout-btn"))==null||a.addEventListener("click",()=>this.handleLogout()),(n=e.querySelector("#settings-btn"))==null||n.addEventListener("click",()=>this.showSettings()),(c=e.querySelector("#leaderboard-btn"))==null||c.addEventListener("click",()=>this.showLeaderboard()),(r=e.querySelector("#grid-size-btn"))==null||r.addEventListener("click",()=>this.toggleGridSize()),(o=e.querySelector("#sidebar-upload-btn"))==null||o.addEventListener("click",()=>{var l;return(l=document.querySelector("#file-input"))==null?void 0:l.click()}),(d=e.querySelector("#users-btn"))==null||d.addEventListener("click",()=>this.showUserManagement()),(u=e.querySelector("#tags-btn"))==null||u.addEventListener("click",()=>this.showTags()),(v=e.querySelector("#site-settings-btn"))==null||v.addEventListener("click",()=>this.showSiteSettings()),(w=e.querySelector("#export-btn"))==null||w.addEventListener("click",()=>this.exportZip());const t=e.querySelector(".search-input");t==null||t.addEventListener("input",l=>{this.searchQuery=l.target.value,this.filterSites(),this.updateGrid()}),e.querySelectorAll(".delete-btn").forEach(l=>l.addEventListener("click",m=>{var b;m.stopPropagation(),((b=this.session)==null?void 0:b.role)==="admin"&&this.handleDelete(l.dataset.id)})),e.querySelectorAll(".rename-btn").forEach(l=>l.addEventListener("click",m=>{m.stopPropagation(),this.handleRename(l.dataset.id,l.dataset.name)})),e.querySelectorAll(".icon-btn").forEach(l=>l.addEventListener("click",m=>{m.stopPropagation(),this.showIconPicker(l.dataset.id)})),e.querySelectorAll(".view-btn").forEach(l=>{l.addEventListener("click",m=>{m.stopPropagation(),this.handleView(l.dataset.id)})}),e.querySelectorAll(".site-card").forEach(l=>{l.addEventListener("click",m=>{m.target.closest(".card-actions")||this.handleView(l.dataset.id)})});const i=e.querySelector("#file-input");i==null||i.addEventListener("change",async l=>{const m=l.target.files;m!=null&&m.length&&(await this.handleUploadMultiple(Array.from(m)),i.value="")});const s=e.querySelector(".uploader");s==null||s.addEventListener("dragover",l=>{l.preventDefault(),s.classList.add("drag-over")}),s==null||s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s==null||s.addEventListener("drop",async l=>{var b;l.preventDefault(),s.classList.remove("drag-over");const m=(b=l.dataTransfer)==null?void 0:b.files;m!=null&&m.length&&await this.handleUploadMultiple(Array.from(m))}),(f=e.querySelector("#back-btn"))==null||f.addEventListener("click",()=>{this.viewer=null,this.render()}),document.addEventListener("keydown",l=>{var m;l.target instanceof HTMLInputElement||(l.key==="/"&&(l.preventDefault(),t==null||t.focus()),(l.key==="n"||l.key==="N")&&(l.preventDefault(),(m=document.querySelector("#file-input"))==null||m.click()))})}async loadSidebarData(){try{const t=await this.apiRequest(`${g}/stats`);document.getElementById("stat-logins").textContent=String(t.totalLogins),document.getElementById("stat-users").textContent=String(t.totalUsers),document.getElementById("stat-sites").textContent=String(t.totalSites)}catch{}const e=document.getElementById("sidebar-leaderboard");if(e)try{const t=await this.apiRequest(`${g}/leaderboard?limit=5`);if(e.textContent="",t.length)t.forEach((i,s)=>{const a=document.createElement("div");a.className=`sidebar-item ${s===0?"gold":s===1?"silver":s===2?"bronze":""}`;const n=document.createElement("span");n.className="sidebar-rank",n.textContent=String(s+1);const c=document.createElement("span");c.className="sidebar-name",c.textContent=i.username;const r=document.createElement("span");r.className="sidebar-visits",r.textContent=String(i.visits),a.append(n,c,r),e.appendChild(a)});else{const i=document.createElement("div");i.className="empty",i.textContent="No visits",e.appendChild(i)}}catch{e.textContent="";const t=document.createElement("div");t.className="empty",t.textContent="Failed",e.appendChild(t)}}updateGrid(){var t;const e=document.querySelector(".grid-section");e&&(e.innerHTML=S.render(this.filteredSites,((t=this.session)==null?void 0:t.role)==="admin",this.tags),this.attachEventListeners())}async handleUploadMultiple(e){if(!this.session||e.length===0)return;let t=0,i=0;for(const s of e)try{const a=await s.text();await this.apiRequest(`${g}/sites`,{method:"POST",body:JSON.stringify({name:s.name.replace(/\.(html?)$/i,""),content:a})}),t++}catch{i++}await this.loadSites(),this.render(),i>0?alert(`${t} uploaded, ${i} failed`):t>1&&alert(`${t} files uploaded`)}async handleDelete(e){if(confirm("Delete?"))try{await this.apiRequest(`${g}/sites/${e}`,{method:"DELETE"}),this.sites=this.sites.filter(t=>t.id!==e),this.filterSites(),this.render()}catch(t){console.error(t)}}async handleRename(e,t){const i=prompt("Neuer Name:",t);if(!(!i||i===t))try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({name:i})}),await this.loadSites(),this.render()}catch(s){console.error(s),alert("Rename failed")}}async showIconPicker(e){var r;const t=this.sites.find(o=>o.id===e);if(!t)return;const i=document.createElement("div");i.className="settings-overlay",i.innerHTML=`
      <div class="settings-popup icon-picker-popup">
        <h3>Icon waehlen</h3>
        <input type="text" id="icon-search" placeholder="Icon suchen..." class="search-input" style="margin-bottom:1rem;">
        <div class="icon-grid" id="icon-grid"><div class="loading">Loading...</div></div>
        <button class="settings-close" id="settings-close">Close</button>
      </div>
    `,document.body.appendChild(i);let s=[];try{const u=(await(await fetch("https://cdn.jsdelivr.net/npm/lucide@latest/dist/esm/lucide.js")).text()).matchAll(/export \{ default as ([A-Z][a-zA-Z]+)/g);for(const v of u){const f=v[1].replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");s.push(f)}}catch{s=["globe","file","image","code","link","star","heart"]}const a=document.getElementById("icon-grid"),n=document.getElementById("icon-search"),c=o=>{var u;const d=o?s.filter(v=>v.toLowerCase().includes(o.toLowerCase())):s.slice(0,200);a.innerHTML=d.slice(0,80).map(v=>`<button class="icon-option ${t.icon===v?"selected":""}" data-icon="${v}" title="${v}">
          <i data-lucide="${v}"></i>
        </button>`).join(""),(u=window.lucide)==null||u.createIcons()};c(""),a.addEventListener("click",async o=>{const d=o.target.closest(".icon-option");if(!d)return;const u=d.dataset.icon;try{await this.apiRequest(`${g}/sites/${e}`,{method:"PUT",body:JSON.stringify({icon:u})}),await this.loadSites(),this.render(),i.remove()}catch{alert("Icon update failed")}}),n.addEventListener("input",()=>c(n.value)),(r=document.getElementById("settings-close"))==null||r.addEventListener("click",()=>i.remove()),i.addEventListener("click",o=>{o.target===i&&i.remove()})}async handleView(e){if(this.session)try{const t=await this.apiRequest(`${g}/sites/${e}`);this.viewer=new U(t,()=>{this.viewer=null,this.render()}),this.viewer.open()}catch(t){console.error(t)}}}async function N(){try{const e=await(await fetch("/assets/icons/sprite.svg")).text(),t=document.createElement("div");t.id="icon-sprite",t.style.cssText="position:absolute;width:0;height:0;overflow:hidden;",t.innerHTML=e,document.body.insertBefore(t,document.body.firstChild)}catch(p){console.warn("Could not load icon sprite:",p)}}C();N();document.addEventListener("DOMContentLoaded",()=>new q);
