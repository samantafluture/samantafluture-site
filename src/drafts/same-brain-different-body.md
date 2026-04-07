---
type: writing
title: "Same Brain, Different Body — How I Use Claude Code and Claude Web for Different Kinds of Thinking"
date: 2026-04-07
excerpt: "You don't sketch on a workbench. Same AI model, but the harness around it shapes what kind of thinking it enables. Here's how I split creative exploration and technical execution across Claude's surfaces."
status: edited
---

You don't sketch on a workbench. You don't machine parts on a whiteboard. They're both flat surfaces, but what you can do at each one depends on what's bolted to it.

Claude Code, Claude web, and Claude mobile run the same model. Same reasoning, same capabilities. The difference is everything around it — what tools it can reach, how it responds, what kind of thinking it invites. Most developers pick one surface and stick with it. I did too, until a pattern showed up on its own.

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
