# Fixture Catalog

The main repository owns product-level fixtures and cross-package contracts. It now contains four directory-based repository fixtures, two directory-based issue fixtures, and an additional synthetic evaluation matrix with 23 repository-evidence cases, two issue cases, and seven named CLI/security test groups. The matrix is deliberately labeled and its outputs are pinned in `fixtures/evaluation-matrix.expected.json`.

| Fixture | Purpose | Expected use |
|---|---|---|
| `fixtures/excellent-repository` | Complete contributor-facing setup, testing, contribution, support, security, workflow, and environment evidence. | All repository rules pass and score is 100. |
| `fixtures/poor-repository` | A minimally documented repository with a manifest but no actionable workflow, test, support, or security guidance. | Failures and unknowns produce recommendations. |
| `fixtures/missing-repository` | No recognized contributor evidence; only an ignored marker file exists. | Missing evidence is visible and deterministic. |
| `fixtures/contradictory-repository` | Conflicting Node.js version claims across README, CONTRIBUTING, and workflow evidence. | Current rules remain deterministic; contradiction detection is recorded as a future rule gap rather than hidden. |
| `fixtures/issues/complete.md` | Actionable issue with context, reproduction, behavior, scope, acceptance, and completion evidence. | All six issue rules pass. |
| `fixtures/issues/vague.md` | Title/body without actionable problem, reproduction, behavior, scope, acceptance, or completion detail. | All six issue rules fail. |
| `fixtures/github` | Static GitHub metadata, tree, issue, and blob payloads. | Adapter tests run without network access. |
| `fixtures/evaluation-matrix.json` | Labeled synthetic repository and issue cases spanning maturity, language/runtime/ecosystem, monorepos, ambiguity, incomplete instructions, and hostile inert Markdown. | Main cross-package tests pin per-rule outcomes, score, coverage, unknown/N/A counts, recommendation counts, strict exit status, deterministic JSON, text score/coverage, and SARIF finding order. |
| `fixtures/evaluation-matrix.expected.json` | Reviewed baseline snapshot keyed to stable rule order. | Any rule or scoring change requires an explicit snapshot review; snapshots are consistency expectations, not proof of correctness. |

## False-positive/negative review

- The vague issue is intentionally free of words such as “when,” because the current acceptance heuristic recognizes `when` as an equivalent condition. The fixture therefore tests the intended missing-evidence case without encoding an avoidable heuristic collision.
- The contradictory repository demonstrates a known limitation: the current rules identify runtime terminology but do not yet reconcile conflicting versions. It must remain deterministic and must not be reported as objectively consistent. A dedicated contradiction rule is a later backlog item.
- The excellent fixture uses only static documentation. A passing fixture report means the documented evidence satisfies the current rules; it does not claim that commands or CI actually execute successfully.
- Conventional names alone are not sufficient for the current contribution/security rules; Core tests include vague `CONTRIBUTING.md`, `SECURITY.md`, and `SUPPORT.md` content. Other rule heuristics still use phrase and structure matching and have unmeasured false-positive/false-negative rates.
- The synthetic matrix now names JavaScript/TypeScript, Python, Rust, Go, Java/Kotlin, Deno, Bun, Docker, Nix, monorepos, multiple package managers, maturity variants, fragmented/contradictory documentation, missing/incomplete evidence, vague/actionable issues, and hostile Markdown. Seven security scenario groups map to CLI tests. This remains a compact, authored regression set—not realistic broad sampling, an externally labeled corpus, or statistical validation. Some cross-platform security cases remain skipped or incomplete and are called out in the readiness report.
- A passing fixture suite establishes consistency with fixture expectations only. It does not calibrate the score against external repositories or predict contributor outcomes.

## Running the contract suite

Build the supporting packages first, then run the main repository harness:

```text
cd ../contribready-core && npm test
cd ../contribready-cli && npm test
cd ../contribready && npm test
```

The main harness has no network dependency and reads only the fixture corpus and built package outputs.
