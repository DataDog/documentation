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

  test("a clicked filter tab turns active while its page is still loading", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    await page
      .locator('.api-changelog-filter-bar[data-hydrated="true"]')
      .waitFor();

    // Holds the next page's response, so the old page stays up until released.
    let releaseResponse!: () => void;
    const responseReleased = new Promise<void>((resolve) => {
      releaseResponse = resolve;
    });
    await page.route("**/api/changelog/added/", async (route) => {
      await responseReleased;
      await route.continue();
    });

    // Locators and evaluate() both wait out a pending navigation, so the old
    // page reports its own active tab changes instead.
    const activeTabChanges: string[] = [];
    let reportFirstChange!: () => void;
    const firstChangeReported = new Promise<void>((resolve) => {
      reportFirstChange = resolve;
    });
    await page.exposeFunction("reportActiveTab", (label: string) => {
      activeTabChanges.push(label);
      reportFirstChange();
    });
    await page.evaluate(() => {
      const bar = document.querySelector(".api-changelog-filter-bar")!;
      new MutationObserver(() => {
        const activeTab = bar.querySelector(
          ".api-changelog-filter-bar__tab--active",
        );
        // @ts-expect-error -- exposed by the test above.
        window.reportActiveTab(activeTab?.textContent ?? "");
      }).observe(bar, { subtree: true, attributeFilter: ["class"] });
    });

    await page
      .locator(".api-changelog-filter-bar__tab", { hasText: "Added" })
      .click({ noWaitAfter: true });

    await firstChangeReported;
    expect(activeTabChanges.at(-1)).toBe("Added");
    expect(page.url()).toMatch(/\/api\/changelog\/$/);

    releaseResponse();
    await expect(page).toHaveURL(/\/api\/changelog\/added\/$/);
    await expect(
      page.locator(".api-changelog-filter-bar__tab--active"),
    ).toHaveText("Added");
  });

  test("the active filter tab keeps its text color on hover", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const activeTab = page.locator(".api-changelog-filter-bar__tab--active");
    const restingColor = await activeTab.evaluate(
      (element) => getComputedStyle(element).color,
    );

    await activeTab.hover();
    const hover = await activeTab.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, background: style.backgroundColor };
    });
    expect(hover.color).toBe(restingColor);
    expect(hover.color).not.toBe(hover.background);
  });

  test("Next goes to the top of page 2", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const next = page.locator("a.pagination__next");
    test.skip(
      (await next.count()) === 0,
      "The live changelog fits on one page.",
    );

    await next.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await next.click();

    await expect(page).toHaveURL(/\/api\/changelog\/2\/$/);
    await expect(page.locator(".pagination__page--current")).toHaveText("2");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
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

  test("each filter tab is its own bordered box, filled when active", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const tabs = await page
      .locator(".api-changelog-filter-bar__tab")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          const item = element.parentElement!.getBoundingClientRect();
          const box = element.getBoundingClientRect();
          return {
            active: element.classList.contains(
              "api-changelog-filter-bar__tab--active",
            ),
            borderStyle: style.borderTopStyle,
            borderColor: style.borderTopColor,
            background: style.backgroundColor,
            fillsItem:
              Math.round(box.height) === Math.round(item.height) &&
              Math.round(box.top) === Math.round(item.top),
          };
        }),
      );
    expect(tabs.length).toBeGreaterThan(1);
    for (const tab of tabs) {
      expect(tab.borderStyle).toBe("solid");
      expect(tab.fillsItem).toBe(true);
    }
    const activeTabs = tabs.filter((tab) => tab.active);
    expect(activeTabs).toHaveLength(1);
    // The active tab's border is its fill color, so its corners read cleanly.
    expect(activeTabs[0].borderColor).toBe(activeTabs[0].background);
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

  test("badges are one fixed width, in their own column", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const entries = page.locator(".api-changelog-entry");
    const layouts = await entries.evaluateAll((elements) =>
      elements.slice(0, 5).map((element) => {
        const pill = element
          .querySelector(".api-changelog-entry__pill")!
          .getBoundingClientRect();
        const title = element
          .querySelector(".api-changelog-entry__title")!
          .getBoundingClientRect();
        const meta = element
          .querySelector(".api-changelog-entry__meta")!
          .getBoundingClientRect();
        const card = element.getBoundingClientRect();
        return {
          pillLeftOfBody: pill.right < Math.min(title.left, meta.left),
          pillWidth: Math.round(pill.width),
          bodyOffset: Math.round(title.left - card.left),
        };
      }),
    );
    expect(layouts.length).toBeGreaterThan(1);
    for (const layout of layouts) {
      expect(layout.pillLeftOfBody).toBe(true);
    }
    expect(new Set(layouts.map((layout) => layout.pillWidth))).toEqual(
      new Set([96]),
    );
    // Every card's body starts at the same offset, so the column lines up.
    expect(new Set(layouts.map((layout) => layout.bodyOffset)).size).toBe(1);
  });

  test("the date fits on one line in its column, centered on the dot", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator(".api-changelog-timeline__section").first();
    const layout = await section.evaluate((element) => {
      const sectionTop = element.getBoundingClientRect().top;
      const date = element.querySelector(".api-changelog-timeline__date")!;
      const time = date.querySelector("time")!.getBoundingClientRect();
      const dotStyle = getComputedStyle(element, "::after");
      return {
        lineCount: date.querySelector("time")!.getClientRects().length,
        overflows: date.scrollWidth > date.clientWidth,
        timeCenter: time.top + time.height / 2 - sectionTop,
        dotCenter: parseFloat(dotStyle.top) + parseFloat(dotStyle.height) / 2,
      };
    });
    expect(layout.lineCount).toBe(1);
    expect(layout.overflows).toBe(false);
    expect(Math.abs(layout.timeCenter - layout.dotCenter)).toBeLessThan(2);
  });

  test("operation links are underlined only on hover", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const operationLink = page
      .locator("a.api-changelog-entry__operation")
      .first();
    const textDecorationLines = await operationLink.evaluate((element) => [
      getComputedStyle(element).textDecorationLine,
      getComputedStyle(element.querySelector("code")!).textDecorationLine,
    ]);
    expect(textDecorationLines).toEqual(["none", "none"]);

    await operationLink.hover();
    await expect(operationLink).toHaveCSS("text-decoration-line", "underline");
  });

  test("a hovered operation link's text is its underline's color", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const operationLink = page
      .locator("a.api-changelog-entry__operation")
      .first();
    const codeColor = () =>
      operationLink.evaluate(
        (element) => getComputedStyle(element.querySelector("code")!).color,
      );
    const restingColor = await codeColor();

    await operationLink.hover();
    await expect.poll(codeColor).not.toBe(restingColor);
    const linkColor = await operationLink.evaluate(
      (element) => getComputedStyle(element).textDecorationColor,
    );
    expect(await codeColor()).toBe(linkColor);
  });

  // Unlinked operations take the class's size directly, but the live data has
  // none to compare against, so this checks that a linked operation's code
  // takes that same class size instead of the global inline-code size.
  test("a linked operation's code is the operation class's size", async ({
    page,
  }) => {
    await page.goto(CHANGELOG_URL);
    const fontSizes = await page
      .locator("a.api-changelog-entry__operation")
      .first()
      .evaluate((element) => ({
        link: getComputedStyle(element).fontSize,
        code: getComputedStyle(element.querySelector("code")!).fontSize,
      }));
    expect(fontSizes.code).toBe(fontSizes.link);
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

  test("badges stack above the entry body", async ({ page }) => {
    await page.goto(CHANGELOG_URL);
    const entry = page.locator(".api-changelog-entry").first();
    const layout = await entry.evaluate((element) => {
      const pill = element
        .querySelector(".api-changelog-entry__pill")!
        .getBoundingClientRect();
      const body = element
        .querySelector(".api-changelog-entry__body")!
        .getBoundingClientRect();
      return {
        pillAboveBody: pill.bottom <= body.top,
        sameLeftEdge: Math.round(pill.left) === Math.round(body.left),
      };
    });
    expect(layout).toEqual({ pillAboveBody: true, sameLeftEdge: true });
  });

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
