---
title: Connect Logs and Traces
kind: documentation
description: 'Connect your logs and traces to correlate them in Datadog.'
aliases:
    - /tracing/advanced/connect_logs_and_traces/
further_reading:
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs in Traces"  style="width:100%;">}}

The correlation between Datadog APM and Datadog Log Management is improved by automatically adding a `trace_id` and `span_id` in your logs with the Tracing Libraries. This can then be used in the platform to show you the exact logs correlated to the observed [trace][1].

Before correlating traces with logs, ensure your logs are either sent as JSON, or [parsed by the proper language level log processor][2].

Your language level logs _must_ be turned into Datadog attributes in order for traces and logs correlation to work. Select your language below to learn how to automatically or manually connect your logs to your traces:

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /agent/logs/#enabling-log-collection-from-integrations
