---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Create a new item, or replace an old item with a new item.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/PutItemInputs'
inputFieldOrder:
- region
- tableName
- item
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutItemOutputs'
permissions:
- dynamodb:PutItem
source: amazon-dynamodb
title: Put item
---

Create a new item, or replace an old item with a new item.

{{< workflows >}}
