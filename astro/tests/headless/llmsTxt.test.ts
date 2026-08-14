/**
 * The llms.txt build seam: the `llms-index.json` route emits the structure
 * sidecar inside Vite, and the `llmsTxt` integration turns it into files after
 * the build. This covers the route end of that seam — that what it serves is a
 * valid, site-free sidecar the tree builder can consume. Writing the files is
 * covered in `src/integrations/llmsTxt.test.ts`.
 */

import { describe, it, expect, vi } from 'vitest';
import { LlmsIndexSchema } from '@lib/pagesListing/types';
import type { PlaintextPage, PlaintextPageSource } from '@lib/pagesListing/types';
import { buildLlmsTree } from '@lib/pagesListing/llmsTree';

function stubPage(
  urlPath: string,
  title: string,
  extra: Partial<PlaintextPage['metadata']> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: { title, description: '', breadcrumbs: ['Docs'], isPrivate: false, ...extra },
  };
}

const stubSource: PlaintextPageSource = {
  title: 'API Reference',
  listRootPages: async () => [
    stubPage('/api/latest.md', 'API Reference', { description: 'Reference docs.' }),
  ],
  listSections: async () => [
    {
      title: 'Metrics',
      llmsTxtPath: '/api/latest/metrics/llms.txt',
      pages: [
        stubPage('/api/latest/metrics.md', 'Metrics', { description: 'Metric endpoints.' }),
        stubPage('/api/latest/metrics/get-a-metric.md', 'Get a metric', { description: 'Fetch a metric.' }),
        stubPage('/api/latest/metrics/secret.md', 'Secret op', { isPrivate: true }),
      ],
    },
  ],
};

vi.mock('@lib/pagesListing/pageSources', () => ({ pageSources: [stubSource] }));

const { GET: sidecarGET } = await import('../../src/pages/llms-index.json.ts');

const SITE = 'https://docs.datadoghq.com';

const call = () => sidecarGET({} as Parameters<typeof sidecarGET>[0]) as Promise<Response>;

async function readSidecar() {
  return LlmsIndexSchema.parse(JSON.parse(await (await call()).text()));
}

describe('GET /llms-index.json (structure sidecar)', () => {
  it('returns application/json', async () => {
    const res = await call();
    expect(res.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
  });

  it('serves a payload that validates against LlmsIndexSchema', async () => {
    await expect(readSidecar()).resolves.toBeDefined();
  });

  it('needs no site: the sidecar holds url paths, not absolute URLs', async () => {
    const body = await (await call()).text();
    expect(body).not.toMatch(/https?:/);
  });

  it('carries each source heading, its root pages, and its sections', async () => {
    const [source] = await readSidecar();
    expect(source.title).toBe('API Reference');
    expect(source.rootPages.map((page) => page.urlPath)).toEqual(['/api/latest.md']);
    expect(source.sections.map((section) => section.llmsTxtPath)).toEqual([
      '/api/latest/metrics/llms.txt',
    ]);
  });
});

describe('tree built from the served sidecar', () => {
  it('produces the top-level index with root page and section links', async () => {
    const { index } = buildLlmsTree(await readSidecar(), SITE);
    expect(index.startsWith('# Datadog documentation\n')).toBe(true);
    expect(index).toContain('## API Reference\n');
    expect(index).toContain(`- [API Reference](${SITE}/api/latest.md): Reference docs.`);
    expect(index).toContain(`- [Metrics](${SITE}/api/latest/metrics/llms.txt): Metric endpoints.`);
  });

  it('produces a detail file per section, listing its pages', async () => {
    const { detailFiles } = buildLlmsTree(await readSidecar(), SITE);
    const metrics = detailFiles.get('/api/latest/metrics/llms.txt');
    expect(metrics).toBeDefined();
    expect(metrics!.startsWith('# Metrics\n')).toBe(true);
    expect(metrics).toContain(`- [Metrics](${SITE}/api/latest/metrics.md)`);
    expect(metrics).toContain(`- [Get a metric](${SITE}/api/latest/metrics/get-a-metric.md): Fetch a metric.`);
  });

  it('excludes private pages from the detail file', async () => {
    const { detailFiles } = buildLlmsTree(await readSidecar(), SITE);
    const metrics = detailFiles.get('/api/latest/metrics/llms.txt');
    expect(metrics).not.toContain('Secret op');
    expect(metrics).not.toContain('secret.md');
  });
});
