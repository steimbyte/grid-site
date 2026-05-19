# Site Grid - Agent Documentation

**Workspace Path:** `/home/steimer/workspace/site-grid`

## Stack

| Layer     | Technology                           | Version          |
| --------- | ------------------------------------ | ---------------- |
| Frontend  | TypeScript, Vanilla JS, Vite         | TS 5.3, Vite 5.0 |
| Backend   | Node.js, Express                     | ES Modules       |
| Auth      | bcryptjs, jsonwebtoken               | bcrypt 12 rounds |
| Icons     | Lucide (CDN)                         | latest           |
| Fonts     | Outfit, Space Grotesk (Google Fonts) | -                |
| Container | Docker, Alpine                       | -                |

## Structure

```
site-grid/
├── src/                      # Frontend (TypeScript)
│   ├── main.ts              # App entry, routing, state management
│   ├── style.css            # Anti-Slop Glassmorphism CSS
│   ├── components/          # UI components (class-based)
│   │   ├── Header.ts
│   │   ├── LoginScreen.ts
│   │   ├── SiteGrid.ts
│   │   ├── SiteViewer.ts
│   │   ├── FileUploader.ts
│   │   ├── SearchBar.ts
│   │   └── Settings.ts
│   └── types/
│       └── lucide.d.ts      # Lucide icon types
├── server/                   # Backend (Node.js)
│   ├── server.js            # Express API, all business logic
│   └── public/              # Built frontend assets
├── sites/                   # Volume: uploaded HTML sites + JSON metadata
│   └── thumbnails/          # Volume: preview images
├── users/                   # Volume: users.json, stats.json, tags.json, settings.json
├── index.html               # Entry HTML
├── vite.config.ts           # Vite build config
├── Dockerfile               # Multi-stage Alpine build
├── docker-compose.yml       # Docker setup
├── build.sh                 # Full rebuild script
└── design-ethos.md         # Design system documentation
```

## Commands

| Action         | Command         |
| -------------- | --------------- |
| Install        | `npm install`   |
| Dev (frontend) | `npm run dev`   |
| Build          | `npm run build` |
| Docker         | `./build.sh`    |

## Conventions

### TypeScript Component Pattern

```typescript
// Class-based components with static render()
export class ComponentName {
  static render(...args: any): string {
    return `<div>...</div>`;
  }

  static init(callback: Function): void {
    // Attach event listeners after DOM insertion
  }
}
```

### CSS Variables (Accent-Driven)

```css
:root {
  --accent: #c9a227; /* Main accent color */
  --bg-deep: #0c0c14; /* Background */
  --glass: rgba(20, 20, 35, 0.7); /* Glassmorphism */
  --glow: rgba(201, 162, 39, 0.4); /* Glow effect */
  --border-accent: rgba(201, 162, 39, 0.3);
}
```

### API Response Pattern

```typescript
// Success
res.json({ success: true, id, name });
// Error
res.status(400).json({ error: "Message" });
```

### Authentication

- JWT tokens in `Authorization: Bearer <token>` header
- Roles: `admin`, `user`
- Auth middleware: `authMiddleware(['admin'])`

## Key Files

| File               | Purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `server/server.js` | Express API, UserManager, StatsManager, TagsManager, SettingsManager |
| `src/main.ts`      | App class, session management, API client, event handlers            |
| `src/style.css`    | Anti-Slop Glassmorphism theme, cursor glow, animations               |
| `design-ethos.md`  | Complete design system with CSS snippets                             |

## What to Avoid

- **No framework** - Vanilla TypeScript only, no React/Vue
- **No Tailwind** - Custom CSS with variables
- **No database** - File-based JSON storage in volumes
- **No TypeScript strict mode issues** - Must compile clean
- **Don't remove cursor glow** - It's a core UX feature
- **Don't break glassmorphism** - backdrop-filter is essential

## API Endpoints

### Public

- `GET /api/config` - Public config
- `GET /api/health` - Server health
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login

### Auth Required

- `GET /api/auth/me` - Current user
- `GET /api/sites` - List sites with tags
- `GET /api/sites/:id` - Get site + content
- `POST /api/sites` - Upload site
- `PUT /api/sites/:id` - Update site (name, icon, tags, content)
- `DELETE /api/sites/:id` - Delete site (admin)
- `GET /api/stats` - Statistics
- `GET /api/leaderboard` - Top users

### Admin Only

- `GET/POST/PUT/DELETE /api/admin/users/:id` - User management
- `POST/DELETE /api/tags/:id` - Tag management
- `GET/PUT /api/settings` - Global settings

## Volumes

| Path     | Content                                          |
| -------- | ------------------------------------------------ |
| `/sites` | HTML files + JSON metadata                       |
| `/users` | users.json, stats.json, tags.json, settings.json |

## Environment Variables

| Variable         | Default     | Description            |
| ---------------- | ----------- | ---------------------- |
| `ADMIN_PASSWORD` | `admin`     | Initial admin password |
| `JWT_SECRET`     | Random UUID | Token signing secret   |
| `PORT`           | `3000`      | Server port            |
| `FRONTEND_URL`   | -           | External URL for API   |

## Notes

- Lucide icons loaded via CDN: `https://unpkg.com/lucide@latest`
- Fonts via Google Fonts
- Server runs on port 3000 inside container
- Sessions stored in localStorage with JWT token
- Accent colors applied via CSS variable `--accent`
- Cursor glow effect uses `transform: translate3d()` for GPU acceleration
