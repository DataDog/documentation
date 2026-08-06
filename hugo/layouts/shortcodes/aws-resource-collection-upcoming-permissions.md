{{- with .Site.Data.future_resource_collection_permissions -}}{{ transform.Highlight (. | jsonify (dict "indent" "  ")) "json" }}{{- end -}}
