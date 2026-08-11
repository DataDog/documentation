/**
 * Build-time site URL derivation, plus the helpers that turn a site-root-relative
 * path into a canonical URL.
 *
 * `deriveSiteUrl` has exactly one caller: `astro.config.mjs`, which hands its
 * result to Astro as `site`. Everything downstream reads that one value — routes
 * from their request context, and the `pagesJson`/`llmsTxt` integrations from
 * `config.site` — so there is no second derivation to keep in agreement.
 */

/** The dev server is reached through a proxy fronting Hugo and Astro on one origin. */
export const IS_PROXIED = process.env.PROXIED === "1";
export const PROXY_PORT = 1314;
export const ASTRO_DEV_PORT = 4321;

export function deriveSiteUrl(): string {
  const env = process.env.CI_ENVIRONMENT_NAME;
  if (env === "preview") {
    return `https://docs-staging.datadoghq.com/${process.env.BRANCH}`;
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
