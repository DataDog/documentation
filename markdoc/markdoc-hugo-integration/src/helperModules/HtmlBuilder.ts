import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { ParsedFile, FileParser } from './FileParser';
import MarkdocStaticCompiler from 'markdoc-static-compiler';
import prettier from 'prettier';

export class HtmlBuilder {
  static buildHtml(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
  }): string {
    const renderableTree = FileParser.buildRenderableTree({
      parsedFile: p.parsedFile,
      prefOptionsConfig: p.prefOptionsConfig
    });

    const html = MarkdocStaticCompiler.renderers.html(renderableTree);
    const styledHtml = `<style>.markdoc__hidden { background-color: lightgray; }</style>${html}`;
    const formattedHtml = prettier.format(styledHtml, { parser: 'html' });
    return formattedHtml;
  }
}
