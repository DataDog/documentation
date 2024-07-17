import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

const siteDir = VALID_SITE_DIR;

describe('MarkdocHugoIntegration', () => {
  const compiler = new MarkdocHugoIntegration({
    prefOptionsConfigDir: siteDir + '/preferences_config/options',
    sitewidePrefsFilepath: siteDir + '/preferences_config/sitewide_preferences.yaml',
    contentDir: siteDir + '/content',
    partialsDir: siteDir + '/partials'
  });

  test('each compiled file matches the snapshot', () => {
    compiler.compile();
    for (const file of compiler.markdocFiles) {
      const compiledFile = file.replace(/\.mdoc$/, '.html');
      const compiledContent = fs.readFileSync(compiledFile, 'utf8');
      const sanitizedFilename = compiledFile.replace(`${siteDir}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/' + sanitizedFilename
      );
    }
  });
});
