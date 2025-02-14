import CdocsMarkdoc, { Node } from 'cdocs-markdoc';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Frontmatter, FrontmatterSchema } from 'cdocs-data';
import { CompilationError, ParsedFile } from './schemas/compilationResults';

/**
 * A module responsible for parsing a Markdoc file into a data structure,
 * extracting any validation errors encountered during parsing.
 */
export class MdocFileParser {
  /**
   * Parse a Markdoc file and return its AST, frontmatter, partials,
   * and any validation errors encountered during parsing.
   */
  static parseMdocFile(p: { file: string; partialsDir: string }): Readonly<ParsedFile> {
    const markdocStr = fs.readFileSync(p.file, 'utf8');
    const ast = CdocsMarkdoc.parse(markdocStr);

    // Validate the frontmatter
    const frontmatter = yaml.load(ast.attributes.frontmatter) as Frontmatter;
    FrontmatterSchema.parse(frontmatter);

    // Collect all partials and build their ASTs
    const { partials, errors: partialErrors } = this.#buildPartialASTs(
      ast,
      p.partialsDir
    );

    return {
      ast,
      frontmatter,
      partials,
      errors: [...this.#extractErrors({ node: ast }), ...partialErrors]
    };
  }

  /**
   * Recursively build the ASTs of all partials required by the given AST.
   *
   * @returns An object containing the partial ASTs by filepath, and any errors.
   */
  static #buildPartialASTs(
    ast: Node,
    partialsDir: string
  ): { partials: Record<string, Node>; errors: CompilationError[] } {
    let partialAstsByFilename: Record<string, Node> = {};
    let errors: CompilationError[] = [];
    const partialPaths = this.#extractPartialPaths(ast);
    partialPaths.forEach((partialPath) => {
      const partialFile = path.join(partialsDir, partialPath);
      const partialMarkupStr = fs.readFileSync(partialFile, 'utf8');
      const partialAst = CdocsMarkdoc.parse(partialMarkupStr);
      partialAstsByFilename[partialPath] = partialAst;
      partialAstsByFilename = {
        ...partialAstsByFilename,
        ...this.#buildPartialASTs(partialAst, partialsDir).partials
      };
      errors = errors.concat(this.#extractErrors({ node: partialAst }));
    });
    return { partials: partialAstsByFilename, errors };
  }

  /**
   * Recursively scan an AST for references to partial files,
   * and return a list of the paths to those partial files.
   *
   * @param node An AST node.
   * @returns A list of partial file paths.
   */
  static #extractPartialPaths(node: Node): string[] {
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
        partialPaths = partialPaths.concat(this.#extractPartialPaths(child));
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
  static #extractErrors(p: { node: Node }): CompilationError[] {
    let errors: CompilationError[] = [];
    if (p.node.errors.length) {
      errors = errors.concat(
        p.node.errors.map((error) => ({
          message: error.message,
          lines: p.node.lines
        }))
      );
    }
    if (p.node.children.length) {
      for (const child of p.node.children) {
        errors = errors.concat(this.#extractErrors({ node: child }));
      }
    }
    return errors;
  }
}
