# Add labeled ecosystem and repository-shape fixtures for rule evaluation

**Repository:** `ContribReady/contribready-core` (fixture contract owned by `ContribReady/contribready`)

## Problem and user impact

The current main-repository corpus has four repository fixtures and two Markdown issue fixtures. It does not cover the product's stated ecosystem and repository-shape matrix, so passing tests do not establish false-positive or false-negative behavior across common project layouts.

## Steps to reproduce

1. Inspect `contribready/fixtures` and `docs/FIXTURE_CATALOG.md`.
2. Run the main repository contract suite.
3. Compare existing fixtures with the listed ecosystems and difficult evidence cases.

## Expected behavior: a labeled, reproducible fixture matrix records expected findings, score, coverage, unknown/not-applicable counts, recommendations, exit status, JSON, and SARIF where supported.

## Actual behavior: only a small smoke corpus exists; most ecosystem and ambiguity cases have no expected result.

## Scope

Likely files: main `fixtures/`, `tests/contract.test.mjs`, `docs/FIXTURE_CATALOG.md`, and Core tests when a case exposes a rule defect. Cover JavaScript/TypeScript, Python, Rust, Go, Java/Kotlin, Deno, Bun, Docker, Nix, monorepo/multiple package manager, incomplete setup, CI-without-local-test, tests-without-expected-result, vague contribution/security docs, conflicting docs, vague/actionable issues, and bounded hostile inputs.

## Acceptance criteria:

- Each fixture has a short label, rationale, intended expected outcomes, and versioned golden expectations.
- Cases include both positive and negative evidence and do not reward file-name presence alone.
- JSON and SARIF snapshots are deterministic and reviewed for stable IDs, score/coverage, and escaping.
- The corpus documents which cases require human judgment and does not claim statistical calibration.
- Fixture files remain inert data; tests never execute fixture code or commands.

## Required tests

Run the main fixture validator and contract suite with built Core/CLI artifacts on Node 20, 22, and 24 in CI.

## Expected output

A deterministic fixture report identifying pass/fail/unknown/not-applicable expectations and known limitations for every included scenario.

## Security considerations

Include oversized/hostile text only within declared limits; never store real secrets or malicious executable payloads. Markdown, URLs, and commands stay inert.

## Difficulty / dependencies

Difficulty: large. Depends on a stable report schema and rule IDs; requires coordinated Core/CLI contracts.

## Out of scope

Training a statistical model, claiming measured contributor conversion, or changing rules merely to maximize fixture pass rates.

## Definition of done:

Catalog, fixture rationales, cross-contract tests, and changelogs are updated; all three repository verification suites pass; the documentation explicitly separates fixture consistency from external validation.
