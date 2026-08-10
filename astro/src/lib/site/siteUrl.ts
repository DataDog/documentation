/**
 * Build-time site URL derivation, shared between `astro.config.mjs` (which sets
 * Astro's `site`) and routes that must know the same origin outside of request
 * context — notably the llms.txt tree's `getStaticPaths`, which enumerates
 * section/part file paths that depend on the rendered link lengths and so must
 * agree with what `GET` produces from `site.origin`.
 */

const proxied = process.env.PROXIED === "1";
const proxyPort = 1314;

export function deriveSiteUrl(): string {
  const env = process.env.CI_ENVIRONMENT_NAME;
  if (env === "preview") {
    return `https://docs-staging.datadoghq.com/${process.env.BRANCH}`;
  }
  if (env === "live") {
    return "https://docs.datadoghq.com";
  }
  return proxied ? `http://localhost:${proxyPort}` : "http://localhost:4321";
}

/**
 * Origin (scheme + host + port) of the derived site URL. Matches Astro's
 * `context.site.origin`, so paths enumerated at build time line up with the
 * URLs rendered per request.
 */
export function deriveSiteOrigin(): string {
  return new URL(deriveSiteUrl()).origin;
}
