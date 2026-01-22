---
title: Trace Retention
description: "Learn how to control trace retention with retention filters."
aliases:
- /tracing/trace_retention/
- /tracing/trace_queries/one_percent_flat_sampling/
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

With Datadog APM, [the ingestion and the retention of traces for 15 days][1] are fully customizable.

To track or monitor your volume of ingested and indexed data, see the [Usage Metrics][2] documentation.

## Retention filters

After spans have been ingested, some are kept for 15 days according to the retention filters that are set up on your account:
1. The **[Intelligent Retention Filter](#datadog-intelligent-retention-filter)** retains spans for every environment, service, operation, and resource for different latency distributions.
2. Several **[Default Retention Filters](#default-retention-filters)** are created to ensure that you keep visibility over all of your services and endpoints, as well as errors and high-latency traces. 
3. You can create any number of additional **[Custom Retention Filters](#create-your-own-retention-filter)** for your services, to capture the traces that matters the most to your business, based on any span attribute or tag filter.

**Note**: The permission `apm_retention_filter_write` is required to create, delete, modify, enable, or disable retention filters.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Retention Filters Page" >}}

In Datadog, on the [Retention Filters][3] settings page, you can see a list of all retention filters:

Filter Name
: The name of each retention filter used to index spans.

Filter Query
: The tag-based query for each filter.

Retention Rate
: A percentage from 0 to 100% of how many matching spans are indexed. The retained spans are uniformly chosen from among spans that match the filter query.

Spans Indexed
: The number of spans indexed by the filter over the selected time period.

Last Updated
: The date and user who last modified the retention filter.

Enabled toggle
: Allows filters to be turned on and off.

**Note**: The order of the retention filter list changes indexing behavior. If a span matches a retention filter early in the list, the span is either kept or dropped. Any matching custom retention filter lower on the list does not catch the already-processed span.

The `Spans Indexed` column for each retention filter is powered by the `datadog.estimated_usage.apm.indexed_spans` metric, which you can use to track your indexed span usage. For more information, read [Usage Metrics][2], or explore the [out-of-the-box usage dashboard][4] available in your account.

<div class="alert alert-info">Retention filters do not affect what traces are collected by the Agent and sent to Datadog ("ingested"). To control ingestion, use dedicated <a href="/tracing/trace_pipeline/ingestion_controls/">ingestion controls</a>.</div>


### Retention filter types

There are two types of retention filters:

1. **Span-level retention filters** - Index only the specific spans that match your filter criteria.
2. **Trace-level retention filters** - Index entire traces that contain spans matching your filter criteria, making the complete traces searchable in Trace Queries.

| Feature | Standard retention filters | Trace-level retention filters |
| ------- | ------------------------- | ----------------------------- |
| **Configuration** | Span query + Span retention rate | Span query + Span retention rate + Trace retention rate |
| **What is indexed** | Only spans targeted by the query | All spans belonging to traces that contain spans matching the query |
| **Where it is queryable** | Span Explorer | Span Explorer and Trace Queries |

**Note**: Indirectly indexed spans retained by trace-level retention filters (that is, spans that don't match the query directly but belong to traces that do) are not evaluated by [trace analytics monitors][19].

### Default retention filters

The following retention filters are enabled by default: 
- The `Error Default` retention filter indexes error spans with `status:error`. The retention rate and the query are configurable. For example, to capture production errors, set the query to `status:error, env:production`. Disable the retention filter if you do not want to capture the errors by default.
- The `App and API Protection Default` retention filter is enabled if you are using [App and API Protection][16]. It ensures the retention of all spans in traces that have been identified as having an application security impact (an attack attempt).
- The `Synthetics Default` retention filter is enabled if you are using Synthetic Monitoring. It ensures that traces generated from synthetic API and browser tests remain available by default. See [Synthetic APM][15] for more information, including how to correlate traces with synthetic tests.
- The `Dynamic Instrumentation Default` retention filter is enabled if you are using [Dynamic Instrumentation][17]. It ensures spans created dynamically with Dynamic instrumentation remain available in the long term by default.

### Datadog intelligent retention filter

The Datadog intelligent retention filter is always active for your services, and it keeps a representative selection of traces without requiring you to create dozens of custom retention filters. It is composed of: 
- [Diversity sampling](#diversity-sampling)
- [One percent flat sampling](#one-percent-flat-sampling)

**Note:** [Trace Queries][11] are based on the data indexed by the Intelligent Retention filter.

Spans indexed by the Intelligent retention filter (diversity sampling and 1% flat sampling) are **not counted towards the usage** of indexed spans, and so **do not impact your bill**.

If there are specific tags or attributes for which you want to index more spans than what the Intelligent Retention filter retains, then [create your own retention filter](#create-your-own-retention-filter).

#### Diversity sampling

Diversity sampling scans through the **service entry spans** and retains for 30 days:

- At least one span (and the associated trace) for each combination of environment, service, operation, and resource every 15 minutes at most, to ensure that you can always find example traces in [service][9] and [resource][10] pages, even for low traffic endpoints.
- High latency spans for the `p75`, `p90`, and `p95` percentile spans (and the associated trace) for each combination of environment, service, operation, and resource.
- A representative selection of errors, ensuring error diversity (for example, response status code 400s, 500s).

The set of data captured by diversity sampling is not uniformly sampled (that is, it is not proportionally representative of the full traffic). It is biased towards errors and high latency traces. 

#### One percent flat sampling

The flat 1% sampling captures:
1. All **traces correlated with 1% of ingested RUM sessions which had traces ingested**, ensuring you can always find some indexed sessions have associated trace data. This improves [correlation between APM and RUM][20], allowing you to debug user issues by viewing both frontend sessions and backend traces together. The sample is applied based on the `session_id`, meaning all traces linked to the same RUM session share a consistent indexing decision.
2. A **uniform 1% sample** of [ingested spans][12], applied based on the `trace_id` so all spans in the same trace share the same sampling decision. Use this sample for general system health monitoring and trend analysis.

This sampling mechanism is uniform, and it is proportionally representative of the full ingested traffic. As a result, low-traffic services and endpoints might be missing from that dataset if you filter on a short time frame.

### Create your own retention filter

Create custom retention filters to retain specific trace data for 15 days. Use any span tag or attribute in the filter query to target and retain the spans that matter the most to your business. 

For example, you can create filters to keep all traces for:

- Credit card transactions over $100: `@transaction_amount:>100`
- Checkout operation spans that have a duration longer than 2 seconds on the production environment: `resource_name:"GET /checkout" @duration:>2s env:prod`
- Specific versions of an online delivery service application: `service:delivery-api @version:v2.0`

When you index a span using a retention filter:

- **Searchability**: The indexed span can be found in Trace Explorer, dashboards, and monitored for 15 days.

- **Visualization context**: When you click on any indexed span in the Trace Explorer, you always see its complete trace context (all parent and child spans) in flame graph or waterfall view, regardless of whether those other spans were indexed.

- **Search context**: Although you can visualize a complete trace, only the spans that were specifically indexed by retention filters will be searchable in the Trace Explorer.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="Create Retention Filter">}}

To create a retention filter:
1. Go to [**APM** > **Retention Filters**][18].
1. Click **Add Retention Filter**.
1. Define the **Retention Query** to target the spans you wish to retain. Use any span or attribute to filter spans, as you would write a query in the [Trace Explorer][7].
1. Set a **Span rate** to define the percentage of spans matching this query that should be indexed.
1. Optionally, set a **Trace rate** to define the percentage of full traces associated with the spans that should be indexed. This ensures that other spans from traces associated with the span targeted by the retention query are also indexed, so that the indexed data is queryable in [Trace Queries][11]. 
1. Set a name for the filter.
1. Click **Add Filter** to save the filter.

<div class="alert alert-warning">Configuring a trace rate can significantly increase your indexed spans usage.</div>

For example, if you configure a retention filter to index spans from `service:my-service`:
- Configuring a span rate of `100%` ensures that all spans matching `service:my-service` are indexed.
- Configuring a trace rate of `50%` ensures that all spans from all traces with a span from `service:my-service` are indexed. Assuming traces have 100 spans in average and 5 spans from `service:my-service`, configuring a trace rate indexes the remaining 95 spans of the trace, for the trace rate percentage being configured.

When you create a new filter or edit the retention rate of an existing filter, Datadog displays an estimate of the percentage change in global indexing volume.

Filters are retained in a serial order. If you have an upstream filter that retains spans with the `resource:POST /hello_world` tag, those spans do not show up in the **Edit** window of a downstream filter that searches for spans with the same tag because they have been retained by the upstream filter.

## Trace search and analytics on indexed spans

### In the Trace Explorer, dashboards, and notebooks

By default, spans indexed by custom retention filters **and** the intelligent retention filter are included in the Trace Explorer [aggregated views][6] (timeseries, toplist, table), as well as in dashboards and notebook queries.


The `retained_by` attribute is present on all retained spans. Its value is: 
- `retained_by:retention_filter` if the span was captured by a [custom retention filter](#create-your-own-retention-filter), including the [default retention filters](#default-retention-filters) and **no trace rate** was configured. These spans are not included in Trace Queries as trace queries require all spans of a trace to be indexed.
- `retained_by:trace_retention_filter` if the span is captured by a retention filter for which a trace rate was configured.
- `retained_by:diversity_sampling` if the span was captured by [diversity sampling](#diversity-sampling) (part of the [Intelligent retention filter](#datadog-intelligent-retention-filter)).
- `retained_by:flat_sampled` if the span was indexed by the [1% flat sampling](#one-percent-flat-sampling). Filter further by retention reason:
  - `@retention_reason:rum` for traces linked to RUM sessions sampled based on the `session_id`. Use this to analyze traces correlated with user sessions.
  - `@retention_reason:trace` for traces sampled uniformly based on the `trace_id`. Use this for general performance trends and system-wide analysis.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="Retained By facet" >}}

### In trace analytics monitors

Spans indexed by the intelligent retention filter are **excluded** from APM trace analytics monitor evaluation.

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
[9]: /tracing/services/service_page/
[10]: /tracing/services/resource_page/
[11]: /tracing/trace_explorer/trace_queries
[12]: /tracing/trace_pipeline/ingestion_controls/
[13]: /tracing/trace_explorer/
[14]: /monitors/types/apm/?tab=traceanalytics
[15]: /synthetics/apm/
[16]: /security/application_security/
[17]: /dynamic_instrumentation/
[18]: https://app.datadoghq.com/apm/traces/retention-filters
[19]: /monitors/types/apm/?tab=traceanalytics
[20]: /tracing/other_telemetry/rum/
