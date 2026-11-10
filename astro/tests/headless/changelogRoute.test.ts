import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import preactRenderer from "@astrojs/preact/server.js";
import ChangelogPage from "../../src/pages/[...lang]/api/changelog/[...path].astro";

// The route reads tests/fixtures/api/changelog/, which has 6 entries: every
// filter fits on page 1.
const BASE_URL = "http://localhost:4321";

let container: Awaited<ReturnType<typeof AstroContainer.create>>;

beforeAll(async () => {
  container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
});

async function renderChangelog(
  params: { lang?: string; path?: string },
  urlPath: string,
): Promise<Response> {
  return container.renderToResponse(ChangelogPage, {
    params,
    request: new Request(`${BASE_URL}${urlPath}`),
  });
}

describe("changelog route", () => {
  it("renders the landing page with its title", async () => {
    const response = await renderChangelog({}, "/api/changelog/");
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain("<title>API Changelog</title>");
    expect(html).toContain("api-changelog-timeline");
  });

  it("qualifies a filtered page's title", async () => {
    const response = await renderChangelog(
      { path: "breaking" },
      "/api/changelog/breaking/",
    );
    expect(await response.text()).toContain(
      "<title>Breaking changes - API Changelog</title>",
    );
  });

  it("points a filtered page's markdown twin at the whole changelog", async () => {
    const response = await renderChangelog(
      { lang: "ja", path: "added" },
      "/ja/api/changelog/added/",
    );
    const html = await response.text();
    expect(html).toMatch(/\/ja\/api\/changelog\.md/);
    expect(html).not.toMatch(/changelog\/added\.md/);
  });

  it.each([
    ["a page past the end", "added/2"],
    ["an unknown filter", "renamed"],
  ])("404s on %s", async (_label, path) => {
    const response = await renderChangelog({ path }, `/api/changelog/${path}/`);
    expect(response.status).toBe(404);
  });
});
