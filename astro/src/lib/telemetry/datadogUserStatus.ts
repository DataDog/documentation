/**
 * Whether the visitor is signed into the Datadog app, used to tag telemetry so
 * customer traffic can be told apart from anonymous traffic.
 *
 * A duplicate of Hugo's `fetchDatadogUserStatus()` in
 * `assets/scripts/helpers/feature-flags.js:11-20`. It lives here rather than in
 * the Ask AI package because it is generic site functionality, not
 * widget-specific: the planned shared Ask AI package receives it through an
 * injected `getIsDatadogUser?: () => Promise<boolean>` callback and omits the
 * `is_datadog_user` tag when no callback is supplied.
 *
 * TODO: deliberate duplicate of Hugo's copy — cross-referenced so a change to
 * one is not made blind to the other. Hugo's dies with Hugo. Note it sits in
 * Hugo's *feature-flags* helper for historical reasons; it has nothing to do
 * with flags.
 */

export const DATADOG_LOCATE_URL = "https://www.datadoghq.com/locate";

/**
 * Memoized for the page's lifetime. Several callers ask (telemetry, and later
 * the Ask AI package), and the answer cannot change without a navigation.
 */
let datadogUserPromise: Promise<boolean> | null = null;

export function fetchDatadogUserStatus(): Promise<boolean> {
  if (datadogUserPromise) return datadogUserPromise;

  datadogUserPromise = fetch(DATADOG_LOCATE_URL, { credentials: "include" })
    .then((response) => response.json())
    .then((data) => !!data.user_status)
    // Swallowed rather than propagated: this is a best-effort telemetry tag,
    // and a blocked or offline request must not surface as an error. Failures
    // are memoized too — a caller that retried on every invocation would hammer
    // the endpoint on any page where it is blocked.
    .catch(() => false);

  return datadogUserPromise;
}

/** Test seam. Not called in production, where the page lifetime is the cache. */
export function resetDatadogUserStatusCache(): void {
  datadogUserPromise = null;
}
