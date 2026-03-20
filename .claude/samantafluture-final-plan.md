# samantafluture.com — Final Design & Build Plan

## The Concept

**"This person is always building and I want to follow along."**

The site feels like being inside a beautifully configured terminal — the user is peeking into Samanta's workshop. Terminal prompts introduce sections (`samanta ❯ cat now.md`), content lives in cards, and a mixed-content stream shows what's happening in real time. It's structured, warm, alive, and built for an audience that wants to follow along.

This is NOT a portfolio. NOT a CV. NOT a LinkedIn clone. It's a **live workspace with an audience door.**

---

## Visual Language: The Terminal Workshop

The site looks and feels like a modern, well-configured terminal application — think Warp or a beautifully themed VS Code terminal. But the content inside is warm, readable, and human.

**The terminal is the frame, not the content.** Prompts, tabs, window chrome, and monospace labels create the environment. But the actual writing — the about text, blog excerpts, project descriptions — uses readable fonts at comfortable sizes. The terminal metaphor sets the stage; the human voice fills it.

### Color: Catppuccin

Use the **Catppuccin** palette — Mocha (dark) and Latte (light). Every color must come from the official palette. No custom colors, no approximations.

**Mocha (dark mode):**
```
base:      #1e1e2e    /* Main background */
mantle:    #181825    /* Card backgrounds */
crust:     #11111b    /* Outer/deeper background */
surface0:  #313244    /* Borders, subtle separators */
surface1:  #45475a    /* Active borders, hover backgrounds */
surface2:  #585b70
overlay0:  #6c7086    /* Muted text, metadata */
overlay1:  #7f849c
subtext0:  #a6adc8    /* Secondary body text */
subtext1:  #bac2de
text:      #cdd6f4    /* Primary text */

/* Accents (use with intention): */
mauve:     #cba6f7    /* Active tab, primary accent */
blue:      #89b4fa    /* Paths, WRITING type, links */
green:     #a6e3a1    /* Prompt username, SHIPPED type */
yellow:    #f9e2af    /* NOTE type, highlights */
peach:     #fab387    /* Prompt arrow, subscribe accent */
red:       #f38ba8    /* Window dot, errors */
pink:      #f5c2e7    /* LINK type */
flamingo:  #f2cdcd    /* Project tags */
```

**Latte (light mode):**
```
base:      #eff1f5
mantle:    #e6e9ef
crust:     #dce0e8
surface0:  #ccd0da
surface1:  #bcc0cc
overlay0:  #9ca0b0
subtext0:  #6c6f85
subtext1:  #5c5f77
text:      #4c4f69

mauve:     #8839ef
blue:      #1e66f5
green:     #40a02b
yellow:    #df8e1d
peach:     #fe640b
red:       #d20f39
pink:      #ea76cb
flamingo:  #dd7878
```

**Dark/light toggle:** A button in the title bar: `☀️ light` / `🌙 dark`. Respect `prefers-color-scheme` as default, let the user override. Store preference in a cookie or CSS custom property toggle. Transition smoothly (0.3-0.4s on background and color properties).

### Typography: Three Fonts, Three Jobs

```
HEADINGS:   Bricolage Grotesque (Google Fonts)
            - Used for: h1, h2, h3, project names, section titles
            - Weight: 600-800
            - Sizes: h1 = clamp(1.75rem, 4vw, 2.5rem)
                     h2 = clamp(1.25rem, 3vw, 1.5rem)
                     h3 = clamp(1rem, 2.5vw, 1.2rem)
            - Line-height: 1.2
            - Letter-spacing: -0.02em
            - Character: Slightly quirky, has personality, variable weight

TERMINAL/UI: JetBrains Mono (Google Fonts)
            - Used for: prompts, nav tabs, labels, CTAs, type badges,
              tech stacks, metadata, dates, filter buttons, footer
            - Weight: 400-600
            - Size: 12-14px
            - Letter-spacing: 0.04em for labels/CTAs
            - Character: Clean monospace, excellent for UI elements

READING:    Source Serif 4 (Google Fonts)
            - Used for: about paragraph, stream excerpts, project
              descriptions, blog post body, any prose content
            - Weight: 400 (body), 600 (emphasis)
            - Size: 14-16px for excerpts, 18-20px for blog post body
            - Line-height: 1.65-1.75
            - Character: Comfortable long-form reading, warm serifs
```

Load with `font-display: swap`. Self-host if possible for performance, otherwise Google Fonts.

### Icons & Emojis

