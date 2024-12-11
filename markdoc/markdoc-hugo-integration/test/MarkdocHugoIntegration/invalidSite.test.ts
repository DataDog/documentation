import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, INVALID_SITE_DIR } from '../config/constants';
import { FileNavigator } from '../../src/helperModules/FileNavigator';

const siteDir = INVALID_SITE_DIR;
const contentDir = siteDir + '/content';
const markupFiles = FileNavigator.findInDir(contentDir, /\.mdoc.md$/);

describe('MarkdocHugoIntegration', async () => {
  const integration = new MarkdocHugoIntegration({
    config: {
      baseSiteDir: siteDir,
      env: 'development'
    }
  });

  // compile the bad files
  const { hasErrors, errorsByFilePath } = integration.compileMdocFiles();

  const authorConsoleHtml = await integration.injectAuthorConsole();

  // sanitize the file paths so snapshots are consistent across machines
  const errorsByFilePathDup = { ...errorsByFilePath };
  Object.keys(errorsByFilePathDup).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(contentDir, '');
    errorsByFilePathDup[sanitizedFilePath] = errorsByFilePathDup[filePath];
    errorsByFilePathDup[filePath].forEach((error) => {
      error.message = error.message.replace(contentDir, '');
    });
    delete errorsByFilePathDup[filePath];
  });

  test('the compilation should return false', () => {
    expect(hasErrors).toBe(true);
  });

  markupFiles.forEach((markupFile) => {
    const sanitizedFilename = markupFile.replace(contentDir, '');
    const errors = errorsByFilePath[markupFile];

    test(`the file ${sanitizedFilename} should have errors`, () => {
      expect(errors.length > 0).toBe(true);
    });
  });

  test(`the errors match the snapshot`, async () => {
    await expect(JSON.stringify(errorsByFilePathDup, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/errors.snap.json`
    );
  });

  test('the author console HTML matches the snapshot', async () => {
    await expect(authorConsoleHtml).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/authorConsole.html`
    );
  });
});
