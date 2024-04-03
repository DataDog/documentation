---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Return a set of attributes for the item with the given primary key.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/GetItemInputs'
inputFieldOrder:
- region
- tableName
- key
- attributes
- consistentRead
keywords:
- describe
- get
- lookup
output: '#/$defs/GetItemOutputs'
permissions:
- dynamodb:GetItem
source: amazon-dynamodb
title: Get item
---

Return a set of attributes for the item with the given primary key.

{{< workflows >}}
