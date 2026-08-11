import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { buildListingFromIndex } from "./buildListingFromIndex";
import {
  PagesListingSchema,
  type PageIndexEntry,
  type PageMetadataInput,
} from "./types";

const md5Hex = (input: string) =>
  createHash("md5").update(input, "utf8").digest("hex");

const HASH = "0".repeat(32);

const metadata = {
  title: "T",
  description: "D",
  breadcrumbs: ["Docs"],
  isPrivate: false,
};

const index: PageIndexEntry[] = [
  { key: "https://x/a.md", file: "a.md", metadata },
  { key: "https://x/b.md", file: "b.md", metadata },
];

describe("buildListingFromIndex", () => {
  it("hashes each entry's file contents via the injected reader", async () => {
    const bodies: Record<string, string> = { "a.md": "body A", "b.md": "body B" };
    const listing = await buildListingFromIndex(index, async (file) => bodies[file]);

    expect(listing["https://x/a.md"].mdocHash).toBe(md5Hex("body A"));
    expect(listing["https://x/b.md"].mdocHash).toBe(md5Hex("body B"));
  });

  it("emits { metadata, mdocHash, source: 'astro' } per entry", async () => {
    const listing = await buildListingFromIndex(index.slice(0, 1), async () => "x");
    expect(listing["https://x/a.md"]).toEqual({
      metadata,
      mdocHash: md5Hex("x"),
      source: "astro",
    });
  });

  it("reads each file exactly once", async () => {
    const reads: string[] = [];
    await buildListingFromIndex(index, async (file) => {
      reads.push(file);
      return "x";
    });
    expect(reads.sort()).toEqual(["a.md", "b.md"]);
  });

  it("preserves the index's (already sorted) key order", async () => {
    const listing = await buildListingFromIndex(index, async () => "x");
    expect(Object.keys(listing)).toEqual(["https://x/a.md", "https://x/b.md"]);
  });

  it("produces a schema-valid listing", async () => {
    const listing = await buildListingFromIndex(index, async () => "x");
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();
  });

  it("defaults a missing isPrivate to false rather than dropping it", async () => {
    // A source that never sets isPrivate, e.g. one whose frontmatter omits it.
    const partialMetadata: PageMetadataInput = {
      title: "T",
      description: "D",
      breadcrumbs: ["Docs"],
    };
    const entry = {
      key: "https://x/a.md",
      file: "a.md",
      metadata: partialMetadata,
    } as PageIndexEntry;

    const listing = await buildListingFromIndex([entry], async () => "x");
    expect(listing["https://x/a.md"].metadata.isPrivate).toBe(false);
  });

  it("rejects a malformed hash via the schema", async () => {
    // Bypass the hashing path to prove the schema is the backstop.
    await expect(
      PagesListingSchema.parseAsync({
        "https://x/a.md": { metadata, mdocHash: "tooshort", source: "astro" },
      }),
    ).rejects.toThrow();
    // And a well-formed one passes.
    expect(() =>
      PagesListingSchema.parse({
        "https://x/a.md": { metadata, mdocHash: HASH, source: "astro" },
      }),
    ).not.toThrow();
  });
});
