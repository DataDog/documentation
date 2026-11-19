export const prerender = true;
/**
 * `sitemap-cdocs.xml`: every Cdocs variant's canonical URL. See
 * `buildCdocsSitemapXml`.
 *
 * Emitted at the root, since a sitemap can only list URLs under its own
 * folder. `staticApiGuard` allows this one file outside `api/`.
 */

import type { APIRoute } from "astro";
import { getCdocsPages } from "@lib/cdocs/pageLists";
import { buildCdocsSitemapXml } from "@lib/sitemap/cdocsSitemap";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for sitemap-cdocs.xml to render canonical URLs.",
    );
  }
  return new Response(buildCdocsSitemapXml(await getCdocsPages(), site), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
