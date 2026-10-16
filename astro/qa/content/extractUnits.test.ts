import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  extractPage,
  extractUnits,
  locationKeyOf,
  type ContentUnit,
  type OutlineEntry,
} from "./extractUnits.ts";
import { normalizeMarkdown } from "./normalize.ts";

function unitsOfFixture(name: string): ContentUnit[] {
  const markdown = readFileSync(
    path.join(import.meta.dirname, "fixtures", name),
    "utf8",
  );
  return extractUnits(normalizeMarkdown(markdown));
}

function unitsAt(units: ContentUnit[], locationKey: string, kind?: string) {
  return units.filter(
    (unit) =>
      unit.locationKey === locationKey &&
      (kind === undefined || unit.kind === kind),
  );
}

function textsAt(units: ContentUnit[], locationKey: string, kind: string) {
  return unitsAt(units, locationKey, kind).map((unit) => unit.text);
}

describe("locationKeyOf", () => {
  it("joins the segments in canonical order and skips empty ones", () => {
    expect(
      locationKeyOf({
        language: "python",
        section: "code-example",
        version: "v1",
      }),
    ).toBe("v1/code-example/python");
    expect(
      locationKeyOf({
        operation: "validate-api-key",
        version: "v2",
        section: "response",
        responseCode: "200",
        panel: "model",
      }),
    ).toBe("validate-api-key/v2/response/200/model");
  });

  it("uses 'page' for the top of the page", () => {
    expect(locationKeyOf({})).toBe("page");
  });

  it("keeps unrecognized tab labels as a segment", () => {
    expect(locationKeyOf({ section: "request", tab: "expand all" })).toBe(
      "request/tab:expand all",
    );
  });
});

describe("extractUnits on an unrecognized tab", () => {
  it("keys content under the tab label instead of dropping it", () => {
    const units = extractUnits(
      '{% tab title="Something" %}\nHello.\n{% /tab %}',
    );
    expect(units).toEqual([
      expect.objectContaining({
        kind: "prose",
        locationKey: "tab:something",
        text: "Hello.",
      }),
    ]);
  });
});

