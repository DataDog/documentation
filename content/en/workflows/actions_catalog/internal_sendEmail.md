---
bundle: com.datadoghq.internal
bundle_title: Datadog Internal
description: This action sends an email. This action is only available internally.
icon:
  icon_name: Email
  type: icon
input: '#/$defs/SendEmailInputs'
inputFieldOrder:
- to
- subject
- message
internal: true
output: '#/$defs/SendEmailOutputs'
source: _datadog
title: Send email
---

This action sends an email. This action is only available internally.

{{< workflows >}}
