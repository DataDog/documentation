import { describe, test, expect } from 'vitest';
import { pruneManifestForClient } from '../../../src';
import { paintColorsManifest } from '../../config/mocks/valid/paintColorsData/filtersManifest';
import { clientSidePaintColorsManifest } from '../../config/mocks/valid/paintColorsData/clientSideFiltersManifest';

describe('pruneManifestForClient', () => {
  test('correctly prunes the manifest', () => {
    const prunedManifest = pruneManifestForClient(paintColorsManifest);

    console.log('pruned manifest', JSON.stringify(prunedManifest, null, 2));
    expect(prunedManifest).toEqual(clientSidePaintColorsManifest);
  });
});
