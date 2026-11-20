---
title: Correlate Logs and Traces
type: multi-code-lang
description: 'Connect your logs and traces to correlate them in Datadog.'
aliases:
    - /tracing/advanced/connect_logs_and_traces/
    - /tracing/connect_logs_and_traces/
algolia:
  tags: ["logs and traces"]
---

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Logs in Traces" style="width:100%;">}}

The correlation between Datadog APM and Datadog Log Management is improved by the injection of trace IDs, span IDs, `env`, `service`, and `version` as attributes in your logs. With these fields you can find the exact logs associated with a specific service and version, or all logs correlated to an observed [trace][1].

It is recommended to configure your application's tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This will provide the best experience for adding `env`, `service`, and `version`. See the [unified service tagging][2] documentation for more details.

Before correlating traces with logs, ensure your logs are either sent as JSON, or [parsed by the proper language level log processor][3]. Your language level logs _must_ be turned into Datadog attributes in order for traces and logs correlation to work.

**Note**: Traces and logs are sampled independently. Even after correlation is configured, a log may contain a trace ID that refers to a trace that was not ingested or not retained due to [trace sampling][4]. This does not indicate a configuration error. For more information, see [Log has a trace ID but the associated trace is missing][5].

To learn more about automatically or manually connecting your logs to your traces, select your language below:

{{< card-grid card_width="170px">}}
  {{< image-card href="java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="dotnet/" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="opentelemetry/" src="integrations_logos/otel.png" alt="OpenTelemetry" >}}
{{< /card-grid >}}

[1]: /tracing/glossary/#trace
[2]: /getting_started/tagging/unified_service_tagging
[3]: /agent/logs/#enabling-log-collection-from-integrations
[4]: /tracing/trace_pipeline/ingestion_controls/
[5]: /logs/troubleshooting/#log-has-a-trace-id-but-the-associated-trace-is-missing
