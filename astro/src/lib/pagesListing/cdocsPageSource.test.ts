import { describe, it, expect } from "vitest";
import { cdocsPageSource } from "./cdocsPageSource";
import { getCdocsPages } from "@lib/cdocs/pageLists";
import { listOnDemandSitemapPaths } from "@lib/sitemap/onDemandPages";

const SITE = "https://docs.datadoghq.com";
const CUSTOM_INSTRUMENTATION_MD = "/dd_e2e/cdocs/custom_instrumentation.md";

async function allPages() {
  const sections = await cdocsPageSource.listSections();
  return sections.flatMap((section) => section.pages);
}

async function pagesFor(urlPathPrefix: string) {
  const pages = await allPages();
  return pages.filter(
    (page) =>
      page.urlPath === urlPathPrefix ||
      page.urlPath.startsWith(`${urlPathPrefix}?`),
  );
}

describe("cdocsPageSource", () => {
  it("lists every variant's plaintext URL, with the bare URL for the default variant", async () => {
    const urlPaths = (await pagesFor(CUSTOM_INSTRUMENTATION_MD)).map(
      (page) => page.urlPath,
    );

    // Four languages, two APIs.
    expect(urlPaths).toHaveLength(8);
    expect(urlPaths[0]).toBe(CUSTOM_INSTRUMENTATION_MD);
    expect(urlPaths[1]).toBe(
      `${CUSTOM_INSTRUMENTATION_MD}?api_type=dd_api&prog_lang=java`,
    );
  });

  it("labels each variant's title with its filter values, and describes it as a version of the page", async () => {
    const pages = await pagesFor(CUSTOM_INSTRUMENTATION_MD);
    const pythonDatadogPage = pages.find(
      (page) =>
        page.urlPath ===
        `${CUSTOM_INSTRUMENTATION_MD}?api_type=dd_api&prog_lang=python`,
    );

    expect(pythonDatadogPage?.metadata.title).toBe(
      "Cdocs Test Page: Filterable Content (E2E Fixture) (Language: Python, API: Datadog)",
    );
    expect(pythonDatadogPage?.metadata.description).toMatch(
      /^A version of the "Cdocs Test Page: Filterable Content \(E2E Fixture\)" page, scoped to the customer preferences in its title\. Proof-of-concept/,
    );
  });

  it("gives each variant its page's folder path as breadcrumbs", async () => {
    const pages = await pagesFor(CUSTOM_INSTRUMENTATION_MD);

    for (const page of pages) {
      expect(page.metadata.breadcrumbs).toEqual(["Docs", "dd_e2e", "cdocs"]);
    }
  });

  it("gives every variant of a page the same hash, and each page its own", async () => {
    const pages = await allPages();
    const hashesByPagePath = new Map<string, Set<string | undefined>>();
    for (const page of pages) {
      const pagePath = page.urlPath.split("?")[0];
      const hashes = hashesByPagePath.get(pagePath) ?? new Set();
      hashes.add(page.mdocHash);
      hashesByPagePath.set(pagePath, hashes);
    }

    expect(hashesByPagePath.size).toBeGreaterThan(1);
    const pageHashes = [...hashesByPagePath.values()].map((hashes) => {
      expect(hashes.size).toBe(1);
      const [hash] = hashes;
      expect(hash).toMatch(/^[0-9a-f]{32}$/);
      return hash;
    });
    expect(new Set(pageHashes).size).toBe(pageHashes.length);
  });

  it("has a section for each top folder in the content collection, and no root pages", async () => {
    const sections = await cdocsPageSource.listSections();

    expect(
      sections.map(({ title, llmsTxtPath }) => ({ title, llmsTxtPath })),
    ).toEqual([{ title: "dd_e2e", llmsTxtPath: "/dd_e2e/llms.txt" }]);
    expect(sections[0].pages).toEqual(await allPages());
    expect(await cdocsPageSource.listRootPages()).toEqual([]);
  });

  it("lists the same variants as the sitemap", async () => {
    const sitemapPaths = listOnDemandSitemapPaths(await getCdocsPages()).map(
      (path) => new URL(path, SITE).href,
    );
    const sourcePaths = (await allPages()).map((page) => {
      const [path, query] = page.urlPath.split("?");
      const htmlPath = path.replace(/\.md$/, "/");
      return new URL(query ? `${htmlPath}?${query}` : htmlPath, SITE).href;
    });

    expect(sitemapPaths.length).toBeGreaterThan(0);
    expect(sitemapPaths).toEqual(sourcePaths);
  });
});
