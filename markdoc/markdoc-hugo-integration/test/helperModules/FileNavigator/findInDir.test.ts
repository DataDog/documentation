import { FileNavigator } from '../../../src/helperModules/FileNavigator';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR, SNAPSHOTS_DIR } from '../../config/constants';

describe('FileNavigator.findInDir', () => {
  test('finds the .mdoc files in the valid site', () => {
    const files = FileNavigator.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
    expect(files.length).toBeGreaterThan(0);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );

    expect(sanitizedFilenames).toContain('/primary_colors.mdoc');
    expect(sanitizedFilenames).toContain('/traffic_light_colors.mdoc');
    expect(sanitizedFilenames).toContain('/elements/table.mdoc');
  });
});
