import { describe, test, expect } from 'vitest';
import { getDefaultValsByTraitId } from '../../src/utils/compilation/buildFiltersManifest';
import { FrontMatter, FrontMatterSchema } from '../../src';
import { paintColorsCustomizationConfig } from '../config/mocks/valid/paintColorsConfig';

describe('getDefaultValsByTraitId', () => {
  const frontmatter: FrontMatter = {
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
  FrontMatterSchema.parse(frontmatter);

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
