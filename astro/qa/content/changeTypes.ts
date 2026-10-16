/**
 * Tags each `changed` finding with the kinds of change that explain it, so the
 * report can group findings like "Astro adds a default" across thousands of
 * rows. Each change type removes its part of the difference; whatever is
 * still different afterwards is `other`.
 *
 * Types run on the texts the diff was built from, which are after
 * `applyTextForms`, so Hugo's enum phrasing already matches Astro's.
 */
import type { ContentFinding } from "./alignUnits.ts";

interface Texts {
  hugo: string;
  astro: string;
}

export interface ChangeType {
  name: string;
  description: string;
  /** The texts with this change removed, or null if it doesn't apply. */
  remove: (texts: Texts) => Texts | null;
}

const defaultSentence = /\s?Default: \S+?\.(?=\s|$)/;
const readOnlySentence = /\s?Read-only\.(?=\s|$)/;
const deprecatedSentence = /\s?Deprecated\.(?=\s|$)/;
const allowedValuesSentence = /Allowed values: .*?\.(?=\s|$)/;

export const changeTypes: ChangeType[] = [
  {
    name: "astro-adds-default",
    description: "Astro adds a `Default: x.` sentence that Hugo lacks.",
    remove: (texts) => removeFromAstroOnly(texts, defaultSentence),
  },
  {
    name: "astro-adds-read-only",
    description: "Astro adds `Read-only.`, which Hugo lacks.",
    remove: (texts) => removeFromAstroOnly(texts, readOnlySentence),
  },
  {
    name: "deprecated-marker-differs",
    description: "One side marks the field deprecated and the other doesn't.",
    remove: ({ hugo, astro }) => {
      const hugoHasMarker = deprecatedSentence.test(hugo);
      if (hugoHasMarker === deprecatedSentence.test(astro)) return null;
      return hugoHasMarker
        ? { hugo: hugo.replace(deprecatedSentence, ""), astro }
        : { hugo, astro: astro.replace(deprecatedSentence, "") };
    },
  },
  {
    name: "enum-values-differ",
    description: "The two sides list different enum values.",
    remove: ({ hugo, astro }) => {
      const hugoValues = hugo.match(allowedValuesSentence)?.[0];
      const astroValues = astro.match(allowedValuesSentence)?.[0];
      if (!hugoValues || !astroValues || hugoValues === astroValues)
        return null;
      return {
        hugo: hugo.replace(allowedValuesSentence, ""),
        astro: astro.replace(allowedValuesSentence, ""),
      };
    },
  },
];

export const otherChangeType = "other";

export function changeTypesOf(finding: ContentFinding): string[] {
  let texts = comparedTextsOf(finding);
  const names: string[] = [];
  for (const changeType of changeTypes) {
    if (isSame(texts)) break;
    const remaining = changeType.remove(texts);
    if (!remaining) continue;
    names.push(changeType.name);
    texts = remaining;
  }
  if (!isSame(texts)) names.push(otherChangeType);
  return names;
}

/** Tags every `changed` finding; other findings pass through. */
export function withChangeTypes(findings: ContentFinding[]): ContentFinding[] {
  return findings.map((finding) =>
    finding.kind === "changed"
      ? { ...finding, changeTypes: changeTypesOf(finding) }
      : finding,
  );
}

function removeFromAstroOnly(texts: Texts, sentence: RegExp): Texts | null {
  if (!sentence.test(texts.astro) || sentence.test(texts.hugo)) return null;
  return { hugo: texts.hugo, astro: texts.astro.replace(sentence, "") };
}

function comparedTextsOf(finding: ContentFinding): Texts {
  if (!finding.diff) {
    return { hugo: finding.hugoText ?? "", astro: finding.astroText ?? "" };
  }
  const sideText = (excludedOp: "insert" | "delete") =>
    finding
      .diff!.filter((part) => part.op !== excludedOp)
      .map((part) => part.text)
      .join(" ");
  return { hugo: sideText("insert"), astro: sideText("delete") };
}

function isSame({ hugo, astro }: Texts): boolean {
  const collapse = (text: string) => text.replace(/\s+/g, " ").trim();
  return collapse(hugo) === collapse(astro);
}
