import { describe, test, expect } from 'vitest';
import { FiltersManifestBuilder } from '../../../src/FiltersManifestBuilder';

describe('FiltersManifestBuilder.buildSnakeCaseCombinations', () => {
  test('returns all possible options source names', () => {
    const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
    expect(FiltersManifestBuilder.buildSnakeCaseCombinations(segments)).toEqual([
      'red_gloss_paint_options',
      'red_matte_paint_options',
      'blue_gloss_paint_options',
      'blue_matte_paint_options'
    ]);
  });
});
