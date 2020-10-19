---
title: Trace Search and Analytics
kind: documentation
aliases:
    - /tracing/tracing_without_limits/
    - /tracing/livesearch/
description: "Trace Search and Analytics"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

## Search and Analytics Overview

[Trace Search and Analytics][1] gives you the ability to search all ingested or Indexed Spans using any tag on any span.  Depending on whether you are searching Live (the last 15 minutes, rolling) or all Indexed Spans, the data used to power your queries will change.

- Instrumented applications send 100% of their traces to Datadog for [Ingestion][2] where they are available as Live data for the past 15 minutes (rolling window)

The Datadog UI will also have a 'Live' indicator next to the time selector whenever you are in Live mode. as seen below:

{{< img src="tracing/live_search/LiveSearch.png" alt="Live Search Indicator" >}}

- All ingested traces are processed by user-created [retention filters][3] to determine which spans to index, along with the default [intelligent retention filter][4] to retain a diverse set of traces.

- Once indexed, traces are available for use in Search and Analytics with 15 day retention.

The Datadog UI will also have a 'Retained traces' indicator next to the time selector whenever you searching [indexed spans][5].

{{< img src="tracing/live_search/RetainedSearch.png" alt="Retained Search Indicator" >}}

You can customize settings for both [Retention and Ingestion][6] to send and keep exactly what data is most relevant to you.

### (Recommended) Enable Tracing Without Limits

Fine-grained ingestion controls can be set per service instrumented with Datadog APM, with more details available in the [Ingestion Controls][2] documentation.  Most services sending up to 50 traces per second will send all traces by default, but all services can also be configured to send all of their traffic with one environment variable configuration below:

```
DD_TRACE_SAMPLE_RATE=1.0
```

[Retention filters][3] are set within the Datadog UI after services are instrumented, and are used to retain relevant spans based on tag-based filters.

## Live Search for 15 minutes

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

When using Live Search, Datadog displays spans as soon as they are sent by the Datadog Agent and before they have been indexed by your retention filters. All ingested spans are available for the last 15 minutes (rolling window). All spans ingested by Datadog are displayed without any sampling, and this is Tracing without Limits™.

{{< img src="tracing/live_search/LiveSearch.mp4" alt="Live Search" video="true" >}}

With the APM Live Search you can:

- Monitor that a new deployment went smoothly by filtering on `version_id` of all tags.
- View outage related information in real-time as it happens related to specific `org_id` or `customer_id` associated with a child span over 100% of ingested traces.
- Check if a process has correctly started by typing `process_id` of a child span tag and autocompleting the ID.
- Monitor load test and performance impact on your endpoints by filtering on the duration of a child resource.
- Run one-click search queries on any span or tag directly from the trace panel view.
- Add, remove, and sort columns from span tags for a customized view.

The number of received spans per second is displayed at the top of the traces table. Since a stream of thousands of spans per second is not human readable, high throughput span streams show spans for visual clarity but all spans are still searchable. Use the Live Search query bar filtering features to filter the spans stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

{{< img src="tracing/live_search/PausePlaystream.png" alt="Pause or Play the Live Stream" >}}

Live Search is the default view on the Traces page, and when you're viewing retained traces, you can choose the **LIVE** option in the time range selector to switch to using Live Search for the past 15 minutes of traces.

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

