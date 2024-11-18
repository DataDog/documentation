import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { VALID_FILTERS_CONFIG_DIR } from '../../config/constants';

describe('YamlConfigParser.loadGlossariesByLang', () => {
  const langs = ['en', 'ja'];

  test('matches the snapshot', () => {
    const glossariesByLang = YamlConfigParser.loadGlossariesByLang({
      langs,
      filtersConfigDir: VALID_FILTERS_CONFIG_DIR
    });

    expect(glossariesByLang).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/YamlConfigParser/valid/glossariesByLang.test.snap`
    );
  });
});
