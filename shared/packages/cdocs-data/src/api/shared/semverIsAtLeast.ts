import gte from 'semver/functions/gte.js';
import minVersion from 'semver/ranges/min-version.js';
import { convertTraitValueToSemver } from './convertTraitValueToSemver.js';
import { CDOCS_NOOP } from '../../schemas/constants.js';

/**
 * Given a trait value that represents a semver,
 * such as 1_2_3 or gte_1_2_3, and a target semver,
 * such as 1, 1.2, or 1.2.3,
 * determine if the trait value meets or exceeds the target semver.
 */
export function semverIsAtLeast(p: { traitValue: string; target: string }): boolean {
  if (p.traitValue === CDOCS_NOOP) return false;
  const traitValueSemver = convertTraitValueToSemver(p.traitValue);
  const validTargetRegex = /^\d+(\.\d+){0,2}$/;
  const targetArgHint = `The target should be an exact numerical semver, such as 1, 1.2, or 1.2.3.`;

  if (!validTargetRegex.test(p.target)) {
    throw new Error(`[cdocs-data] Invalid target semver: ${p.target}. ${targetArgHint}`);
  }

  const minActualVersion = minVersion(traitValueSemver);
  if (!minActualVersion) {
    throw new Error(
      `[cdocs-data] Could not coerce the traitValue semver ${traitValueSemver} to a valid minimum actual version number.`,
    );
  }

  const minAcceptableVersion = minVersion(p.target);
  if (!minAcceptableVersion) {
    throw new Error(
      `[cdocs-data] Could not coerce the target semver ${p.target} to a valid minimum acceptable version number. ${targetArgHint}`,
    );
  }

  return gte(minActualVersion, minAcceptableVersion);
}
