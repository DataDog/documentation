import { describe, it, expect } from 'vitest';
import { getDefaultRegions, getRegions, buildApiUrl, buildApiUrlFromServers } from '@lib/api/regionResolver';

describe('getDefaultRegions', () => {
  it('returns all known Datadog regions using Hugo-compatible keys', () => {
    const regions = getDefaultRegions();
    const keys = regions.map((r) => r.key);

    expect(keys).toContain('us');
    expect(keys).toContain('eu');
    expect(keys).toContain('gov');
    expect(keys).toContain('gov2');
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

  it('orders regions by Hugo weight (US1, US3, US5, EU, AP1, AP2, UK1, US1-FED, US2-FED)', () => {
    const regions = getDefaultRegions();
    expect(regions.map((r) => r.key)).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'uk1', 'gov', 'gov2']);
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
      servers: [
        {
          url: 'https://{subdomain}.{site}',
          variables: { site: { default: 'datadoghq.com', enum: ['datadoghq.com', 'datadoghq.eu'] } },
        },
      ],
    };
    const operation = {
      servers: [
        {
          url: 'https://{subdomain}.{site}',
          variables: { site: { default: 'datadoghq.com', enum: ['datadoghq.com'] } },
        },
      ],
    };
    const regions = getRegions(spec, operation);
    expect(regions.map((r) => r.key)).toEqual(['us']);
  });

  it('returns all allowed regions when no server enum is defined', () => {
    const regions = getRegions({});
    expect(regions.length).toBeGreaterThan(1);
  });

  // Pass 2 — the enum lists fully-qualified per-region hosts rather than bare
  // site domains. Five live operations do this. Before the fallback existed,
  // the intersection was empty and these rendered no regions at all.
  describe('fully-qualified host enums (exact_domains fallback)', () => {
    const oncallServers = [
      {
        url: 'https://{site}',
        variables: {
          site: {
            default: 'navy.oncall.datadoghq.com',
            enum: [
              'lava.oncall.datadoghq.com',
              'saffron.oncall.datadoghq.com',
              'navy.oncall.datadoghq.com',
              'coral.oncall.datadoghq.com',
              'teal.oncall.datadoghq.com',
              'beige.oncall.datadoghq.eu',
              'scarlet.oncall.datadoghq.com',
            ],
          },
        },
      },
    ];

    it('resolves on-call hosts to every region, in weight order', () => {
      const regions = getRegions({}, { servers: oncallServers });
      expect(regions.map((r) => r.key)).toEqual([
        'us',
        'us3',
        'us5',
        'eu',
        'ap1',
        'ap2',
        'uk1',
        'gov',
        'gov2',
      ]);
    });

    it('keeps every region sharing one host', () => {
      // us, gov and gov2 all list navy.oncall.datadoghq.com. Matching by
      // building a host-to-region map would keep only the last of the three.
      const regions = getRegions({}, {
        servers: [
          {
            url: 'https://{site}',
            variables: {
              site: {
                default: 'navy.oncall.datadoghq.com',
                enum: ['navy.oncall.datadoghq.com'],
              },
            },
          },
        ],
      });
      expect(regions.map((r) => r.key)).toEqual(['us', 'gov', 'gov2']);
    });

    it('resolves browser-intake hosts, omitting regions with none', () => {
      const regions = getRegions({}, {
        servers: [
          {
            url: 'https://{site}',
            variables: {
              site: {
                default: 'browser-intake-datadoghq.com',
                enum: [
                  'browser-intake-datadoghq.com',
                  'browser-intake-us3-datadoghq.com',
                  'browser-intake-us5-datadoghq.com',
                  'browser-intake-ap1-datadoghq.com',
                  'browser-intake-ap2-datadoghq.com',
                  'browser-intake-datadoghq.eu',
                ],
              },
            },
          },
        ],
      });
      // uk1 has a browser-intake host defined but the spec enum omits it;
      // gov and gov2 have none at all.
      expect(regions.map((r) => r.key)).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2']);
    });

    it('does not run the fallback when a bare domain already matched', () => {
      // A mixed enum must resolve by domain only. Falling through would add
      // regions the Hugo site does not show for the operation.
      const regions = getRegions({}, {
        servers: [
          {
            url: 'https://{subdomain}.{site}',
            variables: {
              site: {
                default: 'datadoghq.com',
                enum: ['datadoghq.com', 'navy.oncall.datadoghq.com'],
              },
              subdomain: { default: 'api' },
            },
          },
        ],
      });
      expect(regions.map((r) => r.key)).toEqual(['us']);
    });

    it('returns no regions for an enum matching neither pass', () => {
      const regions = getRegions({}, {
        servers: [
          {
            url: 'https://{site}',
            variables: {
              site: { default: 'nope.example', enum: ['nope.example'] },
            },
          },
        ],
      });
      expect(regions).toEqual([]);
    });

    it('builds the endpoint URL from the fully-qualified host', () => {
      // These templates carry no {subdomain}, so the host is used verbatim.
      expect(
        buildApiUrlFromServers(
          oncallServers,
          'beige.oncall.datadoghq.eu',
          '/api/v2/on-call/pages',
        ),
      ).toBe('https://beige.oncall.datadoghq.eu/api/v2/on-call/pages');
    });
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
