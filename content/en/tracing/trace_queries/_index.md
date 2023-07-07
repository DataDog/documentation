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

[add screenshot]

A Trace Query is composed of one or more [span queries](#span-query), combined together with [trace query operators](#trace-query-operators).

### Span Query

Query for spans from a specific environment, service or endpoint using the existing Trace Explorer query syntax. Refer to the [query syntax][1] documentation for more information on how to query spans.

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

[add screenshot]

The Flow Map helps you understand the request path and service dependencies from the resulting traces matching the Trace Query. Use the map to spot error paths, unusual service depencencies, or abnormally high request rates to a database.

The Flow Map is powered by a sample of the ingested traffic. See below [what data are Trace Queries based on](#what-data-are-trace-queries-based-on)


- Hover on a node to see metrics for the request rate and the error rate of a service.
- Hover on an edge connecting two services to see metrics for the request rate and the error rate between two services.

Interact with the map to filter traces based on the 

## Trace List

Trace list  

## Analytics

timeseries, top list

## What data are Trace Queries based on

1% flat sampling


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/