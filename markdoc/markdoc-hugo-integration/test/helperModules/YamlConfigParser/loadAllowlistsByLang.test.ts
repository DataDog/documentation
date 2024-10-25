import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { VALID_PREFS_CONFIG_DIR } from '../../config/constants';

describe('YamlConfigParser.loadAllowlistsByLang', () => {
  const langs = ['en', 'ja'];

  test('matches the snapshot', () => {
    const allowlistsByLang = YamlConfigParser.loadAllowlistsByLang({
      langs,
      prefsConfigDir: VALID_PREFS_CONFIG_DIR
    });

    expect(allowlistsByLang).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/allowlistsByLang.test.snap`
    );
  });
});
