import { test, expect } from "@playwright/test";

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
    const select = page.locator(".region-selector .select__control");
    await expect(select).toHaveValue("us");
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
    const select = page.locator(".region-selector .select__control");
    const values = await select
      .locator("option")
      .evaluateAll((opts) => opts.map((o) => (o as HTMLOptionElement).value));
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
    const select = page.locator(".region-selector .select__control");
    await select.selectOption("eu");
    await expect(select).toHaveValue("eu");
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
    const select = page.locator(".region-selector .select__control");
    await expect(select).toHaveValue("ap1");
    await expect(page.locator("html")).toHaveAttribute(
      "data-active-region",
      "ap1",
    );
  });
});
