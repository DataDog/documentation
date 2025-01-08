import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../src/helperModules/MdocFileParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_FILTERS_CONFIG_DIR
} from '../config/constants';
import { buildRenderableTree } from '../../src/helperModules/treeManagement';
import { YamlConfigParser } from '../../src/helperModules/YamlConfigParser';
import { FiltersManifestBuilder } from '../../src/helperModules/FiltersManifestBuilder';

describe('treeManagement', () => {
  const LANG_DIR = VALID_FILTERS_CONFIG_DIR + '/en';
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc.md';
  const glossary = YamlConfigParser.loadGlossaryFromLangDir(LANG_DIR);
  const filterOptionsConfig = YamlConfigParser.loadFiltersConfigFromLangDir({
    dir: LANG_DIR,
    glossary
  });

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');
  const parsedFile = MdocFileParser.parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });

  const filtersManifest = FiltersManifestBuilder.build({
    frontmatter: parsedFile.frontmatter,
    filterOptionsConfig: filterOptionsConfig,
    glossary
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
