---
bundle: com.datadoghq.aws.sns
bundle_title: AWS SNS
description: Send a message to an Amazon SNS topic, a text message (SMS message) directly
  to a phone number, or a message to a mobile platform endpoint (when you specify
  the `TargetArn`).
icon:
  integration_id: amazon-sns
  type: integration_logo
input: '#/$defs/PublishInputs'
inputFieldOrder:
- region
- topicArn
- message
- subject
- messageGroupId
output: '#/$defs/PublishOutputs'
permissions:
- sns:Publish
source: amazon-sns
title: Publish a message
---

Send a message to an Amazon SNS topic, a text message (SMS message) directly to a phone number, or a message to a mobile platform endpoint (when you specify the `TargetArn`).

{{< workflows >}}
