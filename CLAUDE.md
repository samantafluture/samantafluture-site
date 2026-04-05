# samantafluture.com

Professional portfolio for Samanta Fluture — senior frontend developer, lead, media artist. Single-page, editorial-grade, typographic-forward. Not a template.

**Completely separate from saminprogress (personal blog). Zero cross-links.**

## Stack

Astro (static), TypeScript (strict), pnpm. Custom CSS with CSS custom properties. No Tailwind, no React, no runtime. JS only for interactions (IntersectionObserver, scroll, pointer tracking).

## Structure

```
src/
  layouts/BaseLayout.astro   # HTML shell, meta, font loading
  components/                # Astro components (sections, interactions)
  pages/index.astro          # Single page, all content
  styles/
    global.css               # Reset, custom properties, base styles
    typography.css           # Type scale, font-face, rhythm
    sections.css             # Section-specific layouts
  scripts/                   # Vanilla JS for interactions
scripts/deploy.sh            # Build + upload + copy into Docker volume
```

## Commands

```bash
pnpm dev       # Dev server
pnpm build     # Build static site
pnpm preview   # Preview production build
bash scripts/deploy.sh  # Deploy to VPS
```

## Deploy

Nginx on VPS serves from Docker volume `samantafluture_web` at `/usr/share/nginx/samantafluture/`. Config: `nginx/conf.d/samantafluture.conf` on VPS.

## Design Principles

- Typography IS the design — fonts, scale, rhythm drive everything
- Massive whitespace in some areas, dense in others
- Every interaction is intentional — no decorative animation
- Lighthouse 100. Mobile is designed, not squeezed.
- Full keyboard nav, semantic HTML, ARIA, `prefers-reduced-motion` for all animations

### Hard NOs

No hero+subtitle+gradient, no bento grids, no floating navbar, no "Hi I'm [Name]", no timeline dots, no pill skill tags, no Inter+Fira Code, no smooth-scroll identical sections, no three.js/particles, no "built with" footer.

### Voice

Direct, declarative. Specific over abstract (numbers, tools, outcomes). Quietly confident. Never: passionate, driven, innovative, leverage, synergy, cutting-edge.
