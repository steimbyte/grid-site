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

## Checklist for New Components

- [ ] Use CSS variables for all colors
- [ ] Use Lucide icons via `<i data-lucide="icon">`
- [ ] Apply glassmorphism with `backdrop-filter`
- [ ] Add hover glow effect with `box-shadow: var(--glow)`
- [ ] Use Outfit/Space Grotesk fonts
- [ ] Support keyboard navigation
- [ ] Add loading states with themed spinner
- [ ] Use gradient separators between sections
