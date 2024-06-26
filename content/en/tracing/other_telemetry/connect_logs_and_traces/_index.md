---
title: Correlate Logs and Traces
kind: documentation
type: multi-code-lang
description: 'Connect your logs and traces to correlate them in Datadog.'
aliases:
    - /tracing/advanced/connect_logs_and_traces/
    - /tracing/connect_logs_and_traces/
algolia:
  tags: ["logs and traces"]
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs in Traces" style="width:100%;">}}

The correlation between Datadog APM and Datadog Log Management is improved by the injection of trace IDs, span IDs, `env`, `service`, and `version` as attributes in your logs. With these fields you can find the exact logs associated with a specific service and version, or all logs correlated to an observed [trace][1].

It is recommended to configure your application's tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This will provide the best experience for adding `env`, `service`, and `version`. See the [unified service tagging][2] documentation for more details.

Before correlating traces with logs, ensure your logs are either sent as JSON, or [parsed by the proper language level log processor][3]. Your language level logs _must_ be turned into Datadog attributes in order for traces and logs correlation to work.

To learn more about automatically or manually connecting your logs to your traces, select your language below:

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /tracing/glossary/#trace
[2]: /getting_started/tagging/unified_service_tagging
[3]: /agent/logs/#enabling-log-collection-from-integrations
