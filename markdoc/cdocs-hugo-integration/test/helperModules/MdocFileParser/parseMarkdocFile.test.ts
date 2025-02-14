import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../../src/MdocFileParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';

describe('FileParse.parseMdocFile', () => {
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc.md';

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');
  const { ast, frontmatter, partials, errors } = MdocFileParser.parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });

  test(`creates an AST for ${sanitizedMarkdocFilename} that matches the snapshot`, async () => {
    expect(ast).toBeDefined();
    await expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/ast.snap.json`
    );
  });

  test(`creates frontmatter for ${sanitizedMarkdocFilename} that matches the snapshot`, async () => {
    expect(frontmatter).toBeDefined();
    await expect(JSON.stringify(frontmatter, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/frontmatter.snap.json`
    );
  });

  test(`creates partials for ${sanitizedMarkdocFilename} that match the snapshot`, async () => {
    expect(partials).toBeDefined();
    await expect(JSON.stringify(partials, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/partials.snap.json`
    );
  });

  test(`does not encounter any errors for ${sanitizedMarkdocFilename}`, () => {
    expect(errors).toBeDefined();
    expect(errors.length).toEqual(0);
  });
});
