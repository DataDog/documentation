import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, INVALID_SITE_DIR } from '../config/constants';
import { FileNavigator } from '../../src/helperModules/FileNavigator';

const siteDir = INVALID_SITE_DIR;
const contentDir = siteDir + '/content';
const markupFiles = FileNavigator.findInDir(contentDir, /\.mdoc.md$/);

describe('MarkdocHugoIntegration', () => {
  const integration = new MarkdocHugoIntegration({
    config: {
      baseSiteDir: siteDir,
      env: 'development'
    }
  });

  // compile the bad files
  const { hasErrors, parsingErrorsByFilePath, validationErrorsByFilePath } =
    integration.compileMdocFiles();

  // sanitize the file paths so snapshots are consistent across machines
  const parsingErrorsByFilePathDup = { ...parsingErrorsByFilePath };
  Object.keys(parsingErrorsByFilePathDup).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(contentDir, '');
    parsingErrorsByFilePathDup[sanitizedFilePath] = parsingErrorsByFilePathDup[filePath];
    delete parsingErrorsByFilePathDup[filePath];
  });

  const validationErrorsByFilePathDup = { ...validationErrorsByFilePath };
  Object.keys(validationErrorsByFilePathDup).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(contentDir, '');
    validationErrorsByFilePathDup[sanitizedFilePath] = [];
    validationErrorsByFilePathDup[filePath].forEach((error) => {
      error = error.replace(contentDir, '');
      validationErrorsByFilePathDup[sanitizedFilePath].push(error);
    });
    delete validationErrorsByFilePathDup[filePath];
  });

  test('the compilation should return false', () => {
    expect(hasErrors).toBe(true);
  });

  markupFiles.forEach((markupFile) => {
    const sanitizedFilename = markupFile.replace(contentDir, '');
    const parsingErrors = parsingErrorsByFilePath[markupFile];
    const validationError = validationErrorsByFilePath[markupFile];

    const fileHasError = !!parsingErrors || !!validationError;

    test(`the file ${sanitizedFilename} should have errors`, () => {
      expect(fileHasError).toBe(true);
    });
  });

  test(`the validation errors match the snapshot`, () => {
    expect(JSON.stringify(validationErrorsByFilePathDup, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/validationErrors.snap.json`
    );
  });

  test(`the parsing errors match the snapshot`, () => {
    expect(JSON.stringify(parsingErrorsByFilePathDup, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/parsingErrors.snap.json`
    );
  });
});
