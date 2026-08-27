/**
 * The deploy-time path prefix for root-relative hrefs.
 *
 * `site` (see `siteUrl.ts`) carries the branch prefix for *absolute/canonical*
 * URLs. This module carries it for *root-relative* hrefs — every internal link
 * authored as `/api/...` or `href="/"`. The two must never be composed: `site`
 * already has the prefix, `pathPrefix()` adds it. `absoluteUrl()` asserts this in
 * dev.
 *
 * Outside `preview` (live, local dev), the prefix is empty and every helper here
 * is a no-op — `prefixed(path) === path`.
 */
import { branchRef } from "./siteUrl";

/**
 * The deploy path prefix, computed once at module load. `DOCS_PATH_PREFIX` is an
 * explicit override (also injected as a Vite `define` in `astro.config.mjs`, so
 * a client-bundled consumer would see a literal rather than reading `process.env`
 * at runtime); the default derives from the branch ref exactly like `siteUrl.ts`.
 */
export function pathPrefix(): string {
  const override = process.env.DOCS_PATH_PREFIX;
  if (override !== undefined) {
    return normalize(override);
  }
  if (process.env.CI_ENVIRONMENT_NAME !== "preview") {
    return "";
  }
  const ref = branchRef();
  return ref ? `/${ref}` : "";
}

function normalize(prefix: string): string {
  if (prefix === "") {
    return "";
  }
  const trimmed = prefix.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const EXTERNAL_HREF = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/**
 * Prepend the deploy path prefix to a root-relative path. Idempotent, and a
 * no-op for anything that isn't a root-relative internal link: absolute URLs
 * (`https://...`, `mailto:...`), protocol-relative URLs (`//...`), and
 * fragment-only links (`#...`).
 */
export function prefixed(path: string): string {
  const prefix = pathPrefix();
  if (!prefix || EXTERNAL_HREF.test(path)) {
    return path;
  }
  if (path === prefix || path.startsWith(`${prefix}/`)) {
    return path;
  }
  return path === "/" ? `${prefix}/` : `${prefix}${path}`;
}
