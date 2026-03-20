# Project: samantafluture-site

> Last agent update: 2026-03-20

## Active Sprint

### P0 — Must do now
- [ ] Lighthouse audit — performance, accessibility, SEO scores `[M]` #a11y
  - [ ] Run Lighthouse on all pages (home, blog posts)
  - [ ] Fix any flagged issues (contrast, CLS, font loading, missing meta)
  - [ ] Target: 100 across all metrics
- [ ] Visual review with Sam `[M]` #design
  - [ ] Check typography scale and rhythm in browser
  - [ ] Verify Catppuccin colors render correctly in dark and light mode
  - [ ] Test theme toggle persistence
  - [ ] Mobile layout pass (tabs, cards, stream, projects)
  - [ ] Verify terminal prompts and window chrome feel right

### P1 — Should do this week
- [ ] Deploy pipeline — Nginx, Docker volume, webhook `[M]` #devops
- [ ] Subscribe CTA — connect to Buttondown or Substack `[S]` #feature

### P2 — Nice to have
- [ ] Favicon design `[S]` #design
- [ ] Blog post pages — add next/previous post navigation `[S]` #feature

## Blocked

## Completed (recent)
- [x] Redesign v3 — terminal workshop with Catppuccin palette `[L]` #design 2026-03-20
  - [x] Catppuccin Mocha (dark) + Latte (light) token system
  - [x] Dark/light toggle with localStorage persistence + prefers-color-scheme
  - [x] New font stack: Bricolage Grotesque, JetBrains Mono, Source Serif 4
  - [x] Window chrome: title bar (dots, title, theme toggle) + tab bar navigation
  - [x] Terminal prompts before each section (whoami, cat now.md, stream --latest, ls ~/projects)
  - [x] About card with bio, social links (Lucide icons)
  - [x] Now section parsing now.md with Lucide icons (Wrench, PenLine, Rocket, BookOpen)
  - [x] Stream: mixed-content feed (WRITING, SHIPPED, NOTE) with type badges and colored left borders
  - [x] Stream filters (client-side JS, show/hide by type)
  - [x] Subscribe CTA (in-stream after 4th entry + standalone section)
  - [x] Project cards from content collection with name, description, stack, link
  - [x] Blog post layout with BACK TO STREAM, reading typography, subscribe CTA
  - [x] Scroll reveal animations with prefers-reduced-motion support
  - [x] Lucide icons throughout, emojis only in greeting/footer/sign-off
  - [x] Content collections: stream (9 entries), projects (5), now.md
  - [x] Responsive: mobile tabs scroll, cards stack, touch targets 44px+
  - [x] Accessibility: skip link, focus indicators, ARIA, semantic HTML, keyboard nav
  > Agent: full redesign from factory.ai dark mode to terminal workshop Catppuccin aesthetic per samantafluture-final-plan.md
- [x] Design v2 — full factory.ai-inspired redesign `[L]` #design 2026-03-19
  > Agent: superseded by v3 terminal workshop redesign
- [x] Build full portfolio — dossier x publication hybrid `[L]` #design 2026-03-19
  > Agent: v1 build, replaced by v2 redesign
- [x] Design exploration — 3 creative directions `[L]` #design 2026-03-19
  > Agent: Publication, Dossier, Broadcast — all superseded
- [x] Scaffold Astro project with pnpm `[S]` #setup 2026-03-19
- [x] Set up CLAUDE.md and task management `[S]` #setup 2026-03-19

## Notes
- Site now uses terminal workshop aesthetic with Catppuccin Mocha/Latte palette
- Content organized as stream entries (writing, shipped, note) instead of separate blog collection
- Blog posts are stream entries with type: writing that have full markdown body content
- Window chrome (title bar + tab bar) replaces traditional navigation
- Completely separate from saminprogress (personal blog at blog.samantafluture.com)
- VPS IP: 187.124.67.117, SSH user: sam
