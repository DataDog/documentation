import { test, expect } from '@playwright/test';

test.describe('Counter component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/counter');
  });

  test('renders with default count of 0', async ({ page }) => {
    const counter = page.locator('[data-testid="counter"]').first();
    await expect(counter).toBeVisible();
    await expect(counter.locator('[data-testid="counter-display"]')).toHaveText('0');
  });

  test('increments when + is clicked', async ({ page }) => {
    const counter = page.locator('[data-testid="counter"]').first();
    const display = counter.locator('[data-testid="counter-display"]');
    const increment = counter.getByRole('button', { name: '+' });

    await increment.click();
    await expect(display).toHaveText('1');

    await increment.click();
    await expect(display).toHaveText('2');
  });

  test('decrements when - is clicked', async ({ page }) => {
    const counter = page.locator('[data-testid="counter"]').first();
    const display = counter.locator('[data-testid="counter-display"]');
    const decrement = counter.getByRole('button', { name: '-' });

    await decrement.click();
    await expect(display).toHaveText('-1');
  });

  test('renders counter with custom initial count', async ({ page }) => {
    const counter = page.locator('[data-testid="counter"]').nth(1);
    await expect(counter.locator('[data-testid="counter-display"]')).toHaveText('10');
  });
});
