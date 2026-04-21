/**
 * Client-side Datadog region state manager.
 *
 * Holds the active region and keeps four things in sync:
 *   1. The `site` cookie (shared with the Hugo site so a region chosen on
 *      either site applies on the other).
 *   2. The `?site=` URL query param (so a direct link preserves the choice).
 *   3. The `data-active-region` attribute on `<html>` (drives CSS visibility
 *      of `[data-region]` elements rendered at build time).
 *   4. A `regionchange` CustomEvent dispatched on `document` (for any
 *      components that need to react beyond CSS).
 *
 * The initial region is resolved by an inline script in `BaseLayout.astro`
 * before first paint (cookie → query → default). This module picks up from
 * there, handling referrer sync and user-driven changes.
 */

import {
  getAllowedRegions,
  isAllowedRegionKey,
  appHost,
  DEFAULT_REGION_KEY,
} from '../../data/api/regionConfig';

const COOKIE_NAME = 'site';
const QUERY_PARAM = 'site';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const REGION_CHANGE_EVENT = 'regionchange';

/** Current region key, read from the `<html data-active-region>` attribute. */
export function getActiveRegion(): string {
  if (typeof document === 'undefined') return DEFAULT_REGION_KEY;
  return (
    document.documentElement.getAttribute('data-active-region') ||
    DEFAULT_REGION_KEY
  );
}

/**
 * Update the active region and sync it to cookie, query param, and DOM.
 * No-op if `key` isn't a known region.
 */
export function setActiveRegion(key: string): void {
  if (!isAllowedRegionKey(key)) return;
  if (typeof document === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(key)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;

  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_PARAM, key);
  window.history.replaceState({}, '', url.toString());

  document.documentElement.setAttribute('data-active-region', key);
  document.dispatchEvent(
    new CustomEvent(REGION_CHANGE_EVENT, { detail: { region: key } })
  );
}

/**
 * If the user navigated here from a Datadog app subdomain (e.g. app.datadoghq.eu),
 * set the region to match so docs links back to the app stay on the same site.
 * Mirrors the behavior of Hugo's `region-redirects.js`.
 */
export function syncRegionFromReferrer(): boolean {
  if (typeof document === 'undefined' || !document.referrer) return false;

  let referrerHost: string;
  try {
    referrerHost = new URL(document.referrer).hostname;
  } catch {
    return false;
  }

  const current = getActiveRegion();
  for (const region of getAllowedRegions()) {
    if (appHost(region.key) === referrerHost && region.key !== current) {
      setActiveRegion(region.key);
      return true;
    }
  }
  return false;
}

/**
 * Parse the value of the `site` cookie from `document.cookie`.
 * Returns the key only if it's a known region, otherwise undefined.
 */
export function readRegionCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )site=([^;]*)/);
  if (!match) return undefined;
  try {
    const value = decodeURIComponent(match[1]);
    return isAllowedRegionKey(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Subscribe to region changes. Returns an unsubscribe function. */
export function onRegionChange(handler: (region: string) => void): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<{ region: string }>).detail;
    handler(detail.region);
  };
  document.addEventListener(REGION_CHANGE_EVENT, listener);
  return () => document.removeEventListener(REGION_CHANGE_EVENT, listener);
}
