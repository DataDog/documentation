import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { codeToTokens, type BundledLanguage } from "shiki";
import datadogLight from "../../../styles/shiki-light";

// The theme references color tokens, not raw values, so a future dark theme
// only has to redefine the tokens. Values match Hugo's Chroma theme
// (`hugo/assets/styles/vendor/_chroma-styles.scss`).
const DEFAULT_TEXT = "var(--color-panel-text)";
const KEYWORD = "var(--color-syntax-keyword)";
const STRING = "var(--color-syntax-string)";

const COLOR_TOKENS_CSS = readFileSync(
  new URL("../../../styles/tokens/colors.css", import.meta.url),
  "utf8",
);

/**
 * Color of the token that contains the piece of text `content`.
 *
 * Shiki merges neighboring tokens that end up the same color (for example
 * `<groupId>` when the tag and its brackets are both black), so matching on
 * `token.content` would miss them. Each token's `explanation` still lists the
 * original pieces.
 */
async function colorOf(
  code: string,
  lang: BundledLanguage,
  content: string,
): Promise<string | undefined> {
  const { tokens } = await codeToTokens(code, {
    lang,
    theme: datadogLight,
    includeExplanation: true,
  });
  const token = tokens
    .flat()
    .find((candidate) =>
      candidate.explanation?.some((piece) => piece.content.trim() === content),
    );
  if (!token) throw new Error(`No token "${content}" in ${lang} code`);
  return token.color?.toLowerCase();
}

/** Every color string in the theme: editor colors and each rule's foreground. */
function themeColorValues(): string[] {
  const editorColors = Object.values(datadogLight.colors ?? {});
  const ruleColors = (datadogLight.settings ?? []).flatMap((rule) =>
    rule.settings?.foreground ? [rule.settings.foreground] : [],
  );
  return [...editorColors, ...ruleColors];
}

describe("datadog-chroma Shiki theme", () => {
  describe("tokens", () => {
    it("uses only color tokens, no raw color values", () => {
      for (const color of themeColorValues()) {
        expect(color).toMatch(/^var\(--color-[a-z0-9-]+\)$/);
      }
    });

    it("uses only tokens that colors.css defines", () => {
      for (const color of themeColorValues()) {
        const tokenName = color.slice("var(".length, -")".length);
        expect(COLOR_TOKENS_CSS, `${tokenName} is not defined`).toContain(
          `${tokenName}:`,
        );
      }
    });
  });

  describe("Java imports", () => {
    const javaImport = "import com.datadog.api.client.*;";

    it("keeps the import keyword in the keyword color", async () => {
      expect(await colorOf(javaImport, "java", "import")).toBe(KEYWORD);
    });

    it("uses the default text color for the package path, as Chroma does (NameNamespace)", async () => {
      expect(await colorOf(javaImport, "java", "datadog")).toBe(DEFAULT_TEXT);
    });

    it("uses the default text color for the wildcard, as Chroma does (Operator)", async () => {
      expect(await colorOf(javaImport, "java", "*")).toBe(DEFAULT_TEXT);
    });
  });

  describe("XML", () => {
    const xml = "<groupId>com.datadoghq</groupId>";

    // Hugo shows this text gray (#555555). Astro uses the string color on
    // purpose, because the gray was hard to read.
    it("colors text between tags with the string color", async () => {
      expect(await colorOf(xml, "xml", "com.datadoghq")).toBe(STRING);
    });

    it("uses the default text color for tag names (NameTag)", async () => {
      expect(await colorOf(xml, "xml", "groupId")).toBe(DEFAULT_TEXT);
    });
  });
});
