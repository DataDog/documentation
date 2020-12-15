---
title: Generate Metrics from Spans
kind: documentation
description: 'Generate custom metrics from ingested spans.'
further_reading:
    - link: 'tracing/trace_retention_and_ingestion'
      tag: "Documentation"
      text: 'Customize trace ingestion and retain important traces.'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Use Analytics queries and monitors based on retained traces.'
---
<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Fill out this form</a> to request this feature for your account or be notified when it becomes Generally Available.
</div>

Tracing without Limits™ now allows you to generate metrics from all ingested spans, regardless of if they are indexed by a [retention filter][1].

Generate metrics from all of your ingested traces whether you choose to keep them for longer term using [Retention Filters][1]. These metrics can be used in conjunction with retention filters and Analytics monitors. Use custom metrics for specific fixed queries, while creating retention filters to allow arbitrary querying and investigation.  With custom metrics generated from your incoming span stream, you can visualize anomalies, create dashboards and monitors, and see trends across any parameters that are important to your business context. All generated metrics are available for 15 months as Datadog [custom metrics][2].

## Generate Span-based Metrics

{{< img src="tracing/span_to_metrics/GenerateMetrics.png" style="width:100%;" alt="Generate metrics from ingested spans" >}}

To generate metrics from span, navigate from the [APM Setup and Configuration][3] page to [Generate Metrics][4] on the top of the page, and click the “+ New Metric” button.

### Creating a New Span-based Metric

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. Define the metric query: Start by adding a query for filtering to your required dataset. The [query syntax][5] is the same as APM Search and Analytics.

1. Define the field you want to track: Select * to generate a count of all spans matching your query or enter an attribute (e.g., `@cassandra_row_count`) to aggregate a numeric value and create its corresponding count, min, max, sum, and avg aggregated metrics. If the attribute type is a measure, the value of the metric is the value of the span attribute.

1. Specify the group-by dimension: By default, metrics generated from spans will not have any tags unless explicitly added. Any attribute or tag that exists in your spans can be used to create metric Tags.

1. Check the Live Analytics and Search Query preview: You can view the impact of your query in real-time on the data visualization, and the matching spans considered for your query in a live preview.

1. Name your metric: Metric names must follow the [metric naming convention][6]. Metric names beginning with `trace.*` are not permitted and will not be saved.

**Important Note**: Span-based metrics are considered custom metrics and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avoid impacting your billing.

### Updating Existing Span-based Metrics

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Edit an existing metrics" >}}

After a metric is created, only two fields can be updated:

| Field                                 | Reason                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Stream filter query                  | Change the set of matching spans to be aggregated into metrics.            |
| Aggregation groups             | Update the tags of manage the cardinality of generated metrics.                                                     |

**Note**: To change the metric type or name, a new metric must be created

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_retention_and_ingestion
[2]: https://docs.datadoghq.com/developers/metrics/#overview
[3]: https://app.datadoghq.com/apm/getting-started
[4]: https://app.datadoghq.com/apm/traces/generate-metrics
[5]: /tracing/trace_search_and_analytics/query_syntax/
[6]: /developers/metrics/#naming-metrics
