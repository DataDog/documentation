import type { Locale } from "@lib/i18n/locale";

/**
 * The sign-up form loaded in the free trial modal. It must be `/signup_corp`:
 * plain `/signup` sends `frame-ancestors 'self'` and refuses to load in an
 * iframe. `/signup_corp` allows `*.datadoghq.com`, so it also refuses on
 * localhost and preview domains.
 *
 * Hugo (hugo/assets/scripts/components/signup.js) also picks the app host from
 * the visitor's region and appends tracking parameters; this doesn't yet.
 */
export function getSignupUrl(lang: Locale): string {
  return `https://app.datadoghq.com/signup_corp?lang=${lang}`;
}
