/**
 * Build-time site URL derivation, plus the helpers that turn a site-root-relative
 * path into a canonical URL.
 *
 * `deriveSiteUrl` has exactly one caller: `astro.config.mjs`, which hands its
 * result to Astro as `site`. Everything downstream reads that one value — routes
 * from their request context, and the `pagesJson`/`llmsTxt` integrations from
 * `config.site` — so there is no second derivation to keep in agreement.
 */
import { resolveSiteEnv } from "./siteEnv";

/** The dev server is reached through a proxy fronting Hugo and Astro on one origin. */
export const IS_PROXIED = process.env.PROXIED === "1";
export const PROXY_PORT = 1314;
export const ASTRO_DEV_PORT = 4321;

/**
 * The GitLab-native branch/ref name. Hugo and CI already set this
 * (`hugo/config/preview/config.yaml`, `hugo/Makefile`'s `config` target) — it is
 * the single source of truth for the preview path prefix. Trimmed of leading and
 * trailing slashes so callers can join it into a path without worrying about
 * double slashes.
 */
export function branchRef(): string | undefined {
  const raw = process.env.CI_COMMIT_REF_NAME;
  if (!raw) {
    return undefined;
  }
  const trimmed = raw.replace(/^\/+/, "").replace(/\/+$/, "");
  return trimmed === "" ? undefined : trimmed;
}

export function deriveSiteUrl(): string {
  // Explicit override, checked first. Used by the websites deployment platform
  // build, which serves at the root of its own CloudFront distribution rather
  // than under a branch path on docs-staging — the pair to `DOCS_PATH_PREFIX`
  // in `pathPrefix.ts`.
  const override = process.env.DOCS_SITE_URL;
  if (override) {
    return override.replace(/\/+$/, "");
  }
  const env = resolveSiteEnv();
  if (env === "preview") {
    const ref = branchRef();
    if (!ref) {
      throw new Error(
        "CI_ENVIRONMENT_NAME=preview but CI_COMMIT_REF_NAME is unset. " +
          "The preview site URL needs the branch/ref to build the path prefix.",
      );
    }
    return `https://docs-staging.datadoghq.com/${ref}`;
  }
  if (env === "live") {
    return "https://docs.datadoghq.com";
  }
  return IS_PROXIED
    ? `http://localhost:${PROXY_PORT}`
    : `http://localhost:${ASTRO_DEV_PORT}`;
}

/**
 * Absolute URL for a site-root-relative path.
 *
 * Preserves any path on `site`: in preview, `site` is
 * `https://docs-staging.datadoghq.com/{branch}`, so using `site.origin` alone
 * would silently drop the branch segment from every canonical URL. The deploy
 * serves the build under that prefix, so it belongs in pages.json keys and
 * llms.txt links.
 */
export function absoluteUrl(urlPath: string, site: string | URL): string {
  if (import.meta.env?.DEV) {
    const sitePath = new URL(site).pathname.replace(/^\/|\/$/g, "");
    if (sitePath && urlPath.replace(/^\//, "").startsWith(`${sitePath}/`)) {
      throw new Error(
        `absoluteUrl: "${urlPath}" already starts with the site's own path ` +
          `("${sitePath}"). Pass a prefix-free path — absoluteUrl adds the ` +
          `branch prefix from \`site\`; do not compose it with \`pathPrefix()\`.`,
      );
    }
  }
  return new URL(urlPath.replace(/^\//, ""), siteBase(site)).href;
}

/**
 * `site` normalized to a directory URL (guaranteed trailing slash), so relative
 * paths resolve against its full path rather than replacing its last segment.
 */
export function siteBase(site: string | URL): string {
  const base = new URL(site);
  base.hash = "";
  base.search = "";
  if (!base.pathname.endsWith("/")) {
    base.pathname += "/";
  }
  return base.href;
}
