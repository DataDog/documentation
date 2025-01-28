import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../../src/helperModules/MdocFileParser';
import { PageBuilder } from '../../../src/helperModules/PageBuilder';
import { buildFiltersManifest, loadCustomizationConfig } from 'cdocs-data';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_FILTERS_CONFIG_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';
import { mockHugoGlobalConfig, mockPageConfig } from '../../mocks/valid/hugoConfig';

describe('PageBuilder.build', () => {
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc.md';
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: VALID_FILTERS_CONFIG_DIR,
    langs: ['en']
  });

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');

  const parsedFile = MdocFileParser.parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });

  const filtersManifest = buildFiltersManifest({
    frontmatter: parsedFile.frontmatter,
    customizationConfig: customizationConfigByLang['en']
  });

  const { html } = PageBuilder.build({
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
