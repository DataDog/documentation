import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { pageSources } from "@lib/pagesListing/pageSources";
import type { PageIndexEntry } from "@lib/pagesListing/types";
import { PagesListingSchema } from "@lib/pagesListing/types";
import { buildListingFromIndex } from "@lib/pagesListing/buildListingFromIndex";
import { buildPageIndex } from "@lib/pagesListing/pageIndex";

import type { GetStaticPaths } from "astro";

import { GET as pageIndexGET } from "../../src/pages/pages-index.json.ts";
import { GET as landingGET } from "../../src/pages/[...lang]/api/latest.md.ts";
import {
  GET as categoryGET,
  getStaticPaths as categoryStaticPaths,
} from "../../src/pages/[...lang]/api/latest/[category].md.ts";
import {
  GET as operationGET,
  getStaticPaths as operationStaticPaths,
} from "../../src/pages/[...lang]/api/latest/[category]/[operation].md.ts";
import {
  GET as handWrittenGET,
  getStaticPaths as handWrittenStaticPaths,
} from "../../src/pages/[...lang]/api/latest/[...page].md.ts";
import { GET as changelogGET } from "../../src/pages/[...lang]/api/changelog.md.ts";

const SITE = new URL("https://docs.datadoghq.com");

const ctx = (site?: URL) =>
  ({ site }) as unknown as Parameters<typeof pageIndexGET>[0];

/**
 * Invokes a route with `params` and a `url`, bypassing Astro's typing of the
 * context. The `url` matters: the `.md` routes read `url.pathname` to resolve
 * the site-support banner, so omitting it would not match how the build calls
 * them.
 */
const routeCtx = (
  params: Record<string, string | undefined>,
  pathname: string,
) =>
  ({
    params,
    url: new URL(pathname, SITE),
    site: SITE,
  }) as unknown as Parameters<typeof categoryGET>[0];

/**
 * Serves the English plaintext for a page's disk-relative path by dispatching to
 * the same route module the build runs, so a sidecar entry that no route can
 * serve — a page listed in `pages.json` that would 404 or be missing on disk —
 * fails here.
 */
