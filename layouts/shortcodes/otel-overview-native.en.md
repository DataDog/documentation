{{- $lang := .Get "lang" -}}
{{- $signal := .Get "signal" | lower -}}
{{- $sdk := .Get "sdk_name" -}}
{{- $signalCap := .Get "signal" -}}

{{- $alternative := "" -}}
{{- if eq $signal "metrics" -}}
  {{- $alternative = "[DogStatsD][100]" -}}
{{- else if eq $signal "logs" -}}
  {{- $alternative = "Datadog's traditional log injection" -}}
{{- end -}}

Send custom application {{ $signal }} into Datadog using the OpenTelemetry (OTel) {{ $signalCap }} API with the Datadog SDK (`{{ $sdk }}`).

{{ if $alternative }}This is an alternative to using {{ $alternative }} and means you can write code against the standard OTel interfaces while benefiting from all the features of the Datadog SDK.{{ else }}You can write code against the standard OTel interfaces whilst benefiting from all the features of the Datadog SDK.{{ end }}

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

<div class="alert alert-info">You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.</div>

[100]: /developers/dogstatsd/