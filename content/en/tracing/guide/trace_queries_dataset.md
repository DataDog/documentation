---
title: The data APM Trace queries are based on
kind: guide
---

## Overview
 
APM Trace Queries let you find entire traces based on the properties of multiple spans and the relationships between those spans within the structure of the trace. Read more about Trace Queries in the [documentation][1].

{{< img src="tracing/trace_queries/trace_queries.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Queries UI" >}}


## The data Trace Queries are based on

To power Trace Queries, Datadog relies on the **Intelligent Retention Filter** to index: 
- a uniform 1% sample of ingested spans: this is [**flat sampling**](#1-flat-sampling).
- a representative diverse selection of traces to ensure that you keep visibility over each environment, service, operation, and resource: this is [**diversity sampling**](#diversity-sampling).

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling & Diversity Sampling" >}}

Note: Spans indexed by the flat sampling and the diversity sampling are not counted towards the usage of indexed spans, and so **do not impact your bill**.


### 1% flat sampling

The flat 1% sampling is applied based on the `trace_id`, meaning that all spans belonging to the same trace share the same sampling decision. Read more in the [documentation][2].

### Diversity sampling

The Diversity sampling scans through the service entry spans and retains at least one span (and the associated trace) for each combination of environment, service, operation, and resource every 15 minutes at most, for the `p75`, `p90`, and `p95` percentile of latencies to ensure that you can always find example traces in service and resource pages, even for low traffic endpoints. Read more about diversity sampling in the [documentation][3].

## The change: what is the impact ?

From the moment Trace Queries are enabled on your account, the Intelligent Retention filter will start indexing more data

Spans indexed by the Intelligent Retention filter can be queried in the [Trace Explorer][4]. As a result, you might notice a spike in the number of indexed spans in Trace Explorer queries, which matches an event overlay showing an **Intelligent Retention Filter change** event.

To find spans that are sampled by the 1% flat sampling and diversity sampling, add a `retained_by:(flat_sampled OR diversity_sampling)` query parameter in the Trace Explorer. 

_[add trace explorer screenshot]_

### Impact of the Intelligent Retention filter change

Spans indexed by the Intelligent retention filter are excluded from APM queries that appear in dashboards and notebooks, and also excluded from [trace analytics monitors'][5] evaluation, hence will **not be impacted** by the change.




[1]: /tracing/trace_explorer/trace_queries/
[2]: /tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[3]: /tracing/trace_pipeline/trace_retention/#diversity-sampling
[4]: /tracing/trace_explorer/
[5]: /monitors/types/apm/?tab=traceanalytics
