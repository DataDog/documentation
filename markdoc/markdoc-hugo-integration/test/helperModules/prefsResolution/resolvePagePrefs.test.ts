import {
  paintColorsFrontmatter,
  paintColorsFilterOptionsConfig,
  paintColorsAllowlist
} from '../../mocks/valid/paintColorsConfig';
import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  resolvePageFilters,
  resolveMinifiedPageFilters
} from '../../../src/helperModules/filtersResolution';
import { ResolvedPageFiltersSchema } from '../../../src/schemas/pageFilters';

describe('SharedRenderer.resolvePageFilters', () => {
  const filtersManifest = YamlConfigParser.buildPageFiltersManifest({
    frontmatter: paintColorsFrontmatter,
    filterOptionsConfig: paintColorsFilterOptionsConfig,
    allowlist: paintColorsAllowlist
  });

  test('resolves to the correct values for the default selections', () => {
    const resolvedFilters = resolvePageFilters({
      filtersManifest,
      valsByFilterId: filtersManifest.defaultValsByFilterId
    });
    ResolvedPageFiltersSchema.parse(resolvedFilters);

    expect(resolvedFilters.color.currentValue).toEqual('blue');
    expect(resolvedFilters.finish.currentValue).toEqual('eggshell');
    expect(resolvedFilters.paint.currentValue).toEqual('elegant_royal');
    expect(resolvedFilters.paint.options.map((o) => o.id)).toEqual([
      'elegant_royal',
      'robins_egg'
    ]);
  });

  test('resolves to the correct values when selections are changed', () => {
    const filtersManifestDup = { ...filtersManifest };
    filtersManifestDup.defaultValsByFilterId.color = 'red';
    filtersManifestDup.defaultValsByFilterId.finish = 'gloss';

    const resolvedFilters = resolvePageFilters({
      filtersManifest: filtersManifestDup,
      valsByFilterId: filtersManifestDup.defaultValsByFilterId
    });
    ResolvedPageFiltersSchema.parse(resolvedFilters);

    expect(resolvedFilters.color.currentValue).toEqual('red');
    expect(resolvedFilters.finish.currentValue).toEqual('gloss');
    expect(resolvedFilters.paint.currentValue).toEqual('fire_engine');
    expect(resolvedFilters.paint.options.map((o) => o.id)).toEqual([
      'fire_engine',
      'crimson'
    ]);
  });

  test('resolves to the correct values using minified page filters', () => {
    const valsByFilterId = YamlConfigParser.getDefaultValuesByFilterId(
      paintColorsFrontmatter,
      paintColorsFilterOptionsConfig
    );

    const minifiedFilters = YamlConfigParser.minifyPageFiltersConfig(
      paintColorsFrontmatter.content_filters!
    );

    const minifiedFilterOptionsConfig = YamlConfigParser.minifyFilterOptionsConfig(
      paintColorsFilterOptionsConfig
    );

    const resolvedFilters = resolveMinifiedPageFilters({
      pageFiltersConfig: minifiedFilters,
      filterOptionsConfig: minifiedFilterOptionsConfig,
      valsByFilterId
    });
    ResolvedPageFiltersSchema.parse(resolvedFilters);

    expect(resolvedFilters.color.currentValue).toEqual('blue');
    expect(resolvedFilters.finish.currentValue).toEqual('eggshell');
    expect(resolvedFilters.paint.currentValue).toEqual('elegant_royal');
    expect(resolvedFilters.paint.options.map((o) => o.id)).toEqual([
      'elegant_royal',
      'robins_egg'
    ]);
  });
});
