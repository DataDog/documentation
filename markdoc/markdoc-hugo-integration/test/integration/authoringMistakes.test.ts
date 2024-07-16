import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, AUTHORING_MISTAKES_SITE_DIR } from '../constants';
import { findInDir } from '../../src/helpers/filesystem';

const siteDir = AUTHORING_MISTAKES_SITE_DIR;
const contentDir = siteDir + '/content';
const markupFiles = findInDir(contentDir, /\.mdoc$/);

describe('MarkdocHugoIntegration', () => {
  const integration = new MarkdocHugoIntegration({
    prefOptionsConfigDir: siteDir + '/preferences_config/options',
    sitewidePrefsFilepath: siteDir + '/preferences_config/sitewide_preferences.yaml',
    contentDir: contentDir,
    partialsDir: siteDir + '/partials'
  });

  // compile the bad files
  const { hasErrors, parsingErrorReportsByFilePath, validationErrorsByFilePath } =
    integration.compile();

  // sanitize the file paths so snapshots are consistent across machines
  const errorReports = { ...parsingErrorReportsByFilePath };
  Object.keys(errorReports).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(siteDir, '');
    errorReports[sanitizedFilePath] = errorReports[filePath];
    delete errorReports[filePath];
  });

  const errors = { ...validationErrorsByFilePath };
  Object.keys(errors).forEach((filePath) => {
    const sanitizedFilePath = filePath.replace(siteDir, '');
    errors[sanitizedFilePath] = errors[filePath].replace(siteDir, '');
    delete errors[filePath];
  });

  test('the compilation should return false', () => {
    expect(hasErrors).toBe(true);
  });

  markupFiles.forEach((markupFile) => {
    const sanitizedFilename = markupFile.replace(siteDir, '');
    const parsingErrorReports = parsingErrorReportsByFilePath[markupFile];
    const validationError = validationErrorsByFilePath[markupFile];

    const fileHasError = !!parsingErrorReports || !!validationError;

    test(`the file ${sanitizedFilename} should have errors`, () => {
      expect(fileHasError).toBe(true);
    });

    if (parsingErrorReports) {
      test(`the parsing error reports for ${sanitizedFilename} match the snapshot`, () => {
        expect(JSON.stringify(parsingErrorReports, null, 2)).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/authoringMistakes/errorsByFilename/${sanitizedFilename}/parsingErrors.snap.json`
        );
      });
    }

    if (validationError) {
      test(`the validation error for ${sanitizedFilename} matches the snapshot`, () => {
        expect(validationError).toMatchFileSnapshot(
          `${SNAPSHOTS_DIR}/authoringMistakes/errorsByFilename/${sanitizedFilename}/validationErrors.snap.txt`
        );
      });
    }
  });
});
