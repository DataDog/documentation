import { describe, expect, it } from "vitest";
import type { ContentFinding } from "./alignUnits.ts";
import type { StructureFinding } from "./diffStructure.ts";
import type { AdjudicatedFinding } from "./adjudicateHtml.ts";
import {
  buildChangeTypeReport,
  buildIndex,
  buildPageReport,
  findingId,
  pageSlugOf,
  renderSummary,
} from "./report.ts";

const pagePath = "/api/latest/authentication/validate-api-key";
const sides = {
  astro: { source: "dist/client/x.md", present: true },
  hugo: {
    source: "https://docs.datadoghq.com/x.md",
    status: 200,
    fetchedAt: "t",
  },
};

const missingRow: ContentFinding = {
  kind: "missing-in-astro",
  unitKind: "tableRow",
  locationKey: "v1/response/200/model",
  field: "valid",
  hugoText: "valid | boolean | Valid.",
};

const versionStructure: StructureFinding = {
  kind: "structure",
  mapping: "version-as-heading",
  locationKeys: ["v1"],
  hugoElements: ['tab "v1"'],
  astroElements: ['heading h2 "v1 (latest)"'],
};

describe("pageSlugOf", () => {
  it("drops the API prefix and flattens the path", () => {
    expect(pageSlugOf(pagePath)).toBe("authentication__validate-api-key");
  });
});

describe("findingId", () => {
  it("is stable for the same finding", () => {
    expect(findingId(pagePath, missingRow)).toBe(
      findingId(pagePath, { ...missingRow }),
    );
    expect(findingId(pagePath, missingRow)).toMatch(/^[0-9a-f]{12}$/);
  });

  it("differs by page, kind, location and anchor", () => {
    const ids = new Set([
      findingId(pagePath, missingRow),
      findingId("/api/latest/other", missingRow),
      findingId(pagePath, { ...missingRow, kind: "extra-in-astro" }),
      findingId(pagePath, {
        ...missingRow,
        locationKey: "v1/response/403/model",
      }),
      findingId(pagePath, { ...missingRow, field: "errors" }),
      findingId(pagePath, versionStructure),
      findingId(pagePath, { ...versionStructure, mapping: "label-form" }),
    ]);
    expect(ids.size).toBe(7);
  });

  it("ignores text changes when a field anchors the finding", () => {
    expect(
      findingId(pagePath, {
        ...missingRow,
        hugoText: "valid | boolean | New.",
      }),
    ).toBe(findingId(pagePath, missingRow));
  });
});

describe("buildPageReport", () => {
  const report = buildPageReport(
    pagePath,
    sides,
    [missingRow, { ...missingRow }],
    [versionStructure],
  );

  it("gives every finding an unreviewed verdict and a unique id", () => {
    expect(report.findings.map((finding) => finding.verdict)).toEqual([
      "unreviewed",
      "unreviewed",
      "unreviewed",
    ]);
    expect(new Set(report.findings.map((finding) => finding.id)).size).toBe(3);
  });

  it("counts findings by kind and verdict", () => {
    expect(report.counts).toEqual({
      byKind: { "missing-in-astro": 2, structure: 1 },
      byVerdict: { unreviewed: 3 },
      byHtmlCheck: {},
    });
  });

  it("records where each side came from", () => {
    expect(report).toMatchObject({
      pagePath,
      slug: "authentication__validate-api-key",
      ...sides,
    });
  });
});

