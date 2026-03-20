# Design Directions — samantafluture.com

Three creative directions for Sam to review. Each is a complete vision — not a wireframe, but a feeling. Pick one, or pick pieces from several.

---

## Direction 1: The Publication

**Mood:** You opened a monograph about someone's work. It reads like Emigre magazine meets a Phaidon artist book. Dense where it needs to be, breathing where it should.

**Typography:**
- Display: A high-contrast transitional serif with personality — something like Playfair Display or Cormorant Garamond at massive sizes (clamp 4rem–8rem for the name)
- Body: A clean humanist sans — Source Sans 3 or DM Sans — set at comfortable reading size with generous line-height (1.6–1.7)
- Monospace accent: JetBrains Mono or IBM Plex Mono for technical details, stack listings, metadata
- Mixed scales create drama: your name at 120px, a role descriptor at 18px directly beneath it. The contrast IS the hierarchy.

**Color:**
- Near-black on warm off-white (`#1a1a1a` on `#f8f5f0`) — like aged paper
- One accent: a deep editorial red (`#c23616`) used sparingly — links, the occasional rule, a single highlighted word
- Generous negative space replaces color as a design element

**Layout & Scroll:**
- Asymmetric editorial grid — content doesn't center, it positions. Some text lives in a narrow column at 50% width with a massive left margin. Some bleeds full-width.
- The name arrives first, enormous, alone. Scroll reveals a thin red rule, then the one-liner beneath it.
- Experience section: each role is a "spread" — company name oversized on the left margin (rotated 90 degrees), impact line in body text on the right. You scan vertically, not horizontally.
- Projects get full-viewport takeovers: project name as a massive watermark behind the description. Stack as marginalia.
- Skills section: a dense typographic composition — words at different sizes arranged spatially, not in a grid. Frontend enormous, a specific framework name tiny beside it. Like a word cloud that was designed by a typographer, not an algorithm.
- Footer: just the email, full-width, oversized. A period at the end.

**Navigation:**
- No nav bar. Scroll is the navigation.
- A subtle fixed element in the margin — a thin vertical line with section indicators (dots or short dashes) showing position. Purely orienting, never commanding.
- On mobile: section names appear briefly at top on scroll-snap boundaries, then fade.

**Interaction:**
- Scroll-driven opacity and position shifts — content fades/slides into place as you reach it, not before
- Hover on project names: a subtle color shift and the watermark text behind it pulses slightly larger
- The vertical position indicator tracks smoothly with scroll
- Reduced-motion: everything visible immediately, no transitions

**Why this works for Sam:** It says "I understand editorial design, I understand restraint, and I build things with intention." The asymmetry and typographic confidence signal someone who doesn't reach for a component library — they compose.

---

## Direction 2: The Dossier

**Mood:** You've accessed someone's professional file. Not spy-movie cliché — think government archive, research institute, declassified document. Clinical precision with moments of humanity breaking through.

**Typography:**
- Primary: A bureaucratic workhorse — Space Grotesk or Archivo — clean, slightly condensed, modern but not trendy
- Display: Same font but at variable weight extremes — ultra-light for labels, black for data
- Monospace: For "classified" details, metadata, dates — IBM Plex Mono
- System: All-caps micro-labels (11px, tracked wide) for section headers. The content is the headline, the label is just a filing marker.

**Color:**
- Cool gray palette — `#f0f0ed` background (like manilla paper), `#2d2d2d` text
- Accent: a muted institutional blue (`#3d5a80`) for interactive elements and "stamps"
- Occasional: a redaction-black (`#111`) used for emphasis blocks
- Thin hairline rules everywhere — separating, organizing, containing

**Layout & Scroll:**
- The page opens with a "file header" — name, designation, location, date accessed — set in a bordered frame at the top, like a form header
- Below: content is organized in "documents" — distinct rectangular containers with thin borders, slight shadows, and micro-labels ("SECTION: EXPERIENCE", "DOCUMENT: PROJECT BRIEF")
- Experience: a table-like layout. Columns for date range, organization, role, impact. Dense, scannable, no decoration.
- Projects: each is a "brief" — a contained card with a thick left border. Project codename oversized, then a terse technical summary. Stack listed as "TOOLS:" in monospace.
- Skills: organized as a "capability assessment" — categories as row headers, specific skills as entries. Clean grid, no frills.
- Contact: a "CONTACT CARD" container at the bottom, form-like layout with labels and values.

**Navigation:**
- A fixed top bar with section "tabs" that look like file folder tabs — but flat, typographic, not skeuomorphic
- Current section tab has a subtle underline or heavier weight
- Keyboard: Tab cycles through sections, Enter opens/focuses

