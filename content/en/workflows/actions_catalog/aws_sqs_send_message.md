---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Deliver a message to a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/SendMessageInputs'
inputFieldOrder:
- region
- queueName
- messageBody
- messageAttributes
- messageSystemAttributes
- messageGroupId
- delaySeconds
output: '#/$defs/SendMessageOutputs'
permissions:
- sqs:SendMessage
- sqs:GetQueueUrl
source: amazon-sqs
title: Send message
---

Deliver a message to a queue.

{{< workflows >}}
