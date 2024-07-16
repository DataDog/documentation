import { describe, test, expect } from 'vitest';
import { VALID_PREF_OPTIONS_DIR, SNAPSHOTS_DIR, MOCKS_DIR } from '../constants';
import { loadPrefOptionsFromDir } from '../../src/helpers/configIngestion';

const INVALID_PREF_MOCKS_DIR = `${MOCKS_DIR}/invalid/prefs_options_dirs`;

describe('Config ingestion', () => {
  test('Valid prefs options can be ingested', () => {
    const prefOptionsConfig = loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);
    expect(JSON.stringify(prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validIngestedPrefOptions.snap.json`
    );
  });

  const invalidDirs = [
    'missing_default_value',
    'missing_display_name',
    'missing_identifier',
    'capitalized_identifier',
    'multi_word_identifier',
    'punctuated_identifier',
    'spinal_case_identifier'
  ];

  invalidDirs.forEach((invalidDir) => {
    test(`The invalid '${invalidDir}' directory throws an error on ingest`, () => {
      expect(() =>
        loadPrefOptionsFromDir(`${INVALID_PREF_MOCKS_DIR}/${invalidDir}`)
      ).toThrow();
    });

    test(`The error message for the invalid '${invalidDir}' directory matches the snapshot`, () => {
      try {
        loadPrefOptionsFromDir(`${INVALID_PREF_MOCKS_DIR}/${invalidDir}`);
      } catch (error) {
        expect(error.message).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/errorMessages/invalidIngestedPrefOptions/${invalidDir}.snap.txt`
        );
      }
    });
  });
});
