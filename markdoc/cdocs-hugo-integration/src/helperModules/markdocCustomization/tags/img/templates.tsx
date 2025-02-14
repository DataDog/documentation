import { HugoConfig } from '../../../../schemas/config/hugo';
import { HugoFunctions } from '../../../hugoUtils/HugoFunctions';
import { cssStringToObject } from '../utils';

/**
 * All of the possible attributes an author can define in the img tag.
 */
type ImgTagAttrs = {
  src: string;
  alt: string;
  style: string;
  caption: string;
  video: boolean;
  inline: boolean;
  popup: boolean;
  width: string;
  height: string;
  wide: boolean;
  img_param: string;
  pop_param?: string;
  figure_class?: string;
  figure_style?: string;
  href?: string;
  target?: string;
};

/**
 * The top-level template used to render the img tag.
 */
export const ImgTemplate = (props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) => {
  const { attrs, hugoConfig } = props;

  // Handle videos
  if (attrs.video) {
    return <Video attrs={attrs} hugoConfig={hugoConfig} />;
  }

  // Handle inline images
  if (attrs.inline) {
    return <InlineImage attrs={attrs} hugoConfig={hugoConfig} />;
  }

  // Handle block-display images
  const isGif = attrs.src.split('.')[1] === 'gif';

  // If it has a pop up, wrap the image in a link that opens a modal
  if (attrs.popup && !isGif) {
    return (
      <PopUpLink attrs={attrs} hugoConfig={hugoConfig}>
        <Picture attrs={attrs} hugoConfig={hugoConfig} />
      </PopUpLink>
    );
  }

  // If there's an href, wrap the gif or image in a link
  if (attrs.href) {
    return <LinkWrappedImage attrs={attrs} hugoConfig={hugoConfig} />;
  }

  // Otherwise, use a plain image or gif element
  if (isGif) {
    return <Gif attrs={attrs} hugoConfig={hugoConfig} />;
  } else {
    return <Picture attrs={attrs} hugoConfig={hugoConfig} />;
  }
};

// Subcomponents ---------------------------------------------------------------

function Video(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;
  const src = `${hugoConfig.global.siteParams.img_url}images/${attrs.src}`;

  return (
    <Figure attrs={attrs}>
      <video
        width={attrs.width || '100%'}
        height="auto"
        muted
        playsInline
        autoPlay
        loop
        controls
      >
        <source src={src} type="video/mp4" media="(min-width: 0px)" />
        <div className="play"></div>
        <div className="pause"></div>
      </video>
    </Figure>
  );
}

function InlineImage(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const imgProps: Record<string, any> = {
    srcSet:
      HugoFunctions.getFingerprintedPermalink({ src: attrs.src, hugoConfig }) +
      '?auto=format'
  };

  if (attrs.style) {
    imgProps.style = cssStringToObject(attrs.style);
  }

  // Add any additional attributes that the author provided
  // to the img properties
  (['alt', 'width', 'height'] as (keyof ImgTagAttrs)[]).forEach((key) => {
    if (attrs[key]) {
      imgProps[key] = attrs[key];
    }
  });

  return (
    <Figure attrs={attrs}>
      <img {...imgProps} />
    </Figure>
  );
}

function Picture(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const pictureProps: Record<string, any> = {};

  const imgProps: Record<string, any> = {
    srcSet:
      HugoFunctions.getFingerprintedPermalink({ src: attrs.src, hugoConfig }) +
      '?auto=format',
    className: 'img-fluid'
  };

  if (attrs.style) {
    pictureProps.style = cssStringToObject(attrs.style);
    imgProps.style = cssStringToObject(attrs.style);
  }

  if (attrs.alt) {
    imgProps.alt = attrs.alt;
  }

  // If the image is not wide,
  // add width and height attributes where they are provided
  if (!attrs.wide) {
    if (attrs.width) {
      imgProps.width = attrs.width;
    }
    if (attrs.height) {
      imgProps.height = attrs.height;
    }
  }

  return (
    <Figure attrs={attrs}>
      <picture {...pictureProps}>
        <img {...imgProps} />
      </picture>
    </Figure>
  );
}

function Gif(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const imgProps: Record<string, any> = {
    className: 'img-fluid',
    src: HugoFunctions.getFingerprintedPermalink({ src: props.attrs.src, hugoConfig })
  };

  if (attrs.style) {
    imgProps.style = cssStringToObject(attrs.style);
  }

  if (attrs.alt) {
    imgProps.alt = attrs.alt;
  }

  return <img {...imgProps} />;
}

// Wrapper components ---------------------------------------------------------

/**
 * A wrapper component for img tags that have an href attribute.
 */
function LinkWrappedImage(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  if (!attrs.href) {
    throw new Error('LinkWrappedImage component requires an href attribute.');
  }

  const linkProps: Record<string, string> = {
    href: attrs.href
  };

  if (attrs.target) {
    linkProps.target = attrs.target;
  }

  const isGif = attrs.src.split('.')[1] === 'gif';

  if (isGif) {
    return (
      <a {...linkProps}>
        <Gif attrs={attrs} hugoConfig={hugoConfig} />
      </a>
    );
  } else {
    return (
      <a {...linkProps}>
        <Picture attrs={attrs} hugoConfig={hugoConfig} />
      </a>
    );
  }
}

/**
 * A wrapper component for images that open in a popup modal.
 */
function PopUpLink(props: {
  children: React.ReactNode;
  attrs: ImgTagAttrs;
  hugoConfig: HugoConfig;
}) {
  const { attrs, children, hugoConfig } = props;

  const isGif = attrs.src.split('.')[1] === 'gif';
  const popParam = attrs.pop_param || (isGif ? '?fit=max' : '?fit=max&auto=format');

  // TODO, make this a relative URL: {{ print $img_resource $pop_param | relURL }}
  const href = HugoFunctions.relUrl({
    hugoConfig,
    url:
      HugoFunctions.getFingerprintedPermalink({
        src: attrs.src,
        hugoConfig: props.hugoConfig
      }) + popParam
  });

  return (
    <a
      href={href}
      className="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
    >
      {children}
    </a>
  );
}

/**
 * A wrapper component for images that should be wrapped in a figure element.
 */
function Figure(props: { attrs: ImgTagAttrs; children: React.ReactNode }) {
  let wrapperClass = 'shortcode-wrapper shortcode-img expand';
  let figureClass = 'text-center';

  if (props.attrs.wide) {
    wrapperClass += ' wide-parent';
    figureClass += ' wide';
  }

  let figureStyle = {};
  if (props.attrs.figure_style) {
    figureStyle = cssStringToObject(props.attrs.figure_style);
  }

  return (
    <div className={wrapperClass}>
      <figure className={figureClass} style={figureStyle}>
        {props.children}
        {props.attrs.caption && <figcaption>{props.attrs.caption}</figcaption>}
      </figure>
    </div>
  );
}
