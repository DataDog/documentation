/**
 * The `lang_pref` cookie is how Hugo remembers a reader's language
 * (`hugo/assets/scripts/lang-redirects.js`). Astro writes it when the reader
 * picks a language, so the choice carries back to Hugo pages.
 *
 * Kept free of imports so client islands can bundle it. The attributes match
 * what Hugo's js-cookie writes (host-only session cookie on `/`); adding a
 * `Domain` would create a second `lang_pref` cookie instead of replacing it.
 *
 * HUGO_DUPLICATE: cookie name and attributes must match the `Cookies.set`
 * calls in `hugo/assets/scripts/lang-redirects.js`.
 */
export const LANG_PREF_COOKIE = "lang_pref";

export function setLangPrefCookie(code: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_PREF_COOKIE}=${code}; path=/; SameSite=Lax`;
}
