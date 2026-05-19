# Site Grid - Design Ethos

## Overview

Site Grid is a premium HTML site manager with **anti-slop glassmorphism** design. It prioritizes atmospheric depth, intentional typography, and bold accent colors over generic tech aesthetics.

---

## Design Philosophy

### Anti-Slop Principles
- **No generic gradients** - Use subtle radial gradients with purpose
- **Outfit + Space Grotesk** fonts - Humanist sans-serif hierarchy
- **Atmospheric backgrounds** - Noise textures + floating orbs
- **Bold accent colors** - Gold, Copper, Sage as primary palette
- **GPU-accelerated effects** - translate3d, contain, will-change

---

## Color System

### Primary Accent Palette

```css
/* Gold - Default */
--accent: #c9a227;
--glow: rgba(201, 162, 39, 0.4);

/* Copper */
--accent: #e07020;
--glow: rgba(224, 112, 32, 0.4);

/* Sage */
--accent: #5a8a6a;
--glow: rgba(90, 138, 106, 0.4);

/* Crimson */
--accent: #c04040;
--glow: rgba(192, 64, 64, 0.4);

/* Steel */
--accent: #4080c0;
--glow: rgba(64, 128, 192, 0.4);

/* Amethyst */
--accent: #8060c0;
--glow: rgba(128, 96, 192, 0.4);
```

### CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-deep: #0a0a0f;
  --bg-surface: #12121a;
  --bg-elevated: #1a1a24;
  
  /* Glass */
  --glass: rgba(255, 255, 255, 0.05);
  --glass-light: rgba(255, 255, 255, 0.08);
  --glass-tint: rgba(201, 162, 39, 0.12);
  
  /* Borders */
  --border: rgba(255, 255, 255, 0.1);
  --border-accent: rgba(201, 162, 39, 0.4);
  
  /* Text */
  --text-bright: #ffffff;
  --text-primary: #e8e8f0;
  --text-muted: rgba(255, 255, 255, 0.5);
  
  /* Accent derived */
  --accent-warm: rgb(r - 20, g - 30, b - 30);
  --accent-sage: rgb(r - 80, g + 30, b + 30);
  --bg-accent-tint: rgba(r, g, b, 0.06);
  --cursor-glow: rgba(r, g, b, 0.4);
}
```

---

## Typography

### Font Stack

```css
/* Headings - Outfit */
font-family: 'Outfit', system-ui, sans-serif;
font-weight: 600;

/* Body - Space Grotesk */
font-family: 'Space Grotesk', system-ui, sans-serif;
font-weight: 400;
```

### Scale

| Element | Size | Weight |
|---------|------|--------|
| H1 | 1.75rem | 600 |
| H2 | 1.25rem | 600 |
| H3 | 1rem | 600 |
| Body | 0.875rem | 400 |
| Small | 0.75rem | 400 |
| Micro | 0.65rem | 600 |

---

## Glassmorphism

### Card Style

```css
.card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  background: var(--glass-light);
  border-color: var(--border-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px var(--glow);
}
```

### Popup/Overlay Style

```css
.popup {
  background: var(--bg-surface);
  border: 1px solid var(--border-accent);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}
```

---

## Quiz Components

### Quiz Card

```css
.quiz-card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all var(--transition-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.quiz-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--accent), transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none; /* Wichtig! */
}

.quiz-card:hover {
  background: var(--glass-light);
  border-color: var(--border-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px var(--glow);
}
```

### Badge Styles

```css
.badge {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: var(--glass-tint);
  color: var(--accent);
  border: 1px solid var(--border-accent);
}

/* Kategorie-Badges */
.badge.true-false {
  background: rgba(90, 138, 106, 0.15);
  color: #5a8a6a;
  border-color: rgba(90, 138, 106, 0.4);
}

.badge.multiple-choice {
  background: rgba(128, 96, 192, 0.15);
  color: #8060c0;
  border-color: rgba(128, 96, 192, 0.4);
}
```

### Quiz Option Buttons

```css
.option-btn {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--glass);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast) var(--ease-out);
}

