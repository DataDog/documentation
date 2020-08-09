---
title: Trace Search and Analytics
kind: documentation
aliases:
    - /tracing/livetail
    - /tracing/livesearch
description: "See all your trace spans in real time."
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/resource/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "/tracing/app_analytics/analytics/"
  tag: "Documentation"
  text: "Analytics on your APM data at infinite cardinality"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

## Overview

[Trace Search and Analytics][1] gives you the ability to search all ingested or indexed spans using any tag on any span.  Depending on whether you are using Live (the last 15 minutes, rolling) or Historical (all indexed spans) mode, the data used to power your queries will change.

Live data is all [Ingested spans][2] and is available in real-time for the past 15 minutes.  The Datadog UI will also have a 'Live' indicator next to the time selector whenever you are in Live mode.  Historical data is all [Indexed spans][3].  Both Ingestion and Indexing can be customized via the [Trace Ingestion and Indexing][4] features.

Send and retain exactly the spans you care about. Any indexed span will have its entire associated trace automatically retained for completeness of viewing within Datadog.


## Live Search Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

In Live Search mode, Datadog displays spans as soon as they are sent by the Datadog Agent and before they are indexed by Datadog, and are available for 15 minutes. All spans ingested by Datadog are displayed without any sampling (Tracing without Limits™). With the APM Live Search you can:

- Write search queries to refine the stream of traces by any tag on any span. For example, monitor that a new deployment went smoothly by filtering on `version_id` of all tags
- View 100% of trace spans as they are ingested. For example, view outage related information in real-time as it happens related to specific `org_id` or `customer_id` associated with a child span. Note that there is no sampling on ingested spans for 15 minutes.
- Search queries autocomplete in real-time. For example, check if a process has correctly started type `process_id` of a child span tag and it auto completes the ID.
- View Live timeseries visualization of key RED metrics: requests per second, errors, and latency. For example, monitor load test and performance impact on your endpoints by filtering on the duration of a child resource.
- One-click search queries on any span or tag directly from the trace panel view.
- Add, remove, and sort columns from span tags for a customized view.

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

The number of received spans per second is displayed at the top of the traces table, as well as the sampling rate. Since a stream of thousands of spans per second is not human readable, high throughput span streams are sampled for visual clarity but are still searchable. Use the Live Search query bar filtering features to filter the spans stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

`Live Search` mode is the default experience on the Traces page or you can choose the `LIVE` option in the time range selector to switch to the Live Search mode for the past 15 minutes from the `HISTORICAL` mode.

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

## Historical Search Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Historical Search Mode is accessed in the same way as Live Search mode.  To switch between the two, change the time selector to any period of time greater than 15 minutes.  This will change the data being searched from live search mode to indexed spans.

In Historical Search Mode, the data searched is Indexed Spans, along with the root span of any trace with at least one indexed span.  These spans are kept by Datadog for 15 days from being indexed.

{{< img src="tracing/live_search/livesearch_mode.gif" alt="Live Search mode" >}}

**Note:** The entire associated trace will appear whenever you are viewing the flame graph associated with any indexed span, but only Indexed spans power searches in historical search mode.

For example, if you filter by a tag that only appears on un-indexed spans, your search will return no results.

What spans are indexed and at what retention rates are fully customizable. By default, `Datadog Intelligent Sampling` will be applied to decide what spans to index, and this is the data powering Historical queries. To learn more about the default span retention filter and how to create your own additional filters, visit the [Indexing][3] page.

## Filtering the Trace Stream and Search Query
{{< img src="tracing/live_search/toplevespan.gif" alt="Live Search query" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across any span and any tag, and not just the indexed ones.

**Note**: You can select only the `top-level spans of the service` by selecting the checkbox above the trace table. You can use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services. Selecting this box only visually filters the spans shown.

You can also filter on attributes that are not defined as facets. For example, to filter on the `customer.id` attribute, there are two options:

- Click on the attribute in the trace panel and add it to the search query `@customer.id:584959`.
{{< img src="tracing/live_search/livesearch_query2.png" alt="Live Search filter" >}}


- Filter on all spans with a `customer.id` attribute by typing "customer.id" in the search query bar: `@customer.id:584959`
{{< img src="tracing/live_search/livesearch_query1.png" alt="Live Search filter" >}}



## Live Analytics Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

With Live Analytics mode, you can perform analytics on 100% of your ingested traces for the last 15 minutes.  Analytics is used to graph requests or errors corresponding to specified criteria, such as errors for the `ShoppingCart##checkout` service and endpoint, with a cart value of at least `$100`, with the ability to drill directly into traces matching these criteria.

In addition to viewing analytics for requests matching arbitrary queries, Live Analytics can also give a top list of the most impacted customers, availability-zones, or any other tag during an outage or investigation.

With Live Analytics, every tag on every span ingested over the rolling 15 minute window is available for querying.

{{< img src="tracing/live_search/LiveAnalytics.gif" alt="Live Analytics" >}}

**Note:** Exporting to dashboards and monitors is only possible in Historical mode.

## Historical Analytics Mode

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Historical Analytics Mode is accessed in the same way as Live Search mode.  To switch between the two, change the time selector to any period of time greater than 15 minutes.  This will change the data being searched to Indexed Spans, and the data will no longer be a live feed.

In Historical Search Mode, the data searched is Indexed Spans, along with the root span of any trace with at least one indexed span.  These spans are kept by Datadog for 15 days from being indexed.

**Note:** The entire associated trace will appear whenever you are viewing the flame graph associated with any indexed span, but that only Indexed spans power the search.

{{< img src="tracing/live_search/HistoricalAnalytics.gif" alt="Historical Analytics" >}}

**Note:** If you filter by a tag that only appears on un-indexed spans, your search will return no results.

What spans are indexed and at what retention rates are fully customizable. By default, `Datadog Intelligent Sampling` will be applied to decide what spans to index, and this is the data powering Historical queries. To learn more about the default span retention filter and how to create your own additional filters, visit the [Indexing][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/trace_ingestion_and_indexing/ingestion
[3]: /tracing/trace_ingestion_and_indexing/indexing
[4]: /tracing/trace_ingestion_and_indexing
