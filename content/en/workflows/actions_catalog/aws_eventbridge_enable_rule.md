---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Enable a rule. If the rule does not exist, the operation fails. Incoming
  events may not immediately match to a newly enabled rule, so allow a short period
  of time for changes to take effect.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/EnableRuleInputs'
inputFieldOrder:
- region
- name
- eventBusName
keywords:
- allow
- authorize
- enable
output: '#/$defs/EnableRuleOutputs'
permissions:
- events:EnableRule
source: amazon-event-bridge
title: Enable rule
---

Enable a rule. If the rule does not exist, the operation fails. Incoming events may not immediately match to a newly enabled rule, so allow a short period of time for changes to take effect.

{{< workflows >}}
