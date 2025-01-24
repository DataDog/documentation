import { describe, test, expect } from 'vitest';
import { getDefaultValsByTraitId } from '../../src/api/compilation/buildFiltersManifest';
import { paintColorsCustomizationConfig } from '../config/mocks/valid/paintColorsData/customizationConfig';
import { paintColorsFrontmatter } from '../config/mocks/valid/paintColorsData/frontmatter';

describe('getDefaultValsByTraitId', () => {
  test('derives the default values for each filter', () => {
    const defaultValsByTraitId = getDefaultValsByTraitId({
      filterConfigs: paintColorsFrontmatter.content_filters!,
      customizationConfig: paintColorsCustomizationConfig,
    });

    expect(defaultValsByTraitId).toEqual({
      color: 'blue',
      finish: 'eggshell',
      paint: 'elegant_royal_e',
    });
  });
});
