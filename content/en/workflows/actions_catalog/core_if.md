---
bundle: com.datadoghq.core
bundle_title: Datadog Core
description: Advances to the `true` branch if the expression evaluates to `true`.
  Otherwise, advances to the `false` branch.
hideCompletionGate: true
icon:
  icon_name: Check
  type: icon
input: '#/$defs/IfConditionInputs'
inputFieldOrder:
- conditions
- joinOperator
keywords:
- if
- branch
outbound_branching:
  branches:
  - 'true'
  - 'false'
  type: static
output: '#/$defs/IfConditionOutputs'
source: _datadog
title: Branch workflow from condition
---

Advances to the `true` branch if the expression evaluates to `true`. Otherwise, advances to the `false` branch.

{{< workflows >}}
