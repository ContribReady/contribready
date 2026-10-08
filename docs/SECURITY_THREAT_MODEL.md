# Security Threat Model

Phase 10 records the security boundary for local and GitHub-backed audits. ContribReady treats repository files, issue Markdown, GitHub responses, paths, URLs, and environment variables as untrusted input.

| Threat | Control | Verification |
|---|---|---|
| Target code or package scripts execute | Only bounded text files are read; no shell, package manager, test runner, workflow, or import is invoked. | Local audit tests and static CLI design |
| Filesystem traversal or symlink escape | Root is resolved; traversal is bounded by depth, file count, per-file bytes, and total bytes; symlink entries are skipped. | Evidence discovery tests |
| Oversized local or remote content exhausts resources | Local files are capped at 256 KiB, 512 files, and 8 MiB total. GitHub files use the same per-file/total limits; GitHub JSON is capped at 4 MiB after parsing and by declared response length when available. | Local and GitHub size-limit tests |
| Markdown or repository text acts as instructions | Text is normalized as evidence only. URLs, commands, code blocks, and workflow text are never executed. | Issue and repository tests |
| Terminal escape/control injection | Human output removes ANSI/control characters and caps rendered text. JSON uses `JSON.stringify` encoding. | Human-output abuse test |
| Token disclosure | Only `GITHUB_TOKEN` is read; credentials are sent in an authorization header, are size-bounded, and are excluded from normalized evidence and error messages. | Token/header and error-redaction tests |
| SSRF or arbitrary remote host access | GitHub URLs require HTTPS and the exact `github.com` host; API requests use the fixed `https://api.github.com` origin; redirects are rejected. | URL parser tests and fixed adapter endpoint |
| Private or unavailable repository ambiguity | 404 responses use a generic private-or-not-found error; 401/403/429 responses map to stable auth/rate-limit errors. | Mocked HTTP status tests |
| Hanging or unreliable network | GitHub requests use a ten-second abort deadline and stable network errors. | Transport contract and timeout implementation |
| Reports imply more than static evidence proves | Findings describe documented evidence only; tests and CI are never executed or claimed to pass. | Requirements and rule contracts |

## Residual risks

- The default runtime `fetch` implementation remains responsible for TLS and DNS verification.
- A remote API response may be parsed before the post-parse JSON-size check when the server omits `Content-Length`; the parsed object is immediately rejected above the limit. A streaming transport can replace this in a later hardening phase.
- GitHub retrieval is opt-in through an explicit URL. Local-path commands remain network-free.

Phase 10 does not add a GitHub repository. The adapter remains CLI-owned until independent reuse, release, and ownership requirements justify a boundary.
