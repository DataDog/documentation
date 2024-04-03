---
bundle: com.datadoghq.pagerduty
bundle_title: PagerDuty
description: Resolves a PagerDuty incident.
icon:
  integration_id: pagerduty
  type: integration_logo
input: '#/$defs/AckOrResolveInputs'
inputFieldOrder:
- serviceName
- dedupKey
output: '#/$defs/EventOutputs'
source: pagerduty
title: Resolve incident
---

Resolves a PagerDuty incident.

{{< workflows >}}
