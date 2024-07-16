import { describe, test, expect } from 'vitest';
import {
  parseMarkdocFile,
  collectVarIdsFromTree
} from '../../../../src/helpers/compilation';
import { findInDir } from '../../../../src/helpers/filesystem';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_PREF_OPTIONS_DIR
} from '../../../constants';
import { ConfigProcessor } from '../../../../src/ConfigProcessor';
import MarkdocStaticCompiler from 'markdoc-static-compiler';

describe('collectVarIdsFromTree', () => {
  const markdocFiles = findInDir(VALID_CONTENT_DIR, /\.mdoc$/);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');

    const { ast, frontmatter, partials, errorReports } = parseMarkdocFile(
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

    test(`it can collect the variables for ${sanitizedMarkdocFilename}`, () => {
      const varIds = collectVarIdsFromTree(renderableTree);
      expect(JSON.stringify(varIds, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/valid/${sanitizedMarkdocFilename}/referencedVarIds.snap.json`
      );
    });
  });
});
