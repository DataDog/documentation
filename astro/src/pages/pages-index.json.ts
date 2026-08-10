export const prerender = true;
/**
 * `pages-index.json` — the metadata sidecar for `pages.json`.
 *
 * Emits every page's `{ key, file, metadata }` with NO content hash, so it is
 * cheap (no page body is built). The `pagesJson` integration reads this after
 * the build, hashes each already-emitted `.md` from disk, writes the final
 * `dist/client/pages.json`, and deletes this sidecar. It therefore never appears
 * in a real deploy; it is excluded from the sitemap. See `plans/20_pages_json.md`.
 */

import type { APIRoute } from "astro";
import { pageSources } from "@lib/pagesListing/pageSources";
import { buildPageIndex } from "@lib/pagesListing/pageIndex";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for pages-index.json to render canonical URLs.",
    );
  }
  const index = await buildPageIndex(pageSources, site.origin);
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
