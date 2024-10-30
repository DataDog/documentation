import { HugoConfig } from '../../schemas/hugoConfig';
import md5 from 'md5';

class HugoUtils {
  static isAbsUrl(path: string): boolean {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return true;
    }
    try {
      new URL(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  static relUrl(path: string) {
    const isAbs = this.isAbsUrl(path);
  }
}

function buildImagePermalink(props: { src: string; hugoConfig: HugoConfig }) {
  const { src, hugoConfig } = props;

  // add branch to URL if in staging
  let prefix = '';
  if (hugoConfig.env === 'preview') {
    prefix = `${hugoConfig.siteParams.branch}/`;
  }

  const fingerprintedSrc = src.replace('.', `.${md5(src)}.`);
  const permalink = `${prefix}images/${fingerprintedSrc}`;

  return permalink;
}

function cssStringToObject(css: string) {
  const regex = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g;
  const result: Record<string, string> = {};
  css.replace(regex, (match, prop, val) => (result[prop] = val));
  return result;
}

// DONE
function Video(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;
  const src = `${hugoConfig.siteParams.img_url}images/${attrs.src}`;

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
};

// DONE
function InlineImage(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const imgProps: Record<string, any> = {
    srcSet: buildImagePermalink({ src: attrs.src, hugoConfig }) + '?auto=format'
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

export const ImgTemplate = (props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) => {
  console.log('Rendering ImgTemplate');
  const { attrs, hugoConfig } = props;

  const isGif = attrs.src.split('.')[1] === 'gif';

  if (attrs.video) {
    return <Video attrs={attrs} hugoConfig={hugoConfig} />;
  }

  if (attrs.inline) {
    return <InlineImage attrs={attrs} hugoConfig={hugoConfig} />;
  }

  if (attrs.popup && !isGif) {
    return (
      <PopUpLink attrs={attrs} hugoConfig={hugoConfig}>
        <Picture attrs={attrs} hugoConfig={hugoConfig} />
      </PopUpLink>
    );
  }

  if (attrs.href) {
    if (isGif) {
      return <Gif attrs={attrs} hugoConfig={hugoConfig} />;
    } else {
      return <Picture attrs={attrs} hugoConfig={hugoConfig} />;
    }
  }

  if (isGif) {
    return <Gif attrs={attrs} hugoConfig={hugoConfig} />;
  } else {
    return <Picture attrs={attrs} hugoConfig={hugoConfig} />;
  }
};

// src is resolved with {{ (print $img_resource | safeURL) }}
// TODO: When is auto=format added to the src?
function Gif(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const imgProps: Record<string, any> = {
    className: 'img-fluid',
    src: buildImagePermalink({ src: props.attrs.src, hugoConfig }) + '?auto=format'
  };

  if (attrs.style) {
    imgProps.style = cssStringToObject(attrs.style);
  }

  if (attrs.alt) {
    imgProps.alt = attrs.alt;
  }

  return <img {...imgProps} />;
}

// TODO: href should be resolved with "{{ print $img_resource $pop_param | relURL }}"
function PopUpLink(props: {
  children: React.ReactNode;
  attrs: ImgTagAttrs;
  hugoConfig: HugoConfig;
}) {
  const { attrs, children } = props;

  const isGif = attrs.src.split('.')[1] === 'gif';
  const popParam = attrs.pop_param || (isGif ? '?fit=max' : '?fit=max&auto=format');

  // TODO, make this a relative URL: {{ print $img_resource $pop_param | relURL }}
  const href =
    buildImagePermalink({ src: attrs.src, hugoConfig: props.hugoConfig }) + popParam;

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

function Picture(props: { attrs: ImgTagAttrs; hugoConfig: HugoConfig }) {
  const { attrs, hugoConfig } = props;

  const pictureProps: Record<string, any> = {
    className: 'img-fluid',
    srcSet: buildImagePermalink({ src: attrs.src, hugoConfig }) + '?auto=format'
  };

  if (attrs.style) {
    pictureProps.style = cssStringToObject(attrs.style);
  }

  if (attrs.alt) {
    pictureProps.alt = attrs.alt;
  }

  if (!attrs.wide) {
    if (attrs.width) {
      pictureProps.width = attrs.width;
    }
    if (attrs.height) {
      pictureProps.height = attrs.height;
    }
  }

  return <picture {...pictureProps} />;
}

/**
Link logic:

// 1
// Resolve the image source

{{- $img := (print .Site.Params.img_url "images/" $src) -}}
// STOP IF VIDEO, use the above as the src - DONE

// 2
// Create the image resource (I think this is just the image URL adapted for staging)

{{- $img_resource := partial "img-resource.html" (dict "context" . "src" (print "images/" $src)) -}}

// 3
// Set img_param and pop_param as variables

{{- if .Get "img_param" | len -}}
  {{- .Get "img_param" | $.Scratch.Add "img_param" -}}
{{- else -}}
  {{- $.Scratch.Add "img_param" (printf "?ch=Width,DPR&fit=max") -}}
{{- end -}}

{{- if .Get "pop_param" | len -}}
  {{- .Get "pop_param" | $.Scratch.Add "pop_param" -}}
{{- else -}}
  {{- if eq $image_ext "gif" -}}
     {{- $.Scratch.Add "pop_param" "?fit=max" -}}
  {{- else -}}
     {{- $.Scratch.Add "pop_param" "?fit=max&auto=format" -}}
  {{- end -}}
{{- end -}}

{{- $img_param := $.Scratch.Get "img_param" -}}
{{- $pop_param := $.Scratch.Get "pop_param" -}}

// 4
// Make a variable called e for ... reasons

{{ $e := (print $img_resource "?auto=format" | safeURL) }}
- STOP if inline image, use the above as the srcSet attr - DONE

// 5
// If a block display image that IS a popup and IS NOT a gif, build the popup link
// href="{{ print $img_resource $pop_param | relURL }}"

// 6
// If it's NOT a popup, but there is an href, wrap the image in an anchor tag
<a href="{{- with .Get "href" -}}{{- . -}}{{- end -}}"
{{- if .Get "target" -}}target="{{- with .Get "target" -}}{{- . -}}{{- end -}}"{{- end -}} >

// 7
// If it's wide, set e:
// {{ $e := (print $img_resource "?auto=format" safeURL) }}
// If it's a gif, use e as the src
// If it's not a gif, use e as the srcset

 */

/*
// DONE
{{ if  not (.Get "src") }}
    {{ errorf "Img shortcode error: Missing value for param 'src': %s" .Position }}
{{ end }}
{{- if eq (.Get "popup") "false" -}}
  {{- $.Scratch.Set "popup" "false" -}}
{{- else -}}
  {{- $.Scratch.Set "popup" "true" -}}
{{- end -}}
{{- $isPopup := $.Scratch.Get "popup" -}}
{{- $img_width := .Get "width" -}}
{{- $img_inline := .Get "inline" | default "false" -}}
{{- $img_height := .Get "height" -}}
{{- $wide :=  .Get "wide" -}}
{{- $video :=  .Get "video" -}}
{{- $src := (.Get "src") -}}

// LINK LOGIC 1
{{- $img := (print .Site.Params.img_url "images/" $src) -}}

// LINK LOGIC 2
// DONE
{{- $img_resource := partial "img-resource.html" (dict "context" . "src" (print "images/" $src)) -}}

// DONE
{{- $image_type_arr := split (.Get "src") "." -}}
{{- $image_ext := index $image_type_arr 1 -}}
{{- if $wide -}}
    {{- $.Scratch.Set "imgix_w" "1170" -}}
{{- else -}}
    {{- $.Scratch.Set "imgix_w" "850" -}}
{{- end -}}
{{- $imgix_w := $.Scratch.Get "imgix_w" -}}


// LINK LOGIC 3
// DONE
{{- if .Get "img_param" | len -}}
  {{- .Get "img_param" | $.Scratch.Add "img_param" -}}
{{- else -}}
  {{- $.Scratch.Add "img_param" (printf "?ch=Width,DPR&fit=max") -}}
{{- end -}}

// LINK LOGIC 3
// DONE
{{- if .Get "pop_param" | len -}}
  {{- .Get "pop_param" | $.Scratch.Add "pop_param" -}}
{{- else -}}
  {{- if eq $image_ext "gif" -}}
     {{- $.Scratch.Add "pop_param" "?fit=max" -}}
  {{- else -}}
     {{- $.Scratch.Add "pop_param" "?fit=max&auto=format" -}}
  {{- end -}}
{{- end -}}
{{- $img_param := $.Scratch.Get "img_param" -}}
{{- $pop_param := $.Scratch.Get "pop_param" -}}

// DONE
{{- $figure_class :=  .Get "figure_class" -}}

// LINK LOGIC 4
// DONE
{{ $e := (print $img_resource "?auto=format" | safeURL) }}

// NOT DONE
{{- if not (eq $img_inline "true")}}

  // DONE
  <div class="shortcode-wrapper shortcode-img expand {{- if $wide -}}wide-parent{{- end -}}"><figure class="text-center {{- if $wide -}}wide {{- end -}}{{ $figure_class -}}" {{- if .Get "figure_style" -}}style="{{- with .Get "figure_style" -}}{{- . | safeCSS -}}{{- end -}}"{{- end -}}>
    // DONE
    {{- if $video -}}

      // DONE
      <video width="{{$img_width | default "100%" }}" height="auto"
            muted
            playsinline
            autoplay
            loop
            controls >
        <source src="{{ $img }}"
                type="video/mp4"
                media="(min-width: 0px)" >
        <div class="play"></div>
        <div class="pause"></div>
      </video>

    // if it's not a video, wrap it in a popup link
    {{- else -}}
    
      // LINK LOGIC 5
      {{- if (and (eq $isPopup "true") (ne $image_ext "gif")) -}}
      <a href="{{ print $img_resource $pop_param | relURL }}" class="pop" data-bs-toggle="modal" data-bs-target="#popupImageModal">

      // LINK LOGIC 6
      {{- else if .Get "href" -}}
        <a href="{{- with .Get "href" -}}{{- . -}}{{- end -}}"
          {{- if .Get "target" -}}target="{{- with .Get "target" -}}{{- . -}}{{- end -}}"{{- end -}} >
      {{- end -}}

  // LINK LOGIC 7
  {{- if $wide -}}
    {{ $e := (print $img_resource "?auto=format" safeURL) }}

    {{- if eq $image_ext "gif" -}}
      <img class="img-fluid" src="{{ (print $img_resource | safeURL) }}" {{ if .Get "style" }} style="{{ with .Get "style" }}{{ . | safeCSS }}{{end}}" {{ end }} {{ if .Get "alt" }} alt="{{ with .Get "alt"}}{{ . }}{{ end }}" {{ end }} />

    {{- else -}}
      <picture {{ if .Get "style" }} style="{{- with .Get "style" -}}{{- . | safeCSS -}}{{- end -}}" {{ end }}>
        <img class="img-fluid" srcset="{{ $e }}" {{ if .Get "style" }} style="{{ with .Get "style" }}{{ . | safeCSS }}{{end}}" {{ end }} {{ if .Get "alt" }} alt="{{ with .Get "alt"}}{{ . }}{{ end }}" {{ end }} />
      </picture>
    {{- end -}}

  
  {{- else -}}
      {{ $e := (print $img_resource "?auto=format" | safeURL) }}
      {{- if eq $image_ext "gif" -}}
        <img class="img-fluid" src="{{ (print $img_resource | safeURL) }}" {{ if .Get "style" }} style="{{- with .Get "style" -}}{{ . | safeCSS }}{{- end -}}" {{ end }} {{ if .Get "alt" }} alt="{{- with .Get "alt" -}}{{.}}{{- end -}}" {{ end }} />
      {{- else -}}
        <picture class="" {{ if .Get "style" }} style="{{- with .Get "style" -}}{{- . | safeCSS -}}{{- end -}}" {{ end }} >
          <img 
              class="img-fluid" 
              srcset="{{ $e }}" 
              {{ if .Get "style" }}style="{{ with .Get "style" }}{{ . | safeCSS }}{{ end }}" {{ end }} 
              {{- with $img_width -}} width="{{ . }}" {{- end -}}
              {{- with $img_height -}} height="{{ . }}" {{- end -}}
              {{ if .Get "alt" }} alt="{{- with .Get "alt" -}}{{.}}{{- end -}}" {{ end }} />
        </picture>
      {{- end -}}
  {{- end -}}

  {{- if (and (eq $isPopup "true") (ne $image_ext "gif")) -}}
    </a>
  {{- else if .Get "href" -}}
    </a>
  {{- end -}}

  {{- end -}}


    {{- if .Get "caption" -}}
        {{- with .Get "caption" -}}
            <figcaption>{{.}}</figcaption>
        {{- end -}}
      {{- end -}}
    </figure>
  </div>

{{- else -}}

  // DONE, inline image
  <img 
    srcset="{{ $e }}" 
    {{ if .Get "style" }}style="{{ with .Get "style" }}{{ . | safeCSS }}{{ end }}" {{ end }} 
    {{- with $img_width -}} width="{{ . }}" {{- end -}}
    {{- with $img_height -}} height="{{ . }}" {{- end -}} />

{{- end -}}
*/