.option-btn:hover:not(:disabled) {
  background: var(--glass-light);
  border-color: var(--border-accent);
}

.option-btn.selected {
  background: var(--glass-tint);
  border-color: var(--accent);
  color: var(--accent);
}

.option-btn.correct {
  background: rgba(90, 138, 106, 0.2);
  border-color: #5a8a6a;
  color: #5a8a6a;
}

.option-btn.incorrect {
  background: rgba(192, 64, 64, 0.2);
  border-color: #c04040;
  color: #c04040;
}

.option-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--glass-light);
  margin-right: 0.75rem;
  font-weight: 600;
  font-size: 0.75rem;
}
```

### True/False Buttons

```css
.true-false-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.tf-btn {
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--glass);
  cursor: pointer;
  transition: all var(--transition-fast) var(--ease-out);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tf-btn:hover:not(:disabled) {
  background: var(--glass-light);
  border-color: var(--border-accent);
}

.tf-btn.selected-true {
  background: rgba(90, 138, 106, 0.2);
  border-color: #5a8a6a;
  color: #5a8a6a;
}

.tf-btn.selected-false {
  background: rgba(192, 64, 64, 0.2);
  border-color: #c04040;
  color: #c04040;
}
```

### Check Answer Button

```css
.check-answer-btn {
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-md);
  background: var(--glass-tint);
  color: var(--accent);
  cursor: pointer;
  transition: all var(--transition-fast) var(--ease-out);
}

.check-answer-btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--bg-deep);
}

.check-answer-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
```

### Feedback Messages

```css
.feedback {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  display: none;
}

.feedback.show {
  display: block;
}

.feedback.correct {
  background: rgba(90, 138, 106, 0.1);
  border: 1px solid rgba(90, 138, 106, 0.3);
  color: #5a8a6a;
}

.feedback.incorrect {
  background: rgba(192, 64, 64, 0.1);
  border: 1px solid rgba(192, 64, 64, 0.3);
  color: #c04040;
}
```

### Progress Bar

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bg-surface);
  z-index: 1000;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width var(--transition-normal) var(--ease-out);
  box-shadow: 0 0 10px var(--glow);
}
```

### Score Display

```css
.score-display {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: var(--glass);
  border: 1px solid var(--border-accent);
  border-radius: 9999px;
  color: var(--accent);
  backdrop-filter: blur(10px);
  z-index: 1000;
}
```

### Stats Row

```css
.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Layout

### Responsive Borders

```css
/* Smart vw-based borders */
border-left: max(30px, 5vw);
padding-left: max(40px, 7vw);

/* Clamp for text */
font-size: clamp(0.75rem, 1.5vw, 0.875rem);

/* Aspect-ratio media queries */
@media (aspect-ratio > 1) {
  /* Landscape: wider layout */
}
```

### Grid System

```css
/* Quiz Grid */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

/* Small cards */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* Normal cards */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* Large cards */
grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
```

### Sidebar Layout

```css
.main-content {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
}

@media (max-width: 1024px) {
  grid-template-columns: 1fr;
}
```

---

## Icons

### Library
- **Lucide** (https://lucide.dev/icons)
- Loaded via CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`

### Usage

```html
<i data-lucide="icon-name"></i>
```

### Common Icons

| Element | Icon |
|---------|------|
| Logo | `layout-grid` |
| Search | `search` |
| Upload | `upload-cloud` |
| Settings | `settings` |
| Logout | `log-out` |
| Users | `users` |
| Tags | `tag` |
| Export | `download` |
| Leaderboard | `bar-chart-3` |
| Trophy | `trophy` |
| View | `eye` |
| Delete | `trash-2` |
| Close | `x` |
| Back | `arrow-left` |
| Plus | `plus` |
| File | `file` |
| Check | `check` |
| Check Circle | `check-circle` |
| X | `x` |
| List Checks | `list-checks` |
| Zap | `zap` |
| Cable | `cable` |

