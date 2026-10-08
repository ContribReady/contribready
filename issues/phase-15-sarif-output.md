# Add SARIF output for CI and code-scanning workflows

## Problem

ContribReady currently emits human-readable text and versioned JSON, but teams running contributor-readiness checks in CI cannot upload findings to SARIF-compatible code-scanning interfaces.

## Steps to reproduce

1. Run `contribready audit ./repository --format json`.
2. Attempt to consume the result as SARIF 2.1.0 in a code-scanning workflow.
3. Observe that the current report is ContribReady JSON rather than SARIF.

## Expected and observed behavior

Expected behavior: an explicit opt-in output format produces valid SARIF 2.1.0 with stable rule identifiers, levels, locations where available, and remediation text. Observed behavior: only `text` and `json` formats are supported.

## Technical scope

Affected areas: CLI argument parsing/output, report mapping, schema documentation, and CLI tests. Core report contracts must remain unchanged unless a documented additive field is required.

## Acceptance criteria

- `--format sarif` is opt-in and leaves text/JSON output unchanged.
- Output validates as SARIF 2.1.0 and maps every finding to a stable rule identifier.
- Evidence paths become locations when available; remote issue evidence remains safely represented without fabricated file paths.
- Control-character and token-redaction guarantees remain intact.
- CLI integration tests cover empty, pass, fail, unknown, and not-applicable findings.

## Definition of done

The CLI README, report schema, architecture, changelog, tests, and compatibility documentation are updated; `npm run verify` passes; and a fixture-based SARIF validation check is recorded.
