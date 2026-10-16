import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  alignUnits,
  malformedUnitFindings,
  wordDiff,
  wordSimilarity,
  type ContentFinding,
} from "./alignUnits.ts";
import {
  extractUnits,
  locationKeyOf,
  type ContentUnit,
  type UnitKind,
  type UnitLocation,
} from "./extractUnits.ts";
import { normalizeMarkdown } from "./normalize.ts";

function unit(
  kind: UnitKind,
  location: UnitLocation,
  text: string,
  extra: Partial<ContentUnit> = {},
): ContentUnit {
  return {
    kind,
    location,
    locationKey: locationKeyOf(location),
    text,
    ...extra,
  };
}

function unitsOfFixture(name: string): ContentUnit[] {
  const markdown = readFileSync(
    path.join(import.meta.dirname, "fixtures", name),
    "utf8",
  );
  return extractUnits(normalizeMarkdown(markdown));
}

const overview = { version: "v1", section: "overview" };

describe("wordSimilarity", () => {
  it("is 1 for identical text and 0 for disjoint text", () => {
    expect(wordSimilarity("a b c", "a b c")).toBe(1);
    expect(wordSimilarity("a b c", "x y z")).toBe(0);
  });

  it("scores shared words in order", () => {
    expect(wordSimilarity("a b c d", "a b c e")).toBe(0.75);
  });
});

describe("wordDiff", () => {
  it("marks deleted and inserted words, merging runs", () => {
    expect(wordDiff("a b c d", "a x y d")).toEqual([
      { op: "equal", text: "a" },
      { op: "delete", text: "b c" },
      { op: "insert", text: "x y" },
      { op: "equal", text: "d" },
    ]);
  });
});

describe("alignUnits", () => {
  it("reports nothing when both sides have the same units in any order", () => {
    const hugoUnits = [
      unit("prose", overview, "One."),
      unit("prose", overview, "Two."),
    ];
    const astroUnits = [
      unit("prose", overview, "Two."),
      unit("prose", overview, "One."),
    ];
    expect(alignUnits(hugoUnits, astroUnits)).toEqual([]);
  });

  it("reports Hugo-only units as missing and Astro-only units as extra", () => {
    const findings = alignUnits(
      [unit("prose", overview, "Only in Hugo, about keys.")],
      [unit("prose", overview, "Only in Astro, unrelated words here.")],
    );
    expect(findings).toEqual([
      expect.objectContaining({
        kind: "missing-in-astro",
        locationKey: "v1/overview",
        unitKind: "prose",
        hugoText: "Only in Hugo, about keys.",
      }),
      expect.objectContaining({
        kind: "extra-in-astro",
        locationKey: "v1/overview",
        astroText: "Only in Astro, unrelated words here.",
      }),
    ]);
  });

  it("does not pair units across locations or kinds", () => {
    const findings = alignUnits(
      [unit("prose", overview, "Same text.")],
      [
        unit("prose", { version: "v2", section: "overview" }, "Same text."),
        unit("label", overview, "Same text."),
      ],
    );
    expect(findings.map((finding) => finding.kind)).toEqual([
      "missing-in-astro",
      "extra-in-astro",
      "extra-in-astro",
    ]);
  });

  it("pairs similar units as changed, with a word diff", () => {
    const [finding] = alignUnits(
      [unit("prose", overview, "Get all the dashboards in your organization.")],
      [unit("prose", overview, "Get all the dashboards in the organization.")],
    );
    expect(finding).toMatchObject({
      kind: "changed",
      hugoText: "Get all the dashboards in your organization.",
      astroText: "Get all the dashboards in the organization.",
    });
    expect(finding.similarity).toBeGreaterThanOrEqual(0.8);
    expect(finding.diff).toContainEqual({ op: "delete", text: "your" });
  });

  it("pairs schema rows by field even when the text differs a lot", () => {
    const model = {
      version: "v1",
      section: "response",
      panel: "model" as const,
    };
    const [finding] = alignUnits(
      [unit("tableRow", model, "id | string | ID.", { field: "id" })],
      [
        unit("tableRow", model, "id | int64 | The dashboard identifier.", {
          field: "id",
        }),
      ],
    );
    expect(finding).toMatchObject({ kind: "changed", field: "id" });
  });

  it("flags Hugo code merged into the paragraph before it as hugo-malformed", () => {
    const python = {
      version: "v1",
      section: "code-example",
      language: "python",
    };
    const findings = alignUnits(
      [unit("prose", python, "Run the following commands: python3 example.py")],
      [
        unit("prose", python, "Run the following commands:"),
        unit("code", python, "python3 example.py"),
      ],
    );
    expect(findings).toEqual([
      expect.objectContaining({
        kind: "hugo-malformed",
        reason: "code-merged-into-paragraph",
        locationKey: "v1/code-example/python",
        hugoText: "Run the following commands: python3 example.py",
        astroText: "Run the following commands: python3 example.py",
      }),
    ]);
  });

  it("pairs an unfenced Hugo code block with the Astro example in a language Hugo lacks", () => {
    const codeExample = { version: "v1", section: "code-example" };
    const findings = alignUnits(
      [
        unit("prose", codeExample, "# Curl command curl -X GET url"),
        unit("code", { ...codeExample, language: "python" }, "print()"),
      ],
      [
        unit("code", { ...codeExample, language: "curl" }, "curl -X GET url"),
        unit("code", { ...codeExample, language: "python" }, "print()"),
      ],
    );
    expect(findings).toEqual([
      expect.objectContaining({
        kind: "hugo-malformed",
        reason: "unfenced-code",
        locationKey: "v1/code-example",
        astroLocationKey: "v1/code-example/curl",
        hugoText: "# Curl command curl -X GET url",
        astroText: "curl -X GET url",
      }),
    ]);
  });
});

