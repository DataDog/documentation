---
bundle: com.datadoghq.pagerduty
bundle_title: PagerDuty
description: Gets the on-call for a PagerDuty schedule.
icon:
  integration_id: pagerduty
  type: integration_logo
input: '#/$defs/OnCallInputs'
inputFieldOrder:
- scheduleID
keywords:
- describe
- get
- lookup
output: '#/$defs/OnCallOutputs'
source: pagerduty
title: Get current on-call
---

Gets the on-call for a PagerDuty schedule.

{{< workflows >}}
