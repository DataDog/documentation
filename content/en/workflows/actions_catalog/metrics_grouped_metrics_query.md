---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: A Datadog query that outputs a value per group, based on the `by` clause
  specified in the input query expression.
icon:
  icon_name: CompositeMonitor
  type: icon
input: '#/$defs/GroupedMetricsQueryInputs'
inputFieldOrder:
- queries
- formula
- lookbackWindowSeconds
- actingUserId
output: '#/$defs/GroupedMetricsQueryOutputs'
source: _datadog
stability: dev
title: Grouped metrics query
---

A Datadog query that outputs a value per group, based on the `by` clause specified in the input query expression.

{{< workflows >}}
