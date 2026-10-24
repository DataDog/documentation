import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { documentNode } from "@lib/plaintext/helpers";
import { apiRequestBodyTabsNodes } from "../ApiRequestBodyTabs";
import type { SchemaField } from "@lib/api/schemas/schemaField";

const schema: SchemaField[] = [
  {
    name: "id",
    type: "string",
    required: true,
    deprecated: false,
    readOnly: false,
    description: "Identifier",
  },
];
const examples = [{ name: "Default", value: '{"id":"abc"}' }];

function render(props: {
  schema: SchemaField[];
  examples: { name: string; value: string; language?: string }[];
  showExampleTitles?: boolean;
}): string {
  const contents = apiRequestBodyTabsNodes(props);
  return format(documentNode(contents));
}

describe("apiRequestBodyTabsNodes", () => {
  it("returns an empty list when both schema and examples are empty", () => {
    expect(apiRequestBodyTabsNodes({ schema: [], examples: [] })).toEqual([]);
  });

  it("returns just the schema table when no examples are present", () => {
    const out = render({ schema, examples: [] });
    expect(out).toContain("| Field");
    expect(out).not.toContain("{% tabs %}");
  });

  it("returns just the example fence when no schema is present", () => {
    const out = render({ schema: [], examples });
    expect(out).toContain("```json");
    expect(out).toContain('{"id":"abc"}');
    expect(out).not.toContain("{% tabs %}");
  });

  it("wraps schema and examples in Model/Example tabs when both are present", () => {
    const out = render({ schema, examples });
    expect(out).toContain("{% tabs %}");
    expect(out).toContain('label="Model"');
    expect(out).toContain('label="Example"');
    expect(out).toContain("| Field");
    expect(out).toContain("```json");
  });

  it("labels each example by name when there are multiple", () => {
    const multi = [
      { name: "First", value: "{}" },
      { name: "Second", value: "{}" },
    ];
    const out = render({ schema: [], examples: multi });
    expect(out).toContain("**First**");
    expect(out).toContain("**Second**");
  });

  it("leaves the examples untitled when titles aren't shown", () => {
    const multi = [
      { name: "First", value: "{}" },
      { name: "Second", value: "{}" },
    ];
    const out = render({
      schema: [],
      examples: multi,
      showExampleTitles: false,
    });
    expect(out).not.toContain("First");
  });

  it("titles a single example when titles are shown", () => {
    const out = render({ schema, examples, showExampleTitles: true });
    expect(out).toContain("**Default**");
  });

  it("fences an example in its own language, defaulting to JSON", () => {
    const out = render({
      schema,
      examples: [
        {
          name: "Form",
          value: "-F 'idp_file=@metadata.xml'",
          language: "bash",
        },
      ],
    });
    expect(out).toContain("```bash\n-F 'idp_file=@metadata.xml'");
    expect(render({ schema, examples })).toContain("```json");
  });
});
