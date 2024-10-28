import { CustomHtmlComponent } from 'markdoc-static-compiler';

export const imgNewDefinition = {
  render: 'ImgNew',
  children: [],
  attributes: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    },
    style: {
      type: String
    },
    video: {
      type: Boolean
    }
  }
};

// TODO: Currently "forwards" all attributes to the Hugo shortcode,
// but will be processed natively once the Markdoc-Hugo integration
// has access to the site configuration.
export class ImgNew extends CustomHtmlComponent {
  render() {
    console.log('ImgNew.render()');
    console.log(
      'site params',
      JSON.stringify(this.config!.variables!.hugoConfig!.siteParams, null, 2)
    );

    return `<em>-- NEW IMAGE TAG GOES HERE --</em>`;
  }
}
