import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';

describe('YamlConfigParser.buildPagePrefsManifest', () => {
  const manifest = YamlConfigParser.buildPagePrefsManifest({
    frontmatter: paintColorsFrontmatter,
    prefOptionsConfig: paintColorsPrefOptionsConfig
  });

  test('creates the expected object', () => {
    const expectedManifest = {
      color: {
        config: {
          display_name: 'Color',
          id: 'color',
          options_source: 'color_options'
        },
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
    };

    expect(_.isEqual(manifest, expectedManifest)).toBe(true);
  });
});
