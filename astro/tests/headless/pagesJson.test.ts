import { describe, it, expect } from "vitest";
import { PagesListingSchema } from "@lib/pagesListing/schema";
import { collectPages } from "@lib/pagesListing/collectPages";
import { pageSources } from "@lib/pagesListing/pageSources";
import { getCategoriesView } from "@lib/api/viewsBuilder";

import { GET as pagesJsonGET } from "../../src/pages/pages.json.ts";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md.ts";

const ctx = (site?: URL) =>
  ({ site }) as unknown as Parameters<typeof pagesJsonGET>[0];

describe("GET /pages.json", () => {
  it("returns application/json", async () => {
    const res = (await pagesJsonGET(ctx(new URL("https://docs.datadoghq.com")))) as Response;
    expect(res.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  });

  it("emits a schema-valid listing whose keys are absolute .md URLs", async () => {
    const res = (await pagesJsonGET(ctx(new URL("https://docs.datadoghq.com")))) as Response;
    const listing = JSON.parse(await res.text());
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();

    const keys = Object.keys(listing);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(key.startsWith("https://docs.datadoghq.com/")).toBe(true);
      expect(key.endsWith(".md")).toBe(true);
    }
    // Keys are sorted.
    expect(keys).toEqual([...keys].sort());
  });

  it("throws when site is not configured", async () => {
    await expect(async () => await pagesJsonGET(ctx(undefined))).rejects.toThrow(/site/);
  });

  it("mdocHash matches the plaintext the .md route serves (no drift)", async () => {
    const categories = await getCategoriesView("en");
    const cat = categories.find((c) => c.operations.length > 0)!;
    const op = cat.operations[0];

    // What the API source hashes:
    const pages = await collectPages(pageSources);
    const opPage = pages.find(
      (p) => p.urlPath === `/api/latest/${cat.slug}/${op.slug}.md`,
    )!;
    const sourceBody = await opPage.buildBody();

    // What the .md route actually serves:
    const res = (await operationGET({
      params: { lang: undefined, category: cat.slug, operation: op.slug },
    } as unknown as Parameters<typeof operationGET>[0])) as Response;
    const servedBody = await res.text();

    expect(sourceBody).toBe(servedBody);
  });
});
