---
title: Connect Logs and Traces
kind: documentation
description: 'Connect your logs and traces to correlate them in Datadog.'
aliases:
    - /tracing/advanced/connect_logs_and_traces/
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs in Traces"  style="width:100%;">}}

The correlation between Datadog APM and Datadog Log Management is improved by automatically adding a `trace_id` and `span_id` in your logs with the Tracing Libraries. This can then be used in the platform to show you the exact logs correlated to the observed [trace][1].

Before correlating traces with logs, ensure your logs are either sent as JSON, or [parsed by the proper language level log processor][2].

Your language level logs _must_ be turned into Datadog attributes in order for traces and logs correlation to work. Select your language below to learn how to automatically or manually connect your logs to your traces:

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /tracing/visualization/#trace
[2]: /agent/logs/#enabling-log-collection-from-integrations
