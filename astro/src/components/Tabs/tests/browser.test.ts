import { test, expect, type Page } from "@playwright/test";

test.describe("Tabs component", () => {
  // Narrow viewport forces the many-tabs instance to overflow into pills layout;
  // retina `deviceScaleFactor` matches the rest of the suite.
  test.use({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 2 });

  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/tabs");
  });

  test("many-tab instance uses pills layout", async ({ page }) => {
    const pillsTabs = page.locator(".tabs.tabs--pills");
    await expect(pillsTabs).toBeVisible();
  });

  test("pills layout switches tabs on click", async ({ page }) => {
    const pillsTabs = page.locator(".tabs.tabs--pills");
    await expect(
      pillsTabs.locator('[role="tablist"][data-hydrated="true"]'),
    ).toBeVisible();
    const tab3 = pillsTabs.locator('.tabs__button[data-tab-index="2"]');
    await tab3.click();

    await expect(tab3).toHaveAttribute("aria-selected", "true");
    const panel = pillsTabs.locator(".tabs__panel--active");
    await expect(panel).toContainText("Go");
  });

  test("default tabs nav does not overflow vertically", async ({ page }) => {
    const defaultNav = page
      .locator(".tabs:not(.tabs--pills)")
      .first()
      .locator('[role="tablist"][data-hydrated="true"]');
    await expect(defaultNav).toBeVisible();
    // A vertical overflow of even 1px makes the browser draw a scrollbar,
    // because `overflow-x: auto` also turns `overflow-y` into `auto`.
    const { scrollHeight, clientHeight } = await defaultNav.evaluate((nav) => ({
      scrollHeight: nav.scrollHeight,
      clientHeight: nav.clientHeight,
    }));
    expect(scrollHeight).toBeLessThanOrEqual(clientHeight);
  });

  test("default tabs variant matches screenshot", async ({ page }) => {
    const defaultTabs = page.locator(".tabs:not(.tabs--pills)").first();
    await expect(defaultTabs).toHaveScreenshot("tabs-default.png");
  });

  test("pills tabs variant matches screenshot", async ({ page }) => {
    const pillsTabs = page.locator(".tabs.tabs--pills").first();
    await expect(pillsTabs).toHaveScreenshot("tabs-pills.png");
  });

  test("active tab highlighted state matches screenshot", async ({ page }) => {
    const defaultTabs = page.locator(".tabs:not(.tabs--pills)").first();
    await expect(
      defaultTabs.locator('[role="tablist"][data-hydrated="true"]'),
    ).toBeVisible();
    await defaultTabs.locator('.tabs__button[data-tab-index="2"]').click();
    await expect(
      defaultTabs.locator('.tabs__button[data-tab-index="2"]'),
    ).toHaveAttribute("aria-selected", "true");
    await expect(defaultTabs).toHaveScreenshot("tabs-active.png");
  });
});

test.describe("Tabs component — synced tabs", () => {
  const MOCK = "/dd_e2e/components/tabs";

  // The two groups on the mock page with a Linux tab.
  const osGroups = (page: Page) =>
    page
      .locator(".tabs")
      .filter({ has: page.locator('[role="tab"][data-sync-key="linux"]') });

  const osTab = (page: Page, groupIndex: number, key: string) =>
    osGroups(page)
      .nth(groupIndex)
      .locator(`[role="tab"][data-sync-key="${key}"]`);

  const waitForOsGroups = async (page: Page) => {
    await expect(osGroups(page)).toHaveCount(2);
    await expect(
      osGroups(page).locator('[role="tablist"][data-hydrated="true"]'),
    ).toHaveCount(2);
  };

  test("a click in one group switches the other and stores the key", async ({
    page,
    context,
  }) => {
    await page.goto(MOCK);
    await waitForOsGroups(page);

    await osTab(page, 0, "windows").click();

    await expect(osTab(page, 1, "windows")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page).toHaveURL(/[?&]tab=windows/);
    const tabCookie = (await context.cookies()).find(
      (cookie) => cookie.name === "tab",
    );
    expect(tabCookie?.value).toBe("windows");
  });

  for (const param of ["tab", "tabs"]) {
    test(`?${param}= selects the tab in every group`, async ({ page }) => {
      await page.goto(`${MOCK}?${param}=macos`);
      await waitForOsGroups(page);

      await expect(osTab(page, 0, "macos")).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(osTab(page, 1, "macos")).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
  }
});
