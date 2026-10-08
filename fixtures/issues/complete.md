# Parser fails on empty input

Context: the parser crashes for an empty document because the input guard is missing.

Steps to reproduce:
1. Run `npm test`.
2. Use the empty fixture.

Expected behavior: return an empty result. Actual behavior: the parser throws an error.

Affected module: `src/parser`.

Acceptance criteria:
- The empty fixture returns an empty result.
- Existing inputs remain unchanged.

Definition of done: tests pass and documentation is updated.
