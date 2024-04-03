---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Edit an existing item's attributes, or add a new item to the table if
  it does not already exist.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/UpdateItemInputs'
inputFieldOrder:
- region
- tableName
- key
- updateExpression
- updateValues
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateItemOutputs'
permissions:
- dynamodb:UpdateItem
source: amazon-dynamodb
title: Update item
---

Edit an existing item's attributes, or add a new item to the table if it does not already exist.

{{< workflows >}}
