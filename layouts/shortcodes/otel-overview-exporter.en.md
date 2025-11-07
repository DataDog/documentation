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

{{ if $alternative }}This is an alternative to using {{ $alternative }} and means you can write code against the standard OTel interfaces while benefiting from all the features of the Datadog SDK.{{ else }}You can write code against the standard OTel interfaces while benefiting from all the features of the Datadog SDK.{{ end }}

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send {{ $signal }} to the Datadog Agent.

[100]: /developers/dogstatsd/