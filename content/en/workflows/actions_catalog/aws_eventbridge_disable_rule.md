---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Disable a rule. A disabled rule does not match any events nor self-trigger
  if it has a schedule expression. Incoming events may continue to match to the disabled
  rule, so allow a short period of time for changes to take effect.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/DisableRuleInputs'
inputFieldOrder:
- region
- name
- eventBusName
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/DisableRuleOutputs'
permissions:
- events:DisableRule
source: amazon-event-bridge
title: Disable rule
---

Disable a rule. A disabled rule does not match any events nor self-trigger if it has a schedule expression. Incoming events may continue to match to the disabled rule, so allow a short period of time for changes to take effect.

{{< workflows >}}
