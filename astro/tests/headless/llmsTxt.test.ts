import { describe, it, expect, vi } from 'vitest';
import type { PlaintextPage } from '@lib/pagesListing/types';

const pages: PlaintextPage[] = [
  {
    urlPath: '/api/latest.md',
    metadata: { title: 'API Reference', description: 'Reference docs.', breadcrumbs: ['Docs'], isPrivate: false },
    buildBody: async () => '',
  },
  {
    urlPath: '/api/latest/action-connection.md',
    metadata: { title: 'Action Connection', description: '', breadcrumbs: ['Docs', 'API Reference'], isPrivate: false },
    buildBody: async () => '',
  },
  {
    urlPath: '/api/latest/action-connection/get-a-connection.md',
    metadata: {
      title: 'Get a connection',
      description: 'Get the connection.',
      breadcrumbs: ['Docs', 'API Reference', 'Action Connection'],
      isPrivate: false,
    },
    buildBody: async () => '',
  },
  {
    urlPath: '/api/latest/action-connection/secret-op.md',
    metadata: {
      title: 'Secret op',
      description: '',
      breadcrumbs: ['Docs', 'API Reference', 'Action Connection'],
      isPrivate: true,
    },
    buildBody: async () => '',
  },
];

vi.mock('@lib/pagesListing/pageSources', () => ({
  pageSources: [{ listPages: vi.fn(async () => pages) }],
}));

const { GET } = await import('../../src/pages/llms.txt.ts');

describe('GET /llms.txt', () => {
  const ctx = { site: new URL('https://docs.datadoghq.com') } as Parameters<typeof GET>[0];

  it('returns text/plain with utf-8', async () => {
    const res = (await GET(ctx)) as Response;
    expect(res.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
  });

  it('starts with the top-level heading', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body.startsWith('# Datadog Documentation\n\n')).toBe(true);
  });

  it('groups by breadcrumb and links to each page .md', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body).toContain('## API Reference\n');
    expect(body).toContain('## API Reference > Action Connection\n');
    expect(body).toMatch(
      /- \[Get a connection\]\(https:\/\/docs\.datadoghq\.com\/api\/latest\/action-connection\/get-a-connection\.md\): Get the connection\./,
    );
  });

  it('excludes private pages', async () => {
    const res = (await GET(ctx)) as Response;
    const body = await res.text();
    expect(body).not.toContain('Secret op');
    expect(body).not.toContain('secret-op.md');
  });

  it('throws when site is not configured', async () => {
    const noSite = {} as Parameters<typeof GET>[0];
    await expect(async () => await GET(noSite)).rejects.toThrow(/site/);
  });
});
