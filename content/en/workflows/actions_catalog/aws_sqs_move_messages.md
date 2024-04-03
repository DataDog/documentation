---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Send messages from one queue to another queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/MoveMessagesInputs'
inputFieldOrder:
- region
- fromQueueName
- toQueueName
output: '#/$defs/MoveMessagesOutputs'
permissions:
- sqs:SendMessage
- sqs:ReceiveMessage
- sqs:DeleteMessage
- sqs:GetQueueUrl
source: amazon-sqs
title: Move messages
---

Send messages from one queue to another queue.

{{< workflows >}}
