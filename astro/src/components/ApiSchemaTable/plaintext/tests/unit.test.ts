import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { documentNode } from "@lib/plaintext/helpers";
import { apiSchemaTableNode } from "../ApiSchemaTable";
import type { SchemaField } from "@lib/api/schemas/schemaField";

const field = (overrides: Partial<SchemaField> = {}): SchemaField => ({
  name: "",
  type: "string",
  required: false,
  deprecated: false,
  readOnly: false,
  description: "",
  ...overrides,
});

function render(fields: SchemaField[]): string {
  const node = apiSchemaTableNode(fields);
  if (node === null) {
    return "";
  }
  return format(documentNode([node]));
}

describe("apiSchemaTableNode", () => {
  it("returns null when there are no fields", () => {
    expect(apiSchemaTableNode([])).toBeNull();
  });

  it("inlines an option's enum values and default into its description", () => {
    const out = render([
      field({
        name: "aggregation",
        type: "oneOf",
        unionOptions: [
          {
            label: "Object 1",
            type: "enum",
            description: "Standard aggregation types.",
            enumValues: ["avg", "sum"],
            defaultValue: "avg",
            fields: [],
          },
        ],
      }),
    ]);

    expect(out).toMatch(
      /\| aggregation +\| Object 1 +\| enum +\| Standard aggregation types\. Allowed enum values: `avg`, `sum`\. Default: `avg`\. +\|/,
    );
  });

  it("rewrites a description's reference links as inline links, since a table cell can't hold their definitions", () => {
    const out = render([
      field({
        name: "query",
        description: [
          "See the [Triggered Monitors page][1] and the [Manage Monitors documentation][2].",
          "",
          "[1]: https://app.datadoghq.com/monitors/triggered",
          "[2]: /monitors/manage/#triggered-monitors",
        ].join("\n"),
      }),
    ]);
    expect(out).toContain(
      "[Triggered Monitors page](https://app.datadoghq.com/monitors/triggered)",
    );
    expect(out).toContain(
      "[Manage Monitors documentation](/monitors/manage/#triggered-monitors)",
    );
    expect(out).not.toContain("[1]");
    expect(out).not.toContain("[2]");
  });

  it("puts a DEPRECATED label before a deprecated option's description", () => {
    const out = render([
      field({
        name: "query",
        type: "oneOf",
        unionOptions: [
          {
            label: "<data_source=apm>",
            type: "object",
            description: "APM query.",
            deprecated: true,
            fields: [],
          },
        ],
      }),
    ]);
    expect(out).toContain("| **DEPRECATED**: APM query. |");
  });

  it("produces an AST table node, not a string", () => {
    const node = apiSchemaTableNode([field({ name: "x", type: "string" })]);
    expect(node?.type).toBe("table");
  });
});
