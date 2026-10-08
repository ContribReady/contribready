# Setup Readiness Rules

Phase 4 evaluates whether an unfamiliar contributor can identify the path from checkout to a local development environment. It evaluates evidence; it does not run installation commands.

| Rule | Evidence | Pass | Fail/unknown behavior |
| --- | --- | --- | --- |
| `CR-SETUP-001` | README or CONTRIBUTING.md | A contributor-facing guide exists | Fails when neither exists |
| `CR-SETUP-002` | Contributor-facing text | A runtime/toolchain and version or prerequisite statement is present | Unknown when a guide exists but runtime evidence is absent; not applicable without a guide |
| `CR-SETUP-003` | Manifest/lockfile and documentation | An install/build command is documented | Fails when a supported manifest exists without an install command; unknown without a manifest |
| `CR-SETUP-004` | Contributor-facing text | Checkout/setup/local-development steps are described | Fails when a guide exists but actionable setup language is absent; unknown without a guide |
| `CR-SETUP-005` | `.env.example`, `.env.sample`, or environment/configuration text | Safe environment guidance or an example file exists | Not applicable when no environment requirement is evidenced |

These rules are deterministic heuristics. A pass means the expected evidence was found, not that the setup actually succeeds. Installation, scripts, tests, secrets, and arbitrary repository code are never executed by the audit.
