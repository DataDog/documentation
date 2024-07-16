import MarkdocStaticCompiler, {
  Node,
  ValidationError,
  RenderableTreeNodes
} from 'markdoc-static-compiler';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Frontmatter, FrontmatterSchema } from '../schemas/yaml/frontMatter';

export type ParsingErrorReport = {
  error: ValidationError;
  file: string;
  lines: number[];
};

/**
 * Parse a Markdoc file and return its AST, frontmatter, partials,
 * and any validation errors encountered during parsing.
 */
export function parseMarkdocFile(markdocFile: string, partialsDir: string) {
  const markdocStr = fs.readFileSync(markdocFile, 'utf8');
  const ast = MarkdocStaticCompiler.parse(markdocStr);

  // Validate the frontmatter
  const frontmatter = yaml.load(ast.attributes.frontmatter) as Frontmatter;
  FrontmatterSchema.parse(frontmatter);

  // Collect all partials and build their ASTs
  const { partials, errorReports: partialErrors } = buildPartialASTs(ast, partialsDir);

  return {
    ast,
    frontmatter,
    partials,
    errorReports: [...extractErrors({ node: ast, file: markdocFile }), ...partialErrors]
  };
}

/**
 * Recursively build the ASTs of all partials required by the given AST.
 */
function buildPartialASTs(
  ast: Node,
  partialsDir: string
): { partials: Record<string, Node>; errorReports: ParsingErrorReport[] } {
  let partialAstsByFilename: Record<string, Node> = {};
  let errorReports: ParsingErrorReport[] = [];
  const partialPaths = extractPartialPaths(ast);
  partialPaths.forEach((partialPath) => {
    const partialFile = path.join(partialsDir, partialPath);
    const partialMarkupStr = fs.readFileSync(partialFile, 'utf8');
    const partialAst = MarkdocStaticCompiler.parse(partialMarkupStr);
    partialAstsByFilename[partialPath] = partialAst;
    partialAstsByFilename = {
      ...partialAstsByFilename,
      ...buildPartialASTs(partialAst, partialsDir).partials
    };
    errorReports = errorReports.concat(
      extractErrors({ node: partialAst, file: partialFile })
    );
  });
  return { partials: partialAstsByFilename, errorReports };
}

/**
 * Scan an AST for references to partial files,
 * and return a list of the paths to those partial files.
 */
export function extractPartialPaths(node: Node): string[] {
  let partialPaths: string[] = [];
  if (node.tag === 'partial') {
    const filePathAnnotations = node.annotations.filter(
      (annotation) => annotation.name === 'file' && annotation.type === 'attribute'
    );
    if (!filePathAnnotations) {
      throw new Error('Partial tag must have a file attribute');
    } else if (filePathAnnotations.length !== 1) {
      throw new Error('Partial tag must have exactly one file attribute');
    } else if (!filePathAnnotations[0].value) {
      throw new Error('Partial tag file attribute must have a value');
    }
    partialPaths.push(filePathAnnotations[0].value);
  }
  if (node.children.length) {
    for (const child of node.children) {
      partialPaths = partialPaths.concat(extractPartialPaths(child));
    }
  }
  return partialPaths;
}

/**
 * Extract all validation errors from an AST.
 */
export function extractErrors(p: { node: Node; file: string }): ParsingErrorReport[] {
  let errors: ParsingErrorReport[] = [];
  if (p.node.errors.length) {
    errors = errors.concat(
      p.node.errors.map((error) => ({ error, lines: p.node.lines, file: p.file }))
    );
  }
  if (p.node.children.length) {
    for (const child of p.node.children) {
      errors = errors.concat(extractErrors({ node: child, file: p.file }));
    }
  }
  return errors;
}

/**
 * Collect all variable identifiers referenced in the markup.
 * (The markup must first be parsed into a renderable tree.)
 */
export function collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
  let variableIdentifiers: string[] = [];

  if (!node) return variableIdentifiers;

  if (Array.isArray(node)) {
    node.forEach((n) => {
      const identifiers = collectVarIdsFromTree(n);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    });
  }

  if (typeof node !== 'object') return variableIdentifiers;

  if ('children' in node && node.children) {
    const identifiers = collectVarIdsFromTree(node.children);
    variableIdentifiers = variableIdentifiers.concat(identifiers);
  }

  if ('parameters' in node && node.parameters) {
    const identifiers = collectVarIdsFromTree(Object.values(node.parameters));
    variableIdentifiers = variableIdentifiers.concat(identifiers);
  }

  if (typeof node === 'object' && '$$mdtype' in node && node.$$mdtype === 'Variable') {
    // @ts-ignore, TODO:
    //
    // This only works if we assume that the variable path is one level deep,
    // which is what we're supporting for now. In other words, there cannot be a variable
    // like `$user.database.version` in the markup -- no nested data is allowed,
    // just variables like `$database`, and `$database_version`.
    //
    // We may wind up needing to support nested data because we may need to
    // group all pref variables under a parent $prefs object or similar.
    variableIdentifiers.push(node.path?.join('.'));
  }

  if (
    typeof node === 'object' &&
    '$$mdtype' in node &&
    node.$$mdtype === 'Tag' &&
    'if' in node
  ) {
    const identifiers = collectVarIdsFromTree(
      // @ts-ignore
      node.if
    );
    variableIdentifiers = variableIdentifiers.concat(identifiers);
  }

  // return the unique identifiers
  return Array.from(new Set(variableIdentifiers));
}
