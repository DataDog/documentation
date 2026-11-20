import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { absoluteUrl, siteBase, deriveSiteUrl, branchRef } from "./siteUrl";

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

describe("siteBase", () => {
  it("adds a trailing slash so relative paths resolve under the full path", () => {
    expect(siteBase("https://docs-staging.datadoghq.com/my-branch")).toBe(
      "https://docs-staging.datadoghq.com/my-branch/",
    );
  });

  it("leaves an already-directory URL alone", () => {
    expect(siteBase("https://docs.datadoghq.com/")).toBe(
      "https://docs.datadoghq.com/",
    );
  });

  it("accepts a URL as well as a string", () => {
    expect(siteBase(new URL("https://docs.datadoghq.com"))).toBe(
      "https://docs.datadoghq.com/",
    );
  });
});

describe("absoluteUrl", () => {
  it("joins a root-relative path onto a site with no base path", () => {
    expect(absoluteUrl("/api/latest.md", "https://docs.datadoghq.com")).toBe(
      "https://docs.datadoghq.com/api/latest.md",
    );
  });

  it("preserves the branch segment of a preview site URL", () => {
    expect(
      absoluteUrl(
        "/api/latest/metrics/get-a-metric.md",
        "https://docs-staging.datadoghq.com/my-branch",
      ),
    ).toBe(
      "https://docs-staging.datadoghq.com/my-branch/api/latest/metrics/get-a-metric.md",
    );
  });

  it("does not double the slash when the path already lacks a leading one", () => {
    expect(absoluteUrl("api/latest.md", "https://docs.datadoghq.com")).toBe(
      "https://docs.datadoghq.com/api/latest.md",
    );
  });
});

describe("branchRef", () => {
  beforeEach(resetEnv);
  afterEach(resetEnv);

  it("reads CI_COMMIT_REF_NAME, not BRANCH", () => {
    process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
    expect(branchRef()).toBe("devin.ford/my-cool-thing");
  });

  it("trims leading and trailing slashes", () => {
    process.env.CI_COMMIT_REF_NAME = "/devin.ford/my-cool-thing/";
    expect(branchRef()).toBe("devin.ford/my-cool-thing");
  });

  it("is undefined when unset", () => {
    delete process.env.CI_COMMIT_REF_NAME;
    expect(branchRef()).toBeUndefined();
  });
});

describe("deriveSiteUrl", () => {
  beforeEach(resetEnv);
  afterEach(resetEnv);

  it("throws in preview with no branch ref, instead of emitting /undefined", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    delete process.env.CI_COMMIT_REF_NAME;
    expect(() => deriveSiteUrl()).toThrow(/CI_COMMIT_REF_NAME/);
  });

  it("builds the preview URL from CI_COMMIT_REF_NAME", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
    expect(deriveSiteUrl()).toBe(
      "https://docs-staging.datadoghq.com/devin.ford/my-cool-thing",
    );
  });

  it("is the live docs URL in live", () => {
    process.env.CI_ENVIRONMENT_NAME = "live";
    expect(deriveSiteUrl()).toBe("https://docs.datadoghq.com");
  });

  it("honors DOCS_SITE_URL ahead of every other branch", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
    process.env.DOCS_SITE_URL = "https://d111111abcdef8.cloudfront.net";
    expect(deriveSiteUrl()).toBe("https://d111111abcdef8.cloudfront.net");
  });

  it("strips a trailing slash from DOCS_SITE_URL", () => {
    process.env.DOCS_SITE_URL = "https://d111111abcdef8.cloudfront.net/";
    expect(deriveSiteUrl()).toBe("https://d111111abcdef8.cloudfront.net");
  });

  it("ignores an empty DOCS_SITE_URL rather than emitting an empty site", () => {
    process.env.CI_ENVIRONMENT_NAME = "live";
    process.env.DOCS_SITE_URL = "";
    expect(deriveSiteUrl()).toBe("https://docs.datadoghq.com");
  });
});
