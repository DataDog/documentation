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
  tag: Tag;

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.tag = tag;
  }

  render() {
    let result = '{{< img';
    Object.keys(this.tag.attributes).forEach((key) => {
      console.log('key', key);
      console.log('this.tag.attributes[key]', this.tag.attributes[key]);
      result += ` ${key}="${this.tag.attributes[key]}"`;
    });
    result += ' >}}';
    return result;
  }
}
