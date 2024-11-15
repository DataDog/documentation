import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig,
  paintColorsAllowlist
} from '../../mocks/valid/paintColorsConfig';
import { describe, test, expect } from 'vitest';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  resolvePagePrefs,
  resolveMinifiedPagePrefs
} from '../../../src/helperModules/prefsResolution';
import { ResolvedPagePrefsSchema } from '../../../src/schemas/pageFilters';

describe('SharedRenderer.resolvePagePrefs', () => {
  const prefsManifest = YamlConfigParser.buildPagePrefsManifest({
    frontmatter: paintColorsFrontmatter,
    prefOptionsConfig: paintColorsPrefOptionsConfig,
    allowlist: paintColorsAllowlist
  });

  test('resolves to the correct values for the default selections', () => {
    const resolvedPagePrefs = resolvePagePrefs({
      prefsManifest,
      valsByPrefId: prefsManifest.defaultValsByPrefId
    });
    ResolvedPagePrefsSchema.parse(resolvedPagePrefs);

    expect(resolvedPagePrefs.color.currentValue).toEqual('blue');
    expect(resolvedPagePrefs.finish.currentValue).toEqual('eggshell');
    expect(resolvedPagePrefs.paint.currentValue).toEqual('elegant_royal');
    expect(resolvedPagePrefs.paint.options.map((o) => o.id)).toEqual([
      'elegant_royal',
      'robins_egg'
    ]);
  });

  test('resolves to the correct values when selections are changed', () => {
    const prefsManifestDup = { ...prefsManifest };
    prefsManifestDup.defaultValsByPrefId.color = 'red';
    prefsManifestDup.defaultValsByPrefId.finish = 'gloss';

    const resolvedPagePrefs = resolvePagePrefs({
      prefsManifest: prefsManifestDup,
      valsByPrefId: prefsManifestDup.defaultValsByPrefId
    });
    ResolvedPagePrefsSchema.parse(resolvedPagePrefs);

    expect(resolvedPagePrefs.color.currentValue).toEqual('red');
    expect(resolvedPagePrefs.finish.currentValue).toEqual('gloss');
    expect(resolvedPagePrefs.paint.currentValue).toEqual('fire_engine');
    expect(resolvedPagePrefs.paint.options.map((o) => o.id)).toEqual([
      'fire_engine',
      'crimson'
    ]);
  });

  test('resolves to the correct values using minified page prefs', () => {
    const valsByPrefId = YamlConfigParser.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    const minifiedPagePrefs = YamlConfigParser.minifyPagePrefsConfig(
      paintColorsFrontmatter.page_preferences!
    );

    const minifiedPrefOptionsConfig = YamlConfigParser.minifyPrefOptionsConfig(
      paintColorsPrefOptionsConfig
    );

    const resolvedPagePrefs = resolveMinifiedPagePrefs({
      pagePrefsConfig: minifiedPagePrefs,
      prefOptionsConfig: minifiedPrefOptionsConfig,
      valsByPrefId
    });
    ResolvedPagePrefsSchema.parse(resolvedPagePrefs);

    expect(resolvedPagePrefs.color.currentValue).toEqual('blue');
    expect(resolvedPagePrefs.finish.currentValue).toEqual('eggshell');
    expect(resolvedPagePrefs.paint.currentValue).toEqual('elegant_royal');
    expect(resolvedPagePrefs.paint.options.map((o) => o.id)).toEqual([
      'elegant_royal',
      'robins_egg'
    ]);
  });
});
