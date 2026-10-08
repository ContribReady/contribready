import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { coreRules, evaluateRules, makeReport } from "../../contribready-core/dist/index.js";
import { loadIssue, loadRepository } from "../../contribready-cli/dist/input.js";
import { runCli } from "../../contribready-cli/dist/index.js";
import { loadGithubIssue, loadGithubRepository } from "../../contribready-cli/dist/github/index.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtures = join(root, "fixtures");
const repositoryRules = coreRules.filter((rule) => rule.metadata.area !== "issue");
const issueRules = coreRules.filter((rule) => rule.metadata.area === "issue");
const repositoryPath = (name) => join(fixtures, name);

function repositoryReport(name) {
  return makeReport("repository", evaluateRules({ repository: loadRepository(repositoryPath(name)) }, repositoryRules));
}

test("representative repository fixtures exercise quality bands", () => {
  const excellent = repositoryReport("excellent-repository");
  const poor = repositoryReport("poor-repository");
  const missing = repositoryReport("missing-repository");
  const contradictory = repositoryReport("contradictory-repository");

  assert.equal(excellent.findings.every((finding) => finding.outcome === "pass"), true);
  assert.equal(excellent.score.percentage, 100);
  assert.equal(poor.findings.some((finding) => finding.outcome === "fail"), true);
  assert.equal(poor.score.percentage < excellent.score.percentage, true);
  assert.equal(missing.findings.filter((finding) => finding.outcome === "fail").length >= 3, true);
  assert.equal(contradictory.findings.length, excellent.findings.length);
  assert.deepEqual(contradictory, repositoryReport("contradictory-repository"));
  assert.equal(contradictory.findings.some((finding) => finding.evidence.some((item) => item.source === "README.md")), true);
});

test("issue fixtures distinguish complete and vague requests", () => {
  const complete = loadIssue(join(fixtures, "issues", "complete.md"));
  const vague = loadIssue(join(fixtures, "issues", "vague.md"));
  const completeReport = makeReport("issue", evaluateRules({ issue: complete }, issueRules));
  const vagueReport = makeReport("issue", evaluateRules({ issue: vague }, issueRules));
  assert.equal(completeReport.findings.every((finding) => finding.outcome === "pass"), true);
  assert.equal(completeReport.score.percentage, 100);
  assert.equal(vagueReport.findings.every((finding) => finding.outcome === "fail"), true);
  assert.equal(vagueReport.score.percentage, 0);
});

test("CLI and Core share the same fixture findings and report contract", () => {
  const output = [];
  const code = runCli(["audit", repositoryPath("excellent-repository"), "--format", "json"], { stdout: (value) => output.push(value), stderr: () => {} });
  const cliReport = JSON.parse(output.join(""));
  assert.equal(code, 0);
  assert.equal(cliReport.score.percentage, repositoryReport("excellent-repository").score.percentage);
  assert.equal(cliReport.findings.length, repositoryReport("excellent-repository").findings.length);
  assert.equal(cliReport.schemaVersion, 1);
});

function fixtureResponse(value) {
  const body = JSON.stringify(value);
  return { status: 200, headers: { get: (name) => name.toLowerCase() === "content-length" ? String(body.length) : null }, json: async () => value };
}

test("GitHub API fixtures cross the adapter/Core boundary without reading source blobs", async () => {
  const readFixture = (name) => JSON.parse(readFileSync(join(fixtures, "github", name), "utf8"));
  const fetcher = async (url) => {
    if (url.endsWith("/repos/acme/project/issues/42")) return fixtureResponse(readFixture("issue-42.json"));
    if (url.endsWith("/repos/acme/project")) return fixtureResponse(readFixture("repository.json"));
    if (url.includes("/git/trees/main")) return fixtureResponse(readFixture("tree.json"));
    if (url.endsWith("/git/blobs/readme")) return fixtureResponse(readFixture("blob-readme.json"));
    if (url.endsWith("/git/blobs/contributing")) return fixtureResponse(readFixture("blob-contributing.json"));
    throw new Error(`unexpected fixture URL: ${url}`);
  };
  const issue = await loadGithubIssue("https://github.com/acme/project/issues/42", { fetcher });
  const repository = await loadGithubRepository("https://github.com/acme/project", { fetcher });
  assert.equal(issue.title, "Parser fails on empty input");
  assert.deepEqual(Object.keys(repository.files), ["CONTRIBUTING.md", "README.md"]);
  assert.equal(repository.files["src/secret.ts"], undefined);
});
