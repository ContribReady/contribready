# Decision Log

## 2026-10-08 — Main repository plus two supporting repositories

The main `contribready` repository owns project documentation, roadmap, architecture, state, release coordination, examples, and integration fixtures. `contribready-core` is independently reusable and `contribready-cli` is independently deployable. GitHub integration remains inside the CLI because it is currently an optional adapter, not a separately justified product boundary.

## 2026-10-08 — Static-first v0.1

Default analysis reads files and text only. It does not install dependencies, run scripts, run tests, or execute repository code.

## 2026-10-08 — Explainable score

Scores summarize documented rule outcomes and must always be accompanied by findings and recommendations. A score is not an objective quality claim.

## 2026-10-08 — Local-first issue analysis

Local Markdown is the first issue input. GitHub retrieval is an optional adapter and cannot be required by core.
