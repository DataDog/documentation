import { describe, test, expect } from 'vitest';
import { FileParser } from '../../src/helperModules/FileParser';
import { FileNavigator } from '../../src/helperModules/FileNavigator';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_PREF_OPTIONS_DIR
} from '../config/constants';
import { buildRenderableTree } from '../../src/helperModules/treeManagement';
import { ConfigProcessor } from '../../src/helperModules/ConfigProcessor';

describe('treeManagement', () => {
  const markdocFiles = FileNavigator.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
  const prefOptionsConfig =
    ConfigProcessor.loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');
    const parsedFile = FileParser.parseMdocFile(markdocFile, VALID_PARTIALS_DIR);
    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      parsedFile.frontmatter,
      prefOptionsConfig
    );

    test(`builds a renderable tree for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
      const tree = buildRenderableTree({
        parsedFile,
        prefOptionsConfig,
        defaultValsByPrefId
      });

      expect(JSON.stringify(tree, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/renderableTree.snap.json`
      );
    });
  });
});
