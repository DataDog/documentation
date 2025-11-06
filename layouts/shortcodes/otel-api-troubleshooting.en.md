{{- $signal := .Get "signal" -}}
{{- if eq $signal "metrics" -}}
- Ensure `DD_METRICS_OTEL_ENABLED` is set to `true`.
{{ else }}
- Ensure `DD_LOGS_OTEL_ENABLED` is set to `true`.
{{- end -}}
- Verify that your OTLP destination is configured correctly to receive {{ $signal }}.
- If you are sending data to the Datadog Agent, ensure OTLP ingestion is enabled. See [Enabling OTLP Ingestion on the Datadog Agent][1] for details.

[1]: /opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent