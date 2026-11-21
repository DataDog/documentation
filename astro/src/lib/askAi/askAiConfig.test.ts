import { describe, it, expect } from "vitest";
import { createAskAiConfig } from "./askAiConfig";
import { fetchDatadogUserStatus } from "@lib/telemetry/datadogUserStatus";
import { isDocsAiEnabled } from "@lib/featureFlags/featureFlags";

describe("createAskAiConfig", () => {
  it.each(["docs.datadoghq.com", "docs-staging.datadoghq.com"])(
    "supplies the Datadog-user lookup on %s",
    (hostname) => {
      expect(createAskAiConfig(hostname).getIsDatadogUser).toBe(
        fetchDatadogUserStatus,
      );
    },
  );

  // The lookup is cross-origin, and CORS blocks it from any origin outside
  // Datadog's domain — `yarn dev` and `yarn preview` included — so there it is
  // only a failed request on every page load. Omitted rather than stubbed to
  // `false`: the package then leaves the telemetry tag off instead of
  // reporting a wrong value.
  it.each(["localhost", "127.0.0.1", "datadoghq.com.example.org"])(
    "omits the Datadog-user lookup on %s",
    (hostname) => {
      expect(createAskAiConfig(hostname).getIsDatadogUser).toBeUndefined();
    },
  );

  // The kill switch applies everywhere, local development included, which
  // reads preview's flags.
  it.each(["docs.datadoghq.com", "localhost"])(
    "resolves the widget's kill switch from the docs-ai-enabled flag on %s",
    (hostname) => {
      expect(createAskAiConfig(hostname).isEnabled).toBe(isDocsAiEnabled);
    },
  );
});
