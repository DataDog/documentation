import { describe, it, expect } from "vitest";
import { buildPageIndex } from "./pageIndex";
import type { PlaintextPage, PlaintextPageSource } from "./types";

const SITE = "https://docs.datadoghq.com";

function page(
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
    // buildPageIndex must never build bodies — fail loudly if it does.
    buildBody: async () => {
      throw new Error("buildPageIndex must not call buildBody");
    },
  };
}

function source(pages: PlaintextPage[]): PlaintextPageSource {
  return {
    title: "Test",
    listRootPages: async () => pages,
    listSections: async () => [],
  };
}

describe("buildPageIndex", () => {
  it("keys entries by siteOrigin + urlPath and derives the disk-relative file", async () => {
    const index = await buildPageIndex(
      [source([page("/api/latest/a.md"), page("/api/latest/b.md")])],
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

  it("never builds page bodies", async () => {
    // page().buildBody throws; a successful build proves it was not called.
    await expect(
      buildPageIndex([source([page("/api/latest/a.md")])], SITE),
    ).resolves.toBeDefined();
  });

  it("carries metadata through untouched, including isPrivate", async () => {
    const index = await buildPageIndex(
      [source([page("/api/latest/secret.md", { isPrivate: true })])],
      SITE,
    );
    expect(index[0].metadata.isPrivate).toBe(true);
    expect(index[0].metadata.title).toBe("Title /api/latest/secret.md");
  });

  it("sorts entries by key regardless of source order", async () => {
    const index = await buildPageIndex(
      [source([page("/api/latest/z.md"), page("/api/latest/a.md")])],
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
        [source([page("/api/latest/dup.md")]), source([page("/api/latest/dup.md")])],
        SITE,
      ),
    ).rejects.toThrow(/duplicate/i);
  });

  it("throws when siteOrigin is empty", async () => {
    await expect(
      buildPageIndex([source([page("/api/latest/a.md")])], ""),
    ).rejects.toThrow(/siteOrigin/);
  });
});
