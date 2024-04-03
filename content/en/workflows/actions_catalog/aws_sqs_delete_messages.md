---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Delete messages from a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/DeleteMessagesInput'
inputFieldOrder:
- region
- queueName
- messageReceiptHandles
keywords:
- delete
- remove
output: '#/$defs/DeleteMessagesOutput'
permissions:
- sqs:DeleteMessage
- sqs:GetQueueUrl
source: amazon-sqs
title: Delete messages
---

Delete messages from a queue.

{{< workflows >}}
