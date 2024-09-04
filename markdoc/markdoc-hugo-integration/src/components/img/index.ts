import { CustomHtmlComponent } from 'markdoc-static-compiler';

export const imgDefinition = {
  render: 'Img',
  children: [],
  attributes: {
    src: {
      type: String
    },
    alt: {
      type: String
    },
    style: {
      type: String
    },
    video: {
      type: Boolean
    }
  }
};

// TODO: Currently "forwards" all attributes to the Hugo shortcode,
// but will be processed natively once the Markdoc-Hugo integration
// has access to the site configuration.
export class Img extends CustomHtmlComponent {
  render() {
    return `\n<!-- prettier-ignore -->\n{{< img ${this.forwardNamedAttributes()} >}}\n`;
  }
}
