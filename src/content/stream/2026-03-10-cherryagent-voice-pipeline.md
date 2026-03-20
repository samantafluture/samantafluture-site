---
type: shipped
title: "CherryAgent voice pipeline is live"
date: 2026-03-10
project: cherryagent
excerpt: "Voice messages on Telegram now become GitHub PRs. The full pipeline — transcription, code generation, branch creation, PR — runs on a $10/month VPS."
---

The voice coding pipeline for CherryAgent is finally working end-to-end. Send a voice message on Telegram describing what you want to build, and it comes back as a pull request on GitHub.

The pipeline: Whisper transcription → intent extraction → code generation → git branch → PR creation. All running on the same $10/month VPS that hosts everything else.

The trick was tiered model routing — using free/cheap models for transcription and intent, and only hitting the expensive models for actual code generation. Total AI spend: under $5/month.
