import { describe, test, expect } from 'vitest';
import { shouldDisplayFilter } from '../../../src/api/shared/shouldDisplayFilter';
import { getExcludedTraitValues } from '../../../src/api/shared/shouldDisplayFilter';
import { FilterConfig } from '../../../src/schemas/frontmatter';

/** Helper to build a minimal FilterConfig for testing */
function makeFilterConfig(
  overrides: Partial<FilterConfig> = {},
): FilterConfig {
  return {
    label: 'Test Filter',
    trait_id: 'test',
    option_group_id: 'test_options',
    ...overrides,
  };
}

describe('shouldDisplayFilter', () => {
  test('returns true when there are no conditions', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig(),
      valsByTraitId: { prog_lang: 'java' },
    });
    expect(result).toBe(true);
  });

  test('show_if single trait, single condition — matches', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'] }],
      }),
      valsByTraitId: { prog_lang: 'java' },
    });
    expect(result).toBe(true);
  });

  test('show_if single trait, single condition — does not match', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'] }],
      }),
      valsByTraitId: { prog_lang: 'python' },
    });
    expect(result).toBe(false);
  });

  test('show_if with multiple conditions (OR logic) — second condition matches', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [
          { prog_lang: ['java'] },
          { prog_lang: ['python'] },
        ],
      }),
      valsByTraitId: { prog_lang: 'python' },
    });
    expect(result).toBe(true);
  });

  test('show_if with multiple conditions (OR logic) — none match', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [
          { prog_lang: ['java'] },
          { prog_lang: ['python'] },
        ],
      }),
      valsByTraitId: { prog_lang: 'ruby' },
    });
    expect(result).toBe(false);
  });

  test('show_if with multi-key condition (AND logic) — all keys match', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'], os: ['linux', 'mac_os'] }],
      }),
      valsByTraitId: { prog_lang: 'java', os: 'linux' },
    });
    expect(result).toBe(true);
  });

  test('show_if with multi-key condition (AND logic) — only one key matches', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'], os: ['linux', 'mac_os'] }],
      }),
      valsByTraitId: { prog_lang: 'java', os: 'windows' },
    });
    expect(result).toBe(false);
  });

  test('hide_if single trait — matches (should hide)', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [{ prog_lang: ['python', 'ruby'] }],
      }),
      valsByTraitId: { prog_lang: 'python' },
    });
    expect(result).toBe(false);
  });

  test('hide_if single trait — does not match (should show)', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [{ prog_lang: ['python', 'ruby'] }],
      }),
      valsByTraitId: { prog_lang: 'java' },
    });
    expect(result).toBe(true);
  });

  test('hide_if with multiple conditions (OR logic) — one matches', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [
          { prog_lang: ['python'] },
          { prog_lang: ['ruby'] },
        ],
      }),
      valsByTraitId: { prog_lang: 'ruby' },
    });
    expect(result).toBe(false);
  });

  test('hide_if with multi-key condition (AND logic) — all keys match (should hide)', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [{ os: ['windows'], prog_lang: ['python', 'ruby'] }],
      }),
      valsByTraitId: { os: 'windows', prog_lang: 'python' },
    });
    expect(result).toBe(false);
  });

  test('hide_if with multi-key condition (AND logic) — only one key matches (should show)', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [{ os: ['windows'], prog_lang: ['python', 'ruby'] }],
      }),
      valsByTraitId: { os: 'windows', prog_lang: 'java' },
    });
    expect(result).toBe(true);
  });

  test('show_if referencing a trait not in valsByTraitId returns false', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        show_if: [{ nonexistent: ['java'] }],
      }),
      valsByTraitId: { prog_lang: 'java' },
    });
    expect(result).toBe(false);
  });

  test('hide_if referencing a trait not in valsByTraitId returns true', () => {
    const result = shouldDisplayFilter({
      filterConfig: makeFilterConfig({
        hide_if: [{ nonexistent: ['java'] }],
      }),
      valsByTraitId: { prog_lang: 'java' },
    });
    expect(result).toBe(true);
  });
});

describe('getExcludedTraitValues', () => {
  const parentOptionIds = ['java', 'python', 'ruby'];

  test('returns empty array when there are no conditions', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig(),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual([]);
  });

  test('show_if single-trait condition — excludes values not in allowed list', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual(['python', 'ruby']);
  });

  test('show_if single-trait condition with multiple allowed values', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java', 'python'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual(['ruby']);
  });

  test('hide_if single-trait condition — excludes values in blocked list', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        hide_if: [{ prog_lang: ['ruby'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual(['ruby']);
  });

  test('hide_if single-trait condition with multiple blocked values', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        hide_if: [{ prog_lang: ['python', 'ruby'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual(['python', 'ruby']);
  });

  test('show_if multi-trait condition — excludes values for mentioned trait', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        show_if: [{ prog_lang: ['java'], os: ['linux'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    // Every condition mentions prog_lang, and only 'java' is allowed
    expect(result).toEqual(['python', 'ruby']);
  });

  test('show_if multi-trait condition — does not exclude for unmentioned trait in another condition', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        show_if: [
          { prog_lang: ['java'], os: ['linux'] },
          { os: ['mac_os'] }, // This condition doesn't mention prog_lang
        ],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    // Second condition doesn't mention prog_lang, so any prog_lang
    // value could match when os is mac_os. No exclusions possible.
    expect(result).toEqual([]);
  });

  test('show_if with multiple single-trait conditions (OR) — union of allowed values', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        show_if: [
          { prog_lang: ['java'] },
          { prog_lang: ['python'] },
        ],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    expect(result).toEqual(['ruby']);
  });

  test('hide_if multi-trait condition — does not exclude (conservative)', () => {
    const result = getExcludedTraitValues({
      filterConfig: makeFilterConfig({
        hide_if: [{ prog_lang: ['ruby'], os: ['windows'] }],
      }),
      parentTraitId: 'prog_lang',
      parentOptionIds,
    });
    // Multi-trait hide_if: ruby is only hidden when os is also windows,
    // so we can't exclude ruby for all cases.
    expect(result).toEqual([]);
  });
});
