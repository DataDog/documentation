import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const alertDefinition = {
  render: 'Alert',
  attributes: {
    level: {
      type: String,
      default: 'info',
      matches: ['info', 'warning']
    }
  }
};

export class Alert extends CustomHtmlComponent {
  render() {
    const level = this.tag.attributes.level || 'info';
    return `<div class="alert alert-${level}">${this.contents}</div>`;
  }
}
