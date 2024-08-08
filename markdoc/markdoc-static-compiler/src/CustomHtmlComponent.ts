import html from './renderers/html';
import { Tag, Config } from './types';
import MarkdownIt from 'markdown-it';
const { escapeHtml, unescapeAll } = MarkdownIt().utils;

export abstract class CustomHtmlComponent {
  contents = '';

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    if (tag.children.length > 0) {
      console.log(`rendering children of ${tag.name}`);
      this.contents = html(tag.children, config, components);
    }
  }

  escapeHtml(str: string): string {
    return escapeHtml(str);
  }

  unescapeAll(str: string): string {
    return unescapeAll(str);
  }

  abstract render(): string;
}
