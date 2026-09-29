/**
 * Google Tag Manager container ID, per environment.
 *
 * Upstream is `hugo/layouts/partials/head_scripts/google-tag-manager.html`,
 * enabled on live and preview only via `hugo/config/{live,preview}/params.yaml`.
 * Absent in development so GTM never fires from local dev traffic.
 */
import type { SiteEnv } from "@lib/site/siteEnv";

const GTM_CONTAINER_IDS: Partial<Record<SiteEnv, string>> = {
  live: "GTM-WDC8G6",
  preview: "GTM-WDC8G6",
};

export function getGtmContainerId(env: SiteEnv): string | undefined {
  return GTM_CONTAINER_IDS[env];
}
