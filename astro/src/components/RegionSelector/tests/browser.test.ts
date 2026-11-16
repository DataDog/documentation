import { test, expect } from "@playwright/test";
import { chooseSelectOption } from "../../Select/tests/chooseSelectOption";

test.describe("RegionSelector component", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/dd_e2e/components/region-selector");
  });

  test("renders the region selector", async ({ page }) => {
    const selector = page.locator(".region-selector");
    await expect(selector).toBeVisible();
  });

  test("defaults to US1 (key `us`) when no cookie or query param is set", async ({
    page,
  }) => {
    const select = page.locator(".region-selector .select");
    await expect(select).toHaveAttribute("data-value", "us");
    await expect(page.locator("html")).toHaveAttribute(
      "data-active-region",
      "us",
    );
  });

  // Pinned on purpose. The options are rendered from the `regions` prop that
  // `RegionSelectorIsland.astro` fills with `buildClientRegions()`, so every
  // in-browser source — the options, the island props, the inline region CSS —
  // comes from the same allow-list the component read. Comparing against any of
  // them would assert nothing. `@config/regions` cannot be imported here
  // either: it loads `shared/regions.yaml` through a Vite `?raw` import, which
  // the Playwright process has no bundler for.
  //
  // So this list is respelled, and it is the assertion that the whole chain
  // reaches the browser in the right order.
  test("offers all allowed Datadog sites as options", async ({ page }) => {
    const values = await page
      .locator(".region-selector .select__option")
      .evaluateAll((opts) => opts.map((o) => (o as HTMLElement).dataset.value));
    // Update this list when a data center is added to shared/regions.yaml.
    expect(values).toEqual([
      "us",
      "us3",
      "us5",
      "eu",
      "ap1",
      "ap2",
      "uk1",
      "gov",
      "gov2",
    ]);
  });

  test("changes region, writes cookie, updates query param, and sets data-active-region", async ({
    page,
  }) => {
    await expect(
      page.locator('.region-selector[data-hydrated="true"]'),
    ).toBeVisible();
    await chooseSelectOption(page.locator(".region-selector"), "eu");
    await expect(page.locator(".region-selector .select")).toHaveAttribute(
      "data-value",
      "eu",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-active-region",
      "eu",
    );

    const cookies = await page.context().cookies();
    const siteCookie = cookies.find((c) => c.name === "site");
    expect(siteCookie?.value).toBe("eu");

    await expect(page).toHaveURL(/[?&]site=eu(?:&|$)/);
  });

  test("reads the region from the `?site=` query param on load", async ({
    page,
  }) => {
    await page.goto("/dd_e2e/components/region-selector?site=ap1");
    const select = page.locator(".region-selector .select");
    await expect(select).toHaveAttribute("data-value", "ap1");
    await expect(page.locator("html")).toHaveAttribute(
      "data-active-region",
      "ap1",
    );
  });

  // The bug this component replaced: the native <select> popup on macOS opens
  // over the current value. Layout can only be checked in a real browser.
  test("opens the menu below the button without covering it", async ({
    page,
  }) => {
    await expect(
      page.locator('.region-selector[data-hydrated="true"]'),
    ).toBeVisible();
    const button = page.locator(".region-selector .select__button");
    const menu = page.locator(".region-selector .select__menu");

    await button.click();
    await expect(menu).toBeVisible();

    const buttonBox = (await button.boundingBox())!;
    const menuBox = (await menu.boundingBox())!;
    expect(menuBox.y).toBeGreaterThanOrEqual(buttonBox.y + buttonBox.height);
    expect(menuBox.width).toBeGreaterThanOrEqual(buttonBox.width);
    await expect(button).toHaveAttribute("aria-expanded", "true");
  });

  test("matches the open-menu screenshot", async ({ page }) => {
    await expect(
      page.locator('.region-selector[data-hydrated="true"]'),
    ).toBeVisible();
    await page.locator(".region-selector .select__button").click();
    await page.locator(".region-selector .select__option").nth(2).hover();

    // Only the dropdown is under test; hide the footer behind it so footer
    // changes don't invalidate this baseline.
    await page.addStyleTag({ content: "footer { visibility: hidden; }" });

    const selector = page.locator(".region-selector");
    const menu = page.locator(".region-selector .select__menu");
    const selectorBox = (await selector.boundingBox())!;
    const menuBox = (await menu.boundingBox())!;
    await expect(page).toHaveScreenshot("region-selector-open.png", {
      clip: {
        x: selectorBox.x - 8,
        y: selectorBox.y - 8,
        width:
          Math.max(
            selectorBox.width,
            menuBox.x + menuBox.width - selectorBox.x,
          ) + 32,
        height: menuBox.y + menuBox.height - selectorBox.y + 32,
      },
    });
  });
});
