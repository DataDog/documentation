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

  constructor(p: {
    tag: Tag;
    markdocConfig: Config;
    hugoConfig: HugoConfig;
    components?: Record<string, CustomHtmlComponent>;
  }) {
    this.markdocConfig = p.markdocConfig;
    this.hugoConfig = p.hugoConfig;

    // TODO: Do this once up front instead of every time a component is created
    HugoConfigSchema.parse(this.hugoConfig);

    this.components = p.components;
    this.tag = p.tag;
    if (p.tag.children.length > 0) {
      this.contents = render({
        node: p.tag.children,
        markdocConfig: p.markdocConfig,
        components: p.components,
        hugoConfig: p.hugoConfig
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
