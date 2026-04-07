---
type: writing
title: "Same Brain, Different Body — How I Use Claude Code and Claude Web for Different Kinds of Thinking"
date: 2026-04-07
excerpt: "You don't sketch on a workbench. Same AI model, but the harness around it shapes what kind of thinking it enables. Here's how I split creative exploration and technical execution across Claude's surfaces."
---

You don't sketch on a workbench. You don't machine parts on a whiteboard. They're both flat surfaces, but what you can do at each one depends on what's bolted to it.

Claude Code, Claude web, and Claude mobile run the same model. Same reasoning, same capabilities. The difference is everything around it — what tools it can reach, how it responds, what kind of thinking it invites. Most developers pick one surface and stick with it. I did too, until a pattern showed up on its own.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 120" fill="none">
  <style>
    .d-node { fill: var(--bg-deep); stroke: var(--border-active); stroke-width: 1; }
    .d-node--accent { fill: var(--bg-deep); stroke: var(--accent); stroke-width: 1.5; }
    .d-label { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--text-primary); }
    .d-sub { font-family: 'JetBrains Mono', monospace; font-size: 9px; fill: var(--text-muted); letter-spacing: 0.05em; }
    .d-arrow { stroke: var(--border-active); stroke-width: 1.5; }
    .d-arrow--accent { stroke: var(--accent); stroke-width: 1.5; }
  </style>
  <!-- Mobile -->
  <rect class="d-node" x="4" y="28" width="100" height="44" rx="6" />
  <text class="d-label" x="54" y="48" text-anchor="middle">Mobile</text>
  <text class="d-sub" x="54" y="62" text-anchor="middle">on the go</text>
  <!-- Arrow -->
  <line class="d-arrow" x1="108" y1="50" x2="140" y2="50" />
  <polygon fill="var(--border-active)" points="138,46 146,50 138,54" />
  <!-- Web -->
  <rect class="d-node" x="150" y="28" width="100" height="44" rx="6" />
  <text class="d-label" x="200" y="48" text-anchor="middle">Web</text>
  <text class="d-sub" x="200" y="62" text-anchor="middle">whiteboard</text>
  <!-- Arrow -->
  <line class="d-arrow" x1="254" y1="50" x2="286" y2="50" />
  <polygon fill="var(--border-active)" points="284,46 292,50 284,54" />
  <!-- Brain -->
  <rect class="d-node--accent" x="296" y="28" width="100" height="44" rx="6" />
  <text class="d-label" x="346" y="48" text-anchor="middle">Brain</text>
  <text class="d-sub" x="346" y="62" text-anchor="middle">knowledge</text>
  <!-- Arrow -->
  <line class="d-arrow--accent" x1="400" y1="50" x2="432" y2="50" />
  <polygon fill="var(--accent)" points="430,46 438,50 430,54" />
  <!-- Code -->
  <rect class="d-node--accent" x="442" y="28" width="100" height="44" rx="6" />
  <text class="d-label" x="492" y="48" text-anchor="middle">Code</text>
  <text class="d-sub" x="492" y="62" text-anchor="middle">workbench</text>
  <!-- Arrow -->
  <line class="d-arrow" x1="546" y1="50" x2="578" y2="50" />
  <polygon fill="var(--border-active)" points="576,46 584,50 576,54" />
  <!-- Ship -->
  <rect class="d-node" x="588" y="28" width="100" height="44" rx="6" />
  <text class="d-label" x="638" y="48" text-anchor="middle">Ship</text>
  <text class="d-sub" x="638" y="62" text-anchor="middle">deploy</text>
  <!-- Phase labels -->
  <text class="d-sub" x="127" y="100" text-anchor="middle">DIVERGENT</text>
  <line class="d-arrow" x1="30" y1="86" x2="224" y2="86" opacity="0.4" />
  <text class="d-sub" x="565" y="100" text-anchor="middle">CONVERGENT</text>
  <line class="d-arrow" x1="468" y1="86" x2="662" y2="86" opacity="0.4" />
