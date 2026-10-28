import { describe, it, expect } from "vitest";
import { resolveShikiLanguage } from "../resolveShikiLanguage";

describe("resolveShikiLanguage", () => {
  it.each([
    ["golang", "go"],
    ["gemfile", "ruby"],
    ["curl", "bash"],
    ["ssh", "bash"],
    ["tsql", "sql"],
    ["gradle", "groovy"],
    ["docker-compose.yaml", "yaml"],
    ["markdoc", "jinja"],
    ["none", "text"],
  ])("maps the alias %s to the Shiki language %s", (alias, shikiLanguage) => {
    expect(resolveShikiLanguage(alias)).toBe(shikiLanguage);
  });

  it("ignores case when it looks up an alias", () => {
    expect(resolveShikiLanguage("Golang")).toBe("go");
  });

  it("passes through a language that has no alias", () => {
    expect(resolveShikiLanguage("python")).toBe("python");
  });

  it("falls back to text when there is no language", () => {
    expect(resolveShikiLanguage(undefined)).toBe("text");
  });
});
