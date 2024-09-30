import { describe, test, expect } from 'vitest';
import { VALID_PREFS_CONFIG_DIR, SNAPSHOTS_DIR, MOCKS_DIR } from '../../config/constants';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import fs from 'fs';

const INVALID_PREF_MOCKS_DIR = `${MOCKS_DIR}/invalid/prefsOptionsDirs`;

describe('YamlConfigParser.loadPrefOptionsFromDir', () => {
  test('loads preference options from a directory', () => {
    const prefOptionsConfig = YamlConfigParser.loadPrefOptionsFromDir(
      VALID_PREFS_CONFIG_DIR + '/en/option_sets'
    );
    expect(JSON.stringify(prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/ingestedPrefOptions.snap.json`
    );
  });

  const invalidDirs = fs.readdirSync(INVALID_PREF_MOCKS_DIR);

  invalidDirs.forEach((invalidDir) => {
    test(`throws an error when processing the '${invalidDir}' directory`, () => {
      expect(() =>
        YamlConfigParser.loadPrefOptionsFromDir(`${INVALID_PREF_MOCKS_DIR}/${invalidDir}`)
      ).toThrow();
    });

    test(`throws an error that matches the snapshot for the '${invalidDir}' directory`, () => {
      try {
        YamlConfigParser.loadPrefOptionsFromDir(
          `${INVALID_PREF_MOCKS_DIR}/${invalidDir}`
        );
      } catch (error) {
        const sanitizedErrorMessage = error.message.replace(INVALID_PREF_MOCKS_DIR, '');
        expect(sanitizedErrorMessage).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/invalid/ingestedPrefOptionsError/${invalidDir}.snap.txt`
        );
      }
    });
  });
});
