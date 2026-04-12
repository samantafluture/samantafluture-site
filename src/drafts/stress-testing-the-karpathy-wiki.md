---
type: writing
title: "Stress-Testing the Karpathy Wiki"
date: 2026-04-12
excerpt: "A Medium article called my knowledge system 'a bad idea' seven days after I built it. Three of the criticisms were real. I implemented five fixes in one session, then compiled 17 orphan files into a wiki that traces every claim to its source."
status: edited
---

Seven days after I published how I built a markdown brain for my AI, someone on Medium published why it's a bad idea.

Mehul Gupta's <a href="https://medium.com/data-science-in-your-pocket/andrej-karpathys-llm-wiki-is-a-bad-idea-8c7e8953c618" target="_blank">"Andrej Karpathy's LLM Wiki is a Bad Idea"</a> argues that LLM-generated knowledge bases are unreliable, unverifiable, and worse than RAG for anything that matters. The timing was perfect. My brain repo was a week old. Eight topics, eight seed articles, twelve MCP tools, zero provenance tracking. If the critique was right, I'd rather know now.

So I read it carefully. Most of it is a strawman. It frames LLM-Wiki vs RAG as either/or, then declares RAG the winner. But Karpathy never proposed throwing away source documents. My brain repo keeps raw files in `library/raw/` as ground truth. The wiki is derived. That distinction invalidates half the article's arguments.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 200" fill="none">
  <style>
    .d-node { fill: var(--bg-deep); stroke: var(--border-active); stroke-width: 1; }
    .d-node--accent { fill: var(--bg-deep); stroke: var(--accent); stroke-width: 1.5; }
    .d-label { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 13px; font-weight: 600; fill: var(--text-primary); }
    .d-sub { font-family: 'JetBrains Mono', monospace; font-size: 9px; fill: var(--text-muted); letter-spacing: 0.05em; }
    .d-arrow { stroke: var(--border-active); stroke-width: 1.5; }
    .d-arrow--accent { stroke: var(--accent); stroke-width: 1.5; }
  </style>
  <!-- Ingest -->
  <rect class="d-node" x="4" y="40" width="120" height="44" rx="6" />
  <text class="d-label" x="64" y="60" text-anchor="middle">Ingest</text>
  <text class="d-sub" x="64" y="74" text-anchor="middle">library/raw/</text>
  <!-- Arrow: Ingest → Compile -->
  <line class="d-arrow" x1="128" y1="62" x2="168" y2="62" />
  <polygon fill="var(--border-active)" points="166,58 174,62 166,66" />
  <!-- Compile -->
  <rect class="d-node--accent" x="178" y="40" width="120" height="44" rx="6" />
  <text class="d-label" x="238" y="60" text-anchor="middle">Compile</text>
  <text class="d-sub" x="238" y="74" text-anchor="middle">sources: frontmatter</text>
  <!-- Arrow: Compile → Wiki -->
  <line class="d-arrow--accent" x1="302" y1="62" x2="342" y2="62" />
  <polygon fill="var(--accent)" points="340,58 348,62 340,66" />
  <!-- Wiki -->
  <rect class="d-node--accent" x="352" y="40" width="120" height="44" rx="6" />
  <text class="d-label" x="412" y="60" text-anchor="middle">Wiki</text>
  <text class="d-sub" x="412" y="74" text-anchor="middle">confidence state</text>
  <!-- Arrow: Wiki → Lint -->
  <line class="d-arrow" x1="476" y1="62" x2="516" y2="62" />
  <polygon fill="var(--border-active)" points="514,58 522,62 514,66" />
  <!-- Lint -->
  <rect class="d-node" x="526" y="40" width="120" height="44" rx="6" />
  <text class="d-label" x="586" y="60" text-anchor="middle">Lint</text>
  <text class="d-sub" x="586" y="74" text-anchor="middle">deterministic</text>
  <!-- Feedback arrow: Lint curves back down to Wiki (stale downgrade) -->
  <path class="d-arrow--accent" d="M 586 88 L 586 140 L 412 140 L 412 88" fill="none" />
  <polygon fill="var(--accent)" points="408,90 412,82 416,90" />
  <!-- Feedback label -->
  <text class="d-sub" x="499" y="134" text-anchor="middle">STALE DOWNGRADE</text>
  <!-- Phase labels -->
  <text class="d-sub" x="64" y="26" text-anchor="middle">CAPTURE</text>
  <text class="d-sub" x="238" y="26" text-anchor="middle">SYNTHESIZE</text>
  <text class="d-sub" x="412" y="26" text-anchor="middle">KNOWLEDGE</text>
  <text class="d-sub" x="586" y="26" text-anchor="middle">VALIDATE</text>
</svg>
<figcaption>the hardened pipeline: raw files flow forward, lint feedback flows back</figcaption>
</figure>

But three criticisms had real teeth.

## The three real problems

**LLM-checking-LLM output is circular.** My `brain_lint` tool worked like this: read wiki articles, ask Claude to spot issues. But the same reasoning patterns that produce a subtle error during compilation will evaluate that error as plausible during lint. Same model grading its own homework.

**Drift between raw and compiled is silent.** I already had a `.freshness.json` tracking staleness for brain files. But wiki articles had no connection to their source material. If a raw conversation got updated, the compiled wiki article just sat there, quietly wrong. No signal.

**The compile step is lossy.** When you compress a 200-line conversation into a 40-line wiki article, nuance gets dropped. Edge cases, hedged conclusions, context-dependent decisions, all smoothed away. For personal knowledge where the hedging matters, that's a real problem.

