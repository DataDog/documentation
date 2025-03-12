import { render } from '.';
import { Tag, Config } from 'cdocs-markdoc';
import { HugoConfig } from '../../schemas/config/hugo';

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
  components: Record<string, CustomHtmlComponent> | undefined;

  constructor(p: {
    tag: Tag;
    markdocConfig: Config;
    hugoConfig: HugoConfig;
    components?: Record<string, CustomHtmlComponent>;
  }) {
    this.markdocConfig = p.markdocConfig;
    this.hugoConfig = p.hugoConfig;

    this.components = p.components;
    this.tag = p.tag;

    // Render any child tags up front, in case
    // this is needed for this tag's rendering logic
    // (such as syntax highlighting).
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
