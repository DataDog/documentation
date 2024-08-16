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
    const language = this.tag.attributes.language || 'plaintext';
    const formattedCodeContents = highlight(
      codeContents,
      `--formatter html --html-only --lexer="${language}"`
    );
    return `<div class="code-snippet-wrapper">
  <div class="code-filename-wrapper d-flex justify-content-end collapsible">
    <div class="js-code-block-visibility-toggle">
      <div class="chevron chevron-down d-none"></div>
      <div class="chevron chevron-up"></div>
    </div>  
  </div>
  <div class="code-snippet">
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">Copy</button>
    </div>
    <div class="highlight code-snippet js-appended-copy-btn">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      ${formattedCodeContents}
    </div>
    </div>
</div>`;
  }
}
