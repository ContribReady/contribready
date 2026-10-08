# SARIF Output

`contribready audit` and `contribready issue` accept `--format sarif` as an explicit opt-in output mode. The result is SARIF 2.1.0 JSON suitable for CI/code-scanning ingestion.

- `fail` findings map to SARIF `error` results.
- `unknown` findings map to `warning` results.
- `pass` findings map to `note` results.
- `not-applicable` findings are excluded from results but remain represented in score properties.
- Rule IDs, areas, versions, descriptions, recommendations, scores, and report subject are preserved.
- Evidence sources become artifact locations only when they are non-remote paths; GitHub URLs are not fabricated into file locations.
- JSON and text output remain unchanged.

SARIF is a representation of static ContribReady findings. It does not mean target code, tests, workflows, or package scripts were executed.
