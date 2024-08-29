import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import { Frontmatter } from '../../../src/schemas/yaml/frontMatter';

describe('YamlConfigParser.getPrefOptionsForPage', () => {
  test('processes valid frontmatter placeholders without errors', () => {
    expect(() =>
      YamlConfigParser.getPrefOptionsForPage(
        paintColorsFrontmatter,
        paintColorsPrefOptionsConfig
      )
    ).not.toThrow();
  });

  test('throws an error when an invalid frontmatter placeholder is used', () => {
    const invalidFrontmatter: Frontmatter = {
      title: 'My Page',
      page_preferences: [
        {
          display_name: 'Color',
          id: 'color',
          options_source: 'color_options'
        },
        {
          display_name: 'Finish',
          id: 'finish',
          options_source: 'finish_options'
        },
        // This placeholder below is invalid because 'color' is misspelled
        {
          display_name: 'Paint color',
          id: 'paint',
          options_source: '<FINISH>_<COLOUR>_paint_options'
        }
      ]
    };
    expect(() =>
      YamlConfigParser.getPrefOptionsForPage(
        invalidFrontmatter,
        paintColorsPrefOptionsConfig
      )
    ).toThrowError(
      `Placeholder <COLOUR> does not refer to a valid page preference ID. Make sure that 'colour' is spelled correctly, and that the 'colour' parameter is defined in the page_preferences list before it is referenced in <COLOUR>.`
    );
  });

  test('throws an error when a placeholder-derived options set does not exist', () => {
    const { gloss_red_paint_options, ...invalidPrefOptions } =
      paintColorsPrefOptionsConfig;
    expect(() =>
      YamlConfigParser.getPrefOptionsForPage(paintColorsFrontmatter, invalidPrefOptions)
    ).toThrowError(
      `Invalid options_source could be populated by the placeholders in <FINISH>_<COLOR>_paint_options: An options source with the ID 'gloss_red_paint_options' does not exist.`
    );
  });
});

describe('YamlConfigParser.buildSnakeCaseCombinations', () => {
  test('returns all possible options source names', () => {
    const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
    expect(YamlConfigParser.buildSnakeCaseCombinations(segments)).toEqual([
      'red_gloss_paint_options',
      'red_matte_paint_options',
      'blue_gloss_paint_options',
      'blue_matte_paint_options'
    ]);
  });
});
