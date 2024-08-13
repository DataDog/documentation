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
    }
  }
};

export class Img extends CustomHtmlComponent {
  render() {
    let result = '\n<!-- prettier-ignore -->\n{{< img';
    Object.keys(this.tag.attributes).forEach((key) => {
      result += ` ${key}="${this.tag.attributes[key]}"`;
    });
    result += ' >}}\n';
    return result;
  }
}
