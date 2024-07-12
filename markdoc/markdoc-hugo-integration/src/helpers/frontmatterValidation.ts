import { Frontmatter } from '../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { GLOBAL_PLACEHOLDER_REGEX, PLACEHOLDER_REGEX } from '../schemas/regexes';

/**
 * Validate the placeholders in the frontmatter of a Markdoc file:
 * - Each placeholder refers to a valid page preference ID
 * - Every possible options source is valid
 */
export function validatePlaceholders(
  frontmatter: Frontmatter,
  prefOptionsConfig: PrefOptionsConfig
): void {
  if (!frontmatter.page_preferences) {
    return;
  }

  validatePlaceholderReferences(frontmatter);

  // Verify that all possible options_source identifiers are valid

  const validValuesByOptionsSetId: Record<string, string[]> = {};
  const optionsSetIdsByPrefId: Record<string, string> = {};

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
      validValuesByOptionsSetId[fmPrefConfig.options_source] = prefOptionsConfig[
        fmPrefConfig.options_source
      ].map((option) => option.identifier);

      optionsSetIdsByPrefId[fmPrefConfig.identifier] = fmPrefConfig.options_source;
      continue;
    }

    // if placeholders are contained,
    // generate a list of all possible options sources
    const optionsSetIdSegments = fmPrefConfig.options_source.split('_');
    const possibleSegmentValues: Array<Array<string>> = [];

    for (const segment of optionsSetIdSegments) {
      if (segment.match(PLACEHOLDER_REGEX)) {
        const referencedPrefId = segment.slice(1, -1).toLowerCase();
        const referencedOptionsSetId = optionsSetIdsByPrefId[referencedPrefId];
        possibleSegmentValues.push(validValuesByOptionsSetId[referencedOptionsSetId]);
      } else {
        possibleSegmentValues.push([segment]);
      }
    }

    const potentialOptionsSetIds = buildSnakeCaseCombinations(possibleSegmentValues);

    // validate that all potential options set IDs are valid
    for (const potentialOptionsSetId of potentialOptionsSetIds) {
      if (!prefOptionsConfig[potentialOptionsSetId]) {
        throw new Error(
          `Invalid options_source could be populated by the placeholders in ${fmPrefConfig.options_source}: An options source with the ID '${potentialOptionsSetId}' does not exist.`
        );
      }
      validValuesByOptionsSetId[potentialOptionsSetId] = prefOptionsConfig[
        potentialOptionsSetId
      ].map((option) => option.identifier);
    }
  }
}

/**
 * Verify that each placeholder refers to a valid page pref ID.
 *
 * For example, if there is a <COLOR> placeholder, there must
 * also be a page pref with the identifier 'color'.
 */
function validatePlaceholderReferences(frontmatter: Frontmatter): void {
  if (!frontmatter.page_preferences) {
    return;
  }

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
}

/**
 * When given arrays of segments, such as
 * [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']],
 * generate all possible combinations of the segments in snake_case,
 * such as ['red_gloss_paint_options', 'red_matte_paint_options',
 * 'blue_gloss_paint_options', 'blue_matte_paint_options'].
 */
export function buildSnakeCaseCombinations(
  arr: any[],
  str: string = '',
  final: any[] = []
) {
  if (arr.length > 1) {
    arr[0].forEach((v: string) =>
      buildSnakeCaseCombinations(arr.slice(1), str + (str === '' ? '' : '_') + v, final)
    );
  } else {
    arr[0].forEach((v: string) => final.push(str + (str === '' ? '' : '_') + v));
  }
  return final;
}
