import { describe, it, expect } from 'vitest';
import {
  getAllowedRegions,
  datacenterLabel,
  siteDomain,
  appHost,
  isAllowedRegionKey,
  DEFAULT_REGION_KEY,
} from '@config/regions';

/**
 * One assertion in this file names the data centers: the membership check
 * below. Everything else is structural, so adding a region to
 * `shared/regions.yaml` fails exactly one test, and its message says what to
 * update.
 *
 * That list is deliberately not derived from the YAML. Comparing the source
 * against itself asserts nothing, and a region silently dropped from the file
 * would pass. `regions.equivalence.test.ts` checks the file's contents against
 * the live Hugo sources; this checks that Astro reads all of them.
 */
describe('config/regions', () => {
  it('reads the region list from shared/regions.yaml', () => {
    const keys = getAllowedRegions().map((r) => r.key);
    // Update this list when a data center is added to shared/regions.yaml.
    expect(keys).toEqual(['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'uk1', 'gov', 'gov2']);
  });

  it('sorts regions by weight, ascending', () => {
    const weights = getAllowedRegions().map((r) => r.weight);
    expect(weights).toEqual([...weights].sort((a, b) => a - b));
  });

  it('uses Hugo-compatible region keys (lowercase short form)', () => {
    for (const region of getAllowedRegions()) {
      expect(region.key, `key ${region.key}`).toMatch(/^[a-z][a-z0-9]*$/);
      expect(region.label.length, `label on ${region.key}`).toBeGreaterThan(0);
      expect(region.domain, `domain on ${region.key}`).toMatch(/^[a-z0-9.-]+\.[a-z]+$/);
    }
    expect(isAllowedRegionKey('us1')).toBe(false); // Hugo uses 'us', not 'us1'
  });

  it('maps every region key → datacenter label', () => {
    for (const region of getAllowedRegions()) {
      expect(datacenterLabel(region.key), `dd_datacenter for ${region.key}`).toBe(region.label);
    }
  });

  it('maps every region key → API site domain', () => {
    for (const region of getAllowedRegions()) {
      expect(siteDomain(region.key), `dd_site for ${region.key}`).toBe(region.domain);
    }
  });

  it('maps every region key → an app host under its own domain', () => {
    for (const region of getAllowedRegions()) {
      const host = appHost(region.key);
      expect(host, `dd_full_site for ${region.key}`).toBeTruthy();
      expect(host!.endsWith(region.domain), `${host} should sit under ${region.domain}`).toBe(true);
    }
  });

  it('validates region keys', () => {
    for (const region of getAllowedRegions()) {
      expect(isAllowedRegionKey(region.key), `${region.key} should be allowed`).toBe(true);
    }
    expect(isAllowedRegionKey('nope')).toBe(false);
    expect(isAllowedRegionKey('')).toBe(false);
    expect(isAllowedRegionKey(null)).toBe(false);
    expect(isAllowedRegionKey(undefined)).toBe(false);
  });

  it('defaults to a region that exists', () => {
    expect(DEFAULT_REGION_KEY).toBe('us'); // matches Hugo
    expect(isAllowedRegionKey(DEFAULT_REGION_KEY)).toBe(true);
  });
});
