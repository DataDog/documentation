import { describe, test, expect } from 'vitest';
import { pruneManifestForClient } from '../../src';
import { paintColorsManifest } from '../config/mocks/valid/paintColors/filtersManifest';
import { clientSidePaintColorsManifest } from '../config/mocks/valid/paintColors/clientSideFiltersManifest';

describe('pruneManifestForClient', () => {
  test('correctly prunes the manifest', () => {
    const prunedManifest = pruneManifestForClient(paintColorsManifest);
    expect(prunedManifest).toEqual(clientSidePaintColorsManifest);
  });
});
