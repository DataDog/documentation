import { describe, test, expect } from 'vitest';
import { parseMarkdocFile } from '../../../src/helpers/compilation';
import { findInDir } from '../../../src/helpers/filesystem';
import { VALID_CONTENT_DIR, VALID_PARTIALS_DIR, SNAPSHOTS_DIR } from '../../constants';

describe('parseMarkdocFile', () => {
  const markdocFiles = findInDir(VALID_CONTENT_DIR, /\.mdoc$/);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');
    const { ast, frontmatter } = parseMarkdocFile(markdocFile, VALID_PARTIALS_DIR);

    test(`creates an AST for ${sanitizedMarkdocFilename}`, () => {
      expect(ast).toBeDefined();
      expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/${sanitizedMarkdocFilename}/ast.json`
      );
    });

    test(`creates frontmatter for ${sanitizedMarkdocFilename}`, () => {
      expect(frontmatter).toBeDefined();
      expect(JSON.stringify(frontmatter, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/${sanitizedMarkdocFilename}/frontmatter.json`
      );
    });
  });
});
