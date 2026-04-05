---
type: writing
title: "I Built a Brain for My AI — Here's Why Stateless Conversations Are Broken"
date: 2026-04-05
excerpt: "Five AI surfaces, thirteen projects, zero persistent memory. I built a markdown-based brain that makes every Claude conversation stateful — using David Ondrej's Second Brain, Karpathy's LLM Knowledge Bases, and 12 custom MCP tools."
status: edited
---

Every conversation I have with AI starts the same way. I explain who I am. I explain what I'm working on. I list my stack, my constraints, my priorities. Useful output comes out. I close the tab. Next time, we start over.

I run thirteen projects across five surfaces — Claude Code in the terminal, claude.ai on desktop and mobile, a Telegram bot, and a CherryOps command center. Each session is a stranger. It doesn't know I'm a senior frontend lead building side income streams. It doesn't know Pride season is my critical revenue window. It doesn't know about my PDA profile or my cholesterol targets.

But the real cost isn't re-explaining. It's the insights that die between sessions. A pricing decision I worked through on Tuesday — gone by Thursday. A Kotlin pattern discovered while debugging VoilàPrep — never reaches the CherryOps codebase. An Etsy SEO strategy refined over three conversations — buried in chat history.

I was spending tokens re-discovering knowledge instead of accumulating it.

## Two ideas that reframed the problem

<a href="https://www.youtube.com/watch?v=d7JBwPSij8Y" target="_blank">David Ondrej's "Second Brain" approach</a> clicked first. His idea: put a `CLAUDE.md` file at your workspace root. Claude Code walks up the directory tree and reads it automatically. Every session inherits your identity, your principles, your preferences. You stop being a stranger to your own tools.

He extends this with a `.queue` for strategic initiatives, `identity.md` for how you think, `principles.md` for non-negotiable rules. The AI reads these before doing anything. It knows your taste before you ask.

Then <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank">Andrej Karpathy published "LLM Knowledge Bases"</a> — a different angle on the same problem. His argument: most of his token throughput now goes into manipulating knowledge, not code. Instead of RAG — chunking documents into vectors and doing similarity search — he treats the LLM as a research librarian that authors and maintains a markdown wiki.

Raw material goes in. The LLM compiles it into encyclopedia-style articles with backlinks. Periodically, it lints for inconsistencies and gaps. As <a href="https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an" target="_blank">VentureBeat covered</a>, it's a living knowledge base that heals itself — no vector database, no embeddings, no black boxes. Markdown and git.

The synthesis: Ondrej gives you **identity**. Karpathy gives you **accumulating knowledge**. Together, they make AI conversations stateful.

## The architecture

I created a `brain/` directory as its own git repo inside my `~/Development/` workspace:

```
brain/
├── CLAUDE.md              # Root identity (symlinked to ~/Development/CLAUDE.md)
├── current-state.md       # Live dashboard: revenue, fires, focus, energy
├── identity.md            # Who I am, how I think, my taste
├── principles.md          # Non-negotiable rules
├── energy.md              # Spoon patterns, PDA strategies
├── .queue                 # Strategic initiatives consuming bandwidth
├── .freshness.json        # Staleness metadata per file
├── goals/
│   ├── business.md        # Q2 2026 targets
│   └── personal.md        # TEFAQ, health, creative
├── decisions/
│   ├── _index.md          # Reverse-chronological decision log
│   └── (individual files) # Date-slug.md with rationale
├── library/
│   ├── raw/               # Unprocessed intake (articles, transcripts)
│   ├── wiki/              # LLM-compiled knowledge base
│   │   ├── index.md       # Auto-maintained TOC
│   │   ├── etsy-pod/      # Domain: POD business, Etsy, pricing
│   │   ├── llm-agents/    # Domain: MCP, agentic patterns
│   │   ├── kotlin-mobile/ # Domain: Compose, RevenueCat
│   │   └── ...            # 8 topics, growing organically
│   └── lint-log.md        # Wiki health check results
└── data/
    └── tracking.db        # SQLite: lessons, energy, nutrition, daily logs
```

The key architectural boundary: **project repos hold implementation knowledge** (code, configs, deploy patterns). **Brain holds domain knowledge** — strategy, research, patterns, lessons. Domain knowledge is cross-project and cross-time. If I start a Wix store tomorrow, everything I know about Etsy SEO and POD margins still applies. If surpride-app gets archived, that knowledge survives. It compounds instead of dying with the project.

`CLAUDE.md` lives inside `brain/` as the source of truth, symlinked to `~/Development/CLAUDE.md`. Claude Code's directory walk picks it up for every project. If my machine breaks, cloning the brain repo restores everything. One git clone and I'm back.

## The wiki pipeline

This is Karpathy's pattern applied. The `library/` directory has three stages:

