# Project: samantafluture-site

> Last agent update: 2026-03-19

## Active Sprint

### P0 — Must do now
- [ ] Visual review and polish with Sam `[M]` #design
  - [ ] Check typography scale and rhythm in browser
  - [ ] Verify redaction interactions work on mobile
  - [ ] Tweak spacing, colors, font sizes as needed
- [ ] Performance and accessibility audit `[M]` #a11y
  - [ ] Lighthouse 100 across the board
  - [ ] Full keyboard navigation test
  - [ ] Screen reader pass
  - [ ] Check muted gray contrast against warm background

### P1 — Should do this week
- [ ] Deploy pipeline (Nginx, Docker volume, webhook) `[M]` #devops

### P2 — Nice to have
- [ ] Favicon design `[S]` #design

## Blocked

## Completed (recent)
- [x] Build full portfolio — dossier x publication hybrid `[L]` #design 2026-03-19
  - [x] Type system (Cormorant Garamond, Source Sans 3, IBM Plex Mono)
  - [x] Asymmetric editorial layout with CSS custom properties
  - [x] All content sections with professional voice rewrite
  - [x] Scroll-driven reveals, redaction interactions, margin position indicator
  - [x] Accessibility: skip-link, ARIA, keyboard nav, reduced-motion
  > Agent: full build from type system through all 7 sections, all interactions, all accessibility
- [x] Design exploration — 3 creative directions `[L]` #design 2026-03-19
  > Agent: Publication, Dossier, Broadcast. Sam chose hybrid: Dossier structure + Publication typography + Broadcast animations
- [x] Scaffold Astro project with pnpm `[S]` #setup 2026-03-19
- [x] Set up CLAUDE.md and task management `[S]` #setup 2026-03-19

## Notes
- This is a single-page portfolio — no routing, no blog, no CMS
- Completely separate from saminprogress (personal blog)
- VPS IP: 187.124.67.117, SSH user: sam
- Content adapted from saminprogress about/projects pages, rewritten in professional voice
