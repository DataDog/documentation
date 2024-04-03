---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Delete a single item in a table by primary key.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/DeleteItemInputs'
inputFieldOrder:
- region
- tableName
- key
keywords:
- delete
- remove
output: '#/$defs/DeleteItemOutputs'
permissions:
- dynamodb:DeleteItem
source: amazon-dynamodb
title: Delete item
---

Delete a single item in a table by primary key.

{{< workflows >}}
