---
bundle: com.datadoghq.pagerduty
bundle_title: PagerDuty
description: Acknowledges a PagerDuty incident.
icon:
  integration_id: pagerduty
  type: integration_logo
input: '#/$defs/AckOrResolveInputs'
inputFieldOrder:
- serviceName
- dedupKey
output: '#/$defs/EventOutputs'
source: pagerduty
title: Acknowledge incident
---

Acknowledges a PagerDuty incident.

{{< workflows >}}
