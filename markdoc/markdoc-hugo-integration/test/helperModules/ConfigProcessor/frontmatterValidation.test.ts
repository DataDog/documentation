import { describe, test, expect } from 'vitest';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';
import {
  PrefOptionsConfig,
  PrefOptionsConfigSchema
} from '../../../src/schemas/yaml/prefOptions';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/yaml/frontMatter';

describe('ConfigProcessor.validatePlaceholders', () => {
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

  test('processes valid frontmatter placeholders without errors', () => {
    expect(() =>
      ConfigProcessor.validatePlaceholders(frontmatter, prefOptions)
    ).not.toThrow();
  });

  test('throws an error when an invalid frontmatter placeholder is used', () => {
    const invalidFrontmatter: Frontmatter = {
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
        // This placeholder below is invalid because 'color' is misspelled
        {
          display_name: 'Paint color',
          identifier: 'paint',
          options_source: '<FINISH>_<COLOUR>_paint_options'
        }
      ]
    };
    expect(() =>
      ConfigProcessor.validatePlaceholders(invalidFrontmatter, prefOptions)
    ).toThrowError(
      `Placeholder <COLOUR> does not refer to a valid page preference identifier. Make sure that 'colour' is spelled correctly, and that the 'colour' parameter is defined in the page_preferences list before it is referenced in <COLOUR>.`
    );
  });

  test('throws an error when a placeholder-derived options set does not exist', () => {
    const { gloss_red_paint_options, ...invalidPrefOptions } = prefOptions;
    expect(() =>
      ConfigProcessor.validatePlaceholders(frontmatter, invalidPrefOptions)
    ).toThrowError(
      `Invalid options_source could be populated by the placeholders in <FINISH>_<COLOR>_paint_options: An options source with the ID 'gloss_red_paint_options' does not exist.`
    );
  });
});

describe('ConfigProcessor.buildSnakeCaseCombinations', () => {
  test('returns all possible options source names', () => {
    const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
    expect(ConfigProcessor.buildSnakeCaseCombinations(segments)).toEqual([
      'red_gloss_paint_options',
      'red_matte_paint_options',
      'blue_gloss_paint_options',
      'blue_matte_paint_options'
    ]);
  });
});
