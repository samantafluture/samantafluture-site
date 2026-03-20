# Project: samantafluture-site

> Last agent update: 2026-03-20

## Active Sprint

### P0 — Must do now
- [ ] DNS propagation — waiting for Hostgator to flip to 187.124.67.117 `[S]` #devops blocked: TTL 4h
  - [ ] Verify `dig samantafluture.com +short` returns `187.124.67.117`
  - [ ] Run certbot for SSL (`samantafluture.com` + `www`)
  - [ ] Swap nginx config from HTTP-only to full SSL
- [x] Lighthouse audit — performance, accessibility, SEO scores `[M]` #a11y 2026-03-20
  - [x] Font loading: moved Google Fonts @import to <link> (eliminates render-blocking)
  - [x] Color contrast: --text-muted bumped to overlay1 (dark) / subtext0 (light) for WCAG AA
  - [x] Blockquote contrast fixed (text-secondary instead of text-muted)
  - [x] SEO: canonical URLs, dynamic og:url, og:type=article for blog, twitter:card
  - [x] Nav links use absolute paths (/#about) so they work on blog pages
  - [x] Twemoji pinned to v14.0.2 (was @latest)
  > Agent: manual audit — Chrome headless unavailable in WSL
- [x] Visual review with Sam `[M]` #design 2026-03-20
  - [x] Check typography scale and rhythm in browser
  - [x] Verify Catppuccin colors render correctly in dark and light mode
  - [x] Test theme toggle persistence
  - [x] Mobile layout pass (tabs, cards, stream, projects)
  - [x] Verify terminal prompts and window chrome feel right

### P1 — Should do this week
- [x] Blog post pages — add next/previous post navigation `[S]` #feature 2026-03-20

### P2 — Nice to have

## Completed (recent)
- [x] Favicon — mauve chevron on Catppuccin base `[S]` #design 2026-03-20

## Blocked

## Completed (recent)
- [x] VPS setup — nginx, Docker volume, GitHub Actions auto-deploy `[M]` #devops 2026-03-20
  - [x] nginx/samantafluture.conf added to repo
  - [x] .github/workflows/deploy.yml — build + rsync + docker volume copy
  - [x] Docker volume `samantafluture_web` created, mounted in infra nginx
  - [x] HTTP-only nginx config live on VPS (SSL pending DNS)
  - [x] Repo made public for VPS clone
  > Agent: full deploy pipeline, first successful CI deploy
- [x] Subscribe CTA — connected to Substack `[S]` #feature 2026-03-20
  > Agent: all subscribe links point to samantafluture.substack.com
- [x] Favicon — 👋 emoji SVG `[S]` #design 2026-03-20
- [x] Auto Ads project added to portfolio `[S]` #content 2026-03-20
  > Agent: links to github.com/samantafluture/auto-ads
- [x] Agent Workflows project added to portfolio `[S]` #content 2026-03-20
- [x] Content polish pass `[S]` #content 2026-03-20
  - [x] CherryAgent repo link → github.com/samantafluture/cherryagent
  - [x] Surpride renamed to "Etsy Store Dashboard + POD Automation"
  - [x] saminprogress removed from projects
  - [x] Now section: shipping → "AI skills workflow"
  - [x] Footer: Twemoji flag SVGs, back-to-top button, coffee emoji removed
  - [x] Title bar samantafluture.com → clickable link to #about
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
