import { describe, expect, it } from "vitest";
import { wordDiff, type ContentFinding } from "./alignUnits.ts";
import { changeTypesOf } from "./changeTypes.ts";

function changed(hugoText: string, astroText: string): ContentFinding {
  return {
    kind: "changed",
    unitKind: "tableRow",
    locationKey: "v1/response/200/model",
    hugoText,
    astroText,
    diff: wordDiff(hugoText, astroText),
  };
}

describe("changeTypesOf", () => {
  it("recognizes an added default", () => {
    expect(
      changeTypesOf(
        changed(
          "sort | enum | Order. Allowed values: asc, desc.",
          "sort | enum | Order. Allowed values: asc, desc. Default: desc.",
        ),
      ),
    ).toEqual(["astro-adds-default"]);
  });

  it("recognizes an added read-only marker", () => {
    expect(
      changeTypesOf(
        changed("id | string | ID.", "id | string | ID. Read-only."),
      ),
    ).toEqual(["astro-adds-read-only"]);
  });

  it("recognizes different enum values", () => {
    expect(
      changeTypesOf(
        changed(
          "span | enum | Span. Allowed values: 1m, 1w.",
          "span | enum | Span. Allowed values: 1m, 1w, 1mo.",
        ),
      ),
    ).toEqual(["enum-values-differ"]);
  });

  it("recognizes a deprecated marker one side lacks", () => {
    expect(
      changeTypesOf(
        changed(
          "query | object | The query. Deprecated.",
          "query | object | The query.",
        ),
      ),
    ).toEqual(["deprecated-marker-differs"]);
  });

  it("combines types when several explain the change", () => {
    expect(
      changeTypesOf(
        changed(
          "span | enum | Span. Allowed values: 1m.",
          "span | enum | Span. Allowed values: 1m, 1w. Default: 1m.",
        ),
      ),
    ).toEqual(["astro-adds-default", "enum-values-differ"]);
  });

  it("adds other when something else changed too", () => {
    expect(
      changeTypesOf(
        changed(
          "query | object | Deprecated - Use formulas instead. Deprecated.",
          "query | object | The log query.",
        ),
      ),
    ).toEqual(["deprecated-marker-differs", "other"]);
  });

  it("compares the rewritten texts the diff was built from", () => {
    const finding = {
      ...changed(
        "a | enum | A. Allowed values: x.",
        "a | enum | A. Allowed values: x. Default: x.",
      ),
      hugoText: "a | enum | A. Allowed enum values: x",
    };
    expect(changeTypesOf(finding)).toEqual(["astro-adds-default"]);
  });
});
