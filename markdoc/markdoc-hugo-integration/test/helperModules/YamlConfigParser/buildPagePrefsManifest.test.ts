import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';
import { error } from 'console';

describe('YamlConfigParser.buildPagePrefsManifest', () => {
  test('creates the expected object when given valid data', () => {
    const manifest = YamlConfigParser.buildPagePrefsManifest({
      frontmatter: paintColorsFrontmatter,
      prefOptionsConfig: paintColorsPrefOptionsConfig
    });

    const expectedManifest = {
      prefsById: {
        color: {
          config: { display_name: 'Color', id: 'color', options_source: 'color_options' },
          defaultValuesByOptionsSetId: { color_options: 'blue' }
        },
        finish: {
          config: {
            display_name: 'Finish',
            id: 'finish',
            options_source: 'finish_options'
          },
          defaultValuesByOptionsSetId: { finish_options: 'eggshell' }
        },
        paint: {
          config: {
            display_name: 'Paint color',
            id: 'paint',
            options_source: '<FINISH>_<COLOR>_paint_options'
          },
          defaultValuesByOptionsSetId: {
            matte_blue_paint_options: 'powder_blue',
            matte_red_paint_options: 'brick',
            eggshell_blue_paint_options: 'elegant_royal',
            eggshell_red_paint_options: 'rose',
            gloss_blue_paint_options: 'sky_blue',
            gloss_red_paint_options: 'fire_engine'
          }
        }
      },
      optionSetsById: {
        color_options: [
          { id: 'blue', display_name: 'Blue', default: true },
          { id: 'red', display_name: 'Red' }
        ],
        finish_options: [
          { id: 'matte', display_name: 'Matte' },
          { id: 'eggshell', display_name: 'Eggshell', default: true },
          { id: 'gloss', display_name: 'Gloss' }
        ],
        matte_blue_paint_options: [
          { id: 'powder_blue', display_name: 'Powder Blue', default: true }
        ],
        matte_red_paint_options: [
          { id: 'brick', display_name: 'Brick', default: true },
          { id: 'scarlet', display_name: 'Scarlet' }
        ],
        eggshell_blue_paint_options: [
          { id: 'elegant_royal', display_name: 'Elegant Royal', default: true },
          { id: 'robins_egg', display_name: "Robin's Egg" }
        ],
        eggshell_red_paint_options: [
          { id: 'rose', display_name: 'Rose', default: true },
          { id: 'ruby', display_name: 'Ruby' }
        ],
        gloss_blue_paint_options: [
          { id: 'sky_blue', display_name: 'Sky Blue', default: true },
          { id: 'navy', display_name: 'Navy' }
        ],
        gloss_red_paint_options: [
          { id: 'fire_engine', display_name: 'Fire Engine', default: true },
          { id: 'crimson', display_name: 'Crimson' }
        ]
      },
      errors: []
    };

    expect(_.isEqual(manifest, expectedManifest)).toBe(true);
  });

  test('detects an invalid placeholder', () => {
    const invalidFrontmatter = {
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
        {
          display_name: 'Paint color',
          id: 'paint',
          // invalid placeholder 'COLOUR'
          options_source: '<FINISH>_<COLOUR>_paint_options'
        }
      ]
    };

    const manifest = YamlConfigParser.buildPagePrefsManifest({
      frontmatter: invalidFrontmatter,
      prefOptionsConfig: paintColorsPrefOptionsConfig
    });

    console.log(manifest.errors);

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0]).toContain('Invalid placeholder');
  });
});
