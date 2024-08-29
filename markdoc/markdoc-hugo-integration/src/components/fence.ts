import { CustomHtmlComponent, Config, Node } from 'markdoc-static-compiler';
import { highlight } from 'chroma-highlight';
import { v4 as uuidv4 } from 'uuid';
import { renderers } from 'markdoc-static-compiler';

export const fenceDefinition = {
  render: 'Fence',
  attributes: {
    language: {
      type: String
    }
  }
};

export class Fence extends CustomHtmlComponent {
  /**
   * The syntax highlighter should not be applied to any Markdoc tags inside the fence,
   * such as region-param. This function replaces all Markdoc tags with a UUID, so that
   * the syntax highlighter can be applied to the rest of the contents.
   *
   * The function returns the sanitized children and a mapping of UUIDs to the rendered
   * HTML strings, so the HTML strings can be substituted back in after highlighting.
   */
  sanitizeChildrenForHighlighting(): {
    sanitizedChildren: string[];
    renderedChildTagsByUuid: Record<string, string>;
  } {
    const sanitizedChildren: string[] = [];
    const renderedChildTagsByUuid: Record<string, string> = {};
    this.tag.children.forEach((child) => {
      if (
        child &&
        typeof child === 'object' &&
        '$$mdtype' in child &&
        child.$$mdtype === 'Tag'
      ) {
        const uuid = uuidv4();
        const renderedChild = renderers.html(child, this.config, this.components);
        renderedChildTagsByUuid[uuid] = renderedChild;
        sanitizedChildren.push(uuid);
      } else if (typeof child === 'string') {
        sanitizedChildren.push(child);
      } else {
        throw new Error(`Unrecognized child in fence: ${child}`);
      }
    });
    return { renderedChildTagsByUuid, sanitizedChildren };
  }

  render() {
    // Remove any nested Markdoc tags, so they don't get highlighted
    const { sanitizedChildren, renderedChildTagsByUuid } =
      this.sanitizeChildrenForHighlighting();

    let formattedCodeContents = sanitizedChildren.join('');
    Object.keys(renderedChildTagsByUuid).forEach((uuid) => {
      const html = renderedChildTagsByUuid[uuid];
      formattedCodeContents = formattedCodeContents.replace(html, uuid);
    });

    // TODO: Autodetect lexer if nothing is provided
    const language = this.tag.attributes.language || 'plaintext';

    // Highlight the sanitized contents
    formattedCodeContents = highlight(
      formattedCodeContents,
      `--formatter html --html-only --lexer="${language}"`
    );

    // Restore any nested HTML that should be inside the highlighted code
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
