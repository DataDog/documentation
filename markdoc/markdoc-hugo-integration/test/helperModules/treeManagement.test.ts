import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../src/helperModules/MdocFileParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_PREFS_CONFIG_DIR
} from '../config/constants';
import { buildRenderableTree } from '../../src/helperModules/treeManagement';
import { YamlConfigParser } from '../../src/helperModules/YamlConfigParser';

describe('treeManagement', () => {
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc';
  const prefOptionsConfig = YamlConfigParser.loadPrefOptionsFromDir(
    VALID_PREFS_CONFIG_DIR + '/en/option_sets'
  );

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');
  const parsedFile = MdocFileParser.parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });
  const defaultValsByPrefId = YamlConfigParser.getDefaultValuesByPrefId(
    parsedFile.frontmatter,
    prefOptionsConfig
  );

  test(`builds a renderable tree for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
    const tree = buildRenderableTree({
      parsedFile,
      prefOptionsConfig,
      defaultValsByPrefId,
      variables: {}
    });

    expect(JSON.stringify(tree, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/renderableTree.snap.json`
    );
  });
});
