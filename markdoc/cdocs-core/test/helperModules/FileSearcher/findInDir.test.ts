import { FileSearcher } from '../../../src/FileSearcher';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR } from '../../config/constants';

describe('FileSearcher.findInDir', () => {
  test('finds the .mdoc.md files in the valid site', () => {
    const files = FileSearcher.findInDir(VALID_CONTENT_DIR, /\.mdoc.md$/);
    expect(files.length).toBeGreaterThan(0);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );

    expect(sanitizedFilenames).toContain('/en/primary_colors.mdoc.md');
    expect(sanitizedFilenames).toContain('/en/traffic_light_colors.mdoc.md');
    expect(sanitizedFilenames).toContain('/en/elements/table.mdoc.md');
  });
});
