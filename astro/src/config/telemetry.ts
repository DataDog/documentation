/**
 * Datadog RUM and Browser Logs credentials, per environment.
 *
 * These are publishable credentials: a RUM application ID and a `pub`-prefixed
 * client token are designed to ship in a browser bundle.
 *
 * ⚠️ Upstream is `hugo/assets/scripts/config/config-docs.js`, copied here
 * because that CommonJS config cannot be imported into a client bundle. The
 * values must agree, since both sites report into the same RUM application and
 * are separated only by the `stack` global context property. `telemetry.test.ts`
 * reads the upstream file and fails on drift.
 *
 * TODO: this file becomes the sole owner once `config-docs.js` is deleted.
 */

export type TelemetryEnv = "development" | "preview" | "live";

export interface TelemetryCredentials {
  /**
   * Absent in development, so RUM cannot initialize there even if the
   * environment gate in `Telemetry.astro` were removed.
   */
  applicationId?: string;
  clientToken: string;
  loggingHandler: "http" | "console";
}

const TELEMETRY_CREDENTIALS: Record<TelemetryEnv, TelemetryCredentials> = {
  live: {
    applicationId: "3493b4e7-ab12-4852-8836-ba96af7bc745",
    clientToken: "pub16bb5ef3e9bf55f156338987e27246c7",
    loggingHandler: "http",
  },
  // Preview shares live's application ID and client token; the two are
  // separated by the `env` tag, not by application.
  preview: {
    applicationId: "3493b4e7-ab12-4852-8836-ba96af7bc745",
    clientToken: "pub16bb5ef3e9bf55f156338987e27246c7",
    loggingHandler: "http",
  },
  development: {
    clientToken: "pub36877d3864fab670b5ae7e1d5d26cb0",
    loggingHandler: "console",
  },
};

/**
 * Maps a CI environment name onto a telemetry environment: `live` and `preview`
 * pass through, anything else — including `undefined` — is development.
 */
export function resolveTelemetryEnv(raw: string | undefined): TelemetryEnv {
  if (raw === "live") return "live";
  if (raw === "preview") return "preview";
  return "development";
}

export function getTelemetryConfig(env: TelemetryEnv): TelemetryCredentials {
  return TELEMETRY_CREDENTIALS[env];
}