### Icon Styling

```css
[data-lucide] {
  width: 1em;
  height: 1em;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* Size variants */
.logo [data-lucide] { width: 28px; height: 28px; }
.icon-btn [data-lucide] { width: 18px; height: 18px; }
.action-btn [data-lucide] { width: 18px; height: 18px; }
.tf-btn [data-lucide] { width: 24px; height: 24px; }
```

---

## Effects

### Cursor Glow Tracker

```css
.cursor-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--cursor-glow), transparent 70%);
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  contain: layout paint;
  will-change: transform;
  opacity: 0.6;
  mix-blend-mode: screen;
  z-index: 9999;
}
```

### JavaScript
```javascript
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
```

### Loading Spinner

```css
.loader-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border-accent);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 20px var(--glow);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Card Hover Glow

```css
.card:hover {
  box-shadow: 0 0 30px var(--glow);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--accent), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 0.1;
}
```

---

## Spacing

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.25rem | Tight gaps |
| `--space-sm` | 0.5rem | Small padding |
| `--space-md` | 1rem | Standard padding |
| `--space-lg` | 1.5rem | Section gaps |
| `--space-xl` | 2rem | Major sections |

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

---

## Login Card

### Positioning

```css
.login-form-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, 90vw);
  margin-top: 10vh;
  margin-bottom: 10vh;
}
```

### Mouse Glow Effect

```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, var(--glow) 0%, transparent 50%)`;
});
```

---

## Viewer Overlay

### Dimensions

```css
.viewer-overlay {
  inset: 30px; /* 30px from all edges */
  z-index: 1000;
}

.viewer-frame {
  aspect-ratio: 16/10;
}
```

### Background Fix (White Flash)

```javascript
// Set themed background before content loads
iframe.srcdoc = `<html><body style="background:${bgColor};...">...</body></html>`;

// Apply theme to iframe content on load
iframe.onload = () => {
  const doc = iframe.contentDocument;
  doc.documentElement.style.backgroundColor = '#0a0a0f';
  doc.body.style.backgroundColor = '#0a0a0f';
};
```

---

## Separators

### Gradient Line

```css
.separator {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-accent), transparent);
  margin: 2rem 0;
}
```

---

## Transitions

### Timing

```css
--transition-fast: 150ms;
--transition-normal: 300ms;
--transition-slow: 500ms;

/* Easing */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Usage

```css
.element {
  transition: all var(--transition-normal) var(--ease-out);
}
```

---

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quiz JavaScript Structure

### Quiz Data Format

```javascript
const quizData = {
  easy: [
    {
      id: 'e1',
      type: 'true-false', // oder 'multiple-choice'
      question: 'Fragetext hier?',
      answer: true, // oder Index 0-3 bei multiple-choice
      explanation: 'Erklärung der richtigen Antwort.',
      options: ['A', 'B', 'C', 'D'] // nur bei multiple-choice
    }
  ],
  medium: [...],
  hard: [...]
};
```

### Quiz State

```javascript
let currentDifficulty = 'easy';
let score = { correct: 0, incorrect: 0, total: 0 };
let answeredQuestions = new Set();

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

### Answer Check Logic

```javascript
function checkAnswer(questionId, selectedAnswer, questionData) {
  const isCorrect = selectedAnswer === questionData.answer;
  const feedbackEl = document.getElementById(`feedback-${questionId}`);
  
  if (isCorrect) {
    score.correct++;
    feedbackEl.className = 'feedback show correct';
    feedbackEl.innerHTML = `<strong>✓ Richtig!</strong> ${questionData.explanation}`;
  } else {
    score.incorrect++;
    feedbackEl.className = 'feedback show incorrect';
    const correctText = questionData.type === 'true-false' 
      ? (questionData.answer ? 'Wahr' : 'Falsch')
      : `${['A', 'B', 'C', 'D'][questionData.answer]}: ${questionData.options[questionData.answer]}`;
    feedbackEl.innerHTML = `<strong>✗ Leider falsch.</strong> Richtige Antwort: ${correctText}. ${questionData.explanation}`;
  }
  
  score.total++;
  answeredQuestions.add(questionId);
  updateProgress();
}
```

