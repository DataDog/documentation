import { test, expect } from '@playwright/test';

const MULTI_VERSION_URL = '/api/latest/aws-integration/list-all-aws-integrations/';
const SINGLE_VERSION_URL = '/api/latest/authentication/validate-api-key/';

// Operation pages nest many child Tabs instances (response codes, code
// examples, request body) inside the version-tab panels. The first
// `[role="tablist"]` under the operation's tabs root is the version-tabs nav
// because Astro renders the nav before the slotted panels containing the
// nested tabs.
const versionTabsNav = (page: import('@playwright/test').Page, slug: string) =>
  page.locator(`#api-endpoint-${slug}`).locator('[role="tablist"]').first();

test.describe('API operation page version tabs', () => {
  test('multi-version operation renders one pill per version with v2 active', async ({ page }) => {
    await page.goto(MULTI_VERSION_URL);

    const nav = versionTabsNav(page, 'list-all-aws-integrations');
    await expect(nav).toBeVisible();

    const buttons = nav.locator('.tabs__button');
    await expect(buttons).toHaveCount(2);
    await expect(buttons.nth(0)).toHaveText('v2 (latest)');
    await expect(buttons.nth(1)).toHaveText('v1');

    await expect(buttons.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(buttons.nth(1)).toHaveAttribute('aria-selected', 'false');

    // v1 panel must exist in the DOM at build time for SEO, just hidden.
    const v1Panel = page.locator('#list-all-aws-integrations-v1');
    await expect(v1Panel).toBeAttached();
    await expect(v1Panel).toBeHidden();
  });

  test('clicking v1 swaps the visible panel and activates the v1 button', async ({ page }) => {
    await page.goto(MULTI_VERSION_URL);

    const nav = versionTabsNav(page, 'list-all-aws-integrations');
    await expect(nav).toHaveAttribute('data-hydrated', 'true');
    const v1Button = nav.locator('.tabs__button', { hasText: /^v1$/ });
    await v1Button.click();

    await expect(v1Button).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#list-all-aws-integrations-v1')).toBeVisible();
    await expect(page.locator('#list-all-aws-integrations-v2')).toBeHidden();
  });

  test('loading the page with #...-v1 in the URL opens the v1 tab', async ({ page }) => {
    await page.goto(`${MULTI_VERSION_URL}#list-all-aws-integrations-v1`);

    const nav = versionTabsNav(page, 'list-all-aws-integrations');
    const v1Button = nav.locator('.tabs__button', { hasText: /^v1$/ });
    await expect(v1Button).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#list-all-aws-integrations-v1')).toBeVisible();
  });

  test('single-version operation renders one disabled "v1 (latest)" pill', async ({ page }) => {
    await page.goto(SINGLE_VERSION_URL);

    const nav = versionTabsNav(page, 'validate-api-key');
    const buttons = nav.locator('.tabs__button');
    await expect(buttons).toHaveCount(1);
    await expect(buttons).toHaveText('v1 (latest)');
    await expect(buttons).toBeDisabled();
    await expect(buttons).toHaveAttribute('aria-disabled', 'true');
  });

  test('legacy -v1 URL redirects to the unified page with the v1 tab active', async ({ page }) => {
    await page.goto('/api/latest/aws-integration/list-all-aws-integrations-v1/');
    await page.waitForURL(/list-all-aws-integrations\/#list-all-aws-integrations-v1$/);

    const nav = versionTabsNav(page, 'list-all-aws-integrations');
    const v1Button = nav.locator('.tabs__button', { hasText: /^v1$/ });
    await expect(v1Button).toHaveAttribute('aria-selected', 'true');
  });
});
