# Fixture Catalog

Phase 11 fixtures are owned by the main repository because they describe product-level readiness scenarios and cross-package contracts.

| Fixture | Purpose | Expected use |
|---|---|---|
| `fixtures/excellent-repository` | Complete contributor-facing setup, testing, contribution, support, security, workflow, and environment evidence. | All repository rules pass and score is 100. |
| `fixtures/poor-repository` | A minimally documented repository with a manifest but no actionable workflow, test, support, or security guidance. | Failures and unknowns produce recommendations. |
| `fixtures/missing-repository` | No recognized contributor evidence; only an ignored marker file exists. | Missing evidence is visible and deterministic. |
| `fixtures/contradictory-repository` | Conflicting Node.js version claims across README, CONTRIBUTING, and workflow evidence. | Current rules remain deterministic; contradiction detection is recorded as a future rule gap rather than hidden. |
| `fixtures/issues/complete.md` | Actionable issue with context, reproduction, behavior, scope, acceptance, and completion evidence. | All six issue rules pass. |
| `fixtures/issues/vague.md` | Title/body without actionable problem, reproduction, behavior, scope, acceptance, or completion detail. | All six issue rules fail. |
| `fixtures/github` | Static GitHub metadata, tree, issue, and blob payloads. | Adapter tests run without network access. |

## False-positive/negative review

- The vague issue is intentionally free of words such as “when,” because the current acceptance heuristic recognizes `when` as an equivalent condition. The fixture therefore tests the intended missing-evidence case without encoding an avoidable heuristic collision.
- The contradictory repository demonstrates a known limitation: the current rules identify runtime terminology but do not yet reconcile conflicting versions. It must remain deterministic and must not be reported as objectively consistent. A dedicated contradiction rule is a later backlog item.
- The excellent fixture uses only static documentation. A passing fixture report means the documented evidence satisfies the current rules; it does not claim that commands or CI actually execute successfully.

## Running the contract suite

Build the supporting packages first, then run the main repository harness:

```text
cd ../contribready-core && npm test
cd ../contribready-cli && npm test
cd ../contribready && npm test
```

The main harness has no network dependency and reads only the fixture corpus and built package outputs.
