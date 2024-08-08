import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

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
    let result = '{{< img';
    Object.keys(this.tag.attributes).forEach((key) => {
      result += ` ${key}="${this.tag.attributes[key]}"`;
    });
    result += ' >}}';
    return result;
  }
}
