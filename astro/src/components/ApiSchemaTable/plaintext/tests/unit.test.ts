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

  it("leaves out the Parent field column when no row has a parent", () => {
    const out = render([
      field({
        name: "id",
        type: "string",
        required: true,
        description: "Identifier",
      }),
      field({
        name: "enabled",
        type: "boolean",
        description: "Whether enabled.",
      }),
    ]);

    expect(out).not.toContain("Parent field");
    expect(out).toMatch(/^\| Field +\| Type +\| Description +\|$/m);
    expect(out).toContain("Type");
    expect(out).toContain("Description");
    expect(out).toContain("id [*required*]");
    expect(out).toContain("enabled");
    expect(out).toContain("Identifier");
  });

  it("flattens nested children with the parent name in the first column", () => {
    const out = render([
      field({
        name: "data",
        type: "object",
        description: "Data wrapper.",
        children: [
          field({
            name: "attributes",
            type: "object",
            required: true,
            description: "Attrs.",
          }),
        ],
      }),
    ]);

    expect(out).toMatch(
      /^\| Parent field +\| Field +\| Type +\| Description +\|$/m,
    );
    expect(out).toMatch(/^\| +\| data +\|/m);
    expect(out).toMatch(/^\| data +\| attributes \[\*required\*\] +\|/m);
    expect(out).toContain("Attrs.");
  });

  it("renders union options with the <oneOf> placeholder type", () => {
    const out = render([
      field({
        name: "integration",
        type: "oneOf",
        required: true,
        description: "The integration.",
        unionOptions: [
          {
            label: "AWSIntegration",
            type: "object",
            fields: [
              field({
                name: "aws_account_id",
                type: "string",
                required: true,
                description: "AWS account.",
              }),
            ],
          },
        ],
      }),
    ]);

    expect(out).toContain("<oneOf>");
    expect(out).toContain("AWSIntegration");
    expect(out).toContain("aws_account_id [*required*]");
  });

  it("inlines enum values and default into the description", () => {
    const out = render([
      field({
        name: "level",
        type: "string",
        description: "Severity level.",
        enumValues: ["low", "medium", "high"],
        defaultValue: "medium",
      }),
    ]);

    expect(out).toContain("Severity level.");
    expect(out).toContain("Allowed enum values: `low`, `medium`, `high`.");
    expect(out).toContain("Default:");
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

  it("puts a DEPRECATED label before a deprecated field's description, as Hugo does", () => {
    const out = render([
      field({ name: "old_field", deprecated: true, description: "Old." }),
    ]);
    expect(out).toContain("| **DEPRECATED**: Old. |");
  });

  it("produces an AST table node, not a string", () => {
    const node = apiSchemaTableNode([field({ name: "x", type: "string" })]);
    expect(node?.type).toBe("table");
  });

  it("puts additionalProperties in the parent column of an <any-key> row, as Hugo does", () => {
    const out = render([
      field({
        name: "node_objects",
        type: "object",
        children: [
          field({
            name: "<any-key>",
            type: "object",
            description: "Base query.",
            children: [field({ name: "search", type: "string" })],
          }),
        ],
      }),
    ]);

    expect(out).toMatch(
      /\| additionalProperties +\| <any-key> +\| object +\| Base query\. +\|/,
    );
    expect(out).toMatch(/\| <any-key> +\| search +\| string +\|/);
  });
});
