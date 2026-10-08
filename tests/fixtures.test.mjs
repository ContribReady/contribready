import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixture = (name) => join(root, "fixtures", name);

test("fixture corpus is complete and self-contained", () => {
  const required = [
    "excellent-repository/README.md",
    "poor-repository/README.md",
    "missing-repository/marker.txt",
    "contradictory-repository/README.md",
    "issues/complete.md",
    "issues/vague.md",
    "github/issue-42.json",
    "github/repository.json",
    "github/tree.json",
  ];
  for (const path of required) assert.equal(existsSync(fixture(path)), true, path);
  assert.match(readFileSync(fixture("issues/complete.md"), "utf8"), /Acceptance criteria/);
  assert.match(readFileSync(fixture("issues/vague.md"), "utf8"), /Please fix this soon/);
});
