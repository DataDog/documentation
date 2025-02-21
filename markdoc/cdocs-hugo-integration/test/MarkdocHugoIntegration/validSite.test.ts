import { CdocsHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { SNAPSHOTS_DIR, VALID_SITE_DIR } from '../config/constants';
import fs from 'fs';

describe('CdocsHugoIntegration (optimized Markdown output)', async () => {
  const compiler = new CdocsHugoIntegration({
    config: {
      baseSiteDir: VALID_SITE_DIR,
      env: 'development'
    }
  });

  const { compiledFilePaths, hasErrors } = compiler.compileMdocFiles();
  // TODO: Prerender most of the author console once,
  // so this step runs fast enough to include in tests
  // await compiler.injectAuthorConsole();

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
});
