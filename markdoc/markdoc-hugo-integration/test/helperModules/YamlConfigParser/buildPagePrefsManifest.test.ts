import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig,
  paintColorsAllowlist
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';
import { SNAPSHOTS_DIR } from '../../config/constants';

describe('YamlConfigParser.buildPagePrefsManifest', () => {
  test('creates the expected object when given valid data', () => {
    const manifest = YamlConfigParser.buildPagePrefsManifest({
      frontmatter: paintColorsFrontmatter,
      prefOptionsConfig: paintColorsPrefOptionsConfig,
      allowlist: paintColorsAllowlist
    });

    const expectedManifest = {
      prefsById: {
        color: {
          config: {
            display_name: 'Color',
            id: 'color',
            options_source: 'color_options'
          },
          defaultValuesByOptionsSetId: {
            color_options: 'blue'
          },
          possibleValues: ['blue', 'red']
        },
        finish: {
          config: {
            display_name: 'Finish',
            id: 'finish',
            options_source: 'finish_options'
          },
          defaultValuesByOptionsSetId: {
            finish_options: 'eggshell'
          },
          possibleValues: ['matte', 'eggshell', 'gloss']
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
          },
          possibleValues: [
            'powder_blue',
            'brick',
            'scarlet',
            'elegant_royal',
            'robins_egg',
            'rose',
            'ruby',
            'sky_blue',
            'navy',
            'fire_engine',
            'crimson'
          ]
        }
      },
      optionSetsById: {
        color_options: [
          {
            id: 'blue',
            display_name: 'Blue',
            default: true
          },
          {
            id: 'red',
            display_name: 'Red'
          }
        ],
        finish_options: [
          {
            id: 'matte',
            display_name: 'Matte'
          },
          {
            id: 'eggshell',
            display_name: 'Eggshell',
            default: true
          },
          {
            id: 'gloss',
            display_name: 'Gloss'
          }
        ],
        matte_blue_paint_options: [
          {
            id: 'powder_blue',
            display_name: 'Powder Blue',
            default: true
          }
        ],
        matte_red_paint_options: [
          {
            id: 'brick',
            display_name: 'Brick',
            default: true
          },
          {
            id: 'scarlet',
            display_name: 'Scarlet'
          }
        ],
        eggshell_blue_paint_options: [
          {
            id: 'elegant_royal',
            display_name: 'Elegant Royal',
            default: true
          },
          {
            id: 'robins_egg',
            display_name: "Robin's Egg"
          }
        ],
        eggshell_red_paint_options: [
          {
            id: 'rose',
            display_name: 'Rose',
            default: true
          },
          {
            id: 'ruby',
            display_name: 'Ruby'
          }
        ],
        gloss_blue_paint_options: [
          {
            id: 'sky_blue',
            display_name: 'Sky Blue',
            default: true
          },
          {
            id: 'navy',
            display_name: 'Navy'
          }
        ],
        gloss_red_paint_options: [
          {
            id: 'fire_engine',
            display_name: 'Fire Engine',
            default: true
          },
          {
            id: 'crimson',
            display_name: 'Crimson'
          }
        ]
      },
      errors: [],
      defaultValsByPrefId: {
        color: 'blue',
        finish: 'eggshell',
        paint: 'elegant_royal'
      }
    };
    expect(_.isEqual(manifest, expectedManifest)).toBe(true);
    expect(JSON.stringify(manifest, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/prefsManifest.snap.json`
    );
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
      prefOptionsConfig: paintColorsPrefOptionsConfig,
      allowlist: paintColorsAllowlist
    });

    console.log(manifest.errors);

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0]).toContain('Invalid placeholder:');
  });

  test('detects a nonexistent options source', () => {
    const invalidPrefOptionsConfig = {
      color_options: [
        { id: 'blue', display_name: 'Blue', default: true },
        { id: 'red', display_name: 'Red' }
      ],
      finish_options: [
        { id: 'matte', display_name: 'Matte' },
        { id: 'eggshell', display_name: 'Eggshell', default: true },
        { id: 'gloss', display_name: 'Gloss' }
      ],
      /* Intentionally omitted options:
      matte_blue_paint_options: [
        { id: 'powder_blue', display_name: 'Powder Blue', default: true }
      ],
      */
      eggshell_blue_paint_options: [
        { id: 'elegant_royal', display_name: 'Elegant Royal', default: true },
        { id: 'robins_egg', display_name: "Robin's Egg" }
      ],
      gloss_blue_paint_options: [
        { id: 'sky_blue', display_name: 'Sky Blue', default: true },
        { id: 'navy', display_name: 'Navy' }
      ],
      matte_red_paint_options: [
        { id: 'brick', display_name: 'Brick', default: true },
        { id: 'scarlet', display_name: 'Scarlet' }
      ],
      eggshell_red_paint_options: [
        { id: 'rose', display_name: 'Rose', default: true },
        { id: 'ruby', display_name: 'Ruby' }
      ],
      gloss_red_paint_options: [
        { id: 'fire_engine', display_name: 'Fire Engine', default: true },
        { id: 'crimson', display_name: 'Crimson' }
      ]
    };

    const manifest = YamlConfigParser.buildPagePrefsManifest({
      frontmatter: paintColorsFrontmatter,
      prefOptionsConfig: invalidPrefOptionsConfig,
      allowlist: paintColorsAllowlist
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0]).toContain('Invalid options source:');
  });
});
