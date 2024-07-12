import MarkdocStaticCompiler, { Node, RenderableTreeNodes } from '../../markdoc-static-compiler/dist';
import fs from 'fs';
import yaml from 'js-yaml';
import {
  PageVariable,
  BooleanVariable,
  StringVariable,
  NumberVariable,
  Frontmatter,
  FrontmatterSchema,
  GlobalVariableConfig
} from './oldSchemas';

export class FileRenderer {
  ast: Node;
  globalVariableConfig: GlobalVariableConfig;
  renderableTree: RenderableTreeNodes;
  content: string; // html
  chooser: string; // html
  frontmatter: Frontmatter;
  pageVarDefinitions: Record<string, PageVariable>;
  debug = false;

  constructor(p: { path: string; config: GlobalVariableConfig }) {
    this.globalVariableConfig = p.config;
    const markdownStr = fs.readFileSync(p.path, 'utf-8');

    this.ast = MarkdocStaticCompiler.parse(markdownStr);

    const frontmatterYaml = this.ast.attributes.frontmatter
      ? yaml.load(this.ast.attributes.frontmatter)
      : { title: '' };
    this.frontmatter = FrontmatterSchema.parse(frontmatterYaml);

    if (this.frontmatter.title === 'DebugIt') {
      this.debug = true;
    }

    const defaultVariableValues = this.getGlobalDefaultValues();
    this.renderableTree = MarkdocStaticCompiler.transform(this.ast, {
      variables: defaultVariableValues
    });

    const referencedVariableIdentifiers = this.collectVariableIdentifiers(this.renderableTree);

    this.pageVarDefinitions = {};
    const pageVariableConfig = { ...this.globalVariableConfig };
    Object.keys(pageVariableConfig).forEach((key) => {
      if (!referencedVariableIdentifiers.includes(key)) {
        delete pageVariableConfig[key];
      } else {
        this.pageVarDefinitions[key] = {
          ...pageVariableConfig[key],
          identifier: key
        };
      }
    });

    this.content = MarkdocStaticCompiler.renderers.html(this.renderableTree);
    this.chooser = this.buildChooserHtml(this.globalVariableConfig);
  }

  collectVariableIdentifiers(node: RenderableTreeNodes): string[] {
    let variableIdentifiers: string[] = [];

    if (!node) return variableIdentifiers;

    if (Array.isArray(node)) {
      node.forEach((n) => {
        const identifiers = this.collectVariableIdentifiers(n);
        variableIdentifiers = variableIdentifiers.concat(identifiers);
      });
    }

    if (typeof node !== 'object') return variableIdentifiers;

    if ('children' in node && node.children) {
      const identifiers = this.collectVariableIdentifiers(node.children);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if ('parameters' in node && node.parameters) {
      const identifiers = this.collectVariableIdentifiers(Object.values(node.parameters));
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if (typeof node === 'object' && '$$mdtype' in node && node.$$mdtype === 'Variable') {
      // @ts-ignore, TODO: This only works if we assume that the variable path is one level deep,
      // which is what we're supporting for now.
      variableIdentifiers.push(node.path?.join('.'));
    }

    if (typeof node === 'object' && '$$mdtype' in node && node.$$mdtype === 'Tag' && 'if' in node) {
      const identifiers = this.collectVariableIdentifiers(
        // @ts-ignore
        node.if
      );
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    // return the unique identifiers
    return Array.from(new Set(variableIdentifiers));
  }

  getGlobalDefaultValues() {
    const variables: Record<string, string | boolean | number> = {};

    Object.keys(this.globalVariableConfig).forEach((key) => {
      const variableDef = this.globalVariableConfig[key];
      variables[key] = variableDef.default;
    });

    return variables;
  }

  getPageDefaultValues() {
    const variables: Record<string, string | boolean | number> = {};

    Object.keys(this.pageVarDefinitions).forEach((key) => {
      const variableDef = this.pageVarDefinitions[key];
      variables[key] = variableDef.default;
    });

    return variables;
  }

  buildChooserHtml(config: GlobalVariableConfig) {
    const pageIdentifiers = this.collectVariableIdentifiers(this.renderableTree);
    const html = Object.keys(config).map((identifier) => {
      if (!pageIdentifiers.includes(identifier)) {
        return '';
      }
      const variableDef = config[identifier];
      if (variableDef.type === 'boolean') {
        return this.buildBooleanSelectorHtml({ ...variableDef, identifier });
      } else if (variableDef.type === 'string') {
        return this.buildStringSelectorHtml({ ...variableDef, identifier });
      } else if (variableDef.type === 'number') {
        return this.buildNumberSelectorHtml({ ...variableDef, identifier });
      }
    });

    return html.join('');
  }

  buildBooleanSelectorHtml(variable: BooleanVariable) {
    return `
        <div>
          <label>${variable.displayName}</label>
          <input type="checkbox" ${variable.default && 'checked'} />
        </div>
      `;
  }

  buildStringSelectorHtml(variable: StringVariable) {
    const defaults = this.getPageDefaultValues();
    return `
        <div style="display: inline-block; vertical-align: top; margin-right: 1em;">
          <label>${variable.displayName}</label>
          <select onchange="handleValueChange('${variable.identifier}', this.options[this.selectedIndex].value)">
            ${variable.options.map((v) => {
              const selected = v === defaults[variable.identifier] ? 'selected' : '';
              return `<option value="${v}" ${selected}>${v}</option>`;
            })}
          </select>
        </div>
      `;
  }

  buildNumberSelectorHtml(variable: NumberVariable) {
    if (variable.options.type === 'range') {
      return `
          <div>
            <label>${variable.displayName}</label>
            <input type="number" value="${variable.default}" min="${variable.options.data.min}" max="${variable.options.data.max}" />
          </div>
        `;
    } else {
      return `
          <div>
            <label>${variable.displayName}</label>
            <select>
              ${variable.options.data.map((v) => `<option>${v}</option>`)}
            </select>
          </div>
        `;
    }
  }
}