### Filtering the Trace Stream and Search Query
{{< img src="tracing/live_search/toplevelspan2.gif" alt="Live Search query" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across any span and any tag, and not just the indexed ones.

**Note**: You can select only the `top-level spans of the service` by changing the selection to the box above the trace table. You can use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services. Selecting this box only _visually_ filters the spans shown; they are all still present.

You can also filter on attributes that are not defined as facets. For example, to filter on the `customer.id` attribute, there are two options:

- Click on the attribute in the trace panel and add it to the search query `@customer.id:584959`.
{{< img src="tracing/live_search/LiveSearchQuery1.png" alt="Live Search filter" >}}


- Filter on all spans with a `customer.id` attribute by typing "customer.id" in the search query bar: `@customer.id:584959`
{{< img src="tracing/live_search/LiveSearchQuery3.png" alt="Live Search filter" >}}

## Trace Search with 15 day retention

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Searching with retained traces is accessed in the same way as Live Search. To switch from searching live to retained data, change the time selector to any period of time greater than 15 minutes.

All spans indexed by retention filters or legacy App Analytics filters are accessible.  These spans are kept by Datadog for 15 days after being indexed by a retention filter.

{{< img src="tracing/live_search/HistoricalSearch2.gif" alt="Historical Search" >}}

All spans indexed by retention filters or legacy App Analytics filters are available to be searched when using trace analytics. These spans are kept by Datadog for 15 days after being indexed by a retention filter.

**Note:** As of October 20, 2020 Tracing without Limits replaced App Analytics as a more flexible way to ingest 100% of your traces and retain the ones important to your business.

For example, if you filter by a tag that only appears on spans that are not indexed by any retention filter, your search will return no results unlike when using Live Search.

You can customize what spans are retained and at what retention rates. By default, [Datadog Intelligent Retention][4] will be applied. To learn more about the default span retention filter and how to create your own additional filters, visit the [Retention Filters][3] section of this page, or the [Retention Filters][7] page within the Datadog UI to create or modify your own filters.

## Live Analytics for 15 minutes

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

With Live Analytics, you can perform analytics on 100% of your ingested traces for the last 15 minutes, filtering and grouping by any tag on any span. Datadog displays spans as soon as they are sent by the Datadog Agent and before they have been indexed by your retention filters. All ingested spans are available for the last 15 minutes (rolling window). All spans ingested by Datadog are displayed without any sampling, and this is Tracing without Limits™.

{{< img src="tracing/live_search/LiveAnalytics.mp4" alt="Live Analytics" video="true" >}}

Analytics is used to graph requests or errors corresponding to specified criteria, such as:

- Errors for the `ShoppingCart##checkout` service and endpoint, with a cart value of at least `$100`, with the ability to drill directly into traces matching these criteria.

- Monitor a canary deployment of a critical application update in real time.

- Compare latency across geographic regions scoped to the latest version of your iOS application.

In addition to viewing analytics for requests matching arbitrary queries, Live Analytics can also give a top list of the most impacted customers, availability-zones, or any other tag during an outage or investigation.

With Live Analytics, every tag on every span ingested over the rolling 15 minute window is available for querying.

**Note:** Exporting to dashboards and monitors is only possible using retained spans.

## Trace Analytics with 15 day retention

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Retained Analytics is available from the same page as Live Analytics.  To switch from using Live data to retained data to perform analytics, change the time selector to any period of time greater than 15 minutes. After this selection, the data will no longer be based on a live feed but the fixed time range selected.

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Historical Analytics" >}}

All spans indexed by retention filters or legacy App Analytics filters are available to be searched when using trace analytics. These spans are kept by Datadog for 15 days after being indexed by a retention filter.

**Note:** As of October 20, 2020 Tracing without Limits replaced App Analytics as a more flexible way to ingest 100% of your traces and retain the ones important to your business.

You can customize what spans are retained and at what retention rates. By default, [Datadog Intelligent Retention][4] will be applied which automatically retains traces with error and latency diversity as well as low-throughput resources. To learn more about the default span retention filter and how to create your own additional filters, visit the [Retention Filters][3] section of this page, or the [Retention Filters][7] page within the Datadog UI to create or modify your own filters.

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: /tracing/trace_retention_and_ingestion/#retention-filters
[4]: /tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
[5]: /tracing/visualization/#indexed-span
[6]: /tracing/trace_retention_and_ingestion/
[7]: https://app.datadoghq.com/apm/traces/retention-filters
