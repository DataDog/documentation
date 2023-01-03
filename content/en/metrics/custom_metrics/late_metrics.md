---
title: Late Metrics
kind: documentation
aliases:
  - /guides/metrics/late_metrics
  - /developers/metrics/custom_metrics/late_metrics
  - /getting_started/custom_metrics/late_metrics
  - /developers/metrics/late_metrics
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

## Overview

Late metric ingestion allows you to ingest metric points that possess outdated timestamps (older than one hour, but no older than your total metric retention period). Today, Datadog’s metrics intake pipelines are restricted to only ingest metric timestamps that are no older than one hour from the time of ingestion. You can now start monitoring events that will not allow you to send metrics in realtime (outages and delayed backend services) or correcting invalid metric submissions.

**Note**: Resending metric ponts (sending metrics points with an already existing timestamp and tag combination within Datadog) will be replaced, with compliance to our last point wins ingestion rule.

You can now ingest/configure late metrics for counts, rates, and gauges via the [Metrics Summary Page][1].

## Late Metrics Submission Mechanisms

Late metrics can be submitted to Datadog via our API or the Agent. 

For the API, you can send metrics points with old timestamps in the payload, while ensuring that the metric name that is ingesting the point has been configured to receive Late Metrics (via the UI). 

For the Agent, ensure that you have Agent version 7.40.0 installed, and you’ll be able to send delayed metric points via the updated DogStatsD interface. 

## Configuring Late Metrics

Click on any metric name to open its details side-panel. “Late Data” will be the second option under the already existing “Advanced” section in the Metrics side panel. Clicking on “Edit” will move to the next screen. 

GIF FROM JOE GOES HERE

You can now click on “Enable Late Data” and hit “Save” to start ingesting late metrics for the metric name you selected.

GIF FROM JOE GOES HERE

There are also APIs available so you can enable or disable late metric ingestion.

## Bulk Configuring Late Metrics

Optimize your Late Metrics enablement by using our Bulk Late Metric Enablement feature. By clicking Late Metrics on Metrics Summary, you can specify a namespace for your metrics. You can then configure all metrics matching that namespace to enable Late metrics ingestion.

GIF FROM JOE GOES HERE

## Late Metrics Ingestion Latency

Ingesting Late Metrics will include some ingestion latencies, dependent on the age of the metric timestamp. 

| Metrics Outdated by: | Ingestion Latency                     |
|----------------------|---------------------------------------|
| 1-12 hours           | Near Real-Time Ingestion (1 hour MAX) |
| 12 hours - 30 days   | Up to 14 hour latency                 |
| +30 days             | +14 hours latency                     |

*Ingestion latencies will improve with time.*

[1]: /metrics/summary/