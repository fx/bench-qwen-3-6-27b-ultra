# 0008: Analyze the bench run — final report into the README

## Summary

As the **final change** of this project — after every preceding change (0001–0007) has been implemented and merged — run the bundled **`analyze-bench-run`** skill against the completed run and append its output to the **end of the `README.md`**. This produces a permanent, in-repo record of what it cost to build the project: token usage, an estimated dollar cost, per-agent and per-PR breakdowns, timing, and the prompt-cache split.

**Spec:** [Architecture](../specs/architecture/)
**Status:** draft
**Depends On:** 0001, 0002, 0003, 0004, 0005, 0006, 0007

## Motivation

This repository is a benchmark: it exists to be built end-to-end by an autonomous Claude Code `/team` run and to measure how that goes. Once the product is complete, the run itself is the most interesting artifact — how many agents ran, how long it took, how many tokens and dollars it consumed, and how that spend distributed across the seven feature PRs. Capturing that analysis in the README turns an ephemeral run into a durable, reviewable result. This change MUST be executed last, because the analysis is only meaningful once all prior changes have shipped and their PRs have merged.

## Requirements

### Testing Requirements

This change MUST satisfy the project's standing testing rules (see [Architecture › Testing & Coverage](../specs/architecture/index.md#testing--coverage)). CI enforces these as merge gates:

- This change adds **no application source** (`web/` or Go) — it adds a repo-local tooling skill under `.claude/` and appends Markdown to `README.md`. The 100% TS/React and Go coverage gates therefore apply to no new product code, but the full CI pipeline (build + tests + coverage + lint) MUST still pass on the PR.
- The analysis script (`.claude/skills/analyze-bench-run/scripts/analyze.py`) is a developer/reporting tool, not shipped application code; it MUST run cleanly under the repo's Python (standard library only — no third-party dependencies) and MUST degrade gracefully (clear error, non-crash) when no session logs or git history are available.
- The appended README section MUST be plain Markdown that renders correctly and MUST NOT break existing links or the documentation index.

Skipping or weakening any of these rules to land the PR MUST be treated as a bug in the PR, not in the rule.

### Run the analysis skill last

After 0001–0007 are merged, the implementer MUST invoke the `analyze-bench-run` skill (`.claude/skills/analyze-bench-run/`) against this repository's Claude Code session transcripts and MUST append the resulting report to the end of `README.md` under a clearly delimited section.

#### Scenario: Final report is appended

- **GIVEN** changes 0001–0007 are implemented and their PRs merged
- **WHEN** the implementer runs `python3 .claude/skills/analyze-bench-run/scripts/analyze.py` (supplying `--pr-map` to attribute coder agents to PRs)
- **THEN** the script's output (per-agent table, role breakdown, token totals + cache split, list-price cost estimate, and per-PR diffstat) is appended to the end of `README.md` under a new "Bench Run Analysis" section, preceded by a one-paragraph explanation of how it was produced

#### Scenario: Cost is presented honestly

- **GIVEN** the appended analysis
- **WHEN** a reader reviews the cost figures
- **THEN** the section states the cost is a **list-price estimate** that excludes discounts, and distinguishes total **billed** tokens (cache-read dominated, ~96% of volume) from tokens **actually generated** (output)

#### Scenario: Skill is self-contained in the repo

- **GIVEN** a fresh clone of this repository
- **WHEN** a developer reads `.claude/skills/analyze-bench-run/SKILL.md`
- **THEN** it explains where the session logs live, how to run the script (including `--repo`, `--pr-map`, and `--json` flags), what each output section means, and how cost is computed — with no external dependencies beyond `python3` and `git`

### Ordering constraint

This change MUST NOT be started until all of 0001–0007 are merged. It is the terminal change of the project; its analysis is invalid if any feature PR is still open or unmerged.

## Design

### Approach

- The `analyze-bench-run` skill ships in the repo at `.claude/skills/analyze-bench-run/` (added by this change): a lean `SKILL.md` plus `scripts/analyze.py`.
- `analyze.py` parses the Claude Code session transcripts under `~/.claude/projects/<project-slug>/` (the main session jsonl plus every `subagents/agent-*.jsonl`), aggregates `message.usage` token fields (including the `cache_creation` 5m/1h split), reads each agent's model from its meta file, and joins per-PR git diffstats (from each `(#N)` merge commit) with attributed agent output and cost.
- Cost is computed per agent at per-MTok **list prices** from a built-in `PRICING` table (cache-read = 0.1× input; cache-write = 1.25× 5m / 2× 1h), defaulting to the run's model.
- The implementer runs the script, captures its text output, and appends it to `README.md` inside a fenced block under a "Bench Run Analysis" heading with a short preamble.

### Decisions

- **Decision:** Run as a separate, final change rather than folding the report into an earlier change.
  - **Why:** the analysis is only correct once every feature PR has merged; coupling it earlier would capture a partial, misleading picture.
  - **Alternatives:** a CI job that regenerates the section on every push (rejected — the run is a one-time benchmark artifact, not a live metric; transcripts are not available in CI).
- **Decision:** Embed the analysis as static Markdown in the README.
  - **Why:** durable, reviewable, and diff-able; survives independently of the local transcripts that produced it.
  - **Alternatives:** a separate `docs/` report file (acceptable, but the brief is to record it at the end of the README).
- **Decision:** Present cost as a list-price estimate, not a billed figure.
  - **Why:** the transcripts expose token counts, not the account's negotiated/discounted invoice; overstating precision would mislead.

### Non-Goals

- No live or recurring cost dashboard; this is a one-time snapshot.
- No changes to application behavior, the product, or any spec.
- No attempt to reconcile against the actual Anthropic invoice — the figure is an estimate.

## Tasks

- [x] Add the `analyze-bench-run` skill to the repo (`.claude/skills/analyze-bench-run/SKILL.md` + `scripts/analyze.py`)
- [ ] After 0001–0007 are merged, run `python3 .claude/skills/analyze-bench-run/scripts/analyze.py` with an appropriate `--pr-map`, capturing the full output
- [ ] Append the captured output to the end of `README.md` under a "Bench Run Analysis" section with a one-paragraph preamble and the list-price/estimate caveat
- [ ] Verify the README renders correctly and the documentation index links are intact

## Open Questions

- [ ] The exact `--pr-map` (coder agent → PR number) depends on the order PRs were opened during the run; determine it from the run's `pr-link` entries at execution time.
- [ ] Whether to also commit the machine-readable `--json` output alongside the human-readable section — default: human-readable only.

## References

- Spec: [Architecture](../specs/architecture/)
- Skill: `.claude/skills/analyze-bench-run/SKILL.md`
- Related: all of [0001](./0001-project-scaffold.md)–[0007](./0007-demo-agent-features.md) (this change reports on their combined run)
