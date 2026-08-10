export const prerender = true;
/**
 * `pages.json` — Astro's plaintext page listing, for parity with the Hugo
 * nightly build's `pages.json`. Prerenders to `dist/client/pages.json`, served
 * at `/pages.json`. English-only, web-root (outside the `[...lang]` tree).
 *
 * Built from the shared `pageSources` registry, so it stays in lockstep with
 * the plaintext the `.md` routes serve and grows automatically as new sources
 * (Cdocs, other content) are registered. See `plans/20_pages_json.md`.
 */

import type { APIRoute } from "astro";
import { pageSources } from "@lib/pagesListing/pageSources";
import { buildPagesListing } from "@lib/pagesListing/buildPagesListing";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for pages.json to render canonical URLs.",
    );
  }
  const listing = await buildPagesListing(pageSources, site.origin);
  return new Response(JSON.stringify(listing, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
