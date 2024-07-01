---
title: Trace Explorer
aliases:
    - /tracing/tracing_without_limits/
    - /tracing/livesearch/
    - /tracing/trace_search_and_analytics/
description: "Trace Explorer"
further_reading:
- link: 'tracing/trace_explorer/search'
  tag: 'Documentation'
  text: 'Search Spans'
---

{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Overview

The [Trace Explorer][1] gives you the ability to search all ingested or indexed spans using any tag on any span. The spans found by your query change depending on whether you are searching Live (all spans ingested in the last 15 minutes, rolling) or indexed spans (spans retained for 15 days by your custom filters).

Instrumented applications send 100% of their traces to Datadog for [ingestion][2], making the traces available as Live traces for a rolling window of 15 minutes.

The Trace Explorer shows a **Live Search - All ingested data** indicator whenever you are in Live mode:

{{< img src="tracing/trace_explorer/live_search.png" alt="Live Search Indicator" style="width:75%;" >}}

All ingested traces are then passed through:
- [Custom retention filters][3] that you can create to determine which spans to index. Once indexed through a custom retention filter, traces are retained for **15 days**.
- The default [intelligent retention filter][4] that retains a diverse set of traces. When indexed through the intelligent retention filter, traces are retained for **30 days**.

The Trace Explorer shows an **Search - Only Indexed Data** indicator whenever you search [indexed spans][5]:

{{< img src="tracing/trace_explorer/historical_search.png" alt="Only Indexed Data indicator" style="width:75%;" >}}

Live Search is the default view on the Traces page. Switch from Live Search to Indexed Data Search by using the time selector in the top right-hand corner.

### Trace volume control

You can customize settings for both [ingestion and retention][6] to send and keep exactly what data is most relevant to you.

#### Ingestion

Control your volume globally with [Datadog Agent configuration options][7] or set precise [ingestion rules][8] per service instrumented with Datadog APM.


#### Indexing

After you instrument your services and ingest traces, set tag-based [retention filters][3] within the Datadog app so that Datadog retains spans that are relevant to you.

**Note:** Both ingested and indexed spans may impact your bill. For more information, see [APM Billing][9].

## Live Search for 15 minutes

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

When you use Live Search, Datadog displays spans as soon as they are sent by the Datadog Agent and before they have been indexed by your retention filters. All ingested spans are available for the last 15 minutes (rolling window), displayed without any sampling.

{{< tabs >}}
{{% tab "List view" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search List view" video="true" >}}

With the **List view**, you can:

- Monitor whether a new deployment went smoothly by filtering on `version_id` of all tags.
- View outage-related information in real time by searching 100% of ingested traces for a particular `org_id` or `customer_id` that is associated with a problematic child span.
- Check if a process has correctly started by typing `process_id` and autocompleting the new process ID as a tag on child spans.
- Monitor load test and performance impact on your endpoints by filtering on the duration of a child resource.
- Run one-click search queries on any span or tag directly from the trace panel view.
- Add, remove, and sort columns from span tags for a customized view.

The number of received spans per second is displayed at the top of the traces table. Since a stream of thousands of spans per second is not human readable, high throughput span streams show some spans for visual clarity. You can search for all available spans in the search query. Use the Live Search query bar filtering features to filter the spans stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

{{< img src="tracing/live_search/play-pause-button.png" alt="Pause or Play the Live Stream" style="width:75%;" >}}

**Note**: Selecting any span pauses the stream and displays more details about the selected span in the trace side panel.

{{% /tab %}}
{{% tab "Timeseries View" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search Timeseries view" video="true" >}}

Visualize your spans as timeseries instead of a list using the **Timeseries view**. The Live Search Timeseries view is useful for graphing requests or errors that correspond to specified criteria, such as:

- Errors for the `ShoppingCart##checkout` service and endpoint, with a cart value of at least `$100`, with the ability to view traces matching these criteria individually.

- Monitor a canary deployment of a critical application update in real time.

- Compare latency across geographic regions scoped to the latest version of your iOS application.

In addition to showing timeseries for requests that match your queries, you can also visualize your spans as a top list of the most impacted customers, availability zones, or any other tag during an outage or investigation.

**Note:** Exporting to dashboards and monitors is only possible using retained spans.

{{% /tab %}}
{{< /tabs >}}

### Filtering

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Searching all spans" video="true" >}}

A valid query in the search bar displays traces that match your search criteria across **all spans**. The search syntax is the same in the Live Search views as in the other trace views, but here, your query is matched against all of the ingested traces across **any span** and **any tag**, and not just the indexed ones.

You can choose to query the [service entry spans][10], the [root spans][11], or all spans by changing the selection to the box above the trace table. Use this feature on high traffic applications to reduce the number of spans displayed and view only the entry point spans of the services or the entry point of the trace. Selecting this box only filters the spans shown in the list; the others are still shown in the flame graph when clicking on a span to view the trace details.

You can also filter on attributes that are not defined as facets. For example, to filter on the `cart.value` attribute, there are two options:

- Click on the `cart.value` attribute in the trace details panel and add it to the search query:
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Adding an attribute to the query" video="true" >}}

- Filter on all spans with a `cart.value` attribute by typing "cart.value" in the search query bar:
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Live Search filter by attribute" video="true" >}}

## Indexed spans search with 15 day retention

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Indexed Search" >}}

You can search retained traces in the same way as you do a Live Search. To switch from searching live data to searching retained data, change the time selector to any period of time greater than 15 minutes. All spans that are indexed by retention filters are accessible from search. These spans are kept by Datadog for 15 days after being indexed by a retention filter.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Searching retained traces" video="true" >}}

{{< tabs >}}
{{% tab "List view" %}}

All spans indexed by custom retention filters *and* the intelligent retention filter are available to be searched in the List view. However, if you filter by a tag that appears only on spans that are not indexed by any retention filter, your search does not return any results, unlike when using [Live Search](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Timeseries View" %}}

All spans indexed by custom retention filters or the intelligent retention filter are available to be searched when using trace analytics.

From the timeseries view, export your query to a [dashboard][1], [monitor][2], or [notebook][3] to investigate further or to alert automatically when an aggregate number of spans crosses a specific threshold. 

**Note**: Spans indexed by the intelligent retention filter are excluded from APM queries that appear in dashboards, notebooks, and from trace analytics monitor evaluations. For more information, see [Trace Retention][4].

[1]: /dashboards/widgets/timeseries/
[2]: /monitors/types/apm/?tab=analytics
[3]: /notebooks
[4]: /tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Retention configuration

You can customize which spans are retained and at what retention rates. By default, [the Datadog intelligent retention filter][4] is applied, which automatically retains traces with error and latency diversity as well as low-throughput resources. To learn more about the default intelligent retention filter and how to create your own additional filters, see the [retention filters documentation][3]. Go to the [Retention Filters page][12] within the Datadog app to create or modify your own filters.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/trace_pipeline/ingestion_controls
[3]: /tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /tracing/glossary/#indexed-span
[6]: /tracing/trace_pipeline/
[7]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /account_management/billing/apm_distributed_tracing/
[10]: /glossary/#service-entry-span
[11]: /glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters
