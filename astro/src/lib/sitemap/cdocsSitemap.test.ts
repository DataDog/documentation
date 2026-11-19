import { describe, it, expect } from "vitest";
import { buildCdocsSitemapXml } from "./cdocsSitemap";
import { prerender } from "../../pages/sitemap-cdocs.xml";
import { buildCdocsPage } from "@lib/cdocs/pageLists";
import { customizationConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

const page = buildCdocsPage({
  id: "guides/setup",
  title: "Setup",
  contentFilters: [
    { trait_id: "host", option_group_id: "host_options" },
    { trait_id: "database", option_group_id: "<HOST>_database_options" },
  ],
  customizationConfig,
});

const locs = (xml: string) =>
  [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => loc);

describe("buildCdocsSitemapXml", () => {
  it("lists each variant's canonical URL, escaped, with the bare URL for the default variant", () => {
    expect(
      locs(buildCdocsSitemapXml([page], "https://docs.datadoghq.com")),
    ).toEqual([
      "https://docs.datadoghq.com/guides/setup/",
      "https://docs.datadoghq.com/guides/setup/?database=postgres&amp;host=aws",
      "https://docs.datadoghq.com/guides/setup/?database=cosmos_db&amp;host=azure",
      "https://docs.datadoghq.com/guides/setup/?database=postgres&amp;host=azure",
    ]);
  });

  it("keeps the site's base path", () => {
    expect(
      locs(
        buildCdocsSitemapXml(
          [page],
          "https://docs-staging.datadoghq.com/my-branch",
        ),
      )[0],
    ).toBe("https://docs-staging.datadoghq.com/my-branch/guides/setup/");
  });

  it("is a valid, empty urlset when there are no Cdocs pages", () => {
    const xml = buildCdocsSitemapXml([], "https://docs.datadoghq.com");

    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(locs(xml)).toEqual([]);
  });

  it("is built ahead of time, as a file", () => {
    expect(prerender).toBe(true);
  });
});
