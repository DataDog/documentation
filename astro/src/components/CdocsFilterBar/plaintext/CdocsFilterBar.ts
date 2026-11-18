/**
 * AST twin of `CdocsFilterBar.tsx`.
 *
 * Plaintext includes only one variant, and a `.md` reader has no pills to
 * click, so an agent needs another way to find the others. This lists every
 * shown filter's options as links to their plaintext variants, says what each
 * one contains, and marks the variant that's shown.
 */
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import {
  bold,
  inline,
  link,
  list,
  listItem,
  paragraph,
  paragraphFromText,
  plaintext,
} from "@lib/plaintext/helpers";
import { rewriteInternalDocLink } from "@lib/plaintext/rewriteDocLink";
import type {
  CdocsFilterLinks,
  CdocsFilterOptionLink,
} from "@lib/cdocs/filterOptionLinks";
import type { CdocsVariantLabel } from "@lib/cdocs/variants";

// MISSING_TRANSLATION_LABEL: the variant list text is not in the i18n file yet.
const INTRO =
  "This page has a version for each combination of the filters below.";
const OUTRO = "To read another version, follow its link.";
const CURRENT_OPTION_SUFFIX = "(this version)";

/** The variant list's block nodes, or none when no filter is shown. */
export function cdocsFilterBarNodes(
  filterLinks: CdocsFilterLinks[],
): MarkdocNode[] {
  if (filterLinks.length === 0) return [];

  const currentOption = filterLinks[0].options.find(
    (option) => option.isSelected,
  );
  const intro = currentOption
    ? `${INTRO} This version is for ${describeLabels(currentOption.labels)}. ${OUTRO}`
    : `${INTRO} ${OUTRO}`;

  return [
    paragraphFromText(intro),
    ...filterLinks.flatMap((filter) => [
      paragraph([inline([bold([plaintext(filter.label)])])]),
      list("unordered", filter.options.map(optionItem)),
    ]),
  ];
}

// Private functions ------------------------------------------------

/** "- Java (this version)", or "- [Python](…): Language: Python, API: …" */
function optionItem(option: CdocsFilterOptionLink): MarkdocNode {
  const children = option.isSelected
    ? [plaintext(`${option.label} ${CURRENT_OPTION_SUFFIX}`)]
    : [
        link(rewriteInternalDocLink(option.url), option.label),
        plaintext(`: ${describeLabels(option.labels)}`),
      ];
  return listItem([inline(children)]);
}

/** "Language: Python, API: OpenTelemetry" */
function describeLabels(labels: CdocsVariantLabel[]): string {
  return labels
    .map((label) => `${label.traitLabel}: ${label.optionLabel}`)
    .join(", ");
}
