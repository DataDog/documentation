import { describe, it, expect } from "vitest";
// @ts-ignore — plain CommonJS module, no types
import hugoConfigDocs from "@hugo-site/assets/scripts/config/config-docs.js";
import { resolveTelemetryEnv, getTelemetryConfig } from "./telemetry";

describe("resolveTelemetryEnv", () => {
  it("passes live through", () => {
    expect(resolveTelemetryEnv("live")).toBe("live");
  });

  it("passes preview through", () => {
    expect(resolveTelemetryEnv("preview")).toBe("preview");
  });

  it("maps anything else to development", () => {
    expect(resolveTelemetryEnv("development")).toBe("development");
    expect(resolveTelemetryEnv("staging")).toBe("development");
    expect(resolveTelemetryEnv("")).toBe("development");
    expect(resolveTelemetryEnv(undefined)).toBe("development");
  });
});

describe("getTelemetryConfig", () => {
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
    // Hugo does the same: both environments report into one RUM application,
    // separated by the `env` tag. Astro joins that application rather than
    // creating its own.
    const preview = getTelemetryConfig("preview");
    const live = getTelemetryConfig("live");
    expect(preview.applicationId).toBeTruthy();
    expect(preview.applicationId).toBe(live.applicationId);
    expect(preview.clientToken).toBe(live.clientToken);
  });
});

describe("parity with Hugo's config-docs.js", () => {
  // This table is a copy, and the only way it goes wrong is drift: Hugo rotates
  // a client token or moves to a different application and Astro keeps
  // reporting to the old one, which fails silently. Reading the upstream file
  // directly turns that into a test failure. Hugo owns these values until the
  // cutover deletes config-docs.js, at which point this test goes with it.
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
