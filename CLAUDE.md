# CLAUDE.md — samantafluture-site

This file is the single source of truth for AI agents working on samantafluture.com.
Read it completely before writing any code.

---

## 1. What is samantafluture-site?

A professional portfolio for Samanta Fluture — senior frontend developer, lead, media artist.
Single-page, editorial-grade, typographic-forward. Not a template. Not a blog.
This is the portfolio of someone who builds frontends for a living.

**Completely separate from saminprogress (personal blog). Zero cross-links.**

---

## 2. Technology Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Astro (static output)               |
| Language  | TypeScript (strict mode)            |
| Package   | pnpm                                |
| Styling   | Custom CSS with CSS custom properties |
| Hosting   | Hostinger KVM1 VPS, Nginx, Certbot  |
| Deploy    | `pnpm build` + rsync to VPS         |

No Tailwind. No animation libraries. No React. No runtime.
CSS-first, JS only for complex interactions (IntersectionObserver, scroll position, pointer tracking).

---

## 3. URLs

- **Production:** `samantafluture.com`

---

## 4. Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro    ← HTML shell, meta, font loading
├── components/             ← Astro components (sections, interactions)
├── pages/
│   └── index.astro         ← Single page, all content
├── styles/
│   ├── global.css          ← Reset, custom properties, base styles
│   ├── typography.css      ← Type scale, font-face, rhythm
│   └── sections.css        ← Section-specific layouts
└── scripts/                ← Vanilla JS for interactions
```

---

## 5. Design Principles

- Typography IS the design — fonts, scale, and rhythm drive everything
- Spatial and cinematic — massive whitespace in some areas, dense in others
- Every interaction is intentional — no decorative animation
- Performance is a feature — Lighthouse 100 across the board
- Mobile is designed, not squeezed

### Anti-brief (hard NO list)
- No hero + subtitle + two buttons on gradient
- No bento grids, no floating shrinking navbar
- No "Hi, I'm [Name]", no timeline dots-and-lines
- No pill skill tags, no Inter + Fira Code
- No smooth-scroll identical alternating sections
- No gratuitous three.js/particles
- No "built with" footer

### Voice rules
- Direct and declarative — state what you do, let work speak
- Specific over abstract — numbers, tools, outcomes
- Cross-disciplinary without apology
- Quietly confident — no superlatives
- NEVER: passionate, driven, innovative, leverage, synergy, cutting-edge

---

## 6. Accessibility Requirements

- Full keyboard navigation, semantic HTML, ARIA
- `prefers-reduced-motion` for ALL animations
- No layout shift, fonts loaded properly
- Contrast ratios meet WCAG AA minimum

---

## 7. Deploy

```bash
bash scripts/deploy.sh   # Build + upload + copy into Docker volume
```

Nginx serves from Docker volume `samantafluture_web` mounted at `/usr/share/nginx/samantafluture/`.

---

## 8. Infrastructure

```
VPS (187.124.67.117)
├── ~/apps/samantafluture-site/    ← this repo
├── nginx/conf.d/samantafluture.conf
└── Docker volume: samantafluture_web
```

---

## 9. Task Management

- Tasks are tracked in `.claude/tasks.md` in this repo
- Before starting work, read `.claude/tasks.md` to understand current priorities
- After completing a task, mark it `[x]` with today's date
- Add a blockquote note when you create or modify tasks
- Never delete tasks — only move them to Completed

### Task format reference
- `- [ ] Task description \`[S|M|L]\` #tag` — new task
- `- [/] Task description \`[M]\` #tag in-progress` — working on it
- `- [x] Task description \`[S]\` #tag YYYY-MM-DD` — done
- `- [ ] Task description \`[M]\` #tag blocked: reason` — blocked

---

## 10. Commands

```bash
pnpm install             # Install dependencies
pnpm dev                 # Start dev server
pnpm build               # Build static site
pnpm preview             # Preview production build locally
```
