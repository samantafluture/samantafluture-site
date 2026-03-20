# Project: samantafluture-site

> Last agent update: 2026-03-19

## Active Sprint

### P0 — Must do now
- [ ] Lighthouse audit — performance, accessibility, SEO scores `[M]` #a11y
  - [ ] Run Lighthouse on all 3 pages (home, blog listing, blog post)
  - [ ] Fix any flagged issues (contrast, CLS, font loading, missing meta)
  - [ ] Target: 100 across all metrics
- [ ] Visual review with Sam `[M]` #design
  - [ ] Check typography scale and rhythm in browser
  - [ ] Verify spacing, colors, card sizing feel right
  - [ ] Mobile layout pass (nav, cards, blog post reading)
  - [ ] Compare against factory.ai reference for tone/feel

### P1 — Should do this week
- [ ] Deploy pipeline — Nginx, Docker volume, webhook `[M]` #devops

### P2 — Nice to have
- [ ] Favicon design `[S]` #design

## Blocked

## Completed (recent)
- [x] Design v2 — full factory.ai-inspired redesign `[L]` #design ✅ 2026-03-19
  - [x] Dark mode foundation with crosshatch SVG texture
  - [x] New typography system (Space Grotesk, IBM Plex Mono, Source Serif 4)
  - [x] Section label system (orange dot + ALL CAPS monospace)
  - [x] Card-based layout (light cards, dark dashed-border blog cards)
  - [x] Fixed nav with hamburger mobile menu + focus trap
  - [x] Home page: About, Projects, Blog preview, CTA, Footer
  - [x] Blog listing page (/blog/)
  - [x] Blog post layout with reading typography (/blog/[slug])
  - [x] Content collections for blog posts (MDX + sitemap)
  - [x] Scroll reveal animations with reduced-motion support
  - [x] Polish pass: dates on blog cards, responsive grids, touch targets, a11y
  > Agent: complete redesign from Publication/Dossier editorial to factory.ai dark mode aesthetic
- [x] Build full portfolio — dossier x publication hybrid `[L]` #design ✅ 2026-03-19
  > Agent: v1 build, replaced by v2 redesign
- [x] Design exploration — 3 creative directions `[L]` #design ✅ 2026-03-19
  > Agent: Publication, Dossier, Broadcast — all superseded by factory.ai direction
- [x] Scaffold Astro project with pnpm `[S]` #setup ✅ 2026-03-19
- [x] Set up CLAUDE.md and task management `[S]` #setup ✅ 2026-03-19

## Notes
- Site now has 3 pages: home (single-page), /blog/ listing, /blog/[slug] posts
- Blog uses Astro content collections with MDX support
- Design follows factory.ai aesthetic: dark bg, orange accent, monospace UI, light cards
- Completely separate from saminprogress (personal blog at blog.samantafluture.com)
- VPS IP: 187.124.67.117, SSH user: sam
