import { renderToString } from 'react-dom/server';
import { HugoFunctions } from '../helperModules/HugoFunctions';
import { CustomHtmlComponent } from '../helperModules/renderer';
import { HugoConfig } from '../schemas/config/hugo';
import { ImgTemplate } from './shared/img';

export const nextlinkDefinition = {
  render: 'Nextlink',
  attributes: {
    href: {
      type: String,
      required: true
    },
    tag: {
      type: String
    },
    img: {
      type: String
    }
  }
};

export class Nextlink extends CustomHtmlComponent {
  render() {
    const jsx = NextlinkTemplate({
      // @ts-ignore
      attrs: { ...this.tag.attributes, text: this.contents },
      hugoConfig: this.hugoConfig
    });

    return renderToString(jsx);
  }
}

export function NextlinkTemplate(props: {
  attrs: {
    href: string;
    text: string;
    tag?: string;
    img?: string;
  };
  hugoConfig: HugoConfig;
}) {
  let link: string = props.attrs.href;

  // If the href is not an absolute URL,
  // make it an absolute URL with a language prefix
  if (!link.startsWith('http')) {
    link = HugoFunctions.absLangUrl({
      hugoConfig: props.hugoConfig,
      url: link,
      defaultLang: 'en'
    });
  }

  const { tag, text, img } = props.attrs;

  return (
    <a
      style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)' }}
      className="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center"
      href={link}
    >
      {img && <ImgTemplate attrs={{ src: img }} hugoConfig={props.hugoConfig} />}
      <span className={`w-100 d-flex justify-content-between ${img ? 'ps-1' : ''}`}>
        <span className="text">{text}</span>
        {tag && (
          <span className="badge badge-white pe-2 border-0">{tag.toUpperCase()}</span>
        )}
      </span>
      <ImgTemplate
        attrs={{
          src: 'icons/list-group-arrow.png',
          class: 'img-fluid static',
          alt: 'more'
        }}
        hugoConfig={props.hugoConfig}
      />
      <ImgTemplate
        attrs={{
          src: 'icons/list-group-arrow-r.png',
          class: 'img-fluid hover',
          alt: 'more',
          disable_lazy: true
        }}
        hugoConfig={props.hugoConfig}
      />
    </a>
  );
}
