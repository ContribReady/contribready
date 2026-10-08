# Security

Report vulnerabilities privately to the project maintainers. Do not include secrets in issues. The project defaults to static analysis and does not execute target repository code.

The current security controls and residual risks are documented in [docs/SECURITY_THREAT_MODEL.md](docs/SECURITY_THREAT_MODEL.md). GitHub access is opt-in, limited to canonical HTTPS GitHub URLs, and uses `GITHUB_TOKEN` only as an authorization header. Tokens, issue instructions, repository commands, and workflow content are never executed or included in reports.
