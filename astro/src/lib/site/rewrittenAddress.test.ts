import { describe, it, expect, afterEach } from "vitest";
import { rewrittenAddressPath } from "./rewrittenAddress";

const ORIGINAL_PREFIX = process.env.DOCS_PATH_PREFIX;

describe("rewrittenAddressPath", () => {
  afterEach(() => {
    if (ORIGINAL_PREFIX === undefined) {
      delete process.env.DOCS_PATH_PREFIX;
    } else {
      process.env.DOCS_PATH_PREFIX = ORIGINAL_PREFIX;
    }
  });

  it("is undefined when the page wasn't rewritten", () => {
    expect(
      rewrittenAddressPath("/api/latest/", "/api/latest/"),
    ).toBeUndefined();
  });

  it("ignores a trailing-slash difference", () => {
    expect(rewrittenAddressPath("/api/latest", "/api/latest/")).toBeUndefined();
  });

  it("returns the rewritten path when the page was rewritten", () => {
    process.env.DOCS_PATH_PREFIX = "";
    expect(rewrittenAddressPath("/api/", "/api/latest/")).toBe("/api/latest/");
  });

  it("applies the deploy path prefix", () => {
    process.env.DOCS_PATH_PREFIX = "/jen.gilbert/astro-base";
    expect(rewrittenAddressPath("/fr/api/", "/fr/api/latest/")).toBe(
      "/jen.gilbert/astro-base/fr/api/latest/",
    );
  });
});
