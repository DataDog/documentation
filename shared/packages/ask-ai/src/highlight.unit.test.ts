import { describe, expect, it } from "vitest";
import { highlightCode, isRegisteredLanguage } from "./highlight";

describe("highlightCode", () => {
  it("highlights a registered language", () => {
    const html = highlightCode("def greet():\n    pass", "python");
    expect(html).toContain("hljs-keyword");
    expect(html).toContain("greet");
  });

  it("highlights every language the package registers", () => {
    // Guards against a typo in the registration list, which would otherwise
    // only show up as a fence rendering unhighlighted in a real answer.
    for (const language of [
      "bash",
      "json",
      "yaml",
      "python",
      "go",
      "javascript",
      "typescript",
      "java",
      "ruby",
      "sql",
      "dockerfile",
      "xml",
      "csharp",
      "php",
      "rust",
      "scala",
      "ini",
      "diff",
      "plaintext",
      "markdown",
    ]) {
      expect(isRegisteredLanguage(language), language).toBe(true);
    }
  });

  // The one deliberate divergence from Hugo, which highlights ~190 languages.
  it("returns escaped plain text for an unregistered language", () => {
    const html = highlightCode('fun main() { println("hi") }', "kotlin");
    expect(isRegisteredLanguage("kotlin")).toBe(false);
    expect(html).not.toContain("<span");
    expect(html).toContain("fun main()");
  });

  it("escapes markup rather than emitting it, for an unregistered language", () => {
    const html = highlightCode('<img src=x onerror="alert(1)">', "kotlin");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });

  it("auto-detects when the fence carries no language", () => {
    const html = highlightCode('{"key": "value"}', undefined);
    expect(() => highlightCode("anything at all", undefined)).not.toThrow();
    expect(html).toContain("hljs-");
  });

  it("does not throw on an empty fence", () => {
    expect(() => highlightCode("", undefined)).not.toThrow();
    expect(() => highlightCode("", "python")).not.toThrow();
  });
});
