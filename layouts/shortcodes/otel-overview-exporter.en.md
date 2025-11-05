{{- $lang := .Get "lang" -}}
{{- $signal := .Get "signal" | lower -}}
{{- $sdk := .Get "sdk_name" -}}

You can instrument your {{ $lang }} application using the standard OpenTelemetry (OTel) {{ if eq $signal "metrics" }}Metrics{{ else }}Logs{{ end }} API, and the Datadog SDK (`{{ $sdk }}`) automatically configures the OTel SDK to export that data to Datadog.

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send {{ $signal }} to the Datadog Agent.