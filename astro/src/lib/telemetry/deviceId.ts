/**
 * The `_dd_device_id` cookie, which attributes docs page views to a Datadog app
 * user. Set on live only.
 *
 * The cookie is scoped to `datadoghq.com` and shared across the domain, so
 * `ensureRumDeviceId` reads before it generates: another site on the domain may
 * already have minted an ID for this device.
 *
 * TODO: `hugo/assets/scripts/components/dd-browser-logs-rum.js` holds an
 * equivalent copy of this logic; a change here probably belongs there too,
 * until that copy is deleted.
 */

/** One year. */
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
 * The existing device ID, or `null` when the cookie is absent. Minting is left
 * to the caller so "existing device" and "new device" stay distinguishable.
 */
export function readRumDeviceId(cookie: string): string | null {
  const matches = new RegExp(`${COOKIE_NAME}=(\\w+)`).exec(cookie);
  return matches ? matches[1] : null;
}

/**
 * The cookie domain: the last two labels of the hostname, so `datadoghq.com`
 * covers `docs.` and `docs-staging.` alike.
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
