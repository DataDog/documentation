---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: Write a single data record into a data stream.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/PutRecordInputs'
inputFieldOrder:
- region
- streamName
- data
- partitionKey
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutRecordOutputs'
permissions:
- kinesis:PutRecord
source: amazon-kinesis
title: Put record
---

Write a single data record into a data stream.

{{< workflows >}}
