import { describe, it, expect } from "vitest";
import { assemblePagesListing } from "./assemblePagesListing";
import { PagesListingSchema } from "./schema";

const meta = (overrides = {}) => ({
  title: "T",
  description: "D",
  breadcrumbs: ["Docs"],
  isPrivate: false,
  ...overrides,
});

const HASH = "0".repeat(32);

describe("assemblePagesListing", () => {
  it("builds a schema-valid record keyed by entry key, sorted", () => {
    const listing = assemblePagesListing([
      { key: "https://x/z.md", metadata: meta(), mdocHash: HASH },
      { key: "https://x/a.md", metadata: meta(), mdocHash: HASH },
    ]);
    expect(Object.keys(listing)).toEqual(["https://x/a.md", "https://x/z.md"]);
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();
  });

  it("emits { metadata, mdocHash, source: 'astro' }", () => {
    const listing = assemblePagesListing([
      { key: "https://x/a.md", metadata: meta(), mdocHash: HASH },
    ]);
    expect(listing["https://x/a.md"]).toEqual({
      metadata: meta(),
      mdocHash: HASH,
      source: "astro",
    });
  });

  it("throws on a duplicate key", () => {
    expect(() =>
      assemblePagesListing([
        { key: "https://x/a.md", metadata: meta(), mdocHash: HASH },
        { key: "https://x/a.md", metadata: meta(), mdocHash: HASH },
      ]),
    ).toThrow(/duplicate/i);
  });

  it("rejects a malformed hash via the schema", () => {
    expect(() =>
      assemblePagesListing([
        { key: "https://x/a.md", metadata: meta(), mdocHash: "tooshort" },
      ]),
    ).toThrow();
  });
});
