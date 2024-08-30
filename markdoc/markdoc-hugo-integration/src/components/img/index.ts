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

export class Img extends CustomHtmlComponent {
  render() {
    return `\n<!-- prettier-ignore -->\n{{< img ${this.forwardNamedAttributes()} >}}\n`;
  }
}
