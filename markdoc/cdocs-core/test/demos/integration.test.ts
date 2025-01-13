import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR } from '../config/constants';
import { VALID_FILTERS_CONFIG_DIR } from '../config/constants';
import { CdocsDataManager } from '../../src/modules/CdocsDataManager';

const configDir = __dirname + '/example_content_filters_config';
const langs = ['en', 'ja']; // TODO: Change to piglatin

describe('Demo', () => {
  test('parses the content filter configuration from YAML', async () => {
    const { contentFiltersConfigByLang } = CdocsDataManager.loadContentFiltersConfig({
      configDir: VALID_FILTERS_CONFIG_DIR,
      langs,
    });

    const stringifiedConfig = JSON.stringify(contentFiltersConfigByLang, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/demo/parsedContentFiltersConfig.snap.json',
    );
  });
});
