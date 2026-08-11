import { test, expect } from '@playwright/test';

// Serving coverage for the post-build llms.txt tree: proves the files the
// `llmsTxt` integration writes into dist/client are actually served as static
// files at their URLs, and are not shadowed by [...slug].astro. Section slugs
// are discovered from the index itself, so this tracks the live spec.
//
// llms.txt is a post-build artifact, so it does not exist under `astro dev` —
// this needs the prod build (`playwright test` without USE_DEV_SERVER).
test.describe('llms.txt tree routing', () => {
  test.skip(
    process.env.USE_DEV_SERVER === 'true',
    'llms.txt is written by the post-build integration, which dev does not run',
  );


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
