---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Gets details about a global table.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/GetAWSDynamoDBGlobalTableInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSDynamoDBGlobalTableOutputs'
permissions:
- dynamodb:Describe*
- application-autoscaling:Describe*
- cloudwatch:PutMetricData
source: amazon-dynamodb
stability: stable
title: Describe global table
---

Gets details about a global table.

{{< workflows >}}
