---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: "The metrics end-point allows you to post time-series data that can be\
  \ graphed on Datadog\u2019s dashboards."
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/SubmitMetricInputs'
inputFieldOrder:
- metric_name
- value
- type
- interval
- tags
- unit
output: '#/$defs/SubmitMetricOutputs'
requireConnection: true
source: _datadog
title: Submit metric
---

The metrics end-point allows you to post time-series data that can be graphed on Datadog’s dashboards.

{{< workflows >}}
