import { describe, expect, it } from "vitest";
import { wordDiff, type ContentFinding } from "./alignUnits.ts";
import { adjudicate, checkCoverage } from "./adjudicateHtml.ts";
import type { HtmlChunk } from "./extractHtml.ts";
import type { ContentUnit } from "./extractUnits.ts";

const modelContext = "page-v1 > Get-200-v1 > Get-200-model";

function row(field: string, rest: string[], context = modelContext): HtmlChunk {
  const bareField = field.slice(field.lastIndexOf(".") + 1);
  const cells = [bareField, ...rest];
  return { kind: "tableRow", text: cells.join(" | "), cells, field, context };
}

function paragraph(text: string, context = "page-v1"): HtmlChunk {
  return { kind: "paragraph", text, context };
}

function changedRow(
  field: string,
  hugoText: string,
  astroText: string,
): ContentFinding {
  return {
    kind: "changed",
    unitKind: "tableRow",
    locationKey: "v1/response/200/model",
    field,
    hugoText,
    astroText,
    diff: wordDiff(hugoText, astroText),
  };
}

function unit(
  kind: ContentUnit["kind"],
  text: string,
  field?: string,
): ContentUnit {
  return {
    kind,
    location: {},
    locationKey: "v1/overview",
    text,
    ...(field !== undefined && { field }),
  };
}

