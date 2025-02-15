import { CustomHtmlComponent } from '../helperModules/renderer';

export const tabsDefinition = {
  render: 'Tabs',
  children: ['tab']
};

export class Tabs extends CustomHtmlComponent {
  render() {
    return `<div class='code-tabs'>
      <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">${this.contents}</div>
      </div>`;
  }
}
