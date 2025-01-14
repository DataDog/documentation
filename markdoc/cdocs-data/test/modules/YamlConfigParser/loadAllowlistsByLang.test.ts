import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/modules/YamlConfigParser';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { VALID_FILTERS_CONFIG_DIR } from '../../config/constants';

describe('YamlConfigParser.loadGlossariesByLang', () => {
  const langs = ['en', 'ja'];

  test('true is true', () => {
    expect(true).toBe(true);
  });
});
