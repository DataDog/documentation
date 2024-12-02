import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

describe('MarkdocHugoIntegration (optimized Markdown output)', () => {
  const compiler = new MarkdocHugoIntegration({
    config: {
      baseSiteDir: VALID_SITE_DIR,
      env: 'development'
    }
  });

  const { compiledFilePaths, hasErrors } = compiler.compileMdocFiles();

  if (hasErrors) {
    compiler.logErrorsToConsole();
  }

  test('each compiled file matches the snapshot', () => {
    for (const compiledFilePath of compiledFilePaths) {
      const compiledContent = fs.readFileSync(compiledFilePath, 'utf8');
      const sanitizedFilename = compiledFilePath.replace(`${VALID_SITE_DIR}/content`, '');
      expect(compiledContent).toMatchFileSnapshot(
        SNAPSHOTS_DIR + '/validSite/content/' + sanitizedFilename
      );
    }
  });

  test('no errors occurred during compilation', () => {
    expect(hasErrors).toBe(false);
  });
});
