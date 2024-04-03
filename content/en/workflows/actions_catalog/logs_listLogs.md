---
bundle: com.datadoghq.dd.logs
bundle_title: Datadog Logs
description: List endpoint returns logs that match a log search query.
icon:
  icon_name: Logs
  type: icon
input: '#/$defs/ListLogsInputs'
inputFieldOrder:
- time
- query
- startAt
- sort
- limit
- index
keywords:
- all
- list
output: '#/$defs/ListLogsOutputs'
source: _datadog
title: Search logs
---

List endpoint returns logs that match a log search query.

{{< workflows >}}
