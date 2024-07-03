---
description: Learn about useful metrics you can generate from APM data.
further_reading:
- link: tracing/trace_pipeline/
  tag: Documentation
  text: Customize trace ingestion and retain important traces.
- link: tracing/trace_collection/
  tag: Documentation
  text: Instrument your services and set up trace data collection in the Agent
- link: monitors/
  tag: Documentation
  text: Create and manage monitors to notify your teams when it matters.
kind: documentation
title: APM Metrics
---

## Trace metrics

[Tracing application metrics][1] are collected after enabling trace collection and instrumenting your application. These metrics are available for dashboards and monitors.
These metrics capture **request** counts, **error** counts, and **latency** measures. They are calculated based on 100% of the application's traffic, regardless of any [trace ingestion sampling][2] configuration.

By default, these metrics are calculated in the Datadog Agent based on the traces sent from an instrumented application to the Agent.

Ingested span and traces are kept for 15 minutes. Indexed spans and traces that retention filters keep are stored in Datadog for 15 days. But if you generate custom metrics from ingested data, the metrics are retained for 15 months.

## Runtime metrics

Enable [runtime metrics collection][3] in supported tracing libraries to gain insights into an application's performance. These metrics are sent to the Datadog Agent over the configured DogStatsD port.


## Next steps

{{< whatsnext desc="Use what you set up:" >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}Create a Dashboard to track and correlate APM metrics{{< /nextlink >}}
    {{< nextlink href="monitors/create/types/apm/" >}}Create APM Monitors that alert and notify you when something is unexpected{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/metrics/metrics_namespace/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ja/tracing/metrics/runtime_metrics/