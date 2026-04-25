export interface Settings {
  accentColor: string;
}

const DEFAULT_SETTINGS: Settings = {
  accentColor: '#c9a227'
};

export class Settings {
  static load(): Settings {
    const saved = localStorage.getItem('site-grid-settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
  }

  static save(settings: Settings): void {
    localStorage.setItem('site-grid-settings', JSON.stringify(settings));
    this.apply(settings);
  }

  static apply(settings: Settings): void {
    const hex = settings.accentColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Main accent
    document.documentElement.style.setProperty('--accent', settings.accentColor);
    
    // Glow color
    document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
    
    // Warm accent (shifted hue)
    const warmR = Math.min(255, r + 30);
    const warmG = Math.max(0, g - 50);
    const warmB = Math.max(0, b - 30);
    document.documentElement.style.setProperty('--accent-warm', `rgb(${warmR}, ${warmG}, ${warmB})`);
    
    // Sage accent
    const sageR = Math.max(0, r - 100);
    const sageG = Math.min(255, g + 40);
    const sageB = Math.min(255, b + 20);
    document.documentElement.style.setProperty('--accent-sage', `rgb(${sageR}, ${sageG}, ${sageB})`);

    // Background tint - subtle accent in atmosphere
    document.documentElement.style.setProperty('--bg-accent-tint', `rgba(${r}, ${g}, ${b}, 0.05)`);
    
    // Glass tint - colored glass
    document.documentElement.style.setProperty('--glass-tint', `rgba(${r}, ${g}, ${b}, 0.08)`);
    
    // Border glow
    document.documentElement.style.setProperty('--border-accent', `rgba(${r}, ${g}, ${b}, 0.3)`);
  }

  static render(settings: Settings): string {
    return `
      <div class="settings-popup">
        <h3>Settings</h3>
        
        <div class="settings-row">
          <label>Accent Color</label>
          <div class="color-picker-row">
            <input type="color" id="accent-color" value="${settings.accentColor}">
            <span>${settings.accentColor.toUpperCase()}</span>
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
    `;
  }

  static init(onSave: (s: Settings) => void): void {
    const popup = document.querySelector('.settings-popup') as HTMLElement;
    const closeBtn = document.getElementById('settings-close') as HTMLButtonElement;
    const colorInput = document.getElementById('accent-color') as HTMLInputElement;
    const overlay = document.querySelector('.settings-overlay') as HTMLElement;
    const presets = document.querySelectorAll('.preset');

    closeBtn?.addEventListener('click', () => overlay?.remove());
    
    colorInput?.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const span = popup?.querySelector('.color-picker-row span');
      if (span) span.textContent = val.toUpperCase();
      onSave({ accentColor: val });
    });

    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        const color = (btn as HTMLElement).dataset.color!;
        if (colorInput) colorInput.value = color;
        const span = popup?.querySelector('.color-picker-row span');
        if (span) span.textContent = color.toUpperCase();
        onSave({ accentColor: color });
      });
    });
  }
}
