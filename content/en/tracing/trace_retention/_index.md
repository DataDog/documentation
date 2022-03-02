---
title: Trace Retention
kind: documentation
description: "Learn how to control trace retention with retention filters."
further_reading:
- link: "/tracing/trace_ingestion/mechanisms"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_ingestion/ingestion_controls/"
  tag: "Documentation"
  text: "Ingestion Controls"
- link: "/tracing/trace_retention/usage_metrics/"
  tag: "Documentation"
  text: "Usage Metrics"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey: Indexing" >}}

With Tracing without Limits™, both the [ingestion of traces to Datadog][1] as well as the retention of those traces for 15 days are fully customizable.

To track or monitor your usage of Tracing without Limits™, see the [Usage Metrics][2] documentation.

## Retention filters

After spans have been ingested by Datadog, some are kept for 15 days according to the retention filters that have been set on your account. By default, the only retention filter enabled is the [Intelligent Retention Filter](#datadog-intelligent-retention-filter), which retains error traces and traces from different latency distributions.

You can also create any number of additional [tag-based retention filters](#create-your-own-retention-filter) for your services.

**Note**: Admin rights are required to create, modify, or disable retention filters.

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Retention Filters" >}}

In Datadog, on the [Retention Filters tab][3], you can see the following information:

Filter Name
: The name of each filter used to index spans. By default, the only filter is [Datadog Intelligent Retention](#datadog-intelligent-retention-filter).

Filter Query
: The tag-based query for each filter.

Retention Rate
: A percentage from 0 to 100% of how many matching spans are indexed by Datadog.

Spans Indexed
: The number of spans indexed by the filter over the selected time period.

Last Updated
: The date and user who last modified the retention filter.

Enabled toggle
: Allows filters to be turned on and off.

In addition to the `Spans Indexed` column for each retention filter, there is also the `datadog.estimated_usage.apm.indexed_spans` metric, which you can use to track spans that are indexed by retention filters.

For more information, read the [Usage Metrics][2] documentation, or see the [dashboard][4] available in your account.

<div class="alert alert-info"><strong>Note</strong>: Retention filters do not affect what traces are collected by the Agent and sent to Datadog ("ingested"). The only way to change how much tracing data is ingested is through <a href="/tracing/trace_ingestion/mechanisms">ingestion controls</a>.</div>

### Datadog intelligent retention filter

Intelligent retention is always active for your services, and it keeps a proportion of traces to help you monitor the health of your applications. All [service entry spans][5] are indexed for the traces kept by the intelligent retention filter.

For 30 days, intelligent retention retains:

 - A representative selection of errors, ensuring error diversity (for example, response code 400s, 500s).
 - High latency in the `p75`, `p90`, and `p95` quartiles.
 - All resources with any traffic that have associated traces in the past for any time window selection.
 - True maximum duration trace for each time window.

**Note**: Because intelligent retention chooses spans intentionally and not randomly, spans that are retained only by the intelligent filter are **not** included in the [Trace explorer timeseries view][6]. Aggregated views (timeseries, toplist, table) are available only for spans retained by [custom retention filters](#create-your-own-retention-filter).

If there are specific tags, facets, or groups of traces that you want to investigate _in detail_, meaning you want to retain more than what Intelligent Retention retains, then [create your own retention filter](#create-your-own-retention-filter). For example, you might want to keep more than a representative selection of errors from your production environment. To ensure _all_ production errors are retained and available for search and analytics for 15 days, create a 100 percent retention filter scoped to `env:prod` and `status:error`. As discussed below, this may have an impact on your bill.

### Create your own retention filter

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.mp4" style="width:100%;" alt="Span Indexing" video=true >}}

To customize what spans are indexed and retained for 15 days, you can create, modify, and disable additional filters based on tags, and set a percentage of spans matching each filter to be retained. Any span that is retained has its corresponding trace saved as well, and when it is viewed, the complete trace is available. In order to be searched by tag in [Explorer][7], however, the span that directly contains the searched-upon tag must have been indexed by a retention filter.

1. Name your filter.
2. Set the tags you would like to index spans that match **all** of.
3. Select whether this filter retains any span that matches the criteria, or only [service entry spans][5].
4. Set a percentage of spans matching these tags to be indexed.
5. Save your new filter.

Selecting "Top-Level Spans for Services Only" means the retention filter retains only the selected proportion of [service entry spans][5] of the service and indexes them. Use this if you want to only index service entry spans with matching tags. If "All Spans" is selected, the retention filter retains the selected proportion of all spans of the distributed trace, irrespective of their hierarchy, and indexes them. This may have an impact on your bill, and the visual indicator within the app while setting a retention filter informs you how many matching spans have been detected over the time period.

Filters are retained in a serial order. If you have an upstream filter that retains spans with the `resource:POST /hello_world` tag, those spans do not show up in the **Edit** window of a downstream filter that searches for spans with the same tag because they have been retained by the upstream filter.

For example, you can create filters to keep all traces for:

- Credit card transactions over $100.
- High-priority customers using a mission-critical feature of your SaaS solution.
- Specific versions of an online delivery service application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_ingestion
[2]: /tracing/trace_retention/usage_metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /tracing/visualization/#service-entry-span
[6]: /tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /tracing/trace_explorer/#historical-search-mode