describe("adjudicate", () => {
  it("sets hugo-md-wrong when the HTML has what only Astro has", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "data.type",
          "data.type | enum | Resource type. Allowed values: account.",
          "data.type | enum | Resource type. Allowed values: account. Default: account.",
        ),
      ],
      [
        row("data.type", [
          "enum",
          "Resource type. Allowed enum values: account default: account",
        ]),
      ],
    );
    expect(finding).toMatchObject({
      verdict: "hugo-md-wrong",
      auto: true,
      htmlCheck: { result: "matches-astro", htmlContext: modelContext },
    });
  });

  it("compares word tokens, so punctuation next to a shared word doesn't count", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "agg",
          "agg | enum | Methods. Allowed values: count, min.",
          "agg | enum | Methods. Allowed values: count, min, max, avg.",
        ),
      ],
      [
        row("agg", [
          "enum",
          "Methods. Allowed enum values: count,min ,max,avg",
        ]),
      ],
    );
    expect(finding.htmlCheck.result).toBe("matches-astro");
  });

  it("finds Hugo's rewritten phrasing in the HTML's original phrasing", () => {
    const hugoText = "agg | enum | Methods. Allowed values: avg, count.";
    const [finding] = adjudicate(
      [
        {
          ...changedRow("agg", hugoText, "agg | enum | Methods."),
          hugoText: "agg | enum | Methods. Allowed enum values: avg,count",
        },
      ],
      [row("agg", ["enum", "Methods. Allowed enum values: avg,count ,max"])],
    );
    expect(finding.htmlCheck.result).toBe("matches-hugo-md");
  });

  it("sets astro-wrong when the HTML lacks what only Astro has", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "id",
          "id | string | The ID.",
          "id | string | The ID. Read-only.",
        ),
      ],
      [row("id", ["string", "The ID."])],
    );
    expect(finding).toMatchObject({
      verdict: "astro-wrong",
      auto: true,
      htmlCheck: { result: "matches-hugo-md" },
    });
  });

  it("flags Astro when one HTML row matches each side, and says it's ambiguous", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "format",
          "format | enum | Old text.",
          "format | enum | New text.",
        ),
      ],
      [
        row("requests.format", ["enum", "New text."]),
        row("requests.format", ["enum", "Old text."]),
      ],
    );
    expect(finding).toMatchObject({
      verdict: "astro-wrong",
      auto: true,
      htmlCheck: { result: "ambiguous" },
    });
  });

  it("doesn't clear Astro when its words are in the HTML only with gaps", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "id",
          "id | string | The ID.",
          "id | string | The ID. Always set.",
        ),
      ],
      [row("id", ["string", "The ID. Always not set."])],
    );
    expect(finding.htmlCheck.result).not.toBe("matches-astro");
  });

  it("flags Astro-only text that the HTML has only inside a longer chunk", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "extra-in-astro",
          unitKind: "prose",
          locationKey: "v1/overview",
          astroText: "This endpoint is deprecated.",
        },
      ],
      [paragraph("This endpoint is deprecated. Use v2 instead.")],
    );
    expect(finding).toMatchObject({
      verdict: "astro-wrong",
      htmlCheck: { result: "matches-neither" },
    });
  });

  it("reports code that differs from Astro's inside a malformed finding as changed", () => {
    const hugoText =
      '# Curl command curl -X GET "https://api.datadoghq.com/v1"';
    const astroText =
      '# Set your site export DD_SITE="datadoghq.com" curl -X GET "https://api.datadoghq.com/v1"';
    const findings = adjudicate(
      [
        {
          kind: "hugo-malformed",
          reason: "unfenced-code",
          unitKind: "code",
          locationKey: "v1/code-example",
          hugoText,
          astroText,
        },
      ],
      [{ kind: "code", text: hugoText, context: "page-v1 > curl" }],
    );
    expect(findings).toHaveLength(2);
    expect(findings[1]).toMatchObject({
      kind: "changed",
      unitKind: "code",
      locationKey: "v1/code-example",
      hugoText,
      astroText,
      verdict: "astro-wrong",
      htmlCheck: { result: "matches-hugo-md" },
    });
    expect(findings[1].diff?.length).toBeGreaterThan(0);
    expect(findings[1].changeTypes).toEqual(["other"]);
  });

  it("finds the HTML code by similarity when Hugo's unfenced text lost words", () => {
    const hugoText =
      '# Curl command curl -X POST " -H "Accept: application/json"';
    const htmlText =
      '# Curl command curl -X POST "https://api.datadoghq.com/v1" -H "Accept: application/json"';
    const astroText =
      'export DD_SITE="datadoghq.com" curl -X POST "https://api.datadoghq.com/v1" -H "Accept: application/json"';
    const findings = adjudicate(
      [
        {
          kind: "hugo-malformed",
          reason: "unfenced-code",
          unitKind: "code",
          locationKey: "v1/code-example",
          hugoText,
          astroText,
        },
      ],
      [{ kind: "code", text: htmlText, context: "page-v1 > curl" }],
    );
    expect(findings[0].htmlCheck).toMatchObject({ result: "matches-neither" });
    expect(findings[1]).toMatchObject({
      kind: "changed",
      verdict: "astro-wrong",
    });
  });

  it("reports unfenced code Astro has no example for as missing", () => {
    const hugoText = "# Curl command curl -X GET url";
    const findings = adjudicate(
      [
        {
          kind: "hugo-malformed",
          reason: "unfenced-code",
          unitKind: "code",
          locationKey: "v1/code-example",
          hugoText,
        },
      ],
      [{ kind: "code", text: hugoText, context: "page-v1 > curl" }],
    );
    expect(findings).toHaveLength(2);
    expect(findings[1]).toMatchObject({
      kind: "missing-in-astro",
      unitKind: "code",
      locationKey: "v1/code-example",
      hugoText,
      verdict: "astro-wrong",
      htmlCheck: { result: "matches-hugo-md" },
    });
    expect(findings[1].astroText).toBeUndefined();
  });

  it("leaves the verdict alone when the HTML matches neither side", () => {
    const [finding] = adjudicate(
      [changedRow("id", "id | string | Old text.", "id | string | New text.")],
      [row("id", ["string", "Other text."])],
    );
    expect(finding.verdict).toBeUndefined();
    expect(finding.htmlCheck?.result).toBe("matches-neither");
  });

  it("compares a nested row with the HTML row of the same parent", () => {
    const [finding] = adjudicate(
      [
        changedRow(
          "data.type",
          "data.type | string | The type.",
          "data.type | string | The type. Read-only.",
        ),
      ],
      [
        row("meta.type", ["string", "The type. Read-only."]),
        row("data.type", ["string", "The type."]),
      ],
    );
    expect(finding.htmlCheck).toMatchObject({
      result: "matches-hugo-md",
      htmlText: "type | string | The type.",
    });
  });

  it("confirms a missing-in-astro finding the HTML has", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "missing-in-astro",
          unitKind: "prose",
          locationKey: "v1/overview",
          hugoText: "Use the v2 endpoints.",
        },
      ],
      [paragraph("Use the v2 endpoints.")],
    );
    expect(finding).toMatchObject({
      verdict: "astro-wrong",
      htmlCheck: { result: "matches-hugo-md" },
    });
  });

  it("sets hugo-md-wrong for Astro-only text the HTML has, and astro-wrong when it has nothing like it", () => {
    const extra = (astroText: string): ContentFinding => ({
      kind: "extra-in-astro",
      unitKind: "prose",
      locationKey: "v1/overview",
      astroText,
    });
    const [found, notFound] = adjudicate(
      [extra("This endpoint is deprecated."), extra("Something unrelated.")],
      [paragraph("This endpoint is deprecated."), paragraph("Get a list.")],
    );
    expect(found).toMatchObject({
      verdict: "hugo-md-wrong",
      htmlCheck: { result: "matches-astro" },
    });
    expect(notFound).toMatchObject({
      verdict: "astro-wrong",
      auto: true,
      htmlCheck: { result: "not-found" },
    });
  });

  it("sets hugo-md-wrong when the HTML fences the code that Hugo's .md merged", () => {
    const merged =
      'Then run the following commands: DD_SITE="datadoghq.com" python3 "example.py"';
    const [finding] = adjudicate(
      [
        {
          kind: "hugo-malformed",
          reason: "code-merged-into-paragraph",
          unitKind: "prose",
          locationKey: "v1/code-example/python",
          hugoText: merged,
          astroText: merged,
        },
      ],
      [
        paragraph("Then run the following commands:", "page-v1 > python"),
        {
          kind: "code",
          text: 'DD_SITE="datadoghq.com" python3 "example.py"',
          context: "page-v1 > python",
        },
      ],
    );
    expect(finding).toMatchObject({
      verdict: "hugo-md-wrong",
      htmlCheck: { result: "matches-astro", htmlContext: "page-v1 > python" },
    });
  });

  it("sets astro-wrong when the HTML keeps as one paragraph what Astro splits", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "paragraph-split",
          unitKind: "prose",
          locationKey: "v1/overview",
          hugoText: "Get a list. This endpoint requires a permission.",
          astroText: "Get a list.\n\nThis endpoint requires a permission.",
        },
      ],
      [paragraph("Get a list. This endpoint requires a permission.")],
    );
    expect(finding).toMatchObject({
      verdict: "astro-wrong",
      htmlCheck: { result: "matches-hugo-md" },
    });
  });

  it("leaves Hugo-only text the HTML has nothing like unreviewed", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "missing-in-astro",
          unitKind: "prose",
          locationKey: "v1/overview",
          hugoText: "Something unrelated.",
        },
      ],
      [paragraph("Get a list.")],
    );
    expect(finding.htmlCheck.result).toBe("not-found");
    expect(finding.verdict).toBeUndefined();
  });

  it("doesn't match a row by description alone when the HTML lacks its field", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "extra-in-astro",
          unitKind: "tableRow",
          locationKey: "v1/response/200/model",
          field: "data.name",
          astroText: "data.name | string | The ID.",
        },
      ],
      [row("data.id", ["string", "The ID."])],
    );
    expect(finding.htmlCheck.result).toBe("not-found");
  });

  it("doesn't check links, since HTML chunks keep no hrefs", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "missing-in-astro",
          unitKind: "link",
          locationKey: "v1/overview",
          hugoText: "https://docs.datadoghq.com/api/latest/scopes.md",
        },
      ],
      [],
    );
    expect(finding.htmlCheck.result).toBe("not-applicable");
  });

  it("doesn't check findings about Astro's own .md damage", () => {
    const [finding] = adjudicate(
      [
        {
          kind: "astro-malformed",
          reason: "table-cell-line-break",
          unitKind: "tableRow",
          locationKey: "v1/arguments",
          astroText: "id | string | The ID.",
        },
      ],
      [row("id", ["string", "The ID."])],
    );
    expect(finding.verdict).toBeUndefined();
    expect(finding.htmlCheck?.result).toBe("not-applicable");
  });
});

