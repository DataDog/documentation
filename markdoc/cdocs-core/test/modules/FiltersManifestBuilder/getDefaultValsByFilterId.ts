import { describe, test, expect } from 'vitest';
import { FiltersManifestBuilder } from '../../../src/modules/FiltersManifestBuilder';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/frontMatter';
import { paintColorsContentFiltersConfig } from '../../mocks/valid/paintColorsConfig';

describe('FiltersManifestBuilder.getDefaultValsByFilterId', () => {
  const frontmatter: Frontmatter = {
    title: 'My Page',
    content_filters: [
      {
        label: 'Color',
        id: 'color',
        option_group: 'color_options',
      },
      {
        label: 'Finish',
        id: 'finish',
        option_group: 'finish_options',
      },
      {
        label: 'Paint color',
        id: 'paint',
        option_group: '<FINISH>_<COLOR>_paint_options',
      },
    ],
  };
  FrontmatterSchema.parse(frontmatter);

  test('derives the default values for each filter', () => {
    const defaultValsByFilterId = FiltersManifestBuilder.getDefaultValsByFilterId({
      filterConfigs: frontmatter.content_filters!,
      contentFiltersConfig: paintColorsContentFiltersConfig,
    });
    expect(defaultValsByFilterId).toEqual({
      color: 'blue',
      finish: 'eggshell',
      paint: 'elegant_royal',
    });
  });
});
