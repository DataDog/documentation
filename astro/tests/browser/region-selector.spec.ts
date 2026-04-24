import { test, expect } from '@playwright/test';

test.describe('RegionSelector component', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/docs/components/region-selector');
  });

  test('renders the region selector', async ({ page }) => {
    const selector = page.locator('.region-selector');
    await expect(selector).toBeVisible();
  });

  test('defaults to US1 (key `us`) when no cookie or query param is set', async ({ page }) => {
    const select = page.locator('.region-selector__select');
    await expect(select).toHaveValue('us');
    await expect(page.locator('html')).toHaveAttribute('data-active-region', 'us');
  });

  test('offers all allowed Datadog sites as options', async ({ page }) => {
    const select = page.locator('.region-selector__select');
    const values = await select.locator('option').evaluateAll((opts) =>
      opts.map((o) => (o as HTMLOptionElement).value)
    );
    expect(values).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'gov']);
  });

  test('changes region, writes cookie, updates query param, and sets data-active-region', async ({ page }) => {
    await expect(page.locator('.region-selector[data-hydrated="true"]')).toBeVisible();
    const select = page.locator('.region-selector__select');
    await select.selectOption('eu');
    await expect(select).toHaveValue('eu');
    await expect(page.locator('html')).toHaveAttribute('data-active-region', 'eu');

    const cookies = await page.context().cookies();
    const siteCookie = cookies.find((c) => c.name === 'site');
    expect(siteCookie?.value).toBe('eu');

    await expect(page).toHaveURL(/[?&]site=eu(?:&|$)/);
  });

  test('reads the region from the `?site=` query param on load', async ({ page }) => {
    await page.goto('/docs/components/region-selector?site=ap1');
    const select = page.locator('.region-selector__select');
    await expect(select).toHaveValue('ap1');
    await expect(page.locator('html')).toHaveAttribute('data-active-region', 'ap1');
  });
});
