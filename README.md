# Slop Simulator

> The world's first fully autonomous slop engine. *(It's a parody.)*

**Slop Simulator** is a parody web project with two faces:

1. A **marketing landing page** (`/`) that lovingly skewers modern "AI / agentic" SaaS startup sites — dark, premium, gradient-soaked, dripping with buzzwords — selling a fictional game called *Slop Simulator* (think *Game Dev Tycoon*, but the entire business is generating AI slop).
2. An in-browser **interactive demo** (`/demo`) that masquerades as Atlassian Jira, where every feature is an exaggerated "agentic AI" gag. Tickets sport flashy **"✨ Implement now with AI"** buttons; clicking one spawns a fake AI agent that *streams* its way through "implementing" the feature and triumphantly ships the ticket to Done.

Everything is fictional parody — but every interaction is built to feel completely real: real timing, real streaming output, real-looking UI.

> **Status:** All 8 change documents (0001-0008) implemented. Landing page, demo board, issue detail, agent features, and agent roster are all shipped. See [`docs/`](docs/) for the living specifications and change documents that drive implementation.

---

## Quick start

```bash
bun install          # install dependencies
bun run dev          # start dev server (Go + Vite HMR on :8080)
bun run test:run     # run tests
```

The dev server runs on `http://localhost:8080` by default (override with `PORT`). Frontend changes hot-reload through Vite; Go changes auto-rebuild via `air`.

---

## What exists

### Project scaffold

- Single Go server (`main.go`) that serves the React SPA — embedded static in production, Vite reverse proxy in development
- End-to-end hot reload: `bun run dev` starts both Vite and `air` through one port
- GitHub Actions CI with Go tests (100% coverage), Vitest (100% coverage), and lint checks

### Landing page (`/`)

A polished scrolling parody page with:

- Sticky glass nav with **Demo** link, mobile menu
- Hero with aurora background, terminal mock, dual CTAs
- Bento grid of absurd "agentic" features
- Animated stats band, parody testimonials, 3-tier pricing with monthly/annual toggle
- Accordion FAQ, big closing call-to-action, footer with parody links
- Smooth scroll/entrance animations with `prefers-reduced-motion` support

### Design system

- Two CSS-variable-based themes (marketing dark violet, Jira light blue)
- `ThemeScope` component for theme switching
- shadcn/ui-style button with variants
- `FadeUp` and `CountUp` scroll-triggered animations

### The demo (`/demo`)

A convincing Jira clone with:

- Jira chrome — top nav, collapsible sidebar, **Kanban board** (To Do / In Progress / In Review / Done) with draggable issue cards
- **Issue detail** modal — two-column layout (summary, status dropdown, description, activity feed + details panel)
- Comment composer and activity feed with reverse-chronological ordering
- Status transitions that sync between detail view and board
- **"✨ Implement now with AI"** on every card — spawns a simulated streaming agent that walks through implementation steps and "ships" tickets to Done
- **Agent terminal panel** with streaming text, step progress, cancel support, and completion side-effects (auto-move to Done + agent activity comment)
- **Agentic Autopilot** toggle — autonomously ships tickets at timed intervals
- **Ask Rovo** command bar — streams over-confident parody answers to any question
- **Rovo Agents roster** — 6 absurd hireable AI agents with fake stats

All demo data is mocked in the browser; the "AI" is a deterministic, scripted simulation (no real model, no network).

### Tech stack

- **Bun** + **TypeScript** + **React 19**
- **React Router** (HashRouter) for `/` and `/demo` routes
- **Motion** for animation
- **shadcn/ui** (Tailwind CSS 3.4) for components
- **Zustand** for demo state management
- Single **Go** server with embedded SPA in production, reverse proxy to Vite in development
- **Vitest + RTL** for frontend tests, **Go testing** for backend — coverage enforced in CI

---

## Documentation

- [`docs/index.md`](docs/index.md) — index of all specifications and change documents
- [`docs/specs/`](docs/specs/) — living specs (architecture, design-system, landing-page, demo-jira-clone)
- [`docs/changes/`](docs/changes/) — change documents tracking the work to build them

*No setup or usage instructions yet — they'll be added here as the scaffold lands.*

---

*© 2026 Slop Simulator, Inc. No humans were consulted in the making of this product.*
