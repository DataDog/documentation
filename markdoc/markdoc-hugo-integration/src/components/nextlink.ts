import { CustomHtmlComponent } from '../helperModules/renderer';

export const nextlinkDefinition = {
  render: 'Nextlink',
  attributes: {
    href: {
      type: String,
      required: true
    }
  }
};

export class Nextlink extends CustomHtmlComponent {
  render() {
    return `<div>nextlink goes here</div>`;
  }
}
