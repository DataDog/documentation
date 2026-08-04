import { describe, it, expect } from 'vitest';
import { isSitemapPage } from './sitemapFilter';

describe('isSitemapPage', () => {
  it('keeps API docs pages', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/api/latest/metrics/')).toBe(true);
    expect(isSitemapPage('https://docs.datadoghq.com/fr/api/latest/metrics/submit-metrics/')).toBe(true);
    expect(isSitemapPage('https://docs.datadoghq.com/api/latest/using-the-api/')).toBe(true);
  });

  it('excludes dd_e2e scaffolding under /docs/', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/docs/dd_e2e/components/alert/')).toBe(false);
  });

  it('excludes the root redirect stub', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/')).toBe(false);
  });
});
