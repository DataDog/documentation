import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { pathPrefix, prefixed } from "./pathPrefix";

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

describe("pathPrefix", () => {
  beforeEach(resetEnv);
  afterEach(resetEnv);

  it("is empty outside preview", () => {
    delete process.env.CI_ENVIRONMENT_NAME;
    delete process.env.DOCS_PATH_PREFIX;
    expect(pathPrefix()).toBe("");
  });

  it("is empty in live", () => {
    process.env.CI_ENVIRONMENT_NAME = "live";
    delete process.env.DOCS_PATH_PREFIX;
    expect(pathPrefix()).toBe("");
  });

  it("derives /{branch} in preview", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
    delete process.env.DOCS_PATH_PREFIX;
    expect(pathPrefix()).toBe("/devin.ford/my-cool-thing");
  });

  it("is empty in preview with no branch ref", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    delete process.env.CI_COMMIT_REF_NAME;
    delete process.env.DOCS_PATH_PREFIX;
    expect(pathPrefix()).toBe("");
  });

  it("DOCS_PATH_PREFIX overrides everything, including outside preview", () => {
    delete process.env.CI_ENVIRONMENT_NAME;
    process.env.DOCS_PATH_PREFIX = "/some/override/";
    expect(pathPrefix()).toBe("/some/override");
  });
});

describe("prefixed", () => {
  beforeEach(resetEnv);
  afterEach(resetEnv);

  function setPreview(ref: string) {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    process.env.CI_COMMIT_REF_NAME = ref;
    delete process.env.DOCS_PATH_PREFIX;
  }

  it("is a no-op with no prefix", () => {
    delete process.env.CI_ENVIRONMENT_NAME;
    expect(prefixed("/api/latest/dashboards/")).toBe("/api/latest/dashboards/");
    expect(prefixed("/")).toBe("/");
  });

  it("prepends the prefix to a root-relative path", () => {
    setPreview("devin.ford/my-cool-thing");
    expect(prefixed("/api/latest/dashboards/")).toBe(
      "/devin.ford/my-cool-thing/api/latest/dashboards/",
    );
  });

  it("prefixes the bare root path with a trailing slash", () => {
    setPreview("devin.ford/my-cool-thing");
    expect(prefixed("/")).toBe("/devin.ford/my-cool-thing/");
  });

  it("treats a slashless path as root-relative rather than concatenating it", () => {
    setPreview("devin.ford/my-cool-thing");
    expect(prefixed("api/latest/dashboards/")).toBe(
      "/devin.ford/my-cool-thing/api/latest/dashboards/",
    );
  });

  it("is idempotent", () => {
    setPreview("devin.ford/my-cool-thing");
    const once = prefixed("/api/latest/");
    expect(prefixed(once)).toBe(once);
  });

  it("leaves external, protocol-relative, and fragment links alone", () => {
    setPreview("devin.ford/my-cool-thing");
    expect(prefixed("https://example.com/x")).toBe("https://example.com/x");
    expect(prefixed("//example.com/x")).toBe("//example.com/x");
    expect(prefixed("#section")).toBe("#section");
    expect(prefixed("mailto:a@b.com")).toBe("mailto:a@b.com");
  });
});
