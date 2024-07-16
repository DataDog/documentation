import { describe, test, expect } from 'vitest';
import { FileParser } from '../../src/FileParser';
import { findInDir } from '../../src/helpers/filesystem';
import { ConfigProcessor } from '../../src/ConfigProcessor';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_PREF_OPTIONS_DIR,
  SNAPSHOTS_DIR
} from '../constants';

describe('buildRenderableTree processes valid input', () => {
  const markdocFiles = findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
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

    test(`it creates a renderable tree for ${sanitizedMarkdocFilename}`, () => {
      expect(renderableTree).toBeDefined();
      expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/valid/${sanitizedMarkdocFilename}/renderableTree.snap.json`
      );
    });
  });
});
