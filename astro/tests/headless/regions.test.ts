import { describe, it, expect } from 'vitest';
import { getDefaultRegions, buildApiUrl } from '../../src/data/api/regions';

describe('getDefaultRegions', () => {
  it('returns all known Datadog regions', () => {
    const regions = getDefaultRegions();
    const keys = regions.map((r) => r.key);

    expect(keys).toContain('us1');
    expect(keys).toContain('eu');
    expect(keys).toContain('gov');
    expect(keys).toContain('us3');
    expect(keys).toContain('us5');
    expect(keys).toContain('ap1');
    expect(keys).toContain('ap2');
  });

  it('includes site domains for each region', () => {
    const regions = getDefaultRegions();
    const us1 = regions.find((r) => r.key === 'us1')!;
    expect(us1.site).toBe('datadoghq.com');
    expect(us1.label).toBe('US1');

    const eu = regions.find((r) => r.key === 'eu')!;
    expect(eu.site).toBe('datadoghq.eu');
  });
});

describe('buildApiUrl', () => {
  it('constructs a URL with default subdomain', () => {
    expect(buildApiUrl('datadoghq.com', '/api/v1/dashboard')).toBe(
      'https://api.datadoghq.com/api/v1/dashboard'
    );
  });

  it('constructs a URL with custom subdomain', () => {
    expect(buildApiUrl('datadoghq.eu', '/api/v2/logs', 'logs')).toBe(
      'https://logs.datadoghq.eu/api/v2/logs'
    );
  });
});
