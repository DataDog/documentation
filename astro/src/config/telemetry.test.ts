import { describe, it, expect } from "vitest";
// @ts-ignore — plain CommonJS module, no types
import hugoConfigDocs from "@hugo-site/assets/scripts/config/config-docs.js";
import { SITE_ENVS } from "@lib/site/siteEnv";
import { getTelemetryConfig } from "./telemetry";

describe("getTelemetryConfig", () => {
  it("has an entry for every site environment", () => {
    // The table is indexed by whatever `resolveSiteEnv` returns, so a missing
    // key would surface as undefined credentials rather than an error.
    for (const env of SITE_ENVS) {
      expect(getTelemetryConfig(env).clientToken).toBeTruthy();
    }
  });

  it("gives development no application ID, so RUM cannot init there", () => {
    const config = getTelemetryConfig("development");
    expect(config.applicationId).toBeUndefined();
    expect(config.clientToken).toBeTruthy();
  });

  it("uses the console log handler in development and http elsewhere", () => {
    expect(getTelemetryConfig("development").loggingHandler).toBe("console");
    expect(getTelemetryConfig("preview").loggingHandler).toBe("http");
    expect(getTelemetryConfig("live").loggingHandler).toBe("http");
  });

  it("shares one application ID and client token between preview and live", () => {
    // Both environments report into one RUM application, separated by the
    // `env` tag.
    const preview = getTelemetryConfig("preview");
    const live = getTelemetryConfig("live");
    expect(preview.applicationId).toBeTruthy();
    expect(preview.applicationId).toBe(live.applicationId);
    expect(preview.clientToken).toBe(live.clientToken);
  });
});

describe("parity with upstream config-docs.js", () => {
  // The credentials table is a copy, so drift is the failure mode: upstream
  // rotates a client token and this site keeps reporting to the old one, with
  // no error. Reading the upstream file directly turns that into a test
  // failure. Delete this test when config-docs.js goes away.
  const upstream = hugoConfigDocs as Record<
    string,
    { ddClientToken: string; ddApplicationId?: string; loggingHandler: string }
  >;

  it.each(["development", "preview", "live"] as const)(
    "matches upstream %s",
    (env) => {
      const config = getTelemetryConfig(env);
      expect(config.clientToken).toBe(upstream[env].ddClientToken);
      expect(config.applicationId).toBe(upstream[env].ddApplicationId);
      expect(config.loggingHandler).toBe(upstream[env].loggingHandler);
    },
  );
});
