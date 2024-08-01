import { describe, test, expect } from 'vitest';
import { VALID_PREF_OPTIONS_DIR, SNAPSHOTS_DIR, MOCKS_DIR } from '../../config/constants';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';

const INVALID_PREF_MOCKS_DIR = `${MOCKS_DIR}/invalid/prefsOptionsDirs`;

describe('ConfigProcessor', () => {
  test('loads preference options from a directory', () => {
    const prefOptionsConfig =
      ConfigProcessor.loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);
    expect(JSON.stringify(prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/ConfigProcessor/valid/ingestedPrefOptions.snap.json`
    );
  });

  const invalidDirs = [
    'missing_default_value',
    'multiple_default_values',
    'missing_display_name',
    'missing_id',
    'capitalized_id',
    'multi_word_id',
    'punctuated_id',
    'spinal_case_id'
  ];

  invalidDirs.forEach((invalidDir) => {
    test(`throws an error when processing the '${invalidDir}' directory`, () => {
      expect(() =>
        ConfigProcessor.loadPrefOptionsFromDir(`${INVALID_PREF_MOCKS_DIR}/${invalidDir}`)
      ).toThrow();
    });

    test(`throws an error that matches the snapshot for the '${invalidDir}' directory`, () => {
      try {
        ConfigProcessor.loadPrefOptionsFromDir(`${INVALID_PREF_MOCKS_DIR}/${invalidDir}`);
      } catch (error) {
        expect(error.message).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/helperModules/ConfigProcessor/invalid/ingestedPrefOptionsError/${invalidDir}.snap.txt`
        );
      }
    });
  });
});
