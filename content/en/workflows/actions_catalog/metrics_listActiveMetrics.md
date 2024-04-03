---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: Get the list of actively reporting metrics from a given time until now.
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/ListActiveMetricsInputs'
inputFieldOrder:
- time
- host
- tag_filter
keywords:
- all
- list
output: '#/$defs/ListActiveMetricsOutputs'
source: _datadog
title: List active metrics
---

Get the list of actively reporting metrics from a given time until now.

{{< workflows >}}
