---
bundle: com.datadoghq.dd.metrics
bundle_title: Datadog Metrics
description: A Datadog query that outputs a single scalar query value. If any of your
  queries contains a `by` grouping clause, use Grouped Metrics Query instead.
icon:
  icon_name: Metric
  type: icon
input: '#/$defs/SimpleMetricsQueryInputs'
inputFieldOrder:
- queries
- formula
- lookbackWindowSeconds
- actingUserId
output: '#/$defs/SimpleMetricsQueryOutputs'
source: _datadog
stability: dev
title: Simple metrics query
---

A Datadog query that outputs a single scalar query value. If any of your queries contains a `by` grouping clause, use Grouped Metrics Query instead.

{{< workflows >}}
