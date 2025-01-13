import { describe, test, expect } from 'vitest';
import { FiltersManifestBuilder } from '../../../src/modules/FiltersManifestBuilder';
import {
  FilterOptionsConfig,
  FilterOptionsConfigSchema,
} from '../../../src/schemas/filterOptions';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/frontMatter';
import { paintColorsContentFiltersConfig } from '../../mocks/valid/paintColorsConfig';

describe('FiltersManifestBuilder.getDefaultValsByFilterId', () => {
  const frontmatter: Frontmatter = {
    title: 'My Page',
    content_filters: [
      {
        display_name: 'Color',
        id: 'color',
        options_source: 'color_options',
      },
      {
        display_name: 'Finish',
        id: 'finish',
        options_source: 'finish_options',
      },
      {
        display_name: 'Paint color',
        id: 'paint',
        options_source: '<FINISH>_<COLOR>_paint_options',
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
