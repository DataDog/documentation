/**
 * Site origin constants used across the Astro app for constructing absolute
 * URLs. Astro's own origin (import.meta.env.SITE) hosts API docs; all other
 * Datadog docs pages live on the Hugo site at the same origin in production,
 * but on a separate port in local dev.
 */

declare const __HUGO_DOCS_ORIGIN__: string;

/** The Hugo docs site origin. Non-API nav links and search results point here. */
export const HUGO_ORIGIN = __HUGO_DOCS_ORIGIN__;

/** The corporate marketing site origin. */
export const CORP_ORIGIN = "https://www.datadoghq.com";
