import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const alertDefinition = {
  render: 'Alert',
  children: ['paragraph'],
  attributes: {
    level: {
      type: String,
      default: 'info',
      matches: ['info', 'warning']
    }
  }
};

export class Alert extends CustomHtmlComponent {
  level = 'info';

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.level = tag.attributes.level || 'info';
  }

  render() {
    return `<div class="alert alert-${this.level}">${this.contents}</div>`;
  }
}
