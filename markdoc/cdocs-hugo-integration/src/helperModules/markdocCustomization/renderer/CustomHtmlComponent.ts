import { render } from '.';
import { Tag, Config } from 'cdocs-markdoc';
import { HugoConfig, HugoConfigSchema } from '../../../schemas/config/hugo';
import MarkdownIt from 'markdown-it';
const { escapeHtml, unescapeAll } = MarkdownIt().utils;

/**
 * The base class for all custom HTML components
 * (any tags that are not part of OOTB Markdoc).
 * It's not instantiated directly, but rather extended by
 * a child class, such as the Alert class.
 *
 * It provides useful rendering information to a given child class,
 * such as the tag's attributes and the rendered contents
 * of the tag's children.
 */
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

  abstract render(): string;
}
