import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const tabsDefinition = {
  render: 'Tabs',
  children: ['tab']
  /*
  attributes: {
    level: {
      type: String,
      default: 'info',
      matches: ['info', 'warning']
    }
  }
  */
};

export class Tabs extends CustomHtmlComponent {
  tag: Tag;

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.tag = tag;
    // this.level = tag.attributes.level || 'info';
  }

  render() {
    return `<div class='code-tabs'>
      <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">${this.contents}</div>
      </div>`;
  }
}
