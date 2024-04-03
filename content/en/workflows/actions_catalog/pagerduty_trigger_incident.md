---
bundle: com.datadoghq.pagerduty
bundle_title: PagerDuty
description: Triggers a PagerDuty incident.
icon:
  integration_id: pagerduty
  type: integration_logo
input: '#/$defs/TriggerInputs'
inputFieldOrder:
- serviceName
- severity
- summary
- source
- dedupKey
output: '#/$defs/EventOutputs'
source: pagerduty
title: Trigger incident
---

Triggers a PagerDuty incident.

{{< workflows >}}
