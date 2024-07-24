import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { ResolvedPagePrefs, ResolvedPagePref } from '../schemas/resolvedPagePrefs';
import { PagePrefsConfig } from '../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';

/**
 * A module for functions necessary for rendering
 * at both compile time and in the client on selection change.
 *
 * IMPORTANT:
 * Because this code must run on both the server and the client,
 * it cannot contain or import anything containing features unique to Node
 * (for example, file system access), or esbuild will fail to bundle it
 * for the client.
 */
export class SharedRenderer {
  /**
   * Resolve the page preferences object that is used
   * to populate the content filtering UI (AKA the chooser),
   * replacing any placeholders with actual values.
   */
  static resolvePagePrefs(p: {
    pagePrefsConfig: PagePrefsConfig;
    prefOptionsConfig: PrefOptionsConfig;
    valsByPrefId: Record<string, string>;
  }): ResolvedPagePrefs {
    console.log('Resolving page prefs');
    const resolvedPagePrefs: ResolvedPagePrefs = {};

    p.pagePrefsConfig.forEach((prefConfig) => {
      console.log('options source: ', prefConfig.options_source);
      // Replace any placeholder in the options source with the selected value,
      // or the default value
      if (GLOBAL_PLACEHOLDER_REGEX.test(prefConfig.options_source)) {
        prefConfig.options_source = prefConfig.options_source.replace(
          GLOBAL_PLACEHOLDER_REGEX,
          (_match: string, placeholder: string) => {
            return p.valsByPrefId[placeholder.toLowerCase()];
          }
        );
      }
      console.log('options source after replacement: ', prefConfig.options_source);

      const resolvedPref: ResolvedPagePref = {
        identifier: prefConfig.identifier,
        displayName: prefConfig.display_name,
        defaultValue:
          prefConfig.default_value ||
          p.prefOptionsConfig[prefConfig.options_source].find((option) => option.default)!
            .identifier,
        options: p.prefOptionsConfig[prefConfig.options_source].map((option) => ({
          id: option.identifier,
          displayName: option.display_name
        }))
      };

      resolvedPagePrefs[prefConfig.identifier] = resolvedPref;
      console.log('Resolved pref: ', resolvedPref);
    });

    return resolvedPagePrefs;
  }
}
