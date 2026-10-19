# Keep GitHub request deadlines active through bounded response parsing

**Repository:** `ContribReady/contribready-cli`

## Problem and user impact

The GitHub adapter applies an AbortController deadline while awaiting `fetch`, then clears the timer as soon as response headers arrive. A server that slowly streams a body can therefore outlive the intended ten-second deadline. Existing tests cover size bounds and malformed responses but not delayed body streams.

## Steps to reproduce

1. Use the GitHub adapter with a fetcher that resolves headers promptly and returns a response body stream that never completes.
2. Call a repository or issue retrieval function.
3. Observe that the request may remain pending after the documented timeout.

## Expected behavior: a single bounded deadline covers fetch and body consumption; timeout cancels the body and returns a stable NETWORK error without token disclosure.

## Actual behavior: the current timer is cleared after fetch resolves, before streamed response bytes are read.

## Scope

Likely files: `src/github/index.ts`, `test/github-url.test.mjs`, and `README.md`/`SECURITY.md` timeout wording.

## Acceptance criteria:

- Response streaming is subject to a documented deadline and total byte limit before JSON parsing.
- Timeout cancels/releases the stream and returns a stable error without stack trace, response body, or credential.
- Tests cover stalled headers, stalled body, oversized streamed body, malformed UTF-8/JSON, and cancellation.
- Existing private/unavailable, rate-limit, redirect-refusal, and token-redaction tests remain passing.
- The timeout applies equally to issue and repository endpoints.

## Required tests

Mocked fetch and ReadableStream regression tests; `npm run verify`.

## Expected output

Each stalled fetch terminates at the documented boundary with a machine-readable NETWORK error; no response content or token appears.

## Security considerations

Do not log raw GitHub responses or credentials. Preserve redirect refusal and static evidence filtering.

## Difficulty / dependencies

Difficulty: medium. Depends on a cancellable stream API and consistent Node 20+ behavior.

## Out of scope

Retry loops, arbitrary host support, broad repository-content downloads, or increasing response limits.

## Definition of done:

Transport limits and error mapping are documented, regression tests pass on Node 20/22/24, and Core remains transport-independent.
