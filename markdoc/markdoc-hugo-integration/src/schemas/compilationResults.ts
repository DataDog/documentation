import { Node, ValidationError } from 'markdoc-static-compiler';
import { Frontmatter } from './yaml/frontMatter';

/**
 * The result of compiling a set of Markdoc files,
 * usually either all of the .mdoc.md files in the site,
 * or a single one .mdoc.md file that has changed
 * and is being compiled in watch mode.
 *
 * This is used to (for example) assess whether
 * the compilation was successful and generate a .gitignore
 * file for compiled content.
 */
export type CompilationResult = {
  hasErrors: boolean;
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
  validationErrorsByFilePath: Record<string, string[]>;
  compiledFilePaths: string[];
};

/**
 * An object representing an error encountered
 * while parsing a Markdoc file to an AST,
 * along with context such as the line number.
 */
export type ParsingErrorReport = {
  error: ValidationError;
  file: string;
  lines: number[];
};

/**
 * An object representing a Markdoc file that has been
 * parsed into a renderable data object,
 * including the ASTs of any partials referenced in the file.
 */
export interface ParsedFile {
  ast: Node;
  frontmatter: Frontmatter;
  partials: Record<string, Node>;
  errorReports: ParsingErrorReport[];
}
