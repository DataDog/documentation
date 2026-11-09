import { describe, test, expect } from 'vitest';
import { buildSnakeCaseCombinations } from '../../src/api/compilation/buildFiltersManifest';

describe('FiltersManifestBuilder.buildSnakeCaseCombinations', () => {
  test('returns all possible options source names', () => {
    const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
    expect(buildSnakeCaseCombinations(segments)).toEqual([
      'red_gloss_paint_options',
      'red_matte_paint_options',
      'blue_gloss_paint_options',
      'blue_matte_paint_options',
    ]);
  });
});
