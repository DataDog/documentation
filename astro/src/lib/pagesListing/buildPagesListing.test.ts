import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { buildPagesListing } from "./buildPagesListing";
import { PagesListingSchema } from "./schema";
import type { PlaintextPage, PlaintextPageSource } from "./types";

const SITE = "https://docs.datadoghq.com";

function md5Hex(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

function page(
  urlPath: string,
  body: string,
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
    buildBody: async () => body,
  };
}

function source(pages: PlaintextPage[]): PlaintextPageSource {
  return {
    title: "Test",
    listRootPages: async () => pages,
    listSections: async () => [],
  };
}

describe("buildPagesListing", () => {
  it("keys entries by siteOrigin + urlPath, all ending in .md", async () => {
    const listing = await buildPagesListing(
      [source([page("/api/latest/a.md", "A"), page("/api/latest/b.md", "B")])],
      SITE,
    );
    const keys = Object.keys(listing);
    expect(keys).toEqual([
      "https://docs.datadoghq.com/api/latest/a.md",
      "https://docs.datadoghq.com/api/latest/b.md",
    ]);
    for (const key of keys) expect(key.endsWith(".md")).toBe(true);
  });

  it("emits { metadata, mdocHash, source: 'astro' } and validates against the schema", async () => {
    const listing = await buildPagesListing(
      [source([page("/api/latest/a.md", "A")])],
      SITE,
    );
    const entry = listing["https://docs.datadoghq.com/api/latest/a.md"];
    expect(entry.source).toBe("astro");
    expect(entry.metadata.title).toBe("Title /api/latest/a.md");
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();
  });

  it("mdocHash is the 32-char md5 of buildBody() output", async () => {
    const listing = await buildPagesListing(
      [source([page("/api/latest/a.md", "hello body")])],
      SITE,
    );
    const entry = listing["https://docs.datadoghq.com/api/latest/a.md"];
    expect(entry.mdocHash).toHaveLength(32);
    expect(entry.mdocHash).toBe(md5Hex("hello body"));
  });

  it("returns keys in sorted order regardless of source order", async () => {
    const listing = await buildPagesListing(
      [source([page("/api/latest/z.md", "Z"), page("/api/latest/a.md", "A")])],
      SITE,
    );
    expect(Object.keys(listing)).toEqual([
      "https://docs.datadoghq.com/api/latest/a.md",
      "https://docs.datadoghq.com/api/latest/z.md",
    ]);
  });

  it("includes private pages, preserving isPrivate: true", async () => {
    const listing = await buildPagesListing(
      [source([page("/api/latest/secret.md", "S", { isPrivate: true })])],
      SITE,
    );
    const entry = listing["https://docs.datadoghq.com/api/latest/secret.md"];
    expect(entry.metadata.isPrivate).toBe(true);
  });

  it("throws on duplicate urlPath across sources", async () => {
    await expect(
      buildPagesListing(
        [
          source([page("/api/latest/dup.md", "A")]),
          source([page("/api/latest/dup.md", "B")]),
        ],
        SITE,
      ),
    ).rejects.toThrow(/duplicate/i);
  });

  it("throws when siteOrigin is empty", async () => {
    await expect(
      buildPagesListing([source([page("/api/latest/a.md", "A")])], ""),
    ).rejects.toThrow(/siteOrigin/);
  });
});
