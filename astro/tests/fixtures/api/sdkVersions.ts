// NOTE: Frozen test fixture, not live data. Hand-picked older SDK versions,
// so a unit test that reads the live `api-code-examples/.stamp.json` instead
// shows up as a mismatch. `vitest.unit.config.ts` inlines this as the
// `__SDK_VERSIONS__` define (the value of `{% $sdkVersions.<client> %}`).

/** SDK client name → release version, as `sdkVersionsFromStamp()` returns it. */
export const FIXTURE_SDK_VERSIONS: Readonly<Record<string, string>> = {
  "datadog-api-client-go": "2.45.0",
  "datadog-api-client-java": "2.40.0",
  "datadog-api-client-python": "2.40.0",
  "datadog-api-client-ruby": "2.39.0",
  "datadog-api-client-rust": "0.30.0",
  "datadog-api-client-typescript": "1.40.0",
};
