import { MarkdocToHtmlCompiler } from '../../src';
import { describe, test, expect } from 'vitest';

const TEST_SITE_DIR = __dirname + '/../test_site';

describe('MarkdocToHtmlCompiler', () => {
  const compiler = new MarkdocToHtmlCompiler({
    preferencesConfigDir: TEST_SITE_DIR + '/preferences_config',
    contentDirectory: TEST_SITE_DIR + '/content',
    partialsDirectory: TEST_SITE_DIR + '/partials'
  });

  test('.prefOptionsConfig', () => {
    expect(JSON.stringify(compiler.prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      './../__snapshots__/prefOptionsConfig.snap.json'
    );
  });
});
