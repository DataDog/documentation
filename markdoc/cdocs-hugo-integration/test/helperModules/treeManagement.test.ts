import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../src/helperModules/MdocFileParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_FILTERS_CONFIG_DIR
} from '../config/constants';
import { buildRenderableTree } from '../../src/helperModules/rendering/treeManagement';
import { buildFiltersManifest, loadCustomizationConfig } from 'cdocs-data';

describe('treeManagement', () => {
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

  test(`builds a renderable tree for ${sanitizedMarkdocFilename} that matches the snapshot`, async () => {
    const { renderableTree } = buildRenderableTree({
      parsedFile,
      variables: {},
      filtersManifest
    });

    await expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/renderableTree.snap.json`
    );
  });
});
