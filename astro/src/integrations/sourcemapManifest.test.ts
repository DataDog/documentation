import { describe, it, expect } from "vitest";
import { buildSourcemapManifest } from "./sourcemapManifest";
import { buildRumInitOptions } from "../lib/telemetry/initOptions";

const BASE = {
  site: "https://docs.datadoghq.com",
  pathPrefix: "",
  uploadDir: "dist/client",
  releaseVersion: "abc1234",
};

describe("buildSourcemapManifest", () => {
  it("composes the origin with the path prefix on a preview build", () => {
    const manifest = buildSourcemapManifest({
      ...BASE,
      site: "https://docs-staging.datadoghq.com/jen.gilbert/thing",
      pathPrefix: "/jen.gilbert/thing",
    });
    expect(manifest.minifiedPathPrefix).toBe(
      "https://docs-staging.datadoghq.com/jen.gilbert/thing/",
    );
  });

  it("uses the bare origin on a live build, where there is no prefix", () => {
    expect(buildSourcemapManifest(BASE).minifiedPathPrefix).toBe(
      "https://docs.datadoghq.com/",
    );
  });

  it("works for a local build", () => {
    const manifest = buildSourcemapManifest({
      ...BASE,
      site: "http://localhost:4321",
    });
    expect(manifest.minifiedPathPrefix).toBe("http://localhost:4321/");
  });

  it("ends in exactly one trailing slash", () => {
    // datadog-ci concatenates this with the asset's path relative to uploadDir
    // (`_astro/foo.js`). A missing or doubled slash produces a URL that never
    // matches anything, and the upload still reports success.
    const cases = [
      BASE,
      { ...BASE, site: "https://docs.datadoghq.com/" },
      {
        ...BASE,
        site: "https://docs-staging.datadoghq.com/branch/",
        pathPrefix: "/branch",
      },
    ];
    for (const input of cases) {
      expect(buildSourcemapManifest(input).minifiedPathPrefix).toMatch(
        /[^/]\/$/,
      );
    }
  });

  it("does not double the branch segment when site already carries it", () => {
    // `site` already includes the branch prefix in preview and `pathPrefix()`
    // adds it too — siteUrl.ts warns that the two must never be composed.
    const manifest = buildSourcemapManifest({
      ...BASE,
      site: "https://docs-staging.datadoghq.com/branch",
      pathPrefix: "/branch",
    });
    expect(manifest.minifiedPathPrefix).toBe(
      "https://docs-staging.datadoghq.com/branch/",
    );
  });

  it("points at the client dir, not at _astro", () => {
    // So the relative path datadog-ci derives (`_astro/foo.js`) composes with a
    // prefix that ends at the site root — one fewer place to spell `_astro`.
    const manifest = buildSourcemapManifest(BASE);
    expect(manifest.uploadDir).toBe("dist/client");
    expect(manifest.minifiedPathPrefix).not.toContain("_astro");
  });
});

describe("agreement with the RUM init options", () => {
  // This is the test that matters. `service` and `releaseVersion` must equal
  // what RUM reports, or datadog-ci uploads maps under a key no error will ever
  // carry: no failed build, no error log, just stack traces that stay minified.
  const manifest = buildSourcemapManifest({
    ...BASE,
    releaseVersion: "deadbee",
  });
  const rum = buildRumInitOptions({
    credentials: {
      applicationId: "app-id",
      clientToken: "client-token",
      loggingHandler: "http",
    },
    env: "live",
    version: "deadbee",
    internalAnalyticsSubdomain: "",
    origin: "https://docs.datadoghq.com",
  });

  it("uses the same service", () => {
    expect(manifest.service).toBe(rum.service);
  });

  it("uses the same version", () => {
    expect(manifest.releaseVersion).toBe(rum.version);
  });
});
