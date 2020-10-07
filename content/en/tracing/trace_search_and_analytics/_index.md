---
title: Tracing Without Limits
kind: documentation
description: "Beta Documentation for Live Analytics, ingestion rules and retention filters."
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

## Tracing Without Limits Overview

[Trace Search and Analytics][1] gives you the ability to search all ingested or indexed spans using any tag on any span.  Depending on whether you are using Live (the last 15 minutes, rolling) or Historical (all indexed spans) mode, the data used to power your queries will change.

Live data is all [Ingested spans](#ingestion-controls) and is available in real-time for the past 15 minutes.  The Datadog UI will also have a 'Live' indicator next to the time selector whenever you are in Live mode.  Historical data is all [Indexed spans](#indexing-controls).  You can customize settings for both [Ingestion and Indexing](#ingestion-and-indexing-overview).

Send and retain exactly the spans you care about. Any indexed span will have its entire associated trace automatically retained for completeness of viewing within Datadog.

### Live Search Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

In Live Search mode, Datadog displays spans as soon as they are sent by the Datadog Agent and before they are indexed by Datadog, and the spans are available for 15 minutes. All spans ingested by Datadog are displayed without any sampling (Tracing without Limits™). With the APM Live Search you can:

- Write search queries to refine the stream of traces by any tag on any span. For example, monitor that a new deployment went smoothly by filtering on `version_id` of all tags
- View 100% of trace spans as they are ingested. For example, view outage related information in real-time as it happens related to specific `org_id` or `customer_id` associated with a child span. Note that there is no sampling on ingested spans for 15 minutes.
- Run search queries that autocomplete in real-time. For example, to check if a process has correctly started, type `process_id` of a child span tag and it autocompletes the ID.
- View Live timeseries visualization of key RED metrics: requests per second, errors, and latency. For example, monitor load test and performance impact on your endpoints by filtering on the duration of a child resource.
- Run one-click search queries on any span or tag directly from the trace panel view.
- Add, remove, and sort columns from span tags for a customized view.

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

The number of received spans per second is displayed at the top of the traces table, as well as the sampling rate. Since a stream of thousands of spans per second is not human readable, high throughput span streams are sampled for visual clarity but are still searchable. Use the Live Search query bar filtering features to filter the spans stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

Live Search mode is the default view on the Traces page, and when you're in Historical mode, you can choose the **LIVE** option in the time range selector to switch to the Live Search mode for the past 15 minutes.

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

### Filtering the Trace Stream and Search Query
{{< img src="tracing/live_search/toplevespan.gif" alt="Live Search query" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across any span and any tag, and not just the indexed ones.

**Note**: You can select only the `top-level spans of the service` by selecting the checkbox above the trace table. You can use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services. Selecting this box only _visually_ filters the spans shown; they are all still present.

You can also filter on attributes that are not defined as facets. For example, to filter on the `customer.id` attribute, there are two options:

- Click on the attribute in the trace panel and add it to the search query `@customer.id:584959`.
{{< img src="tracing/live_search/livesearch_query2.png" alt="Live Search filter" >}}


- Filter on all spans with a `customer.id` attribute by typing "customer.id" in the search query bar: `@customer.id:584959`
{{< img src="tracing/live_search/livesearch_query1.png" alt="Live Search filter" >}}

### Historical Search Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Historical Search Mode is accessed in the same way as Live Search mode.  To switch from Live to Historical mode, change the time selector to any period of time greater than 15 minutes.  This will change the data being searched from live search mode to indexed spans.

In Historical Search Mode, the data searched is Indexed Spans, along with the root span of any trace with at least one indexed span.  These spans are kept by Datadog for 15 days from being indexed.

{{< img src="tracing/live_search/livesearch_mode.gif" alt="Live Search mode" >}}

**Note:** The entire associated trace will appear whenever you are viewing the flame graph associated with any indexed span, but only indexed spans are searchable in historical search mode.

For example, if you filter by a tag that only appears on un-indexed spans, your search will return no results.

You can customize what spans are indexed and at what retention rates. By default, [Datadog Intelligent Sampling](#datadog-intelligent-sampling-filter) will be applied to decide what spans to index, and this is the data powering Historical queries. To learn more about the default span retention filter and how to create your own additional filters, visit the [Indexing](#indexing-controls) section of this page, or the [Span Indexing][2] page within Datadog.

### Live Analytics Mode

<div class="alert alert-warning">
These features are currently in private beta. <a href="https://forms.gle/1FParyX49eNFPDsg9">Fill out the form</a> to request to be added to the beta.
</div>

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

With Live Analytics mode, you can perform analytics on 100% of your ingested traces for the last 15 minutes.  Analytics is used to graph requests or errors corresponding to specified criteria, such as errors for the `ShoppingCart##checkout` service and endpoint, with a cart value of at least `$100`, with the ability to drill directly into traces matching these criteria.

In addition to viewing analytics for requests matching arbitrary queries, Live Analytics can also give a top list of the most impacted customers, availability-zones, or any other tag during an outage or investigation.

With Live Analytics, every tag on every span ingested over the rolling 15 minute window is available for querying.

{{< img src="tracing/live_search/LiveAnalytics2.gif" alt="Live Analytics" >}}

**Note:** Exporting to dashboards and monitors is only possible in Historical mode.

### Historical Analytics Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Historical Analytics Mode is accessed in the same way as Live Analytics mode.  To switch from Live to Historical Analytics, change the time selector to any period of time greater than 15 minutes.  This will change the data being searched to indexed spans, and the data will no longer be a live feed.

The root span of any trace with at least one indexed span is indexed. This means that you can search on tags on the root span or on the indexed child spans. These spans are kept by Datadog for 15 days after being indexed.

**Note:** The entire associated trace will appear whenever you are viewing the flame graph associated with any indexed span, but that only indexed spans are searchable.

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Historical Analytics" >}}

**Note:** Only indexed spans can be searched in Historical Analytics Mode.

You can customize what spans are indexed and at what retention rates. By default, Datadog Intelligent Sampling will be applied to decide what spans to index, and this is the data powering Historical queries. To learn more about the default span retention filter and how to create your own additional filters, visit the [Indexing][3] page.

[1]: https://app.datadoghq.com/apm/traces
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
