import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of nested ApiSchemaTable islands.
import preactRenderer from "@astrojs/preact/server.js";
import ApiResponse from "../ApiResponse.astro";
import type { ResponseData } from "@lib/api/schemas/views";

const responses = [
  {
    statusCode: "200",
    description: "OK response",
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
    examples: [{ name: "Example 1", value: '{"ok": true}' }],
  },
  {
    statusCode: "404",
    description: "Not found response",
  },
];

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container;
}

async function renderComponent(props: { responses: ResponseData[] }) {
  const container = await createContainer();
  return container.renderToString(ApiResponse, { props });
}

describe("ApiResponse (astro)", () => {
  it("renders nothing when responses is empty", async () => {
    const html = await renderComponent({ responses: [] });

    expect(html).not.toContain("api-response__heading");
    expect(html).not.toContain('role="tablist"');
  });

  it("renders a schema table without inner tabs when a response has only a schema", async () => {
    const html = await renderComponent({
      responses: [
        { statusCode: "200", description: "", schema: responses[0].schema },
      ],
    });

    expect(html).toContain("schema-table");
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
  });

  it("renders code blocks without inner tabs when a response has only examples", async () => {
    const html = await renderComponent({
      responses: [
        { statusCode: "200", description: "", examples: responses[0].examples },
      ],
    });

    expect(html).toContain("code-block");
    expect(html).toContain("api-response__example");
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
  });

  it("interprets the description as HTML (allows markup passthrough)", async () => {
    const html = await renderComponent({
      responses: [{ statusCode: "200", description: "Hello <em>world</em>" }],
    });

    expect(html).toContain("Hello <em>world</em>");
  });

  it("renders the schema description when there are no inner tabs", async () => {
    const html = await renderComponent({
      responses: [
        {
          statusCode: "200",
          description: "",
          schema: responses[0].schema,
          schemaDescription: "Dashboard summary response.",
        },
      ],
    });

    expect(html).toContain("api-response__schema-description");
    expect(html).toContain("Dashboard summary response.");
  });

  /**
   * A top-level array of primitives has no rows. Hugo still shows its Model
   * tab, with the schema description and the table hidden.
   */
  it("renders Model/Example tabs with the schema description when a response has no rows", async () => {
    const html = await renderComponent({
      responses: [
        {
          statusCode: "200",
          description: "OK",
          schema: [],
          schemaDescription: "List of location names.",
          examples: [{ name: "Example", value: '["aws:eu-west-3"]' }],
        },
      ],
    });

    expect(html).toMatch(/data-tab-index="0"[^>]*>Model</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Example</);
    expect(html).toContain("List of location names.");
    expect(html).not.toContain("schema-table__table");
  });

  it("renders only the example when a response has no rows and no schema description", async () => {
    const html = await renderComponent({
      responses: [
        {
          statusCode: "200",
          description: "OK",
          schema: [],
          examples: [{ name: "Example", value: '["namespace1"]' }],
        },
      ],
    });

    expect(html).toContain("api-response__example");
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
  });
});
