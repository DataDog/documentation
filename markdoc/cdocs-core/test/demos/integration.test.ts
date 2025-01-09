import { Glossary, GlossarySchema } from '../../src/schemas/glossary';
import { FilterOptionsConfigSchema } from '../../src/schemas/filterOptions';
import { YamlConfigParser } from '../../src/modules/YamlConfigParser';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR } from '../config/constants';
import { FilterOptionsConfig } from '../../src/schemas/filterOptions';
import { z } from 'zod';
import { CdocsDataManager } from '../../src/modules/CdocsDataManager';

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
    const contentFiltersConfig = CdocsDataManager.loadContentFiltersConfig({
      configDir,
      langs,
    });

    z.record(GlossarySchema).parse(contentFiltersConfig.glossariesByLang);
    z.record(FilterOptionsConfigSchema).parse(
      contentFiltersConfig.filterOptionsConfigByLang,
    );

    const stringifiedConfig = JSON.stringify(contentFiltersConfig, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/demo/parsedContentFiltersConfig.snap.json',
    );
  });
});
