/**
 * The Cdocs sitemap: every Cdocs variant's canonical URL, the bare URL for the
 * default variant. The variants come from the shared Cdocs page lists, which
 * llms.txt and pages.json read too, so the listings agree.
 *
 * `@astrojs/sitemap` lists only pages built ahead of time, and Cdocs pages
 * render on the server, so they get their own sitemap.
 */
import type { CdocsPage } from "@lib/cdocs/pageLists";
import { absoluteUrl } from "@lib/site/siteUrl";

export function buildCdocsSitemapXml(
  pages: CdocsPage[],
  site: string | URL,
): string {
  const urlLines = pages.flatMap((page) =>
    page.variants.map(
      (variant) =>
        `  <url><loc>${escapeXml(absoluteUrl(variant.canonicalUrl, site))}</loc></url>`,
    ),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlLines,
    "</urlset>",
    "",
  ].join("\n");
}

// Private functions ------------------------------------------------

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
