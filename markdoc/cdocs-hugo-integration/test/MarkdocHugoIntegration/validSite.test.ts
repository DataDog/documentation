import { CdocsHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

describe('CdocsHugoIntegration (optimized Markdown output)', async () => {
  const hugoIntegration = new CdocsHugoIntegration({
    baseSiteDir: VALID_SITE_DIR,
    env: 'development',
    publishAuthorConsoleInDir: VALID_SITE_DIR + '/static/markdoc/console'
  });

  const { compiledFilePaths, hasErrors } = hugoIntegration.compileMdocFiles();

  if (hasErrors) {
    hugoIntegration.logErrorsToConsole();
  }

  test('each compiled file matches the snapshot', async () => {
    for (const compiledFilePath of compiledFilePaths) {
      const compiledContent = fs.readFileSync(compiledFilePath, 'utf8');
      const sanitizedFilename = compiledFilePath.replace(`${VALID_SITE_DIR}/content`, '');
      await expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });

  test('no errors occurred during compilation', () => {
    expect(hasErrors).toBe(false);
  });

  test('the assets partial builds without error', () => {
    expect(() => {
      hugoIntegration.buildAssetsPartial();
    }).not.toThrow();
  });
});
