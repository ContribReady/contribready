# Add contradiction findings for conflicting contributor evidence

## Problem

The current static rules recognize runtime terminology but do not identify conflicting requirements, such as README.md requiring Node.js 18 while CONTRIBUTING.md and CI require Node.js 20. Contributors can receive a passing runtime finding despite contradictory setup evidence.

## Steps to reproduce

1. Run `npm test` in the main repository.
2. Audit `fixtures/contradictory-repository` with the CLI in JSON format.
3. Compare the runtime claims in README.md, CONTRIBUTING.md, and the workflow.

## Expected and observed behavior

Expected behavior: the report identifies the conflicting runtime claims, names their evidence sources, and recommends one consistent supported version. Observed behavior: existing runtime terminology is recognized, but the contradiction is only visible in evidence files and does not produce a dedicated finding.

## Technical scope

Affected areas: `contribready-core/src/rules.ts`, rule metadata/catalog, fixture corpus, scoring, and Core/CLI contract tests. The rule must remain static and must not execute workflows or package scripts.

## Acceptance criteria

- A contradiction rule detects conflicting runtime/toolchain versions across contributor-relevant evidence.
- The finding names the conflicting evidence sources without copying secrets or executing content.
- Consistent evidence does not produce a contradiction finding.
- The score and recommendation remain deterministic for identical normalized evidence.
- Core and CLI tests cover pass, fail, and non-applicable cases.

## Definition of done

The rule catalog, false-positive notes, fixtures, changelogs, and project documentation are updated; `npm run verify` passes in Core and CLI; and the main contract suite passes.
