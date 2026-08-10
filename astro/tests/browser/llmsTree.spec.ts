import { test, expect } from '@playwright/test';

// Route-resolution coverage: proves the top-level /llms.txt and the
// [...llmsSection]/llms.txt catch-all actually resolve through Astro's router
// (and are not shadowed by [...slug].astro). Runs against the dev server, which
// uses the live spec, so section slugs are discovered from the index itself.
test.describe('llms.txt tree routing', () => {
  test('serves the index at /llms.txt', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/plain');
    const body = await res.text();
    expect(body.startsWith('# Datadog documentation')).toBe(true);
    expect(body).toContain('## API Reference');
  });

  test('serves a section detail file linked from the index', async ({ request }) => {
    const index = await (await request.get('/llms.txt')).text();
    const match = index.match(/\((https?:\/\/[^)]*\/api\/latest\/[^)]*\/llms\.txt)\)/);
    expect(match, 'index should link at least one section llms.txt').toBeTruthy();

    const path = new URL(match![1]).pathname;
    const res = await request.get(path);
    expect(res.status(), `GET ${path}`).toBe(200);
    expect(res.headers()['content-type']).toContain('text/plain');

    const body = await res.text();
    expect(body.startsWith('# ')).toBe(true);
    expect(body).toContain('/api/latest/');
  });
});
