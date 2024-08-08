import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';
import { spinalcase } from 'stringcase';

export const tabDefinition = {
  render: 'Tab',
  transform(node, config) {
    const label = node.annotations[0].value;
    if (!label) {
      console.log('Tab node:', JSON.stringify(node, null, 2));
      throw new Error('Tab must have a label');
    }

    return {
      $$mdtype: 'Tag',
      name: 'Tab',
      attributes: {
        label
      },
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
