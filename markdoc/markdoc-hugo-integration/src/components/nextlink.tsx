import { HugoFunctions } from '../helperModules/HugoFunctions';
import { CustomHtmlComponent } from '../helperModules/renderer';

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
    let link: string = this.tag.attributes.href;

    // If the href is not an absolute URL,
    // make it an absolute URL with a language prefix
    if (!link.startsWith('http')) {
      link = HugoFunctions.absLangUrl({
        hugoConfig: this.hugoConfig,
        url: link
      });
    }

    return `<div>nextlink goes here</div>`;
  }
}

/*

// DONE
{{ $dot := . }}
{{- $href := .Get "href" -}}
{{- $tag := .Get "tag" -}}
{{- $img := .Get "img" -}}
{{- $text := .Inner -}}

// DONE
{{ if eq (substr $href 0 4) "http"}}
    {{ $.Scratch.Set "link" $href}}
{{ else }}
    {{ if eq (substr $href 0 1) "/"}}
        {{ $.Scratch.Set "link" ((substr $href 1) | absLangURL) }}
    {{ else }}
        {{ $.Scratch.Set "link" ($href | absLangURL) }}
    {{ end }}
{{ end }}

// DONE
// If the url ends with a anchor link e.g #graphing then make sure this doesn't get stripped during the abslang
{{ $fragment := (urls.Parse $href).Fragment }}
{{ if $fragment }}
  {{ if not (strings.HasSuffix ($.Scratch.Get "link") (print "#" $fragment)) }}
    {{ $.Scratch.Set "link" (print ($.Scratch.Get "link") "#" $fragment) }}
  {{ end }}
{{ end }}

// DONE
{{ $link := $.Scratch.Get "link" }}

{{- with .Parent -}}
    <a class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="{{ $link }}">
        {{ with $img }}
            {{ partial "img.html" (dict "root" $dot "src" $img "class" "img-fluid") }}
        {{ end }}    
        <span class="w-100 d-flex justify-content-between {{ with $img }} ps-1 {{ end }}"><span class="text">{{ $text }}</span>{{ if $tag }}<span class="badge badge-white pe-2 border-0">{{ $tag | upper }}</span>{{ end }}</span>
        {{ partial "img.html" (dict "root" $dot "src" "icons/list-group-arrow.png" "class" "img-fluid static" "alt" "more") }}
        {{ partial "img.html" (dict "root" $dot "src" "icons/list-group-arrow-r.png" "class" "img-fluid hover" "alt" "more" "disable_lazy" "true") }}
    </a>
{{- else -}}
    <a class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="{{ $link }}">
        {{ with $img }}
            {{ partial "img.html" (dict "root" $dot "src" $img "class" "img-fluid") }}
        {{ end }}   
        <span class="w-100 d-flex justify-content-between {{ with $img }} ps-1 {{ end }}"><span class="text">{{ $text }}</span>{{ if $tag }}<span class="badge badge-white pe-2 border-0">{{ $tag | upper }}</span>{{ end }}</span>
        {{ partial "img.html" (dict "root" $dot "src" "icons/list-group-arrow.png" "class" "img-fluid static" "alt" "more") }}
        {{ partial "img.html" (dict "root" $dot "src" "icons/list-group-arrow-r.png" "class" "img-fluid hover" "alt" "more" "disable_lazy" "true") }}
    </a>
{{- end }}
*/
