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
  const { hasErrors, parsingErrorReportsByFilePath, validationErrorsByFilePath } =
    integration.compile();

  test('the compilation should return false', () => {
    expect(hasErrors).toBe(true);
  });

  markupFiles.forEach((markupFile) => {
    const sanitizedFilename = markupFile.replace(siteDir, '');
    const parsingErrorReports = parsingErrorReportsByFilePath[markupFile];
    const validationErrors = validationErrorsByFilePath[markupFile];

    const fileHasError = !!parsingErrorReports || !!validationErrors;

    test(`the file ${sanitizedFilename} should have errors`, () => {
      expect(fileHasError).toBe(true);
    });
  });

  test('the error reports match the snapshot', () => {
    const errorReports = { ...parsingErrorReportsByFilePath };
    Object.keys(errorReports).forEach((filePath) => {
      const sanitizedFilePath = filePath.replace(siteDir, '');
      errorReports[sanitizedFilePath] = errorReports[filePath];
      delete errorReports[filePath];
    });
    expect(JSON.stringify(errorReports, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/authoringMistakes/errorReportsByFilePath.snap.json`
    );
  });

  test('the errors match the snapshot', () => {
    const errors = { ...validationErrorsByFilePath };
    Object.keys(errors).forEach((filePath) => {
      const sanitizedFilePath = filePath.replace(siteDir, '');
      errors[sanitizedFilePath] = errors[filePath].replace(siteDir, '');
      delete errors[filePath];
    });
    expect(JSON.stringify(errors, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/authoringMistakes/errorsByFilePath.snap.json`
    );
  });
});
