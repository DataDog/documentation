/**
 * The feature-flag client: OpenFeature, backed by Datadog's provider.
 *
 * Both SDKs are imported dynamically, on the first flag read, so they stay out
 * of every bundle that imports this module — the searchbar island included —
 * and out of the page's critical path.
 *
 * TODO: `hugo/assets/scripts/helpers/feature-flags.js` is Hugo's equivalent.
 * The two read the same flags from the same environments, so keep their
 * provider configuration in step until that copy is deleted.
 */
import type { Client } from "@openfeature/web-sdk";
import { getTelemetryConfig } from "@config/telemetry";
import { resolveSiteEnv, type SiteEnv } from "@lib/site/siteEnv";

/** The Ask AI kill switch. Shared with Hugo, so one flag governs both sites. */
export const DOCS_AI_ENABLED_FLAG_KEY = "docs-ai-enabled";

export type FlagEnv = Exclude<SiteEnv, "development">;

/**
 * Development reads preview's flags. The provider needs a RUM application ID,
 * which development's credentials deliberately lack, and without one every flag
 * would read back as its default — leaving the kill switch untestable locally.
 *
 * TODO: Hugo makes the same substitution, pending its flag rollout. Revisit if
 * development ever gets a flag environment of its own.
 */
export function resolveFlagEnv(env: SiteEnv): FlagEnv {
  return env === "development" ? "preview" : env;
}

/**
 * Memoized for the page's lifetime, failures included: a caller that retried on
 * every read would refetch the flag configuration on any page where it is
 * blocked.
 */
let clientPromise: Promise<Client | null> | null = null;

/**
 * Resolves to `null` rather than rejecting when the provider cannot start, so
 * callers fall back to their defaults instead of handling an error.
 *
 * `env` defaults to the build's environment. It is a parameter for tests.
 */
export function initializeFeatureFlags(
  env: SiteEnv = resolveSiteEnv(import.meta.env.PUBLIC_CI_ENV),
): Promise<Client | null> {
  if (clientPromise) return clientPromise;

  clientPromise = createClient(resolveFlagEnv(env)).catch((error) => {
    console.warn("[Flags] Initialization failed:", error);
    return null;
  });

  return clientPromise;
}

async function createClient(env: FlagEnv): Promise<Client | null> {
  const credentials = getTelemetryConfig(env);
  if (!credentials.applicationId) {
    console.warn(`[Flags] No RUM application ID for ${env}`);
    return null;
  }

  const [{ OpenFeature }, { DatadogProvider }] = await Promise.all([
    import("@openfeature/web-sdk"),
    import("@datadog/openfeature-browser"),
  ]);

  // The provider also reports each evaluation to RUM through `window.DD_RUM`
  // (`enableRumFeatureFlagTracking`, on by default), so RUM events carry the
  // flags in effect when they were sent.
  await OpenFeature.setProviderAndWait(
    new DatadogProvider({
      applicationId: credentials.applicationId,
      clientToken: credentials.clientToken,
      env,
      enableExposureLogging: true,
    }),
    { targetingKey: getTargetingKey() },
  );
  return OpenFeature.getClient();
}

/**
 * The RUM session, so a visitor keeps one assignment for the session — Hugo's
 * choice, kept so that a percentage rollout splits visitors identically on both
 * sites. RUM only runs on preview and live; elsewhere, or if this runs before
 * `Telemetry.astro` has initialized RUM, a random key stands in.
 */
function getTargetingKey(): string {
  return (
    window.DD_RUM?.getInternalContext?.()?.session_id ?? crypto.randomUUID()
  );
}

export async function getBooleanFlag(
  key: string,
  defaultValue: boolean,
): Promise<boolean> {
  const client = await initializeFeatureFlags();
  return client?.getBooleanValue(key, defaultValue) ?? defaultValue;
}

/**
 * Defaults to enabled, as Hugo does: a flag service that is down must not take
 * Ask AI with it. Only an explicit `false` turns it off.
 */
export function isDocsAiEnabled(): Promise<boolean> {
  return getBooleanFlag(DOCS_AI_ENABLED_FLAG_KEY, true);
}

/** Test seam. Not called in production, where the page lifetime is the cache. */
export function resetFeatureFlagsCache(): void {
  clientPromise = null;
}
