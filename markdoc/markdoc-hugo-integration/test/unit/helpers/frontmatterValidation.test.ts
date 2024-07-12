import { describe, test, expect } from 'vitest';
import {
  validatePlaceholders,
  buildSnakeCaseCombinations
} from '../../../src/helpers/frontmatterValidation';
import { PrefOptionsConfig } from '../../../src/schemas/yaml/prefOptions';
import { Frontmatter } from '../../../src/schemas/yaml/frontMatter';

describe('validatePlaceholders', () => {
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
      { identifier: 'powder_blue', display_name: 'Powder Blue' }
    ],
    eggshell_blue_paint_options: [
      { identifier: 'elegant_royal', display_name: 'Elegant Royal' },
      { identifier: 'robins_egg', display_name: "Robin's Egg" }
    ],
    gloss_blue_paint_options: [
      { identifier: 'sky_blue', display_name: 'Sky Blue' },
      { identifier: 'navy', display_name: 'Navy' }
    ],
    matte_red_paint_options: [
      { identifier: 'brick', display_name: 'Brick' },
      { identifier: 'scarlet', display_name: 'Scarlet' }
    ],
    eggshell_red_paint_options: [
      { identifier: 'rose', display_name: 'Rose' },
      { identifier: 'ruby', display_name: 'Ruby' }
    ],
    gloss_red_paint_options: [
      { identifier: 'fire_engine', display_name: 'Fire Engine' },
      { identifier: 'crimson', display_name: 'Crimson' }
    ]
  };

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

  test('should not throw an error when all placeholders are valid', () => {
    expect(() => validatePlaceholders(frontmatter, prefOptions)).not.toThrow();
  });

  test('should throw an error when an invalid placeholder is used', () => {
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
    expect(() => validatePlaceholders(invalidFrontmatter, prefOptions)).toThrowError(
      `Placeholder <COLOUR> does not refer to a valid page preference identifier. Make sure that 'colour' is spelled correctly, and that the 'colour' parameter is defined in the page_preferences list before it is referenced in <COLOUR>.`
    );
  });

  test('should throw an error when an options set is missing', () => {
    const { gloss_red_paint_options, ...invalidPrefOptions } = prefOptions;
    expect(() => validatePlaceholders(frontmatter, invalidPrefOptions)).toThrowError(
      `Invalid options_source could be populated by the placeholders in <FINISH>_<COLOR>_paint_options: An options source with the ID 'gloss_red_paint_options' does not exist.`
    );
  });
});

describe('buildSnakeCaseCombinations', () => {
  test('should return all possible combinations', () => {
    const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
    expect(buildSnakeCaseCombinations(segments)).toEqual([
      'red_gloss_paint_options',
      'red_matte_paint_options',
      'blue_gloss_paint_options',
      'blue_matte_paint_options'
    ]);
  });
});
