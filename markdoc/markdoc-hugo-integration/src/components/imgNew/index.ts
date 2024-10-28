import { CustomHtmlComponent } from '../../helperModules/renderer';
import { ImgTemplate } from './templates';
import { renderToString } from 'react-dom/server';

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
    },
    img_param: {
      type: String,
      default: '?ch=Width,DPR&fit=max'
    },
    pop_param: {
      type: String
    },
    figure_class: {
      type: String
    },
    figure_style: {
      type: String
    }
  }
};

// TODO: Currently "forwards" all attributes to the Hugo shortcode,
// but will be processed natively once the Markdoc-Hugo integration
// has access to the site configuration.
export class ImgNew extends CustomHtmlComponent {
  render() {
    const jsx = ImgTemplate({
      // @ts-ignore, TODO: Come up with a reusable pattern to validate attributes
      attrs: this.tag.attributes,
      hugoConfig: this.hugoConfig
    });

    return renderToString(jsx);
  }
}
