---
title: Trace Queries
kind: documentation
description: "Trace Queries"
is_beta: true
private: true
further_reading:
- link: 'tracing/trace_explorer'
  tag: 'Documentation'
  text: 'Trace Explorer'
---

{{< beta-callout url="#" btn_hidden="true">}}
Trace Queries is in private beta. Spans used for queries are from a <a href="/tracing/trace_queries/one_percent_flat_sampling">1% flat sampling</a>, not from your existing retention filters.
{{< /beta-callout >}}

Trace Queries allow you to compose span queries by specifying trace structure conditions. Leverage Trace Queries to accelerate your investigations and quickly find relevant traces. You can search, filter, group and visualize traces from the Trace Query explorer.

With structure-based querying, you are able to answer new categories of questions: 
- Which traces include a dependency between two services (`service A` has a downstream call to `service B`)
- What API endpoints are affected by my erroring backend service?
- And much more...

## Trace Query Editor

{{< img src="tracing/trace_queries/trace_query_editor.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Query Editor" >}}

A Trace Query is composed of one or more [span queries](#span-query), combined together with [trace query operators](#trace-query-operators).

### Span Query

Query for spans from a specific environment, service or endpoint using the existing Trace Explorer query syntax. Use autocomplete suggestions to view facets and recent queries. Refer to the [query syntax][1] documentation for more information on how to query spans.

Click `Add another span query` to add a new span query and use it in the trace query statement.

### Trace Query operators

To combine multiple span queries into a trace query, use any of the following operators:

Operator | Description | Example
-----|-----|-----
`&&` | **And**: both spans are in the trace | traces containing spans from the service `web-store` and spans from the service `payments-go`: `service:web-store && service:payments-go`
`\|\|` | **Or**: one or the other span are in the trace | traces containing spans from the service `web-store` or from the service `mobile-store`: `service:web-store && service:mobile-store`
`->` | **Indirect relationship**: Traces containing a span matching the left query that is upstream of spans matching the right query | traces where the service `checkoutservice` is upstream of the service `quoteservice`: `service:checkoutservice -> service:quoteservice`
`=>` | **Direct relationship**: Traces containing a span matching the left query being the direct parent of a span matching the right query | traces where the service `checkoutservice` is directly calling the service `shippingservice`: `service:checkoutservice -> service:shippingservice`

## Flow Map

{{< img src="tracing/trace_queries/trace_flow_map.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Flow Map" >}}

The Flow Map helps you understand the request path and service dependencies from the resulting traces matching the Trace Query. Use the map to spot error paths, unusual service depencencies, or abnormally high request rates to a database.

**Note**: The Flow Map is powered by a sample of the ingested traffic. See below [what data are Trace Queries based on](#what-data-are-trace-queries-based-on)

Service nodes matching span queries are highlighted to let you understand which parts of the trace your query conditions are targeting.

To get more information about the number of requests and errors **by** service and **between** services: 
- Hover on a node to see metrics for the request rate and the error rate of a service.
- Hover on an edge connecting two services to see metrics for the request rate and the error rate between two services.

Click with the map nodes to filter our traces that do not contain a dependency on the targeted service.

## Trace List

{{< img src="tracing/trace_queries/trace_list.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace List" >}}

The Trace list displays a list of 50 sample traces matching the query and within the selected time range.
Hover on the Latency Breakdown to get a sense of where (in which services) the time is spent during the request execution.

**Note**: Information displayed in the table are attributes from the root span of the trace, including the duration, which **does not** represent the end-to-end duration of the trace.

## Analytics

Pivot to `Visualize as Timeseries`, `Top List`, `Table` etc... to aggregate results over time, grouped by one or multiple dimensions. Refer to the [Span Visualizations][2] for more information on the aggregation options. 

In addition to the already existing aggregation options, you need to select from which query you want to aggregate the spans from. Select the query matching the spans from which you're using the tags and attributes in the aggregation options.

For instance, if you're querying for traces containing a span from the service `web-store` (Query **A**) and a span from the service `payments-go` with some errors (Query **B**), and visualising a count of spans grouped by `@merchant.tier`, use spans from the Query **A** as `merchant.tier` is an attribute from the spans of the service `web-store`, not from the service `payments-go`.

{{< img src="tracing/trace_queries/timeseries_using_spans_from.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Timeseries view" >}}


## What data are Trace Queries based on ?

{{< img src="tracing/trace_queries/trace_queries_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling" >}}


Trace Queries are based on a **uniform 1% sample** of [ingested spans][3].

The flat 1% sampling is applied based on the `trace_id`, meaning that all spans belonging to the same trace share the same sampling decision. Spans indexed by the 1% sampling can also be queried/found in the [Trace explorer][4].

Spans indexed by [tag-based retention filters][5] cannot be used in Trace Queries as current retention filters do not guarantee that all the spans from a trace are indexed.

**Note**: Spans indexed by the flat 1% sampling are not counted towards the usage of indexed spans, and so **do not impact your bill**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/
[2]: /tracing/trace_explorer/visualize/#timeseries
[3]: /tracing/trace_pipeline/ingestion_controls/
[4]: /tracing/trace_explorer/
[5]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter