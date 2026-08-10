export const prerender = true;
/**
 * Per-section llms.txt detail files (and their `part_N` splits).
 *
 * The whole tree is rebuilt in `getStaticPaths` (to enumerate every section/part
 * path) and again per request (to render contents). Both use the same origin —
 * `getStaticPaths` has no request context, so it reads `deriveSiteOrigin()`,
 * which equals the `site.origin` `GET` sees — so the paths and the rendered
 * split boundaries always agree. The top-level `/llms.txt` index is a separate
 * route; this catch-all never emits the empty path.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { pageSources } from "@lib/pagesListing/pageSources";
import { buildLlmsTree } from "@lib/pagesListing/llmsTree";
import { deriveSiteOrigin } from "@lib/site/siteUrl";

/** "/api/latest/metrics/llms.txt" -> "api/latest/metrics" (the `[...llmsSection]` param). */
function toParam(detailPath: string): string {
  return detailPath.replace(/^\//, "").replace(/\/llms\.txt$/, "");
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { detailFiles } = await buildLlmsTree(pageSources, deriveSiteOrigin());
  return [...detailFiles.keys()].map((detailPath) => ({
    params: { llmsSection: toParam(detailPath) },
  }));
};

export const GET: APIRoute = async ({ params, site }) => {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for llms.txt to render canonical URLs.",
    );
  }
  const { detailFiles } = await buildLlmsTree(pageSources, site.origin);
  const contents = detailFiles.get(`/${params.llmsSection}/llms.txt`);
  if (contents === undefined) {
    return new Response(null, { status: 404 });
  }
  return new Response(contents, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
