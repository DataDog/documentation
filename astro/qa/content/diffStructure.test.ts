import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { diffStructure } from "./diffStructure.ts";
import { extractPage, type OutlineEntry } from "./extractUnits.ts";
import { normalizeMarkdown } from "./normalize.ts";

function outlineOfFixture(name: string): OutlineEntry[] {
  const markdown = readFileSync(
    path.join(import.meta.dirname, "fixtures", name),
    "utf8",
  );
  return extractPage(normalizeMarkdown(markdown)).outline;
}

const entry = (locationKey: string, element: string): OutlineEntry => ({
  locationKey,
  element,
});

describe("diffStructure", () => {
  it("reports nothing when the outlines match in any order", () => {
    const outline = [
      entry("v1", 'tab "v1"'),
      entry("v1/response", 'tab "200"'),
    ];
    expect(diffStructure(outline, [...outline].reverse())).toEqual([]);
  });

  it("groups differences a mapping explains into one finding per mapping", () => {
    const findings = diffStructure(
      [entry("v1", 'tab "v1"'), entry("v2", 'tab "v2"')],
      [entry("v1", 'heading h2 "v1 (latest)"'), entry("v2", 'heading h2 "v2"')],
    );
    expect(findings).toEqual([
      {
        kind: "structure",
        mapping: "version-as-heading",
        locationKeys: ["v1", "v2"],
        hugoElements: ['tab "v1"', 'tab "v2"'],
        astroElements: ['heading h2 "v1 (latest)"', 'heading h2 "v2"'],
      },
    ]);
  });

  it("only applies a location-scoped mapping at matching locations", () => {
    const [finding] = diffStructure([], [entry("v1/request", 'tab "Curl"')]);
    expect(finding).toMatchObject({ kind: "structure-unmapped" });
  });

  it("reports each unexplained element as structure-unmapped, by side", () => {
    const findings = diffStructure(
      [entry("v1/request", 'heading h3 "Arguments"')],
      [
        entry("v1/request", 'tab "Expand all"'),
        entry("v1/response", 'tab "Expand all"'),
      ],
    );
    expect(findings).toEqual([
      {
        kind: "structure-unmapped",
        side: "hugo",
        locationKeys: ["v1/request"],
        hugoElements: ['heading h3 "Arguments"'],
        astroElements: [],
      },
      {
        kind: "structure-unmapped",
        side: "astro",
        locationKeys: ["v1/request", "v1/response"],
        hugoElements: [],
        astroElements: ['tab "Expand all"'],
      },
    ]);
  });
});

describe("diffStructure on the validate-api-key fixtures", () => {
  const findings = diffStructure(
    outlineOfFixture("validate-api-key.hugo.md"),
    outlineOfFixture("validate-api-key.astro.md"),
  );

  it("names every structural difference seen during research", () => {
    expect(findings.map((finding) => finding.mapping).sort()).toEqual([
      "code-language-tab",
      "endpoint-row-order",
      "frontmatter-breadcrumbs",
      "frontmatter-description",
      "label-form",
      "overview-heading-absent",
      "schema-parent-field-column",
      "version-as-heading",
    ]);
  });

  it("leaves nothing unmapped", () => {
    expect(
      findings.filter((finding) => finding.kind === "structure-unmapped"),
    ).toEqual([]);
  });

  it("collects every location a mapping covers", () => {
    const schemaFinding = findings.find(
      (finding) => finding.mapping === "schema-parent-field-column",
    );
    expect(schemaFinding?.locationKeys).toEqual([
      "v1/response/200/model",
      "v1/response/403/model",
      "v1/response/429/model",
    ]);
  });
});

describe("diffStructure mappings added in calibration", () => {
  it("names the arguments table's header difference", () => {
    const [finding] = diffStructure(
      [entry("v2/arguments", "table Name | Type | Description")],
      [
        entry(
          "v2/arguments",
          "table Parent field | Field | Type | Description",
        ),
      ],
    );
    expect(finding).toMatchObject({
      kind: "structure",
      mapping: "arguments-table-header",
    });
  });

  it("names the operation badge's form difference", () => {
    const [finding] = diffStructure(
      [entry("create-an-incident", 'heading h2 "Create an incident preview"')],
      [
        entry(
          "create-an-incident",
          'heading h2 "Create an incident (preview)"',
        ),
      ],
    );
    expect(finding).toMatchObject({
      kind: "structure",
      mapping: "operation-badge-form",
    });
  });

  it("leaves a badge one side lacks unmapped", () => {
    const [finding] = diffStructure(
      [entry("create-a-page", 'badge "preview"')],
      [],
    );
    expect(finding).toMatchObject({ kind: "structure-unmapped", side: "hugo" });
  });
});

describe("diffStructure request heading", () => {
  it("names Astro's longer request heading", () => {
    const [finding] = diffStructure(
      [entry("v1/request", 'heading h3 "Request"')],
      [entry("v1/request", 'heading h3 "Request Body (required)"')],
    );
    expect(finding).toMatchObject({
      kind: "structure",
      mapping: "request-heading-form",
    });
  });
});

describe("diffStructure empty Hugo headings", () => {
  it("names the empty heading Hugo makes of a curl comment line", () => {
    const [finding] = diffStructure(
      [entry("v1/code-example", 'heading h1 ""')],
      [],
    );
    expect(finding).toMatchObject({
      kind: "structure",
      mapping: "curl-comment-heading",
    });
  });

  it("names the empty title of each Hugo request example", () => {
    const [finding] = diffStructure(
      [entry("v1/request/example", 'heading h5 ""')],
      [],
    );
    expect(finding).toMatchObject({
      kind: "structure",
      mapping: "request-example-title",
    });
  });
});
