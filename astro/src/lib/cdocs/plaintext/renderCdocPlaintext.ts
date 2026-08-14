/**
 * Renders a cdoc (`.mdoc`) to plaintext Markdoc, resolved for a single set of
 * filter values.
 *
 * Pipeline: parse the body -> evaluate `if`/`else` and inline partials against
 * the resolved variables (see `filterMarkdocAst`) -> format the pruned AST back
 * to text. Because the input is already Markdoc, custom tags (`{% alert %}`,
 * fences, ...) round-trip through the formatter in the shape html-to-mdoc
 * produces, so no per-component plaintext code is needed.
 *
 * Pure when `resolvePartial` is injected, so it is unit-testable without disk
 * access; the `.md` route supplies a disk-backed resolver.
 */
import Markdoc from '@markdoc/markdoc';
import { buildPlaintextConfig } from './plaintextConfig';
import { processNodes, type PartialResolver } from './filterMarkdocAst';

const { parse, format, Ast } = Markdoc;

export interface RenderCdocPlaintextInput {
  /** The raw `.mdoc` body (frontmatter, if present, is ignored by parse). */
  body: string;
  /** Resolved trait values, e.g. { prog_lang: 'java', api_type: 'otel_api' }. */
  variables: Record<string, string>;
  /** Optional page title, emitted as a leading H1. */
  title?: string;
  /** Resolves `{% partial file=... /%}` refs to raw source. */
  resolvePartial?: PartialResolver;
}

export function renderCdocPlaintext(input: RenderCdocPlaintextInput): string {
  const { body, variables, title, resolvePartial } = input;

  const config = buildPlaintextConfig(variables);
  const ast = parse(body);
  const filtered = processNodes(
    ast.children ?? [],
    config,
    resolvePartial,
    new Set(),
  );

  const document = new Ast.Node('document', {}, filtered);
  // `orderedListMode: 'increment'` numbers ordered lists sequentially. Authors
  // typically write every item as `1.` (letting the HTML renderer auto-number);
  // without this, `format()` would emit a flat run of `1.`s in the plaintext.
  const formatted = format(document, { orderedListMode: 'increment' }).trim();

  const withTitle = title ? `# ${title}\n\n${formatted}` : formatted;
  // Collapse blank runs left where comment-only blocks were dropped.
  return withTitle.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
