import { describe, expect, it } from "vitest";
import {
  assertStagedExamplesPresent,
  getCodeExamplesForOperation,
} from "./codeExampleLoader";

/**
 * `CreateMonitor` is the fixture operation that carries both spellings of
 * Python and Ruby — `.py`/`.pybeta` and `.rb`/`.rbbeta`. Hugo treats each pair
 * as two distinct languages with their own tab (`code_languages` in
 * `hugo/config/_default/params.yaml`), and the live page renders all four.
 */
describe("getCodeExamplesForOperation", () => {
  const examples = getCodeExamplesForOperation(
    "CreateMonitor",
    "v1",
    "monitors",
  );

  it("renders legacy and modern examples as separate languages", () => {
    expect(examples.map((set) => set.language)).toEqual([
      "go",
      "python",
      "ruby",
      "python-legacy",
      "ruby-legacy",
    ]);
  });

  /**
   * Hugo's tab order, minus the Curl tab that `viewsBuilder` prepends and the
   * languages this operation's fixture does not carry: Go, Java, Python, Ruby,
   * Rust, Typescript, then every legacy language last.
   */
  it("orders tabs to match Hugo, with the legacy languages last", () => {
    expect(examples.map((set) => set.label)).toEqual([
      "Go",
      "Python",
      "Ruby",
      "Python [legacy]",
      "Ruby [legacy]",
    ]);
  });

  it("reads each language from its own extension", () => {
    const codeByLanguage = Object.fromEntries(
      examples.map((set) => [set.language, set.entries[0].code]),
    );

    // The beta SDK clients; the legacy files predate them.
    expect(codeByLanguage.python).toContain("from datadog_api_client import");
    expect(codeByLanguage.ruby).toContain('require "datadog_api_client"');
    expect(codeByLanguage["python-legacy"]).toContain(
      "from datadog import initialize, api",
    );
    expect(codeByLanguage["ruby-legacy"]).toContain("require 'dogapi'");
  });

  it("highlights a legacy example as its base language", () => {
    const pythonLegacy = examples.find(
      (set) => set.language === "python-legacy",
    );
    expect(pythonLegacy?.entries[0].syntax).toBe("python");
  });
});

/**
 * The glob that feeds the loader is the only source of example code, and an
 * empty match renders exactly like a corpus where no operation has examples:
 * every API page gets its Curl tab and nothing else, and the build succeeds.
 * This is the guard that turns that into a failure.
 */
describe("assertStagedExamplesPresent", () => {
  it("fails a production build with no staged examples", () => {
    expect(() => assertStagedExamplesPresent(0, true)).toThrow(
      /no api code examples/i,
    );
  });

  it("names the staging command in the failure", () => {
    expect(() => assertStagedExamplesPresent(0, true)).toThrow(
      /yarn fetch:examples/,
    );
  });

  /**
   * `yarn dev` stages with `--best-effort`, which downgrades an unreachable
   * network to a warning. Failing here would make the site undevelopable
   * offline.
   */
  it("allows a dev server with no staged examples", () => {
    expect(() => assertStagedExamplesPresent(0, false)).not.toThrow();
  });

  it("allows a production build that has examples", () => {
    expect(() => assertStagedExamplesPresent(13752, true)).not.toThrow();
  });
});
