import { CustomHtmlComponent, Tag, Config } from 'markdoc-static-compiler';

export const siteRegionDefinition = {
  render: 'SiteRegion',
  children: ['paragraph', 'list', 'link', 'heading', 'code'],
  attributes: {
    region: {
      type: String,
      required: true,
      matches: ['us', 'us3', 'us5', 'eu', 'ap1', 'gov']
    }
  }
};

export class SiteRegion extends CustomHtmlComponent {
  region: string;

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.region = tag.attributes.region;
  }

  render() {
    return `<div class="d-none site-region-container" data-region="${this.region}">${this.contents}</div>`;
  }
}
