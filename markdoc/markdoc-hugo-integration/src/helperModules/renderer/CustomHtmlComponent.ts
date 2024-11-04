import { render } from '.';
import { Tag, Config } from 'markdoc-static-compiler';
import { HugoConfig, HugoConfigSchema } from '../../schemas/config/hugo';
import MarkdownIt from 'markdown-it';
import { IntegrationConfig } from '../../schemas/config/integration';
const { escapeHtml, unescapeAll } = MarkdownIt().utils;

export abstract class CustomHtmlComponent {
  contents = '';
  tag: Tag;
  markdocConfig: Config | undefined;
  hugoConfig: HugoConfig;
  integrationConfig: IntegrationConfig;
  // TODO: What kind of type should be used for components?
  components: Record<string, any> | undefined;

  constructor(p: {
    tag: Tag;
    markdocConfig: Config;
    integrationConfig: IntegrationConfig;
    components?: Record<string, CustomHtmlComponent>;
  }) {
    this.markdocConfig = p.markdocConfig;
    this.integrationConfig = p.integrationConfig;

    // Validate that the Hugo config is present
    // and contains the required fields
    if (!this.markdocConfig.variables?.hugoConfig) {
      throw new Error('Hugo config is not defined');
    }
    this.hugoConfig = HugoConfigSchema.parse(this.markdocConfig.variables.hugoConfig);

    this.components = p.components;
    this.tag = p.tag;
    if (p.tag.children.length > 0) {
      this.contents = render({
        node: p.tag.children,
        markdocConfig: p.markdocConfig,
        components: p.components,
        integrationConfig: p.integrationConfig
      });
    }
  }

  forwardNamedAttributes(): string {
    let result = '';
    Object.keys(this.tag.attributes).forEach((key) => {
      result += ` ${key}="${this.tag.attributes[key]}"`;
    });
    return result;
  }

  escapeHtml(str: string): string {
    return escapeHtml(str);
  }

  unescapeAll(str: string): string {
    return unescapeAll(str);
  }

  abstract render(): string;
}