The evidence was right there in my own repo. Seventeen raw files sitting in `library/raw/` with `status: unprocessed`, never compiled into anything. A broken backlink in the wiki that no tool caught. Zero way to distinguish an LLM-generated article from one I'd actually reviewed. The system had no immune system.

## Five fixes

I implemented all five in one session. The dependency chain matters: provenance is the foundation everything else builds on.

### 1. Source provenance

Every wiki article can now carry frontmatter that links it to its source material:

```yaml
---
sources:
  - raw/2026-04-12-brain-hardening-karpathy-critique-handoff.md
compiled: 2026-04-12
confidence: compiled
---
```

The `brain_file_answer` MCP tool gained two new parameters: `sources` (array of raw file paths) and `confidence` (compiled or verified). When you file a wiki article, you declare where the knowledge came from. When you re-file it, existing frontmatter fields like `status` and `priority` are preserved and the provenance fields merge in.

This is the schema change. Everything else depends on it.

### 2. Deterministic lint

A Node.js script. Zero dependencies, 300 lines. Checks five things without touching an LLM:

- **Orphan raw files**: ingested material that no wiki article references in its `sources:` frontmatter
- **Dead source refs**: wiki articles citing raw files that were deleted or renamed
- **Broken backlinks**: See Also links pointing to articles that don't exist
- **Freshness drift**: raw files with git commits newer than the wiki article's `compiled:` date
- **Coverage gaps**: topic folders with an overview but zero articles

First run found 23 issues. Seventeen orphan raw files. One broken backlink (`docker-native-modules.md` linking to `mcp-servers.md`, which never existed). Five coverage gaps in topics that had overviews but no articles.

The LLM-based lint stays as a second pass for semantic review: contradictions, tone, reasoning gaps. But structural checks come first now. Deterministic. No hallucinations.

The script runs automatically when `brain_lint` is called through MCP. Deterministic report first, then wiki content for LLM review.

### 3. Confidence states

Three states tracked in the `confidence:` frontmatter field:

- **compiled**: LLM-generated, I haven't reviewed it
- **verified**: I've read it and confirmed it's accurate
- **stale**: the lint script detected that source raw files changed since compilation

The lint script auto-downgrades. If a `verified` article has a source raw file modified after the `compiled:` date, the script rewrites the frontmatter to `confidence: stale`. No LLM involved. Just a date comparison.

`brain_status` now surfaces this in every check:

```
## Wiki Confidence (12 articles)
0 compiled, 0 verified, 0 stale, 12 no provenance
```

That "12 no provenance" was the starting state. Articles filed before the provenance system existed. A number that should only go down.

### 4. Compile diff

When `brain_file_answer` overwrites an existing article, it reads the old content first and returns both versions in the response:

```
## Previous Version
(old article)

## New Version
(new article)

This was a recompile. Review the diff above for lost nuance.
```

No `.stash/` directory. Git already stores history. The LLM consuming the response compares the versions semantically, which works better for prose than a line-by-line diff. If nuance disappeared during recompilation, you see it in context.

On recompile, confidence resets to `compiled`. Content changed, needs re-verification.

### 5. Source footers

When wiki articles are displayed through `brain_lint` or `brain_compile`, articles with provenance now show a footer:

```
[Sources: raw/2026-04-12-brain-hardening-karpathy-critique-handoff.md]
```

Wiki is the navigation layer. Raw is ground truth. If something in a wiki article feels off during a conversation, you pull the source and check. The footer makes the escape hatch visible.

## Closing the gap

The five fixes created the infrastructure. But seventeen raw files were still orphans. The lint script caught them. They needed to be compiled.

I also noticed the pipeline's core flaw: `brain_ingest` wrote raw files and said "run `brain_compile` later." Nobody remembered to run it. So I changed the tool. Now when you ingest something, the response includes the wiki topic list and a compile instruction. Claude files the wiki article in the same turn. One step, "record this," goes all the way from raw capture to wiki article with source provenance.

When `brain_file_answer` runs with `sources`, it also marks the referenced raw files as `status: compiled`. The loop closes automatically.

Then I compiled the backlog. Four parallel agents, each handling a topic group. Seventeen raw files became twelve wiki articles:

- **brain-system**: personal-context-portfolio, claudepedia-knowledge-management, karpathy-critique-hardening
- **llm-agents**: agentic-dev-workflow-pipeline, gods-eye-ai-visualization, ai-transparency-unfoldable-insight
- **ideas-personal**: ai-public-awareness-tool, ai-context-builder, unfoldable-insight-tool (updated with V2 milestone and product pivot)
- **business-lessons**: personal-brand-ai-era
- **startup-ideas**: creator-unified-ecosystem (four raw files merged), brother-youtube-diversification

Every article has `sources:` frontmatter pointing back to its raw files. Every raw file marked compiled.

Final lint report: 3 issues. Down from 23. The remaining three are coverage gaps, topic folders that have overviews but no articles yet. Expected state, not bugs.

## The numbers

One week ago: 8 topics, 8 seed articles, 0 provenance, 17 orphan raw files, 1 broken link, no deterministic validation.

Now: 12 topics, 30 articles, every new article traceable to source, 0 orphans, 0 broken links, 0 dead refs, confidence states on every article, deterministic lint running on every check.

The article's conclusion, "use RAG plus small layers of structured memory," is ironically close to what the brain repo already does. Raw files are the retrieval layer. The wiki is the structured memory. The difference is that the wiki is authored by an LLM, reviewed by a human, and now auditable by a script that doesn't need either.

The architecture was sound. It needed an immune system.
