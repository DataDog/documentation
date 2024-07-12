import MarkdocStaticCompiler, { Node } from 'markdoc-static-compiler';
import fs from 'fs';
import yaml from 'js-yaml';
import { Frontmatter, FrontmatterSchema } from '../schemas/yaml/frontMatter';

export function parseMarkdocFile(markdocFile: string, partialsDir: string) {
  const markdocStr = fs.readFileSync(markdocFile, 'utf8');
  const ast = MarkdocStaticCompiler.parse(markdocStr);

  // Validate the frontmatter
  const frontmatter = yaml.load(ast.attributes.frontmatter) as Frontmatter;
  FrontmatterSchema.parse(frontmatter);

  // build the AST from the file
  // recursively build the ASTs of all required partials
  // get the frontmatter
  // return the ast, frontmatter, partials config, and any errors that occurred during parse
  return { ast, frontmatter };
}