---

## Checklist for New Components

### General
- [ ] Use CSS variables for all colors
- [ ] Use Lucide icons via `<i data-lucide="icon">`
- [ ] Apply glassmorphism with `backdrop-filter`
- [ ] Add hover glow effect with `box-shadow: var(--glow)`
- [ ] Use Outfit/Space Grotesk fonts
- [ ] Support keyboard navigation
- [ ] Add loading states with themed spinner
- [ ] Use gradient separators between sections
- [ ] Set `z-index: 1000` für fixed Elemente (progress-bar, score-display)

### Quiz Specific
- [ ] `::before` pseudo-elements benötigen `pointer-events: none`
- [ ] Antwort-Buttons nach Auswahl visuell markieren
- [ ] Check-Button erst nach Auswahl aktivieren (`disabled` Attribut)
- [ ] Feedback nach Antwortprüfung anzeigen
- [ ] Richtige/ falsche Antworten visuell hervorheben
- [ ] Fortschrittsbalken bei Beantwortung aktualisieren
- [ ] Score-Statistiken aktuell halten
- [ ] Fragen beim Tab-Wechsel shuffeln

### Mobile Responsive
- [ ] Quiz-Grid bei kleinen Bildschirmen einspaltig
- [ ] Fixed Score-Display ggf. static positionieren

---

# Netzwerk-Simulator Component

## Overview

The network simulator uses the glassmorphism design system with additional network-specific styling.

## Component Structure

```html
<!-- Toolbar -->
<div class="toolbar">
  <div class="toolbar-title"><i class="ph ph-network"></i> Netzwerk-Sim</div>
  <button class="tool-btn">Action</button>
</div>

<!-- Device Panel -->
<div class="device-panel">
  <div class="panel-section">
    <div class="panel-title">Category</div>
    <div class="device-grid">
      <div class="device-item copper">Device</div>
    </div>
  </div>
</div>

<!-- Canvas Area -->
<div class="canvas-area">
  <div class="canvas-inner">
    <svg class="conn-svg"></svg>
    <div class="sim-node network">Node</div>
  </div>
</div>

<!-- Properties Panel -->
<div class="props-panel">
  <div class="panel-tabs">
    <div class="panel-tab active">Tab</div>
  </div>
</div>
```

## Node Types

### Color Coding

| Type | Class | Color | Use Case |
|------|-------|-------|----------|
| Copper | `.copper` | #e07020 | Cat5e-Cat7 cables |
| Fiber | `.fiber` | #4080c0 | OM3-OM4, Singlemode |
| PoE | `.poe` | #5a8a6a | PoE devices |
| Network | `.network` | #8060c0 | Switches, Routers, Servers |

### Node Anatomy

```html
<div class="sim-node network selected">
  <div class="node-icon"><i class="ph ph-git-branch"></i></div>
  <div class="node-name">2960-24</div>
  <div class="node-ports">
    <div class="node-port connected" data-p="0"></div>
    <div class="node-port" data-p="1"></div>
    <div class="node-port uplink" data-p="24"></div>
  </div>
  <div class="node-info">
    <div class="node-info-row">
      <span>IP:</span>
      <span>192.168.1.10</span>
    </div>
  </div>
</div>
```

## Port Styling

### Port States

```css
/* Default */
.node-port {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 3px solid var(--border);
}

/* Hover - Connection available */
.node-port:hover {
  transform: scale(1.4);
  border-color: var(--accent);
  background: var(--accent);
}

/* Connected */
.node-port.connected {
  background: var(--ok);
  border-color: var(--ok);
}

/* Uplink */
.node-port.uplink {
  background: var(--device);
  border-color: var(--device);
}

/* Connecting (during drag) */
.node-port.connecting {
  animation: portPulse 0.5s infinite;
}
```

