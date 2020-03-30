---
title: Live Tail
kind: documentation
description: "See all your trace spans in real time."
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "tracing/app_analytics/analytics"
  tag: "Documentation"
  text: "Analytics on your APM data at infinite cardinality"
---

{{< img src="tracing/live_tail/livetail_view.gif" alt="Live tail" >}}

## Overview

The APM [Live Tail][1] gives you the ability to see all trace spans in near real-time from anywhere in the Datadog UI. It displays spans as soon as they get out of the Datadog Agent section and before they are indexed by Datadog. All trace spans ingested by Datadog are displayed (tracing without Limits\*) after being processed. With the APM Live tail page you can:

- Write search parameters to refine the stream of traces.
- View distributed trace in real-time.
- Add or remove columns from span tags for a customized view.

This feature allows you, for instance, to check if a process has correctly started, or if a new deployment went smoothly. Or view outage related information in real-time

## Live Tail view

Choose the `Live Tail` option in the time range selector to switch to the Live Tail view. The number of received spans per second is displayed at the top left, as well as the sampling rate. Since a stream of thousands of spans per second is not human readable, high throughput span streams are sampled for visual clarity. Use the Live Tail search bar filtering features to filter the spans stream and the Pause/Play button at the top right of the screen to pause or resume the stream.

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

## Column Options

Customize the Live Tail column view to better highlight the relevant information in your traces. Click on the column dropdown at the top right of the column header to activate one of the options below:
{{< img src="tracing/live_tail/column_livetail.png" alt="Live tail" >}}

1. Move column to the right or left.
2. Insert column to the right or left from span tags.
3. Remove or replace column column.

## Filtering the trace Stream

A valid query in the search bar displays traces that match your search criteria. The search syntax is the same in the Live Tail views as in the other trace views, but here, your query is matched against all of the ingested traces and not just the indexed ones.

## Search Query

{{< img src="tracing/live_tail/search_livetail.png" alt="Live tail" >}}

Any query that works in other views works in the Live Tail view, but you can only filter on attributes that are defined as facets.
For example, to filter on the a customer_id attribute, there are two options:

- Click on the attribute and add it to the search using the query `@customer_id:1123`.
- Filter on all spans with a duration above 150ms using the query: `@duration:>150ms`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/livetail
