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




[1] /metrics/summary/