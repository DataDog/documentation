import { PageDataManifestSchema } from './schemas/pageDataManifest';
import { PageDataManifest } from './schemas/pageDataManifest';
import { PagePrefsConfig } from './schemas/yaml/frontMatter';
import { PagePref, PagePrefs } from './schemas/pagePrefs';
import { GLOBAL_PLACEHOLDER_REGEX } from './schemas/regexes';

// TODO: Run some validations only in development mode
export function buildPageDataManifest(p: {
  pagePrefsConfig: PagePrefsConfig;
  pagePrefs: PagePrefs;
  url: URL;
}): PageDataManifest {
  const pageDataManifest: PageDataManifest = {
    resolvedUrl: JSON.parse(JSON.stringify(p.url.origin + p.url.pathname)) + '?',
    paramToVarMapping: {},
    valuesByParamName: {},
    selectionDisplayTextByParamName: {},
    pagePrefs: {}
  };

  // Assign values to preferences, and build the chooser data
  p.pagePrefsConfig.forEach((prefConfig) => {
    // Replace any bracketed placeholders with the actual pref value
    let prefIdentifier = JSON.parse(JSON.stringify(prefConfig.options_source));

    // TODO: Verify ALL possible outcomes for the placeholder -- all should be valid options sets.
    // Since the referenced pref could also have a placeholder, this should be a recursive process.

    prefIdentifier = prefIdentifier.replace(GLOBAL_PLACEHOLDER_REGEX, (_match: string, placeholder: string) => {
      const value = pageDataManifest.valuesByParamName[placeholder.toLowerCase()];
      if (!value) {
        throw new Error(
          `The placeholder <${placeholder}> is invalid. Make sure that '${placeholder}' is spelled correctly, and that the '${placeholder.toLowerCase()}' parameter is defined in the page_preferences list before it is referenced as <${placeholder}>.`
        );
      }
      return value;
    });

    // Validate that the preference exists and has a default value
    // TODO: This logic should be part of a separate validation process
    // that doesn't run every time the page is loaded
    const preference: PagePref = p.pagePrefs[prefIdentifier];
    if (!preference || !preference.default_value) {
      throw new Error(`No default value found for page preference ${prefIdentifier}`);
    }

    // If a VALID value is available in the provided URL, use it
    const optionId = p.url.searchParams.get(prefConfig.display_name);
    let resolvedValue: string;
    if (optionId && preference.options.map((option) => option.id).includes(optionId)) {
      resolvedValue = optionId;
      // Or, if a VALID local default value was set by the page, use that
    } else if (
      prefConfig.default_value &&
      preference.options.map((option) => option.id).includes(prefConfig.default_value)
    ) {
      resolvedValue = prefConfig.default_value;
      // Otherwise use the sitewide preference default value for the page preference
    } else {
      resolvedValue = preference.default_value;
    }

    pageDataManifest.valuesByParamName[prefConfig.display_name] = resolvedValue;

    // Populate the selection display text
    pageDataManifest.selectionDisplayTextByParamName[prefConfig.display_name] =
      preference.options.find((option) => option.id === resolvedValue)?.display_name || '';

    pageDataManifest.resolvedUrl += `${pageDataManifest.resolvedUrl.endsWith('?') ? '' : '&'}${
      prefConfig.display_name
    }=${pageDataManifest.valuesByParamName[prefConfig.display_name]}`;
    pageDataManifest.paramToVarMapping[prefConfig.display_name] = prefIdentifier;
    pageDataManifest.pagePrefs[prefIdentifier] = preference;
  });

  // Validate the page data manifest
  PageDataManifestSchema.parse(pageDataManifest);

  return pageDataManifest;
}
