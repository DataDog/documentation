import { describe, test, expect } from 'vitest';
import { FiltersManifestBuilder } from '../../../src/modules/FiltersManifestBuilder';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/frontMatter';
import { paintColorsContentFiltersConfig } from '../../mocks/valid/paintColorsConfig';

describe('FiltersManifestBuilder.getDefaultValsByFilterId', () => {
  const frontmatter: Frontmatter = {
    title: 'My Page',
    customizations: [
      {
        label: 'Color',
        filter_id: 'color',
        option_group_id: 'color_options',
      },
      {
        label: 'Finish',
        filter_id: 'finish',
        option_group_id: 'finish_options',
      },
      {
        label: 'Paint color',
        filter_id: 'paint',
        option_group_id: '<FINISH>_<COLOR>_paint_options',
      },
    ],
  };
  FrontmatterSchema.parse(frontmatter);

  test('derives the default values for each filter', () => {
    const defaultValsByFilterId = FiltersManifestBuilder.getDefaultValsByFilterId({
      customizations: frontmatter.customizations!,
      contentFiltersConfig: paintColorsContentFiltersConfig,
    });
    expect(defaultValsByFilterId).toEqual({
      color: 'blue',
      finish: 'eggshell',
      paint: 'elegant_royal',
    });
  });
});
