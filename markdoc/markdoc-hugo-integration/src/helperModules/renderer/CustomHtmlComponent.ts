import { render } from '.';
import { Tag, Config } from 'markdoc-static-compiler';
import { HugoConfig, HugoConfigSchema } from '../../schemas/config/hugo';
import MarkdownIt from 'markdown-it';
const { escapeHtml, unescapeAll } = MarkdownIt().utils;

export abstract class CustomHtmlComponent {
  contents = '';
  tag: Tag;
  markdocConfig: Config | undefined;
  hugoConfig: HugoConfig;
  // TODO: What kind of type should be used for components?
  components: Record<string, any> | undefined;

  constructor(
    tag: Tag,
    markdocConfig: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    this.markdocConfig = markdocConfig;

    // Validate that the Hugo config is present
    // and contains the required fields
    if (!this.markdocConfig.variables?.hugoConfig) {
      throw new Error('Hugo config is not defined');
    }
    this.hugoConfig = HugoConfigSchema.parse(this.markdocConfig.variables.hugoConfig);

    this.components = components;
    this.tag = tag;
    if (tag.children.length > 0) {
      this.contents = render(tag.children, markdocConfig, components);
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
