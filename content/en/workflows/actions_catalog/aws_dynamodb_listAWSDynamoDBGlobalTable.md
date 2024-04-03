---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Lists global tables.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/ListAWSDynamoDBGlobalTableInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListAWSDynamoDBGlobalTableOutputs'
permissions:
- dynamodb:ListTables
- cloudwatch:PutMetricData
source: amazon-dynamodb
stability: stable
title: List global tables
---

Lists global tables.

{{< workflows >}}
