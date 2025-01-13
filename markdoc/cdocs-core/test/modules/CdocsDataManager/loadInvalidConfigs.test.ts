import { describe, test, expect } from 'vitest';
import { CdocsDataManager } from '../../../src/modules/CdocsDataManager';
import { INVALID_CONFIGS_DIR, SNAPSHOTS_DIR } from '../../config/constants';
import fs from 'fs';

describe('CdocsDataManager', () => {
  const langs = ['en', 'ja'];
  const invalidDirs = fs.readdirSync(INVALID_CONFIGS_DIR);
  const errorsByDir: Record<string, Array<any>> = {};

  invalidDirs.forEach((invalidDir) => {
    let thrownError: any = null;

    try {
      const { contentFiltersConfigByLang } = CdocsDataManager.loadContentFiltersConfig({
        configDir: `${INVALID_CONFIGS_DIR}/${invalidDir}`,
        langs,
      });
      console.log('----------------------------------');
      console.log(contentFiltersConfigByLang);
    } catch (error) {
      thrownError = error;
      if ('message' in thrownError && typeof thrownError.message === 'string') {
        console.log(thrownError);
        /*
        thrownError.message = thrownError.message.replace(
          INVALID_CONFIGS_DIR,
          '<SANITIZED_INVALID_CONFIGS_DIR>',
        );
        */
      }
      errorsByDir[invalidDir] = error;
    }

    test(`throws an error when processing the '${invalidDir}' directory`, () => {
      expect(thrownError).not.toBeNull();
    });
  });

  test(`the errors match the snapshot`, async () => {
    const stringifiedErrors = JSON.stringify(errorsByDir, null, 2);
    await expect(stringifiedErrors).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/modules/CdocsDataManager/invalidConfigIngestion/errorsByDir.snap.json`,
    );
  });
});
