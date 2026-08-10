import { describe, it, expect, vi } from 'vitest';
import type { PlaintextPage, PlaintextPageSource } from '@lib/pagesListing/types';

function page(
  urlPath: string,
  title: string,
  extra: Partial<PlaintextPage['metadata']> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: { title, description: '', breadcrumbs: ['Docs'], isPrivate: false, ...extra },
    buildBody: async () => '',
  };
}

const source: PlaintextPageSource = {
  title: 'API Reference',
  listRootPages: async () => [
    page('/api/latest.md', 'API Reference', { description: 'Reference docs.' }),
  ],
  listSections: async () => [
    {
      title: 'Metrics',
      llmsTxtPath: '/api/latest/metrics/llms.txt',
      pages: [
        page('/api/latest/metrics.md', 'Metrics', { description: 'Metric endpoints.' }),
        page('/api/latest/metrics/get-a-metric.md', 'Get a metric', { description: 'Fetch a metric.' }),
        page('/api/latest/metrics/secret.md', 'Secret op', { isPrivate: true }),
      ],
    },
  ],
};

vi.mock('@lib/pagesListing/pageSources', () => ({ pageSources: [source] }));

const { GET: indexGET } = await import('../../src/pages/llms.txt.ts');
const { GET: detailGET } = await import('../../src/pages/[...llmsSection]/llms.txt.ts');

const SITE = new URL('https://docs.datadoghq.com');

describe('GET /llms.txt (index)', () => {
  const ctx = { site: SITE } as Parameters<typeof indexGET>[0];

  it('returns text/plain and starts with the intro heading', async () => {
    const res = (await indexGET(ctx)) as Response;
    expect(res.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    const body = await res.text();
    expect(body.startsWith('# Datadog documentation\n')).toBe(true);
  });

  it('lists the source heading, root pages, and section links', async () => {
    const body = await ((await indexGET(ctx)) as Response).text();
    expect(body).toContain('## API Reference\n');
    expect(body).toContain('- [API Reference](https://docs.datadoghq.com/api/latest.md): Reference docs.');
    expect(body).toContain('- [Metrics](https://docs.datadoghq.com/api/latest/metrics/llms.txt): Metric endpoints.');
  });

  it('throws when site is not configured', async () => {
    const noSite = {} as Parameters<typeof indexGET>[0];
    await expect(async () => await indexGET(noSite)).rejects.toThrow(/site/);
  });
});

describe('GET /{section}/llms.txt (detail)', () => {
  const call = (llmsSection: string) =>
    detailGET({ params: { llmsSection }, site: SITE } as unknown as Parameters<typeof detailGET>[0]);

  it('serves a section detail file with its pages', async () => {
    const res = (await call('api/latest/metrics')) as Response;
    expect(res.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    const body = await res.text();
    expect(body.startsWith('# Metrics\n')).toBe(true);
    expect(body).toContain('- [Metrics](https://docs.datadoghq.com/api/latest/metrics.md)');
    expect(body).toContain('- [Get a metric](https://docs.datadoghq.com/api/latest/metrics/get-a-metric.md): Fetch a metric.');
  });

  it('excludes private pages from the detail file', async () => {
    const body = await ((await call('api/latest/metrics')) as Response).text();
    expect(body).not.toContain('Secret op');
    expect(body).not.toContain('secret.md');
  });

  it('404s for an unknown section', async () => {
    const res = (await call('api/latest/does-not-exist')) as Response;
    expect(res.status).toBe(404);
  });
});
