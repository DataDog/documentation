import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { documentNode } from "@lib/plaintext/helpers";
import { apiResponseNode } from "../ApiResponse";
import type { ResponseData } from "@lib/api/schemas/views";

const responses: ResponseData[] = [
  {
    statusCode: "200",
    description: "OK",
    schema: [
      {
        name: "id",
        type: "string",
        required: true,
        deprecated: false,
        readOnly: false,
        description: "Identifier",
      },
    ],
    examples: [{ name: "Example 1", value: '{"id":"abc"}' }],
  },
  {
    statusCode: "404",
    description: "Not found",
  },
];

function render(rs: ResponseData[]): string {
  const node = apiResponseNode(rs);
  if (node === null) {
    return "";
  }
  return format(documentNode([node]));
}

describe("apiResponseNode", () => {
  it("returns null when responses is empty", () => {
    expect(apiResponseNode([])).toBeNull();
  });

  it("emits an outer tab per status code", () => {
    const out = render(responses);
    expect(out).toContain("{% tabs %}");
    expect(out).toContain('label="200"');
    expect(out).toContain('label="404"');
    expect(out).toContain("{% /tabs %}");
  });

  it("renders inner Model/Example tabs when a response has both schema and examples", () => {
    const out = render(responses);
    expect(out).toContain('label="Model"');
    expect(out).toContain('label="Example"');
    expect(out).toContain("| Field");
    expect(out).toContain("```json");
  });

  it("omits inner tabs when only one of schema or examples is present", () => {
    const schemaOnly = render([
      { statusCode: "200", description: "", schema: responses[0].schema },
    ]);
    expect(schemaOnly).toContain("| Field");
    expect(schemaOnly).not.toContain('label="Model"');

    const examplesOnly = render([
      { statusCode: "200", description: "", examples: responses[0].examples },
    ]);
    expect(examplesOnly).toContain("```json");
    expect(examplesOnly).not.toContain('label="Model"');
  });

  it("renders the description above any inner content", () => {
    const out = render(responses);
    const idx200 = out.indexOf('label="200"');
    const idxOk = out.indexOf("OK", idx200);
    const idxModel = out.indexOf('label="Model"', idx200);
    expect(idxOk).toBeGreaterThan(idx200);
    expect(idxModel).toBeGreaterThan(idxOk);
  });

  it("builds a tabs tag node", () => {
    const node = apiResponseNode(responses);
    expect(node?.type).toBe("tag");
    expect(node?.tag).toBe("tabs");
  });

  it("puts the schema description before the table in the Model tab", () => {
    const out = render([
      { ...responses[0], schemaDescription: "Dashboard summary response." },
    ]);
    const modelTab = out.slice(out.indexOf('label="Model"'));
    expect(modelTab.indexOf("Dashboard summary response.")).toBeGreaterThan(-1);
    expect(modelTab.indexOf("Dashboard summary response.")).toBeLessThan(
      modelTab.indexOf("| Field"),
    );
  });

  it("puts the schema description before the table when there are no inner tabs", () => {
    const out = render([
      {
        statusCode: "200",
        description: "OK",
        schema: responses[0].schema,
        schemaDescription: "Dashboard summary response.",
      },
    ]);
    expect(out.indexOf("Dashboard summary response.")).toBeGreaterThan(-1);
    expect(out.indexOf("Dashboard summary response.")).toBeLessThan(
      out.indexOf("| Field"),
    );
  });

  /** As Hugo's HTML does: a primitive array's Model tab has no table. */
  it("renders Model/Example tabs with the schema description when a response has no rows", () => {
    const out = render([
      {
        statusCode: "200",
        description: "OK",
        schema: [],
        schemaDescription: "List of location names.",
        examples: [{ name: "Example", value: '["aws:eu-west-3"]' }],
      },
    ]);
    const modelTab = out.slice(
      out.indexOf('label="Model"'),
      out.indexOf('label="Example"'),
    );
    expect(modelTab).toContain("List of location names.");
    expect(modelTab).not.toContain("| Field");
  });

  it("renders only the example when a response has no rows and no schema description", () => {
    const out = render([
      {
        statusCode: "200",
        description: "OK",
        schema: [],
        examples: [{ name: "Example", value: '["namespace1"]' }],
      },
    ]);
    expect(out).toContain("namespace1");
    expect(out).not.toContain('label="Model"');
  });

  it("names a non-JSON response's content type in its Model tab, beside its example", () => {
    const out = render([
      {
        statusCode: "200",
        description: "OK",
        contentType: "text/csv",
        examples: [{ name: "Example", value: "a,b\n1,2", language: "csv" }],
      },
    ]);
    const modelTab = out.slice(
      out.indexOf('label="Model"'),
      out.indexOf('label="Example"'),
    );
    expect(modelTab).toContain("Content type: `text/csv`");
    expect(out).toContain("```csv\na,b\n1,2");
  });

  it("names a binary response's content type without inner tabs", () => {
    const out = render([
      { statusCode: "200", description: "OK", contentType: "application/zip" },
    ]);
    expect(out).toContain("Content type: `application/zip`");
    expect(out).not.toContain('label="Model"');
  });

  /** As Hugo's `.md` does: a header-only table. */
  it("gives an empty JSON response a header-only Model table", () => {
    const out = render([
      {
        statusCode: "202",
        description: "Accepted",
        schema: [],
        emptyBody: true,
        examples: [{ name: "Example", value: "{}" }],
      },
    ]);
    const modelTab = out.slice(
      out.indexOf('label="Model"'),
      out.indexOf('label="Example"'),
    );
    expect(modelTab).toMatch(
      /\| Field \| Type \| Description \|\n\| -+ \| -+ \| -+ \|\n\{% \/tab/,
    );
  });
});
