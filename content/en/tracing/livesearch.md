---
title: Live Search
kind: documentation
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

{{< img src="tracing/live_tail/livesearchmain.gif" alt="Live Search" >}}

## Overview

The APM [Live Search][1] gives you the ability to search all ingested spans using any tag in real-time for the past 15 minutes. It displays spans as soon as they are sent by the Datadog agent and before they are indexed by Datadog. All spans ingested by Datadog are displayed without any sampling (Tracing without Limits\*). With the APM Live Search you can:

- Write search queries to refine the stream of traces by any tag on any span. Example: monitor that a new deployment went smoothly by filtering on version_id of all tags
- View 100% of trace spans as they are ingested - no sampling on ingested spans for 15 minutes. Example: view outage related information in real-time as it happens related to specific org_id or customer_id associated with a child span
- Search queries autocomplete in real-time. Example: check if a process has correctly started type process_id of a child span tag and it auto completes the id.
- View Live timeseries visualization of key RED metrics: requests per second, errors, and latency. Example: monitor load test and performance impact on your endpoints by filtering on the duration of a child resource
- One-click search queries on any span or tag directly from the trace panel view
- Add, remove, and sort columns from span tags for a customized view

## Live Search mode
{{< img src="tracing/live_tail/livesearch_mode.gif" alt="Live Search mode" >}}

`Live Search` mode is the default experience on the Traces page or you can choose the `LIVE` option in the time range selector to switch to the Live Search mode for the past 15 minutes from the `HISTORICAL` mode. The number of received spans per second is displayed at the top of the traces table, as well as the sampling rate. Since a stream of thousands of spans per second is not human readable, high throughput span streams are sampled for visual clarity but are still searchable. Use the Live Search query bar filtering features to filter the spans stream and the Pause/Play button at the top right of the screen to pause or resume the stream.

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

## Filtering the trace stream and search query
{{< img src="tracing/live_tail/toplevelspan.gif" alt="Live Search query" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across any span and any tag, and not just the indexed ones. 

Note: You can select only the `top-level spans of the service` by selecting the checkbox above the trace table. You can use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services.  

You can also filter on attributes that are not defined as facets. For example, to filter on the customer_id attribute, there are two options:

{{< img src="tracing/live_tail/livesearch_query.png" alt="Live Search filter" >}}

- Click on the attribute and add it to the search using the query `@customer_id:1123`.
- Filter on all spans with a duration above 150ms using the query: `@duration:>150ms`

**Note**: selecting this box only visually filters the spans shown.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
