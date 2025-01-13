import { GlossarySchema } from '../../src/schemas/glossary';
import { FilterOptionsConfigSchema } from '../../src/schemas/filterOptions';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR } from '../config/constants';
import { z } from 'zod';
import { CdocsDataManager } from '../../src/modules/CdocsDataManager';
import { ContentFiltersConfigByLangSchema } from '../../src/schemas/contentFiltersConfig';

/**
 * TODO: Add a loadContentFiltersConfig that takes the top-level
 * content filters config directory and loads all required config.
 */

/**
 * TODO: Rename the FilterOptionsConfig to OptionListGlossary,
 * so we have a FilterGlossary, OptionGlossary, and OptionListGlossary.
 */

const configDir = __dirname + '/example_content_filters_config';
const langs = ['en', 'ja']; // TODO: Change to piglatin

describe('Demo', () => {
  test('parses the content filter configuration from YAML', async () => {
    const { contentFiltersConfigByLang } = CdocsDataManager.loadContentFiltersConfig({
      configDir,
      langs,
    });

    const stringifiedConfig = JSON.stringify(contentFiltersConfigByLang, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/demo/parsedContentFiltersConfig.snap.json',
    );
  });
});
