import { CustomHtmlComponent } from '../helperModules/renderer';

export const whatsnextDefinition = {
  render: 'Whatsnext',
  attributes: {
    href: {
      type: String,
      required: true
    }
  }
};

export class Whatsnext extends CustomHtmlComponent {
  render() {
    return `<div>whatsnext goes here</div>`;
  }
}
