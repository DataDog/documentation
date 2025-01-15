import { describe, test, expect } from 'vitest';
import { getDefaultValsByTraitId } from '../../src/utils/compilation/buildFiltersManifest';
import { Frontmatter, FrontmatterSchema } from '../../src';
import { paintColorsCustomizationConfig } from '../config/mocks/valid/paintColors/customizationConfig';

describe('getDefaultValsByTraitId', () => {
  const frontmatter: Frontmatter = {
    title: 'My Page',
    content_filters: [
      {
        label: 'Color',
        trait_id: 'color',
        option_group_id: 'color_options',
      },
      {
        label: 'Finish',
        trait_id: 'finish',
        option_group_id: 'finish_options',
      },
      {
        label: 'Paint color',
        trait_id: 'paint',
        option_group_id: '<FINISH>_<COLOR>_paint_options',
      },
    ],
  };
  FrontmatterSchema.parse(frontmatter);

  test('derives the default values for each filter', () => {
    const defaultValsByTraitId = getDefaultValsByTraitId({
      filterConfigs: frontmatter.content_filters!,
      customizationConfig: paintColorsCustomizationConfig,
    });
    expect(defaultValsByTraitId).toEqual({
      color: 'blue',
      finish: 'eggshell',
      paint: 'elegant_royal',
    });
  });
});
