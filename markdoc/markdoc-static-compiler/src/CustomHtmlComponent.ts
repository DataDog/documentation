import html from './renderers/html';
import { Tag, Config } from './types';
import MarkdownIt from 'markdown-it';
const { escapeHtml, unescapeAll } = MarkdownIt().utils;

export abstract class CustomHtmlComponent {
  contents = '';
  tag: Tag;

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    this.tag = tag;
    if (tag.children.length > 0) {
      this.contents = html(tag.children, config, components);
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
