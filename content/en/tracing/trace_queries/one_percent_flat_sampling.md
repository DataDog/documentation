---
title: 1% Flat Sampling for Trace Queries
kind: documentation
description: "How is flat 1% sampling going to impact existing Tracing investigations?"
is_beta: true
private: true
further_reading:
- link: 'tracing/trace_queries'
  tag: 'Documentation'
  text: 'Trace Queries'
---

Trace Queries are based on a **uniform 1% sample** of [ingested spans][1].

{{< img src="tracing/trace_queries/trace_queries_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling" >}}

The flat 1% sampling is applied based on the `trace_id`, meaning that all spans belonging to the same trace share the same sampling decision.

**Note**: Spans indexed by the flat 1% sampling are not counted towards the usage of indexed spans, and so **do not impact your bill**.

## What is the impact of enabling 1% flat sampling?

Spans indexed by the 1% sampling can also be queried/found in the [Trace Explorer][3].

From the moment 1% flat sampling is enabled, the volume of indexed spans is going to increase. To find spans that are sampled by the 1% flat sampling, add the `retained_by:flat_sampled` query parameter in the Trace Explorer.

{{< img src="tracing/trace_queries/flat_sampling.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling in Trace Explorer" >}}


**Note**: Spans indexed by the flat 1% sampling are **not used** in [Trace Analytics monitors][4], dashboards, and notebooks APM queries.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_pipeline/ingestion_controls/
[2]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[3]: /tracing/trace_explorer/
[4]: /monitors/types/apm/?tab=traceanalytics