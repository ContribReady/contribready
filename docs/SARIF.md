# SARIF Output

`contribready audit` and `contribready issue` accept `--format sarif` as an explicit opt-in output mode. Output is tested against the OASIS SARIF 2.1.0 schema incorporating Approved Errata 01 using a pinned local schema and development-only Ajv draft-04 validator. Coverage includes empty results, pass/fail/unknown/not-applicable findings, deterministic rule/result mapping, Unicode/control characters, and POSIX/Windows/relative artifact URIs. The schema copy's official source and SHA-256 are recorded in `test/schemas/README.md`; validation runs offline. This verifies structural schema conformance for the tested documents, not compatibility with every code-scanning consumer.

- `fail` findings map to SARIF `error` results.
- `unknown` findings map to `warning` results.
- `pass` findings map to `note` results.
- `not-applicable` findings are excluded from results but remain represented in score properties.
- Rule IDs, areas, versions, descriptions, recommendations, scores, and report subject are preserved.
- Evidence sources become artifact locations only when they are non-remote paths; GitHub URLs are not fabricated into file locations.
- JSON and text output remain separate from SARIF serialization; SARIF's `$schema` points to the OASIS Errata 01 schema URI.

SARIF is a representation of static ContribReady findings. It does not mean target code, tests, workflows, or package scripts were executed. The percentage and determinate coverage are rule-derived, and neither implies objective repository quality or contributor success.
