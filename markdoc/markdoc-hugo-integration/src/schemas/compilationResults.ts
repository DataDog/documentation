import { Node } from 'markdoc-static-compiler';
import { FrontMatter } from './frontMatter';
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
  errorsByFilePath: Record<string, CompilationError[]>;
  compiledFilePaths: string[];
};

export const CompilationErrorSchema = z.object({
  message: z.string(),
  lines: z.array(z.number()).optional(),
  searchTerm: z.string().optional()
});

export type CompilationError = z.infer<typeof CompilationErrorSchema>;

/**
 * An object representing a Markdoc file that has been
 * parsed into a renderable data object,
 * including the ASTs of any partials referenced in the file.
 */
export interface ParsedFile {
  ast: Node;
  frontmatter: FrontMatter;
  partials: Record<string, Node>;
  errors: CompilationError[];
}