**Interaction:**
- Scroll reveals documents sliding up into view — like pulling papers from a folder
- Hover on project briefs: the left border thickens, a subtle "OPEN" label appears
- "Classified" text in the bio section — a few words are redacted (black bars). On hover, they un-redact with a smooth reveal. Not gimmicky — maybe 2-3 words total, and the revealed text is genuinely interesting (e.g., "██████" reveals "media artist")
- Cursor changes to a crosshair in project sections
- Reduced-motion: documents visible immediately, redactions shown as plain text

**Why this works for Sam:** It's structured, technical, and precise — which mirrors how Sam actually works. The redaction trick adds just enough intrigue to make someone lean in. The whole thing says "organized mind, technical depth, a sense of humor about formality."

---

## Direction 3: The Broadcast

**Mood:** A title sequence for a documentary about your career. Each section has its own energy. It's not a website — it's a presentation that happens to live in a browser. Think Saul Bass title sequences, Channel 4 idents, motion graphics reel energy — but all in CSS.

**Typography:**
- Display: A bold condensed grotesque — Bebas Neue or Oswald — for section titles. All-caps, massive, letter-spaced.
- Body: A contrasting humanist serif for readable passages — Lora or Merriweather
- Monospace: For technical specs, presented like teleprompter text
- The mix of condensed sans + serif body creates constant visual tension — urgent headers, contemplative body text

**Color:**
- Dark mode only — `#0a0a0a` background, `#e8e8e8` text
- Accent: electric amber (`#f0a500`) — used for section transitions, highlights, the name
- Secondary: a cooler gray (`#888`) for supporting text
- Color is event-driven — amber appears at moments of emphasis, then retreats

**Layout & Scroll:**
- Full-viewport sections — each section IS the viewport, scroll-snapped
- Section 1 (Identity): Your name, enormous, centered. Amber. Below it, the one-liner in serif italic. That's it. The whole screen.
- Section 2 (Narrative): A short paragraph, centered, line by line. Each line appears on scroll (scroll-driven animation). Like reading a teleprompter.
- Section 3 (Experience): Kinetic list — roles appear one at a time as you scroll, each taking the full width. Company left-aligned, role right-aligned, impact line centered below. Previous entries fade to gray as new ones enter.
- Section 4 (Projects): Each project gets a full screen. Project name as a giant watermark. Description overlaid. Scroll through them like slides in a deck.
- Section 5 (Skills): A dense, centered typographic composition. Words animate in from edges (scroll-driven), finding their places. Static on reduced-motion.
- Section 6 (Contact): Just the email, enormous, amber, centered. A blinking cursor after it.

**Navigation:**
- No visible nav — the scroll IS the experience
- A thin progress bar at the very top of the viewport (2px, amber fill)
- Keyboard: Page Up/Down snaps between sections, visible focus indicators
- Mobile: same snap behavior, swipe-friendly

**Interaction:**
- Scroll-driven animations for EVERYTHING — text enters, exits, transforms based on scroll position
- Section transitions: a brief "static" effect (CSS noise/grain overlay for 100ms) like changing channels
- Hover on the name: letter-spacing widens subtly, weight shifts via variable font
- Hover on project screens: the watermark text shifts position slightly, following cursor
- The progress bar is smooth and satisfying
- Reduced-motion: all sections visible, no scroll animation, no channel-change effect. Clean static layout.

**Why this works for Sam:** It's bold, opinionated, and technically impressive. Every section demonstrates CSS mastery without saying it. The dark mode + amber palette is striking. The scroll-snap + scroll-driven animations show someone who builds with modern APIs, not jQuery plugins. It's memorable — people will scroll back up just to see it again.

---

## Comparison

| Aspect | Publication | Dossier | Broadcast |
|--------|------------|---------|-----------|
| Tone | Sophisticated, editorial | Precise, structured | Bold, cinematic |
| Typography | Serif-forward, mixed scale | Sans-forward, systematic | Condensed display, high contrast |
| Color | Warm minimal + red | Cool neutral + blue | Dark + amber |
| Layout | Asymmetric editorial | Grid/table containers | Full-viewport sections |
| Scroll | Continuous, flowing | Continuous, sectioned | Snap, sequential |
| Navigation | Position indicator | Tab bar | Progress bar |
| Technical flex | Typographic composition | CSS grid mastery | Scroll-driven animations |
| Risk | Could feel too "design studio" | Could feel too rigid | Could feel too "agency reel" |
| Surprise factor | The spatial skill composition | The redaction reveal | The channel-change transition |

---

## My recommendation

**Direction 1 (The Publication)** is the strongest foundation. Here's why:

1. It ages best — editorial design doesn't date like dark-mode neon does
2. The asymmetric layout is the hardest to execute well, which makes it the best portfolio piece
3. It works beautifully on mobile — a single column with dramatic scale changes
4. It has the most natural content hierarchy — you don't fight the format
5. The typographic confidence is the quietest and loudest flex simultaneously

That said, the Dossier's redaction trick and the Broadcast's scroll-driven animations could be borrowed. These directions aren't mutually exclusive in their details — just in their core philosophy.

**Pick your gut reaction, and we'll refine from there.**
