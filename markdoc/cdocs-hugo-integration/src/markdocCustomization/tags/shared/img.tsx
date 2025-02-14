import { HugoConfig } from '../../../schemas/config/hugo';
import { cssStringToObject } from '../utils';

/**
 * The JS equivalent to the `img` partial.
 * Not to be confused with the `img` shortcode,
 * which is implemented in src/components/img.
 */
export function ImgTemplate(props: {
  attrs: {
    src: string;
    img_param?: string;
    width?: string;
    height?: string;
    style?: string;
    class?: string;
    alt?: string;
    disable_lazy?: boolean;
  };
  hugoConfig: HugoConfig;
}) {
  const img_param = props.attrs.img_param || '?ch=Width,DPR&fit=max';
  const url = `${props.hugoConfig.global.siteParams.img_url}/images/${props.attrs.src}${img_param}`;

  const additionalAttributes: Record<string, any> = {};
  if (props.attrs.disable_lazy) {
    additionalAttributes['loading'] = 'lazy';
  }

  return (
    <picture className={props.attrs.class}>
      <source
        srcSet={`${url}&auto=format&w=807 1x, ${url}&auto=format&w=807&dpr=2 2x`}
        media="(min-width: 1200px)"
      />
      <source
        srcSet={`${url}&auto=format&w=670 1x, ${url}&auto=format&w=670&dpr=2 2x`}
        media="(min-width: 992px)"
      />
      <source
        srcSet={`${url}&auto=format&w=496 1x, ${url}&auto=format&w=496&dpr=2 2x`}
        media="(min-width: 759px)"
      />
      <source
        srcSet={`${url}&auto=format&w=496 1x, ${url}&auto=format&w=496&dpr=2 2x`}
        media="(min-width: 630px)"
      />
      <source
        srcSet={`${url}&auto=format&w=496 1x, ${url}&auto=format&w=496&dpr=2 2x`}
        media="(min-width: 530px)"
      />
      <source
        srcSet={`${url}&auto=format&w=360 1x, ${url}&auto=format&w=360&dpr=2 2x`}
        media="(min-width: 361px)"
      />
      <source
        srcSet={`${url}&auto=format&w=360 1x, ${url}&auto=format&w=360&dpr=2 2x`}
        media="(min-width: 0px)"
      />
      <img
        width={props.attrs.width}
        height={props.attrs.height}
        className={props.attrs.class}
        srcSet={`${url}&auto=format&w=807`}
        style={cssStringToObject(props.attrs.style || '')}
        alt={props.attrs.alt}
        {...additionalAttributes}
      ></img>
    </picture>
  );
}
