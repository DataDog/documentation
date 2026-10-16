/**
 * Text-level normalization, applied to both sides before parsing. It removes
 * only textual noise (see "Observed noise" in
 * `plans/30_api_content_qa_reporting.md`). Structural differences, such as tab
 * syntax or bold inside table cells, are left alone so the comparison can
 * report them.
 */

const localDevOrigin = "http://localhost:4321";
const prodOrigin = "https://docs.datadoghq.com";

const curlySingleQuotes = /[\u2018\u2019]/g;
const curlyDoubleQuotes = /[\u201c\u201d]/g;
const enAndEmDashes = /[\u2013\u2014]/g;
const nonBreakingSpaces = /\u00a0/g;
const zeroWidthCharacters = /[\u200b\u200c\u200d\u2060\ufeff]/g;

const headingIdAnnotations = /\{%\s*#[\w-]+\s*%\}/g;
const headingLines = /^#{1,6} .*$/gm;
const trailingHeadingArrow = /\s+\u2192(?=\]|\s*$)/g;
const documentationIndexLine = /^> For the complete documentation index.*$/gm;

/** Character-level noise only. Also used on Hugo HTML text (pipeline step 8). */
export function normalizeCharacters(text: string): string {
  return text
    .normalize("NFC")
    .replace(curlySingleQuotes, "'")
    .replace(curlyDoubleQuotes, '"')
    .replace(enAndEmDashes, "-")
    .replace(nonBreakingSpaces, " ")
    .replace(zeroWidthCharacters, "");
}

export function normalizeMarkdown(markdown: string): string {
  const characters = normalizeCharacters(markdown);
  const withProdLinks = characters.replaceAll(localDevOrigin, prodOrigin);
  const withoutAnnotations = withProdLinks.replace(headingIdAnnotations, "");
  const withPlainHeadings = withoutAnnotations.replace(
    headingLines,
    (heading) => heading.replace(trailingHeadingArrow, ""),
  );
  return withPlainHeadings.replace(documentationIndexLine, "");
}