## Connection Lines

```css
/* SVG Line */
.conn-line {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  cursor: pointer;
}

.conn-line.copper { stroke: var(--copper); }
.conn-line.fiber { stroke: var(--fiber); }

.conn-line:hover {
  stroke-width: 6;
  filter: drop-shadow(0 0 8px currentColor);
}

/* Blocked (STP) */
.conn-line.blocked {
  stroke: var(--error);
  opacity: 0.4;
  stroke-dasharray: 8,4;
}
```

## Packet Animation

```css
.packet {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2000;
}

.packet.L3 {
  background: var(--layer3);
  box-shadow: 0 0 15px var(--layer3);
}

.packet.L4 {
  background: var(--layer4);
  box-shadow: 0 0 15px var(--layer4);
}

.packet.L7 {
  background: var(--layer7);
  box-shadow: 0 0 15px var(--layer7);
}
```

## CLI Terminal

```css
.cli-terminal {
  background: #000;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
}

.cli-prompt { color: var(--ok); }
.cli-cmd { color: var(--text-bright); }
.cli-out { color: var(--text-muted); }
.cli-err { color: var(--error); }
```

## Event Log

```css
.event-log {
  background: var(--bg-deep);
  border-radius: 6px;
  padding: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.6rem;
  max-height: 150px;
  overflow-y: auto;
}

.event-layer {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  font-weight: 700;
  color: var(--bg-deep);
}

/* Layer Colors */
.event-layer.L3 { background: var(--layer3); } /* 3 - Network */
.event-layer.L4 { background: var(--layer4); } /* 4 - Transport */
.event-layer.L7 { background: var(--layer7); } /* 7 - Application */
.event-layer.Config { background: var(--accent); }
.event-layer.STP { background: var(--ok); }
.event-layer.fail { background: var(--error); }
```

## Design Tokens for Simulator

```css
:root {
  /* Network Layer Colors */
  --layer1: #c04040; /* Physical */
  --layer2: #e07020; /* Data Link */
  --layer3: #c9a227; /* Network */
  --layer4: #5a8a6a; /* Transport */
  --layer7: #4080c0; /* Application */
  
  /* Device Colors */
  --copper: #e07020;
  --fiber: #4080c0;
  --poe: #5a8a6a;
  --device: #8060c0;
  
  /* Status */
  --error: #c04040;
  --warn: #e07020;
  --ok: #5a8a6a;
}
```

## Responsive Behavior

```css
/* Desktop - Full layout */
.app {
  grid-template-columns: 220px 1fr 340px;
  grid-template-rows: 48px 1fr 32px;
  height: 100vh;
}

/* Tablet - Collapsible panels */
@media (max-width: 1024px) {
  .app {
    grid-template-columns: 180px 1fr 280px;
  }
}

/* Mobile - Stack panels */
@media (max-width: 768px) {
  .app {
    grid-template-columns: 1fr;
    grid-template-rows: 48px auto 1fr auto 32px;
  }
  
  .device-panel,
  .props-panel {
    max-height: 200px;
  }
}
```

## Animation Guidelines

```css
/* Port Hover */
transition: all 0.15s;

/* Node Selection */
transition: box-shadow 0.2s, transform 0.1s;

/* Panel Tabs */
transition: all 0.15s;

/* Connection Preview */
animation: dash 0.3s linear infinite;

/* Port Pulse (connecting) */
@keyframes portPulse {
  0%, 100% { transform: scale(1.3); }
  50% { transform: scale(1.5); }
}
```

## Accessibility

```css
/* Focus States */
.tool-btn:focus,
.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.2);
}

/* Keyboard Navigation */
.sim-node:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
  }
}
```
