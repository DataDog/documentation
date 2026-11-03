export const prerender = true;
/**
 * `llms-index.json` — the structure sidecar for the llms.txt tree.
 *
 * Resolves the page sources (which only work inside Vite) and emits their shape
 * as data. The `llmsTxt` integration reads this after the build, builds the whole
 * tree exactly once, writes `dist/client/llms.txt` plus every section file, and
 * deletes this sidecar. It therefore never appears in a real deploy; it is
 * excluded from the sitemap.
 *
 * Takes no `site`: the sidecar holds url paths, so the canonical origin is
 * applied in one place, by the integration.
 */

import type { APIRoute } from "astro";
import { pageSources } from "@lib/pagesListing/pageSources";
import { buildLlmsIndex } from "@lib/pagesListing/llmsIndex";

export const GET: APIRoute = async () => {
  const index = await buildLlmsIndex(pageSources);
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
