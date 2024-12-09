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
  const { hasErrors, parsingErrorReportsByFilePath, validationErrorsByFilePath } =
    integration.compileMdocFiles();

  // sanitize the file paths so snapshots are consistent across machines
  const errorReports = { ...parsingErrorReportsByFilePath };
  Object.keys(errorReports).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(contentDir, '');
    errorReports[sanitizedFilePath] = errorReports[filePath];
    errorReports[sanitizedFilePath].forEach((errorReport) => {
      errorReport.file = errorReport.file.replace(contentDir, '');
    });
    delete errorReports[filePath];
  });

  const errors = { ...validationErrorsByFilePath };
  Object.keys(errors).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(contentDir, '');
    errors[sanitizedFilePath] = [];
    errors[filePath].forEach((error) => {
      error = error.replace(contentDir, '');
      errors[sanitizedFilePath].push(error);
    });
    delete errors[filePath];
  });

  test('the compilation should return false', () => {
    expect(hasErrors).toBe(true);
  });

  markupFiles.forEach((markupFile) => {
    const sanitizedFilename = markupFile.replace(contentDir, '');
    const parsingErrorReports = parsingErrorReportsByFilePath[markupFile];
    const validationError = validationErrorsByFilePath[markupFile];

    const fileHasError = !!parsingErrorReports || !!validationError;

    test(`the file ${sanitizedFilename} should have errors`, () => {
      expect(fileHasError).toBe(true);
    });
  });

  test(`the validation errors match the snapshot`, () => {
    expect(JSON.stringify(validationErrorsByFilePath, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/validationErrors.snap.json`
    );
  });

  test(`the parsing errors match the snapshot`, () => {
    expect(JSON.stringify(parsingErrorReportsByFilePath, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/invalidSite/parsingErrors.snap.json`
    );
  });
});
