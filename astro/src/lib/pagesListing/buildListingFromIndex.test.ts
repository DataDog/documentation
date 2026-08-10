import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { buildListingFromIndex } from "./buildListingFromIndex";
import type { PageIndexEntry } from "./pageIndex";

const md5Hex = (input: string) =>
  createHash("md5").update(input, "utf8").digest("hex");

const meta = { title: "T", description: "D", breadcrumbs: ["Docs"], isPrivate: false };

const index: PageIndexEntry[] = [
  { key: "https://x/a.md", file: "a.md", metadata: meta },
  { key: "https://x/b.md", file: "b.md", metadata: meta },
];

describe("buildListingFromIndex", () => {
  it("hashes each entry's file contents via the injected reader", async () => {
    const bodies: Record<string, string> = { "a.md": "body A", "b.md": "body B" };
    const listing = await buildListingFromIndex(index, async (file) => bodies[file]);

    expect(listing["https://x/a.md"].mdocHash).toBe(md5Hex("body A"));
    expect(listing["https://x/b.md"].mdocHash).toBe(md5Hex("body B"));
    expect(listing["https://x/a.md"].source).toBe("astro");
  });

  it("reads each file exactly once", async () => {
    const reads: string[] = [];
    await buildListingFromIndex(index, async (file) => {
      reads.push(file);
      return "x";
    });
    expect(reads.sort()).toEqual(["a.md", "b.md"]);
  });
});
