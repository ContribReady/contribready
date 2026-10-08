# Optional Isolated Execution Design

Phase 15 freezes the design boundary for any future dynamic verification. No isolated execution is implemented or enabled by this phase.

## Non-goals for v1

- Do not execute target repository code, package scripts, tests, workflows, containers, or issue-provided commands.
- Do not install target dependencies from an audit command.
- Do not treat sandboxing as permission to contact arbitrary hosts or expose credentials.

## Future prerequisites

Any proposal must first specify the trust boundary, isolated runtime, filesystem/network policy, CPU/memory/time limits, dependency provenance, secret handling, output capture/redaction, platform behavior, cancellation, and reproducible fixtures. It must be opt-in, separately permissioned, independently tested, and disabled for untrusted remote content by default.

The current static evidence engine and SARIF/reporting paths remain the v1 baseline. Dynamic execution cannot be added as an incidental implementation detail or folded into Core.
