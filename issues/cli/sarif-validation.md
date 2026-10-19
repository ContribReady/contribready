# Validate generated SARIF against the 2.1.0 schema

**Repository:** `ContribReady/contribready-cli`

## Problem and user impact

CLI emits a SARIF 2.1.0-shaped JSON document, but current tests parse JSON and check selected fields rather than validating the document against the SARIF schema. Invalid properties or path URI edge cases could break CI consumers despite passing local tests.

## Steps to reproduce

1. Run a fixture audit using `--format sarif`.
2. Validate the generated document with a SARIF 2.1.0 schema validator.
3. Include hostile Unicode/control characters and Windows/POSIX evidence paths in the fixture.

## Expected behavior: every supported finding state produces schema-valid SARIF with safe, correctly encoded locations and stable rule identifiers.

## Actual behavior: current tests assert version, selected levels/rule IDs, JSON parsing, and one hostile relative URI but do not perform schema validation.

## Scope

Likely files: `src/output.ts`, `test/cli.test.mjs`, `package.json`/lockfile if a development-only validator is justified, and main `docs/SARIF.md`.

## Acceptance criteria:

- Automated validation checks SARIF 2.1.0 for empty, pass, fail, unknown, and not-applicable cases.
- Paths with spaces, percent signs, Unicode, control characters, POSIX roots, and Windows drive roots map to valid artifact URIs.
- Rule/result IDs, severity, explanations, score metadata, and false-negative caveats remain deterministic and escaped.
- The validator is development-only, pinned, and does not introduce a runtime dependency or network requirement in ordinary tests.
- If a valid representation cannot be supported, remove the corresponding documented claim instead of weakening validation.

## Required tests

Schema validation plus CLI golden-output and escaping regressions; `npm run verify`.

## Expected output

Deterministic schema-valid SARIF 2.1.0 accepted by a standards-compatible consumer.

## Security considerations

Treat all evidence/path text as hostile; never include credentials; keep JSON escaping and terminal sanitization separate.

## Difficulty / dependencies

Difficulty: medium. Depends on selecting an offline-capable pinned schema validator.

## Out of scope

Uploading results to GitHub, creating code-scanning alerts, or changing rule severity policy.

## Definition of done:

Validator setup, docs, changelog, regression fixtures, and CI checks pass with no runtime dependency change.
