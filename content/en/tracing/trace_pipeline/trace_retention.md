---
title: Trace Retention
kind: documentation
description: "Learn how to control trace retention with retention filters."
aliases:
- /tracing/trace_retention/
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/ingestion_controls/"
  tag: "Documentation"
  text: "Ingestion Controls"
- link: "/tracing/trace_pipeline/metrics/"
  tag: "Documentation"
  text: "Usage Metrics"
---

{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Retention filters" >}}

With APM, [the ingestion and the retention of traces for 15 days][1] are fully customizable.

To track or monitor your volume of ingested and indexed data, see the [Usage Metrics][2] documentation.

## Retention filters

After spans have been ingested by Datadog, some are kept for 15 days according to the retention filters that have been set on your account.

By default, some retention filters are enabled for your account:
- The `Error Default` retention filter indexes error spans with `status:error`. The retention rate and the query can be configured. For instance, to capture production errors, set the query to `status:error, env:production`. Disable the retention filter if you do not want to capture the errors by default.
- The `Application Security` retention filter is enabled if you are using Application Security Management. It ensures the retention of all spans in traces that have been identified as having an application security impact (an attack attempt).
- The [Intelligent Retention Filter](#datadog-intelligent-retention-filter) retains diverse error traces and traces from different latency distributions.

You can also create any number of additional [tag-based retention filters](#create-your-own-retention-filter) for your services.

**Note**: Admin rights are required to create, modify, or disable retention filters.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_page.png" style="width:100%;" alt="Retention Filters Page" >}}

In Datadog, on the [Retention Filters tab][3], you can see a list of all retention filters:

Filter Name
: The name of each filter used to index spans.

Filter Query
: The tag-based query for each filter.

Retention Rate
: A percentage from 0 to 100% of how many matching spans are indexed.

Spans Indexed
: The number of spans indexed by the filter over the selected time period.

Last Updated
: The date and user who last modified the retention filter.

Enabled toggle
: Allows filters to be turned on and off.

The order of the retention filter list changes indexing behavior. If a span matches a retention filter early in the list, the span is either kept or dropped. Any matching retention filter lower on the list does not catch the already-processed span.

The `Spans Indexed` column for each retention filter is powered by the `datadog.estimated_usage.apm.indexed_spans` metric, which you can use to track your indexed span usage. For more information, read [Usage Metrics][2], or see the [dashboard][4] available in your account.

<div class="alert alert-info"><strong>Note</strong>: Retention filters do not affect what traces are collected by the Agent and sent to Datadog ("ingested"). The only way to change how much tracing data is ingested is through <a href="/tracing/trace_ingestion/mechanisms">ingestion controls</a>.</div>

### Datadog intelligent retention filter

The Datadog intelligent retention filter is always active for your services, and it keeps a proportion of traces to help you monitor the health of your applications. 

It scans through the **service entry spans** and retains for 30 days:

 - A representative selection of errors, ensuring error diversity (for example, response code 400s, 500s).
 - High latency in the `p75`, `p90`, and `p95` percentiles.
 - All resources with any traffic that have associated traces in the past for any time window selection.
 - True maximum duration trace for each time window.

**Note**: Because intelligent retention chooses spans intentionally and not randomly, spans that are retained only by the intelligent filter are **not** included in the [Trace explorer timeseries view][6]. Aggregated views (timeseries, toplist, table) are available only for spans retained by [custom retention filters](#create-your-own-retention-filter).

Spans indexed by the intelligent retention filter are **not counted towards the usage** of indexed spans, and hence **do not impact your bill**.

If there are specific tags, or attributes for which you want to retain more spans than what Intelligent Retention retains, then [create your own retention filter](#create-your-own-retention-filter).

### Create your own retention filter

Decide which spans are indexed and retained for 15 days by creating, modifying, and disabling additional filters based on tags. Set a percentage of spans matching each filter to be retained. Any span that is retained has its corresponding trace saved as well, and when it is viewed in the [Trace Explorer][7], the complete trace is available.

**Note:** In order for you to search by tag in the Trace Explorer, the span that directly contains the searched-upon tag must have been indexed by a retention filter.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/create_retention_filter.png" style="width:90%;" alt="Create Retention Filter">}}

1. Define the retention query by adding any span tag. Choose to retain _all spans_ with the defined tags, only _[service entry spans][5]_ (selected by default), or only _[trace root spans][8]_.
2. Set a percentage of spans matching these tags to be indexed.
3. Name the filter.
4. Save the new filter.

When you create a new filter or edit the retention rate of an existing filter, Datadog displays an estimate of the percentage change in global indexing volume.

Filters are retained in a serial order. If you have an upstream filter that retains spans with the `resource:POST /hello_world` tag, those spans do not show up in the **Edit** window of a downstream filter that searches for spans with the same tag because they have been retained by the upstream filter.

For example, you can create filters to keep all traces for:

- Credit card transactions over $100.
- High-priority customers using a mission-critical feature of your SaaS solution.
- Specific versions of an online delivery service application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/
[2]: /tracing/trace_pipeline/metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /tracing/glossary/#service-entry-span
[6]: /tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /tracing/glossary/#trace-root-span
