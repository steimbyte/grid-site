/**
 * Undertones WebGL Shader
 * Animated ChromaFlow, FlutedGlass, Swirl, FilmGrain effects
 * Based on shaders.com "Undertones" collection - Yellow/Green variant
 */

export class UndertonesShader {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private startTime: number;
  private animationId: number = 0;
  private mouseX = 0.5;
  private mouseY = 0.5;
  private isRunning = false;

  // Yellow/Green variant colors
  private readonly colors = {
    lime1: [0.333, 1.0, 0.0],      // #55ff00
    lime2: [0.949, 1.0, 0.0],      // #f2ff00
    lime3: [0.067, 1.0, 0.0],      // #11ff00
    lime4: [0.824, 1.0, 0.38],     // #d2ff61
    orange1: [1.0, 0.42, 0.0],     // #ff6b00
    orange2: [1.0, 0.6, 0.0],      // #ff9900
  };

  constructor() {
    this.canvas = this.createCanvas();
    this.gl = this.canvas.getContext('webgl', { 
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    })!;
    this.program = this.createProgram();
    this.startTime = Date.now();
    this.setupGeometry();
    this.setupMouseEvents();
    this.resize();
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'undertones-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);
    return canvas;
  }

  private vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  private fragmentShaderSource = `
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
  `;

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      throw new Error('Shader compilation failed');
    }
    
    return shader;
  }

  private createProgram(): WebGLProgram {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
    
    const program = this.gl.createProgram()!;
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(program));
      throw new Error('Program linking failed');
    }
    
    return program;
  }

  private setupGeometry(): void {
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    
    const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private setupMouseEvents(): void {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX / window.innerWidth;
      this.mouseY = 1.0 - e.clientY / window.innerHeight;
    });
  }

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private setUniforms(): void {
    const time = (Date.now() - this.startTime) / 1000;
    
    this.gl.useProgram(this.program);
    
    // Time & resolution
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_time'), time);
    this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'u_resolution'), this.canvas.width, this.canvas.height);
    this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'u_mouse'), this.mouseX, this.mouseY);
    
    // Colors
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_lime1'), this.colors.lime1);
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_lime2'), this.colors.lime2);
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_lime3'), this.colors.lime3);
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_lime4'), this.colors.lime4);
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_orange1'), this.colors.orange1);
    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'u_orange2'), this.colors.orange2);
    
    // Swirl
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_swirlRadius'), 0.5);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_swirlAngle'), 2.0);
    
    // Fluted glass
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_flutedFreq'), 8.0);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_flutedAngle'), -0.785);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_flutedRefraction'), 4.0);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_aberration'), 0.61);
    
    // Film grain
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_grainStrength'), 0.05);
  }

  private render = (): void => {
    if (!this.isRunning) return;
    
    this.setUniforms();
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    
    this.animationId = requestAnimationFrame(this.render);
  };

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    
    window.addEventListener('resize', this.resize);
    this.resize();
    this.render();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
  }

  public destroy(): void {
    this.stop();
    this.canvas.remove();
    this.gl.deleteProgram(this.program);
  }
}

// Singleton instance
let shaderInstance: UndertonesShader | null = null;

export function initUndertonesShader(): UndertonesShader {
  if (shaderInstance) {
    shaderInstance.destroy();
  }
  shaderInstance = new UndertonesShader();
  shaderInstance.start();
  return shaderInstance;
}

export function destroyUndertonesShader(): void {
  if (shaderInstance) {
    shaderInstance.destroy();
    shaderInstance = null;
  }
}
