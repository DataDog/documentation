---
bundle: com.datadoghq.aws.sqs
bundle_title: AWS SQS
description: Return a list of queues in the current region. The response includes
  a maximum of 1,000 results. If you specify a value for the optional `QueueNamePrefix`
  parameter, only queues with names that begin with the specified value are returned.
icon:
  integration_id: amazon-sqs
  type: integration_logo
input: '#/$defs/ListQueuesInputs'
inputFieldOrder:
- region
- queueNamePrefix
- maxResults
keywords:
- all
- list
output: '#/$defs/ListQueuesOutputs'
permissions:
- sqs:ListQueues
source: amazon-sqs
title: List queues
---

Return a list of queues in the current region. The response includes a maximum of 1,000 results. If you specify a value for the optional `QueueNamePrefix` parameter, only queues with names that begin with the specified value are returned.

{{< workflows >}}
