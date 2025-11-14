---
title: Generate Custom Metrics from Spans and Traces
description: 'Generate custom metrics from ingested spans and complete traces.'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'Customize trace ingestion and retain important traces'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Use Analytics queries and monitors based on retained traces'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: 'Use advanced trace queries to create metrics from specific traces'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'Monitor 100% of your application traffic with trace metrics'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Create and manage span-based metrics with Terraform'
---

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="Request access to the Preview!" >}}
Custom metrics from traces are in Preview. To request access, submit a ticket to the APM Support team and provide a short description of your use case.
{{< /callout >}}

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Span-based metrics" >}}

Generate custom metrics from ingested spans to track trends, power dashboards, and trigger monitors—even for spans and traces that are not retained for full trace analysis.

Custom metrics are created from spans ingested by Datadog APM, regardless of whether a [retention filter][1] indexes those spans. Extract numeric values from spans (such as counts, durations, or custom tags) or traces (end-to-end trace duration) and store them as long-lived [custom metrics][3] with 15-month retention.

**Notes:**
- Datadog automatically generates [Trace Metrics][13] that capture request counts, error rates, and latency distributions for 100% of your application traffic.
- Available spans for custom metric generation depend on your [APM ingestion control settings][12]. Dropped spans from sampling or filtering cannot generate metrics.


Use custom metrics from spans for:
- Fine-grained visibility into span-level latency, error rates, or tag-level performance
- Powering [anomaly][4] or [forecast][7] monitors with low-latency, high-resolution metrics.
- Extracting key signals for trending or alerting without retaining the full span.

### When to use custom metrics from traces

Use custom metrics from traces for:
- Metrics derived from complete trace context, such as total trace duration or operations per trace.
- Alerting on conditions requiring full trace knowledge (for example, N+1 query detection or fan-out patterns).
- Extracting key signals for trending or alerting without retaining the full trace.

<div class="alert alert-danger">Custom metrics from spans and traces are <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by high-cardinality values (such as user IDs, request IDs, or timestamps) to prevent billing impact.</div>

## Create a metric from spans or traces

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. Navigate to [**APM** > **Generate Metrics**][14].
2. Click **New Metric**.
3. Name your metric following the [metric naming convention][11]. Metric names starting with `trace.*` are not allowed.
4. Select the metric type: **Spans** or **Traces**. Both use the same [query syntax][10] as APM Search and Analytics.
5. Define the metric query to filter and include only the spans or traces you want to measure.
6. Choose the value to aggregate:
     - Select `*` to count all matching spans or traces.
     - Enter a numeric attribute (for example, `@cassandra_row_count`) to aggregate and track the count, min, max, sum, or percentiles.
7. Set grouping dimensions. By default, metrics have no tags unless you add them. Use any span attribute or tag to create metric tags.
8. Preview the result to view the real-time impact of your query through the data visualization and matching spans or traces in the live preview.
9. Click **Create Metric**.

<div class="alert alert-danger"> Span-based metrics are considered <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avoid impacting your billing.</div>


## Update existing metrics

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Edit an existing metrics" >}}

After a metric is created, only two fields can be updated:

| Field                                  | Reason                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Stream filter query                    | Change the set of matching spans to be aggregated into metrics.                                                         |
| Aggregation groups                     | Update the tags to manage the cardinality of generated metrics.                                                         |

**Note**: To change the metric type or name, create a new metric and delete the old one.


## Data availability

Metrics generated from traces are emitted after a trace completes. For long-running traces, the delay increases accordingly (for example, a 45-minute trace's metric cannot be emitted until trace completion).

When using custom metrics from traces in monitors, account for this latency to avoid false positives.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_pipeline/trace_retention
[2]: /account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/metrics/#overview
[4]: /monitors/types/anomaly/#overview
[5]: /tracing/trace_explorer/
[6]: /tracing/trace_explorer/query_syntax/#analytics-query
[7]: /monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /tracing/trace_explorer/query_syntax/
[11]: /metrics/#naming-metrics
[12]: /tracing/trace_pipeline/ingestion_controls
[13]: /tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
