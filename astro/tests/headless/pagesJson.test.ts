import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { pageSources } from "@lib/pagesListing/pageSources";
import type { PageIndexEntry } from "@lib/pagesListing/types";
import { PagesListingSchema } from "@lib/pagesListing/types";
import { buildListingFromIndex } from "@lib/pagesListing/buildListingFromIndex";
import { buildPageIndex } from "@lib/pagesListing/pageIndex";

import { GET as pageIndexGET } from "../../src/pages/pages-index.json.ts";
import { GET as landingGET } from "../../src/pages/[...lang]/api/latest.md.ts";
import { GET as categoryGET } from "../../src/pages/[...lang]/api/latest/[category].md.ts";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md.ts";
import { GET as handWrittenGET } from "../../src/pages/[...lang]/api/latest/[...page].md.ts";

const SITE = new URL("https://docs.datadoghq.com");

const ctx = (site?: URL) =>
  ({ site }) as unknown as Parameters<typeof pageIndexGET>[0];

/** Invokes a route with `params`, bypassing Astro's typing of the context. */
const routeCtx = (params: Record<string, string | undefined>) =>
  ({ params }) as unknown as Parameters<typeof categoryGET>[0];

/**
 * Serves the English plaintext for a page's disk-relative path by dispatching to
 * the same route module the build runs, so a sidecar entry that no route can
 * serve — a page listed in `pages.json` that would 404 or be missing on disk —
 * fails here.
 */
async function serveMarkdown(file: string): Promise<string> {
  const path = file.replace(/^api\/latest/, "").replace(/\.md$/, "");
  const lang = undefined; // English lives at the root; `[...lang]` is empty.

  if (path === "") {
    const res = (await landingGET(routeCtx({ lang }))) as Response;
    return res.text();
  }

  const segments = path.replace(/^\//, "").split("/");
  if (segments.length === 1) {
    const [slug] = segments;
    // A spec category route is more specific than the hand-written rest route,
    // so it wins a slug collision here the same way it does in the build.
    const categoryRes = (await categoryGET(
      routeCtx({ lang, category: slug }),
    )) as Response;
    if (categoryRes.status === 200) return categoryRes.text();

    const res = (await handWrittenGET(routeCtx({ lang, page: slug }))) as Response;
    if (res.status !== 200) throw new Error(`${file} returned ${res.status}`);
    return res.text();
  }

  const [category, operation] = segments;
  const res = (await operationGET(
    routeCtx({ lang, category, operation }),
  )) as Response;
  if (res.status !== 200) throw new Error(`${file} returned ${res.status}`);
  return res.text();
}

async function readIndex(): Promise<PageIndexEntry[]> {
  const res = (await pageIndexGET(ctx(SITE))) as Response;
  return JSON.parse(await res.text());
}

describe("GET /pages-index.json (metadata sidecar)", () => {
  it("returns application/json", async () => {
    const res = (await pageIndexGET(ctx(SITE))) as Response;
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

  it("keys pages under the site's base path when one is configured", async () => {
    const index = await buildPageIndex(
      pageSources,
      new URL("https://docs-staging.datadoghq.com/my-branch"),
    );
    for (const entry of index) {
      expect(
        entry.key.startsWith("https://docs-staging.datadoghq.com/my-branch/"),
      ).toBe(true);
      // The file on disk has no branch prefix, so the integration can find it.
      expect(entry.file.startsWith("my-branch/")).toBe(false);
    }
  });

  it("throws when site is not configured", async () => {
    await expect(async () => await pageIndexGET(ctx(undefined))).rejects.toThrow(/site/);
  });
});

describe("pages.json assembly (hash from emitted plaintext)", () => {
  it("lists only pages the .md routes actually serve", async () => {
    const index = await readIndex();
    for (const entry of index) {
      const body = await serveMarkdown(entry.file);
      expect(body.length, `${entry.file} served an empty body`).toBeGreaterThan(0);
    }
  });

  it("hashes the exact plaintext the .md route serves", async () => {
    // The build hashes each emitted .md straight off disk. Here the route stands
    // in for the disk read, so the resulting hash is the one the build produces.
    const index = await readIndex();
    const listing = await buildListingFromIndex(index, serveMarkdown);
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();

    const landing = index.find((entry) => entry.file === "api/latest.md")!;
    const servedBody = await serveMarkdown(landing.file);
    expect(listing[landing.key].mdocHash).toBe(
      createHash("md5").update(servedBody, "utf8").digest("hex"),
    );
    expect(listing[landing.key].source).toBe("astro");
  });
});
