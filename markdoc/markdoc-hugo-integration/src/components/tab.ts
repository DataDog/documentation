import { CustomHtmlComponent, Config, Node } from 'markdoc-static-compiler';
import { spinalcase } from 'stringcase';

export const tabDefinition = {
  render: 'Tab',
  attributes: {
    label: {
      type: String,
      required: true
    }
  },
  transform(node: Node, config: Config) {
    return {
      $$mdtype: 'Tag',
      name: 'Tab',
      attributes: node.attributes,
      children: node.transformChildren(config)
    };
  }
};

export class Tab extends CustomHtmlComponent {
  render() {
    let dataLang = this.tag.attributes.label;
    dataLang = dataLang.toLowerCase();
    dataLang = dataLang.replace('-', '');
    dataLang = spinalcase(dataLang);

    return `<div data-lang="${dataLang}" class="tab-pane fade" role="tabpanel" title="${this.tag.attributes.label}">${this.contents}</div>`;
  }
}
