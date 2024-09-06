import { Node, ValidationError } from 'markdoc-static-compiler';
import { Frontmatter } from '../schemas/yaml/frontMatter';

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
 * An object representing a parsed Markdoc file,
 * including the ASTs of any partials referenced in the file.
 */
export interface ParsedFile {
  ast: Node;
  frontmatter: Frontmatter;
  partials: Record<string, Node>;
  errorReports: ParsingErrorReport[];
}
