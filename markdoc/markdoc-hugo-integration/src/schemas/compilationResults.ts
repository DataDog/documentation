import { Node } from 'markdoc-static-compiler';
import { Frontmatter } from './yaml/frontMatter';
import { z } from 'zod';

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
  parsingErrorsByFilePath: Record<string, ParsingError[]>;
  validationErrorsByFilePath: Record<string, string[]>;
  compiledFilePaths: string[];
};

export const ValidationErrorSchema = z.object({
  message: z.string(),
  searchTerm: z.string().optional()
});

/**
 * An string representing a validation error encountered
 * while parsing a Markdoc file to an AST.
 */
export type ValidationError = z.infer<typeof ValidationErrorSchema>;

export const ParsingErrorSchema = z.object({
  message: z.string(),
  lines: z.array(z.number())
});

/**
 * An object representing an error encountered
 * while parsing a Markdoc file to an AST,
 * along with context such as the line number.
 */
export type ParsingError = z.infer<typeof ParsingErrorSchema>;

export const CompilationErrorReportSchema = z.object({
  parsingErrorsByFilePath: z.record(z.array(ParsingErrorSchema)),
  validationErrorsByFilePath: z.record(z.array(ValidationErrorSchema))
});

/**
 * An object representing a Markdoc file that has been
 * parsed into a renderable data object,
 * including the ASTs of any partials referenced in the file.
 */
export interface ParsedFile {
  ast: Node;
  frontmatter: Frontmatter;
  partials: Record<string, Node>;
  errors: ParsingError[];
}
