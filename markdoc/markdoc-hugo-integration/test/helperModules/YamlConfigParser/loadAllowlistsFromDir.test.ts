import { describe, test, expect } from 'vitest';
import { VALID_PREFS_CONFIG_DIR, SNAPSHOTS_DIR, MOCKS_DIR } from '../../config/constants';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import fs from 'fs';

const INVALID_ALLOWLISTS_DIR = `${MOCKS_DIR}/invalid/allowlistsDirs`;

describe('YamlConfigParser.loadAllowlistsFromDir', () => {
  test('loads allowlists from a prefs config directory', () => {
    const allowlistsByType = YamlConfigParser.loadAllowlistsFromDir(
      VALID_PREFS_CONFIG_DIR + '/en/allowlists'
    );
    expect(JSON.stringify(allowlistsByType, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/ingestedAllowlists.snap.json`
    );
  });

  const invalidDirs = fs.readdirSync(INVALID_ALLOWLISTS_DIR);

  invalidDirs.forEach((invalidDir) => {
    test(`throws an error when processing the '${invalidDir}' directory`, () => {
      expect(() =>
        YamlConfigParser.loadAllowlistsFromDir(`${INVALID_ALLOWLISTS_DIR}/${invalidDir}`)
      ).toThrow();
    });

    test(`throws an error that matches the snapshot for the '${invalidDir}' directory`, () => {
      try {
        YamlConfigParser.loadAllowlistsFromDir(`${INVALID_ALLOWLISTS_DIR}/${invalidDir}`);
      } catch (error) {
        const sanitizedErrorMessage = error.message.replace(INVALID_ALLOWLISTS_DIR, '');
        expect(sanitizedErrorMessage).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/invalid/ingestedAllowlistsErrors/${invalidDir}.snap.txt`
        );
      }
    });
  });
});
