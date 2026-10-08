# Testing and Reproduction Readiness Rules

Phase 5 evaluates whether a contributor can run validation, reproduce a behavior, understand automated checks, and recognize a successful result. It inspects documentation and static repository evidence; it never runs the target test suite.

| Rule | Evidence | Pass | Unknown/not-applicable |
| --- | --- | --- | --- |
| `CR-TEST-001` | README, docs, manifests, or test evidence | A supported test command or explicit test instruction is present | Unknown when no command is found |
| `CR-TEST-002` | README, CONTRIBUTING, or documentation | Reproduction steps, a minimal example/fixture, or expected/actual behavior guidance is present | Unknown with a guide but no reproduction guidance; not applicable without a guide |
| `CR-TEST-003` | `.github/workflows/*` or CI documentation | A CI workflow or CI guidance is discoverable | Unknown when no CI evidence is present |
| `CR-TEST-004` | Documentation or test evidence | Expected results, test environment/data, fixtures, assertions, or verification criteria are stated | Unknown when a test command exists without expectations; not applicable without a test command |

A passing result means the relevant evidence was found. It does not prove tests pass, CI is healthy, or reproduction is successful. Those claims require execution or external observation and are outside the static v0.1 audit.
