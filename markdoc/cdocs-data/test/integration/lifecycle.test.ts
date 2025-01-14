import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR } from '../config/constants';
import { VALID_CUSTOMIZATION_CONFIG_DIR } from '../config/constants';
import { CdocsDataManager } from '../../src/modules/CdocsDataManager';

const langs = ['en', 'ja']; // TODO: Change to piglatin

describe('Demo', () => {
  test('parses the content filter configuration from YAML', async () => {
    const { customizationConfigByLang } = CdocsDataManager.loadCustomizationConfig({
      configDir: VALID_CUSTOMIZATION_CONFIG_DIR,
      langs,
    });

    const stringifiedConfig = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/demo/parsedContentFiltersConfig.snap.json',
    );
  });
});