</svg>
<figcaption>ideas flow from whiteboard to workbench — the brain bridges the handoff</figcaption>
</figure>

## The gradual split

I work from a desk most of the day, Claude Code open in the terminal. But I also keep Claude on my phone — thinking through ideas during walks, on transit, waiting for coffee. When I get home, I continue those mobile conversations on the web. Natural continuation.

Over weeks, a shape emerged. My mobile and web conversations were about *what to build*. Feature ideas. Architecture comparisons. Business strategy. "What if the dashboard also showed margin trends?" — that kind of thinking. Open-ended. Divergent.

My Claude Code sessions were about *how to build it*. "Add a margin column to the P&L table. The data comes from this Drizzle schema. Deploy when done." Specific. Convergent. Grounded in files that exist.

I didn't plan the split. The friction of each surface pointed me there. Code has tool permissions to approve, files to read, commands to run — it wants to *do things*. Web has flowing conversation, no interruptions, paste a screenshot and talk about it — it wants to *think about things*.

## The whiteboard and the workbench

The differences are structural, not aesthetic.

Claude web gives you uninterrupted conversation. No tool-call approval dialogs. No filesystem. You can paste screenshots of a competitor's UI, share an architecture diagram, dump a wall of requirements — and just talk. Ask for five approaches. Compare tradeoffs in a table. Change your mind three times. The AI writes longer, more exploratory responses because the interface is built for that. Projects let you upload reference docs as persistent context.

Claude Code gives you an agent with shell access. It reads your codebase — not a summary you pasted, the actual files. It checks if your idea is feasible against your real schema, your real dependencies, your real deploy pipeline. It spawns parallel subagents to explore multiple parts of the codebase at once. It has plan mode for structured implementation. When it says "this would require changing three files," it means those three files, with line numbers.

I run a Model Context Protocol server on my VPS with 40+ tools — brain, blog, analytics, deployment. Claude Code connects to all of them. It operates inside my infrastructure, not next to it.

Web Claude is a whiteboard. Claude Code is a workbench. Both are useful. Neither replaces the other.

## The handoff

There's a moment when an idea is ready to change surfaces. It's the shift from divergent thinking — what are the options, what are the tradeoffs, what does this even look like — to convergent thinking. One direction chosen. Now: how do we build it?

The trap is skipping the handoff. Using web Claude to plan implementation details for a codebase it's never seen. It will give you confident, plausible plans. File paths that sound right. Architecture that looks clean. But it's fabricating structure. It hasn't read your code. It doesn't know you already have a utility that does half of what it's proposing. It doesn't know your schema uses ULIDs instead of auto-increment integers. It doesn't know your deploy runs through a Docker multi-stage build that breaks if you add a new env variable without updating the compose file.

The opposite trap exists too. Using Claude Code for pure brainstorming works, but you're paying overhead — tool permissions, terse responses optimized for action, the constant pull toward execution. Sometimes you need to think before you do. The workbench doesn't encourage wandering.

## The bridge

The split only works if knowledge travels between surfaces. Otherwise it's the old problem again — explaining context from scratch every time you switch.

I built a brain system — a markdown-based knowledge base with MCP tools that work across every Claude surface. When a web conversation produces a useful insight, `brain_file_answer` deposits it into a wiki. When I make a decision after comparing options, `brain_log_decision` records the choice and rationale. When I share an article on mobile, `brain_ingest` captures it for later compilation.

Claude Code reads this brain automatically. It picks up where web left off — not from a copy-pasted summary, but from structured knowledge that accumulated across conversations. The web conversation explored five caching strategies. The decision log says I chose option three and why. Code reads that and implements option three without me re-explaining the reasoning.

The model is the same across all three surfaces. What changes is the harness — the tools, the interface, the kind of thinking each one enables. Matching the right surface to the right phase of work isn't preference. It's putting the same brain in the body that fits what you're actually trying to do.
