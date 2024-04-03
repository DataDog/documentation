---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Set attributes for a queue.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/SetQueueAttributesInputs'
inputFieldOrder:
- region
- queueName
- attributes
keywords:
- modify
- put
- set
- update
output: '#/$defs/SetQueueAttributesOutputs'
permissions:
- sqs:SetQueueAttributes
- sqs:GetQueueUrl
source: amazon-sqs
title: Set queue attributes
---

Set attributes for a queue.

{{< workflows >}}
