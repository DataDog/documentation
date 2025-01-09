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

Generate metrics from 100% of ingested spans, regardless of whether the spans are indexed by a [retention filter][1].

Use custom metrics for specific fixed queries and comparisons, while creating retention filters to allow arbitrary querying and investigation of the retained trace and its flame graph.

**Billing Note:** Metrics created from ingested spans are billed as [Custom Metrics][2].

For example, you may want to use custom metrics to visualize anomalies, create dashboards and monitors, and see trends across any parameters that are important to your business context. All generated metrics are available for 15 months as Datadog [custom metrics][3].

| Reason                        | Custom Metrics Generated from Spans                   | Retention Filters                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- |
| Retention Period                     | 15 months                    | 15 days             |
| Anomaly Detection                           | Create an [Anomaly Monitor][4] based on generated metrics.                            | Use Analytics to compare behavior over the past 15 days, and view complete traces to investigate root cause.                         |
| Investigation of matching traces with full context                          | N/A - Custom Metrics do not result in any retention of associated traces.                            | Keep exactly the traces relevant to your business context with [retention filters][1].                            |
| Granularity of behavior                           | Create custom metrics for important endpoints or other low-cardinality groups.                        | Use [Trace Explorer][5] for specific endpoints, or use the 'Group By' option in [Analytics][6].                    |
| Forecasting or complex mathematics                          | Create a [Forecast monitor][7] based on generated metrics.                          |   N/A                            |

To generate metrics from spans, on the [APM Setup and Configuration][8] page select the [Generate Metrics][9] tab, and click the **New Metric** button.

<br>

{{< img src="tracing/span_to_metrics/GenerateMetrics.png" style="width:100%;" alt="Generate metrics from ingested spans" >}}


## Creating a span-based metric

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. **Define the metric query:** Start by adding a query for filtering to your required dataset. The [query syntax][10] is the same as APM Search and Analytics.

1. **Define the field you want to track:** Select `*` to generate a count of all spans matching your query or enter an attribute (for example, `@cassandra_row_count`) to aggregate a numeric value and create its corresponding count, minimum, maximum, sum, and average aggregated metrics. If the attribute type is a measure, the value of the metric is the value of the span attribute.

   **Note**: Span attributes that are not numerical values cannot be used for aggregation. To generate a metric that counts the distinct values of a span attribute (for instance count the number of user IDs hitting a specific endpoint), add this dimension to the `group by` selector, and use the `count_nonzero` function to count the number of tag values.

1. **Specify the group-by dimension:** By default, metrics generated from spans will not have any tags unless explicitly added. Any attribute or tag that exists in your spans can be used to create metric tags.

1. **Check the Live Analytics and Search Query preview:** You can view the impact of your query in real-time on the data visualization, and the matching spans considered for your query in a live preview.

1. **Name your metric:** Metric names must follow the [metric naming convention][11]. Metric names that start with `trace.*` are not permitted and will not be saved.

<div class="alert alert-warning"> Span-based metrics are considered <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avoid impacting your billing.</div>

## Updating existing span-based metrics

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
