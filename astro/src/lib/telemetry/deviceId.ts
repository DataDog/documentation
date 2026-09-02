/**
 * The `_dd_device_id` cookie, which attributes docs page views to a Datadog app
 * user. A faithful port of Hugo's three helpers in
 * `assets/scripts/components/dd-browser-logs-rum.js:8-24`.
 *
 * Set on live only, matching Hugo. Both sites share the `datadoghq.com` domain
 * and therefore share this cookie, so `ensureRumDeviceId` reads before it
 * generates — running alongside Hugo's copy must not mint a second ID for the
 * same device.
 *
 * TODO: a deliberate duplicate of Hugo's logic, whose own comment calls it "a
 * temporary solution". Astro becomes the sole owner at the Hugo cutover; until
 * then a change here probably belongs in both places.
 */

/** One year, matching Hugo. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const COOKIE_NAME = "_dd_device_id";

/**
 * The subset of `document` this module touches, so callers can pass a stub in
 * tests. `document.cookie` is a getter/setter pair where assignment appends one
 * cookie rather than replacing the jar, which is why this cannot be a string.
 */
export interface CookieStore {
  cookie: string;
}

export function generateRumDeviceId(): string {
  return Math.floor(Math.random() * 2 ** 53).toString(36);
}

/**
 * The existing device ID, or `null` when the cookie is absent.
 *
 * The one deliberate improvement over Hugo's version, whose `getRumDeviceId()`
 * generates a fresh ID on a cache miss and so cannot distinguish "existing
 * device" from "new device". Same behavior overall — the caller decides — but
 * the two cases are no longer conflated in one return value.
 */
export function readRumDeviceId(cookie: string): string | null {
  const matches = new RegExp(`${COOKIE_NAME}=(\\w+)`).exec(cookie);
  return matches ? matches[1] : null;
}

/**
 * The cookie domain: the last two labels of the hostname, so `datadoghq.com`
 * covers `docs.` and `docs-staging.` alike. Matches Hugo's derivation.
 */
export function cookieDomain(hostname: string): string {
  return hostname.split(".").slice(-2).join(".");
}

export function buildDeviceIdCookie(
  deviceId: string,
  hostname: string,
): string {
  const domain = cookieDomain(hostname);
  return `${COOKIE_NAME}=${deviceId}; Domain=.${domain}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=None; Secure; Partitioned`;
}

/**
 * Read the device ID or mint one, write the cookie either way, and return the
 * ID for the caller to hand to `setUserProperty`.
 *
 * Writing on the reuse path too is intentional: it refreshes the one-year
 * expiry on every visit, so an active user's ID does not lapse.
 */
export function ensureRumDeviceId(
  cookieStore: CookieStore,
  hostname: string,
): string {
  const deviceId = readRumDeviceId(cookieStore.cookie) ?? generateRumDeviceId();
  cookieStore.cookie = buildDeviceIdCookie(deviceId, hostname);
  return deviceId;
}
