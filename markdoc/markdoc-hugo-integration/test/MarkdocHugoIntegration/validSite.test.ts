import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

const siteDir = VALID_SITE_DIR;

describe('MarkdocHugoIntegration (optimized Markdown output)', () => {
  const compiler = new MarkdocHugoIntegration({
    directories: {
      content: siteDir + '/content',
      prefsConfig: siteDir + '/preferences_config',
      partials: siteDir + '/partials'
    },
    hugoConfig: {
      siteParams: {
        img_url: 'https://example.com'
      },
      env: 'development',
      languages: ['en', 'ja']
    }
  });

  const { compiledFiles, hasErrors } = compiler.compileMdocFiles();

  if (hasErrors) {
    compiler.logErrorsToConsole();
  }

  test('each compiled file matches the snapshot', () => {
    for (const compiledFile of compiledFiles) {
      const compiledContent = fs.readFileSync(compiledFile, 'utf8');
      const sanitizedFilename = compiledFile.replace(`${siteDir}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });

  test('no errors occurred during compilation', () => {
    expect(hasErrors).toBe(false);
  });
});
