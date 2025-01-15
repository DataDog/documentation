import { FileNavigator } from '../../../src/helperModules/FileNavigator';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR, SNAPSHOTS_DIR } from '../../config/constants';

describe('FileNavigator.findInDir', () => {
  test('finds the .mdoc.md files in the valid site', () => {
    const files = FileNavigator.findInDir(VALID_CONTENT_DIR, /\.mdoc.md$/);
    expect(files.length).toBeGreaterThan(0);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );

    expect(sanitizedFilenames).toContain('/en/primary_colors.mdoc.md');
    expect(sanitizedFilenames).toContain('/en/traffic_light_colors.mdoc.md');
    expect(sanitizedFilenames).toContain('/en/elements/table.mdoc.md');
  });
});
