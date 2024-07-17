import { describe, test, expect } from 'vitest';
import { FileParser } from '../../../src/helperModules/FileParser';
import { FileManager } from '../../../src/helperModules/FileManager';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_PREF_OPTIONS_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';

describe('FileParser.buildRenderableTree', () => {
  const markdocFiles = FileManager.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
  const prefOptionsConfig =
    ConfigProcessor.loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');

    const { ast, frontmatter, partials, errorReports } = FileParser.parseMdocFile(
      markdocFile,
      VALID_PARTIALS_DIR
    );

    const renderableTree = FileParser.buildRenderableTree({
      ast,
      frontmatter,
      partials,
      prefOptionsConfig
    });

    test(`creates a renderable tree for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
      expect(renderableTree).toBeDefined();
      expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/${sanitizedMarkdocFilename}/renderableTree.snap.json`
      );
    });
  });
});
