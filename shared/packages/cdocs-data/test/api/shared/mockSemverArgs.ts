/**
 * None of these should ever occur in semver world,
 * but life is full of surprises.
 */
const strangeValues = [
  undefined,
  null,
  true,
  false,
  NaN,
  "",
  "alpha",
  "alpha123",
  0,
  "1-2",
  "1-2-3",
];

// Valid values for a trait intended to represent a semver.
export const validTraitValues = [
  "1_2_3",
  "gt_1_2_3",
  "gte_1_2_3",
  "lt_1_2_3",
  "lte_1_2_3",
  "5_0_0",
];

// Invalid values for a trait intended to represent a semver.
export const invalidTraitValues = [
  ...strangeValues,
  "1",
  "1.2",
  "1_2",
  "1.2.3",
  "1_2_a",
];

// Valid values for a semver comparison target.
export const validTargetValues = ["1", "1.2", "1.2.3"];

// Invalid values for a semver comparison target.
export const invalidTargetValues = [
  ...strangeValues,
  ...validTargetValues,
  "1.2.3a",
  "1.2.3-alpha",
  "~1.2.3",
  "^1.2.3",
  ">1.2.3",
  ">=1.2.3",
  "<1.2.3",
  "<=1.2.3",
  "1.2.3+build",
];
