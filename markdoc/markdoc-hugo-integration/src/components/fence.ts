import { CustomHtmlComponent, Config, Node } from 'markdoc-static-compiler';
import { highlight } from 'chroma-highlight';

/**
 * Dynamic code block notes
 *
 * Only natively processed tags can be in code blocks.
 * I should make a native copy of the region-param
 * shortcode as a test.
 */

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
    console.log('\n\n\nfence tag', JSON.stringify(this.tag, null, 2));
    console.log('\nfence contents', JSON.stringify(this.contents));
    const codeContents = this.tag.children.join('\n');
    const language = this.tag.attributes.language || 'plaintext';
    const regionParamHtml = `<code class="js-region-param region-param" data-region-param="dd_site">datadoghq.com</code>`;
    const regionParamMarkup = `{{< region-param  key=\"dd_site\" code=\"true\" >}}`;
    this.contents = this.contents.replace(regionParamMarkup, regionParamHtml);
    const formattedCodeContents = highlight(
      // codeContents,
      this.contents,
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
