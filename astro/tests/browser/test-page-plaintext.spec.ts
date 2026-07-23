import { test, expect } from '@playwright/test';

// The Markdoc component test pages expose a `.md` plaintext twin at
// `/docs/test_pages/components/<name>.md`, linked from a "View this page as
// plaintext" anchor at the top of the rendered page.
const PAGE_URL = '/docs/test_pages/components/collapse-content/';
const PLAINTEXT_URL = '/docs/test_pages/components/collapse-content.md';

test.describe('Markdoc test page plaintext twin', () => {
  test('rendered page links to its .md plaintext twin', async ({ page }) => {
    await page.goto(PAGE_URL);

    const link = page.getByRole('link', { name: /view this page as plaintext/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', PLAINTEXT_URL);
  });

  test('.md URL serves the page as markdown plaintext', async ({ page }) => {
    const response = await page.request.get(PLAINTEXT_URL);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');

    const body = await response.text();
    // The Markdoc tag round-trips to its `{% ... %}` plaintext form.
    expect(body).toContain('{% collapse-content');
    expect(body).toContain('title="Expanded section (h4)"');
  });
});
