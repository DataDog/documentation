---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Get attributes for a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/GetQueueAttributesInputs'
inputFieldOrder:
- region
- queueName
- attributeNames
keywords:
- describe
- get
- lookup
output: '#/$defs/GetQueueAttributesOutputs'
permissions:
- sqs:GetQueueAttributes
source: amazon-sqs
title: Get queue attributes
---

Get attributes for a queue.

{{< workflows >}}
