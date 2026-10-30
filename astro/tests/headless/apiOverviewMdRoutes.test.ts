import { describe, it, expect, vi } from "vitest";
import type { APIContext } from "astro";

// A small frozen entry, not the live Overview `.mdoc` files: a card grid,
// which has a plaintext twin, and tabs, which don't.
vi.mock("astro:content", () => ({
  getCollection: async () => [],
  getEntry: async () => ({
    data: { title: "Fixture Overview Page", description: "Fixture." },
    body: [
      "Intro paragraph.",
      "",
      "{% card-grid card_width=100 %}",
      '  {% image-card href="https://github.com/DataDog/datadog-api-client-java" src="integrations_logos/java.png" alt="Java" /%}',
      "{% /card-grid %}",
      "",
      "{% tabs %}",
      '{% tab label="Go" %}',
      "Go content.",
      "{% /tab %}",
      "{% /tabs %}",
      "",
    ].join("\n"),
  }),
}));

const { GET: landingGET } =
  await import("../../src/pages/[...lang]/api/latest.md");
const { GET: subPageGET } =
  await import("../../src/pages/[...lang]/api/latest/[...page].md");

const SITE = new URL("https://docs.datadoghq.com");

async function render(
  handler: typeof landingGET,
  params: Record<string, string | undefined>,
  urlPath: string,
): Promise<string> {
  const response = await handler({
    params,
    url: new URL(urlPath, SITE),
    site: SITE,
  } as unknown as APIContext);
  return response.text();
}

const pages = [
  { name: "landing", handler: landingGET, params: {}, urlPath: "/api/latest.md" },
  {
    name: "subpage",
    handler: subPageGET,
    params: { page: "using-the-api" },
    urlPath: "/api/latest/using-the-api.md",
  },
];

describe.each(pages)("API Overview .md route: $name", (page) => {
  it("renders a card grid as a list of links, not Markdoc tags", async () => {
    const markdown = await render(page.handler, page.params, page.urlPath);

    expect(markdown).not.toContain("image-card");
    expect(markdown).toContain(
      "- [datadog-api-client-java](https://github.com/DataDog/datadog-api-client-java)",
    );
  });

  it("keeps tabs, which have no plaintext twin, as authored", async () => {
    const markdown = await render(page.handler, page.params, page.urlPath);

    expect(markdown).toContain('{% tab label="Go" %}');
  });

  it("puts the page title first, as an h1", async () => {
    const markdown = await render(page.handler, page.params, page.urlPath);
    const firstHeading = markdown.match(/^#+ .*$/m)?.[0];

    expect(firstHeading).toBe("# Fixture Overview Page");
  });
});