async function serveMarkdown(file: string): Promise<string> {
  if (file === "api/changelog.md") {
    const res = (await changelogGET(
      routeCtx({ lang: undefined }, `/${file}`),
    )) as Response;
    if (res.status !== 200) throw new Error(`${file} returned ${res.status}`);
    return res.text();
  }

  const path = file.replace(/^api\/latest/, "").replace(/\.md$/, "");
  const lang = undefined; // English lives at the root; `[...lang]` is empty.
  // The served URL, as the build would request it.
  const pathname = `/${file}`;

  if (path === "") {
    const res = (await landingGET(routeCtx({ lang }, pathname))) as Response;
    return res.text();
  }

  const segments = path.replace(/^\//, "").split("/");
  if (segments.length === 1) {
    const [slug] = segments;
    // A spec category route is more specific than the hand-written rest route,
    // so it wins a slug collision here the same way it does in the build.
    const categoryRes = (await categoryGET(
      routeCtx({ lang, category: slug }, pathname),
    )) as Response;
    if (categoryRes.status === 200) return categoryRes.text();

    const res = (await handWrittenGET(
      routeCtx({ lang, page: slug }, pathname),
    )) as Response;
    if (res.status !== 200) throw new Error(`${file} returned ${res.status}`);
    return res.text();
  }

  const [category, operation] = segments;
  const res = (await operationGET(
    routeCtx({ lang, category, operation }, pathname),
  )) as Response;
  if (res.status !== 200) throw new Error(`${file} returned ${res.status}`);
  return res.text();
}

type RouteName =
  "landing" | "category" | "operation" | "handWritten" | "changelog";

/**
 * Lists the English static paths of a `.md` route, as the build would get them,
 * without rendering anything.
 */
async function englishStaticParams(
  getStaticPaths: GetStaticPaths,
): Promise<Record<string, string | undefined>[]> {
  const paths = await getStaticPaths({} as Parameters<GetStaticPaths>[0]);
  return paths
    .map((path) => path.params)
    .filter((params) => params.lang === undefined);
}

/**
 * Maps the disk-relative `.md` file of every page the routes build to the route
 * that builds it. A spec category route is more specific than the hand-written
 * rest route, so it is added last and wins a slug collision, as in the build.
 */
async function builtFilesByRoute(): Promise<Map<string, RouteName>> {
  const routeNamesByFile = new Map<string, RouteName>();
  // The landing and changelog routes vary only by locale.
  routeNamesByFile.set("api/latest.md", "landing");
  routeNamesByFile.set("api/changelog.md", "changelog");
  for (const { page } of await englishStaticParams(handWrittenStaticPaths)) {
    routeNamesByFile.set(`api/latest/${page}.md`, "handWritten");
  }
  for (const { category } of await englishStaticParams(categoryStaticPaths)) {
    routeNamesByFile.set(`api/latest/${category}.md`, "category");
  }
  for (const { category, operation } of await englishStaticParams(
    operationStaticPaths,
  )) {
    routeNamesByFile.set(`api/latest/${category}/${operation}.md`, "operation");
  }
  return routeNamesByFile;
}

async function readIndex(): Promise<PageIndexEntry[]> {
  const res = (await pageIndexGET(ctx(SITE))) as Response;
  return JSON.parse(await res.text());
}

describe("GET /pages-index.json (metadata sidecar)", () => {
  it("returns application/json", async () => {
    const res = (await pageIndexGET(ctx(SITE))) as Response;
    expect(res.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
  });

  it("emits sorted entries with absolute .md keys and disk-relative files", async () => {
    const index = await readIndex();
    expect(index.length).toBeGreaterThan(0);
    for (const entry of index) {
      expect(entry.key.startsWith("https://docs.datadoghq.com/")).toBe(true);
      expect(entry.key.endsWith(".md")).toBe(true);
      expect(entry.file).toBe(
        entry.key.replace("https://docs.datadoghq.com/", ""),
      );
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
    await expect(
      async () => await pageIndexGET(ctx(undefined)),
    ).rejects.toThrow(/site/);
  });
});

// Rendering every page doesn't scale to the full site, so coverage is checked
// against the routes' static paths, and only one page per route is rendered.
describe("pages.json assembly (hash from emitted plaintext)", () => {
  it("lists only pages the .md routes build", async () => {
    const routeNamesByFile = await builtFilesByRoute();
    for (const entry of await readIndex()) {
      expect(
        routeNamesByFile.has(entry.file),
        `${entry.file} is listed, but no .md route builds it`,
      ).toBe(true);
    }
  });

  it("serves a non-empty body for one listed page per route", async () => {
    const routeNamesByFile = await builtFilesByRoute();
    const sampleFilesByRoute = new Map<RouteName, string>();
    for (const entry of await readIndex()) {
      const routeName = routeNamesByFile.get(entry.file);
      if (routeName && !sampleFilesByRoute.has(routeName)) {
        sampleFilesByRoute.set(routeName, entry.file);
      }
    }

    expect([...sampleFilesByRoute.keys()].sort()).toEqual([
      "category",
      "changelog",
      "handWritten",
      "landing",
      "operation",
    ]);
    for (const file of sampleFilesByRoute.values()) {
      const body = await serveMarkdown(file);
      expect(body.length, `${file} served an empty body`).toBeGreaterThan(0);
    }
  });

  it("hashes the exact plaintext the .md route serves", async () => {
    // The build hashes each emitted .md straight off disk. Here the route stands
    // in for the disk read, so the resulting hash is the one the build produces.
    const index = await readIndex();
    const landing = index.find((entry) => entry.file === "api/latest.md")!;
    const listing = await buildListingFromIndex([landing], serveMarkdown);
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();

    const servedBody = await serveMarkdown(landing.file);
    expect(listing[landing.key].mdocHash).toBe(
      createHash("md5").update(servedBody, "utf8").digest("hex"),
    );
    expect(listing[landing.key].source).toBe("astro");
  });
});
