/**
 * AST twin of `ApiChangelog.astro` and `ApiChangelogEntry.astro`.
 *
 * Builds the whole, unpaginated changelog as Markdoc nodes, grouped by date.
 * Plaintext has no filter tabs or pages, so every entry is listed.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import {
  Ast,
  bold,
  heading,
  inline,
  link,
  list,
  listItem,
  paragraphFromText,
  plaintext,
} from "@lib/plaintext/helpers";
import {
  CHANGELOG_BUCKET_LABELS,
  CHANGELOG_EMPTY_MESSAGE,
  CHANGELOG_INTRO,
  CHANGELOG_TITLE,
  groupByDate,
  splitInlineCode,
  type ResolvedChangelogEntry,
} from "@lib/api/changelog";

export function apiChangelogNodes(
  entries: ResolvedChangelogEntry[],
): MarkdocNode[] {
  const intro = [
    heading(1, CHANGELOG_TITLE),
    paragraphFromText(CHANGELOG_INTRO),
  ];
  if (entries.length === 0) {
    return [...intro, paragraphFromText(CHANGELOG_EMPTY_MESSAGE)];
  }
  const dateSections = groupByDate(entries).flatMap((group) => [
    heading(2, group.date),
    list("unordered", group.entries.map(entryListItem)),
  ]);
  return [...intro, ...dateSections];
}

function entryListItem(entry: ResolvedChangelogEntry): MarkdocNode {
  const productNode = entry.product.href
    ? link(entry.product.href, entry.product.name)
    : plaintext(entry.product.name);
  const children = [
    bold([plaintext(CHANGELOG_BUCKET_LABELS[entry.bucket])]),
    plaintext(": "),
    productNode,
    plaintext(": "),
    ...titleNodes(entry.title),
    ...operationsNodes(entry.operations),
  ];
  return listItem([inline(children)]);
}

function titleNodes(title: string): MarkdocNode[] {
  return splitInlineCode(title).map((part) =>
    part.isCode
      ? new Ast.Node("code", { content: part.text })
      : plaintext(part.text),
  );
}

function operationsNodes(
  operations: ResolvedChangelogEntry["operations"],
): MarkdocNode[] {
  if (operations.length === 0) return [];
  const operationNodes = operations.flatMap((operation, index) => {
    const code = new Ast.Node("code", { content: operation.operationId });
    const operationNode = operation.href
      ? new Ast.Node("link", { href: operation.href }, [code])
      : code;
    return index === 0 ? [operationNode] : [plaintext(", "), operationNode];
  });
  return [plaintext(" (Operations: "), ...operationNodes, plaintext(")")];
}
