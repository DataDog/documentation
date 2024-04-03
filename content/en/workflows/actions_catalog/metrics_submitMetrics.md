---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: "The metrics end-point allows you to post time-series data that can be\
  \ graphed on Datadog\u2019s dashboards."
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/SubmitMetricsInputs'
inputFieldOrder:
- series
output: '#/$defs/SubmitMetricsOutputs'
source: _datadog
stability: dev
title: Submit metrics
---

The metrics end-point allows you to post time-series data that can be graphed on Datadog’s dashboards.

{{< workflows >}}
