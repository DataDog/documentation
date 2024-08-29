import { CustomHtmlComponent, Config, Node } from 'markdoc-static-compiler';
import { highlight } from 'chroma-highlight';
import { v4 as uuidv4 } from 'uuid';
import { renderers } from 'markdoc-static-compiler';

/**
 * Dynamic code block notes
 *
 * Only natively processed tags can be in code blocks.
 * I should make a native copy of the region-param
 * shortcode as a test.
 *
 *
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
  getRenderedChildTagsByUuid(): Record<string, string> {
    const renderedChildTagsByUuid: Record<string, string> = {};
    this.tag.children.forEach((child) => {
      if (
        child &&
        typeof child === 'object' &&
        '$$mdtype' in child &&
        child.$$mdtype === 'Tag'
      ) {
        const renderedChild = renderers.html(child, this.config, this.components);
        renderedChildTagsByUuid[uuidv4()] = renderedChild;
      }
    });
    return renderedChildTagsByUuid;
  }

  render() {
    const renderedChildTagsByUuid = this.getRenderedChildTagsByUuid();
    let formattedCodeContents = this.contents;
    Object.keys(renderedChildTagsByUuid).forEach((uuid) => {
      const html = renderedChildTagsByUuid[uuid];
      formattedCodeContents = formattedCodeContents.replace(html, uuid);
    });

    // TODO: Autodetect lexer if nothing is provided
    const language = this.tag.attributes.language || 'plaintext';

    formattedCodeContents = highlight(
      formattedCodeContents,
      `--formatter html --html-only --lexer="${language}"`
    );

    Object.keys(renderedChildTagsByUuid).forEach((uuid) => {
      const html = renderedChildTagsByUuid[uuid];
      formattedCodeContents = formattedCodeContents.replace(uuid, html);
    });

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
