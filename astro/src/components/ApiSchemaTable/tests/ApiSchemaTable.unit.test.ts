import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the nested ApiSchemaTableNav island.
import preactRenderer from "@astrojs/preact/server.js";
import ApiSchemaTable from "../ApiSchemaTable.astro";
import type { SchemaField } from "@lib/api/schemas/schemaField";

const nestedFields: SchemaField[] = [
  {
    name: "parent",
    type: "object",
    required: false,
    deprecated: false,
    readOnly: false,
    description: "A parent object",
    children: [
      {
        name: "child",
        type: "string",
        required: false,
        deprecated: false,
        readOnly: false,
        description: "A child field",
      },
    ],
  },
];

async function renderTable(props: {
  fields: SchemaField[];
  showExpandAll?: boolean;
  nameColumnLabel?: "name" | "field";
}) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(ApiSchemaTable, { props });
}

describe("ApiSchemaTable type column", () => {
  const unionField = (type: "oneOf" | "anyOf"): SchemaField[] => [
    {
      name: "basicAuth",
      type,
      required: false,
      deprecated: false,
      readOnly: false,
      description: "Object to handle basic authentication.",
      unionOptions: [
        {
          label: "<type=web>",
          type: "object",
          fields: [
            {
              name: "password",
              type: "string",
              required: true,
              deprecated: false,
              readOnly: false,
              description: "Password to use.",
            },
          ],
        },
      ],
    },
  ];

  it("renders a bare anyOf tag bracketed", async () => {
    const html = await renderTable({ fields: unionField("anyOf") });
    expect(html).toContain("&lt;anyOf&gt;");
  });
});

describe("ApiSchemaTable expand-all toolbar", () => {
  it("shows the toolbar when a field has unionOptions", async () => {
    const fields: SchemaField[] = [
      {
        name: "variant",
        type: "oneOf",
        required: false,
        deprecated: false,
        readOnly: false,
        description: "",
        unionOptions: [
          {
            label: "Option A",
            type: "object",
            fields: [
              {
                name: "value",
                type: "string",
                required: false,
                deprecated: false,
                readOnly: false,
                description: "",
              },
            ],
          },
        ],
      },
    ];
    const html = await renderTable({ fields });
    expect(html).toContain("schema-table__toolbar");
  });

  it("omits the toolbar when showExpandAll is false", async () => {
    const html = await renderTable({
      fields: nestedFields,
      showExpandAll: false,
    });
    expect(html).not.toContain("schema-table__toolbar");
  });
});

describe("ApiSchemaTable — modifiers and content", () => {
  it("marks a deprecated union option's row DEPRECATED", async () => {
    const html = await renderTable({
      fields: [
        {
          name: "query",
          type: "oneOf",
          required: false,
          deprecated: false,
          readOnly: false,
          description: "",
          unionOptions: [
            {
              label: "Option A",
              type: "object",
              description: "APM query.",
              deprecated: true,
              fields: [],
            },
          ],
        },
      ],
    });
    expect(html).toContain("schema-table__row--deprecated");
    expect(html).toMatch(/DEPRECATED<\/strong><\/p><p>APM query\./);
  });
});

describe("ApiSchemaTable multi-paragraph descriptions", () => {
  const multiParagraphField: SchemaField = {
    name: "is_read_only",
    type: "boolean",
    required: false,
    deprecated: false,
    readOnly: false,
    description: "First paragraph.\n\nSecond paragraph.",
  };

  it("puts the DEPRECATED label on its own line before the description", async () => {
    const html = await renderTable({
      fields: [{ ...multiParagraphField, deprecated: true }],
    });
    expect(html).toMatch(
      /<p><strong class="[^"]*schema-table__deprecated-label[^"]*">DEPRECATED<\/strong><\/p><p>First paragraph\.<\/p>/,
    );
  });
});
