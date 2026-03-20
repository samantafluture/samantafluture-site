---
type: writing
title: "I asked Claude Code to improve itself. Here's what it built."
date: 2026-03-20
excerpt: "Instead of asking the AI to write code, I asked what it needed to work better. It scanned my projects, my VPS, my whole setup — and came back with a plan."
status: edited
---

I've been using Claude Code daily for months. Building features, debugging, deploying. The usual loop. Last week I asked a different kind of question.

Not "write this function" or "fix this bug." I asked: *What would make you work better?*

I expected something generic. Maybe "add more comments to your code." Instead, it scanned all 8 projects in my Development directory, checked what was running on my VPS, looked at my CLAUDE.md files, my task management, my deploy scripts — and came back with a structured improvement plan.

Then I told it to execute.

## What it built

Over 8 sessions, Claude Code built its own operating system on top of mine. Not product code. Infrastructure for itself.

**8 new skills.** `/morning` runs a full daily standup — P0 tasks across all projects, CI status, VPS health, stale branches, focus suggestion. Replaced me manually checking 8 repos every morning. `/switchto` reads a project's CLAUDE.md, shows tasks and git state, orients in 3 seconds instead of 30. `/testit` auto-detects the project and runs the right test suite — Vitest, Playwright, or Gradle — no more remembering which command goes where. `/dbops` handles migrations, backups, seeds, and schema inspection across every database. `/depcheck` audits dependencies across all projects, flags vulnerabilities. `/update-dep` updates a shared dependency everywhere and creates PRs for the ones that pass. `/blogpost` runs an end-to-end pipeline from outline to deploy, on both my sites.

**3 hooks.** Smart startup replaced a basic git pull with a full context dump — P0 tasks, uncommitted work, CI status — so every session opens aware. A typecheck guard runs `tsc --noEmit` before any commit, catching errors before CI sees them. A task auto-update hook marks tasks done when a commit message references them.

**13 memory files.** Context about all 8 projects — what they do, how they connect, what patterns they follow. Stack choices, deploy patterns, code style. Before this, every session started cold. Now it starts knowing.

**3 new CLAUDE.md files** for repos that didn't have them. tRPC patterns for fincherry, tiered LLM routing for cherryagent, the JSON stdout contract for auto-ads.

**7 CLI tools** — jq, yq, hyperfine, delta, tokei, just, watchexec. Some unblocked the hooks from working at all.

**12 unused MCP servers disabled.** Linear, Slack, Discord, Firebase, and 8 others that were connected but never called. Dead weight, removed.

And a **dashboard** — a PWA showing CI status, task counts, git state, and VPS meters across every project. Auto-refreshes. Push notifications for failures.

## What moved the needle

Not everything mattered equally.

Memory files and CLAUDE.md files were the highest-impact change. Before, every session was a cold start — the agent re-discovering project structure, conventions, relationships it had already understood in a previous conversation. After, it starts with context. Fewer wrong assumptions. Less time reading code it already knows.

The smart startup hook was second. A silent git pull became "27 P0 tasks found across projects. Repo up to date on main." I know the state of things before I type a word.

`/switchto` solved real friction. "Now work on fincherry" — the agent reads CLAUDE.md, checks tasks, shows recent commits. Oriented in seconds. No more ramp-up.

The typecheck hook is small but kills a loop I lived in: commit, CI fails on types, fix, commit again. Now it catches that before the commit happens.

The rest — `/testit`, `/dbops`, `/depcheck`, `/update-dep` — are solid convenience. They save time on commands I'd otherwise look up or type wrong. But they don't change how the agent thinks. They're tooling built on top of the foundation that memory and context provide.

## The question developers forget to ask

Every developer I know customizes their editor. Their shell. Their dotfiles. Terminal theme, git aliases, keyboard shortcuts. Hours making the environment feel right.

But the AI agent? Runs stock. Same blank slate every session. Same cold start. Same lack of context about how you work, what you've built, how your projects connect.

The instinct that makes you spend an afternoon on your neovim config should make you spend an afternoon on your agent's config. Same thing — shaping a tool to fit the way you think.

I didn't write a single line of product code in those 8 sessions. Every session since has been faster because of it.
