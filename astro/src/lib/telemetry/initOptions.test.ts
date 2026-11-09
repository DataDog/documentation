import { describe, it, expect } from "vitest";
import type { TelemetryCredentials } from "@config/telemetry";
import {
  buildRumInitOptions,
  buildLogsInitOptions,
  buildGlobalContext,
  buildIntakeProxy,
  TELEMETRY_SERVICE,
  ASTRO_STACK,
} from "./initOptions";

const CREDENTIALS: TelemetryCredentials & { applicationId: string } = {
  applicationId: "app-id",
  clientToken: "client-token",
  loggingHandler: "http",
};

const ORIGIN = "https://docs.datadoghq.com";

function rumOptions(overrides: Record<string, unknown> = {}) {
  return buildRumInitOptions({
    credentials: CREDENTIALS,
    env: "live",
    version: "abc1234",
    internalAnalyticsSubdomain: "ia-subdomain",
    origin: ORIGIN,
    ...overrides,
  });
}

function logsOptions(overrides: Record<string, unknown> = {}) {
  return buildLogsInitOptions({
    credentials: CREDENTIALS,
    env: "live",
    version: "abc1234",
    internalAnalyticsSubdomain: "ia-subdomain",
    ...overrides,
  });
}

describe("buildRumInitOptions", () => {
  it("builds the full RUM init object", () => {
    const { proxy, ...options } = rumOptions();
    expect(typeof proxy).toBe("function");
    expect(options).toEqual({
      applicationId: "app-id",
      clientToken: "client-token",
      env: "live",
      service: "docs",
      version: "abc1234",
      trackUserInteractions: true,
      enableExperimentalFeatures: ["zero_lcp_telemetry"],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 50,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      allowedTracingUrls: [ORIGIN],
    });
  });

  it("uses the docs service, which existing queries key on", () => {
    expect(rumOptions().service).toBe(TELEMETRY_SERVICE);
    expect(TELEMETRY_SERVICE).toBe("docs");
  });

  it("masks user input by default", () => {
    // Called out separately because a Session Replay privacy regression cannot
    // be un-recorded, unlike every other option here.
    expect(rumOptions().defaultPrivacyLevel).toBe("mask-user-input");
  });

  it("omits an empty version rather than sending an empty string", () => {
    const options = rumOptions({ version: "" });
    expect("version" in options).toBe(false);
  });

  it("routes events to the internal intake through the SDK's proxy option", () => {
    // `proxy` is the only init option the v7 SDK uses to change the intake
    // host. An unknown option, such as the pre-v7 `internalAnalyticsSubdomain`,
    // is silently ignored, so it must not be passed.
    const options = rumOptions();
    expect("internalAnalyticsSubdomain" in options).toBe(false);
    expect(
      options.proxy?.({ path: "/api/v2/rum", parameters: "ddsource=browser" }),
    ).toBe("https://ia-subdomain.datadoghq.com/api/v2/rum?ddsource=browser");
  });

  it("omits the proxy when the subdomain is empty, so the SDK uses the public intake", () => {
    const options = rumOptions({ internalAnalyticsSubdomain: "" });
    expect("proxy" in options).toBe(false);
  });

  it("scopes allowed tracing URLs to the current origin", () => {
    expect(
      rumOptions({ origin: "http://localhost:4321" }).allowedTracingUrls,
    ).toEqual(["http://localhost:4321"]);
  });
});

describe("buildLogsInitOptions", () => {
  it("builds the full Logs init object", () => {
    // No applicationId: Browser Logs is keyed by client token alone.
    const { proxy, ...options } = logsOptions();
    expect(typeof proxy).toBe("function");
    expect(options).toEqual({
      clientToken: "client-token",
      forwardErrorsToLogs: true,
      env: "live",
      service: "docs",
      version: "abc1234",
    });
  });

  it("routes logs to the internal intake through the SDK's proxy option", () => {
    const options = logsOptions();
    expect("internalAnalyticsSubdomain" in options).toBe(false);
    expect(
      options.proxy?.({ path: "/api/v2/logs", parameters: "ddsource=browser" }),
    ).toBe("https://ia-subdomain.datadoghq.com/api/v2/logs?ddsource=browser");
  });

  it("omits empty version and proxy", () => {
    const options = logsOptions({
      version: "",
      internalAnalyticsSubdomain: "",
    });
    expect("version" in options).toBe(false);
    expect("proxy" in options).toBe(false);
  });

  it("initializes with development credentials, which carry no application ID", () => {
    const options = buildLogsInitOptions({
      credentials: { clientToken: "dev-token", loggingHandler: "console" },
      env: "development",
      version: "",
      internalAnalyticsSubdomain: "",
    });
    expect(options.clientToken).toBe("dev-token");
    expect(options.env).toBe("development");
  });
});

describe("buildIntakeProxy", () => {
  it("rewrites every intake request onto the subdomain host, keeping path and parameters", () => {
    const proxy = buildIntakeProxy("ia-subdomain");
    expect(
      proxy?.({
        path: "/api/v2/replay",
        parameters: "ddsource=browser&dd-api-key=client-token",
      }),
    ).toBe(
      "https://ia-subdomain.datadoghq.com/api/v2/replay?ddsource=browser&dd-api-key=client-token",
    );
  });

  it("returns undefined for an empty subdomain", () => {
    expect(buildIntakeProxy("")).toBeUndefined();
  });
});

describe("buildGlobalContext", () => {
  it("always sets stack, which partitions the shared RUM application", () => {
    expect(buildGlobalContext({ branch: "" }).stack).toBe(ASTRO_STACK);
    expect(ASTRO_STACK).toBe("astro");
  });

  it("includes branch when the ref is non-empty", () => {
    expect(buildGlobalContext({ branch: "jen.gilbert/thing" })).toEqual({
      stack: "astro",
      branch: "jen.gilbert/thing",
    });
  });

  it("omits branch entirely when empty, rather than emitting a junk facet value", () => {
    const context = buildGlobalContext({ branch: "" });
    expect("branch" in context).toBe(false);
  });
});
