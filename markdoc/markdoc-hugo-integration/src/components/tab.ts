import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const tabDefinition = {
  render: 'Tab',
  children: ['paragraph']
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
    console.log('rendering tab');
    return `<div class="tab-pane fade" role="tabpanel">${this.contents}</div>`;
  }
}
