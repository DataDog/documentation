/**
 * Every API `.md` route opens with frontmatter and the llms.txt banner, and its
 * breadcrumbs match the trail the HTML page shows.
 */
import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import { GET as landingGET } from "../../src/pages/[...lang]/api/latest.md";
import { GET as categoryGET } from "../../src/pages/[...lang]/api/latest/[category].md";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md";
import { GET as subPageGET } from "../../src/pages/[...lang]/api/latest/[...page].md";
import { getCategoriesView } from "@lib/api/viewsBuilder";

const SITE = new URL("https://docs.datadoghq.com");
const BANNER =
  "> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).";

type Handler = typeof landingGET;

async function render(
  handler: Handler,
  params: Record<string, string | undefined>,
  pathname: string,
): Promise<string> {
  const context = {
    params,
    url: new URL(pathname, SITE),
    site: SITE,
  } as unknown as Parameters<Handler>[0];
  const response = (await handler(context)) as Response;
  expect(response.status).toBe(200);
  return response.text();
}

function splitPreamble(text: string) {
  const match = /^---\n([\s\S]*?)\n---\n\n(.*)\n\n([\s\S]*)$/.exec(text);
  if (!match) throw new Error(`no preamble in:\n${text.slice(0, 400)}`);
  return {
    frontmatter: parseYaml(match[1]) as Record<string, string>,
    banner: match[2],
    body: match[3],
  };
}

describe("API .md preamble", () => {
  it("landing page", async () => {
    const text = await render(
      landingGET,
      { lang: undefined },
      "/api/latest.md",
    );
    const { frontmatter, banner, body } = splitPreamble(text);
    expect(frontmatter.title).toBe("API Reference");
    expect(frontmatter.description).toMatch(
      /^Browse the Datadog API reference/,
    );
    expect(frontmatter.breadcrumbs).toBe("Docs > API");
    expect(banner).toBe(BANNER);
    expect(body).toMatch(/^# API Reference\n/);
  });

  it("category page", async () => {
    const [category] = await getCategoriesView("en");
    const text = await render(
      categoryGET,
      { lang: undefined, category: category.slug },
      `/api/latest/${category.slug}.md`,
    );
    const { frontmatter, banner, body } = splitPreamble(text);
    expect(frontmatter.title).toBe(category.name);
    expect(frontmatter.description).toBeTruthy();
    expect(frontmatter.breadcrumbs).toBe(`Docs > API > ${category.name}`);
    expect(banner).toBe(BANNER);
    expect(body).toMatch(new RegExp(`^# ${category.name}\\n`));
  });

  it("operation page", async () => {
    const [category] = await getCategoriesView("en");
    const [operation] = category.operations;
    const text = await render(
      operationGET,
      { lang: undefined, category: category.slug, operation: operation.slug },
      `/api/latest/${category.slug}/${operation.slug}.md`,
    );
    const { frontmatter, banner, body } = splitPreamble(text);
    expect(frontmatter.title).toBe(operation.summary);
    expect(frontmatter.description).toBeTruthy();
    expect(frontmatter.breadcrumbs).toBe(`Docs > API > ${operation.summary}`);
    expect(banner).toBe(BANNER);
    expect(body.startsWith(`# ${operation.summary}\n`)).toBe(true);
  });

  it("hand-written sub-page", async () => {
    const text = await render(
      subPageGET,
      { lang: undefined, page: "rate-limits" },
      "/api/latest/rate-limits.md",
    );
    const { frontmatter, banner } = splitPreamble(text);
    expect(frontmatter.title).toBe("Rate Limits");
    expect(frontmatter.breadcrumbs).toBe("Docs > API > Rate Limits");
    expect(banner).toBe(BANNER);
  });
});
