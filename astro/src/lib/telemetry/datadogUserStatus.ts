/**
 * Whether the visitor is signed into the Datadog app, used to tag telemetry so
 * customer traffic can be told apart from anonymous traffic.
 *
 * Site-level rather than widget-level, so it lives here: the planned shared Ask
 * AI package receives it through an injected
 * `getIsDatadogUser?: () => Promise<boolean>` callback, and omits the
 * `is_datadog_user` tag when no callback is supplied.
 *
 * TODO: `hugo/assets/scripts/helpers/feature-flags.js` holds an equivalent copy
 * (despite the filename, this has nothing to do with feature flags). Keep the
 * two in sync until that copy is deleted.
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