describe("the HTML stage in reports", () => {
  const confirmed: AdjudicatedFinding = {
    ...missingRow,
    htmlCheck: { result: "matches-hugo-md", htmlText: "valid | boolean" },
    verdict: "astro-wrong",
    auto: true,
  };
  const hidden = (htmlText: string): ContentFinding => ({
    kind: "missing-in-astro",
    foundBy: "html-coverage",
    unitKind: "prose",
    locationKey: "html:page-v1",
    htmlText,
  });
  const coverage = {
    htmlChunks: 5,
    inBoth: 3,
    inHugoMdOnly: 0,
    inAstroOnly: 1,
    inNeither: 1,
  };
  const report = buildPageReport(
    pagePath,
    {
      ...sides,
      hugoHtml: {
        source: "https://docs.datadoghq.com/x/",
        status: 200,
        fetchedAt: "h",
        coverage,
      },
    },
    [confirmed, hidden("One.")],
    [],
  );

  it("keeps an auto verdict and counts HTML check results", () => {
    expect(report.findings[0]).toMatchObject({
      verdict: "astro-wrong",
      auto: true,
    });
    expect(report.counts.byVerdict).toEqual({
      "astro-wrong": 1,
      unreviewed: 1,
    });
    expect(report.counts.byHtmlCheck).toEqual({ "matches-hugo-md": 1 });
  });

  it("anchors coverage finding ids on the HTML text", () => {
    expect(findingId(pagePath, hidden("One."))).not.toBe(
      findingId(pagePath, hidden("Two.")),
    );
  });

  it("records the HTML fetch times and coverage in the index", () => {
    const index = buildIndex([report], {
      generatedAt: "g",
      distBuiltAt: "d",
      specBundle: null,
    });
    expect(index.hugoHtmlFetchedAt).toEqual({ earliest: "h", latest: "h" });
    expect(index.pages[0].coverage).toEqual(coverage);
  });

  it("summarizes auto verdicts and coverage per page", () => {
    const summary = renderSummary([report]);
    expect(summary).toContain("## HTML check");
    expect(summary).toContain(
      "| authentication/validate-api-key | 1 | 0 | 1 | 1 |",
    );
  });
});

describe("renderSummary", () => {
  it("lists structural mappings and ranks pages", () => {
    const report = buildPageReport(
      pagePath,
      sides,
      [missingRow],
      [versionStructure],
    );
    const summary = renderSummary([report]);
    expect(summary).toContain("version-as-heading");
    expect(summary).toContain("authentication/validate-api-key");
  });

  it("counts Astro-side repairs in their own column", () => {
    const report = buildPageReport(
      pagePath,
      sides,
      [
        {
          kind: "astro-malformed",
          reason: "table-cell-line-break",
          unitKind: "tableRow",
          locationKey: "v1/response/200/model",
          field: "valid",
          astroText: "valid | boolean | Valid.",
        },
      ],
      [],
    );
    const summary = renderSummary([report]);
    expect(summary).toContain("| Astro malformed |");
    expect(summary).toMatch(/validate-api-key( \| \d+){3} \| 1 \|/);
  });

  it("caps the unmapped list and points at structure.json", () => {
    const unmapped: StructureFinding[] = Array.from(
      { length: 60 },
      (_unused, index) => ({
        kind: "structure-unmapped",
        side: "hugo",
        locationKeys: ["v1"],
        hugoElements: [`heading h3 "Heading ${index}"`],
        astroElements: [],
      }),
    );
    const summary = renderSummary([
      buildPageReport(pagePath, sides, [], unmapped),
    ]);
    expect(summary).toContain("## Unmapped structure (60)");
    expect(summary).toContain('Heading 49"');
    expect(summary).not.toContain('Heading 50"');
    expect(summary).toContain("10 more in `structure.json`");
  });
});

describe("buildChangeTypeReport", () => {
  const changedRow = (
    field: string,
    changeTypes: string[],
  ): ContentFinding => ({
    kind: "changed",
    unitKind: "tableRow",
    locationKey: "v1/response/200/model",
    field,
    hugoText: `${field} | string | Old.`,
    astroText: `${field} | string | New.`,
    changeTypes,
  });

  it("groups changed findings by their combination of change types", () => {
    const report = buildPageReport(
      pagePath,
      sides,
      [
        changedRow("a", ["astro-adds-default"]),
        changedRow("b", ["astro-adds-default"]),
        changedRow("c", ["astro-adds-default", "enum-values-differ"]),
      ],
      [],
    );
    const groups = buildChangeTypeReport([report]);
    expect(
      groups.map(({ changeTypes, count }) => ({ changeTypes, count })),
    ).toEqual([
      { changeTypes: ["astro-adds-default"], count: 2 },
      { changeTypes: ["astro-adds-default", "enum-values-differ"], count: 1 },
    ]);
    expect(groups[0]).toMatchObject({
      pages: [pagePath],
      example: { field: "a", hugoText: "a | string | Old." },
    });
    expect(groups[0].findingIds).toHaveLength(2);
  });

  it("appears in the summary", () => {
    const report = buildPageReport(
      pagePath,
      sides,
      [changedRow("a", ["astro-adds-default"])],
      [],
    );
    expect(renderSummary([report])).toMatch(
      /## Change types[\s\S]*astro-adds-default \| 1 \|/,
    );
  });
});
