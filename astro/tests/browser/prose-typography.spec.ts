import { test, expect, type Page } from "@playwright/test";

// Visual snapshots of prose typography from `src/styles/global.css`: spacing
// around headings, paragraphs, lists, code blocks, and tables, list markers,
// and table row lines. The page is the typography showcase, which renders in
// the content layout (`.prose`).
//
// One screenshot per section rather than one for the whole page: the config's
// `maxDiffPixelRatio` is 1%, and a few pixels of spacing change is less than
// that on a full page, so it would pass unnoticed.
const TYPOGRAPHY_URL = "/dd_e2e/integration/typography/";

// Each section starts at its heading and ends at the `---` rule after it.
const SECTIONS = [
  { name: "headings", heading: "h1", text: "Heading 1" },
  { name: "paragraphs", heading: "h2", text: "Paragraphs" },
  { name: "unordered-lists", heading: "h2", text: "Unordered lists" },
  { name: "ordered-lists", heading: "h2", text: "Ordered lists" },
  { name: "mixed-lists", heading: "h2", text: "Mixed lists" },
  { name: "code", heading: "h2", text: "Code" },
  { name: "tables", heading: "h2", text: "Tables" },
] as const;

test.describe("prose typography — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TYPOGRAPHY_URL);
  });

  for (const section of SECTIONS) {
    test(`${section.name} section matches screenshot`, async ({ page }) => {
      const clip = await sectionClip(page, section.heading, section.text);
      await expect(page).toHaveScreenshot(`prose-${section.name}.png`, {
        clip,
        fullPage: true,
      });
    });
  }
});

/**
 * Page coordinates of a section: from the top of its heading to the top of
 * the next `hr`, across the full width of the `.prose` container.
 */
async function sectionClip(
  page: Page,
  headingTag: string,
  headingText: string,
) {
  const clip = await page.evaluate(
    ({ tag, text }) => {
      const prose = document.querySelector(".prose");
      const heading = [...document.querySelectorAll(`.prose ${tag}`)].find(
        (element) => element.textContent?.trim() === text,
      );
      if (!prose || !heading) return null;

      let end: Element | null = heading.nextElementSibling;
      while (end && end.tagName !== "HR") end = end.nextElementSibling;
      if (!end) return null;

      const proseBox = prose.getBoundingClientRect();
      const top = heading.getBoundingClientRect().top + window.scrollY;
      const bottom = end.getBoundingClientRect().top + window.scrollY;
      return {
        x: proseBox.left + window.scrollX,
        y: top,
        width: proseBox.width,
        height: bottom - top,
      };
    },
    { tag: headingTag, text: headingText },
  );
  if (!clip) {
    throw new Error(`No "${headingText}" section ending in an <hr>`);
  }
  return clip;
}
