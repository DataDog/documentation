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

{{< img src="tracing/live_search_and_analytics/SpanJourney.png" style="width:100%;" alt="Trace Journey" >}}

## Overview

[Trace Search and Analytics][1] gives you the ability to search all ingested and indexed spans using any tag on any span. Within Datadog, the data used to power your queries will change between live, or 'ingested' trace data, and historical, or 'indexed' data.

Live data is all [Ingested spans][2] and is available in real-time for the past 15 minutes.  The Datadog UI will also have a 'Live' indicator whenever this is true.  Historical data is all [Indexed spans][3].  Both Ingestion and Indexing can be customized via the [Trace Ingestion and Indexing][4] features (currently in Beta). Send and retain exactly the spans you care about, and any retained span will have its entire associated trace retained for completeness of viewing within Datadog.

## Live Search Mode

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
{{< img src="tracing/live_search/livesearch_mode.gif" alt="Live Search mode" >}}

Historical Search Mode is almost identical to Live Search mode.  The main difference is the data that is being searched are all Indexed Spans.  By default, `Datadog Intelligent Sampling` will be applied to decision what spans to index, and this will be the data powering Historical queries. To learn more about the default span filter and how to create your own, visit the [Indexing][3] page.

## Filtering the Trace Stream and Search Query
{{< img src="tracing/live_search/toplevespan.gif" alt="Live Search query" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across any span and any tag, and not just the indexed ones.

**Note**: You can select only the `top-level spans of the service` by selecting the checkbox above the trace table. You can use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services. Selecting this box only visually filters the spans shown.

You can also filter on attributes that are not defined as facets. For example, to filter on the `customer.id` attribute, there are two options:

- Click on the attribute in the trace panel and add it to the search query `@customer.id:584959`.
{{< img src="tracing/live_search/livesearch_query2.png" alt="Live Search filter" >}}

- Filter on all spans with a `customer.id` attribute by typing "customer.id" in the search query bar: `@customer.id:584959`
{{< img src="tracing/live_search/livesearch_query1.png" alt="Live Search filter" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/trace_ingestion_and_indexing/ingestion
[3]: /tracing/trace_ingestion_and_indexing/indexing
[4]: /tracing/trace_ingestion_and_indexing
