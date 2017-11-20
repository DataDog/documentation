---
title: How do I submit custom metrics? What's their overhead?
kind: faq
customnav: main_references
---

## Overview

Here are some ways of getting your metrics data into Datadog:

* We [provide an SDK](/integrations/integration_sdk) for people interested in  writing new integrations.
* A common method is via DogStatsD, the StatsD server bundled with the Datadog Agent. To learn more read [our guide](/developers/dogstatsd) along with this [great article](/developers/metrics).
* Submit metrics directly to Datadog's [HTTP API](/api)
* Another method to consider is using [dogstatsd and the shell](/developers/dogstatsd/)
* Multiple community libraries are [listed here](/libraries/) (Go, Python, PHP, Yammer, Node.js, etc.)

Another option is to extend or fork any of our integrations that run on your localhost, you may learn more [about this here](/integrations/new_integration)

Be aware that pushing additional metrics to Datadog may impact your billing, please review [this article](/getting_started/custom_metrics) to learn more.

## Metric Overhead

If you're submitting metrics directly to the Datadog API sans DogStatsD, expect:

* 64 bits for the timestamp
* 64 bits for the value
* 20bytes for the metric names
* 50 bytes for the time-series
* Full payload being ~100 bytes.

However, if you're using the DogStatsD API a typical payload is very small over the wire as compression is applied.

 