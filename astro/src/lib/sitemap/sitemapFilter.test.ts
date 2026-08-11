import { describe, it, expect } from 'vitest';
import { isSitemapPage } from './sitemapFilter';

describe('isSitemapPage', () => {
  it('keeps API docs pages', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/api/latest/metrics/')).toBe(true);
    expect(isSitemapPage('https://docs.datadoghq.com/fr/api/latest/metrics/submit-metrics/')).toBe(true);
    expect(isSitemapPage('https://docs.datadoghq.com/api/latest/using-the-api/')).toBe(true);
  });

  it('excludes dd_e2e scaffolding', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/dd_e2e/components/alert/')).toBe(false);
  });

  it('excludes the root redirect stub', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/')).toBe(false);
  });

  it('excludes the build-time metadata sidecars', () => {
    expect(isSitemapPage('https://docs.datadoghq.com/pages-index.json')).toBe(false);
    expect(isSitemapPage('https://docs.datadoghq.com/llms-index.json')).toBe(false);
  });
});
