/**
 * The pages that render on demand, for the sitemap: every Cdocs variant's
 * canonical URL, the bare URL for the default variant. The variants come from
 * the shared Cdocs page lists, which llms.txt and pages.json read too, so the
 * listings agree.
 */
import type { CdocsPage } from "@lib/cdocs/pageLists";

export function listOnDemandSitemapPaths(cdocsPages: CdocsPage[]): string[] {
  return cdocsPages.flatMap((page) =>
    page.variants.map((variant) => variant.canonicalUrl),
  );
}
