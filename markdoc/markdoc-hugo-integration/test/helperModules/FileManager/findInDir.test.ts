import { FileManager } from '../../../src/helperModules/FileManager';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR, SNAPSHOTS_DIR } from '../../config/constants';

describe('FileManager.findInDir', () => {
  test('finds the .mdoc files in the valid site', () => {
    const files = FileManager.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
    expect(files.length).toBe(2);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );
    expect(JSON.stringify(sanitizedFilenames)).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/helperModules/FileManager/findInDir.snap.json'
    );
  });
});