describe("alignUnits on unfenced Hugo code with no Astro example left", () => {
  it("still reports it as hugo-malformed, with no Astro side", () => {
    const codeExample = { version: "v1", section: "code-example" };
    const findings = alignUnits(
      [
        unit("prose", codeExample, "# Curl command curl -X GET url"),
        unit("prose", codeExample, "# Curl command curl -X GET url"),
      ],
      [unit("code", { ...codeExample, language: "curl" }, "curl -X GET url")],
    );
    expect(findings).toEqual([
      expect.objectContaining({
        kind: "hugo-malformed",
        astroText: "curl -X GET url",
      }),
      {
        kind: "hugo-malformed",
        reason: "unfenced-code",
        unitKind: "code",
        locationKey: "v1/code-example",
        hugoText: "# Curl command curl -X GET url",
      },
    ]);
  });
});

describe("alignUnits on the validate-api-key fixtures", () => {
  const findings = alignUnits(
    unitsOfFixture("validate-api-key.hugo.md"),
    unitsOfFixture("validate-api-key.astro.md"),
  );
  const findingsOfKind = (kind: ContentFinding["kind"]) =>
    findings.filter((finding) => finding.kind === kind);

  it("reports Astro's Read-only addition as the only change", () => {
    expect(findingsOfKind("changed")).toEqual([
      expect.objectContaining({
        locationKey: "v1/response/200/model",
        field: "valid",
        diff: expect.arrayContaining([{ op: "insert", text: "Read-only." }]),
      }),
    ]);
  });

  it("flags both Hugo conversion problems as hugo-malformed", () => {
    expect(
      findingsOfKind("hugo-malformed").map((finding) => finding.reason),
    ).toEqual(["code-merged-into-paragraph", "unfenced-code"]);
  });

  it("reports nothing missing from Astro", () => {
    expect(findingsOfKind("missing-in-astro")).toEqual([]);
  });

  it("reports nothing extra in Astro", () => {
    expect(findingsOfKind("extra-in-astro")).toEqual([]);
  });
});

describe("malformedUnitFindings", () => {
  const model = {
    version: "v1",
    section: "response",
    responseCode: "200",
    panel: "model" as const,
  };
  const repairedRow = unit("tableRow", model, "tags | [string] | Tags. More.", {
    field: "tags",
    malformed: "table-cell-line-break",
  });

  it("reports each repaired Astro unit as astro-malformed", () => {
    expect(
      malformedUnitFindings(
        [
          unit("tableRow", model, "id | string | ID.", { field: "id" }),
          repairedRow,
        ],
        "astro",
      ),
    ).toEqual([
      {
        kind: "astro-malformed",
        reason: "table-cell-line-break",
        unitKind: "tableRow",
        locationKey: "v1/response/200/model",
        field: "tags",
        astroText: "tags | [string] | Tags. More.",
      },
    ]);
  });

  it("reports a repaired Hugo unit as hugo-malformed with Hugo's text", () => {
    expect(malformedUnitFindings([repairedRow], "hugo")).toMatchObject([
      { kind: "hugo-malformed", hugoText: "tags | [string] | Tags. More." },
    ]);
  });

  it("still lets the repaired row align with its counterpart", () => {
    expect(
      alignUnits([{ ...repairedRow, malformed: undefined }], [repairedRow]),
    ).toEqual([]);
  });
});

