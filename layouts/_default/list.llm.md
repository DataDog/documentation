# {{ .Title }}

{{ with .Description }}
{{ . }}
{{ end }}

{{ $content := replaceRE `<div class="tab-content">[\s\S]*?</div>` "" .Content }}
{{ $content := replaceRE `<div class="tabs">[\s\S]*?</div>` "" $content }}
{{ $content := replaceRE `<([^>]+)>` "" $content }}

{{ $content }}

## Pages in this Section

{{ range .Pages }}

-   [{{ .Title }}]({{ .RelPermalink | replaceRE "^/|/$" "" }}.md)
    {{ with .Description }} - {{ . }}{{ end }}
    {{ end }}

{{ if .Sections }}

## Subsections

{{ range .Sections }}

-   [{{ .Title }}]({{ .RelPermalink | replaceRE "^/|/$" "" }}.md)
    {{ with .Description }} - {{ . }}{{ end }}
    {{ end }}
    {{ end }}

{{ if .Parent }}
[Back to {{ .Parent.Title }}]({{ .Parent.RelPermalink | replaceRE "^/|/$" "" }}.md)
{{ end }}
