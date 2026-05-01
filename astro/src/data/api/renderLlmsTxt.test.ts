import { describe, it, expect } from 'vitest';
import { renderLlmsTxt } from './renderLlmsTxt';
import type { ApiCategory } from './index';

function cat(name: string, slug: string): ApiCategory {
  return { name, slug, description: '', operations: [], deprecated: false };
}

const SITE = 'https://docs.datadoghq.com';

describe('renderLlmsTxt', () => {
  it('starts with the level-2 heading and a blank line', () => {
    const out = renderLlmsTxt([cat('Action Connection', 'action-connection')], SITE);
    expect(out.startsWith('## Datadog API Reference\n\n')).toBe(true);
  });

  it('emits one bullet per category in input order', () => {
    const out = renderLlmsTxt(
      [cat('Beta', 'beta'), cat('Alpha', 'alpha')],
      SITE,
    );
    const lines = out.trimEnd().split('\n');
    expect(lines).toEqual([
      '## Datadog API Reference',
      '',
      '- [Beta](https://docs.datadoghq.com/api/latest/beta.md)',
      '- [Alpha](https://docs.datadoghq.com/api/latest/alpha.md)',
    ]);
  });

  it('emits the link in the prompt-specified format', () => {
    const out = renderLlmsTxt([cat('AWS Integration', 'aws-integration')], SITE);
    expect(out).toContain('- [AWS Integration](https://docs.datadoghq.com/api/latest/aws-integration.md)');
  });

  it('ends with a trailing newline', () => {
    const out = renderLlmsTxt([cat('A', 'a')], SITE);
    expect(out.endsWith('\n')).toBe(true);
  });

  it('emits just the heading (with trailing newline) when given no categories', () => {
    const out = renderLlmsTxt([], SITE);
    expect(out).toBe('## Datadog API Reference\n\n');
  });

  it('throws when siteUrl is empty', () => {
    expect(() => renderLlmsTxt([cat('A', 'a')], '')).toThrow(/siteUrl/);
  });
});