**The rule: if it could be an icon, it should be an icon.** Emojis are reserved for the few moments where human warmth matters more than visual precision. Everything else gets a proper icon from Lucide (lightweight, consistent, tree-shakeable).

**Use Lucide icons for:**
- Nav tab labels: `PenTool about`, `Zap stream`, `FolderOpen projects`, `Mail subscribe`
- Stream type badges: `FileText WRITING`, `Rocket SHIPPED`, `MessageCircle NOTE`, `Link2 LINK`
- Now section keys: `Wrench building`, `PenLine writing`, `Rocket shipping`, `BookOpen learning`
- Contact links: `Github GitHub`, `Linkedin LinkedIn`, `Mail Email`, `Send Subscribe`
- Project tech stacks: no icons, just text
- CTAs: `ArrowRight` after label text (`READ →`, `VIEW PROJECT →`, `SUBSCRIBE →`)

Icons should be 14-16px, matching the text they sit beside. Use `currentColor` so they follow the Catppuccin theme automatically. Stroke width 1.5-2px for a clean, light feel.

**Use emojis ONLY for:**
- The greeting: `Hi, I'm Samanta 👋` — this is a human moment, an emoji is warmer than a waving-hand icon
- Footer nationality flags: `Montreal, Canada 🇨🇦🇧🇷` — flags only exist as emojis
- The footer sign-off: `Built with Astro, caffeine, and too many side projects ☕` — personality moment

**That's it. Three places.** Emojis are the exception, not the default. They appear where warmth would be lost with an icon, and nowhere else.

**Install:** `lucide-astro` package for Astro components, or use the SVG sprite approach for minimal bundle size.

---

## Layout Architecture

### Window Chrome (Sticky Header)

The site has a terminal-style window frame at the top:

**Title bar:**
- Left: three macOS-style dots (red, yellow, green from Catppuccin palette) — decorative, not functional
- Center: `samantafluture.com` in monospace, muted color
- Right: dark/light mode toggle button

**Tab bar (navigation):**
- Tabs styled like terminal tabs
- Active tab: `base` background, `mauve` top border (2px), full text color
- Inactive tabs: transparent background, `overlay0` text color
- Tabs: `[PenTool] about`, `[Zap] stream`, `[FolderOpen] projects`, `[Mail] subscribe` — Lucide icons, not emojis
- On click: smooth-scroll to section (home page) or navigate to page
- Mobile: tabs become a horizontal scrollable row, or collapse to hamburger

The header is `position: sticky` with the `mantle` background color.

### Content Area

- Max-width: ~820px, centered
- Background: `base`
- Side borders: `1px solid surface0` (creates the terminal window illusion)
- Padding: 32-36px horizontal, generous vertical
- On mobile: full width, reduced padding (16-20px)

### Section Pattern

Every section follows this pattern:

1. **Terminal prompt** — `samanta ❯ [command]` in monospace
2. **Section heading** — in Bricolage Grotesque, large
3. **Content** — cards, stream entries, or prose

The prompts are:
- About: `samanta in ~/workshop on  main ❯ whoami`
- Now: `samanta ❯ cat now.md`
- Stream: `samanta ❯ stream --latest`
- Projects: `samanta ❯ ls ~/projects`

Prompt colors:
- `samanta` → green
- `in` → overlay0
- `~/workshop` → blue
- `on` → overlay0
- ` main` → mauve (with branch icon)
- `❯` → peach
- command text → text color

---

## Content Structure

### Site Map

```
samantafluture.com/                    ← Home: about + now + stream + projects
samantafluture.com/blog/[slug]         ← Full blog posts
samantafluture.com/projects/[slug]     ← Full project pages (future)
```

### Home Page Sections (in order)

#### 1. About Card

A single card (`mantle` background, `surface0` border, rounded corners) containing:

- **Heading**: "Hi, I'm Samanta 👋" — Bricolage Grotesque, 32px, bold
- **Bio**: 3-4 sentences in Source Serif 4, warm and direct. Who she is, what she builds, what drives her. Current role mentioned conversationally ("Senior Frontend Lead at Turbulent"), not as a credential. Mention: AI tools, creative tech, Brazilian in Montreal, always mid-project.
- **Contact links**: inline row — `[Github] GitHub · [Linkedin] LinkedIn · [Mail] Email · [Send] Subscribe` — Lucide icons in monospace with Catppuccin accent colors

**This is NOT a CV summary.** No skill lists, no experience timeline, no education. A person talking, not a profile being displayed.

