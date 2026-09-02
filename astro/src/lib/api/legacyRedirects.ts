/**
 * Hugo-owned `/api` paths that Astro's route tree doesn't cover: the bare
 * `/api/` root and five alias redirects, both sourced from
 * `hugo/content/en/api/_index.md`'s cascade. Astro must emit these itself —
 * once its upload deletes stale keys under `api/latest/**`, these paths would
 * otherwise 404.
 *
 * Kept as one exported table so `legacyRedirects.test.ts` can assert it still
 * matches Hugo's cascade, and so every entry has exactly one prerendered
 * redirect page under `src/pages/`.
 */
import { DEFAULT_LOCALE, LOCALES } from "@lib/i18n/locale";

export interface LegacyRedirect {
  /** Path, without the locale/branch prefix, that must keep working. */
  from: string;
  /** Path, without the locale/branch prefix, to redirect to. */
  to: string;
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  { from: "/api/", to: "/api/latest/" },
  { from: "/api/screenboards/", to: "/api/latest/dashboards/" },
  { from: "/api/latest/downtimes/s", to: "/api/latest/downtimes/" },
  { from: "/api/latest/ci-visibility", to: "/api/latest/ci-visibility-pipelines/" },
  { from: "/api/latest/cloud-workload-security", to: "/api/latest/csm-threats/" },
  { from: "/api/latest/service-scorecards", to: "/api/latest/scorecards/" },
];

/**
 * `getStaticPaths` entries for a legacy redirect page living under
 * `src/pages/[...lang]/`, so `/{lang}/api/…` redirects the same way the
 * unprefixed path does — Hugo's cascade applies to every language, not just
 * English. English is the empty `[...lang]` segment, matching the rest of the
 * route tree.
 */
export function legacyRedirectPaths(): Array<{
  params: { lang: string | undefined };
}> {
  return LOCALES.map((lang) => ({
    params: { lang: lang === DEFAULT_LOCALE ? undefined : lang },
  }));
}
