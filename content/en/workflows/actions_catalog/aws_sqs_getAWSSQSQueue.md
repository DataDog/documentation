---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Gets details about a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/GetAWSSQSQueueInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSSQSQueueOutputs'
permissions:
- sqs:GetQueueAttributes
- sqs:ListQueueTags
source: amazon-sqs
stability: stable
title: Describe queue
---

Gets details about a queue.

{{< workflows >}}
