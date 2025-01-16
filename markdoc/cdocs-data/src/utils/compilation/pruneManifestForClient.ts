import { FiltersManifest, ClientSideFiltersManifest } from '../../schemas/pageFilters';

/**
 * Convert a standard compile-time page filters manifest
 * to a lighter version to be used client-side.
 */
export function pruneManifestForClient(
  manifest: FiltersManifest,
): ClientSideFiltersManifest {
  const result: ClientSideFiltersManifest = {
    filtersByTraitId: {},
    defaultValsByTraitId: { ...manifest.defaultValsByTraitId },
    optionGroupsById: { ...manifest.optionGroupsById },
  };

  Object.keys(manifest.filtersByTraitId).forEach((traitId) => {
    const filter = manifest.filtersByTraitId[traitId];
    result.filtersByTraitId[traitId] = {
      config: { ...filter.config },
      defaultValsByOptionGroupId: { ...filter.defaultValsByOptionGroupId },
    };
  });

  return result;
}
