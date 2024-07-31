import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { ResolvedPagePrefs, ResolvedPagePref } from '../schemas/resolvedPagePrefs';
import {
  PagePrefsConfig,
  PagePrefConfig,
  MinifiedPagePrefsConfig,
  MinifiedPagePrefConfig
} from '../schemas/yaml/frontMatter';
import {
  MinifiedPrefOptionsConfig,
  PrefOptionsConfig
} from '../schemas/yaml/prefOptions';

/**
 * Functions necessary for rendering
 * at both compile time and in the client on selection change.
 * Not packaged as a class to avoid unnecessary bundle size increase.
 *
 * IMPORTANT:
 * Because this code must run on both the server and the client,
 * it cannot contain or import anything containing features unique to Node
 * (for example, file system access), or esbuild will fail to bundle it
 * for the client.
 */

// -----------------------------------------------------------

/**
 * Resolve the page preferences object that is used
 * to populate the content filtering UI (AKA the chooser),
 * replacing any placeholders with actual values.
 */
export function resolvePagePrefs(p: {
  pagePrefsConfig: PagePrefsConfig;
  prefOptionsConfig: PrefOptionsConfig;
  valsByPrefId: Record<string, string>;
}): ResolvedPagePrefs {
  const resolvedPagePrefs: ResolvedPagePrefs = {};

  p.pagePrefsConfig.forEach((prefConfig) => {
    // If the options source contains a placeholder, resolve it
    const prefConfigDup = resolvePrefOptionsSource({
      pagePrefConfig: prefConfig,
      valsByPrefId: p.valsByPrefId
    });

    // Update the value for the preference,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      prefConfigDup.default_value ||
      p.prefOptionsConfig[prefConfigDup.options_source].find((option) => option.default)!
        .identifier;

    const possibleValues = p.prefOptionsConfig[prefConfigDup.options_source].map(
      (option) => option.identifier
    );
    let currentValue = p.valsByPrefId[prefConfigDup.identifier];
    if (currentValue && !possibleValues.includes(currentValue)) {
      currentValue = defaultValue;
    }

    // Add the resolved pref to the returned object
    const resolvedPref: ResolvedPagePref = {
      identifier: prefConfigDup.identifier,
      displayName: prefConfigDup.display_name,
      defaultValue,
      currentValue,
      options: p.prefOptionsConfig[prefConfigDup.options_source].map((option) => ({
        id: option.identifier,
        displayName: option.display_name
      }))
    };

    resolvedPagePrefs[prefConfigDup.identifier] = resolvedPref;
  });

  return resolvedPagePrefs;
}

export function resolveMinifiedPagePrefs(p: {
  pagePrefsConfig: MinifiedPagePrefsConfig;
  prefOptionsConfig: MinifiedPrefOptionsConfig;
  valsByPrefId: Record<string, string>;
}): ResolvedPagePrefs {
  const resolvedPagePrefs: ResolvedPagePrefs = {};

  p.pagePrefsConfig.forEach((prefConfig) => {
    // If the options source contains a placeholder, resolve it
    const prefConfigDup = resolveMinifiedPrefOptionsSource({
      pagePrefConfig: prefConfig,
      valsByPrefId: p.valsByPrefId
    });

    // Update the value for the preference,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      prefConfigDup.d ||
      p.prefOptionsConfig[prefConfigDup.o].find((option) => option.d)!.i;

    const possibleValues = p.prefOptionsConfig[prefConfigDup.o].map((option) => option.i);
    let currentValue = p.valsByPrefId[prefConfigDup.i];
    if (currentValue && !possibleValues.includes(currentValue)) {
      currentValue = defaultValue;
    }

    // Add the resolved pref to the returned object
    const resolvedPref: ResolvedPagePref = {
      identifier: prefConfigDup.i,
      displayName: prefConfigDup.n,
      defaultValue,
      currentValue,
      options: p.prefOptionsConfig[prefConfigDup.o].map((option) => ({
        id: option.i,
        displayName: option.n
      }))
    };

    resolvedPagePrefs[prefConfigDup.i] = resolvedPref;
  });

  return resolvedPagePrefs;
}

export function resolveMinifiedPrefOptionsSource(p: {
  pagePrefConfig: MinifiedPagePrefConfig;
  valsByPrefId: Record<string, string>;
}): MinifiedPagePrefConfig {
  // Make a copy in order to preserve the placeholders
  // for future use
  const prefConfigDup = { ...p.pagePrefConfig };

  // Replace any placeholder in the options source with the selected value
  if (GLOBAL_PLACEHOLDER_REGEX.test(prefConfigDup.o)) {
    // Resolve the options source
    prefConfigDup.o = prefConfigDup.o.replace(
      GLOBAL_PLACEHOLDER_REGEX,
      (_match: string, placeholder: string) => {
        return p.valsByPrefId[placeholder.toLowerCase()];
      }
    );
  }

  return prefConfigDup;
}

/**
 * Resolve any placeholders in the options source of a page preference.
 * For example, if the options source is "<COLOR>_<FINISH>_paint_options",
 * and the values of the dependencies are { color: 'red', finish: 'gloss' },
 * the resolved options source would be "red_gloss_paint_options".
 *
 * @param p The page preference configuration object and the selected values by preference ID.
 * @returns A copy of the page preference configuration object with any placeholders in the options source resolved.
 */
export function resolvePrefOptionsSource(p: {
  pagePrefConfig: PagePrefConfig;
  valsByPrefId: Record<string, string>;
}): PagePrefConfig {
  // Make a copy in order to preserve the placeholders
  // for future use
  const prefConfigDup = { ...p.pagePrefConfig };

  // Replace any placeholder in the options source with the selected value
  if (GLOBAL_PLACEHOLDER_REGEX.test(prefConfigDup.options_source)) {
    // Resolve the options source
    prefConfigDup.options_source = prefConfigDup.options_source.replace(
      GLOBAL_PLACEHOLDER_REGEX,
      (_match: string, placeholder: string) => {
        return p.valsByPrefId[placeholder.toLowerCase()];
      }
    );
  }

  return prefConfigDup;
}
