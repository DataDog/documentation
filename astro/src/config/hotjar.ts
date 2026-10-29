/**
 * Hotjar site ID, per environment.
 *
 * Live and preview each report to their own Hotjar site. Absent in development
 * so Hotjar never fires from local dev traffic.
 */
import type { SiteEnv } from "@lib/site/siteEnv";

const HOTJAR_SITE_IDS: Partial<Record<SiteEnv, number>> = {
  live: 1021060,
  preview: 1022108,
};

export function getHotjarSiteId(env: SiteEnv): number | undefined {
  return HOTJAR_SITE_IDS[env];
}
