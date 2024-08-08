import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const tabDefinition = {
  render: 'Tab',
  children: ['paragraph'],
  transform(node, config) {
    console.log('annotations', node.annotations);
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
  // level = 'info';
  tag: Tag;

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.tag = tag;
    console.log('tab tag', JSON.stringify(tag, null, 2));
  }

  render() {
    return `<div class="tab-pane fade" role="tabpanel" title="${this.tag.attributes.label}">${this.contents}</div>`;
  }
}
