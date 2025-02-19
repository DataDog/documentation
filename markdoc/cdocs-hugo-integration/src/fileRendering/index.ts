import { ParsedFile } from '../schemas/compilationResults';
import { RenderableTreeNode } from 'cdocs-markdoc';
import prettier from 'prettier';
import { FiltersManifest, pruneManifestForClient } from 'cdocs-data';
import { buildRenderableTree, getMinifiedIfFunctionsByRef } from './treeManagement';
import { customComponents } from '../markdocCustomization/parserConfig';
import yaml from 'js-yaml';
import { PageTemplate } from './PageTemplate';
import { renderToString } from 'react-dom/server';
import { HugoConfig } from '../schemas/config/hugo';
import { render } from '../markdocCustomization/renderer';
import { FurtherReadingTemplate } from '../markdocCustomization/tags/furtherReading';
import { CompilationError } from '../schemas/compilationResults';
import { Frontmatter } from '../schemas/frontmatter';
import { removeLineBreaks } from '../utils';

/**
 * Build the .md output (HTML with frontmatter on top)
 * for a given parsed .mdoc.md file.
 *
 * This function uses the parsed Markdoc file to build
 * the following page elements, listed from top to bottom:
 *
 * - the filter selector component, if one is present
 * - the main HTML content
 * - a script that initializes the ClientFiltersManager
 *   with the necessary data to re-render the page
 *   when the user changes a filter setting.
 */
export function renderFile(p: {
  parsedFile: ParsedFile;
  hugoConfig: HugoConfig;
  filtersManifest: FiltersManifest;
}): { html: string; errors: CompilationError[] } {
  const variables = p.filtersManifest.defaultValsByTraitId;

  const { renderableTree, errors } = buildRenderableTree({
    parsedFile: p.parsedFile,
    variables,
    filtersManifest: p.filtersManifest
  });

  const pageInitScript = getPageInitScript({
    renderableTree,
    filtersManifest: p.filtersManifest
  });

  let articleHtml = render({
    node: renderableTree,
    markdocConfig: { variables },
    hugoConfig: p.hugoConfig,
    components: customComponents
  });

  articleHtml = prettier.format(articleHtml, { parser: 'html' });

  if (p.parsedFile.frontmatter.further_reading) {
    const jsx = FurtherReadingTemplate({
      furtherReadingConfig: p.parsedFile.frontmatter.further_reading,
      hugoConfig: p.hugoConfig
    });

    articleHtml = articleHtml.replace('</article>', renderToString(jsx) + '</article>');
  }

  const pageJsx = PageTemplate({
    valsByTraitId: p.filtersManifest.defaultValsByTraitId,
    filtersManifest: p.filtersManifest,
    articleHtml
  });

  let pageHtml = renderToString(pageJsx);
  pageHtml += `\n<div x-init='${pageInitScript}'></div>`;

  pageHtml = addFrontMatter({
    pageContents: pageHtml,
    frontMatter: p.parsedFile.frontmatter
  });

  return { html: pageHtml, errors };
}

/**
 * Add a front matter string to a page contents string.
 */
function addFrontMatter(p: { pageContents: string; frontMatter: Frontmatter }): string {
  const { content_filters, ...rest } = p.frontMatter;
  return `---\n${yaml.dump(rest)}---\n${p.pageContents}`;
}

/**
 * Build the snippet of JavaScript that is used to initialize the ClientFiltersManager
 * with all of the necessary data required to re-render the page when the user changes
 * a filter setting.
 */
function getPageInitScript(p: {
  renderableTree: RenderableTreeNode;
  filtersManifest: FiltersManifest;
}): string {
  const initFunctionName = 'initPage';
  const docReadyExecutionScript = `if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initPage, 1);
} else {
  document.addEventListener("DOMContentLoaded", ${initFunctionName});
}
`;

  const initFunctionStr = `const ${initFunctionName} = () => { 
clientFiltersManager.initialize({
    ifFunctionsByRef: ${JSON.stringify(getMinifiedIfFunctionsByRef(p.renderableTree))},
    filtersManifest: ${JSON.stringify(pruneManifestForClient(p.filtersManifest))}
  });
}; `;

  return removeLineBreaks(initFunctionStr + docReadyExecutionScript);
}
