import { Frontmatter } from '../prefs_processing/schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../prefs_processing/schemas/yaml/prefOptions';
import {
  GLOBAL_PLACEHOLDER_REGEX,
  PLACEHOLDER_REGEX
} from '../prefs_processing/schemas/regexes';

export function validatePlaceholders(
  frontmatter: Frontmatter,
  prefOptionsConfig: PrefOptionsConfig
): void {
  if (!frontmatter.page_preferences) {
    return;
  }

  // Verify that each placeholder refers to a valid page preference ID.
  const validPrefIds: string[] = [];

  for (const fmPrefConfig of frontmatter.page_preferences) {
    const placeholderMatches =
      fmPrefConfig.options_source.match(GLOBAL_PLACEHOLDER_REGEX) || [];

    for (const placeholder of placeholderMatches) {
      const match = placeholder.match(PLACEHOLDER_REGEX);
      if (!match) {
        throw new Error(
          `Invalid placeholder found in options_source: ${fmPrefConfig.options_source}`
        );
      }

      const referencedId = match[1].toLowerCase();
      if (!validPrefIds.includes(referencedId)) {
        throw new Error(
          `Placeholder ${match[0]} does not refer to a valid page preference identifier. Make sure that '${referencedId}' is spelled correctly, and that the '${referencedId}' parameter is defined in the page_preferences list before it is referenced in ${match[0]}.`
        );
      }
    }

    // add this pref ID to the list of valid pref IDs
    // that may be referenced by placeholders later in the list
    validPrefIds.push(fmPrefConfig.identifier);
  }

  const validValuesByOptionsSetId: Record<string, string[]> = {};
  const optionsSetIdsByPrefId: Record<string, string> = {};

  // verify that all possible options_source identifiers are valid
  for (const fmPrefConfig of frontmatter.page_preferences) {
    const placeholderMatches = fmPrefConfig.options_source.match(
      GLOBAL_PLACEHOLDER_REGEX
    );

    // if this options_source does not contain any placeholders,
    // it should be a valid options set ID
    if (!placeholderMatches) {
      if (!prefOptionsConfig[fmPrefConfig.options_source]) {
        throw new Error(
          `Invalid options_source found in page_preferences: ${fmPrefConfig.options_source}`
        );
      }
      validValuesByOptionsSetId[fmPrefConfig.options_source] =
        prefOptionsConfig[fmPrefConfig.options_source].map(
          (option) => option.identifier
        );

      optionsSetIdsByPrefId[fmPrefConfig.identifier] =
        fmPrefConfig.options_source;
      continue;
    }

    // if placeholders are contained,
    // generate a list of all possible options sources
    const optionsSetIdSegments = fmPrefConfig.options_source.split('_');
    const cartesianInput: Array<Array<string>> = [];

    for (const segment of optionsSetIdSegments) {
      if (segment.match(PLACEHOLDER_REGEX)) {
        const referencedPrefId = segment.slice(1, -1).toLowerCase();
        console.log('referencedPrefId', referencedPrefId);
        const referencedOptionsSetId = optionsSetIdsByPrefId[referencedPrefId];
        console.log('referencedOptionsSetId', referencedOptionsSetId);
        cartesianInput.push(validValuesByOptionsSetId[referencedOptionsSetId]);
      } else {
        cartesianInput.push([segment]);
      }
    }

    console.log('cartesianInput', JSON.stringify(cartesianInput, null, 2));

    const loopOver = (arr: any[], str: string = '', final: any[] = []) => {
      if (arr.length > 1) {
        arr[0].forEach((v: string) =>
          loopOver(arr.slice(1), str + (str === '' ? '' : '_') + v, final)
        );
      } else {
        arr[0].forEach((v: string) =>
          final.push(str + (str === '' ? '' : '_') + v)
        );
      }
      return final;
    };

    const potentialOptionsSetIds = loopOver(cartesianInput);

    console.log(
      'potentialOptionsSetIds',
      JSON.stringify(potentialOptionsSetIds, null, 2)
    );

    // validate that all potential options set IDs are valid
    for (const potentialOptionsSetId of potentialOptionsSetIds) {
      if (!prefOptionsConfig[potentialOptionsSetId]) {
        throw new Error(
          `Invalid options_source could be yielded by the placeholders in ${fmPrefConfig.options_source}: An options source with the ID '${potentialOptionsSetId}' does not exist.`
        );
      }
      validValuesByOptionsSetId[potentialOptionsSetId] = prefOptionsConfig[
        potentialOptionsSetId
      ].map((option) => option.identifier);
    }
  }
}
