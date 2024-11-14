import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

const siteDir = VALID_SITE_DIR;

describe('MarkdocHugoIntegration (optimized Markdown output)', () => {
  const compiler = new MarkdocHugoIntegration({
    config: {
      siteParams: {
        img_url: 'https://example.com'
      },
      env: 'development',
      languages: ['en', 'ja', 'fr'],
      siteConfig: { baseURL: 'https://example.com/' },
      siteDir,
      i18n: {
        en: {
          additional_sentence: { other: 'test' }
        },
        ja: {
          additional_sentence: { other: 'テスト' }
        }
      }
    }
  });

  const { compiledFilePaths, hasErrors } = compiler.compileMdocFiles();

  if (hasErrors) {
    compiler.logErrorsToConsole();
  }

  test('each compiled file matches the snapshot', () => {
    for (const compiledFilePath of compiledFilePaths) {
      const compiledContent = fs.readFileSync(compiledFilePath, 'utf8');
      const sanitizedFilename = compiledFilePath.replace(`${siteDir}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });

  test('no errors occurred during compilation', () => {
    expect(hasErrors).toBe(false);
  });
});
