import { describe, test, expect } from 'vitest';
import { ConfigProcessor } from '../../../src/ConfigProcessor';
import {
  PrefOptionsConfig,
  PrefOptionsConfigSchema
} from '../../../src/schemas/yaml/prefOptions';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/yaml/frontMatter';

describe('getDefaultValuesByPrefId', () => {
  const prefOptions: PrefOptionsConfig = {
    color_options: [
      { identifier: 'blue', display_name: 'Blue', default: true },
      { identifier: 'red', display_name: 'Red' }
    ],
    finish_options: [
      { identifier: 'matte', display_name: 'Matte' },
      { identifier: 'eggshell', display_name: 'Eggshell', default: true },
      { identifier: 'gloss', display_name: 'Gloss' }
    ],
    matte_blue_paint_options: [
      { identifier: 'powder_blue', display_name: 'Powder Blue', default: true }
    ],
    eggshell_blue_paint_options: [
      { identifier: 'elegant_royal', display_name: 'Elegant Royal', default: true },
      { identifier: 'robins_egg', display_name: "Robin's Egg" }
    ],
    gloss_blue_paint_options: [
      { identifier: 'sky_blue', display_name: 'Sky Blue', default: true },
      { identifier: 'navy', display_name: 'Navy' }
    ],
    matte_red_paint_options: [
      { identifier: 'brick', display_name: 'Brick', default: true },
      { identifier: 'scarlet', display_name: 'Scarlet' }
    ],
    eggshell_red_paint_options: [
      { identifier: 'rose', display_name: 'Rose', default: true },
      { identifier: 'ruby', display_name: 'Ruby' }
    ],
    gloss_red_paint_options: [
      { identifier: 'fire_engine', display_name: 'Fire Engine', default: true },
      { identifier: 'crimson', display_name: 'Crimson' }
    ]
  };
  PrefOptionsConfigSchema.parse(prefOptions);

  const frontmatter: Frontmatter = {
    title: 'My Page',
    page_preferences: [
      {
        display_name: 'Color',
        identifier: 'color',
        options_source: 'color_options'
      },
      {
        display_name: 'Finish',
        identifier: 'finish',
        options_source: 'finish_options'
      },
      {
        display_name: 'Paint color',
        identifier: 'paint',
        options_source: '<FINISH>_<COLOR>_paint_options'
      }
    ]
  };
  FrontmatterSchema.parse(frontmatter);

  test('correctly derives the default values for each preference', () => {
    const defaultValuesByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      frontmatter,
      prefOptions
    );
    expect(defaultValuesByPrefId).toEqual({
      color: 'blue',
      finish: 'eggshell',
      paint: 'elegant_royal'
    });
  });
});
