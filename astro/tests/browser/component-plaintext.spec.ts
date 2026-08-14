import { test, expect } from '@playwright/test';

// The catch-all `.md` route serves plaintext for every `content/en` page, not
// just cdocs. A non-filterable page (e.g. a Markdoc component test page)
// renders through the component plaintext twins, with the frontmatter title
// prepended as an H1 to mirror the HTML page.
test.describe('non-cdoc plaintext (.md)', () => {
  test('renders twin plaintext with the frontmatter title prepended', async ({
    request,
  }) => {
    const response = await request.get('/dd_e2e/components/alert.md');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');

    const body = await response.text();
    // Frontmatter title is prepended as an H1 (mirrors the HTML page).
    expect(body).toContain('# Alert');
    // The twin-rendered body follows.
    expect(body).toContain('A static alert banner');
  });
});
