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

  it("builds a tabs tag node", () => {
    const node = apiResponseNode(responses);
    expect(node?.type).toBe("tag");
    expect(node?.tag).toBe("tabs");
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
});
