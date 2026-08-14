import { describe, it, expect } from 'vitest';
import { readPrefs, writePrefs, MAX_TRAITS } from './cookiePrefs';

describe('cookiePrefs', () => {
  it('reads an empty object from an undefined or malformed cookie', () => {
    expect(readPrefs(undefined)).toEqual({});
    expect(readPrefs('not json')).toEqual({});
  });

  it('round-trips trait values through write then read', () => {
    const raw = writePrefs(undefined, { prog_lang: 'python', api_type: 'dd_api' }, 1000);
    expect(readPrefs(raw)).toEqual({ prog_lang: 'python', api_type: 'dd_api' });
  });

  it('upserts without disturbing untouched traits', () => {
    const first = writePrefs(undefined, { prog_lang: 'java', os: 'linux' }, 1000);
    const second = writePrefs(first, { prog_lang: 'python' }, 2000);
    expect(readPrefs(second)).toEqual({ prog_lang: 'python', os: 'linux' });
  });

  it('evicts the oldest-set trait once the cap is exceeded', () => {
    let raw: string | undefined;
    // Insert MAX_TRAITS traits with increasing timestamps.
    for (let i = 0; i < MAX_TRAITS; i++) {
      raw = writePrefs(raw, { [`trait_${i}`]: `v${i}` }, i + 1);
    }
    const prefsAtCap = readPrefs(raw);
    expect(Object.keys(prefsAtCap)).toHaveLength(MAX_TRAITS);

    // One more (newest) trait should push out trait_0 (the oldest).
    raw = writePrefs(raw, { trait_new: 'new' }, 10_000);
    const prefs = readPrefs(raw);
    expect(Object.keys(prefs)).toHaveLength(MAX_TRAITS);
    expect(prefs).not.toHaveProperty('trait_0');
    expect(prefs).toHaveProperty('trait_new', 'new');
    expect(prefs).toHaveProperty('trait_1', 'v1');
  });

  it('refreshes an existing trait timestamp so it is not evicted as stale', () => {
    let raw: string | undefined;
    for (let i = 0; i < MAX_TRAITS; i++) {
      raw = writePrefs(raw, { [`trait_${i}`]: `v${i}` }, i + 1);
    }
    // Re-set the oldest trait with a fresh timestamp, then overflow by one.
    raw = writePrefs(raw, { trait_0: 'refreshed' }, 9_000);
    raw = writePrefs(raw, { trait_new: 'new' }, 10_000);
    const prefs = readPrefs(raw);
    // trait_0 was refreshed, so trait_1 is now the oldest and gets evicted.
    expect(prefs).toHaveProperty('trait_0', 'refreshed');
    expect(prefs).not.toHaveProperty('trait_1');
  });
});
