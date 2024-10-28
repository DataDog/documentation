import { HugoConfig } from '../../schemas/hugoConfig';
import md5 from 'md5';

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

export const ImgTemplate = (props: {
  attrs: {
    src: string;
    alt: string;
    style: string;
    video: boolean;
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
  const permalink = buildImagePermalink({ src: attrs.src, hugoConfig });

  const imageExt = attrs.src.split('.')[1];
  const imgixWidth = attrs.wide ? '1170' : '850';

  const popParam =
    attrs.pop_param || (imageExt === 'gif' ? '?fit=max' : '?fit=max&auto=format');

  return (
    <div>
      <em>-- NEW IMAGE TAG GOES HERE --</em>
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


{{ $e := (print $img_resource "?auto=format" | safeURL) }}
{{- if not (eq $img_inline "true")}}
  <div class="shortcode-wrapper shortcode-img expand {{- if $wide -}}wide-parent{{- end -}}"><figure class="text-center {{- if $wide -}}wide {{- end -}}{{ $figure_class -}}" {{- if .Get "figure_style" -}}style="{{- with .Get "figure_style" -}}{{- . | safeCSS -}}{{- end -}}"{{- end -}}>
    {{- if $video -}}
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
