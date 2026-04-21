import { describe, it, expect } from 'vitest';
import { getDefaultRegions, getRegions, buildApiUrl, buildApiUrlFromServers } from '../../src/data/api/regions';

describe('getDefaultRegions', () => {
  it('returns all known Datadog regions using Hugo-compatible keys', () => {
    const regions = getDefaultRegions();
    const keys = regions.map((r) => r.key);

    expect(keys).toContain('us');
    expect(keys).toContain('eu');
    expect(keys).toContain('gov');
    expect(keys).toContain('us3');
    expect(keys).toContain('us5');
    expect(keys).toContain('ap1');
    expect(keys).toContain('ap2');
  });

  it('includes site domains for each region', () => {
    const regions = getDefaultRegions();
    const us = regions.find((r) => r.key === 'us')!;
    expect(us.site).toBe('datadoghq.com');
    expect(us.label).toBe('US1');

    const eu = regions.find((r) => r.key === 'eu')!;
    expect(eu.site).toBe('datadoghq.eu');
  });

  it('orders regions by Hugo weight (US1, US3, US5, EU, AP1, AP2, US1-FED)', () => {
    const regions = getDefaultRegions();
    expect(regions.map((r) => r.key)).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'gov']);
  });
});

describe('getRegions', () => {
  it('filters by the spec server enum', () => {
    const spec = {
      servers: [
        {
          url: 'https://{subdomain}.{site}',
          variables: {
            site: { default: 'datadoghq.com', enum: ['datadoghq.com', 'datadoghq.eu'] },
            subdomain: { default: 'api' },
          },
        },
      ],
    };
    const regions = getRegions(spec);
    expect(regions.map((r) => r.key)).toEqual(['us', 'eu']);
  });

  it('prefers per-operation servers when present', () => {
    const spec = {
      servers: [{ variables: { site: { default: 'datadoghq.com', enum: ['datadoghq.com', 'datadoghq.eu'] } } }],
    };
    const operation = {
      servers: [{ variables: { site: { default: 'datadoghq.com', enum: ['datadoghq.com'] } } }],
    };
    const regions = getRegions(spec, operation);
    expect(regions.map((r) => r.key)).toEqual(['us']);
  });

  it('returns all allowed regions when no server enum is defined', () => {
    const regions = getRegions({});
    expect(regions.length).toBeGreaterThan(1);
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

describe('buildApiUrlFromServers', () => {
  it('resolves {subdomain} and {site} from a server template', () => {
    const servers = [
      {
        url: 'https://{subdomain}.{site}',
        variables: { subdomain: { default: 'api' }, site: { default: 'datadoghq.com' } },
      },
    ];
    expect(buildApiUrlFromServers(servers, 'datadoghq.eu', '/api/v1/users')).toBe(
      'https://api.datadoghq.eu/api/v1/users'
    );
  });

  it('falls back to api.<site><path> when servers are missing', () => {
    expect(buildApiUrlFromServers(undefined, 'datadoghq.com', '/api/v1/foo')).toBe(
      'https://api.datadoghq.com/api/v1/foo'
    );
  });
});
