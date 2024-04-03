---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: Update the tag configuration of a metric.
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/UpdateTagConfigurationInputs'
inputFieldOrder:
- metricName
- tags
- aggregations
- includePercentiles
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateTagConfigurationOutputs'
source: _datadog
title: Update tag configuration
---

Update the tag configuration of a metric.

{{< workflows >}}
