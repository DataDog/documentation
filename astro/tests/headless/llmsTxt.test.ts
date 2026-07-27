import { describe, it, expect, vi } from 'vitest';

vi.mock('@lib/api/viewsBuilder', () => ({
  getCategoriesView: vi.fn(async () => [
    {
      slug: 'action-connection',
      name: 'Action Connection',
      description: '',
      operations: [
        { operationId: 'GetConnection', summary: 'Get a connection', slug: 'get-a-connection', menuOrder: 1, version: 'v2', method: 'GET' },
      ],
      deprecated: false,
    },
    {
      slug: 'aws-integration',
      name: 'AWS Integration',
      description: '',
      operations: [
        { operationId: 'CreateRole', summary: 'Create role', slug: 'create-role', menuOrder: 1, version: 'v1', method: 'POST' },
      ],
      deprecated: false,
    },
  ]),
}));

const { GET } = await import('../../src/pages/llms.txt.ts');

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

  it('includes a heading per category and a bullet per operation', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body).toContain('### Action Connection');
    expect(body).toMatch(/- \[Get a connection\]\(https:\/\/docs\.datadoghq\.com\/api\/latest\/action-connection\/get-a-connection\.md\)/);
    expect(body).toContain('### AWS Integration');
    expect(body).toMatch(/- \[Create role\]\(https:\/\/docs\.datadoghq\.com\/api\/latest\/aws-integration\/create-role\.md\)/);
  });

  it('throws when site is not configured', async () => {
    const noSite = {} as Parameters<typeof GET>[0];
    await expect(async () => await GET(noSite)).rejects.toThrow(/site/);
  });
});
