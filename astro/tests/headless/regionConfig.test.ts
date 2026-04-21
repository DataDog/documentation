import { describe, it, expect } from 'vitest';
import {
  getAllowedRegions,
  datacenterLabel,
  siteDomain,
  appHost,
  isAllowedRegionKey,
  DEFAULT_REGION_KEY,
} from '../../src/data/api/regionConfig';

describe('regionConfig', () => {
  it('reads allowedRegions from the Hugo params.yaml snapshot', () => {
    const regions = getAllowedRegions();
    const keys = regions.map((r) => r.key);
    expect(keys).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'gov']);
  });

  it('uses Hugo-compatible region keys (lowercase short form)', () => {
    const us = getAllowedRegions().find((r) => r.key === 'us');
    expect(us).toBeTruthy();
    expect(us!.label).toBe('US1');
    expect(us!.domain).toBe('datadoghq.com');
  });

  it('maps region key → datacenter label', () => {
    expect(datacenterLabel('us')).toBe('US1');
    expect(datacenterLabel('gov')).toBe('US1-FED');
  });

  it('maps region key → API site domain', () => {
    expect(siteDomain('us')).toBe('datadoghq.com');
    expect(siteDomain('eu')).toBe('datadoghq.eu');
    expect(siteDomain('gov')).toBe('ddog-gov.com');
  });

  it('maps region key → app host (for referrer detection)', () => {
    expect(appHost('us')).toBe('app.datadoghq.com');
    expect(appHost('eu')).toBe('app.datadoghq.eu');
    expect(appHost('gov')).toBe('app.ddog-gov.com');
  });

  it('validates region keys', () => {
    expect(isAllowedRegionKey('us')).toBe(true);
    expect(isAllowedRegionKey('eu')).toBe(true);
    expect(isAllowedRegionKey('us1')).toBe(false); // Hugo uses 'us' not 'us1'
    expect(isAllowedRegionKey('')).toBe(false);
    expect(isAllowedRegionKey(null)).toBe(false);
  });

  it('defaults to us (matches Hugo)', () => {
    expect(DEFAULT_REGION_KEY).toBe('us');
  });
});
