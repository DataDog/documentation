---
bundle: com.datadoghq.aws.sns
bundle_title: AWS SNS
description: Send a text message (SMS message) directly to a phone number.
icon:
  integration_id: amazon-sns
  type: integration_logo
input: '#/$defs/SendSmsInputs'
inputFieldOrder:
- region
- phoneNumber
- message
output: '#/$defs/SendSmsOutputs'
permissions:
- sns:Publish
source: amazon-sns
title: Send SMS
---

Send a text message (SMS message) directly to a phone number.

{{< workflows >}}
