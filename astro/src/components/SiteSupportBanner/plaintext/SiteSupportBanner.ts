import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { paragraphFromText, tag } from "@lib/plaintext/helpers";
import { appHost } from "@config/regions";
import { i18n } from "@lib/i18n/i18n";
import type { Locale } from "@lib/i18n/locale";

/**
 * Build the plaintext (Markdoc AST) representation of the site-support banner.
 *
 * The HTML twin (see ../SiteSupportBanner.astro) renders one hidden element per
 * unsupported region and reveals only the one matching the reader's selected
 * Datadog site. A `.md` reader has no region switcher, so there is no selected
 * site to match: this twin instead emits a single block that names every
 * unsupported site by host.
 *
 * That shape is not new. `html-to-mdoc` (corp-node-packages,
 * `elementProcessing/processors/ddSites/siteRegion.ts`) already converts Hugo's
 * banners to one `{% callout %}` listing hosts, so the departure here is in the
 * wording only.
 */
export function siteSupportNode(
  regionKeys: string[],
  lang: Locale,
): MarkdocNode | undefined {
  if (regionKeys.length === 0) {
    return undefined;
  }

  const hosts = regionKeys.map((key) => {
    const host = appHost(key);
    if (!host) {
      throw new Error(
        `Site-support banner: region "${key}" has no app host. ` +
          `Check that it is a real region key in shared/regions.yaml.`,
      );
    }
    return host;
  });

  const intro = i18n("site_support_banner_plaintext", lang);
  return tag("callout", {}, [
    paragraphFromText(`${intro} ${hosts.join(", ")}`),
  ]);
}
