import { describe, test, expect } from 'vitest';
import { FileParser } from '../../../src/helperModules/FileParser';
import { FileManager } from '../../../src/helperModules/FileManager';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_PREF_OPTIONS_DIR
} from '../../config/constants';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';
import MarkdocStaticCompiler from 'markdoc-static-compiler';

describe('FileParser.collectVarIdsFromTree', () => {
  const markdocFiles = FileManager.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');

    const { ast, frontmatter, partials, errorReports } = FileParser.parseMdocFile(
      markdocFile,
      VALID_PARTIALS_DIR
    );

    const prefOptionsConfig =
      ConfigProcessor.loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);

    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      frontmatter,
      prefOptionsConfig
    );

    const renderableTree = MarkdocStaticCompiler.transform(ast, {
      variables: defaultValsByPrefId,
      partials
    });

    test(`collects the variables for ${sanitizedMarkdocFilename}, which match the snapshot`, () => {
      const varIds = FileParser.collectVarIdsFromTree(renderableTree);
      expect(JSON.stringify(varIds, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/${sanitizedMarkdocFilename}/referencedVarIds.snap.json`
      );
    });
  });
});
