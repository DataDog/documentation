import { describe, test, expect } from 'vitest';
import { loadCustomizationConfig } from '../../src';
import {
  INVALID_CONFIGS_DIR,
  VALID_CUSTOMIZATION_CONFIG_DIR,
  SNAPSHOTS_DIR,
} from '../config/constants';
import fs from 'fs';

describe('loadCustomizationConfig', () => {
  const langs = ['en', 'ja']; // TODO: Change to piglatin

  // Valid data handling
  test('loads a valid configuration from YAML', async () => {
    const { customizationConfigByLang } = loadCustomizationConfig({
      configDir: VALID_CUSTOMIZATION_CONFIG_DIR,
      langs,
    });

    const stringifiedConfig = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/utils/loadCustomizationConfig/validConfig.snap.json',
    );
  });

  // Invalid data handling
  const invalidDirs = fs.readdirSync(INVALID_CONFIGS_DIR);
  const errorsByDir: Record<string, Array<any>> = {};

  invalidDirs.forEach((invalidDir) => {
    let thrownError: any = null;

    try {
      const { customizationConfigByLang } = loadCustomizationConfig({
        configDir: `${INVALID_CONFIGS_DIR}/${invalidDir}`,
        langs,
      });
    } catch (error) {
      thrownError = error;
      errorsByDir[invalidDir] = thrownError;
    }

    test(`throws an error when processing the invalid directory: '${invalidDir}'`, () => {
      expect(thrownError).not.toBeNull();
    });
  });

  test(`the errors match the snapshot`, async () => {
    const stringifiedErrors = JSON.stringify(errorsByDir, null, 2);
    await expect(stringifiedErrors).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/utils/loadCustomizationConfig/invalidDirectoryErrors.snap.json`,
    );
  });
});
