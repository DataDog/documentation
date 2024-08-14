import { FileNavigator } from '../../../src/helperModules/FileNavigator';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR, SNAPSHOTS_DIR } from '../../config/constants';

describe('FileNavigator.findInDir', () => {
  test('finds the .mdoc files in the valid site', () => {
    const files = FileNavigator.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
    expect(files.length).toBe(9);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );
    expect(JSON.stringify(sanitizedFilenames)).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/helperModules/FileNavigator/findInDir.snap.json'
    );
  });
});
