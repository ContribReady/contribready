# Security Threat Model

Phase 10 records the security boundary for local and GitHub-backed audits. ContribReady treats repository files, issue Markdown, GitHub responses, paths, URLs, and environment variables as untrusted input.

| Threat | Control | Verification |
|---|---|---|
| Target code or package scripts execute | Only bounded text files are read; no shell, package manager, test runner, workflow, or import is invoked. | Local audit tests and static CLI design |
| Filesystem traversal or symlink escape | Root is resolved; traversal is bounded by depth, file count, per-file bytes, and total bytes; symlink entries are skipped. | Evidence discovery tests |
| Oversized local or remote content exhausts resources | Local files are capped at 256 KiB, 512 evidence files, 8192 directory entries, depth 8, and 8 MiB total; accounting uses bytes read. GitHub JSON response bytes are capped at 4 MiB while consuming the normal streamed response, before JSON parsing; selected blobs have per-file and total caps. | Boundary, aggregate UTF-8, depth, count, entry, and remote-stream tests; platform-dependent symlink cases may skip |
| Markdown or repository text acts as instructions | Text is normalized as evidence only. URLs, commands, code blocks, and workflow text are never executed. | Issue and repository tests |
| Terminal escape/control injection | Human output removes ANSI/control characters and caps rendered text. JSON uses `JSON.stringify` encoding. | Human-output abuse test |
| Token disclosure | Only `GITHUB_TOKEN` is read; credentials are sent in an authorization header, are size-bounded, and are excluded from normalized evidence and error messages. | Token/header and error-redaction tests |
| SSRF or arbitrary remote host access | GitHub URLs require HTTPS and the exact `github.com` host; API requests use the fixed `https://api.github.com` origin; redirects are rejected. | URL parser tests and fixed adapter endpoint |
| Private or unavailable repository ambiguity | 404 responses use a generic private-or-not-found error; 401/403/429 responses map to stable auth/rate-limit errors. | Mocked HTTP status tests |
| Hanging or unreliable network | One ten-second abort deadline covers both response headers and body consumption; a stalled stream is cancelled and mapped to a stable network timeout error. | Mocked stalled-header and stalled-body deadline tests, including cancellation and credential redaction |
| Malformed response data | Remote response bytes are bounded before parse; UTF-8 decoding is fatal; malformed JSON and malformed metadata map to stable errors without returning raw content. | Malformed JSON, invalid UTF-8, size, and metadata tests |
| SARIF consumer/parser confusion | Output uses escaped URIs and a vendored, hash-pinned OASIS 2.1.0 Errata 01 schema validated in tests. | Offline Ajv draft-04 schema tests cover empty, mixed outcomes, and hostile paths |
| Reports imply more than static evidence proves | Findings describe documented evidence only; tests and CI are never executed or claimed to pass. | Requirements and rule contracts |

## Residual risks

- The default runtime `fetch` implementation remains responsible for TLS and DNS verification.
- Default Fetch responses are streamed and their raw UTF-8 bytes are bounded before parsing; a text-only custom fetcher fallback must materialize text before the size check and should be used only in bounded test adapters. Tests prove the deadline race and stream cancellation with mocked fetchers; live network failure behavior remains subject to the runtime fetch implementation.
- Local directory entries are capped and symlink entries are skipped, but Windows junction creation was unavailable in this audit account, and full link/file replacement race behavior is not verified here.
- GitHub retrieval is opt-in through an explicit URL. Local-path commands remain network-free.

Phase 10 does not add a GitHub repository. The adapter remains CLI-owned until independent reuse, release, and ownership requirements justify a boundary.
