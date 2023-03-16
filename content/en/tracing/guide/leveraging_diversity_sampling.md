---
title: Understand Datadog retention policy to efficiently retain trace data
kind: guide
further_reading:
- link: "/tracing/trace_pipeline/trace_retention/"
  tag: "Documentation"
  text: "How to control trace indexing?"
---

## Which traces do you care about ingesting and retaining?

Most of APM traces are repetitive and not necessarily relevant to ingest and retain. For the successful requests, retaining a **representative sample** of you applications' traffic is enough, as you will never scan through dozens of individual traced requests every second.

What you should care about primarily are the traces that contain symptoms of potential issues in your infrastructure, i.e. **traces with error and/or unusual latency**. On top of that, for specific **endpoints that are critical to your business**, you might want to retain 100% of the traffic, to ensure that are you are able to investigate and troubleshoot any . 

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="Relevant Traces" style="width:80%;" >}}


## How Datadog's retention policy helps you retain what matters?

Datadog provides 2 main ways of retaining data past 15 minutes: 
- The [Intelligent retention filter](#diversity-sampling-algorithm-intelligent-retention-filter) which is always enabled.
- [Custom tag-based retention filters](#tag-based-retention-filters) that you can manually configure.

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="How Datadog captures relevant traces" style="width:80%;" >}}


### Diversity Sampling algorithm: Intelligent Retention filter 

By default, the Intelligent retention filter keeps a representative selection of traces without requiring you to create dozens of custom retention filters.

It keeps at least one span (and the associated distributed trace) for each combination of `environment`, `service`, `operation` and `resource` every 15 minutes at most for the `p75`, `p90`, and `p95` latency percentiles, as well as a representative selection of errors, for each distinct response status codes.

Read more about the Intelligent Retention filter in our [documentation][1].

### Tag-based retention filters

Thanks to its [tag-based retention filters][2], Datadog gives you the flexibility to keep traces that are the most critical to your business.
When indexing spans with retention filters, the associated trace is also stored, which ensures that you keep visibility over the entire request and its distributed context.

## How to efficiently search and analyse indexed span data ?

The set of data captured by diversity sampling is **not uniformly sampled** (i.e. not proportionnally representative of the full traffic) and biased towards errors and high latency traces. You can choose to exclude these from these views by adding `-retained_by:diversity_sampling` query parameter to the query from the Trace Explorer, if you only want to build analytics on top of a uniformly sampled dataset.

For instance, if you want to measure the number of checkout operations grouped by merchant tier on your application, **excluding the diversity sampling** dataset ensures that you're performing this analysis on top of a representative set of data, and hence that proportions between `basic`, `enterprise` and `premium` checkouts are respected.

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="Number of checkout operations by tier" style="width:80%;" >}}

On the contrary, if you want to measure the number of unique merchants by merchant tier, you should **include the diversity sampling** dataset which could capture additional merchant ids not caught by custom retention filters.

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="Number of unique merchants by tier" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /tracing/trace_pipeline/trace_retention