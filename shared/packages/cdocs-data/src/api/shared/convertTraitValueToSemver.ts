import { CDOCS_NOOP } from '../../schemas/constants';

/**
 * Convert a trait value that represents a semver,
 * such as 1_2_3 or gte_1_2_3, to a semver string,
 * such as 1.2.3 or >=1.2.3.
 */
export function convertTraitValueToSemver(traitValue: string) {
  if (traitValue === CDOCS_NOOP) {
    return CDOCS_NOOP;
  }

  const validTraitValueRegex = /^(gt_|gte_|lt_|lte_)?\d+_\d+_\d+$/;

  if (!validTraitValueRegex.test(traitValue)) {
    throw new Error(
      `[cdocs-data] Cannot convert trait value to semver: ${traitValue}. The trait value should have the format of 1_2_3, with prefixes such as gte_ allowed (such as lt_1_2_3).`,
    );
  }

  const traitValueParts = traitValue.split('_');

  // Detect and convert the prefix

  let prefix = '';

  const semverPrefixesByRawPrefix = {
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
  };

  if (traitValueParts.length === 4) {
    const rawPrefix = traitValueParts[0];
    if (traitValueParts[0] in semverPrefixesByRawPrefix) {
      prefix =
        semverPrefixesByRawPrefix[rawPrefix as keyof typeof semverPrefixesByRawPrefix];
    } else {
      throw new Error(
        `[cdocs-data] Invalid semver_meets traitValue prefix: ${rawPrefix}. Valid prefixes are: ${Object.keys(
          semverPrefixesByRawPrefix,
        ).join(', ')}.`,
      );
    }

    traitValueParts.shift(); // Remove the prefix
  }

  // Convert the remaining parts to a semver string

  return prefix + traitValueParts.join('.');
}
