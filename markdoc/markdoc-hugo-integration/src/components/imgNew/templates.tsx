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

function Video(props: { width: string; src: string }) {
  return (
    <video
      width={props.width || '100%'}
      height="auto"
      muted
      playsInline
      autoPlay
      loop
      controls
    >
      <source src={props.src} type="video/mp4" media="(min-width: 0px)" />
      <div className="play"></div>
      <div className="pause"></div>
    </video>
  );
}

export const ImgTemplate = (props: {
  attrs: {
    src: string;
    alt: string;
    style: string;
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
  };
  hugoConfig: HugoConfig;
}) => {
  console.log('Rendering ImgTemplate');
  const { attrs, hugoConfig } = props;

  const isPopup = attrs.popup;

  const img = `${hugoConfig.siteParams.img_url}images/${attrs.src}`;
  const permalink = buildImagePermalink({ src: attrs.src, hugoConfig }) + '?auto=format';

  const imageExt = attrs.src.split('.')[1];
  // TODO: What does this get used for?
  const imgixWidth = attrs.wide ? '1170' : '850';

  const popParam =
    attrs.pop_param || (imageExt === 'gif' ? '?fit=max' : '?fit=max&auto=format');

  let wrapperClass = 'shortcode-wrapper shortcode-img expand';
  if (attrs.wide) {
    wrapperClass += ' wide-parent';
  }

  let figureClass = 'text-center';
  if (attrs.wide) {
    figureClass += ' wide';
  }
  if (attrs.figure_class) {
    figureClass += ` ${attrs.figure_class}`;
  }

  let figureStyle = {};
  if (attrs.figure_style) {
    figureStyle = cssStringToObject(attrs.figure_style);
  }

  return (
    <div className={wrapperClass}>
      <figure className={figureClass} style={figureStyle}>
        {/* video */}
        {attrs.video && <Video width={attrs.width} src={img} />}
        {/* image */}
        {!attrs.video && (
          <>
            {isPopup && imageExt !== 'gif' && (
              <>
                <a
                  href="{{ print $img_resource $pop_param | relURL }}"
                  className="pop"
                  data-bs-toggle="modal"
                  data-bs-target="#popupImageModal"
                ></a>
              </>
            )}
          </>
        )}
      </figure>
    </div>
  );
};

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
{{- $img := (print .Site.Params.img_url "images/" $src) -}}

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


// DONE
{{- if .Get "img_param" | len -}}
  {{- .Get "img_param" | $.Scratch.Add "img_param" -}}
{{- else -}}
  {{- $.Scratch.Add "img_param" (printf "?ch=Width,DPR&fit=max") -}}
{{- end -}}

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

// DONE
{{ $e := (print $img_resource "?auto=format" | safeURL) }}

// NOT DONE
{{- if not (eq $img_inline "true")}}

  <div class="shortcode-wrapper shortcode-img expand {{- if $wide -}}wide-parent{{- end -}}"><figure class="text-center {{- if $wide -}}wide {{- end -}}{{ $figure_class -}}" {{- if .Get "figure_style" -}}style="{{- with .Get "figure_style" -}}{{- . | safeCSS -}}{{- end -}}"{{- end -}}>
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

    {{- else -}}
    
      {{- if (and (eq $isPopup "true") (ne $image_ext "gif")) -}}
      <a href="{{ print $img_resource $pop_param | relURL }}" class="pop" data-bs-toggle="modal" data-bs-target="#popupImageModal">

      {{- else if .Get "href" -}}
        <a href="{{- with .Get "href" -}}{{- . -}}{{- end -}}"
          {{- if .Get "target" -}}target="{{- with .Get "target" -}}{{- . -}}{{- end -}}"{{- end -}} >
      {{- end -}}

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
  <img 
    srcset="{{ $e }}" 
    {{ if .Get "style" }}style="{{ with .Get "style" }}{{ . | safeCSS }}{{ end }}" {{ end }} 
    {{- with $img_width -}} width="{{ . }}" {{- end -}}
    {{- with $img_height -}} height="{{ . }}" {{- end -}} />
  {{- end -}}
*/
