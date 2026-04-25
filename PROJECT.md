# Site Grid - Projekt-Dokumentation

## Overview

**Site Grid** is a premium web app for uploading, managing, and previewing HTML sites with anti-slop glassmorphism design, user authentication, and real-time statistics.

---

## Features

### Core Features
- [x] HTML file upload (Drag & Drop + File Picker)
- [x] **Bulk Upload** - Upload multiple files at once
- [x] Grid view with preview cards
- [x] Live preview in cards
- [x] **View tracking** per site
- [x] Glow Frame viewer (full-screen overlay)
- [x] Delete sites (Admin only)
- [x] Real-time search (full-text within content)
- [x] **Export all sites as TXT**
- [x] Persistent storage

### Authentication & Users
- [x] Username + Password authentication
- [x] User registration with bcrypt
- [x] JWT tokens
- [x] Admin role for user management
- [x] Promote/delete users (admin)

### Tags & Categories
- [x] Create/delete tags (admin)
- [x] Assign tags to sites
- [x] Tags displayed on cards

### Statistics & Leaderboard
- [x] Live leaderboard (Top 5)
- [x] Statistics card (Logins/Users/Sites)
- [x] View counter per card

### UI/UX Features
- [x] **Anti-Slop Glassmorphism Theme**
- [x] **Dark/Light Theme** (via accent color)
- [x] Cursor Glow Tracker (GPU)
- [x] Mouse Glow Effect on cards/forms
- [x] **Grid Size Toggle** (S/M/L)
- [x] **Keyboard Shortcuts** (/ search, N new)
- [x] Customizable accent colors
- [x] Color presets (6 colors)
- [x] Loading indicators
- [x] Performance optimized

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `N` | Open file picker |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TypeScript, Vanilla JS |
| Backend | Node.js, Express |
| Auth | bcryptjs, JWT |
| Storage | File-based JSON |
| Container | Docker, Alpine |

---

## API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Admin
```
GET    /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
```

### Tags
```
GET    /api/tags
POST   /api/tags
DELETE /api/tags/:id
```

### Sites
```
GET    /api/sites
GET    /api/sites/:id
POST   /api/sites
PUT    /api/sites/:id
PUT    /api/sites/:id/order
DELETE /api/sites/:id
```

### Other
```
GET /api/stats
GET /api/leaderboard
GET /api/export (TXT)
```

---

## Docker Setup

```yaml
services:
  site-grid:
    image: site-grid:latest
    ports:
      - "3000:3000"
    volumes:
      - ./sites:/sites
      - ./users:/users
```

---

## Installation

```bash
./build.sh   # Full rebuild & restart
```

---

## Default Login

| Username | Password |
|----------|----------|
| admin | admin |

---

Built with intention ✨
