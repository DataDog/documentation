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

*What are Late Metrics?* If you are emitting metric points, which posses timestamps that are older than an hour relative to the time of submission, Datadog will classify this metric point as a Late Metric. 

**Example**: You emit a metric point at 1PM EST and the timestamp on said metric point reads 10AM EST. This metric point is considered late, as it is delayed by 3 hours relative to the time of submission. 

*Why does this matter to the average Datadog Metrics user?* Traditionally, Datadog has not supported Late Metrics, hence the introduction of Late Metric Ingestion will allow you to start monitroing a pleathora of new use-cases with your Datadog Metrics. (Outage Recovery, Overwriting Invalid Metrics, and Managing IoT Delays to name a few)

Late Metric Ingestion allows you to collect metric points that possess outdated timestamps (older than one hour from the time of submission, but no older than your total metric retention period (*defaults to 15 months for all metrics*)). 

**Note**: Resending metric ponts (sending metrics points with an already existing timestamp and tag combination within Datadog) will be replaced, with compliance to our last point wins ingestion rule.

You can now start ingesting Late Metrics by configuring Late Metrics Ingestion via the [Metrics Summary Page][1] for counts, rates, and gauges.

## Late Metrics Submission Mechanisms

Late metrics can be submitted to Datadog via our API or the Agent. 

**If you intend to submit late metrics via the API**:, you can send metrics points with old timestamps in the payload, while ensuring that the metric name that is ingesting the point has been configured to receive Late Metrics (via the UI). 

**If you intend to submit late metrics via the Agent**:  ensure that you have Agent version +7.40.0 installed, and you’ll be able to send delayed metric points via the updated DogStatsD interface (*currently supporting GoLang and .NET versions*). 

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