#### 2. Now Section

A card showing what Sam is currently working on:

- **Heading**: "What I'm up to" — Bricolage Grotesque, with a Lucide `Zap` icon
- **Entries**: key-value pairs with Lucide icons:
  ```
  [Wrench] building    CherryAgent voice pipeline
  [PenLine] writing    Lead hat vs. dev hat
  [Rocket] shipping    Surpride Wix migration
  [BookOpen] learning  TEFAQ B1 French prep
  ```
- Keys in `mauve`, values in `subtext0`, Lucide icons as leading indicators
- **Updated date**: small italic text at bottom — "Updated March 15, 2026" in `overlay0`

Content source: a single `now.md` file in the repo, manually updated. In the future, CherryAgent could automate this via Telegram commands.

**Live data (build-time, optional enhancement):**
- Latest commit message from a pinned repo (via GitHub API at build time)
- Last blog post date
- These are fetched during `astro build`, not client-side

#### 3. Stream

The core of the site. A mixed-content chronological feed.

**Filter bar**: buttons for `ALL`, `[FileText] WRITING`, `[Rocket] SHIPPED`, `[MessageCircle] NOTE` — Lucide icons
- Active filter: `surface1` background, `text` color, `surface2` border, bold
- Inactive: transparent, `overlay0` text, `surface0` border
- Filter is client-side JS (show/hide entries by data attribute)

**Stream entries**: Each entry is a card with:
- Left border colored by type (3px, expands to 5px on hover):
  - WRITING → `blue`
  - SHIPPED → `green`
  - NOTE → `yellow`
- **Type badge**: pill with Lucide icon + type name, colored background at low opacity (`${typeColor}22`), colored text
- **Project tag** (if applicable): project name in `flamingo`
- **Date**: right-aligned, `overlay0`, small monospace
- **Title** (if present): Bricolage Grotesque, 17px, bold
- **Excerpt**: Source Serif 4, 14px, `subtext0`
- **Read link** (if title present): `READ →` in type color, monospace

**Hover**: card background shifts to `surface0` (dark) or `crust` (light), left border thickens

Entry types:
- **WRITING** (`FileText` icon): blog posts — has title, excerpt, READ → link. Links to /blog/[slug]
- **SHIPPED** (`Rocket` icon): project updates — has project tag, excerpt. May link to project page
- **NOTE** (`MessageCircle` icon): short thoughts — no title, just excerpt. No link.
- **LINK** (`Link2` icon): shared links — future content type

#### 4. Subscribe CTA

A card placed inside the stream (after every 4-5 entries) AND as a standalone section:
- Subtle `mauve` tinted background (`${mauve}11`)
- `mauve` border at low opacity
- **Heading**: "Want to follow along?" — Bricolage Grotesque, centered, with Lucide `Mail` icon
- **Description**: 1-2 sentences in Source Serif 4 — what you'll get if you subscribe
- **Button**: `mauve` background, `crust` text, monospace "SUBSCRIBE →"
- Links to Substack or email collection (Buttondown)

#### 5. Projects

Project cards, each containing:
- **Project name**: Bricolage Grotesque, 19px, bold
- **Description**: Source Serif 4, 14px — product pitch, not README. What it does first, tech second.
- **Tech stack**: monospace, small, `overlay0` — `TypeScript · Fastify · Docker · Telegram API`
- **Link**: `VIEW PROJECT →` in `blue`, monospace, with Lucide `ArrowRight` icon

Projects to include:
1. **CherryAgent** — AI-powered Telegram bot for personal automation
2. **Surpride** — Pride merch brand, 5,000+ orders
3. **FinCherry** — Personal finance dashboard, 3 currencies, 5 banks
4. **CherryTree** — Open-source outliner (if ready)
5. **saminprogress** — Personal blog about lead dev life

#### 6. Footer

- Left: `samantafluture` in Bricolage + `Montreal, Canada 🇨🇦🇧🇷` in monospace (flags are emojis — no icon equivalent)
- Right: contact links with Lucide icons in monospace
- Bottom: `© 2026 · Built with Astro, caffeine, and too many side projects ☕` — small, `overlay0`

---

## Blog Post Page (/blog/[slug])

When a WRITING entry in the stream is clicked, it opens the full blog post.

