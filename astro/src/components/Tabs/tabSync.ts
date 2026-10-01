/**
 * State helpers for synced tab groups.
 *
 * A synced group keeps three things in step, all named after the group:
 *   1. Other groups on the page with the same name (see the `document` click
 *      listener in `TabsNav`).
 *   2. The `?<group>=` URL query param, so a link keeps the choice.
 *   3. A `<group>` session cookie, so the choice carries across pages. The
 *      `code-lang` cookie is shared with Hugo, which writes it the same way.
 *
 * The pure functions take the search and cookie strings as input, so they are
 * unit-tested without a browser. Pattern follows
 * `RegionSelector/regionState.ts`.
 */

/** The group that Markdoc `tabs` use. Hugo content tabs use `?tab=`. */
const CONTENT_TAB_GROUP = "tab";

/** Hugo's older plural param, still read by `codetabs.js`. */
const LEGACY_CONTENT_TAB_PARAM = "tabs";

export interface TabSync {
  /** Names the sync group, the URL query param, and the cookie. */
  group: string;
  /** One stable ID per tab, parallel to the tab labels. */
  keys: string[];
}

export interface ResolvedSyncKey {
  key: string;
  source: "query" | "cookie";
}

/**
 * Turn a tab label into a sync key with Hugo's rule
 * (`hugo/layouts/shortcodes/tab.html`): lowercase, then drop every character
 * that is not a letter, digit, or underscore. `Agent (Linux)` → `agentlinux`.
 */
export function syncKeyFromLabel(label: string): string {
  return label.toLowerCase().replace(/[^\p{L}\p{N}_]/gu, "");
}

/** Read the raw value of the `<group>` cookie from a `document.cookie` string. */
export function readSyncCookie(
  group: string,
  cookieString: string,
): string | undefined {
  for (const pair of cookieString.split("; ")) {
    const separatorIndex = pair.indexOf("=");
    if (separatorIndex < 0 || pair.slice(0, separatorIndex) !== group) {
      continue;
    }
    try {
      return decodeURIComponent(pair.slice(separatorIndex + 1)) || undefined;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Find the key a group should start on: `?<group>=`, then (content tabs
 * only) Hugo's `?tabs=`, then the cookie. Values are normalized with
 * `syncKeyFromLabel` so Hugo's hyphenated keys still match. Returns
 * `undefined` when nothing usable is set; the caller keeps the first tab.
 */
export function resolveSyncKey({
  group,
  search,
  cookieString,
}: {
  group: string;
  search: string;
  cookieString: string;
}): ResolvedSyncKey | undefined {
  const params = new URLSearchParams(search);
  const queryValues = [params.get(group)];
  if (group === CONTENT_TAB_GROUP) {
    queryValues.push(params.get(LEGACY_CONTENT_TAB_PARAM));
  }
  for (const value of queryValues) {
    const key = syncKeyFromLabel(value ?? "");
    if (key) return { key, source: "query" };
  }

  const cookieKey = syncKeyFromLabel(readSyncCookie(group, cookieString) ?? "");
  if (cookieKey) return { key: cookieKey, source: "cookie" };

  return undefined;
}

/** Index of `key` in `keys`, or the first tab when the group lacks it. */
export function indexForKey(keys: readonly string[], key: string): number {
  const index = keys.indexOf(key);
  return index >= 0 ? index : 0;
}

/** A site-wide session cookie, matching Hugo's `js-cookie` calls. */
export function serializeSyncCookie(group: string, key: string): string {
  return `${group}=${encodeURIComponent(key)}; path=/; SameSite=Lax`;
}

/** `href` with `?<group>=<key>` set; other params and the hash are kept. */
export function buildSyncUrl(href: string, group: string, key: string): string {
  const url = new URL(href);
  if (group === CONTENT_TAB_GROUP) {
    url.searchParams.delete(LEGACY_CONTENT_TAB_PARAM);
  }
  url.searchParams.set(group, key);
  return url.toString();
}

export function writeSyncCookie(group: string, key: string): void {
  document.cookie = serializeSyncCookie(group, key);
}

export function writeSyncQueryParam(group: string, key: string): void {
  // Pass the current state through: Astro's ClientRouter (BaseLayout.astro)
  // keeps its navigation data in `history.state`.
  window.history.replaceState(
    window.history.state,
    "",
    buildSyncUrl(window.location.href, group, key),
  );
}
