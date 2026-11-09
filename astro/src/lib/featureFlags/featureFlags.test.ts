// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getTelemetryConfig } from "@config/telemetry";
import {
  getBooleanFlag,
  initializeFeatureFlags,
  isDocsAiEnabled,
  resetFeatureFlagsCache,
  resolveFlagEnv,
} from "./featureFlags";

// Both SDKs are mocked: what matters here is how this module configures the
// provider and what it falls back to, not what the provider does over the wire.
const { setProviderAndWait, getBooleanValue, DatadogProvider } = vi.hoisted(
  () => ({
    setProviderAndWait: vi.fn(),
    getBooleanValue: vi.fn(),
    DatadogProvider: vi.fn(),
  }),
);
vi.mock("@openfeature/web-sdk", () => ({
  OpenFeature: {
    setProviderAndWait,
    getClient: () => ({ getBooleanValue }),
  },
}));
vi.mock("@datadog/openfeature-browser", () => ({ DatadogProvider }));

beforeEach(() => {
  resetFeatureFlagsCache();
  setProviderAndWait.mockReset().mockResolvedValue(undefined);
  getBooleanValue.mockReset();
  DatadogProvider.mockReset();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("resolveFlagEnv", () => {
  // Development has no RUM application ID of its own, which the provider
  // requires. Hugo makes the same substitution.
  it("resolves development to preview", () => {
    expect(resolveFlagEnv("development")).toBe("preview");
  });

  it.each(["preview", "live"] as const)("passes %s through", (env) => {
    expect(resolveFlagEnv(env)).toBe(env);
  });
});

describe("initializeFeatureFlags", () => {
  it("configures the provider with the flag environment's credentials", async () => {
    await initializeFeatureFlags("development");

    const credentials = getTelemetryConfig("preview");
    expect(DatadogProvider).toHaveBeenCalledWith({
      applicationId: credentials.applicationId,
      clientToken: credentials.clientToken,
      env: "preview",
      enableExposureLogging: true,
    });
  });

  it("targets the RUM session when RUM has one", async () => {
    vi.stubGlobal("DD_RUM", {
      getInternalContext: () => ({ session_id: "rum-session" }),
    });

    await initializeFeatureFlags("live");

    expect(setProviderAndWait).toHaveBeenCalledWith(expect.anything(), {
      targetingKey: "rum-session",
    });
  });

  it("falls back to a random targeting key without a RUM session", async () => {
    await initializeFeatureFlags("live");

    const [, context] = setProviderAndWait.mock.calls[0];
    expect(context.targetingKey).toEqual(expect.any(String));
    expect(context.targetingKey).not.toBe("");
  });

  it("initializes once per page", async () => {
    await initializeFeatureFlags("live");
    await initializeFeatureFlags("live");

    expect(setProviderAndWait).toHaveBeenCalledTimes(1);
  });

  it("resolves to null when the provider fails to initialize", async () => {
    setProviderAndWait.mockRejectedValue(new Error("offline"));

    expect(await initializeFeatureFlags("live")).toBeNull();
  });
});

describe("getBooleanFlag", () => {
  it("returns the flag's value", async () => {
    getBooleanValue.mockReturnValue(false);

    expect(await getBooleanFlag("some-flag", true)).toBe(false);
    expect(getBooleanValue).toHaveBeenCalledWith("some-flag", true);
  });

  it("returns the default when the client is unavailable", async () => {
    setProviderAndWait.mockRejectedValue(new Error("offline"));

    expect(await getBooleanFlag("some-flag", true)).toBe(true);
    expect(getBooleanValue).not.toHaveBeenCalled();
  });
});

describe("isDocsAiEnabled", () => {
  it("reads the docs-ai-enabled flag", async () => {
    getBooleanValue.mockReturnValue(false);

    expect(await isDocsAiEnabled()).toBe(false);
    // The key is Hugo's, and must stay so: one flag governs both sites.
    expect(getBooleanValue).toHaveBeenCalledWith("docs-ai-enabled", true);
  });

  // A flag service that is down must not take Ask AI with it.
  it("defaults to enabled when the flag cannot be resolved", async () => {
    setProviderAndWait.mockRejectedValue(new Error("offline"));

    expect(await isDocsAiEnabled()).toBe(true);
  });
});
