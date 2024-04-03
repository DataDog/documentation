---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: Search for metrics from the last 24 hours in Datadog.
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/ListMetricsInputs'
inputFieldOrder:
- q
keywords:
- all
- list
output: '#/$defs/ListMetricsOutputs'
source: _datadog
title: Search metrics
---

Search for metrics from the last 24 hours in Datadog.

{{< workflows >}}
