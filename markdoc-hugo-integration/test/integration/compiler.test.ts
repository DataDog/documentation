import { MarkdocToHtmlCompiler } from '../../src';
import { describe, test, expect } from 'vitest';

const TEST_SITE_DIR = __dirname + '/../test_site';

describe('MarkdocToHtmlCompiler', () => {
  const compiler = new MarkdocToHtmlCompiler({
    prefOptionsConfigDir: TEST_SITE_DIR + '/preferences_config/options',
    sitewidePrefsFilepath: TEST_SITE_DIR + '/preferences_config/sitewide_preferences.yaml',
    contentDir: TEST_SITE_DIR + '/content',
    partialsDir: TEST_SITE_DIR + '/partials'
  });

  test('.prefOptionsConfig', () => {
    expect(JSON.stringify(compiler.prefOptionsConfig, null, 2)).toMatchFileSnapshot(
      './../__snapshots__/prefOptionsConfig.snap.json'
    );
  });

  test('.sitewidePrefNames', () => {
    expect(JSON.stringify(compiler.sitewidePrefNames, null, 2)).toMatchFileSnapshot(
      './../__snapshots__/sitewidePrefNames.snap.json'
    );
  });
});
