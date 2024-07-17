import MarkdocStaticCompiler, {
  Node,
  ValidationError,
  RenderableTreeNodes,
  RenderableTreeNode
} from 'markdoc-static-compiler';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Frontmatter, FrontmatterSchema } from '../schemas/yaml/frontMatter';
import { ConfigProcessor } from './ConfigProcessor';
import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';

export type ParsingErrorReport = {
  error: ValidationError;
  file: string;
  lines: number[];
};

/**
 * A module responsible for parsing Markdoc files into data structures
 * such as ASTs and RenderableTreeNodes,
 * extracting any validation errors encountered during parsing.
 */
export class FileParser {
  /**
   * Parse a Markdoc file and return its AST, frontmatter, partials,
   * and any validation errors encountered during parsing.
   *
   * @param markdocFile The path to the Markdoc file.
   * @param partialsDir The directory containing any partials required by the Markdoc file.
   * @returns An object containing the AST, frontmatter, partial ASTs by filepath, and any errors.
   */
  static parseMdocFile(markdocFile: string, partialsDir: string) {
    const markdocStr = fs.readFileSync(markdocFile, 'utf8');
    const ast = MarkdocStaticCompiler.parse(markdocStr);

    // Validate the frontmatter
    const frontmatter = yaml.load(ast.attributes.frontmatter) as Frontmatter;
    FrontmatterSchema.parse(frontmatter);

    // Collect all partials and build their ASTs
    const { partials, errorReports: partialErrors } = this.buildPartialASTs(
      ast,
      partialsDir
    );

    return {
      ast,
      frontmatter,
      partials,
      errorReports: [
        ...this.extractErrors({ node: ast, file: markdocFile }),
        ...partialErrors
      ]
    };
  }

  /**
   * Recursively build the ASTs of all partials required by the given AST.
   *
   * @param ast An AST node.
   * @param partialsDir The directory containing any partials required by the AST.
   * @returns An object containing the partial ASTs by filepath, and any errors.
   */
  private static buildPartialASTs(
    ast: Node,
    partialsDir: string
  ): { partials: Record<string, Node>; errorReports: ParsingErrorReport[] } {
    let partialAstsByFilename: Record<string, Node> = {};
    let errorReports: ParsingErrorReport[] = [];
    const partialPaths = this.extractPartialPaths(ast);
    partialPaths.forEach((partialPath) => {
      const partialFile = path.join(partialsDir, partialPath);
      const partialMarkupStr = fs.readFileSync(partialFile, 'utf8');
      const partialAst = MarkdocStaticCompiler.parse(partialMarkupStr);
      partialAstsByFilename[partialPath] = partialAst;
      partialAstsByFilename = {
        ...partialAstsByFilename,
        ...this.buildPartialASTs(partialAst, partialsDir).partials
      };
      errorReports = errorReports.concat(
        this.extractErrors({ node: partialAst, file: partialFile })
      );
    });
    return { partials: partialAstsByFilename, errorReports };
  }

  /**
   * Recursively scan an AST for references to partial files,
   * and return a list of the paths to those partial files.
   *
   * @param node An AST node.
   * @returns A list of partial file paths.
   */
  private static extractPartialPaths(node: Node): string[] {
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
        partialPaths = partialPaths.concat(this.extractPartialPaths(child));
      }
    }
    return partialPaths;
  }

  /**
   * Extract all validation errors from an AST.
   *
   * @param p An object containing the AST node and the file path.
   * @returns A list of parsing error reports.
   */
  private static extractErrors(p: { node: Node; file: string }): ParsingErrorReport[] {
    let errors: ParsingErrorReport[] = [];
    if (p.node.errors.length) {
      errors = errors.concat(
        p.node.errors.map((error) => ({ error, lines: p.node.lines, file: p.file }))
      );
    }
    if (p.node.children.length) {
      for (const child of p.node.children) {
        errors = errors.concat(this.extractErrors({ node: child, file: p.file }));
      }
    }
    return errors;
  }

  /**
   * Collect all variable identifiers referenced in the markup.
   * (The markup must first be parsed into a renderable tree.)
   *
   * @param node A renderable tree.
   * @returns A list of variable identifiers found in the tree.
   */
  static collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
    let variableIdentifiers: string[] = [];

    if (!node) return variableIdentifiers;

    if (Array.isArray(node)) {
      node.forEach((n) => {
        const identifiers = this.collectVarIdsFromTree(n);
        variableIdentifiers = variableIdentifiers.concat(identifiers);
      });
    }

    if (typeof node !== 'object') return variableIdentifiers;

    if ('children' in node && node.children) {
      const identifiers = this.collectVarIdsFromTree(node.children);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if ('parameters' in node && node.parameters) {
      const identifiers = this.collectVarIdsFromTree(Object.values(node.parameters));
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
      const identifiers = this.collectVarIdsFromTree(
        // @ts-ignore
        node.if
      );
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    // return the unique identifiers
    return Array.from(new Set(variableIdentifiers));
  }

  /**
   * Build a renderable tree from the AST, frontmatter, partials, and default values.
   * The renderable tree is used to render HTML output at compile time,
   * and when the end user changes a content preference setting.
   *
   * @param p An object containing the data required to build a renderable tree.
   * @returns A renderable tree.
   */
  static buildRenderableTree(p: {
    frontmatter: Frontmatter;
    prefOptionsConfig: PrefOptionsConfig;
    partials: Record<string, Node>;
    ast: Node;
  }): RenderableTreeNode {
    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      p.frontmatter,
      p.prefOptionsConfig
    );

    const renderableTree = MarkdocStaticCompiler.transform(p.ast, {
      variables: defaultValsByPrefId,
      partials: p.partials
    });

    // ensure that all variable ids appearing
    // in the renderable tree are valid page pref ids
    const referencedVarIds = this.collectVarIdsFromTree(renderableTree);
    const pagePrefIds = Object.keys(defaultValsByPrefId);
    const invalidVarIds = referencedVarIds.filter((id) => !pagePrefIds.includes(id));

    if (invalidVarIds.length > 0) {
      throw new Error(
        `Invalid reference found in markup: ${invalidVarIds} is not a valid identifier.`
      );
    }

    return renderableTree;
  }
}