describe("alignUnits on rewritten text", () => {
  const model = {
    version: "v1",
    section: "response",
    responseCode: "200",
    panel: "model" as const,
  };

  it("compares the rewritten text but quotes the source text", () => {
    const hugoRow = unit(
      "tableRow",
      model,
      "a | enum | A. Allowed values: x.",
      {
        field: "a",
        sourceText: "a | enum | A. Allowed enum values: x",
      },
    );
    const astroRow = unit(
      "tableRow",
      model,
      "a | enum | A. Allowed values: x. Default: x.",
      { field: "a" },
    );
    const [finding] = alignUnits([hugoRow], [astroRow]);
    expect(finding).toMatchObject({
      kind: "changed",
      hugoText: "a | enum | A. Allowed enum values: x",
      astroText: "a | enum | A. Allowed values: x. Default: x.",
    });
    expect(
      finding.diff
        ?.filter((part) => part.op !== "equal")
        .map((part) => part.text),
    ).toEqual(["Default: x."]);
  });

  it("matches exactly once the forms agree", () => {
    const hugoRow = unit(
      "tableRow",
      model,
      "a | enum | A. Allowed values: x.",
      {
        field: "a",
        sourceText: "a | enum | A. Allowed enum values: x",
      },
    );
    expect(
      alignUnits(
        [hugoRow],
        [unit("tableRow", model, hugoRow.text, { field: "a" })],
      ),
    ).toEqual([]);
  });
});

describe("alignUnits on paragraphs Astro splits", () => {
  it("reports an exact split as paragraph-split", () => {
    const findings = alignUnits(
      [
        unit(
          "prose",
          overview,
          "Get a list. This endpoint requires a permission.",
        ),
      ],
      [
        unit("prose", overview, "Get a list."),
        unit("prose", overview, "This endpoint requires a permission."),
      ],
    );
    expect(findings).toEqual([
      {
        kind: "paragraph-split",
        unitKind: "prose",
        locationKey: "v1/overview",
        hugoText: "Get a list. This endpoint requires a permission.",
        astroText: "Get a list.\n\nThis endpoint requires a permission.",
      },
    ]);
  });

  it("pairs a split with a changed sentence as one changed finding", () => {
    const hugoText =
      "This endpoint is deprecated - use the V2 endpoints instead. List all integrations available in your organization. This endpoint requires the read permission.";
    const findings = alignUnits(
      [unit("prose", overview, hugoText)],
      [
        unit(
          "prose",
          overview,
          "This endpoint is deprecated - use the V2 endpoints instead. List all integrations available in your organization.",
        ),
        unit("prose", overview, "This endpoint is deprecated."),
        unit("prose", overview, "This endpoint requires the read permission."),
      ],
    );
    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ kind: "changed", hugoText });
    expect(findings[0].astroText?.split("\n\n")).toHaveLength(3);
    // Only the added sentence's words differ (the LCS may align them anywhere).
    const changedParts = findings[0].diff?.filter(
      (part) => part.op !== "equal",
    );
    expect(changedParts?.map((part) => part.op)).toEqual(["insert"]);
    expect(changedParts?.[0].text.split(" ").sort()).toEqual(
      ["This", "deprecated.", "endpoint", "is"].sort(),
    );
  });

  it("leaves unrelated paragraphs unpaired", () => {
    const findings = alignUnits(
      [unit("prose", overview, "Something else entirely here.")],
      [
        unit("prose", overview, "Get a list."),
        unit("prose", overview, "Requires a permission."),
      ],
    );
    expect(findings.map((finding) => finding.kind)).toEqual([
      "missing-in-astro",
      "extra-in-astro",
      "extra-in-astro",
    ]);
  });
});
