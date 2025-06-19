{{- $content := .Content -}}

# {{ .Title }}

{{ with .Description }}
{{ . }}
{{ end }}

{{ if .Params.kind }}
**Kind**: {{ .Params.kind }}
{{ end }}

{{ if .Params.aliases }}
**Aliases**: {{ delimit .Params.aliases ", " }}
{{ end }}

{{ $content := replaceRE `<div class="tab-content">[\s\S]*?</div>` "" .Content }}
{{ $content := replaceRE `<div class="tabs">[\s\S]*?</div>` "" $content }}
{{ $content := replaceRE `<([^>]+)>` "" $content }}

{{ $content }}

---

## Related Links

{{ range .Pages }}

-   [{{ .Title }}]({{ .RelPermalink | replaceRE "^/|/$" "" }}.md)
    {{ end }}

{{ if .Parent }}
[Back to {{ .Parent.Title }}]({{ .Parent.RelPermalink | replaceRE "^/|/$" "" }}.md)
{{ end }}
