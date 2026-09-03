/**
 * Hugo-owned `/api` paths that Astro's route tree doesn't cover: the bare
 * `/api/` root and five alias redirects, both sourced from
 * `hugo/content/en/api/_index.md`'s cascade. Astro must emit these itself —
 * once its upload deletes stale keys under `api/latest/**`, these paths would
 * otherwise 404.
 *
 * Kept as one exported table so `legacyRedirects.test.ts` can assert it still
 * matches Hugo's cascade, and so a single prerendered route
 * (`src/pages/[...lang]/api/[...legacyPath].astro`) can generate every entry in
 * every locale. Adding a redirect means adding a row here — no new page file.
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

export interface LegacyRedirectStaticPath {
  params: {
    /** Empty `[...lang]` segment for English, the code for every other locale. */
    lang: string | undefined;
    /** Everything after `/api`, or `undefined` for the bare `/api/` root. */
    legacyPath: string | undefined;
  };
  props: { to: string };
}

/**
 * `getStaticPaths` entries for the one redirect route,
 * `src/pages/[...lang]/api/[...legacyPath].astro` — the cross product of every
 * redirect with every built locale, since Hugo's cascade applies to all
 * languages, not just English.
 *
 * The destination rides along as a prop so the page never has to reverse the
 * param back into a table lookup.
 */
export function legacyRedirectStaticPaths(): LegacyRedirectStaticPath[] {
  return LOCALES.flatMap((lang) =>
    LEGACY_REDIRECTS.map(({ from, to }) => ({
      params: {
        lang: lang === DEFAULT_LOCALE ? undefined : lang,
        legacyPath: toLegacyPathParam(from),
      },
      props: { to },
    })),
  );
}

/**
 * `/api/screenboards/` → `screenboards`, `/api/latest/downtimes/s` →
 * `latest/downtimes/s`, and the bare `/api/` root → `undefined` (an empty rest
 * param, which renders the route as `/api/` itself).
 */
function toLegacyPathParam(from: string): string | undefined {
  const rest = from.replace(/^\/api\b/, "").replace(/^\/+|\/+$/g, "");
  return rest === "" ? undefined : rest;
}
