import { describe, it, expect } from "vitest";
import { parseSdkVersions, SDK_REPOS } from "./websitesSourcesData.ts";

/** A trimmed copy of the real `data/sdk_versions.json`. */
const SDK_VERSIONS_JSON = JSON.stringify([
  { client: "datadog-api-client-go", version: "v2.65.0" },
  { client: "datadog-api-client-java", version: "datadog-api-client-2.60.0" },
  { client: "datadog-api-client-python", version: "2.60.0" },
  { client: "datadog-api-client-ruby", version: "v2.59.1" },
  { client: "datadog-api-client-typescript", version: "v1.63.0" },
  { client: "datadog-api-client-rust", version: "0.36.0" },
  { client: "integrations-core", version: "ddev-v18.0.0" },
]);

describe("parseSdkVersions", () => {
  it("returns a pin for each of the six SDK repos", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(Object.keys(pins).sort()).toEqual([...SDK_REPOS].sort());
  });

  it("keeps each repo's tag verbatim, since conventions differ per repo", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(pins).toEqual({
      "datadog-api-client-go": "v2.65.0",
      "datadog-api-client-java": "datadog-api-client-2.60.0",
      "datadog-api-client-python": "2.60.0",
      "datadog-api-client-ruby": "v2.59.1",
      "datadog-api-client-typescript": "v1.63.0",
      "datadog-api-client-rust": "0.36.0",
    });
  });

  it("ignores clients that are not SDK repos", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(pins).not.toHaveProperty("integrations-core");
  });

  it("names the missing repo when a pin is absent", () => {
    const missingRuby = JSON.parse(SDK_VERSIONS_JSON).filter(
      (entry: { client: string }) => entry.client !== "datadog-api-client-ruby",
    );
    expect(() => parseSdkVersions(JSON.stringify(missingRuby))).toThrow(
      /datadog-api-client-ruby/,
    );
  });

  it("rejects an entry whose version is missing", () => {
    const noVersion = JSON.stringify([{ client: "datadog-api-client-go" }]);
    expect(() => parseSdkVersions(noVersion)).toThrow();
  });

  it("rejects an empty version string, rather than cloning a nameless ref", () => {
    const blankVersion = JSON.parse(SDK_VERSIONS_JSON).map(
      (entry: { client: string; version: string }) =>
        entry.client === "datadog-api-client-go"
          ? { ...entry, version: "" }
          : entry,
    );
    expect(() => parseSdkVersions(JSON.stringify(blankVersion))).toThrow();
  });

  it("rejects malformed JSON with the source named", () => {
    expect(() => parseSdkVersions("{not json")).toThrow(/sdk_versions\.json/);
  });

  it("rejects a JSON object where the file should be an array", () => {
    expect(() =>
      parseSdkVersions('{"datadog-api-client-go":"v2.65.0"}'),
    ).toThrow();
  });
});
