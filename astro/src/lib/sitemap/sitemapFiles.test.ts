import { describe, it, expect } from "vitest";
import { isSitemapFile } from "./sitemapFiles";

describe("isSitemapFile", () => {
  it("matches the sitemap index and its chunks at the root", () => {
    for (const filePath of [
      "sitemap-index.xml",
      "sitemap-0.xml",
      "sitemap-12.xml",
    ]) {
      expect(isSitemapFile(filePath), filePath).toBe(true);
    }
  });

  it("doesn't match Hugo's sitemap, other files, or sitemaps in a folder", () => {
    for (const filePath of [
      "sitemap.xml",
      "sitemap-other.xml",
      "sitemap-index.xml.bak",
      "api/sitemap-index.xml",
      "fr/sitemap-0.xml",
    ]) {
      expect(isSitemapFile(filePath), filePath).toBe(false);
    }
  });
});
