import { describe, it, expect } from "vitest";
import { isSitemapPage } from "./sitemapFilter";

describe("isSitemapPage", () => {
  it("keeps API docs pages", () => {
    expect(
      isSitemapPage("https://docs.datadoghq.com/api/latest/metrics/"),
    ).toBe(true);
    expect(
      isSitemapPage(
        "https://docs.datadoghq.com/fr/api/latest/metrics/submit-metrics/",
      ),
    ).toBe(true);
    expect(
      isSitemapPage("https://docs.datadoghq.com/api/latest/using-the-api/"),
    ).toBe(true);
  });

  it("excludes dd_e2e scaffolding", () => {
    expect(
      isSitemapPage("https://docs.datadoghq.com/dd_e2e/components/alert/"),
    ).toBe(false);
  });

  it("excludes the root redirect stub", () => {
    expect(isSitemapPage("https://docs.datadoghq.com/")).toBe(false);
  });

  it("excludes the build-time metadata sidecars", () => {
    expect(isSitemapPage("https://docs.datadoghq.com/pages-index.json")).toBe(
      false,
    );
    expect(isSitemapPage("https://docs.datadoghq.com/llms-index.json")).toBe(
      false,
    );
  });

  it("excludes the mobile nav data file", () => {
    expect(
      isSitemapPage("https://docs.datadoghq.com/api/mobile-nav.json"),
    ).toBe(false);
    expect(
      isSitemapPage("https://docs.datadoghq.com/ja/api/mobile-nav.json"),
    ).toBe(false);
  });

  it("keeps the changelog landing page in every locale", () => {
    expect(isSitemapPage("https://docs.datadoghq.com/api/changelog/")).toBe(
      true,
    );
    expect(isSitemapPage("https://docs.datadoghq.com/ja/api/changelog/")).toBe(
      true,
    );
  });

  it("excludes filtered and later changelog pages", () => {
    for (const path of [
      "/api/changelog/2/",
      "/api/changelog/breaking/",
      "/api/changelog/added/3/",
      "/ja/api/changelog/2/",
      "/fr/api/changelog/modified/",
    ]) {
      expect(isSitemapPage(`https://docs.datadoghq.com${path}`), path).toBe(
        false,
      );
    }
  });
});
