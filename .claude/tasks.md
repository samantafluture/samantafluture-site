# Project: samantafluture-site

> Last agent update: 2026-03-20

## Active Sprint

### P0 — Must do now
- [ ] DNS propagation — waiting for Hostgator to flip to 187.124.67.117 `[S]` #devops blocked: TTL 4h
  - [ ] Verify `dig samantafluture.com +short` returns `187.124.67.117`
  - [ ] Run certbot for SSL (`samantafluture.com` + `www`)
  - [ ] Swap nginx config from HTTP-only to full SSL

### P1 — Should do this week

### P2 — Nice to have

## Blocked

## Completed (recent)
- [x] Content polish — remove pricing, blinking cursor, favicon `[S]` #content 2026-03-20
  - [x] Remove all $10/month VPS and $5/month AI spend references
  - [x] Replace 👋 emoji with blinking mauve terminal cursor
  - [x] Favicon: mauve chevron (❯) on Catppuccin base rounded square
- [x] Blog post pages — add next/previous post navigation `[S]` #feature 2026-03-20
- [x] Lighthouse audit — performance, accessibility, SEO scores `[M]` #a11y 2026-03-20
  - [x] Font loading: moved Google Fonts @import to <link> (eliminates render-blocking)
  - [x] Color contrast: --text-muted bumped to overlay1 (dark) / subtext0 (light) for WCAG AA
  - [x] Blockquote contrast fixed (text-secondary instead of text-muted)
  - [x] SEO: canonical URLs, dynamic og:url, og:type=article for blog, twitter:card
  - [x] Nav links use absolute paths (/#about) so they work on blog pages
  - [x] Twemoji pinned to v14.0.2 (was @latest)
  > Agent: manual audit — Chrome headless unavailable in WSL
- [x] Visual review with Sam `[M]` #design 2026-03-20
- [x] VPS setup — nginx, Docker volume, GitHub Actions auto-deploy `[M]` #devops 2026-03-20
  - [x] nginx/samantafluture.conf added to repo
  - [x] .github/workflows/deploy.yml — build + rsync + docker volume copy
  - [x] Docker volume `samantafluture_web` created, mounted in infra nginx
  - [x] HTTP-only nginx config live on VPS (SSL pending DNS)
  - [x] Repo made public for VPS clone
  > Agent: full deploy pipeline, first successful CI deploy
- [x] Subscribe CTA — connected to Substack `[S]` #feature 2026-03-20
- [x] Auto Ads + Agent Workflows projects added `[S]` #content 2026-03-20
- [x] Content polish pass `[S]` #content 2026-03-20
  - [x] CherryAgent repo link, Surpride renamed, saminprogress removed
  - [x] Footer: Twemoji flags, back-to-top button, coffee emoji removed
  - [x] Title bar clickable, now section updated
- [x] Redesign v3 — terminal workshop with Catppuccin palette `[L]` #design 2026-03-20
  > Agent: full redesign from factory.ai dark mode to terminal workshop Catppuccin aesthetic
- [x] Design v2 — factory.ai-inspired redesign `[L]` #design 2026-03-19
  > Agent: superseded by v3
- [x] Scaffold Astro project with pnpm `[S]` #setup 2026-03-19
- [x] Set up CLAUDE.md and task management `[S]` #setup 2026-03-19

## Notes
- Site now uses terminal workshop aesthetic with Catppuccin Mocha/Latte palette
- Content organized as stream entries (writing, shipped, note) instead of separate blog collection
- Blog posts are stream entries with type: writing that have full markdown body content
- Window chrome (title bar + tab bar) replaces traditional navigation
- No pricing/cost references in public-facing content (user preference)
- Completely separate from saminprogress (personal blog at blog.samantafluture.com)
- VPS IP: 187.124.67.117, SSH user: sam
