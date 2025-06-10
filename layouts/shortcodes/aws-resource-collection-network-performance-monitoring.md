| Resource Type | Permissions |
| ------------- | ----------- |
{{ $product_code := "npm" -}}
{{- with .Site.Data.product_resource_types_permissions -}}{{- range . -}}{{- if eq .ProductCode $product_code -}}{{ range $rtp := .ResourceTypesPermissions }}
{{- range $rtp.Permissions -}}
{{- println "| " $rtp.ResourceType " | " . " |" -}}
{{- end -}}
{{ end }}{{- end -}}{{- end -}}{{- end -}}