describe.each([
  ["hugo", "validate-api-key.hugo.md"],
  ["astro", "validate-api-key.astro.md"],
])("extractUnits on validate-api-key (%s)", (_side, fixtureName) => {
  const units = unitsOfFixture(fixtureName);

  it("emits the page title heading at the top of the page", () => {
    expect(textsAt(units, "page", "heading")).toEqual(["Validate API key"]);
  });

  it("keys the endpoint table under the version, as rows with bold stripped", () => {
    const rows = textsAt(units, "v1/endpoint-table", "tableRow");
    expect(rows).toHaveLength(9);
    expect(rows).toContain(
      "app.datadoghq.com | GET https://api.datadoghq.com/api/v1/validate",
    );
  });

  it("keys the operation description as overview, with or without a heading", () => {
    expect(textsAt(units, "v1/overview", "prose")).toEqual([
      "Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.",
    ]);
  });

  it("consumes version and section headings as location", () => {
    const headingTexts = units
      .filter((unit) => unit.kind === "heading")
      .map((unit) => unit.text);
    expect(headingTexts).toEqual(["Validate API key"]);
  });

  it("keys response descriptions by response code", () => {
    expect(textsAt(units, "v1/response/200", "prose")).toEqual(["OK"]);
    expect(textsAt(units, "v1/response/429", "prose")).toEqual([
      "Too many requests",
    ]);
  });

  it("keys model content under the response code", () => {
    expect(textsAt(units, "v1/response/200/model", "prose")).toEqual([
      "Represent validation endpoint responses.",
    ]);
  });

  it("keys schema rows by field path", () => {
    const [validRow] = unitsAt(units, "v1/response/200/model", "tableRow");
    expect(validRow.field).toBe("valid");
    expect(validRow.text).toMatch(
      /^valid \| boolean \| Return true if the authentication response is valid\./,
    );
    const [errorsRow] = unitsAt(units, "v1/response/403/model", "tableRow");
    expect(errorsRow.field).toBe("errors [required]");
  });

  it("compares JSON examples by their parsed value", () => {
    expect(textsAt(units, "v1/response/403/example", "code")).toEqual([
      '{"errors":["Bad Request"]}',
    ]);
  });

  it("keys the Python example by language", () => {
    const [pythonCode] = textsAt(units, "v1/code-example/python", "code");
    expect(pythonCode).toMatch(
      /^""" Validate API key returns "OK" response """ from/,
    );
    expect(pythonCode).not.toContain("\n");
  });

  it("emits the Instructions label under the Python example", () => {
    expect(textsAt(units, "v1/code-example/python", "label")).toEqual([
      "Instructions",
    ]);
  });

  it("emits link hrefs where they appear", () => {
    expect(textsAt(units, "v1/code-example/python", "link")).toEqual([
      "https://docs.datadoghq.com/api/latest.md?code-lang=python",
    ]);
  });

  it("leaves no markup or line breaks in unit text", () => {
    for (const unit of units.filter((unit) => unit.kind !== "code")) {
      expect(unit.text).not.toMatch(/\*\*|\n|\{%/);
    }
  });
});

describe("extractUnits differences between the two sides", () => {
  const hugoUnits = unitsOfFixture("validate-api-key.hugo.md");
  const astroUnits = unitsOfFixture("validate-api-key.astro.md");

  it("records how the Instructions label was written", () => {
    expect(unitsAt(hugoUnits, "v1/code-example/python", "label")[0].form).toBe(
      "heading",
    );
    expect(unitsAt(astroUnits, "v1/code-example/python", "label")[0].form).toBe(
      "bold-paragraph",
    );
  });

  it("keeps Astro's extra Read-only text in the schema row", () => {
    const [astroRow] = unitsAt(astroUnits, "v1/response/200/model", "tableRow");
    expect(astroRow.text).toContain("Read-only.");
  });

  it("keys Astro's curl example by its tab label", () => {
    const [curlCode] = textsAt(astroUnits, "v1/code-example/curl", "code");
    expect(curlCode).toContain(
      'curl -X GET "https://api.datadoghq.com/api/v1/validate"',
    );
  });

  it("leaves Hugo's mangled curl block as languageless prose", () => {
    const [mangledCurl] = textsAt(hugoUnits, "v1/code-example", "prose");
    expect(mangledCurl).toMatch(/^# Curl command curl -X GET/);
  });

  it("keeps Hugo's run command inside the Instructions paragraph", () => {
    const [instructions] = textsAt(
      hugoUnits,
      "v1/code-example/python",
      "prose",
    );
    expect(instructions).toMatch(
      /run following commands: DD_SITE="datadoghq.com"/,
    );
    expect(textsAt(astroUnits, "v1/code-example/python", "code")).toHaveLength(
      2,
    );
  });
});

describe("extractUnits on a category page", () => {
  describe.each([
    ["hugo", "authentication.hugo.md"],
    ["astro", "authentication.astro.md"],
  ])("(%s)", (_side, fixtureName) => {
    const units = unitsOfFixture(fixtureName);

    it("keeps the intro prose at the top of the page", () => {
      const intro = textsAt(units, "page", "prose");
      expect(intro[0]).toMatch(
        /^All requests to Datadog's API must be authenticated\. Requests that write data/,
      );
    });

    it("keys each operation's content by the operation heading", () => {
      expect(textsAt(units, "validate-api-key", "heading")).toEqual([
        "Validate API key",
      ]);
      expect(
        textsAt(units, "validate-api-key/endpoint-table", "tableRow"),
      ).toHaveLength(9);
    });
  });
});

describe("extractPage", () => {
  const hugoPage = extractPage(
    normalizeMarkdown(
      readFileSync(
        path.join(import.meta.dirname, "fixtures", "validate-api-key.hugo.md"),
        "utf8",
      ),
    ),
  );
  const astroPage = extractPage(
    normalizeMarkdown(
      readFileSync(
        path.join(import.meta.dirname, "fixtures", "validate-api-key.astro.md"),
        "utf8",
      ),
    ),
  );
  const elementsAt = (outline: OutlineEntry[], locationKey: string): string[] =>
    outline
      .filter((entry) => entry.locationKey === locationKey)
      .map((entry) => entry.element);

  it("emits the frontmatter title as a prose unit", () => {
    expect(textsAt(hugoPage.units, "frontmatter", "prose")).toEqual([
      "Validate API key",
    ]);
  });

  it("records other frontmatter keys in the outline", () => {
    expect(elementsAt(astroPage.outline, "frontmatter")).toEqual([
      "frontmatter description: Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.",
      "frontmatter breadcrumbs: Docs > API > Validate API key",
    ]);
  });

  it("records how each side expressed the version", () => {
    expect(elementsAt(hugoPage.outline, "v1")).toEqual(['tab "v1"']);
    expect(elementsAt(astroPage.outline, "v1")).toEqual([
      'heading h2 "v1 (latest)"',
    ]);
  });

  it("records tabs without their attribute syntax", () => {
    expect(elementsAt(hugoPage.outline, "v1/response/200")).toEqual([
      'tab "200"',
    ]);
    expect(elementsAt(astroPage.outline, "v1/response/200")).toEqual([
      'tab "200"',
    ]);
  });

  it("records table columns and endpoint site order", () => {
    expect(elementsAt(astroPage.outline, "v1/response/200/model")).toEqual([
      'tab "Model"',
      "table Parent field | Field | Type | Description",
    ]);
    expect(elementsAt(hugoPage.outline, "v1/endpoint-table")).toEqual([
      "table Datadog site | API endpoint",
      expect.stringMatching(/^endpoint sites ap1\.datadoghq\.com, /),
    ]);
  });

  it("records labels with their form", () => {
    expect(
      elementsAt(hugoPage.outline, "v1/code-example/python").filter((element) =>
        element.startsWith("label"),
      ),
    ).toEqual(['label heading "Instructions"']);
    expect(
      elementsAt(astroPage.outline, "v1/code-example/python").filter(
        (element) => element.startsWith("label"),
      ),
    ).toEqual(['label bold-paragraph "Instructions"']);
  });

  it("keeps outline entries out of the units", () => {
    expect(hugoPage.units).toEqual(
      extractUnits(
        normalizeMarkdown(
          readFileSync(
            path.join(
              import.meta.dirname,
              "fixtures",
              "validate-api-key.hugo.md",
            ),
            "utf8",
          ),
        ),
      ),
    );
  });
});

describe("extractPage on table rows broken by line breaks", () => {
  const page = extractPage(
    [
      "## v1 (latest)",
      "",
      "### Response",
      "",
      "| Parent field | Field | Type | Description |",
      "| --- | --- | --- | --- |",
      "|  | reflow_type | enum | Reflow type.",
      "  Allowed values: `auto`. |",
      "|  | tags | [string] | Tags. |",
    ].join("\n"),
  );

  it("extracts the repaired row and marks it malformed", () => {
    expect(
      page.units
        .filter((unit) => unit.kind === "tableRow")
        .map(({ field, text, malformed }) => ({ field, text, malformed })),
    ).toEqual([
      {
        field: "reflow_type",
        text: "reflow_type | enum | Reflow type. Allowed values: auto.",
        malformed: "table-cell-line-break",
      },
      { field: "tags", text: "tags | [string] | Tags.", malformed: undefined },
    ]);
  });
});

describe("extractPage on Hugo's legacy code examples", () => {
  const example = (fence: string, codeLang: string) => [
    "##### ",
    "",
    "```" + fence,
    "print(1)",
    "```",
    "",
    "#### Instructions",
    "",
    `First [install the library](https://docs.datadoghq.com/api/latest.md?code-lang=${codeLang}).`,
    "",
  ];
  const page = extractPage(
    [
      "## v1",
      "",
      "### Code Example",
      "",
      ...example("python", "python"),
      ...example("python", "python-legacy"),
      ...example("ruby", "ruby"),
    ].join("\n"),
  );
  const kindsAt = (locationKey: string) =>
    page.units
      .filter((unit) => unit.locationKey === locationKey)
      .map((unit) => unit.kind);

  it("keys an example by its legacy install link", () => {
    expect(kindsAt("v1/code-example/python [legacy]")).toEqual([
      "code",
      "label",
      "prose",
      "link",
    ]);
  });

  it("leaves the other examples' languages alone", () => {
    expect(kindsAt("v1/code-example/python")).toEqual([
      "code",
      "label",
      "prose",
      "link",
    ]);
    expect(kindsAt("v1/code-example/ruby")).toHaveLength(4);
  });

  it("rekeys the example's outline entries too", () => {
    expect(
      page.outline.filter(
        (entry) => entry.locationKey === "v1/code-example/python [legacy]",
      ),
    ).toEqual([
      {
        locationKey: "v1/code-example/python [legacy]",
        element: 'label heading "Instructions"',
      },
    ]);
  });
});

describe("extractPage on operation status badges", () => {
  const operationsOf = (markdown: string) => {
    const page = extractPage(markdown);
    return {
      headings: page.units
        .filter((unit) => unit.kind === "heading")
        .map((unit) => `${unit.locationKey}: ${unit.text}`),
      badges: page.outline
        .filter((entry) => entry.element.startsWith("badge"))
        .map((entry) => `${entry.locationKey}: ${entry.element}`),
    };
  };

  it("keys Hugo's and Astro's badge forms the same way", () => {
    const hugo = operationsOf("## Create an incident preview\n");
    const astro = operationsOf("## Create an incident (preview)\n");
    expect(hugo).toEqual(astro);
    expect(hugo).toEqual({
      headings: ["create-an-incident: Create an incident"],
      badges: ['create-an-incident: badge "preview"'],
    });
  });

  it("records each badge so a missing one shows as structure", () => {
    expect(
      operationsOf("## Create a page deprecated preview\n").badges,
    ).toEqual([
      'create-a-page: badge "deprecated"',
      'create-a-page: badge "preview"',
    ]);
    expect(operationsOf("## Create a page (deprecated)\n").badges).toEqual([
      'create-a-page: badge "deprecated"',
    ]);
  });

  it("keeps the heading's own form in the outline", () => {
    const outline = extractPage("## Create an incident preview\n").outline;
    expect(outline).toContainEqual({
      locationKey: "create-an-incident",
      element: 'heading h2 "Create an incident preview"',
    });
  });
});

describe("extractPage section keying", () => {
  const keysOf = (markdown: string) =>
    extractPage(markdown).units.map(
      (unit) => `${unit.kind}@${unit.locationKey}`,
    );

  it("treats Astro's request body heading as the request section", () => {
    expect(
      keysOf("## v1 (latest)\n\n### Request Body (required)\n\nThe body.\n"),
    ).toEqual(["prose@v1/request"]);
  });

  it("keys a label before any section as overview, like its prose", () => {
    expect(
      keysOf("## v1 (latest)\n\n#### Monitor Types\n\nThe types.\n"),
    ).toEqual(["label@v1/overview", "prose@v1/overview"]);
  });
});

describe("list items", () => {
  it("makes each nested list item its own unit", () => {
    const units = extractUnits(
      normalizeMarkdown(
        "## Overview\n\n- `parameter` Specify the type\n  - for `change`:\n    - supports `relative`\n- `operator`\n",
      ),
    );
    expect(
      units.filter((unit) => unit.kind === "prose").map((unit) => unit.text),
    ).toEqual([
      "parameter Specify the type",
      "for change:",
      "supports relative",
      "operator",
    ]);
  });
});

describe("Hugo's curl blocks broken at a comment line", () => {
  const brokenCurl = [
    "##### ",
    "                          \\## default",
    "# ",
    ' \\# Use a token export TOKEN="x"  \\# Curl command curl -X POST "',
    '-H "Accept: application/json"',
  ].join("\n");
  const page = extractPage(
    normalizeMarkdown(
      `## v1 (latest)\n\n### Code Example\n\n${brokenCurl}\n\n${brokenCurl}\n`,
    ),
  );

  it("joins each block's fragments into one languageless prose unit", () => {
    expect(
      page.units
        .filter((unit) => unit.locationKey === "v1/code-example")
        .map((unit) => `${unit.kind}: ${unit.text}`),
    ).toEqual([
      'prose: ## default # Use a token export TOKEN="x" # Curl command curl -X POST " -H "Accept: application/json"',
      'prose: ## default # Use a token export TOKEN="x" # Curl command curl -X POST " -H "Accept: application/json"',
    ]);
  });

  it("keeps the comment line's empty heading in the outline", () => {
    expect(
      page.outline.filter((entry) => entry.element === 'heading h1 ""'),
    ).toHaveLength(2);
  });
});
