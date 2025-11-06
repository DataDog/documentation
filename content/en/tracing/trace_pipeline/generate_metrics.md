---
title: Generate Metrics from Spans
description: 'Generate custom metrics from ingested spans.'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'Customize trace ingestion and retain important traces.'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Use Analytics queries and monitors based on retained traces.'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Create and manage span-based metrics with Terraform'
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Span-based metrics" >}}

Generate custom metrics from ingested spans to track trends, power dashboards, and trigger monitors—even for spans that are not retained for full trace analysis.

Span-based metrics are created from spans that have been ingested by Datadog APM, regardless of whether those spans are indexed by a [retention filter][1]. These metrics allow you to extract numeric values (such as counts, durations, or custom tags) from spans and store them as long-lived [custom metrics][3] with a 15-month retention period.

**Note:** The set of spans available for metric generation depends on your [APM ingestion control settings][12]. Spans dropped due to sampling or filtering are not ingested, and therefore cannot be used to generate metrics.

Use span-based metrics when you:
- Need long-term visibility into span-level patterns, such as request volume, latency, or error rates
- Want to power [anomaly][4] or [forecast][7] monitors with low-latency, high-resolution metrics
- Don't need to retain the full trace, but want to extract key signals for trending or alerting

<div class="alert alert-danger">Span-based metrics are considered <a href="/metrics/custom_metrics/">custom metrics</a> and are billed accordingly. To avoid high costs, do not group metrics by high-cardinality values such as user IDs or request IDs.</div>

## Create a span-based metric

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. **Define the metric query:** Start by adding a query for filtering to your required dataset. The [query syntax][10] is the same as APM Search and Analytics.

1. **Define the field you want to track:** Select `*` to generate a count of all spans matching your query or enter an attribute (for example, `@cassandra_row_count`) to aggregate a numeric value and create its corresponding count, minimum, maximum, sum, and average aggregated metrics. If the attribute type is a measure, the value of the metric is the value of the span attribute.

   **Note**: Span attributes that are not numerical values cannot be used for aggregation. To generate a metric that counts the distinct values of a span attribute (for instance count the number of user IDs hitting a specific endpoint), add this dimension to the `group by` selector, and use the `count_nonzero` function to count the number of tag values.

1. **Specify the group-by dimension:** By default, metrics generated from spans will not have any tags unless explicitly added. Any attribute or tag that exists in your spans can be used to create metric tags.

1. **Check the Live Analytics and Search Query preview:** You can view the impact of your query in real-time on the data visualization, and the matching spans considered for your query in a live preview.

1. **Name your metric:** Metric names must follow the [metric naming convention][11]. Metric names that start with `trace.*` are not permitted and will not be saved.

<div class="alert alert-danger"> Span-based metrics are considered <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avoid impacting your billing.</div>

## Update existing span-based metrics

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Edit an existing metrics" >}}

After a metric is created, only two fields can be updated:

| Field                                 | Reason                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Stream filter query                  | Change the set of matching spans to be aggregated into metrics.            |
| Aggregation groups             | Update the tags to manage the cardinality of generated metrics.                                                     |

**Note**: To change the metric type or name, create a new metric and delete the old one.

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
