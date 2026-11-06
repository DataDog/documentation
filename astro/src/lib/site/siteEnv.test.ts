import { describe, it, expect, afterEach } from "vitest";
import { resolveSiteEnv, SITE_ENVS } from "./siteEnv";

describe("resolveSiteEnv", () => {
  const original = process.env.CI_ENVIRONMENT_NAME;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.CI_ENVIRONMENT_NAME;
    } else {
      process.env.CI_ENVIRONMENT_NAME = original;
    }
  });

  it("passes the two deployed environments through", () => {
    expect(resolveSiteEnv("live")).toBe("live");
    expect(resolveSiteEnv("preview")).toBe("preview");
  });

  it("maps anything else to development", () => {
    expect(resolveSiteEnv("development")).toBe("development");
    expect(resolveSiteEnv("staging")).toBe("development");
    expect(resolveSiteEnv("")).toBe("development");
    expect(resolveSiteEnv(undefined)).toBe("development");
  });

  it("is total, so its result is always a usable record key", () => {
    // The reason this is a function and not an `as SiteEnv` cast: callers index
    // per-environment config tables with the result, where an unlisted value
    // would read back as undefined instead of failing.
    for (const raw of ["live", "preview", "nonsense", ""]) {
      expect(SITE_ENVS).toContain(resolveSiteEnv(raw));
    }
  });

  it("defaults to CI_ENVIRONMENT_NAME when no argument is given", () => {
    process.env.CI_ENVIRONMENT_NAME = "live";
    expect(resolveSiteEnv()).toBe("live");
    process.env.CI_ENVIRONMENT_NAME = "preview";
    expect(resolveSiteEnv()).toBe("preview");
    delete process.env.CI_ENVIRONMENT_NAME;
    expect(resolveSiteEnv()).toBe("development");
  });

  it("reads the variable per call, not once at module load", () => {
    // Load-time capture would freeze whichever value happened to be set when
    // the first importer pulled this module in.
    process.env.CI_ENVIRONMENT_NAME = "live";
    expect(resolveSiteEnv()).toBe("live");
    delete process.env.CI_ENVIRONMENT_NAME;
    expect(resolveSiteEnv()).toBe("development");
  });

  it("prefers an explicit argument over the environment", () => {
    // How client code stays correct: it passes a build-time constant, and must
    // not silently fall back to a `process.env` read that cannot work there.
    process.env.CI_ENVIRONMENT_NAME = "live";
    expect(resolveSiteEnv("preview")).toBe("preview");
    expect(resolveSiteEnv("")).toBe("development");
  });
});
