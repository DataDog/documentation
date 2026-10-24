import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import ApiRequestBodyTabs from "../ApiRequestBodyTabs.astro";

const schema = [
  {
    name: "id",
    type: "string",
    required: true,
    deprecated: false,
    readOnly: false,
    description: "Identifier",
  },
];
const examples = [{ name: "Example", value: '{"id": "abc"}' }];
const multipleExamples = [
  { name: "First", value: '{"id": "abc"}' },
  { name: "Second", value: '{"id": "xyz"}' },
];

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container;
}

async function renderComponent(props: {
  schema: typeof schema;
  examples: { name: string; value: string; language?: string }[];
  showExampleTitles?: boolean;
}) {
  const container = await createContainer();
  return container.renderToString(ApiRequestBodyTabs, { props });
}

describe("ApiRequestBodyTabs (astro)", () => {
  it("renders only the schema table when no examples are provided", async () => {
    const html = await renderComponent({ schema, examples: [] });

    expect(html).toContain("schema-table");
    expect(html).not.toContain('role="tablist"');
    expect(html).not.toContain("code-block");
  });

  it("renders only code blocks when no schema is provided", async () => {
    const html = await renderComponent({ schema: [], examples });

    expect(html).toContain("code-block");
    expect(html).not.toContain("schema-table");
    expect(html).not.toContain('role="tablist"');
  });

  it("renders nothing meaningful when both schema and examples are empty", async () => {
    const html = await renderComponent({ schema: [], examples: [] });

    expect(html).not.toContain("schema-table");
    expect(html).not.toContain("code-block");
    expect(html).not.toContain('role="tablist"');
  });

  it("renders a Model/Example tab pair when both are provided", async () => {
    const html = await renderComponent({ schema, examples });

    expect(html).toMatch(/data-tab-index="0"[^>]*>Model</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Example</);
    expect(html).toContain("schema-table");
    expect(html).toContain("code-block");
  });

  // Hugo's request-body.html: a collapsible card per example, titled, with
  // the first one open.
  it("renders a titled accordion entry per example when titles are shown", async () => {
    const html = await renderComponent({
      schema,
      examples: multipleExamples,
      showExampleTitles: true,
    });

    const entries =
      html.match(/<details[^>]*request-body-tabs__accordion[^>]*>/g) ?? [];
    expect(entries).toHaveLength(2);
    expect(entries[0]).toContain("open");
    expect(entries[1]).not.toContain("open");
    expect(html).toMatch(
      /request-body-tabs__accordion-header[^>]*>[\s\S]*?<span>First<\/span>/,
    );
    expect(html).toMatch(/<span>Second<\/span>/);
  });

  it("renders untitled code blocks when titles aren't shown", async () => {
    const html = await renderComponent({
      schema,
      examples: multipleExamples,
      showExampleTitles: false,
    });

    expect(html).not.toContain("<details");
    expect(html).not.toContain("First");
    expect(html.match(/class="[^"]*code-block[ "]/g)?.length).toBeGreaterThan(
      0,
    );
  });

  it("titles the examples only when there is more than one, by default", async () => {
    const htmlMultiple = await renderComponent({
      schema,
      examples: multipleExamples,
    });
    expect(htmlMultiple).toContain("request-body-tabs__accordion");

    const htmlSingle = await renderComponent({ schema, examples });
    expect(htmlSingle).not.toContain("request-body-tabs__accordion");
  });

  it("labels the schema table's first column Field, as Hugo does", async () => {
    const html = await renderComponent({ schema, examples });

    expect(html).toMatch(/schema-table__columns-name[^>]*>Field</);
  });

  it("highlights an example in its own language, defaulting to JSON", async () => {
    const formExample = {
      name: "Example",
      value: "-F 'idp_file=@metadata.xml'",
      language: "bash",
    };
    const htmlForm = await renderComponent({ schema, examples: [formExample] });
    expect(htmlForm).toContain('data-language="bash"');

    const htmlJson = await renderComponent({ schema, examples });
    expect(htmlJson).toContain('data-language="json"');
  });
});
