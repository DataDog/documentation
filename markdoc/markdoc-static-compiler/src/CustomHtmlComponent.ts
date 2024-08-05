import html from './renderers/html';
import { Tag, Config } from './types';

export abstract class CustomHtmlComponent {
  contents = '';

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    if (tag.children.length > 0) {
      this.contents = html(tag.children, config, components);
    }
  }

  abstract render(): string;
}
