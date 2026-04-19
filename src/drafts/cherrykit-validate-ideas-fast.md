---
type: writing
title: "How I built CherryKit to validate app ideas fast"
date: 2026-04-03
excerpt: "I spent months building Recordoc without asking anyone if they wanted it. CherryKit exists so I never do that again — landing page, signups, survey, scorecard, all generated in under an hour."
status: edited
---

I built <a href="https://recordoc.app">Recordoc</a> over several months. A documentation tool that watches your workflow and generates structured records. I used it every day. I liked using it. I never asked anyone if they'd pay for it.

That's the builder's trap. You ship code, solve a real problem, improve the thing. It feels like progress. But "I use it daily" is not market validation. It's a hobby with a deploy pipeline.

## The pattern

Every side project followed the same sequence: idea, excitement, `pnpm init`, three weeks of architecture, a working prototype, then silence. No users. No feedback. No signal on whether anyone outside my head cares.

The problem isn't the building. Building is the easy part — it's what I do for a living. The problem is that it feels like validation when it isn't. You confuse the satisfaction of solving a technical challenge with evidence that a market exists.

Recordoc worked. Nobody asked for it.

## What validation actually takes

A landing page with a clear value prop. An email signup form. A short post-signup survey. Some ad spend to drive traffic. A scorecard to read the results.

That's it. Not a prototype. Not an MVP. Not even a design system. A page that says "this thing solves this problem" and a form that captures whether anyone agrees.

The issue is friction. Setting up a page, wiring a form, writing survey questions, tracking metrics — each step is small, but together they're tedious enough that you skip them. You tell yourself you'll validate later. You never do.

## CherryKit

<a href="https://github.com/samantafluture/cherrykit">CherryKit</a> removes that friction. One command creates an experiment — name, slug, audience, headline — and generates everything: an Astro landing page, a Fastify API for signups and surveys, auto-generated survey questions based on product type, and a scorecard that tells you whether to build, pivot, or kill.

The stack:

```
src/
├── db/           # SQLite — single file, no infra
├── tracker/      # Experiment CRUD, signups, surveys, metrics
├── generator/    # Landing page files, survey questions, ad copy
├── analyzer/     # Scorecard computation, experiment comparison
├── api/          # Fastify server (signup + survey endpoints)
└── actions/      # 9 CLI entry points — all output JSON
```

The flow:

1. **Create** — define the experiment, auto-generate pain points and benefits
2. **Deploy** — build a static page, copy to the deploy directory
3. **Collect** — capture signups and survey responses via the API
4. **Score** — signup rate, survey response rate, cost per signup
5. **Decide** — build, pivot, or kill

It's also a Claude Code skill. I describe an idea in conversation and CherryKit sets up the experiment, generates the page, and deploys it. No context-switching.

## The choices that matter

**SQLite.** One file. No Postgres, no connection strings, no managed database. WAL mode for concurrent reads. For experiments that run a week and collect maybe 200 signups, this is exactly right.

**Astro with static output.** Zero JavaScript shipped to the browser. A form, some copy, a submit handler. That's all a validation page needs.

**CLI actions that output JSON.** Every action — create, list, scorecard, compare, verdict — writes JSON to stdout. Composable with Claude Code out of the box. The AI reads the output, interprets it, suggests next steps. No integration layer needed.

**Hard thresholds.** The scorecard doesn't give you a vague "looks promising." It classifies:

- Signup rate: >15% strong, 5-15% promising, <5% weak
- Survey response rate: >40% strong, 20-40% promising, <20% weak
- Cost per signup: <$2 strong, $2-5 promising, >$5 weak
- Minimum 100 unique visitors before the signal means anything

These numbers force a decision. You can't hide behind "we need more data" when the scorecard says 3% signup rate after 300 visitors.

## What changes when validation is cheap

When testing an idea takes an hour instead of a week, you stop guessing. You test three ideas before committing to one. You kill early — before you've invested enough to feel attached.

The shift is behavioral, not technical. Instead of "let me build this and see if people like it," it becomes "let me check if anyone wants this before I build it." One costs months. The other costs an afternoon.

I'm good at building software. That's exactly the problem — when building is your default response to every idea, you optimize for the wrong thing. You optimize for code quality when you should be optimizing for signal.

## What's next

The next thing I build starts with a CherryKit experiment. A landing page, $20 in ad spend, and a scorecard. If the numbers say build, I build. If they say kill, I save myself three months of working on something nobody wants.

Recordoc was a good tool. CherryKit makes sure the next one is also a good business.

---

- <a href="https://recordoc.app">Recordoc</a>
- <a href="https://github.com/samantafluture/cherrykit">CherryKit on GitHub</a>
