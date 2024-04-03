---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Delete the messages in a queue specified by the `Queue name` parameter.
  Any messages deleted from a queue through this action are irretrievable. The message
  deletion process takes up to 60 seconds.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/PurgeQueueInputs'
inputFieldOrder:
- region
- queueName
output: '#/$defs/PurgeQueueOutputs'
permissions:
- sqs:PurgeQueue
- sqs:GetQueueUrl
source: amazon-sqs
title: Purge queue
---

Delete the messages in a queue specified by the `Queue name` parameter. Any messages deleted from a queue through this action are irretrievable. The message deletion process takes up to 60 seconds.

{{< workflows >}}
