import { describe, it, expect } from "vitest";
import { cdocsPageSource } from "./cdocsPageSource";
import { getCdocsPages } from "@lib/cdocs/pageLists";
import { buildCdocsSitemapXml } from "@lib/sitemap/cdocsSitemap";

const SITE = "https://docs.datadoghq.com";
const CUSTOM_INSTRUMENTATION_MD = "/dd_e2e/cdocs/custom_instrumentation.md";

async function pagesFor(urlPathPrefix: string) {
  const pages = await cdocsPageSource.listRootPages();
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

  it("labels each variant with its filter values", async () => {
    const pages = await pagesFor(CUSTOM_INSTRUMENTATION_MD);
    const pythonDatadogPage = pages.find(
      (page) =>
        page.urlPath ===
        `${CUSTOM_INSTRUMENTATION_MD}?api_type=dd_api&prog_lang=python`,
    );

    expect(pythonDatadogPage?.metadata.title).toBe(
      "Cdocs Test Page: Filterable Content (E2E Fixture)",
    );
    expect(pythonDatadogPage?.metadata.description).toMatch(
      /For customers using the following: Language: Python, API: Datadog\.$/,
    );
  });

  it("gives every variant of a page the same hash, and each page its own", async () => {
    const pages = await cdocsPageSource.listRootPages();
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

  it("has no sections, since a section's llms.txt file would be outside api/", async () => {
    expect(await cdocsPageSource.listSections()).toEqual([]);
  });

  it("lists the same variants as the sitemap", async () => {
    const sitemapPaths = [
      ...buildCdocsSitemapXml(await getCdocsPages(), SITE).matchAll(
        /<loc>(.*?)<\/loc>/g,
      ),
    ].map(([, loc]) => new URL(loc.replaceAll("&amp;", "&")).href);
    const sourcePaths = (await cdocsPageSource.listRootPages()).map((page) => {
      const [path, query] = page.urlPath.split("?");
      const htmlPath = path.replace(/\.md$/, "/");
      return new URL(query ? `${htmlPath}?${query}` : htmlPath, SITE).href;
    });

    expect(sitemapPaths.length).toBeGreaterThan(0);
    expect(sitemapPaths).toEqual(sourcePaths);
  });
});
