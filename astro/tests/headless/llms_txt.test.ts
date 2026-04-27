import { describe, it, expect } from 'vitest';
import { GET } from '../../src/pages/llms.txt';

describe('GET /llms.txt', () => {
  const ctx = { site: new URL('https://docs.datadoghq.com') } as Parameters<typeof GET>[0];

  it('returns text/plain with utf-8', async () => {
    const res = (await GET(ctx)) as Response;
    expect(res.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
  });

  it('starts with the API Reference heading', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body.startsWith('## Datadog API Reference\n\n')).toBe(true);
  });

  it('includes one bullet per known API category', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body).toMatch(/- \[Action Connection\]\(https:\/\/docs\.datadoghq\.com\/api\/latest\/action-connection\.md\)/);
    expect(body).toMatch(/- \[AWS Integration\]\(https:\/\/docs\.datadoghq\.com\/api\/latest\/aws-integration\.md\)/);
  });

  it('throws when site is not configured', async () => {
    const noSite = {} as Parameters<typeof GET>[0];
    await expect(async () => await GET(noSite)).rejects.toThrow(/site/);
  });
});