**Layout:**
- Same window chrome (title bar + tab bar)
- Back link at top: `← BACK TO STREAM` in monospace
- **Post header**: type badge (`[FileText] WRITING`), date, title in Bricolage Grotesque large
- **Post body**: Source Serif 4 at 18-20px, line-height 1.75, max-width ~680px
- Code blocks: `mantle` background, monospace, Catppuccin syntax colors
- Links: `blue` color with underline on hover
- **Bottom**: back link + subscribe CTA + next/previous post links

This is where the reading font shines. The terminal frame stays (chrome, tabs), but the content area is pure reading comfort.

---

## Interactions & Animation

### Scroll Reveals
- Stream entries and cards fade in + translateY(10px) on viewport entry
- IntersectionObserver, NOT scroll-driven animations
- Stagger: 50-80ms between siblings
- Duration: 400ms, ease-out
- `prefers-reduced-motion: reduce` → no animations, everything visible immediately

### Hover States
- Stream entry cards: left border thickens (3px → 5px), background shifts
- Project cards: background shifts to `surface0`/`crust`
- Links/CTAs: color shifts to accent, underline reveals
- Nav tabs: text color brightens
- Filter buttons: subtle background appear
- All transitions: 0.2s ease

### Dark/Light Toggle
- Smooth transition on `background-color` and `color` (0.3-0.4s)
- Stores preference (cookie or localStorage)
- Respects `prefers-color-scheme` as initial default

