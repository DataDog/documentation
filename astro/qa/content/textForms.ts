/**
 * Known differences in how the two sides *phrase* the same content, such as
 * Hugo's `Allowed enum values: a,b` and Astro's `Allowed values: a, b.`.
 *
 * Each form rewrites Hugo's text into Astro's phrasing before alignment, so
 * any real difference in the content shows up on its own. The rewrite is not
 * silent: every form applied on a page becomes one `structure` finding,
 * listing where it applied. Units keep their raw text in `sourceText`, and
 * findings quote that.
 */
import type { StructureFinding } from "./diffStructure.ts";
import type { ContentUnit } from "./extractUnits.ts";

export interface TextForm {
  name: string;
  description: string;
  /** Matches Hugo's phrasing. Match 0 is what the report shows. */
  hugo: RegExp;
  /** Astro's phrasing of a match. */
  toAstro: (...groups: string[]) => string;
}

export const textForms: TextForm[] = [
  {
    name: "enum-values-form",
    description:
      "Enum values: `Allowed enum values: a,b` in Hugo, `Allowed values: a, b.` in Astro.",
    hugo: /Allowed enum values: (\S+)$/,
    toAstro: (values) => `Allowed values: ${values.split(",").join(", ")}.`,
  },
  {
    name: "deprecated-marker-form",
    description:
      "Deprecation: a `DEPRECATED:` prefix in Hugo, a trailing `Deprecated.` in Astro.",
    hugo: /(?<=^|\| )DEPRECATED: (.*)$/,
    toAstro: (description) => `${description} Deprecated.`,
  },
  {
    name: "oneof-array-type-spacing",
    description:
      "Array-of-oneOf types: `[ <oneOf>]` in Hugo, `[<oneOf>]` in Astro.",
    hugo: /\[ (<[^>]+>)\]/,
    toAstro: (type) => `[${type}]`,
  },
];

const rewrittenKinds = new Set<ContentUnit["kind"]>(["tableRow", "prose"]);

interface FormUse {
  locationKeys: Set<string>;
  hugoExample: string;
  astroExample: string;
}

export function applyTextForms(
  hugoUnits: ContentUnit[],
  astroUnits: ContentUnit[],
): {
  hugoUnits: ContentUnit[];
  astroUnits: ContentUnit[];
  findings: StructureFinding[];
} {
  const usesByForm = new Map<string, FormUse>();
  const rewrittenHugoUnits = hugoUnits.map((unit) =>
    rewriteUnit(unit, usesByForm),
  );
  const findings = textForms.flatMap((form): StructureFinding[] => {
    const use = usesByForm.get(form.name);
    if (!use) return [];
    return [
      {
        kind: "structure",
        mapping: form.name,
        locationKeys: [...use.locationKeys].sort(),
        hugoElements: [use.hugoExample],
        astroElements: [use.astroExample],
      },
    ];
  });
  return { hugoUnits: rewrittenHugoUnits, astroUnits, findings };
}

function rewriteUnit(
  unit: ContentUnit,
  usesByForm: Map<string, FormUse>,
): ContentUnit {
  if (!rewrittenKinds.has(unit.kind)) return unit;
  let text = unit.text;
  for (const form of textForms) {
    const match = text.match(form.hugo);
    if (!match) continue;
    const astroPhrasing = form.toAstro(...match.slice(1));
    text = text.replace(form.hugo, () => astroPhrasing);
    recordUse(usesByForm, form, unit.locationKey, match[0], astroPhrasing);
  }
  return text === unit.text ? unit : { ...unit, text, sourceText: unit.text };
}

function recordUse(
  usesByForm: Map<string, FormUse>,
  form: TextForm,
  locationKey: string,
  hugoPhrasing: string,
  astroPhrasing: string,
): void {
  const use = usesByForm.get(form.name) ?? {
    locationKeys: new Set<string>(),
    hugoExample: hugoPhrasing,
    astroExample: astroPhrasing,
  };
  use.locationKeys.add(locationKey);
  usesByForm.set(form.name, use);
}
