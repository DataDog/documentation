/**
 * Hotjar site ID, per environment.
 *
 * Upstream is `hugo/layouts/partials/head_scripts/hotjar.html`, enabled on live
 * and preview only via `hugo/config/{live,preview}/params.yaml`, each with its
 * own site. Absent in development so Hotjar never fires from local dev traffic.
 */
import type { SiteEnv } from "@lib/site/siteEnv";

const HOTJAR_SITE_IDS: Partial<Record<SiteEnv, number>> = {
  live: 1021060,
  preview: 1022108,
};

export function getHotjarSiteId(env: SiteEnv): number | undefined {
  return HOTJAR_SITE_IDS[env];
}
