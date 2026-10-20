import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

const currentStateFiles = [
  "README.md",
  "PROJECT_STATE.md",
  "CONTRIBUTING.md",
  "docs/COMPATIBILITY.md",
  "docs/GRANT_SUBMISSION.md",
  "docs/EXTERNAL_EVIDENCE_AND_RELEASE_REVIEW_20261020.md",
];

const staleCurrentClaims = [
  /packages? (?:are|is|remain) unpublished/i,
  /neither (?:package|core|cli).*published/i,
  /no package is published/i,
  /public `?npx`? is unavailable/i,
  /CLI\/main PRs? remain unmerged/i,
  /awaits cross-platform CI/i,
  /npm authentication returned `?E401/i,
  /authentication has since expired/i,
];

test("current-state documentation contains no superseded release claims", async () => {
  for (const relativePath of currentStateFiles) {
    const source = await readFile(path.join(root, relativePath), "utf8");
    for (const pattern of staleCurrentClaims) {
      assert.doesNotMatch(source, pattern, `${relativePath} contains stale claim ${pattern}`);
    }
  }
});

test("project state records the verified public release", async () => {
  const source = await readFile(path.join(root, "PROJECT_STATE.md"), "utf8");
  assert.match(source, /@contribready\/core@0\.1\.0.*public on npm/i);
  assert.match(source, /@contribready\/cli@0\.1\.0.*public on npm/i);
  assert.match(source, /npx --yes @contribready\/cli audit \./);
  assert.match(source, /execution: not-run/);
});

test("dated reviews declare that their status is historical", async () => {
  for (const relativePath of [
    "AUDIT_REPORT.md",
    "docs/READINESS_REVIEW_20261018.md",
    "docs/CONTRIBUTOR_WALKTHROUGH_20261019.md",
  ]) {
    const source = await readFile(path.join(root, relativePath), "utf8");
    assert.match(source.slice(0, 900), /Historical snapshot/);
    assert.match(source.slice(0, 900), /PROJECT_STATE\.md/);
  }
});
