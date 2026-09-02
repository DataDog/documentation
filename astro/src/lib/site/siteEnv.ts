/**
 * The build/deploy environment, as a closed set.
 *
 * `CI_ENVIRONMENT_NAME` is an arbitrary string from outside this repo. Most
 * consumers only need a boolean ("am I live?") and can compare it directly, but
 * anything that indexes a per-environment config table needs a value guaranteed
 * to be one of the three keys — an unlisted value reads back as `undefined`
 * rather than failing. `resolveSiteEnv` is that guarantee.
 */

export const SITE_ENVS = ["development", "preview", "live"] as const;

export type SiteEnv = (typeof SITE_ENVS)[number];

/**
 * The current environment: the two deployed environments pass through,
 * everything else — including `undefined`, which is local development — is
 * `development`.
 *
 * Defaults to reading `CI_ENVIRONMENT_NAME`, which is correct server-side.
 * Client code must pass `raw` explicitly, from a `PUBLIC_` build constant (see
 * `src/lib/telemetry/buildConstants.ts`): `process.env` does not exist in a
 * browser bundle, so the default there resolves to `development` regardless of
 * how the site was built.
 */
export function resolveSiteEnv(
  raw: string | undefined = ciEnvironmentName(),
): SiteEnv {
  if (raw === "live") return "live";
  if (raw === "preview") return "preview";
  return "development";
}

/**
 * Guarded so a client bundle that reaches this gets `undefined` instead of a
 * `process is not defined` throw. Read per call, not captured at module load,
 * so tests can set the variable and so import order cannot freeze a stale
 * value.
 */
function ciEnvironmentName(): string | undefined {
  return typeof process === "undefined"
    ? undefined
    : process.env.CI_ENVIRONMENT_NAME;
}
