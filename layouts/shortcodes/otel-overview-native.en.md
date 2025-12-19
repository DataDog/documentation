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

The Datadog SDK provides a native implementation of the OpenTelemetry API.

- **Do** install the standard OpenTelemetry API packages (`io.opentelemetry:opentelemetry-api`) to instrument your code.
- **Do Not** install the OpenTelemetry SDK packages (`opentelemetry-sdk`). The Datadog SDK acts as the implementation provider; installing both can lead to runtime conflicts and duplicate telemetry.

[100]: /developers/dogstatsd/
