---
title: Google Cloud Log Forwarding Configuration Recommendations
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

{{< jqmath-vanilla >}}

## Overview

This guide recommends configuration settings for forwarding logs with the Google Cloud integration.

## Configuration recommendations

### Machine type

Set `--worker-machine-type` to `n2-standard-4` for the best performance-to-cost ratio. This worker type supports about 12k EPS.

### Machine count

Set `--max-workers` to cap the number of workers needed for peak EPS.

Dataflow autoscaling adjusts worker count based on load. To avoid over-provisioning, always set `--max-workers` when you deploy the pipeline.

Storage is provisioned statically:

An autoscaling pipeline provisions one persistent disk for each potential streaming worker. The default disk size is 400 GB. `--max-workers` sets the maximum, and disks mount to the workers that are running, including at startup.

Each worker can attach up to 15 persistent disks, so the minimum starting workers is ⌈--max-workers/15⌉. For example, with `--max-workers=20`:

- Storage is fixed at 20 persistent disks (8 TB total).
- Compute scales from a minimum of 2 workers (⌈20/15⌉) up to 20.
Large unused disks can add cost if only a few workers run most of the time.

To size your workers, follow these steps:

1. Determine the average events per second (EPS) using the following formula:

$$(\text"Average EPS" ≃ {\text"Daily log volume (Terabytes)"} / {\text"Average message size (Kilobytes)"} × 10^9 / {24 × 3600})$$

Example: One TB per day and messages of one KB yields about 11.5k EPS.

2. Determine the sustained peak EPS by using the following formula, where the multiplier N represents the unpredictable nature of logging volume:

$$(\text"Peak EPS" = N × \text"Average EPS")$$

Example: With N=2 and 11.5k average EPS, peak EPS is about 23k.

3. Determine the maximum required number of vCPUs by using the following formula:

$$(\text"Max vCPU" = ⌈{\text"Peak EPS"} / 3000⌉)$$

Example: 23k peak EPS ⇒ ⌈23/3⌉ = 8 vCPU cores.

**Note**: A single vCPU in the Datadog Dataflow pipeline typically processes about 3k EPS (assuming no low rate limits). One `n2-standard-4` worker (4 vCPUs) handles up to about 12k EPS.

4. Determine the maximum number of Dataflow workers by using the following formula:

$$(\text"Max workers" = ⌈{\text"Max vCPU"} / 4⌉)$$

Example: 8 vCPUs and 4 vCPUs per worker ⇒ 2 workers.

In this example, `--max-workers` is set to `2`. Use your own values for production sizing.

### Parallelism

Set the `parallelism` parameter to twice the total vCPUs across the maximum number of workers in the Pub/Sub to Datadog Dataflow template.

This maximizes parallel connections to the Datadog logs endpoint, and increases EPS.

The default value `1` disables parallelism and limits throughput. Override it to target 2–4 connections per vCPU at maximum workers. As a guideline, multiply the max workers by vCPUs per worker, then double the result.

To determine the total number of parallel connections to Datadog across all Dataflow workers, use the following formula:

$$(\text"Paralellism" = {\text"Max vCPU"} × 2)$$

Example: 8 vCPUs ⇒ 8 × 2 = 16.

For this example, you would set the parallelism parameter to a value of 16 based on the previous example calculation. However, remember to use your own unique values and calculations when you deploy this reference architecture in your environment.

### Batch count

Set the `batchCount` parameter to 10–50 events per request to send batches rather than single events to Datadog.

Batching increases EPS and reduces load on the Datadog logs endpoint. If a maximum buffering delay of two seconds is acceptable, use 10–50 events per request.

$$(\text"batchCount" ≥ 10)$$

In this example with messages of one KB, batch at least 10 events per request. Adjust this value based on your environment.

For performance and cost optimization details, see [Plan your Dataflow pipeline][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.cloud.google.com/dataflow/docs/guides/plan-pipelines

