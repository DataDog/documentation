/**
 * AST twin of the `{% api-scopes /%}` component (`ApiScopesTable.astro`).
 *
 * Each scope group becomes an h3 followed by a Markdown table. The anchor
 * spans are dropped: plaintext has no element IDs to jump to.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { heading, mdLinkHref, tableMd } from "@lib/plaintext/helpers";
import { rewriteInternalDocLink } from "@lib/plaintext/rewriteDocLink";
import { DEFAULT_LOCALE, localizedHref, type Locale } from "@lib/i18n/locale";
import type {
  ScopeEndpoint,
  ScopeGroup,
  ScopeRow,
} from "@lib/api/scopesBuilder";

export interface ApiScopesTableOptions {
  /** Prefixes endpoint links, as the HTML table does. Defaults to English. */
  lang?: Locale;
  /** Astro's `site`, used to make endpoint links absolute. */
  site?: string | URL;
}

// MISSING_TRANSLATION_LABEL: localize the column headers once Hugo has i18n keys for them.
const COLUMN_HEADERS = [
  "Scope name",
  "Description",
  "Endpoints that require this scope",
];

/**
 * The endpoint's link, pointed at its operation page's `.md` twin. Done here
 * because the twin-transform path has no later pass that rewrites links.
 */
function endpointHref(
  endpoint: ScopeEndpoint,
  { lang = DEFAULT_LOCALE, site }: ApiScopesTableOptions,
): string {
  const href = localizedHref(lang, endpoint.href);
  return site ? mdLinkHref(href, site) : rewriteInternalDocLink(href);
}

/**
 * Cells are Markdown strings. `tableMd` parses each one and `format()` writes
 * it back out, so backslash escapes would not survive; the spec's summaries
 * carry no brackets or pipes.
 */
function scopeRowCells(
  scope: ScopeRow,
  options: ApiScopesTableOptions,
): string[] {
  const endpointLinks = scope.endpoints.map(
    (endpoint) => `[${endpoint.summary}](${endpointHref(endpoint, options)})`,
  );
  return [`\`${scope.name}\``, scope.description, endpointLinks.join("<br>")];
}

export function apiScopesTableNodes(
  groups: ScopeGroup[],
  options: ApiScopesTableOptions = {},
): MarkdocNode[] {
  return groups.flatMap((group) => [
    heading(3, group.heading),
    tableMd(
      COLUMN_HEADERS,
      group.scopes.map((scope) => scopeRowCells(scope, options)),
    ),
  ]);
}
