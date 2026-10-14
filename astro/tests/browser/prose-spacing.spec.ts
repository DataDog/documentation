import { test, expect, type Locator, type Page } from "@playwright/test";

// Global prose spacing and list markers from `src/styles/global.css` and
// `CodeBlock.module.css`, checked on the typography showcase page.
//
// Gaps are measured between rendered boxes, not read from one element's
// margin, because vertical margins collapse: the visible gap is the larger of
// the two touching margins, so a single computed value can pass while the page
// still looks wrong.
const TYPOGRAPHY_URL = "/dd_e2e/integration/typography/";

// Subpixel rounding in the layout engine.
const TOLERANCE_PX = 1;

test.describe("prose spacing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TYPOGRAPHY_URL);
  });

  for (const level of [2, 3, 4, 5, 6]) {
    test(`h${level} is followed by --space-sm`, async ({ page }) => {
      const heading = page.locator(`.prose h${level}`, {
        hasText: `Heading ${level}`,
      });
      const gap = await gapToNextElement(heading);

      expect(gap).toBeCloseTo(await tokenPx(page, "--space-sm"), 0);
    });
  }

  test("a paragraph before a list is followed by --space-xs", async ({
    page,
  }) => {
    const paragraph = page.locator(".prose p", {
      hasText: "Follow these steps to get started",
    });
    const gap = await gapToNextElement(paragraph);

    expect(gap).toBeCloseTo(await tokenPx(page, "--space-xs"), 0);
  });

  test("a paragraph before another paragraph keeps its full margin", async ({
    page,
  }) => {
    // Guards against the list rule (`p:has(+ ul, + ol)`) applying to every
    // paragraph.
    // The first paragraph under "Paragraphs"; the page's last paragraph repeats
    // this text, so take the first match.
    const paragraph = page
      .locator(".prose p", { hasText: "ullamco laboris nisi ut aliquip" })
      .first();
    const gap = await gapToNextElement(paragraph);

    expect(gap).toBeGreaterThan(
      (await tokenPx(page, "--space-sm")) + TOLERANCE_PX,
    );
  });

  test("a code block is followed by --space-md", async ({ page }) => {
    const codeBlock = page.locator(".prose .code-block", {
      hasText: "def hello",
    });
    const marginBottom = await codeBlock.evaluate((element) =>
      parseFloat(getComputedStyle(element).marginBottom),
    );

    expect(marginBottom).toBeCloseTo(await tokenPx(page, "--space-md"), 0);
  });
});

test.describe("prose list markers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TYPOGRAPHY_URL);
  });

  test("unordered lists use the browser's nested markers", async ({ page }) => {
    const topList = page
      .locator(".prose ul", { hasText: "First item" })
      .first();
    const nestedList = topList.locator(":scope > li > ul");
    const deepList = nestedList.locator(":scope > li > ul");

    expect(await listStyleType(topList)).toBe("disc");
    expect(await listStyleType(nestedList)).toBe("circle");
    expect(await listStyleType(deepList)).toBe("square");
  });

  test("list items have no en-dash pseudo-element", async ({ page }) => {
    const firstItem = page.locator(".prose li", { hasText: "First item" });
    const beforeContent = await firstItem.evaluate(
      (element) => getComputedStyle(element, "::before").content,
    );

    expect(beforeContent).toBe("none");
  });
});

/** Distance from the bottom of `locator` to the top of its next visible sibling. */
async function gapToNextElement(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    let next = element.nextElementSibling as HTMLElement | null;
    while (next && next.offsetHeight === 0) {
      next = next.nextElementSibling as HTMLElement | null;
    }
    if (!next) throw new Error("No visible next sibling");
    return (
      next.getBoundingClientRect().top - element.getBoundingClientRect().bottom
    );
  });
}

/** Resolves a spacing token (declared in rem) to pixels on the live page. */
async function tokenPx(page: Page, tokenName: string): Promise<number> {
  return page.evaluate((name) => {
    const probe = document.createElement("div");
    probe.style.height = `var(${name})`;
    document.body.appendChild(probe);
    const pixels = probe.getBoundingClientRect().height;
    probe.remove();
    return pixels;
  }, tokenName);
}

async function listStyleType(locator: Locator): Promise<string> {
  return locator.evaluate((element) => getComputedStyle(element).listStyleType);
}
