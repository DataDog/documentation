// The Cdocs sitemap: every Cdocs variant's canonical URL. See
// `buildCdocsSitemapXml`.
//
// Rendered on demand rather than emitted, since the build emits files only
// under `api/` (see `staticApiGuard`). It's at the root because a sitemap can
// only list URLs under its own folder.
export const prerender = false;

import type { APIRoute } from "astro";
import { getCdocsPages } from "@lib/cdocs/pageLists";
import { buildCdocsSitemapXml } from "@lib/sitemap/cdocsSitemap";

// The content collection doesn't change while the server runs.
let sitemapXmlPromise: Promise<string> | null = null;

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for sitemap-cdocs.xml to render canonical URLs.",
    );
  }
  sitemapXmlPromise ??= getCdocsPages().then((pages) =>
    buildCdocsSitemapXml(pages, site),
  );
  return new Response(await sitemapXmlPromise, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
