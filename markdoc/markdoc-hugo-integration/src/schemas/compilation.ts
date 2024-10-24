import { z } from 'zod';
import { HugoConfigSchema } from './hugoConfig';
import { Node, ValidationError } from 'markdoc-static-compiler';
import { Frontmatter } from '../schemas/yaml/frontMatter';

/**
 * The schema for the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export const CompilationConfigSchema = z.object({
  directories: z
    .object({
      content: z.string(),
      partials: z.string(),
      prefsConfig: z.string()
    })
    .strict(),
  hugoConfig: HugoConfigSchema
});

/**
 * The type of the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export type CompilationConfig = z.infer<typeof CompilationConfigSchema>;

export type CompilationResult = {
  hasErrors: boolean;
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
  validationErrorsByFilePath: Record<string, string>;
  compiledFiles: string[];
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
 * An object representing a parsed Markdoc file,
 * including the ASTs of any partials referenced in the file.
 */
export interface ParsedFile {
  ast: Node;
  frontmatter: Frontmatter;
  partials: Record<string, Node>;
  errorReports: ParsingErrorReport[];
}
