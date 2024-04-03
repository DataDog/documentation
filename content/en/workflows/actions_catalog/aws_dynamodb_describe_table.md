---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Return information about the table, including the current status of the
  table, when it was created, the primary key schema, and any indexes on the table.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/DescribeTableInputs'
inputFieldOrder:
- region
- tableName
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeTableOutputs'
permissions:
- dynamodb:DescribeTable
source: amazon-dynamodb
title: Describe DynamoDB table
---

Return information about the table, including the current status of the table, when it was created, the primary key schema, and any indexes on the table.

{{< workflows >}}
