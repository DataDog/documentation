import { describe, test, expect } from 'vitest';
import { VALID_PREFS_CONFIG_DIR, SNAPSHOTS_DIR, MOCKS_DIR } from '../../config/constants';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import fs from 'fs';

const INVALID_PREF_MOCKS_DIR = `${MOCKS_DIR}/invalid/prefsConfigDirs`;

describe('YamlConfigParser', () => {
  const LANG_DIR = `${VALID_PREFS_CONFIG_DIR}/en`;
  test('loads preference options from a directory', () => {
    const allowlist = YamlConfigParser.loadAllowlistFromLangDir(LANG_DIR);
    const prefOptionsConfig = YamlConfigParser.loadPrefsConfigFromLangDir({
      dir: LANG_DIR,
      allowlist
    });
    expect(JSON.stringify(prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/ingestedPrefOptions.snap.json`
    );
  });

  const invalidDirs = fs.readdirSync(INVALID_PREF_MOCKS_DIR);

  invalidDirs.forEach((invalidDir) => {
    test(`throws an error when processing the '${invalidDir}' directory`, () => {
      expect(() => {
        const allowlist = YamlConfigParser.loadAllowlistFromLangDir(invalidDir);
        YamlConfigParser.loadPrefsConfigFromLangDir({
          dir: `${INVALID_PREF_MOCKS_DIR}/${invalidDir}`,
          allowlist
        });
      }).toThrow();
    });

    test(`throws an error that matches the snapshot for the '${invalidDir}' directory`, () => {
      try {
        const allowlist = YamlConfigParser.loadAllowlistFromLangDir(invalidDir);
        YamlConfigParser.loadPrefsConfigFromLangDir({
          dir: `${INVALID_PREF_MOCKS_DIR}/${invalidDir}`,
          allowlist
        });
      } catch (error) {
        const sanitizedErrorMessage = error.message.replace(INVALID_PREF_MOCKS_DIR, '');
        expect(sanitizedErrorMessage).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/invalid/ingestedPrefsConfig/${invalidDir}.snap.txt`
        );
      }
    });
  });
});
