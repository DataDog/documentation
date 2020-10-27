---
title: Usage Metrics
kind: documentation
description: "Learn how to monitor your Tracing without Limits usage."
---


If, when you monitor your APM and Indexing usage, the numbers are not in line with your expectations, or you want to change your ingestion or retention rates, see the [retention filters][1] or [ingestion control][2] documentation.

### Usage Dashboard
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="Indexed span Dashboard" >}}

Datadog provides an out-of-the-box [Usage Dashboard][3] for monitoring your APM usage, as well as your ingested and Indexed Spans.

To create a custom dashboard or monitor, the key metrics to use are:

 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

### Indexed Spans

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Span Indexing" >}}

Each retention filter set on your services, including the default [Datadog Intelligent Retention Filter][4], results in an _increase_ to the number of Indexed Spans for your Datadog account.

Because Indexed Spans can impact your bill, the 'Spans Indexed' column appears alongside each filter you set, showing the number of spans indexed based on the timeframe selected for that filter.

**Note:** The Datadog Intelligent Retention Filter on its own will not cause any bill outside of the included Indexed Spans with your APM Host pricing.

**Note**: Admin rights are required to create, modify, or disable retention filters.


[1]: /tracing/trace_retention_and_ingestion/#retention-filters
[2]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
