import {
  Frontmatter,
  loadCustomizationConfig,
  buildFiltersManifest,
  resolveFilters,
} from '../../../src';

const CUSTOMIZATION_CONFIG_DIR = __dirname + '/customization_config';
const langs = ['en'];

const { customizationConfigByLang } = loadCustomizationConfig({
  configDir: CUSTOMIZATION_CONFIG_DIR,
  langs,
});

export const customizationConfig = customizationConfigByLang.en;

/**
 * Helper to build a manifest and resolve filters for given
 * frontmatter and trait values.
 */
export function buildAndResolve(
  frontmatter: Frontmatter,
  valsByTraitId: Record<string, string>,
) {
  const manifest = buildFiltersManifest({
    frontmatter,
    customizationConfig,
  });

  const resolved = resolveFilters({
    valsByTraitId: { ...manifest.defaultValsByTraitId, ...valsByTraitId },
    filtersManifest: manifest,
  });

  return { manifest, resolved };
}
