/**
 * Pure builders for the Datadog SDK option objects.
 *
 * The point of splitting these out of `Telemetry.astro` is that the
 * configuration itself becomes assertable without loading an SDK or a browser:
 * RUM never initializes in development, so the option objects are the only part
 * of the init path a unit test can reach. Every field mirrors Hugo's
 * `assets/scripts/components/dd-browser-logs-rum.js`.
 */
import type { RumInitConfiguration } from "@datadog/browser-rum";
import type { LogsInitConfiguration } from "@datadog/browser-logs";
import type { TelemetryCredentials, TelemetryEnv } from "@config/telemetry";

/**
 * Shared by RUM, Browser Logs, and the sourcemap upload manifest. Matches
 * Hugo's `service: 'docs'` so dashboards, monitors, and saved queries keep
 * working across the Hugo cutover — and so uploaded sourcemaps match the
 * errors RUM reports.
 */
export const TELEMETRY_SERVICE = "docs";

/**
 * The value of the `stack` global context property.
 *
 * TODO: do **not** remove this until Hugo is gone. Astro and Hugo report into
 * one RUM application, so this property is the only thing separating the two
 * sites' data: Astro is `@context.stack:astro` and Hugo is
 * `-@context.stack:astro` (this plan cannot edit Hugo to emit `stack: 'hugo'`).
 * After the cutover every session is Astro and the property becomes a facet
 * with a single value, at which point it can go.
 */
export const ASTRO_STACK = "astro";

/** Credentials known to carry an application ID — development's do not. */
export type RumCredentials = TelemetryCredentials & { applicationId: string };

interface RumInitInput {
  credentials: RumCredentials;
  env: TelemetryEnv;
  /** `CI_COMMIT_SHORT_SHA`, or empty when CI did not provide it. */
  version: string;
  /** `IA_SUBDOMAIN`, or empty for the public telemetry intake. */
  internalAnalyticsSubdomain: string;
  /** `window.location.origin`, passed in so this stays a pure function. */
  origin: string;
}

interface LogsInitInput {
  credentials: TelemetryCredentials;
  env: TelemetryEnv;
  version: string;
  internalAnalyticsSubdomain: string;
}

export function buildRumInitOptions({
  credentials,
  env,
  version,
  internalAnalyticsSubdomain,
  origin,
}: RumInitInput) {
  return {
    applicationId: credentials.applicationId,
    clientToken: credentials.clientToken,
    env,
    service: TELEMETRY_SERVICE,
    ...optional("version", version),
    trackUserInteractions: true,
    // TODO: `feature_flags` is copied from Hugo for parity but is inert on
    // Astro — nothing here evaluates a flag. It starts doing something when
    // OpenFeature feature flags are wired up and a flag resolver is supplied.
    enableExperimentalFeatures: ["zero_lcp_telemetry", "feature_flags"],
    sessionSampleRate: 100,
    sessionReplaySampleRate: 50,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
    allowedTracingUrls: [origin],
    ...optional("internalAnalyticsSubdomain", internalAnalyticsSubdomain),
    // `satisfies` rather than a return-type annotation: it checks the object
    // against the SDK's own type — so a field Datadog renames stops compiling
    // here — while keeping the literal types precise enough for the tests to
    // assert on.
  } satisfies RumInitConfiguration;
}

export function buildLogsInitOptions({
  credentials,
  env,
  version,
  internalAnalyticsSubdomain,
}: LogsInitInput) {
  return {
    clientToken: credentials.clientToken,
    forwardErrorsToLogs: true,
    env,
    service: TELEMETRY_SERVICE,
    ...optional("version", version),
    ...optional("internalAnalyticsSubdomain", internalAnalyticsSubdomain),
  } satisfies LogsInitConfiguration;
}

/**
 * The global context properties set *after* `init()` rather than passed to it,
 * built here so they are assertable alongside the init options.
 */
export function buildGlobalContext({ branch }: { branch: string }) {
  return {
    stack: ASTRO_STACK,
    ...optional("branch", branch),
  };
}

/**
 * Include a key only when its value is non-empty.
 *
 * An empty string is not equivalent to an absent field for either SDK: it
 * would tag every event with `version: ''` or create a `branch` facet whose
 * only value is empty, which is worse than the field being missing because it
 * looks like data.
 */
function optional<Key extends string>(
  key: Key,
  value: string,
): Partial<Record<Key, string>> {
  return value ? ({ [key]: value } as Record<Key, string>) : {};
}
