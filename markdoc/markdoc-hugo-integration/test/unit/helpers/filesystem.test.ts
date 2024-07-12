import { findInDir } from '../../../src/helpers/filesystem';
import { describe, test, expect } from 'vitest';
import { VALID_CONTENT_DIR, SNAPSHOTS_DIR } from '../../constants';

describe('Filesystem helpers', () => {
  test('findInDir', () => {
    const files = findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
    expect(files.length).toBe(2);

    const sanitizedFilenames = files.map((filename) =>
      filename.replace(VALID_CONTENT_DIR, '')
    );
    expect(JSON.stringify(sanitizedFilenames)).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/unitTestResults/findInDir.json'
    );
  });
});
