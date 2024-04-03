---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Receive messages from a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/ReceiveMessagesInputs'
inputFieldOrder:
- region
- queueName
- maxNumberOfMessages
- deleteMessages
output: '#/$defs/ReceiveMessagesOutput'
permissions:
- sqs:ReceiveMessage
- sqs:DeleteMessage
- sqs:GetQueueUrl
source: amazon-sqs
title: Receive messages
---

Receive messages from a queue.

{{< workflows >}}
