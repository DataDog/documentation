import { describe, it, expect } from "vitest";
import { buildPageIndex, collectPages } from "./pageIndex";
import type { PlaintextPage, PlaintextPageSource } from "./types";

const SITE = "https://docs.datadoghq.com";
const PREVIEW_SITE = "https://docs-staging.datadoghq.com/my-branch";

function stubPage(
  urlPath: string,
  overrides: Partial<PlaintextPage["metadata"]> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: {
      title: `Title ${urlPath}`,
      description: `Description ${urlPath}`,
      breadcrumbs: ["Docs"],
      isPrivate: false,
      ...overrides,
    },
  };
}

function stubSource(
  rootPages: PlaintextPage[],
  sections: PlaintextPage[][] = [],
): PlaintextPageSource {
  return {
    title: "Test",
    listRootPages: async () => rootPages,
    listSections: async () =>
      sections.map((pages, i) => ({
        title: `Section ${i}`,
        llmsTxtPath: `/section-${i}/llms.txt`,
        pages,
      })),
  };
}

describe("collectPages", () => {
  it("flattens root pages and every section's pages across sources", async () => {
    const pages = await collectPages([
      stubSource([stubPage("/a.md")], [[stubPage("/b.md"), stubPage("/c.md")]]),
      stubSource([stubPage("/d.md")]),
    ]);
    expect(pages.map((page) => page.urlPath)).toEqual([
      "/a.md",
      "/b.md",
      "/c.md",
      "/d.md",
    ]);
  });

  it("does not dedupe (buildPageIndex is what rejects duplicates)", async () => {
    const pages = await collectPages([
      stubSource([stubPage("/dup.md")]),
      stubSource([stubPage("/dup.md")]),
    ]);
    expect(pages).toHaveLength(2);
  });
});

describe("buildPageIndex", () => {
  it("keys entries by absolute URL and derives the disk-relative file", async () => {
    const index = await buildPageIndex(
      [stubSource([stubPage("/api/latest/a.md"), stubPage("/api/latest/b.md")])],
      SITE,
    );
    expect(index.map((entry) => entry.key)).toEqual([
      "https://docs.datadoghq.com/api/latest/a.md",
      "https://docs.datadoghq.com/api/latest/b.md",
    ]);
    expect(index.map((entry) => entry.file)).toEqual([
      "api/latest/a.md",
      "api/latest/b.md",
    ]);
  });

  it("keeps the site's base path in keys but not in disk files", async () => {
    const index = await buildPageIndex(
      [stubSource([stubPage("/api/latest/a.md")])],
      PREVIEW_SITE,
    );
    expect(index[0].key).toBe(
      "https://docs-staging.datadoghq.com/my-branch/api/latest/a.md",
    );
    // Astro emits at the output root regardless of the site's base path.
    expect(index[0].file).toBe("api/latest/a.md");
  });

  it("accepts a URL as well as a string, matching Astro's `site`", async () => {
    const index = await buildPageIndex(
      [stubSource([stubPage("/api/latest/a.md")])],
      new URL(PREVIEW_SITE),
    );
    expect(index[0].key).toBe(
      "https://docs-staging.datadoghq.com/my-branch/api/latest/a.md",
    );
  });

  it("carries metadata through untouched, including isPrivate", async () => {
    const index = await buildPageIndex(
      [stubSource([stubPage("/api/latest/secret.md", { isPrivate: true })])],
      SITE,
    );
    expect(index[0].metadata.isPrivate).toBe(true);
    expect(index[0].metadata.title).toBe("Title /api/latest/secret.md");
  });

  it("sorts entries by key regardless of source order", async () => {
    const index = await buildPageIndex(
      [stubSource([stubPage("/api/latest/z.md"), stubPage("/api/latest/a.md")])],
      SITE,
    );
    expect(index.map((entry) => entry.key)).toEqual([
      "https://docs.datadoghq.com/api/latest/a.md",
      "https://docs.datadoghq.com/api/latest/z.md",
    ]);
  });

  it("throws on duplicate urlPath across sources", async () => {
    await expect(
      buildPageIndex(
        [
          stubSource([stubPage("/api/latest/dup.md")]),
          stubSource([stubPage("/api/latest/dup.md")]),
        ],
        SITE,
      ),
    ).rejects.toThrow(/duplicate/i);
  });

  it("throws when site is empty", async () => {
    await expect(
      buildPageIndex([stubSource([stubPage("/api/latest/a.md")])], ""),
    ).rejects.toThrow(/site/);
  });
});
