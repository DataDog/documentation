import { test, expect } from '@playwright/test';

test.describe('CodeBlock component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/codeblock');
  });

  test('renders all code blocks on the page', async ({ page }) => {
    const codeBlocks = page.locator('.code-block');
    await expect(codeBlocks.first()).toBeVisible();
    expect(await codeBlocks.count()).toBeGreaterThanOrEqual(11);
  });

  test('renders code block without language label', async ({ page }) => {
    const plainBlock = page.locator('.code-block:not([data-language])').first();
    await expect(plainBlock).toBeVisible();
    await expect(plainBlock.locator('code')).toContainText('This is a plain code block');
  });

  test('renders code block with language data attribute', async ({ page }) => {
    const jsBlock = page.locator('[data-language="javascript"]').first();
    await expect(jsBlock).toBeVisible();
    await expect(jsBlock.locator('code')).toContainText('const greeting');
  });

  test('each code block without disable_copy has a copy button', async ({ page }) => {
    const codeBlocks = page.locator('.code-block:not([data-disable-copy])');
    const count = await codeBlocks.count();

    for (let i = 0; i < count; i++) {
      // Copy button is hidden by default (opacity: 0); verify it exists in the DOM
      const copyBtn = codeBlocks.nth(i).locator('.code-block__copy');
      await expect(copyBtn).toBeAttached();
      await expect(copyBtn).toContainText('Copy');
    }
  });

  test('copy button appears on hover and shows Copied! after click', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const firstBlock = page.locator('.code-block[data-hydrated="true"]').first();
    await expect(firstBlock).toBeVisible();
    const content = firstBlock.locator('.code-block__content');
    const copyBtn = firstBlock.locator('.code-block__copy');

    // Hover over code content to reveal button
    await content.hover();
    await expect(copyBtn).toBeVisible();

    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied!');
  });

  // === Filename ===

  test('renders filename in header', async ({ page }) => {
    const filename = page.locator('.code-block__filename').first();
    await expect(filename).toBeVisible();
    await expect(filename).toHaveText('app.py');
  });

  // === Collapsible ===

  test('collapsible code block has toggle button', async ({ page }) => {
    const collapsibleBlock = page.locator('[data-collapsible]').first();
    const toggle = collapsibleBlock.locator('.code-block__toggle');
    await expect(toggle).toBeVisible();
  });

  test('toggle button collapses and expands code', async ({ page }) => {
    const collapsibleBlock = page.locator('[data-collapsible][data-hydrated="true"]').first();
    await expect(collapsibleBlock).toBeVisible();
    const toggle = collapsibleBlock.locator('.code-block__toggle');
    const content = collapsibleBlock.locator('.code-block__content');

    // Initially expanded
    await expect(content).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await toggle.click();
    await expect(content).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Click to expand again
    await toggle.click();
    await expect(content).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  // === Disable copy ===

  test('disable_copy block has no copy button', async ({ page }) => {
    const disabledBlock = page.locator('[data-disable-copy]').first();
    await expect(disabledBlock).toBeVisible();
    const copyBtn = disabledBlock.locator('.code-block__copy');
    expect(await copyBtn.count()).toBe(0);
  });

  // === Wrap ===

  test('wrapped code block applies word-wrap styling', async ({ page }) => {
    const wrapBlock = page.locator('.code-block--wrap').first();
    await expect(wrapBlock).toBeVisible();

    const codeEl = wrapBlock.locator('code').first();
    const whiteSpace = await codeEl.evaluate((el) => getComputedStyle(el).whiteSpace);
    expect(whiteSpace).toBe('normal');
  });
});
