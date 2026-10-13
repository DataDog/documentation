import { test, expect } from "@playwright/test";

// Browser tests cover only what the unit tests can't: navigation, scroll
// position, computed styles, layout and localized hrefs. They run against live
// changelog data, since there's no fixture redirect for the dev server.

const CHANGELOG_URL = "/api/changelog/";

test.describe("API changelog", () => {
  test("a filter tab goes to its page and becomes the active tab", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const activeTab = page.locator(".api-changelog-filter-bar__tab--active");
    await expect(activeTab).toHaveAttribute("href", CHANGELOG_URL);

    await page
      .locator(".api-changelog-filter-bar__tab", { hasText: "Added" })
      .click();

    await expect(page).toHaveURL(/\/api\/changelog\/added\/$/);
    await expect(activeTab).toHaveCount(1);
    await expect(activeTab).toHaveAttribute("href", "/api/changelog/added/");
    await expect(activeTab).toHaveAttribute("aria-current", "page");
  });

  test("Next goes to page 2 with the timeline in view", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const next = page.locator("a.pagination__next");
    test.skip(
      (await next.count()) === 0,
      "The live changelog fits on one page.",
    );

    await next.click();

    await expect(page).toHaveURL(/\/api\/changelog\/2\/#changelog-timeline$/);
    await expect(page.locator("#changelog-timeline")).toBeInViewport();
    await expect(page.locator(".pagination__page--current")).toHaveText("2");
  });

  test("the filter bar has its own view transition name", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const viewTransitionName = await page
      .locator(".api-changelog-filter-bar")
      .evaluate((element) => getComputedStyle(element).viewTransitionName);
    expect(viewTransitionName).toBe("api-changelog-filter-bar");
  });

  test("the timeline dot is a hollow circle in the rail's color", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const section = page.locator(".api-changelog-timeline__section").first();
    const { rail, dot, pageBackground } = await section.evaluate((element) => {
      const railStyle = getComputedStyle(element, "::before");
      const dotStyle = getComputedStyle(element, "::after");
      return {
        rail: {
          color: railStyle.borderInlineStartColor,
          width: railStyle.borderInlineStartWidth,
        },
        dot: {
          background: dotStyle.backgroundColor,
          borderColor: dotStyle.borderTopColor,
          borderWidth: dotStyle.borderTopWidth,
          borderStyle: dotStyle.borderTopStyle,
        },
        pageBackground: getComputedStyle(document.body).backgroundColor,
      };
    });
    expect(dot).toEqual({
      background: pageBackground,
      borderColor: rail.color,
      borderWidth: rail.width,
      borderStyle: "solid",
    });
  });

  test("each entry is a bordered card", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const entry = page.locator(".api-changelog-entry").first();
    const card = await entry.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        borderStyle: style.borderTopStyle,
        borderWidth: style.borderTopWidth,
        borderRadius: style.borderTopLeftRadius,
      };
    });
    expect(card).toEqual({
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: "6px",
    });
  });

  test("the side nav's Changelog link is active", async ({ page }) => {
    await page.goto("/api/changelog/breaking/");
    const activeCategory = page.locator(".api-side-nav__category--active");
    await expect(activeCategory).toHaveCount(1);
    await expect(activeCategory).toHaveText("Changelog");
    await expect(activeCategory).toHaveAttribute("aria-current", "page");
  });
});

test.describe("API changelog at phone width", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("doesn't scroll horizontally", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});

test.describe("API changelog in Japanese", () => {
  test("both navs link to the Japanese changelog", async ({ page }) => {
    const response = await page.goto("/ja/api/changelog/");
    expect(response?.status()).toBe(200);
    await expect(
      page.locator("a.api-side-nav__category", { hasText: "Changelog" }),
    ).toHaveAttribute("href", "/ja/api/changelog/");
    await expect(
      page.locator(".mobile-nav__list--api a.mobile-nav__link", {
        hasText: "Changelog",
      }),
    ).toHaveAttribute("href", "/ja/api/changelog/");
  });
});
