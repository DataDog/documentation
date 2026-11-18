/**
 * The plaintext version of the Cdocs filter bar.
 *
 * Plaintext includes only one variant, so an agent needs another way to find
 * the others. This lists every shown filter's options as links to their
 * plaintext variants, says what each one contains, and marks the variant
 * that's shown.
 */
import { rewriteInternalDocLink } from "@lib/plaintext/rewriteDocLink";
import type { CdocsFilterLinks, CdocsVariantLabel } from "../cdocsPages";

// MISSING_TRANSLATION_LABEL: the variant list text is not in the i18n file yet.
const INTRO =
  "This page has a version for each combination of the filters below.";
const OUTRO = "To read another version, follow its link.";
const CURRENT_OPTION_SUFFIX = "(this version)";

/** Markdown for the variant list, ending in a newline, or "" with no filters. */
export function formatVariantList(filterLinks: CdocsFilterLinks[]): string {
  if (filterLinks.length === 0) return "";

  const currentOption = filterLinks[0].options.find(
    (option) => option.isSelected,
  );
  const intro = currentOption
    ? `${INTRO} This version is for ${describeLabels(currentOption.labels)}. ${OUTRO}`
    : `${INTRO} ${OUTRO}`;

  const sections = filterLinks.map((filter) => {
    const items = filter.options.map((option) =>
      option.isSelected
        ? `- ${option.label} ${CURRENT_OPTION_SUFFIX}`
        : `- [${option.label}](${rewriteInternalDocLink(option.url)}): ${describeLabels(option.labels)}`,
    );
    return [`**${filter.label}**`, "", ...items].join("\n");
  });

  return [intro, ...sections].join("\n\n") + "\n";
}

// Private functions ------------------------------------------------

/** "Language: Python, API: OpenTelemetry" */
function describeLabels(labels: CdocsVariantLabel[]): string {
  return labels
    .map((label) => `${label.traitLabel}: ${label.optionLabel}`)
    .join(", ");
}