### No Gimmicks
- No parallax, no scroll-snap, no particle effects
- No custom cursors, no glitch effects, no redaction tricks
- No typing animations on prompts (they're static text, not simulated typing)
- The terminal metaphor is visual framing only — it doesn't simulate a real terminal
- Interactions are polished and invisible, never performative

---

## Voice & Tone

### About Section
- Warm, first-person, direct
- "Hi, I'm Samanta" not "Samanta Fluture is a..."
- What excites you, not what you've accomplished
- One current role mention, conversational
- 3-4 sentences max

### Project Descriptions
- Product pitch, not README
- What it does first, how it's built second
- Specific numbers: "5,000+ orders", "3 currencies, 5 banks"
- No buzzwords

### Stream Entries
- WRITING excerpts: hook the reader, make them want to click READ →
- SHIPPED updates: what changed, why it matters, specific
- NOTES: raw thoughts, 1-5 sentences, authentic

### Blog Posts
- Personal, reflective, honest
- Same voice as saminprogress but can be more professional in topic
- Topics: frontend leadership, AI-native development, building in public

### Banned Words
passionate, driven, innovative, leverage, synergy, cutting-edge, results-oriented, detail-oriented, self-starter, seasoned

---

## Technical Requirements

- **Astro + TypeScript + pnpm**, static output
- **Content**: Astro content collections for stream entries, blog posts, projects, and the now section
- **CSS**: Custom CSS with CSS custom properties for the full Catppuccin token system. No Tailwind.
- **JS**: Vanilla JS — IntersectionObserver for scroll reveals, dark/light toggle, stream filter, mobile nav. Minimal.
- **Fonts**: Google Fonts or self-hosted — Bricolage Grotesque, JetBrains Mono, Source Serif 4
- **Performance**: Lighthouse 100. Font loading optimized with `font-display: swap`. No CLS. Minimal JS.
- **Accessibility**: Semantic HTML, full keyboard navigation, visible focus indicators (mauve outline), skip-to-content link, ARIA where needed, `prefers-reduced-motion` respected, `prefers-color-scheme` respected.
- **Responsive**: Mobile-first. Cards stack. Nav tabs scroll horizontally or collapse. Typography scales with `clamp()`. Touch targets 44px+. Terminal side borders disappear on mobile.

---

## File Structure

```
samantafluture-site/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro          ← HTML shell, fonts, global styles, window chrome
│   │   └── BlogPostLayout.astro      ← Blog post reading layout
│   ├── components/
│   │   ├── WindowChrome.astro        ← Title bar + tab bar (sticky header)
│   │   ├── TerminalPrompt.astro      ← Reusable prompt line component
│   │   ├── AboutCard.astro           ← About section card
│   │   ├── NowSection.astro          ← Now section with entries
│   │   ├── StreamEntry.astro         ← Single stream entry card
│   │   ├── StreamFilters.astro       ← Filter buttons (client-side JS)
│   │   ├── ProjectCard.astro         ← Project card
│   │   ├── SubscribeCTA.astro        ← Subscribe card
│   │   ├── Footer.astro              ← Footer
│   │   └── ThemeToggle.astro         ← Dark/light toggle button
│   ├── pages/
│   │   ├── index.astro               ← Home (about + now + stream + projects)
│   │   └── blog/
│   │       └── [...slug].astro       ← Blog post pages
│   ├── content/
│   │   ├── config.ts                 ← Content collection schemas
│   │   ├── stream/                   ← All stream entries (blog posts + shipped + notes)
│   │   │   ├── 2026-03-12-screening-your-tomorrow.md
│   │   │   ├── 2026-03-10-cherryagent-voice-pipeline.md
│   │   │   ├── 2026-03-08-engineering-excellence.md
│   │   │   └── ...
│   │   ├── projects/                 ← Project descriptions
│   │   │   ├── cherryagent.md
│   │   │   ├── surpride.md
│   │   │   ├── fincherry.md
│   │   │   └── ...
│   │   └── now.md                    ← Single file, manually updated
│   └── styles/
│       ├── global.css                ← Reset, Catppuccin tokens, base styles
│       ├── typography.css            ← Font faces, type scale
│       ├── components.css            ← Card styles, stream entries, prompts
│       └── animations.css            ← Scroll reveal keyframes
├── public/
│   └── fonts/                        ← Self-hosted font files (optional)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

### Content Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const stream = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.enum(['writing', 'shipped', 'note', 'link']),
    title: z.string().optional(),          // optional for notes
    date: z.date(),
    project: z.string().optional(),        // links to a project slug
    excerpt: z.string().optional(),        // auto-generated from content if not set
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    stack: z.string(),                     // "TypeScript · Fastify · Docker"
    url: z.string().optional(),
    repo: z.string().optional(),
    order: z.number(),                     // display order
  }),
});

export const collections = { stream, projects };
```

---

## Build Order

1. **Scaffold**: Astro + TypeScript + pnpm, content collections, CLAUDE.md
2. **Tokens**: CSS custom properties for full Catppuccin Mocha + Latte palettes
3. **Fonts**: Load Bricolage Grotesque, JetBrains Mono, Source Serif 4
4. **WindowChrome**: Title bar (dots, title, theme toggle) + tab bar (nav)
5. **TerminalPrompt**: Reusable colored prompt component
6. **AboutCard**: The intro card with bio and contact links
7. **NowSection**: Key-value entries from now.md
8. **StreamEntry + StreamFilters**: Entry cards with type coloring + filter buttons
9. **ProjectCard**: Project cards with name, description, stack, link
10. **SubscribeCTA**: Subscribe card (inserted in stream + standalone)
11. **Footer**: Links, copyright, nationality
12. **BlogPostLayout**: Reading layout for full blog posts
13. **ThemeToggle**: Dark/light switching with persistence
14. **Scroll reveals**: IntersectionObserver animation layer
15. **Responsive**: Mobile pass — tabs, cards, typography, padding
16. **Polish**: Hover states, transitions, focus indicators
17. **Audit**: Lighthouse, keyboard nav, screen reader, reduced-motion

---

## Verification Checklist

- [ ] Catppuccin Mocha (dark) and Latte (light) render correctly with all proper palette values
- [ ] Theme toggle works, respects system preference, persists choice
- [ ] Three fonts load properly: Bricolage Grotesque (headings), JetBrains Mono (UI), Source Serif 4 (reading)
- [ ] Terminal prompts appear before each section with correct coloring
- [ ] Window chrome (dots, title, tabs) is sticky and responsive
- [ ] About card is warm and concise (3-4 sentences, no CV content)
- [ ] Now section displays current activities with Lucide icons
- [ ] Stream shows mixed content types with correct type colors and badges
- [ ] Stream filters work (client-side show/hide)
- [ ] Stream entries have colored left borders and hover effects
- [ ] Subscribe CTA appears in-stream and as a section
- [ ] Project cards show name, description, stack, link
- [ ] Blog post pages use Source Serif 4 at 18-20px for comfortable reading
- [ ] Lucide icons used throughout UI (nav, badges, now section, CTAs); emojis only in greeting, footer flags, and sign-off
- [ ] All hover states use smooth transitions
- [ ] Scroll reveal animations work and respect prefers-reduced-motion
- [ ] Mobile layout works (tabs scroll, cards stack, padding adjusts)
- [ ] Lighthouse 100 (or near) on all metrics
- [ ] Full keyboard navigation with visible mauve focus indicators
- [ ] No gimmicks — no typing animations, no parallax, no custom cursors

---

## The One-Line Test

Someone visits samantafluture.com for 10 seconds and leaves thinking:

**"She builds AI tools and writes about frontend leadership. The site feels alive. I should subscribe."**

That's the whole job.
