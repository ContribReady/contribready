# ContribReady documentation

This folder contains the product-level documentation for the ContribReady repository. Start from the main [README](../README.md) when you need the product overview.

For the current source-level, security, packaging, and submission decision, start with the [2026-10-18 readiness review](READINESS_REVIEW_20261018.md), the [2026-10-19 clean-checkout contributor walkthrough](CONTRIBUTOR_WALKTHROUGH_20261019.md), and the [2026-10-20 external evidence and release review](EXTERNAL_EVIDENCE_AND_RELEASE_REVIEW_20261020.md). Older phase/audit reports are historical artifacts and are not current proof of readiness.

## Find your way

| Need | Read |
|---|---|
| Understand the product | [Project charter](PROJECT_CHARTER.md) · [Requirements](REQUIREMENTS.md) · [Architecture](ARCHITECTURE.md) |
| Understand the repositories | [Repository map](REPOSITORY_MAP.md) · [Compatibility](COMPATIBILITY.md) |
| Understand the audit model | [Rule catalog](RULE_CATALOG.md) · [Scoring](SCORING.md) · [Report schema](REPORT_SCHEMA.md) |
| Understand contributor readiness | [Setup](SETUP_READINESS.md) · [Testing](TESTING_READINESS.md) · [Contribution](CONTRIBUTION_READINESS.md) · [Issue readiness](ISSUE_READINESS.md) |
| Review safety | [Threat model](SECURITY_THREAT_MODEL.md) · [Security policy](SECURITY.md) · [Isolated execution design](ISOLATED_EXECUTION_DESIGN.md) |
| Run or verify the project | [Development model](DEVELOPMENT_MODEL.md) · [Demo](DEMO.md) · [Fixture catalog](FIXTURE_CATALOG.md) |
| Review or prepare a release | [Release process](RELEASE_PROCESS.md) · [SARIF output](SARIF.md) · [External contributor audit](EXTERNAL_CONTRIBUTOR_AUDIT.md) · [External evidence and package status](EXTERNAL_EVIDENCE_AND_RELEASE_REVIEW_20261020.md) |
| Prepare external review or funding | [Grant submission](GRANT_SUBMISSION.md) · [Final audit](../FINAL_AUDIT.md) |

## Documentation rule

Product-level decisions, contracts, release coordination, and reviewer guidance belong here. Implementation-specific API details belong in the Core or CLI repository that owns them. This keeps the main repository useful as the product entry point without turning supporting repositories into arbitrary subfolders.
