import {
  CustomHtmlComponent,
  Node,
  Config,
  RenderableTreeNodes
} from 'markdoc-static-compiler';

const renderableTreeNodesToPlainText = (node: RenderableTreeNodes): string => {
  if (!node) {
    return '';
  }

  if (Array.isArray(node)) {
    return node.map((node) => renderableTreeNodesToPlainText(node)).join('');
  }

  if (typeof node === 'string') {
    return node;
  }

  if (typeof node !== 'object') {
    return node.toString();
  }

  if ('$$mdtype' in node) {
    if ('children' in node) {
      return renderableTreeNodesToPlainText(node.children);
    }
  }

  throw new Error('Unrecognized case: ' + JSON.stringify(node, null, 2));
};

export const hugoMarkdownDefinition = {
  render: 'HugoMarkdown',
  transform(node: Node, config: Config) {
    let childNodes = node.transformChildren(config);
    const plaintext = renderableTreeNodesToPlainText(childNodes);

    return {
      $$mdtype: 'Tag',
      name: 'HugoMarkdown',
      attributes: {
        plaintext
      }
    };
  }
};

export class HugoMarkdown extends CustomHtmlComponent {
  render() {
    console.log('HugoMarkdown render');
    console.log('plaintext:', this.tag.attributes.plaintext);
    return this.tag.attributes.plaintext;
  }
}
