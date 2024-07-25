import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

const siteDir = VALID_SITE_DIR;

describe('MarkdocHugoIntegration (standalone HTML output)', () => {
  const compiler = new MarkdocHugoIntegration({
    directories: {
      content: siteDir + '/content',
      options: siteDir + '/preferences_config/options',
      partials: siteDir + '/partials'
    },
    config: {
      includeAssetsInline: true,
      debug: true,
      outputFormat: 'html'
    }
  });

  test('each compiled file matches the snapshot', () => {
    const { compiledFiles } = compiler.compile();
    for (const compiledFile of compiledFiles) {
      const compiledContent = fs.readFileSync(compiledFile, 'utf8');
      const sanitizedFilename = compiledFile.replace(`${siteDir}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });
});

describe('MarkdocHugoIntegration (optimized Markdown output)', () => {
  const compiler = new MarkdocHugoIntegration({
    directories: {
      content: siteDir + '/content',
      options: siteDir + '/preferences_config/options',
      partials: siteDir + '/partials'
    }
  });

  test('each compiled file matches the snapshot', () => {
    const { compiledFiles } = compiler.compile();
    for (const compiledFile of compiledFiles) {
      const compiledContent = fs.readFileSync(compiledFile, 'utf8');
      const sanitizedFilename = compiledFile.replace(`${siteDir}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });
});
