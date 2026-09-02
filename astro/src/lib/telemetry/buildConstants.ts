/**
 * Build-time constants for the telemetry entry point. Read here rather than
 * from `process.env`, which does not exist in a client bundle.
 *
 * ⚠️ These come through Astro's `PUBLIC_` env prefix, not `vite.define`, and
 * that is load-bearing. Vite's `define` replacement runs at build time only: a
 * define referenced from client-side code reaches the browser as an undefined
 * identifier under `astro dev` and throws on every page load, while working
 * correctly in the production build. `import.meta.env.PUBLIC_*` is statically
 * replaced in both.
 *
 * `astro.config.mjs` republishes the CI variables under the prefix, so nothing
 * needs `PUBLIC_` set in CI. Adding a constant here means adding the
 * corresponding assignment there.
 *
 * Resolved at build time, not from frontmatter: on-demand routes would need the
 * CI variables present in the running server's environment.
 */

/** Raw `CI_ENVIRONMENT_NAME`; empty locally. Map it through `resolveTelemetryEnv`. */
export const CI_ENV = import.meta.env.PUBLIC_CI_ENV ?? "";

/**
 * Normalized branch ref, empty outside CI. Derived from `branchRef()` so it
 * matches the deploy path prefix and canonical URLs exactly.
 */
export const CI_COMMIT_REF_NAME =
  import.meta.env.PUBLIC_CI_COMMIT_REF_NAME ?? "";

/**
 * The deploy's short SHA, used as RUM's `version`.
 *
 * TODO: confirm `CI_COMMIT_SHORT_SHA` reaches the Astro CI job (owned by
 * DataDog/documentation-ci). Empty means RUM events carry no `version` tag
 * *and* uploaded sourcemaps match nothing — see
 * `src/integrations/sourcemapManifest.ts`.
 */
export const CI_COMMIT_SHORT_SHA =
  import.meta.env.PUBLIC_CI_COMMIT_SHORT_SHA ?? "";

/**
 * Routes telemetry to the internal intake instead of the public one.
 *
 * TODO: whether CI exposes `IA_SUBDOMAIN` to the Astro job is owned by
 * DataDog/documentation-ci — it is a custom variable, unlike the two above.
 * Empty degrades gracefully to the public intake.
 */
export const IA_SUBDOMAIN = import.meta.env.PUBLIC_IA_SUBDOMAIN ?? "";
