import { PrefOptionsConfig } from '../../schemas/yaml/prefOptions';
import { ParsedFile } from '../FileParser';
import { ConfigProcessor } from '../ConfigProcessor';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode
} from 'markdoc-static-compiler';
import prettier from 'prettier';
import { ResolvedPagePrefs, ResolvedPagePref } from '../../schemas/resolvedPagePrefs';
import { GLOBAL_PLACEHOLDER_REGEX } from '../../schemas/regexes';
import { PagePrefsConfig } from '../../schemas/yaml/frontMatter';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const pageTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates/page.html.ejs'),
  'utf8'
);

export class HtmlBuilder {
  /**
   * Build the HTML output for a given parsed .mdoc file.
   * This HTML output can be processed by Hugo to generate a static page.
   */
  static build(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
  }): string {
    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      p.parsedFile.frontmatter,
      p.prefOptionsConfig
    );

    const renderableTree = this.buildRenderableTree({
      parsedFile: p.parsedFile,
      prefOptionsConfig: p.prefOptionsConfig,
      defaultValsByPrefId
    });

    // Build the chooser HTML, if any
    const frontmatter = p.parsedFile.frontmatter;

    let chooser = '';
    if (frontmatter.page_preferences) {
      const resolvedPrefs = this.resolvePagePrefs({
        pagePrefsConfig: frontmatter.page_preferences,
        prefOptionsConfig: p.prefOptionsConfig,
        valsByPrefId: defaultValsByPrefId
      });
      chooser = this.buildPagePrefsChooserHtml(resolvedPrefs);
    }

    // Build the page content HTML
    const pageContent = MarkdocStaticCompiler.renderers.html(renderableTree);

    const content = `${chooser}${pageContent}`;
    const html = ejs.render(pageTemplate, {
      content,
      renderableTree,
      prefOptionsConfig: p.prefOptionsConfig,
      pagePrefsConfig: p.parsedFile.frontmatter.page_preferences || []
    });

    const formattedHtml = prettier.format(html, { parser: 'html' });
    return formattedHtml;
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

    const uniqueIdentifiers = Array.from(new Set(variableIdentifiers));

    // return the unique identifiers
    return Array.from(uniqueIdentifiers);
  }

  /**
   * Build a renderable tree from the AST, frontmatter, partials, and default values.
   * The renderable tree is used to render HTML output at compile time,
   * and when the end user changes a content preference setting.
   *
   * @param p A ParsedFile object and a PrefOptionsConfig object.
   * @returns A renderable tree.
   */
  static buildRenderableTree(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
    defaultValsByPrefId: Record<string, string>;
  }): RenderableTreeNode {
    const renderableTree = MarkdocStaticCompiler.transform(p.parsedFile.ast, {
      variables: p.defaultValsByPrefId,
      partials: p.parsedFile.partials
    });

    // ensure that all variable ids appearing
    // in the renderable tree are valid page pref ids
    const referencedVarIds = this.collectVarIdsFromTree(renderableTree);
    const pagePrefIds = Object.keys(p.defaultValsByPrefId);
    const invalidVarIds = referencedVarIds.filter((id) => !pagePrefIds.includes(id));

    if (invalidVarIds.length > 0) {
      throw new Error(
        `Invalid reference found in markup: ${invalidVarIds} is not a valid identifier.`
      );
    }

    return renderableTree;
  }

  /**
   * Resolve the page preferences object that is used
   * to populate the content filtering UI (AKA the chooser),
   * replacing any placeholders with actual values.
   */
  static resolvePagePrefs(p: {
    pagePrefsConfig: PagePrefsConfig;
    prefOptionsConfig: PrefOptionsConfig;
    valsByPrefId: Record<string, string>;
  }): ResolvedPagePrefs {
    const resolvedPagePrefs: ResolvedPagePrefs = {};

    p.pagePrefsConfig.forEach((prefConfig) => {
      // Replace any placeholder in the options source with the default value
      if (GLOBAL_PLACEHOLDER_REGEX.test(prefConfig.options_source)) {
        prefConfig.options_source = prefConfig.options_source.replace(
          GLOBAL_PLACEHOLDER_REGEX,
          (_match: string, placeholder: string) => {
            return p.valsByPrefId[placeholder.toLowerCase()];
          }
        );
      }

      const resolvedPref: ResolvedPagePref = {
        identifier: prefConfig.identifier,
        displayName: prefConfig.display_name,
        defaultValue:
          prefConfig.default_value ||
          p.prefOptionsConfig[prefConfig.options_source].find((option) => option.default)!
            .identifier,
        options: p.prefOptionsConfig[prefConfig.options_source].map((option) => ({
          id: option.identifier,
          displayName: option.display_name
        }))
      };

      resolvedPagePrefs[prefConfig.identifier] = resolvedPref;
    });

    return resolvedPagePrefs;
  }

  /**
   * Build the chooser HTML for the page preferences.
   */
  static buildPagePrefsChooserHtml(
    resolvedPagePrefs: ResolvedPagePrefs,
    valuesByPrefId: Record<string, string> = {}
  ) {
    let html = '';
    html += '<div>';
    Object.keys(resolvedPagePrefs).forEach((prefId) => {
      const resolvedPagePref = resolvedPagePrefs[prefId];
      html += `<div class='markdoc-pref__container'>`;
      html += `<div class='markdoc-pref__label'>${resolvedPagePref.displayName}</div>`;
      html += this.buildPrefSelectorHtml({
        resolvedPagePref,
        currentValue: valuesByPrefId[prefId] || resolvedPagePref.defaultValue
      });
      html += '</div>';
    });
    html += '</div>';
    html += '<hr>';
    return html;
  }

  /**
   * Build a single preference selector HTML element.
   */
  static buildPrefSelectorHtml(p: {
    resolvedPagePref: ResolvedPagePref;
    currentValue: string;
  }) {
    /*
    // dropdown version
    return `
        <div style="display: inline-block; vertical-align: top; margin-right: 1em;">
          <label>${p.resolvedPagePref.displayName}</label>
          <select onchange="handleValueChange('${
            p.resolvedPagePref.identifier
          }', this.options[this.selectedIndex].value)">
            ${p.resolvedPagePref.options.map((option) => {
              const selected = option.id === p.currentValue ? 'selected' : '';
              return `<option value="${option.id}" ${selected}>${option.displayName}</option>`;
            })}
          </select>
        </div>
      `;
    */

    // pill version
    return `
      <div>
        <div>
          ${p.resolvedPagePref.options
            .map((option) => {
              const selected = option.id === p.currentValue ? 'selected' : '';
              return `<div class="markdoc-pref__pill ${selected}" onclick="handleValueChange('${p.resolvedPagePref.identifier}', '${option.id}')">${option.displayName}</div>`;
            })
            .join('')}
        </div>
      </div>
    `;
  }
}
