import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { normalizeCharacters, normalizeMarkdown } from "./normalize.ts";

function readFixture(name: string): string {
  return readFileSync(path.join(import.meta.dirname, "fixtures", name), "utf8");
}

describe("normalizeCharacters", () => {
  it("straightens curly quotes", () => {
    expect(normalizeCharacters("Datadog’s ‘API’ “keys”")).toBe(
      `Datadog's 'API' "keys"`,
    );
  });

  it("turns en and em dashes into hyphens", () => {
    expect(normalizeCharacters("1–2 — done")).toBe("1-2 - done");
  });

  it("turns non-breaking spaces into plain spaces", () => {
    expect(normalizeCharacters("API\u00a0key")).toBe("API key");
  });

  it("strips zero-width characters", () => {
    expect(normalizeCharacters("API\u200b\u200c\u200d\u2060\ufeffkey")).toBe(
      "APIkey",
    );
  });

  it("composes to NFC", () => {
    expect(normalizeCharacters("cafe\u0301")).toBe("caf\u00e9");
  });
});

describe("normalizeMarkdown", () => {
  it("applies character normalization", () => {
    expect(normalizeMarkdown("Datadog’s API")).toBe("Datadog's API");
  });

  it("rewrites the local dev host to the prod host", () => {
    expect(
      normalizeMarkdown("[keys](http://localhost:4321/api/latest/keys.md)"),
    ).toBe("[keys](https://docs.datadoghq.com/api/latest/keys.md)");
  });

  it("strips heading id annotations", () => {
    expect(normalizeMarkdown("# Validate API key{% #validate-api-key %}")).toBe(
      "# Validate API key",
    );
  });

  it("strips the trailing arrow inside a heading link", () => {
    expect(
      normalizeMarkdown(
        "## [Validate API key →](https://docs.datadoghq.com/a.md){% #validate-api-key %}",
      ),
    ).toBe("## [Validate API key](https://docs.datadoghq.com/a.md)");
  });

  it("strips a trailing arrow on a plain heading", () => {
    expect(normalizeMarkdown("## Validate API key →")).toBe(
      "## Validate API key",
    );
  });

  it("keeps arrows outside headings", () => {
    expect(normalizeMarkdown("Go to Settings → Keys")).toBe(
      "Go to Settings → Keys",
    );
  });

  it("removes the documentation index line", () => {
    expect(
      normalizeMarkdown(
        "a\n\n> For the complete documentation index, see [llms.txt](http://localhost:4321/llms.txt).\n\nb",
      ),
    ).toBe("a\n\n\n\nb");
  });

  it("leaves tags other than id annotations alone", () => {
    const markdown = '{% tab title="v1" %}\n{% tabs %}\n{% tab label="Go" %}';
    expect(normalizeMarkdown(markdown)).toBe(markdown);
  });

  it("leaves structural formatting alone", () => {
    const markdown = "| **GET** | `/api/v1/validate` |\n#### Instructions";
    expect(normalizeMarkdown(markdown)).toBe(markdown);
  });

  describe.each([
    "authentication.hugo.md",
    "authentication.astro.md",
    "validate-api-key.hugo.md",
    "validate-api-key.astro.md",
  ])("on fixture %s", (fixtureName) => {
    const normalized = normalizeMarkdown(readFixture(fixtureName));

    it("leaves no textual noise", () => {
      expect(normalized).not.toMatch(/[‘’“”–—\u00a0\u200b\ufeff]/);
      expect(normalized).not.toContain("http://localhost:4321");
      expect(normalized).not.toContain("{% #");
      expect(normalized).not.toMatch(/^#.* →/m);
      expect(normalized).not.toContain("For the complete documentation index");
    });

    it("is idempotent", () => {
      expect(normalizeMarkdown(normalized)).toBe(normalized);
    });
  });

  it("makes the two authentication headings match", () => {
    const headingsOf = (markdown: string) =>
      markdown.split("\n").filter((line) => line.startsWith("#"));
    expect(
      headingsOf(normalizeMarkdown(readFixture("authentication.hugo.md"))),
    ).toEqual(
      headingsOf(normalizeMarkdown(readFixture("authentication.astro.md"))),
    );
  });
});
