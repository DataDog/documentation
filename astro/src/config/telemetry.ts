/**
 * Datadog RUM and Browser Logs credentials, per environment.
 *
 * ⚠️ Every value here is copied verbatim from Hugo's
 * `assets/scripts/config/config-docs.js`, which is **upstream**. Two identical
 * credential tables in two languages is deliberate, not an oversight: Astro
 * cannot import Hugo's CommonJS config into a client bundle, and the two sites
 * must agree because they report into the *same* RUM application. Astro traffic
 * is distinguished by the `stack: 'astro'` global context property, not by a
 * separate application.
 *
 * TODO: Hugo owns these values until the cutover deletes `config-docs.js`, at
 * which point this file becomes the sole owner. Until then a change to Hugo's
 * table must be mirrored here. `telemetry.test.ts` reads the upstream file and
 * fails on drift, so this is enforced rather than merely documented.
 *
 * These are publishable credentials — a RUM application ID and a `pub`-prefixed
 * client token are designed to ship in a browser bundle. Hugo has committed the
 * same values for years.
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
  // Preview shares live's application ID and client token, exactly as Hugo's
  // table does. The two are separated by the `env` tag, not by application.
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
 * Maps a CI environment name onto a telemetry environment. Mirrors Hugo's
 * `helpers/getConfig.js`: `live` and `preview` pass through, anything else —
 * including `undefined` — is development.
 */
export function resolveTelemetryEnv(raw: string | undefined): TelemetryEnv {
  if (raw === "live") return "live";
  if (raw === "preview") return "preview";
  return "development";
}

export function getTelemetryConfig(env: TelemetryEnv): TelemetryCredentials {
  return TELEMETRY_CREDENTIALS[env];
}