**1. Capture → `raw/`**. Anything goes in. Articles, YouTube transcripts from my CherryAgent `/yt` command, podcast notes, conversation insights, even my own blog posts after publishing. Each file gets YAML frontmatter with `status: unprocessed`. No organization needed.

**2. Compile → `wiki/`**. The AI reads unprocessed raw files and the existing wiki structure, then decides: does this update an existing article or create a new one? It writes compiled articles with backlinks between topics, updates `_overview.md` entry points, and maintains `wiki/index.md`. Processed files move to `raw/archived/`.

**3. Lint → health check**. Periodically, the AI scans the wiki for inconsistencies, missing links, stale information, and undiscovered cross-topic connections. Findings go to `lint-log.md` with severity tags: `[fix]`, `[gap]`, `[stale]`, `[connection]`.

The critical mechanism is the **filing loop**. When a conversation produces a reusable insight — a pricing decision, a debugging technique, an architecture pattern — the AI files it directly into the wiki. It doesn't go through `raw/`. It's already distilled. Every conversation deposits knowledge back. The wiki grows from use.

## Making it ambient with MCP

I run a <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a> server on my VPS with 25 existing tools — task management, blog pipeline, analytics, deployment, remote dev. I added 12 brain tools:

**Core tools** handle personal state:
- `brain_status` — returns current-state.md + .queue + staleness report
- `brain_update` — modifies sections of current-state.md, auto-commits
- `brain_log_decision` — creates a decision file with options, rationale, outcome tracking
- `brain_log_energy` — logs spoon/energy levels (I track this for PDA management)
- `brain_log_nutrition` — logs food with saturated fat estimates (cholesterol tracking)
- `brain_data_query` — read-only SQL against tracking.db
- `brain_interview` — checks file freshness, returns interview questions for stale files

**Wiki tools** handle the Karpathy pipeline:
- `brain_ingest` — captures raw material (articles, transcripts, clips)
- `brain_compile` — returns unprocessed files + wiki state for AI compilation
- `brain_lint` — returns wiki content for health check analysis
- `brain_file_answer` — files a conversation insight into the wiki. This is the filing loop.

Because MCP works across every surface — Claude Code, claude.ai web and mobile, Telegram — the brain follows me. I don't go to the brain.

I tell Claude on my phone "I'm at a 3 today, headache and back pain." It offers to call `brain_log_energy`. I mention lunch. It offers `brain_log_nutrition`. I share an article. It offers `brain_ingest`. No special commands. Natural conversation, routed to the right tool.

## The self-healing layer

Static documentation rots. The brain fights this with a freshness system.

`.freshness.json` tracks when each file was last verified — 3-day threshold for `current-state.md`, 7 for `energy.md`, 30 for goals, 90 for identity. When `brain_interview` detects a stale file, it reads the `## Interview Questions` footer embedded in that file and returns them. The AI interviews me. I answer. The files update. Timestamps reset.

Automated hooks fill in the rest. The morning standup auto-updates `brain/current-state.md` with today's focus and active fires. Task completions log to `tracking.db`. Blog deploys auto-ingest published content into `library/raw/` for the next compilation pass.

The result is a flywheel. Work populates the brain. Conversations deposit knowledge back. Staleness detection prompts interviews. Linting catches drift. Every conversation makes the brain smarter, and the brain makes every conversation smarter.

## What it feels like now

Before: five minutes of context-setting per conversation. AI guessing my intent. Insights dying in chat history. The mental cost of copy-pasting context was high enough that I just didn't. Knowledge leaked constantly.

After: the AI reads `identity.md` and knows my stack, my PDA profile, my communication preferences. It reads `current-state.md` and knows what I shipped this week. It reads `.queue` and knows what's weighing on me. It reads `principles.md` and knows not to suggest Notion for task management. The first message is useful.

26 brain files. 12 MCP tools. 4 SQLite tables. 8 wiki topics. Zero vector databases. Everything is markdown in a git repo. The AI is a sophisticated editor of files I can read, modify, and delete.

## What's next

The wiki has 8 seed topics. As I work, conversations will file insights and the topics will grow. The first compilation pass — ingesting existing research into `raw/`, then compiling into wiki articles — will set the baseline.

Karpathy hints at a longer arc: as the wiki grows and gets cleaner through continuous linting, it becomes a training dataset. A fine-tuned model that knows your operations, your patterns, your decision-making without needing any context at all. That's distant.

For now, the tools already exist. <a href="https://docs.anthropic.com/en/docs/build-with-claude/claude-code" target="_blank">Claude Code</a>, <a href="https://modelcontextprotocol.io/" target="_blank">MCP servers</a>, markdown, git. The missing piece was structure — a place for the AI to find your taste, your goals, and your current state. Not guessed. Not re-explained. Just there.
