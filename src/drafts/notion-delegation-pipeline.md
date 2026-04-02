---
type: writing
title: "I built an AI task delegation pipeline. Then I deleted most of it."
date: 2026-04-02
excerpt: "A Notion checkbox that triggers Claude Code to execute tasks automatically. It worked on paper. In practice, a conversation beats a pipeline."
status: edited
---

I spent a day building a pipeline that lets me check a box in Notion and have Claude Code execute the task on my VPS. Triage, branch creation, agent execution, PR, Notion status update, Telegram notification. The whole thing.

Then I deleted the delegation half and kept the sync.

## The premise

I manage tasks across 11 projects. Each repo had a `.claude/tasks.md` file maintained by Claude Code agents and synced via git. It worked, but the source of truth was scattered. I wanted one place to see everything.

Notion became that place. A single database — "Claude Code Tasks" — with Status, Priority, Project, Owner, and a checkbox: "Delegate to Claude Code."

Three pieces:

1. **Notion to GitHub sync.** Query the Notion API every 15 minutes, regenerate `tasks.md` in each project repo, git push.
2. **Delegation.** Check the Delegate box, CherryAgent detects it, spawns a headless Claude Code session, posts the result back to Notion.
3. **Reverse sync.** When agents add tasks to `tasks.md` during work, promote them to Notion before the next overwrite.

## What I actually built

Piece 1 went smoothly. A new module in CherryAgent's tools package — Notion API client, project-to-repo mapping, a renderer that builds `TaskFile` objects from Notion data and serializes them with the existing markdown serializer. A Fastify endpoint for manual triggers, plus a 15-minute cron.

The reverse sync was clean: before overwriting `tasks.md`, parse the existing file, diff task titles against Notion, create any missing ones via the API. Agents keep writing to `tasks.md` — simple, no API needed — and their tasks appear in Notion within 15 minutes.

One SDK gotcha. Notion SDK v5 restructured around "data sources" instead of databases. `client.databases.query()` doesn't exist — it's `client.dataSources.query()`. Thirty minutes of debugging for one renamed method.

Bidirectional sync across 11 projects, working in production. That part I kept.

## Where it broke

The delegation is where things went sideways.

The architecture looked right. Poll Notion for tasks with Delegate checked. Triage via Gemini 2.5 Flash — read the project's CLAUDE.md, evaluate size, produce an enriched prompt or decompose into subtasks. Create a feature branch. Run Sonnet with a 25-turn limit. Push. Create a draft PR. Update Notion.

First problem: Claude Code CLI produces zero output inside Docker containers. Exit code 0, no stdout, no stderr. Debug mode revealed a missing `.claude/` config directory. Created it. Still nothing. Tried `--bare`, `--permission-mode bypassPermissions`, `--output-format json`. Zero bytes every time. A direct curl to the Anthropic API worked fine. The CLI just doesn't function in a non-interactive container.

Replaced it with a custom agent loop using `@anthropic-ai/sdk`. Three tools: `read_file`, `write_file`, `bash`. Sonnet model, 25 max turns.

That worked. The agent read files, explored the codebase, made changes, committed. Each turn logged: `[agent] Turn 1: read_file(CLAUDE.md)`, `[agent] Turn 7: write_file(src/content/stream/hello-world.md)`.

But it was slow. A "Hello World blog post" — deliberately the simplest task I could think of — timed out at 20 minutes. The agent spent 10+ turns reading files to understand the project structure before writing a single line. You'd look at the content directory, see the pattern, create the file. The agent explored like it had never seen a filesystem before.

Second problem: Gemini triage kept producing unparseable JSON. Even with `responseMimeType: "application/json"`, Gemini 2.5 Flash returns literal newlines inside string values. Disabling thinking mode helped. Sanitizing newlines helped more. But the triage required constant patching — fragile in a way that erodes trust.

Third problem: the triage was too smart. I asked it to create a blog post on samantafluture.com. Gemini read the CLAUDE.md, found "Not a blog" in the design principles, and refused. Correctly noting the task contradicts the project's documentation. Technically right. Practically useless — the site has a content stream, the CLAUDE.md just doesn't call it a blog.

## The realization

After four failed runs, I stopped and asked: what does this give me that I don't already have?

I have Notion with a MCP connector — Claude can read and write my tasks from any surface, including my phone. I have a VPS MCP server — Claude can SSH in, read files, run commands. I have Claude Code on my laptop for deep sessions.

The delegation checkbox gives fire-and-forget. Check the box, walk away, get a Telegram notification when it's done. That's the only thing the pipeline adds.

What it loses: the ability to ask "what are you confused about?" The ability to say "no, the other directory." The ability to adjust scope mid-task. Every failed delegation run would have succeeded as a 3-minute conversation.

An automated agent without a human in the loop is a junior developer locked in a room with the codebase. They might figure it out. They might spend 20 minutes reading files they don't need.

## What survived

The sync. Both directions.

Every 15 minutes, CherryAgent queries my Notion database and regenerates `tasks.md` in each project repo. When agents discover tasks during work, those get promoted back to Notion on the next cycle. Notion is the source of truth. The repos have fresh context. No manual intervention.

The delegation pipeline — triage, agent loop, Notion writer, branch/PR automation — deleted. 1,110 lines removed.

## The takeaway

If your AI agent has access to the task database and the codebase, you don't need a pipeline between them. You need a conversation.

Build the infrastructure: sync, context, MCP access. Skip the automation. The human in the loop isn't overhead — it's the part that makes the agent effective.
