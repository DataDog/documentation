import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { collectPages } from "@lib/pagesListing/collectPages";
import { pageSources } from "@lib/pagesListing/pageSources";
import type { PageIndexEntry } from "@lib/pagesListing/pageIndex";
import { buildListingFromIndex } from "@lib/pagesListing/buildListingFromIndex";
import { PagesListingSchema } from "@lib/pagesListing/schema";
import { getCategoriesView } from "@lib/api/viewsBuilder";

import { GET as pageIndexGET } from "../../src/pages/pages-index.json.ts";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md.ts";

const ctx = (site?: URL) =>
  ({ site }) as unknown as Parameters<typeof pageIndexGET>[0];

async function readIndex(): Promise<PageIndexEntry[]> {
  const res = (await pageIndexGET(
    ctx(new URL("https://docs.datadoghq.com")),
  )) as Response;
  return JSON.parse(await res.text());
}

describe("GET /pages-index.json (metadata sidecar)", () => {
  it("returns application/json", async () => {
    const res = (await pageIndexGET(
      ctx(new URL("https://docs.datadoghq.com")),
    )) as Response;
    expect(res.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  });

  it("emits sorted entries with absolute .md keys and disk-relative files", async () => {
    const index = await readIndex();
    expect(index.length).toBeGreaterThan(0);
    for (const entry of index) {
      expect(entry.key.startsWith("https://docs.datadoghq.com/")).toBe(true);
      expect(entry.key.endsWith(".md")).toBe(true);
      expect(entry.file).toBe(entry.key.replace("https://docs.datadoghq.com/", ""));
      expect(entry.file.startsWith("/")).toBe(false);
    }
    const keys = index.map((entry) => entry.key);
    expect(keys).toEqual([...keys].sort());
  });

  it("throws when site is not configured", async () => {
    await expect(async () => await pageIndexGET(ctx(undefined))).rejects.toThrow(/site/);
  });
});

describe("pages.json assembly (hash from emitted plaintext)", () => {
  it("hashes the exact plaintext the .md route serves (no drift)", async () => {
    // The build hashes each .md file on disk; that file is byte-identical to
    // what the source's buildBody produces, so hashing either yields the same
    // mdocHash. Verify the chain with buildBody standing in for the disk read.
    const pages = await collectPages(pageSources);
    const bodyByFile = new Map<string, string>();
    for (const page of pages) {
      bodyByFile.set(page.urlPath.replace(/^\//, ""), await page.buildBody());
    }

    const index = await readIndex();
    const listing = await buildListingFromIndex(index, async (file) =>
      bodyByFile.get(file)!,
    );
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();

    // Spot-check one operation against an independent hash of the served body.
    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const op = cat.operations[0];
    const key = `https://docs.datadoghq.com/api/latest/${cat.slug}/${op.slug}.md`;

    const servedBody = await (
      (await operationGET({
        params: { lang: undefined, category: cat.slug, operation: op.slug },
      } as unknown as Parameters<typeof operationGET>[0])) as Response
    ).text();
    const expectedHash = createHash("md5").update(servedBody, "utf8").digest("hex");

    expect(listing[key].mdocHash).toBe(expectedHash);
  });
});
