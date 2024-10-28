import { CustomHtmlComponent } from '../helperModules/renderer';

export const siteRegionDefinition = {
  render: 'SiteRegion',
  attributes: {
    region: {
      type: String,
      required: true,
      matches: ['us', 'us3', 'us5', 'eu', 'ap1', 'gov']
    }
  }
};

export class SiteRegion extends CustomHtmlComponent {
  render() {
    const region = this.tag.attributes.region;
    return `<div class="d-none site-region-container" data-region="${region}">${this.contents}</div>`;
  }
}
