---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: Create and define a list of queryable tag keys for an existing metric.
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/CreateTagConfigurationInputs'
inputFieldOrder:
- metricName
- metricType
- tags
- aggregations
- includePercentiles
output: '#/$defs/CreateTagConfigurationOutputs'
source: _datadog
title: Create tag configuration
---

Create and define a list of queryable tag keys for an existing metric.

{{< workflows >}}
