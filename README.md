# FocusFlow

FocusFlow — a lightweight productivity app combining Tasks and Pomodoro techniques to help you focus and get things done.

## Project Overview

FocusFlow includes three core areas:

- Tasks: create, read, update, and delete tasks with a minimal, usable UI for managing your to-dos.
- Pomodoro: a configurable Pomodoro timer to support focused work intervals and short/long breaks.
- Settings: user preferences including theme (light/dark) and any timer customization.

This repository contains the frontend built with Next.js (App Router) and TypeScript.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- ShadCN UI (components)

## Features

- Task management (CRUD): create tasks, edit them, mark complete, and delete.
- Pomodoro timer: start/pause/reset, session tracking, and break handling.
- Theming: light/dark theme toggle persisted in the UI.

## Folder Structure

Top-level layout (relevant folders and files):

```
app/
  globals.css        # global styles
  layout.tsx         # root layout
  page.tsx           # home page
  pomodoro/          # pomodoro route
    page.tsx
  settings/          # settings route
    page.tsx
  tasks/             # tasks route
    page.tsx

components/          # UI components used across pages
  add-task-modal.tsx
  delete-confirmation-modal.tsx
  navbar.tsx
  pomodoro-timer.tsx
  task-card.tsx
  task-list.tsx
  theme-provider.tsx
  theme-toggle.tsx
  ui/                # design system primitives (shadcn + Tailwind)

lib/                 # client helpers and types
  api.ts              # Axios instance / API helpers
  types.ts            # shared TypeScript types
  utils.ts            # utility functions

public/               # static assets
styles/
  globals.css         # (duplicate or project-level styles)

package.json
next.config.mjs
tsconfig.json
Dockerfile
```

Notes:
- The project uses the App Router (`app/`) pattern. Pages and nested routes live under `app/`.
- `components/` contains reusable UI and feature-specific components. `components/ui/` contains primitive components and shadcn UI wrappers.
- `lib/` centralizes API calls and shared types.

## Environment Variables

Create a `.env.local` in the project root with at least the following:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

`NEXT_PUBLIC_API_URL` should point to the backend API that provides task persistence and any user/session endpoints.

## Install & Run Locally

1. Install dependencies

```bash
pnpm install
```

or with npm/yarn:

```bash
npm install
# or
yarn
```

2. Create `.env.local` and set `NEXT_PUBLIC_API_URL` (see above).

3. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Build for Production

```bash
pnpm build
pnpm start
# or
npm run build && npm run start
# or
yarn build && yarn start
```

The app will be served on the port configured by Next.js (default 3000).

## Dockerize

This repository already includes a `Dockerfile`. Example commands to build and run the production image:

```bash
# Build the image (run in project root)
docker build -t focusflow-frontend:latest .

# Run the container
docker run -e NEXT_PUBLIC_API_URL="https://api.example.com" -p 3000:3000 focusflow-frontend:latest
```

Adjust `NEXT_PUBLIC_API_URL` and ports as needed. For multi-container setups (frontend + backend), consider a `docker-compose.yml` that wires services together and provides the env var.

## Screenshots

Add screenshots to `public/screenshots/` and reference them here. Placeholder images (example):

```
public/screenshots/
  - dashboard.png
  - tasks.png
  - pomodoro.png
  - settings.png
```

Insert images in README when available, for example:

```md
![Dashboard](public/screenshots/dashboard.png)
```

## License

This project is provided under the MIT License. See `LICENSE` for details (create one if necessary).

---

If you'd like, I can add example screenshots, a `LICENSE` file, or a `docker-compose.yml` next. Which would you prefer I do next?
