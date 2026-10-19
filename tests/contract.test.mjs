import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const coreRoot = resolve(process.env.CONTRIBREADY_CORE_PATH ?? join(root, "..", "contribready-core"));
const cliRoot = resolve(process.env.CONTRIBREADY_CLI_PATH ?? join(root, "..", "contribready-cli"));
const [{ coreRules, evaluateRules, makeReport }, { loadIssue, loadRepository }, { runCli }, { loadGithubIssue, loadGithubRepository }, { renderReport }] = await Promise.all([
  import(pathToFileURL(join(coreRoot, "dist", "index.js")).href),
  import(pathToFileURL(join(cliRoot, "dist", "input.js")).href),
  import(pathToFileURL(join(cliRoot, "dist", "index.js")).href),
  import(pathToFileURL(join(cliRoot, "dist", "github", "index.js")).href),
  import(pathToFileURL(join(cliRoot, "dist", "output.js")).href),
]);
const fixtures = join(root, "fixtures");
const matrix = JSON.parse(readFileSync(join(fixtures, "evaluation-matrix.json"), "utf8"));
const matrixExpected = JSON.parse(readFileSync(join(fixtures, "evaluation-matrix.expected.json"), "utf8"));
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
  assert.equal(excellent.score.coveragePercentage, 100);
  assert.equal(poor.findings.some((finding) => finding.outcome === "fail"), true);
  assert.equal(poor.score.percentage < excellent.score.percentage, true);
  assert.equal(missing.findings.filter((finding) => finding.outcome === "fail").length >= 3, true);
  assert.equal(contradictory.findings.length, excellent.findings.length);
  assert.deepEqual(contradictory, repositoryReport("contradictory-repository"));
  assert.equal(contradictory.findings.some((finding) => finding.evidence.some((item) => item.source === "README.md")), true);
  const runtime = contradictory.findings.find((finding) => finding.rule.id === "CR-SETUP-002");
  assert.equal(runtime.outcome, "unknown");
  assert.equal(runtime.conflictsAssessed, true);
  assert.deepEqual(runtime.conflictingEvidence.map((item) => item.source), [".github/workflows/ci.yml", "CONTRIBUTING.md", "README.md"]);
  assert.equal(contradictory.findings.filter((finding) => finding.rule.id !== "CR-SETUP-002").every((finding) => finding.conflictsAssessed === false), true);
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
  assert.equal(cliReport.schemaVersion, 2);
  assert.equal(cliReport.score.scoringVersion, 2);
});

function fixtureResponse(value) {
  const body = JSON.stringify(value);
  return { status: 200, headers: { get: (name) => name.toLowerCase() === "content-length" ? String(new TextEncoder().encode(body).byteLength) : null }, text: async () => body };
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

test("labeled evaluation matrix pins findings, scores, coverage, recommendations, outputs, and exit codes", () => {
  assert.equal(matrix.repositoryCases.length, 23);
  assert.equal(matrix.issueCases.length, 2);
  assert.equal(matrix.securityCases.length, 7);
  assert.deepEqual(matrixExpected.cases.map((item) => item.id), [...matrix.repositoryCases, ...matrix.issueCases].map((item) => item.id));
  assert.deepEqual(matrixExpected.repositoryRuleOrder, repositoryRules.map((rule) => rule.metadata.id));
  assert.deepEqual(matrixExpected.issueRuleOrder, issueRules.map((rule) => rule.metadata.id));

  const codeToOutcome = matrixExpected.outcomeCodes;
  for (const scenario of matrix.repositoryCases) {
    const target = mkdtempSync(join(tmpdir(), `contribready-matrix-${scenario.id}-`));
    for (const [relativePath, content] of Object.entries(scenario.files)) {
      const path = join(target, relativePath);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, content, "utf8");
    }
    assertMatrixCase(scenario.id, target, "repository", codeToOutcome);
  }
  for (const scenario of matrix.issueCases) {
    const target = join(mkdtempSync(join(tmpdir(), `contribready-matrix-${scenario.id}-`)), "issue.md");
    writeFileSync(target, `# ${scenario.title}\n\n${scenario.body}`, "utf8");
    assertMatrixCase(scenario.id, target, "issue", codeToOutcome);
  }
});

function assertMatrixCase(id, target, kind, codeToOutcome) {
  const expected = matrixExpected.cases.find((item) => item.id === id);
  assert.ok(expected, `missing expected result for ${id}`);
  const command = kind === "repository" ? "audit" : "issue";
  const report = kind === "repository"
    ? makeReport("repository", evaluateRules({ repository: loadRepository(target) }, repositoryRules))
    : makeReport("issue", evaluateRules({ issue: loadIssue(target) }, issueRules));
  const rules = kind === "repository" ? matrixExpected.repositoryRuleOrder : matrixExpected.issueRuleOrder;
  const actualOutcomes = report.findings.map((finding) => [finding.rule.id, finding.outcome]);
  const expectedOutcomes = [...expected.outcomes].map((code, index) => [rules[index], codeToOutcome[code]]);
  assert.deepEqual(actualOutcomes, expectedOutcomes, `${id}: rule outcomes`);
  assert.equal(report.score.percentage, expected.score, `${id}: score`);
  assert.equal(report.score.coveragePercentage, expected.coverage, `${id}: evidence coverage`);
  assert.equal(report.score.unknownRules, expected.unknown, `${id}: unknown count`);
  assert.equal(report.score.notApplicableRules, expected.notApplicable, `${id}: N/A count`);
  assert.equal(report.recommendations.length, expected.recommendations, `${id}: recommendation count`);

  const run = (format, strict = false) => {
    const stdout = [];
    const code = runCli([command, target, "--format", format, ...(strict ? ["--strict"] : [])], { stdout: (value) => stdout.push(value), stderr: () => {} });
    return { code, output: stdout.join("") };
  };
  const json = run("json");
  assert.equal(json.code, 0, `${id}: ordinary JSON exit`);
  assert.equal(json.output, run("json").output, `${id}: deterministic JSON`);
  const parsed = JSON.parse(json.output);
  assert.deepEqual(parsed.findings.map((finding) => [finding.rule.id, finding.outcome]), expectedOutcomes, `${id}: serialized findings`);
  assert.equal(parsed.score.percentage, expected.score, `${id}: serialized score`);
  assert.equal(parsed.score.coveragePercentage, expected.coverage, `${id}: serialized coverage`);
  assert.equal(parsed.recommendations.length, expected.recommendations, `${id}: serialized recommendations`);
  assert.equal(run("json", true).code, expected.strictExit, `${id}: strict exit`);
  const textOutput = run("text").output;
  assert.match(textOutput, new RegExp(`Score: ${expected.score}%`), `${id}: text score`);
  assert.match(textOutput, new RegExp(`Determinate coverage: ${expected.coverage}%`), `${id}: text coverage`);
  const sarifText = renderReport(report, "sarif", target);
  assert.equal(sarifText, renderReport(report, "sarif", target), `${id}: deterministic SARIF`);
  const sarif = JSON.parse(sarifText);
  assert.equal(sarif.version, "2.1.0", `${id}: SARIF version`);
  assert.deepEqual(sarif.runs[0].results.map((result) => result.ruleId), report.findings.filter((finding) => finding.outcome !== "not-applicable").map((finding) => finding.rule.id), `${id}: SARIF findings`);
}
