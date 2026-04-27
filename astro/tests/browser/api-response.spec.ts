import { test, expect } from '@playwright/test';

test.describe('ApiResponse component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/api-response');
  });

  test('full response section matches screenshot', async ({ page }) => {
    const response = page.locator('.api-response').first();
    await expect(response).toBeVisible();
    await expect(response).toHaveScreenshot('api-response-full.png');
  });

  const statusCodes = ['200', '403', '404'];

  for (const code of statusCodes) {
    test(`status ${code} tab matches screenshot`, async ({ page }) => {
      const response = page.locator('.api-response').first();
      await expect(response.locator('.tabs[data-hydrated="true"]').first()).toBeVisible();
      await response.getByRole('tab', { name: code, exact: true }).click();
      await expect(response.getByRole('tab', { name: code, exact: true })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      await expect(response).toHaveScreenshot(`api-response-status-${code}.png`);
    });
  }

  test('Model view matches screenshot', async ({ page }) => {
    const response = page.locator('.api-response').first();
    // Ensure both outer and inner Tabs islands are hydrated.
    await expect(response.locator('.tabs[data-hydrated="true"]')).toHaveCount(2);
    await response.getByRole('tab', { name: '200', exact: true }).click();
    await expect(response.getByRole('tab', { name: 'Model', exact: true })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(response).toHaveScreenshot('api-response-model.png');
  });

  test('Example view matches screenshot', async ({ page }) => {
    const response = page.locator('.api-response').first();
    await expect(response.locator('.tabs[data-hydrated="true"]')).toHaveCount(2);
    await response.getByRole('tab', { name: '200', exact: true }).click();
    await response.getByRole('tab', { name: 'Example', exact: true }).click();
    await expect(response.getByRole('tab', { name: 'Example', exact: true })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    // Move the mouse away to avoid CodeBlock copy-button hover state flakiness.
    await page.mouse.move(0, 0);
    await expect(response).toHaveScreenshot('api-response-example.png');
  });
});
