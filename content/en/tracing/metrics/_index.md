---
title: APM Metrics
kind: documentation
description: 'Learn about useful metrics you can generate from APM data.'
further_reading:
    - link: 'tracing/trace_pipeline/'
      tag: "Documentation"
      text: 'Customize trace ingestion and retain important traces.'
    - link: 'tracing/trace_collection/'
      tag: "Documentation"
      text: 'Instrument your services and set up trace data collection in the Agent'
    - link: 'monitors/'
      tag: "Documentation"
      text: 'Create and manage monitors to notify your teams when it matters.'
---

## Trace metrics

[Tracing application metrics][1] are collected after enabling trace collection and instrumenting your application. These metrics are available for dashboards and monitors.

Ingested span and traces are kept for 15 minutes. Indexed spans and traces that retention filters keep are stored in Datadog for 15 days. But if you generate custom metrics from ingested data, the metrics are retained for 15 months. 

## Runtime metrics

Enable [runtime metrics collection][2] in supported tracing libraries to gain insights into an application’s performance.

## Monitors on APM data

Learn how to [create APM monitors][3] that alert and notify you when APM metrics or trace analytics reach certain thresholds or fall outside expected bounds.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/metrics/metrics_namespace/
[2]: /tracing/metrics/runtime_metrics/
[3]: /monitors/create/types/apm/
