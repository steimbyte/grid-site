# Site Grid - Projekt-Dokumentation

## Overview

**Site Grid** is a premium web app for uploading, managing, and previewing HTML sites. Features anti-slop glassmorphism design with atmospheric effects and customizable accent colors.

---

## Design Philosophy: Anti-Slop

From Anthropic's design principles:
- **No generic AI aesthetics** - avoiding purple gradients and Inter font
- **Distinctive typography** - Outfit, Space Grotesk fonts
- **Atmospheric backgrounds** - noise texture, radial gradients, floating orbs
- **Bold accent colors** - Gold, Copper, Sage, Crimson, Steel, Amethyst
- **Quality over quantity** - one well-orchestrated page load
- **Mouse-interactive elements** - glow trackers, hover effects

---

## Design System

### Color Palette

```css
/* Base Colors */
--bg-deep: #0c0c14;           /* Deep space black */
--bg-surface: #13131f;         /* Elevated surface */
--bg-elevated: #1a1a2a;         /* Cards */
--glass: rgba(20, 20, 35, 0.7);  /* Glass effect */
--glass-light: rgba(30, 30, 50, 0.5);
--glass-tint: rgba(201, 162, 39, 0.08);

/* Text Colors */
--text-bright: #f0f0f5;        /* Primary text */
--text-muted: #8888a0;          /* Secondary text */
--text-dim: #555566;            /* Tertiary text */

/* Accent Colors (Default: Gold) */
--accent: #c9a227;              /* Gold - main accent */
--accent-warm: #e07020;         /* Copper - warm variant */
--accent-sage: #5a8a6a;         /* Sage - cool variant */
--glow: rgba(201, 162, 39, 0.4);

/* Borders */
--border: rgba(255, 255, 255, 0.06);
--border-accent: rgba(201, 162, 39, 0.3);
--border-bright: rgba(255, 255, 255, 0.12);
```

### Typography

- **Font Stack**: `'Outfit', 'Space Grotesk', system-ui, sans-serif`
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale**: 0.75rem - 3rem
- **Letter-spacing**: -0.02em to 0.5px

### Spacing & Sizing

- **Border Radius**: 8px (small), 12px (medium), 16px (large), 32px (xl)
- **Padding**: 8px, 12px, 18px, 24px, 48px
- **Shadows**: Multiple layers for depth

---

## Features

### Core Features
- [x] HTML file upload (Drag & Drop + File Picker)
- [x] Grid view with preview cards
- [x] Live preview in cards
- [x] Glow Frame viewer with pulsing corner glows
- [x] Open in new tab
- [x] Delete sites (Admin only)
- [x] Real-time search
- [x] Persistent storage (`/sites` Volume)

### Authentication
- [x] Password-based auth
- [x] Guest user (can upload, cannot delete)
- [x] Admin user (full access)
- [x] Session tokens
- [x] Role-based access control

### UI/UX Features
- [x] **Anti-Slop Glassmorphism Theme**
- [x] Cursor Glow Tracker (global)
- [x] Mouse Glow Effect (on cards/forms)
- [x] Atmospheric background with noise texture
- [x] Animated background orbs
- [x] Customizable accent colors
- [x] Color presets (Gold, Copper, Sage, Crimson, Steel, Amethyst)
- [x] Responsive design
- [x] Settings popup

---

## Components

### 1. Login Screen

**Layout**: Centered glassmorphism card on atmospheric background

**Elements**:
- 2 floating background orbs (gradient, blur)
- Centered card with 32px border-radius
- Logo (4x4 grid icon)
- Title: "Welcome to Grid-View"
- Password input (no label, placeholder text)
- Sign In button (accent color)
- Mouse-following glow effect on card

**Styling**:
- Card: `backdrop-filter: blur(30px)`, `background: rgba(255,255,255,0.07)`
- Card hover: gradient border glow
- Input: 52px height, 16px border-radius, focus glow
- Button: 54px height, gradient hover effect
- Error: Fixed bottom toast, rounded pill

**Animations**:
- `emerge`: translateY(40px) → 0, scale(0.92) → 1, 0.8s cubic-bezier
- `shake`: Input validation error
- Button hover: translateY(-3px) + shadow
- Card glow: Radial gradient following mouse

### 2. Header

- Glass bar with logo (4x4 grid icon)
- Role badge (Guest/Admin)
- Settings button (gear icon)
- Logout button (exit icon)

### 3. Search Bar

- Pill-shaped input, centered
- Glass background with focus glow
- Muted placeholder

### 4. Upload Zone

- Dashed border with hover glow
- Floating icon animation (4s infinite)
- Gradient upload button

### 5. Site Cards

- Glass card with hover lift
- Pulsing border glow on hover
- Action buttons on hover (view, delete)
- Delete only for admin

### 6. Viewer - Glow Frame

- Full-screen overlay
- Animated corner glows (50px)
- Back button (left)
- Site title (center)
- Open in new tab (right)

### 7. Settings Popup

- Overlay modal
- Color picker with 6 presets
- Live preview
- localStorage persistence

---

## Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Logo | drop-shadow pulse | 3s | ease-in-out |
| Background Orb | float | 20s | ease-in-out |
| Login Card | emerge | 0.8s | cubic-bezier(0.16, 1, 0.3, 1) |
| Card Glow | opacity | 0.3s | ease |
| Input Shake | translateX | 0.4s | ease |
| Button Hover | translateY, shadow | 0.3s | ease |
| Card Hover | translateY, scale | 0.4s | cubic-bezier(0.16, 1, 0.3, 1) |
| Corner Glow | cornerPulse | 2.5s | ease-in-out |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TypeScript, Vanilla JS |
| Backend | Node.js, Express |
| Styling | Custom CSS (Anti-Slop Glassmorphism) |
| Database | File-based JSON storage |
| Container | Docker, Alpine |

---

## API Endpoints

### Authentication

#### POST /api/auth/login
```json
// Request
{ "password": "guest" | "admin" }

// Response
{ "token": "uuid", "role": "guest" | "admin" }
```

### Sites

#### GET /api/sites
Returns sites without content.

#### GET /api/sites/:id
Returns site with full content.

#### POST /api/sites
Upload a new site.

#### DELETE /api/sites/:id
Delete site (Admin only).

---

## Docker Setup

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `GUEST_PASSWORD` | guest | Guest password |
| `ADMIN_PASSWORD` | admin | Admin password |
| `SITES_DIR` | /sites | Storage directory |

### Example
```yaml
services:
  site-grid:
    image: site-grid:latest
    ports:
      - "3000:3000"
    volumes:
      - ./sites:/sites
    environment:
      - GUEST_PASSWORD=myguest
      - ADMIN_PASSWORD=myadmin
```

---

## Installation

```bash
docker-compose up -d
# -> http://localhost:3000
```

---

## Usage

1. Open http://localhost:3000
2. Enter password: `guest` or `admin`
3. Drag & drop HTML files
4. Click cards to preview
5. Use settings to change accent color

---

## Todo

- [ ] Puppeteer thumbnail generation
- [ ] Bulk upload
- [ ] Site tags/categories
- [ ] Share functionality
- [ ] Export as ZIP
- [ ] Remember login session

---

Built with intention ✨
