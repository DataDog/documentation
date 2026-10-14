import { describe, it, expect } from "vitest";
import { codeToTokens, type BundledLanguage } from "shiki";
import datadogLight from "../../../styles/shiki-light";

// Colors from Hugo's Chroma theme (`hugo/assets/styles/vendor/_chroma-styles.scss`).
const BLACK = "#000000";
const KEYWORD_PURPLE = "#a90d91";
const STRING_RED = "#c41a16";

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

describe("datadog-chroma Shiki theme", () => {
  describe("Java imports", () => {
    const javaImport = "import com.datadog.api.client.*;";

    it("keeps the import keyword purple", async () => {
      expect(await colorOf(javaImport, "java", "import")).toBe(KEYWORD_PURPLE);
    });

    it("colors the package path black, as Chroma does (NameNamespace)", async () => {
      expect(await colorOf(javaImport, "java", "datadog")).toBe(BLACK);
    });

    it("colors the wildcard black, as Chroma does (Operator)", async () => {
      expect(await colorOf(javaImport, "java", "*")).toBe(BLACK);
    });
  });

  describe("XML", () => {
    const xml = "<groupId>com.datadoghq</groupId>";

    // Hugo shows this text gray (#555555). Astro uses the string red on
    // purpose, because the gray was hard to read.
    it("colors text between tags with the string red", async () => {
      expect(await colorOf(xml, "xml", "com.datadoghq")).toBe(STRING_RED);
    });

    it("keeps tag names black (NameTag)", async () => {
      expect(await colorOf(xml, "xml", "groupId")).toBe(BLACK);
    });
  });
});
