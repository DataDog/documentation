import { MarkdocToHugoCompiler } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_EXAMPLE_SITE_DIR } from '../constants';

const siteDir = VALID_EXAMPLE_SITE_DIR;

describe('MarkdocToHugoCompiler', () => {
  const compiler = new MarkdocToHugoCompiler({
    prefOptionsConfigDir: siteDir + '/preferences_config/options',
    sitewidePrefsFilepath: siteDir + '/preferences_config/sitewide_preferences.yaml',
    contentDir: siteDir + '/content',
    partialsDir: siteDir + '/partials'
  });

  test('ingests sitewide pref names', () => {
    expect(JSON.stringify(compiler.sitewidePrefNames, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/sitewidePrefNames.snap.json`
    );
  });

  test('detects Markdoc files', () => {
    expect(compiler.markdocFiles.length).toBe(2);
  });

  test('compiles Markdoc files', () => {
    compiler.compile();
    expect(true).toBe(true);
  });
});
