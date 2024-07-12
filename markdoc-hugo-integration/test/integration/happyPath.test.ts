import { MarkdocToHugoCompiler } from '../../src';
import { describe, test, expect } from 'vitest';

const TEST_SITE_DIR = __dirname + '/../test_site';
const SNAPSHOTS_DIR = __dirname + '/../__snapshots__';

describe('MarkdocToHugoCompiler', () => {
  const compiler = new MarkdocToHugoCompiler({
    prefOptionsConfigDir: TEST_SITE_DIR + '/preferences_config/options',
    sitewidePrefsFilepath:
      TEST_SITE_DIR + '/preferences_config/sitewide_preferences.yaml',
    contentDir: TEST_SITE_DIR + '/content',
    partialsDir: TEST_SITE_DIR + '/partials'
  });

  test('ingests pref options', () => {
    expect(
      JSON.stringify(compiler.prefOptionsConfig, null, 2)
    ).toMatchFileSnapshot(`${SNAPSHOTS_DIR}/prefOptionsConfig.snap.json`);
  });

  test('ingests sitewide pref names', () => {
    expect(
      JSON.stringify(compiler.sitewidePrefNames, null, 2)
    ).toMatchFileSnapshot(`${SNAPSHOTS_DIR}/sitewidePrefNames.snap.json`);
  });

  test('detects Markdoc files', () => {
    expect(compiler.markdocFiles.length).toBe(2);
  });

  test('compiles Markdoc files', () => {
    compiler.compile();
    expect(true).toBe(true);
  });
});
