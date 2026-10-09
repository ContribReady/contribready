# Security

The project defaults to static analysis and does not execute target repository code. Do not post vulnerability details in a public issue. GitHub private vulnerability reporting is not enabled for the main, Core, or CLI repositories at present, and no verified private contact address is published. A maintainer must enable private vulnerability reporting for all three repositories or publish a verified private contact route before external security review.

The current security controls and residual risks are documented in [docs/SECURITY_THREAT_MODEL.md](docs/SECURITY_THREAT_MODEL.md). GitHub access is opt-in, limited to canonical HTTPS GitHub URLs, and uses `GITHUB_TOKEN` only as an authorization header. Tokens, issue instructions, repository commands, and workflow content are never executed or included in reports.
