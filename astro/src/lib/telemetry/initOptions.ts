/**
 * Pure builders for the Datadog SDK option objects.
 *
 * Split out of `Telemetry.astro` so the configuration is assertable without
 * loading an SDK or a browser. RUM never initializes in development, so these
 * option objects are the only part of the init path a unit test can reach.
 */
import type { RumInitConfiguration } from "@datadog/browser-rum";
import type { LogsInitConfiguration } from "@datadog/browser-logs";
import type { TelemetryCredentials } from "@config/telemetry";
import type { SiteEnv } from "@lib/site/siteEnv";

/**
 * Shared by RUM, Browser Logs, and the sourcemap upload manifest. Existing
 * dashboards, monitors, and saved queries key on this value, and uploaded
 * sourcemaps only match errors when it agrees.
 */
export const TELEMETRY_SERVICE = "docs";

/**
 * The value of the `stack` global context property.
 *
 * Keep this until the Hugo site is gone. Both sites report into one RUM
 * application, so this property is the only thing separating their data: Astro
 * is `@context.stack:astro`, Hugo is `-@context.stack:astro`. Removable once
 * every session is Astro.
 */
export const ASTRO_STACK = "astro";

/** Credentials known to carry an application ID — development's do not. */
export type RumCredentials = TelemetryCredentials & { applicationId: string };

interface RumInitInput {
  credentials: RumCredentials;
  env: SiteEnv;
  /** `CI_COMMIT_SHORT_SHA`, or empty when CI did not provide it. */
  version: string;
  /**
   * `IA_SUBDOMAIN`, or empty for the public telemetry intake. Becomes the SDK's
   * `proxy` option (see `buildIntakeProxy`).
   */
  internalAnalyticsSubdomain: string;
  /** `window.location.origin`, passed in so this stays a pure function. */
  origin: string;
}

interface LogsInitInput {
  credentials: TelemetryCredentials;
  env: SiteEnv;
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
    // No `feature_flags` entry: flag tracking is GA in RUM v7, which drops
    // experimental feature names it no longer recognizes. Evaluations reach RUM
    // through the OpenFeature provider in `@lib/featureFlags/featureFlags`.
    enableExperimentalFeatures: ["zero_lcp_telemetry"],
    sessionSampleRate: 100,
    sessionReplaySampleRate: 50,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
    allowedTracingUrls: [origin],
    ...intakeProxyOption(internalAnalyticsSubdomain),
    // `satisfies` rather than a return-type annotation: it checks the object
    // against the SDK's own type — so a renamed field stops compiling — while
    // keeping the literal types precise enough for the tests to assert on.
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
    ...intakeProxyOption(internalAnalyticsSubdomain),
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

/** The shape of the SDKs' function form of `proxy`. */
type IntakeProxy = (request: { path: string; parameters: string }) => string;

/**
 * Sends every intake request (RUM, Session Replay, Logs) to the internal
 * analytics host instead of the public `browser-intake-datadoghq.com`, with the
 * SDK's own path and query parameters unchanged. Undefined for an empty
 * subdomain, which leaves the SDK on the public intake.
 *
 * Uses `proxy` because it is the only init option the v7 SDKs read to change
 * the intake host. Any other key, such as `internalAnalyticsSubdomain` (not an
 * option in v7), is dropped without a warning — and slips past `satisfies`
 * when it arrives through a spread.
 *
 * HUGO_DUPLICATE: `intakeProxy` in
 * `hugo/assets/scripts/components/dd-browser-logs-rum.js`. Keep the URL shape
 * (`https://${IA_SUBDOMAIN}.datadoghq.com${path}?${parameters}`) identical, so
 * both sites report through the same intake.
 */
export function buildIntakeProxy(subdomain: string): IntakeProxy | undefined {
  if (!subdomain) return undefined;
  return ({ path, parameters }) =>
    `https://${subdomain}.datadoghq.com${path}?${parameters}`;
}

function intakeProxyOption(subdomain: string): { proxy?: IntakeProxy } {
  const proxy = buildIntakeProxy(subdomain);
  return proxy ? { proxy } : {};
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
