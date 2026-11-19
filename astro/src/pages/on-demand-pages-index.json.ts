export const prerender = true;
/**
 * `on-demand-pages-index.json`: the paths of the pages that render on demand,
 * as a build-time intermediate file for the sitemap.
 *
 * `@astrojs/sitemap` lists only pages built ahead of time. The
 * `onDemandSitemapPages` integration adds these paths to the sitemap after the
 * build, and deletes this file. It's excluded from the sitemap.
 */

import type { APIRoute } from "astro";
import { getCdocsPages } from "@lib/cdocs/pageLists";
import { listOnDemandSitemapPaths } from "@lib/sitemap/onDemandPages";

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify(listOnDemandSitemapPaths(await getCdocsPages())),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
};
