import { describe, test, expect } from 'vitest';
import { parseMarkdocFile } from '../../../../src/helpers/compilation';
import { findInDir } from '../../../../src/helpers/filesystem';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  MOCKS_DIR
} from '../../../constants';

describe('parseMarkdocFile processes valid input', () => {
  const markdocFiles = findInDir(VALID_CONTENT_DIR, /\.mdoc$/);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');
    const { ast, frontmatter, partials, errorReports } = parseMarkdocFile(
      markdocFile,
      VALID_PARTIALS_DIR
    );

    test(`it creates an AST for ${sanitizedMarkdocFilename}`, () => {
      expect(ast).toBeDefined();
      expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/valid/${sanitizedMarkdocFilename}/ast.json`
      );
    });

    test(`it creates frontmatter for ${sanitizedMarkdocFilename}`, () => {
      expect(frontmatter).toBeDefined();
      expect(JSON.stringify(frontmatter, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/valid/${sanitizedMarkdocFilename}/frontmatter.json`
      );
    });

    test(`it creates partials for ${sanitizedMarkdocFilename}`, () => {
      expect(partials).toBeDefined();
      expect(JSON.stringify(partials, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/valid/${sanitizedMarkdocFilename}/partials.json`
      );
    });

    test(`it does not encounter any errors for ${sanitizedMarkdocFilename}`, () => {
      expect(errorReports).toBeDefined();
      expect(errorReports.length).toEqual(0);
    });
  });
});

describe('parseMarkdocFile processes invalid input', () => {
  const invalidMarkupDir = MOCKS_DIR + '/invalid_markdoc_files';
  const invalidMarkdocFiles = findInDir(invalidMarkupDir, /\.mdoc$/);

  invalidMarkdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(invalidMarkupDir, '');
    const { ast, frontmatter, partials, errorReports } = parseMarkdocFile(
      markdocFile,
      VALID_PARTIALS_DIR
    );

    test(`it creates an AST for ${sanitizedMarkdocFilename}`, () => {
      expect(ast).toBeDefined();
      expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/invalid/${sanitizedMarkdocFilename}/ast.json`
      );
    });

    test(`it creates frontmatter for ${sanitizedMarkdocFilename}`, () => {
      expect(frontmatter).toBeDefined();
      expect(JSON.stringify(frontmatter, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/invalid/${sanitizedMarkdocFilename}/frontmatter.json`
      );
    });

    test(`it creates partials for ${sanitizedMarkdocFilename}`, () => {
      expect(partials).toBeDefined();
      expect(JSON.stringify(partials, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/invalid/${sanitizedMarkdocFilename}/partials.json`
      );
    });

    test(`it encounters errors for the invalid markup file ${sanitizedMarkdocFilename}`, () => {
      expect(errorReports).toBeDefined();
      expect(errorReports.length).toBeGreaterThan(0);
      expect(JSON.stringify(errorReports, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/compilationByFilename/invalid/${sanitizedMarkdocFilename}/errorReports.json`
      );
    });
  });
});
