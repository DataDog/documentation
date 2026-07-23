import { describe, it, expect } from 'vitest';
import { renderLlmsTxt } from './llmsTxtRenderer';
import type { ApiCategory, ApiOperationStub } from './schemas/views';

function op(summary: string, slug: string, method = 'GET'): ApiOperationStub {
  return { operationId: `id-${slug}`, summary, slug, menuOrder: 1, versions: ['v2'], method, deprecated: false, unstable: false, regionUrls: {} };
}

function cat(name: string, slug: string, operations: ApiOperationStub[] = []): ApiCategory {
  return { name, slug, description: '', operations, deprecated: false };
}

const SITE = 'https://docs.datadoghq.com';

describe('renderLlmsTxt', () => {
  it('starts with the level-2 heading and a blank line', () => {
    const out = renderLlmsTxt(
      [cat('Action Connection', 'action-connection', [op('Get a connection', 'get-a-connection')])],
      SITE,
    );
    expect(out.startsWith('## Datadog API Reference\n\n')).toBe(true);
  });

  it('emits a level-3 heading per category and a bullet per operation', () => {
    const out = renderLlmsTxt(
      [
        cat('Beta', 'beta', [op('B-1', 'b-1'), op('B-2', 'b-2')]),
        cat('Alpha', 'alpha', [op('A-1', 'a-1')]),
      ],
      SITE,
    );
    const lines = out.trimEnd().split('\n');
    expect(lines).toEqual([
      '## Datadog API Reference',
      '',
      '### Beta',
      '',
      '- [B-1](https://docs.datadoghq.com/api/latest/beta/b-1.md)',
      '- [B-2](https://docs.datadoghq.com/api/latest/beta/b-2.md)',
      '',
      '### Alpha',
      '',
      '- [A-1](https://docs.datadoghq.com/api/latest/alpha/a-1.md)',
    ]);
  });

  it('emits the per-operation link in the prompt-specified format', () => {
    const out = renderLlmsTxt(
      [cat('AWS Integration', 'aws-integration', [op('Create role', 'create-role')])],
      SITE,
    );
    expect(out).toContain(
      '- [Create role](https://docs.datadoghq.com/api/latest/aws-integration/create-role.md)',
    );
  });

  it('skips empty categories (deprecated empties)', () => {
    const out = renderLlmsTxt(
      [
        cat('Screenboards', 'screenboards', []),
        cat('Action Connection', 'action-connection', [op('Get', 'get')]),
      ],
      SITE,
    );
    expect(out).not.toContain('Screenboards');
    expect(out).toContain('Action Connection');
  });

  it('emits just the heading when given no categories', () => {
    const out = renderLlmsTxt([], SITE);
    expect(out).toBe('## Datadog API Reference\n');
  });

  it('throws when siteUrl is empty', () => {
    expect(() =>
      renderLlmsTxt([cat('A', 'a', [op('x', 'x')])], ''),
    ).toThrow(/siteUrl/);
  });
});
