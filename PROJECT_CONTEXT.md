# Project Context

## Mission

Make outsider contribution success visible and improvable through deterministic evidence.

## User and problem

Primary users are maintainers who want to reduce onboarding friction and contributors deciding whether they can begin. A repository can be secure or popular yet still fail a newcomer because setup, tests, workflow, or issue scope is unclear.

## Solution

ContribReady inspects repository artifacts and issue text, evaluates versioned rules, and reports evidence, limitations, severity, score, and the next actionable fixes.

## Non-goals

It is not a generic code-quality scanner, Scorecard clone, AI reviewer, hosted service, bot, repository scaffolder, or dynamic execution sandbox in v0.1.

## Principles

Deterministic; static-first; evidence before opinion; scores are labeled measurements, not truth; adapters stay outside the core; safe failure; actionable reports; small releases.

## Architecture

The `contribready` repository owns the product source of truth. `@contribready/core` owns contracts and evaluation. `@contribready/cli` owns filesystem, presentation, and the optional GitHub transport adapter. GitHub is not a separate repository until reuse, release, and ownership justify it.

## Technology

TypeScript, Node.js, npm package conventions, Markdown and JSON outputs. No backend is needed for v0.1.

## Context

ContribReady is independent of Stellar Forge and VerifyAgent. Those projects provide relevant engineering experience, but no funding outcome or rejection reason is inferred.

## Rules for future agents

Read `PROJECT_STATE.md` and the relevant roadmap phase first; inspect the main repository and both supporting repositories; preserve boundaries; add tests with behavior; update documentation and state; do not push or create remotes without explicit authorization; never execute target repository code by default.
