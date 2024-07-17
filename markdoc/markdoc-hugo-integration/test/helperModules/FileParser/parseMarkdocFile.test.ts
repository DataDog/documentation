import { describe, test, expect } from 'vitest';
import { FileParser } from '../../../src/helperModules/FileParser';
import { FileManager } from '../../../src/helperModules/FileManager';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';

describe('FileParse.parseMdocFile', () => {
  const markdocFiles = FileManager.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');
    const { ast, frontmatter, partials, errorReports } = FileParser.parseMdocFile(
      markdocFile,
      VALID_PARTIALS_DIR
    );

    test(`creates an AST for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
      expect(ast).toBeDefined();
      expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/${sanitizedMarkdocFilename}/ast.snap.json`
      );
    });

    test(`creates frontmatter for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
      expect(frontmatter).toBeDefined();
      expect(JSON.stringify(frontmatter, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/${sanitizedMarkdocFilename}/frontmatter.snap.json`
      );
    });

    test(`creates partials for ${sanitizedMarkdocFilename} that match the snapshot`, () => {
      expect(partials).toBeDefined();
      expect(JSON.stringify(partials, null, 2)).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/validSite/${sanitizedMarkdocFilename}/partials.snap.json`
      );
    });

    test(`does not encounter any errors for ${sanitizedMarkdocFilename}`, () => {
      expect(errorReports).toBeDefined();
      expect(errorReports.length).toEqual(0);
    });
  });
});