describe("checkCoverage", () => {
  it("reports an HTML chunk found in neither .md as missing in Astro", () => {
    const { findings } = checkCoverage(
      [paragraph("Hidden sentence."), paragraph("Shared sentence.")],
      [unit("prose", "Shared sentence.")],
      [unit("prose", "Shared sentence.")],
    );
    expect(findings).toEqual([
      {
        kind: "missing-in-astro",
        foundBy: "html-coverage",
        unitKind: "prose",
        locationKey: "html:page-v1",
        htmlText: "Hidden sentence.",
      },
    ]);
  });

  it("counts chunks found only in Astro as converter omissions, without findings", () => {
    const { findings, counts } = checkCoverage(
      [paragraph("Only Astro has this."), paragraph("Both have this.")],
      [unit("prose", "Both have this.")],
      [unit("prose", "Both have this."), unit("prose", "Only Astro has this.")],
    );
    expect(findings).toEqual([]);
    expect(counts).toEqual({
      htmlChunks: 2,
      inBoth: 1,
      inHugoMdOnly: 0,
      inAstroOnly: 1,
      inNeither: 0,
    });
  });

  it("accounts for a schema row by its field, even when its text differs", () => {
    const { findings, counts } = checkCoverage(
      [
        row("data.type", [
          "enum",
          "Allowed enum values: account default: account",
        ]),
      ],
      [
        unit(
          "tableRow",
          "data.type | enum | Allowed values: account.",
          "data.type",
        ),
      ],
      [
        unit(
          "tableRow",
          "data.type | enum | Allowed values: account.",
          "data.type",
        ),
      ],
    );
    expect(findings).toEqual([]);
    expect(counts.inBoth).toBe(1);
  });

  it("finds a chunk inside a longer unit, such as code merged into prose", () => {
    const { counts } = checkCoverage(
      [
        {
          kind: "code",
          text: 'python3 "example.py"',
          context: "page-v1 > python",
        },
      ],
      [unit("prose", 'Then run: python3 "example.py"')],
      [unit("code", 'python3 "example.py"')],
    );
    expect(counts.inBoth).toBe(1);
  });

  it("finds section headings in the outline, where the .md keeps them", () => {
    const { counts } = checkCoverage(
      [{ kind: "heading", text: "Code Example", context: "page-v1" }],
      [],
      [],
      {
        hugoOutline: [
          {
            locationKey: "v1/code-example",
            element: 'heading h3 "Code Example"',
          },
        ],
        astroOutline: [],
      },
    );
    expect(counts.inHugoMdOnly).toBe(1);
  });

  it("doesn't find a chunk by joining the end of one unit to the start of the next", () => {
    const { findings } = checkCoverage(
      [paragraph("first ends here second")],
      [unit("prose", "The first ends here."), unit("prose", "Second begins.")],
      [],
    );
    expect(findings).toHaveLength(1);
  });

  it("skips tab labels, which the structure diff covers", () => {
    const { counts } = checkCoverage(
      [{ kind: "tab", text: "Python", context: "" }],
      [],
      [],
    );
    expect(counts.htmlChunks).toBe(0);
  });
});
