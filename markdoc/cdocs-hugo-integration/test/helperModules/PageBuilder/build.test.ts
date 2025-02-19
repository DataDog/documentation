import { describe, test, expect } from 'vitest';
import { parseMdocFile } from '../../../src/fileParsing';
import { renderFile } from '../../../src/fileRendering';
import { buildFiltersManifest, loadCustomizationConfig } from 'cdocs-data';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_FILTERS_CONFIG_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';
import {
  mockHugoGlobalConfig,
  mockPageConfig
} from '../../config/mocks/valid/hugoConfig';

describe('renderFile', () => {
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc.md';
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: VALID_FILTERS_CONFIG_DIR,
    langs: ['en']
  });

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');

  const parsedFile = parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });

  const filtersManifest = buildFiltersManifest({
    frontmatter: parsedFile.frontmatter,
    customizationConfig: customizationConfigByLang['en']
  });

  const { html } = renderFile({
    parsedFile,
    hugoConfig: { global: mockHugoGlobalConfig, page: mockPageConfig },
    filtersManifest: filtersManifest
  });

  test(`builds a Markdown string for ${sanitizedMarkdocFilename} that matches the snapshot`, async () => {
    await expect(html).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/PageBuilder/${sanitizedMarkdocFilename}/compiledHtml.snap.html`
    );
  });
});
