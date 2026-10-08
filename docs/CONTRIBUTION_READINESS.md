# Contribution Documentation Rules

Phase 6 evaluates whether an outsider can understand how to contribute, submit a pull request, work through review, and ask for help safely. It inspects static documentation and policy files; it does not contact maintainers or submit changes.

| Rule | Evidence | Pass | Fail/unknown behavior |
| --- | --- | --- | --- |
| `CR-CONTRIB-001` | `CONTRIBUTING.md` | Contribution guidance exists | Fails when the file is missing |
| `CR-CONTRIB-002` | CONTRIBUTING/README/docs text | Branch, commit, PR, or change-submission workflow is described | Fails when CONTRIBUTING exists without workflow guidance; unknown without CONTRIBUTING |
| `CR-CONTRIB-003` | CONTRIBUTING/README/docs text | Review, approval, checks, or maintainer expectations are described | Fails when CONTRIBUTING exists without review guidance; unknown without CONTRIBUTING |
| `CR-CONTRIB-004` | `SUPPORT.md` or contributor-facing text | A support, discussion, help, or maintainer-contact path exists | Unknown when a guide exists but no path is found; not applicable without contributor-facing guidance |
| `CR-SECURITY-001` | `SECURITY.md` | A vulnerability reporting path exists | Fails when SECURITY.md is missing |

A passing result means the relevant evidence was found. It does not prove that maintainers respond, that a pull request will be accepted, or that the support channel is active.
