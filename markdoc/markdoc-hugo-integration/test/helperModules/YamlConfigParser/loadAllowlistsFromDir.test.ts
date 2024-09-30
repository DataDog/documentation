import { describe, test, expect } from 'vitest';
import { VALID_PREFS_CONFIG_DIR, SNAPSHOTS_DIR } from '../../config/constants';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';

describe('YamlConfigParser.loadAllowlistsFromDir', () => {
  test('loads allowlists from a prefs config directory', () => {
    const allowlistsByType = YamlConfigParser.loadAllowlistsFromDir(
      VALID_PREFS_CONFIG_DIR + '/en/allowlists'
    );
    expect(JSON.stringify(allowlistsByType, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/ingestedAllowlists.snap.json`
    );
  });
});
