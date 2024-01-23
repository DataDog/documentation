---
title: Trace Queries Source Data
kind: guide
further_reading:
    - link: "/tracing/trace_explorer/trace_queries/"
      tag: "Documentation"
      text: "Trace Queries"
---

## Overview
 
With Trace Queries, you can find entire traces based on the properties of multiple spans and the relationships between those spans within the structure of the trace. To learn more, read the [Trace Queries documentation][1].

{{< img src="tracing/trace_queries/trace_queries.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Queries UI" >}}

## How Trace Queries source data

Datadog uses the [Intelligent Retention Filter][6] to index data for Trace Queries. It does so by performing: 

- [Flat sampling](#1-flat-sampling): A uniform 1% sample of ingested spans.
- [Diversity sampling](#diversity-sampling): A representative, diverse selection of traces to keep visibility over each environment, service, operation, and resource.

These 2 sampling mechanisms capture **complete traces**, meaning that all spans of a trace are always indexed to ensure the well-functioning of Trace Queries.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling & Diversity Sampling" >}}

**Note**: Spans indexed by flat sampling and diversity sampling do not count towards the usage of indexed spans, and therefore, **do not impact your bill**.

### 1% flat sampling
`retained_by:flat_sampled`

Flat 1% sampling is applied based on the `trace_id`, meaning that all spans belonging to the same trace share the same sampling decision. To learn more, read the [one percent flat sampling documentation][2].

### Diversity sampling
`retained_by:diversity_sampling`

Every 15 minutes, diversity sampling retains at least one span and the associated trace for each combination of environment, service, operation, and resource. This occurs for the `p75`, `p90`, and `p95` percentile of latencies to ensure that you can always find example traces in service and resource pages, even for low traffic endpoints. To learn more, read the [diversity sampling documentation][3].

## Impact of enabling Trace Queries

From the moment Traces Queries are enabled on your account (find the exact date in the event published in the Event Stream), the Intelligent Retention filter starts to index more data as it starts capturing complete traces .

You can query spans indexed by the Intelligent Retention filter in the [Trace Explorer][4]. As a result, you might notice a spike in the number of indexed spans in Trace Explorer queries. This change is indicated by an event overlay showing an **Intelligent Retention Filter change** event.

To find spans that are sampled by the 1% flat sampling or the diversity sampling methods, add a `retained_by:(flat_sampled OR diversity_sampling)` query parameter in the Trace Explorer.

{{< img src="tracing/trace_queries/intelligent_retention_filter_change.png" style="width:90%; background:none; border:none; box-shadow:none;" alt="Event Overlay Intelligent Retention Filter" >}}

Spans indexed by the Intelligent retention filter are excluded from APM queries in:

- Dashboards
- Notebooks
- [Trace Analytics monitor][5] evaluations

Therefore, they are **not impacted** by this change.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_explorer/trace_queries/
[2]: /tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[3]: /tracing/trace_pipeline/trace_retention/#diversity-sampling
[4]: /tracing/trace_explorer/
[5]: /monitors/types/apm/?tab=traceanalytics
[6]: /tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
