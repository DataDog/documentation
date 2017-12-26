---
title: Why am I seeing inconsistencies for metrics submitted to DogStatsD?
kind: faq
---

## Scenario

[The DogStatsD server](/developers/dogstatsd) can support a rate of ~2K packets per flush (10 seconds), if the packet number exceeds this it is possible that the DogStatsD Server won't be able to submit the metrics, resulting in gaps in your data.

## How do I identify this?

You may graph the metric datadog.dogstatsd.packet.count for the host(s) encountering the gaps:

{{< img src="agent/faq/dogstatsd_metrics.png" alt="DogstasD Metrics" responsive="true" popup="true">}}

## How do I resolve this?

We recommend spreading the load across multiple hosts/instances.
 
Another solution would be to adjust the [sample rate](/developers/dogstatsd) for the StatsD Client to 0.5 or similar and you should see an improvement.