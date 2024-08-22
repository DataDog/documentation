/**
 * Functions for resolving prefs config into prefs content
 * (such as options displayed in the filtering UI).
 * The resolution steps must run every time the user
 * updates their preferences.
 *
 * Examples:
 * - Replace placeholders in an options source with actual values.
 * - Replace a previously chosen value with the default value
 *   if the chosen value is not valid.
 *
 * Organized as isolated functions to control bundle size.
 * This code must run on both the server and the client.
 * It cannot contain or import anything containing features unique to Node
 * (for example, file system access), or esbuild will fail to bundle it
 * for the client.
 */

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
  const valsByPrefIdDup = { ...p.valsByPrefId };

  p.pagePrefsConfig.forEach((prefConfig) => {
    // If the options source contains a placeholder, resolve it
    const prefConfigDup = resolvePrefOptionsSource({
      pagePrefConfig: prefConfig,
      valsByPrefId: valsByPrefIdDup
    });

    // Update the value for the preference,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      prefConfigDup.default_value ||
      p.prefOptionsConfig[prefConfigDup.options_source].find((option) => option.default)!
        .id;

    const possibleValues = p.prefOptionsConfig[prefConfigDup.options_source].map(
      (option) => option.id
    );
    let currentValue = p.valsByPrefId[prefConfigDup.id];
    if (currentValue && !possibleValues.includes(currentValue)) {
      currentValue = defaultValue;
      valsByPrefIdDup[prefConfigDup.id] = defaultValue;
    }

    // Add the resolved pref to the returned object
    const resolvedPref: ResolvedPagePref = {
      id: prefConfigDup.id,
      displayName: prefConfigDup.display_name,
      defaultValue,
      currentValue,
      options: p.prefOptionsConfig[prefConfigDup.options_source].map((option) => ({
        id: option.id,
        displayName: option.display_name
      }))
    };

    resolvedPagePrefs[prefConfigDup.id] = resolvedPref;
  });

  return resolvedPagePrefs;
}

export function resolveMinifiedPagePrefs(p: {
  pagePrefsConfig: MinifiedPagePrefsConfig;
  prefOptionsConfig: MinifiedPrefOptionsConfig;
  valsByPrefId: Record<string, string>;
}): ResolvedPagePrefs {
  const resolvedPagePrefs: ResolvedPagePrefs = {};
  // Make a copy of the selected values,
  // so we can update a value to the default
  // if the incoming value is invalid
  const valsByPrefIdDup = { ...p.valsByPrefId };

  p.pagePrefsConfig.forEach((prefConfig) => {
    // If the options source contains a placeholder, resolve it
    const prefConfigDup = resolveMinifiedPrefOptionsSource({
      pagePrefConfig: prefConfig,
      valsByPrefId: valsByPrefIdDup
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
      valsByPrefIdDup[prefConfigDup.i] = defaultValue;
    }

    // Add the resolved pref to the returned object
    const resolvedPref: ResolvedPagePref = {
      id: prefConfigDup.i,
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
  // pagePrefsConfig: MinifiedPagePrefsConfig;
  valsByPrefId: Record<string, string>;
  // prefOptionsConfig: MinifiedPrefOptionsConfig;
}): MinifiedPagePrefConfig {
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
