{{- $lang := .Get "lang" -}}
{{- $signal := .Get "signal" | lower -}}
{{- $sdk := .Get "sdk_name" -}}

You can instrument your {{ $lang }} application using the standard OpenTelemetry (OTel) {{ if eq $signal "metrics" }}Metrics{{ else }}Logs{{ end }} API, and the Datadog SDK (`{{ $sdk }}`) captures and sends the data to Datadog.

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

<div class="alert alert-info">You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.</div>
