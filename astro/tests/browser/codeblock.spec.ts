import { test, expect } from '@playwright/test';

test.describe('CodeBlock component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/codeblock');
  });

  test('renders code blocks on the page', async ({ page }) => {
    const codeBlocks = page.locator('[data-testid="code-block"]');
    await expect(codeBlocks.first()).toBeVisible();
    expect(await codeBlocks.count()).toBeGreaterThanOrEqual(4);
  });

  test('renders code block without language label', async ({ page }) => {
    const plainBlock = page.locator('[data-testid="code-block"]:not([data-language])').first();
    await expect(plainBlock).toBeVisible();
    await expect(plainBlock.locator('code')).toContainText('This is a plain code block');
  });

  test('renders code block with language label', async ({ page }) => {
    const jsBlock = page.locator('[data-language="javascript"]').first();
    await expect(jsBlock).toBeVisible();
    await expect(jsBlock).toContainText('javascript');
    await expect(jsBlock.locator('code')).toContainText('const greeting');
  });

  test('each code block has a copy button', async ({ page }) => {
    const codeBlocks = page.locator('[data-testid="code-block"]');
    const count = await codeBlocks.count();

    for (let i = 0; i < count; i++) {
      const copyBtn = codeBlocks.nth(i).locator('[data-testid="code-block-copy"]');
      await expect(copyBtn).toBeVisible();
      await expect(copyBtn).toHaveText('Copy');
    }
  });

  test('copy button shows "Copied!" after click', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const firstBlock = page.locator('[data-testid="code-block"]').first();
    const copyBtn = firstBlock.locator('[data-testid="code-block-copy"]');

    await copyBtn.click();
    await expect(copyBtn).toHaveText('Copied!');
  });
});
