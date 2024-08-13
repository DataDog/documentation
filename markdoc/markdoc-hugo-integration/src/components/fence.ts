import { CustomHtmlComponent, Config, Node } from 'markdoc-static-compiler';
import { highlight } from 'chroma-highlight';

export const fenceDefinition = {
  render: 'Fence',
  attributes: {
    language: {
      type: String
    }
  }
};

export class Fence extends CustomHtmlComponent {
  render() {
    const codeContents = this.tag.children.join('\n');
    const language = this.tag.attributes.language || '';
    const formattedCodeContents = highlight(
      codeContents,
      `--formatter html --html-only --lexer="${language}"`
    );
    return `<div>${formattedCodeContents}</div>`;
  }
}
