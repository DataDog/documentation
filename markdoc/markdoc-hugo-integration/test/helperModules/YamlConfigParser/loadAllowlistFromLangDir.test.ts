import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { VALID_PREFS_CONFIG_DIR } from '../../config/constants';

describe('YamlConfigParser.loadAllowlistFromLangDir', () => {
  const langDir = `${VALID_PREFS_CONFIG_DIR}/en`;

  test('runs without error', () => {
    const allowlist = YamlConfigParser.loadAllowlistFromLangDir(langDir);

    const expectedAllowlist = {
      prefsById: {
        color: {
          id: 'color',
          display_name: 'Color'
        }
      },
      optionsById: {
        red: {
          id: 'red',
          display_name: 'Red'
        },
        blue: {
          id: 'blue',
          display_name: 'Blue'
        },
        yellow: {
          id: 'yellow',
          display_name: 'Yellow'
        },
        green: {
          id: 'green',
          display_name: 'Green'
        },
        ocean: {
          id: 'ocean',
          display_name: 'Ocean'
        },
        sky: {
          id: 'sky',
          display_name: 'Sky'
        },
        jeans: {
          id: 'jeans',
          display_name: 'Jeans'
        },
        blueberry: {
          id: 'blueberry',
          display_name: 'Blueberry'
        },
        grass: {
          id: 'grass',
          display_name: 'Grass'
        },
        emerald: {
          id: 'emerald',
          display_name: 'Emerald'
        },
        lime: {
          id: 'lime',
          display_name: 'Lime'
        },
        frog: {
          id: 'frog',
          display_name: 'Frog'
        },
        ruby: {
          id: 'ruby',
          display_name: 'Ruby'
        },
        apple: {
          id: 'apple',
          display_name: 'Apple'
        },
        firetruck: {
          id: 'firetruck',
          display_name: 'Firetruck'
        },
        stop_sign: {
          id: 'stop_sign',
          display_name: 'Stop sign'
        },
        banana: {
          id: 'banana',
          display_name: 'Banana'
        },
        sunflower: {
          id: 'sunflower',
          display_name: 'Sunflower'
        },
        lemon: {
          id: 'lemon',
          display_name: 'Lemon'
        },
        school_bus: {
          id: 'school_bus',
          display_name: 'School bus'
        }
      }
    };

    expect(_.isEqual(allowlist, expectedAllowlist)).toBe(true);
    expect(allowlist).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/allowlist.snap.json`
    );
  });
});
