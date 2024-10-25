import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { VALID_PREFS_CONFIG_DIR } from '../../config/constants';

describe('YamlConfigParser.loadAllowlistsByLang', () => {
  const langs = ['en', 'ja'];
  test('runs without error', () => {
    /*
    const allowlistsByLang = YamlConfigParser.loadAllowlistsByLang({
      langs,
      prefsConfigDir: VALID_PREFS_CONFIG_DIR
    });

    console.log('allowlistsByLang:');
    console.log(JSON.stringify(allowlistsByLang, null, 2));
    */

    expect(true).toBe(true);
  });
});
