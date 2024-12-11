import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

describe('MarkdocHugoIntegration (optimized Markdown output)', async () => {
  const compiler = new MarkdocHugoIntegration({
    config: {
      baseSiteDir: VALID_SITE_DIR,
      env: 'development'
    }
  });

  const { compiledFilePaths, hasErrors } = compiler.compileMdocFiles();

  const authorConsoleHtml = await compiler.injectAuthorConsole();

  if (hasErrors) {
    compiler.logErrorsToConsole();
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

  test('the author console HTML matches the snapshot', async () => {
    await expect(authorConsoleHtml).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/validSite/authorConsole.html'
    );
  });
});
