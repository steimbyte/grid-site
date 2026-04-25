export interface Settings {
  accentColor: string;
  gridSize?: 'small' | 'normal' | 'large';
}

const DEFAULT_SETTINGS: Settings = {
  accentColor: '#c9a227',
  gridSize: 'normal'
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

    document.documentElement.style.setProperty('--accent', settings.accentColor);
    document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
    document.documentElement.style.setProperty('--glow-warm', `rgba(${r}, ${g}, ${b}, 0.5)`);

    const warmR = Math.max(0, r - 20), warmG = Math.max(0, g - 30), warmB = Math.max(0, b - 30);
    document.documentElement.style.setProperty('--accent-warm', `rgb(${warmR}, ${warmG}, ${warmB})`);

    const sageR = Math.max(0, r - 80), sageG = Math.min(255, g + 30), sageB = Math.min(255, b + 30);
    document.documentElement.style.setProperty('--accent-sage', `rgb(${sageR}, ${sageG}, ${sageB})`);

    document.documentElement.style.setProperty('--bg-accent-tint', `rgba(${r}, ${g}, ${b}, 0.06)`);
    document.documentElement.style.setProperty('--glass-tint', `rgba(${r}, ${g}, ${b}, 0.12)`);
    document.documentElement.style.setProperty('--border-accent', `rgba(${r}, ${g}, ${b}, 0.4)`);
    document.documentElement.style.setProperty('--cursor-glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
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
        
        <div class="settings-row">
          <label>Grid Size</label>
          <div class="grid-size-options">
            <button class="grid-option ${settings.gridSize === 'small' ? 'active' : ''}" data-size="small">S</button>
            <button class="grid-option ${settings.gridSize === 'normal' ? 'active' : ''}" data-size="normal">M</button>
            <button class="grid-option ${settings.gridSize === 'large' ? 'active' : ''}" data-size="large">L</button>
          </div>
        </div>
        
        <button class="settings-close" id="settings-close"><i data-lucide="x"></i> Close</button>
      </div>
    `;
  }

  static init(onSave: (s: Settings) => void): void {
    const popup = document.querySelector('.settings-popup') as HTMLElement;
    const closeBtn = document.getElementById('settings-close') as HTMLButtonElement;
    const colorInput = document.getElementById('accent-color') as HTMLInputElement;
    const overlay = document.querySelector('.settings-overlay') as HTMLElement;
    const presets = document.querySelectorAll('.preset');
    const gridOptions = document.querySelectorAll('.grid-option');

    closeBtn?.addEventListener('click', () => overlay?.remove());
    
    colorInput?.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const span = popup?.querySelector('.color-picker-row span');
      if (span) span.textContent = val.toUpperCase();
      const current = Settings.load();
      onSave({ ...current, accentColor: val });
    });

    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        const color = (btn as HTMLElement).dataset.color!;
        if (colorInput) colorInput.value = color;
        const span = popup?.querySelector('.color-picker-row span');
        if (span) span.textContent = color.toUpperCase();
        const current = Settings.load();
        onSave({ ...current, accentColor: color });
      });
    });

    gridOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        const size = (btn as HTMLElement).dataset.size as 'small' | 'normal' | 'large';
        const current = Settings.load();
        onSave({ ...current, gridSize: size });
        gridOptions.forEach(o => o.classList.remove('active'));
        btn.classList.add('active');
        document.body.className = `grid-${size}`;
      });
    });
  }
}
