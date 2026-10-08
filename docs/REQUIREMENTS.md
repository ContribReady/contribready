# Requirements

## Functional

The system MUST audit a local repository, analyze local Markdown issues, emit human and JSON reports, identify evidence locations, apply versioned rules, show recommendations, and distinguish pass/fail/unknown/not-applicable. GitHub retrieval is optional and isolated.

When a canonical HTTPS GitHub repository or issue URL is supplied, the CLI MAY perform opt-in REST retrieval. Repository retrieval MUST select only bounded contributor-relevant evidence, and issue retrieval MUST normalize title/body text without executing Markdown. Authentication MUST use `GITHUB_TOKEN` only when present, MUST never be printed, and MUST NOT be included in normalized evidence. Private/unavailable resources, authentication failures, rate limits, timeouts, and other network failures MUST produce stable structured errors. Local path commands MUST remain network-free.

Repository evidence discovery MUST be deterministic, relative-path based, bounded by file count/size/depth, and limited to contributor-relevant categories. Unknown source files must not be read merely because they exist.

Testing readiness MUST distinguish evidence that a test command, reproduction path, CI workflow, and expected result are documented from evidence that tests actually execute or pass. Static audits MUST NOT imply runtime test success.

Contribution readiness MUST distinguish the existence of CONTRIBUTING.md from actionable pull-request and review guidance. Support/contact and vulnerability-reporting paths MUST remain separate concepts, and the audit MUST NOT claim that a maintainer will respond merely because a path is documented.

Issue readiness MUST normalize local Markdown into title/body evidence and separately report problem context, reproduction, expected behavior, technical scope, acceptance criteria, and definition of done. Missing issue sections MUST produce rule findings rather than silent success.

Reports MUST expose scoring version, category breakdowns, unknown/not-applicable counts, and deterministic recommendations. Unknown evidence MUST NOT silently earn points; recommendation order MUST be stable for identical findings.

The CLI MAY emit SARIF 2.1.0 as an explicit projection of the existing report. SARIF rule IDs and outcome levels MUST be stable; remote URLs MUST NOT be fabricated into local file locations. Ecosystem expansion MUST remain static and fixture-backed. GitHub issue metadata MAY be normalized additively, but it MUST NOT change existing rule semantics. Dynamic target execution remains out of scope until the isolated-execution design is separately approved.

## Safety

The default MUST NOT execute target code, install packages, follow arbitrary remote instructions, expose tokens, or treat issue text as instructions to the analyzer.

## Quality

Rules are deterministic and tested. Results are stable for identical inputs. Reports explain score components and never imply objective repository quality.
