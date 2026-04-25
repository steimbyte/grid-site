# Site Grid

**Premium HTML Site Manager** mit Anti-Slop Glassmorphism Design, Benutzer-Authentifizierung und Echtzeit-Statistiken.

![Site Grid Preview](https://img.shields.io/badge/Status-Production-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Features

### Core
- 📁 **HTML Upload** - Drag & Drop oder Datei-Auswahl
- 🔍 **Volltextsuche** - Durchsucht Site-Namen und Inhalte
- 🏷️ **Tags/Categories** - Sites mit Tags organisieren
- 📦 **Export** - Alle Sites als TXT exportieren
- 📊 **Statistiken** - Live-Statistiken und Leaderboard

### Benutzer-Verwaltung
- 🔐 **JWT Auth** - Sichere Authentifizierung mit bcrypt
- 👥 **User Roles** - Admin und User Rollen
- 📈 **View Tracking** - Klicks pro Site werden gezählt
- 🏆 **Leaderboard** - Top 5 Benutzer nach Logins

### UI/UX
- 🎨 **Anti-Slop Design** - Glassmorphism mit Outfit/Space Grotesk Fonts
- 🖱️ **Cursor Glow** - GPU-beschleunigter Glow-Effekt
- 🎯 **Accent Colors** - 6 Preset-Farben + Color Picker
- 📱 **Responsive** - Optimiert für Desktop und Mobile
- ⌨️ **Keyboard Shortcuts** - `/` für Suche, `N` für Upload

### Admin Features
- 👑 **User Management** - Promote/Delete Benutzer
- 🏷️ **Tag Management** - Tags erstellen und löschen
- ✏️ **Site Umbenennen** - Icon-Picker pro Site
- 🗑️ **Site Löschen** - Sites entfernen

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TypeScript, Vanilla JS, Vite |
| Backend | Node.js, Express |
| Auth | bcryptjs, JWT |
| Storage | File-based JSON |
| Container | Docker, Alpine |

---

## Quick Start

### 1. Klonen
```bash
git clone https://github.com/steimbyte/grid-site.git
cd grid-site
```

### 2. Bauen & Starten
```bash
# Mit Docker Compose
docker compose up -d

# Oder manuell
npm install
npm run build
docker build -t site-grid .
docker run -d -p 3000:3000 \
  -v ./sites:/sites \
  -v ./users:/users \
  site-grid
```

### 3. Anmelden
```
URL: http://localhost:3000
Username: admin
Password: admin (oder ADMIN_PASSWORD env variable)
```

---

## Docker Compose

```yaml
services:
  site-grid:
    image: site-grid:latest
    container_name: site-grid
    ports:
      - "3000:3000"
    volumes:
      - ./sites:/sites
      - ./users:/users
    environment:
      - ADMIN_PASSWORD=dein_geheimes_passwort
      - FRONTEND_URL=https://deine-domain.com  # Optional
    restart: unless-stopped
```

### Environment Variables

| Variable | Default | Description |
|----------|--------|-------------|
| `ADMIN_PASSWORD` | `admin` | Admin Passwort |
| `FRONTEND_URL` | - | Externe URL für API-Routing |
| `JWT_SECRET` | Random | Secret für JWT Tokens |
| `PORT` | `3000` | Server Port |

---

## API Endpoints

### Auth
```
POST /api/auth/register    - Neuen Benutzer registrieren
POST /api/auth/login       - Anmelden
POST /api/auth/logout      - Abmelden
GET  /api/auth/me          - Aktuellen Benutzer
```

### Admin (Admin only)
```
GET    /api/admin/users     - Alle Benutzer
PUT    /api/admin/users/:id - Benutzer aktualisieren
DELETE /api/admin/users/:id - Benutzer löschen
```

### Tags (Admin only)
```
GET    /api/tags           - Alle Tags
POST   /api/tags            - Tag erstellen
DELETE /api/tags/:id        - Tag löschen
```

### Sites
```
GET    /api/sites          - Alle Sites (mit Tags)
GET    /api/sites/:id       - Einzelne Site
POST   /api/sites           - Site hochladen
PUT    /api/sites/:id       - Site aktualisieren (Name, Icon, Tags)
DELETE /api/sites/:id       - Site löschen (Admin)
```

### Oeffentlich (kein Auth)
```
GET /api/config        - Oeffentliche Konfiguration
GET /api/health        - Server Status
POST /api/auth/register - Registrierung
POST /api/auth/login    - Anmeldung
```

### Privat (Auth erforderlich)
```
GET    /api/stats        - Statistiken
GET    /api/leaderboard   - Top Benutzer
GET    /api/sites         - Alle Sites
GET    /api/sites/:id     - Einzelne Site
POST   /api/sites          - Site hochladen
PUT    /api/sites/:id      - Site aktualisieren
DELETE /api/sites/:id     - Site loeschen (Admin)
GET    /api/export        - Alle Sites als TXT
```

### Admin nur
```
GET    /api/admin/users    - Alle Benutzer
PUT    /api/admin/users/:id - Benutzer aktualisieren
DELETE /api/admin/users/:id - Benutzer loeschen
POST   /api/tags            - Tag erstellen
DELETE /api/tags/:id        - Tag loeschen
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Suchfeld fokussieren |
| `N` | Datei-Auswahl öffnen |

---

## Design System

### Farben
```css
--accent: #c9a227;        /* Gold (Standard) */
--accent: #e07020;        /* Copper */
--accent: #5a8a6a;        /* Sage */
--accent: #c04040;        /* Crimson */
--accent: #4080c0;        /* Steel */
--accent: #8060c0;        /* Amethyst */
```

### Icons
- **Lucide Icons** via CDN
- Alle Icons dynamisch ladbar
- Icon-Picker im Admin-Panel

### Fonts
- **Headings**: Outfit (Google Fonts)
- **Body**: Space Grotesk (Google Fonts)

---

## Projekt-Struktur

```
site-grid/
├── src/
│   ├── components/       # UI Komponenten
│   │   ├── FileUploader.ts
│   │   ├── Header.ts
│   │   ├── LoginScreen.ts
│   │   ├── SearchBar.ts
│   │   ├── Settings.ts
│   │   ├── SiteGrid.ts
│   │   └── SiteViewer.ts
│   ├── main.ts           # App Entry
│   └── style.css         # Styles
├── server/
│   ├── server.js         # Express Backend
│   └── public/           # Statische Files
├── docker-compose.yml
├── Dockerfile
└── design-ethos.md       # Design Dokumentation
```

---

## Development

### Lokal Entwickeln
```bash
# Frontend Development (mit Vite HMR)
npm run dev

# Server Development
cd server
npm run dev

# Build
npm run build
```

### Docker Production
```bash
./build.sh   # Vollständiger Rebuild
```

---

## Volumes

| Path | Description |
|------|-------------|
| `/sites` | Hochgeladene HTML Sites |
| `/users` | Benutzerdaten (users.json, stats.json, tags.json) |

---

## Security

- ✅ bcrypt Passwort-Hashing (12 Runden)
- ✅ JWT Token (7 Tage gültig)
- ✅ Admin-only Endpoints geschützt
- ✅ CORS konfiguriert
- ❌ Keine Datenbank (Filesystem-basiert)

---

## Troubleshooting

### Keine Login-Möglichkeit
```bash
# Users-Datei löschen (erstellt neuen Admin)
rm -f ./users/users.json
docker compose restart
```

### Ports belegt
```bash
# Port ändern in docker-compose.yml
ports:
  - "3001:3000"
```

### Logs ansehen
```bash
docker logs site-grid
```

---

## Lizenz

MIT License - frei verfügbar und anpassbar.

---

**Built with intention ✨**
