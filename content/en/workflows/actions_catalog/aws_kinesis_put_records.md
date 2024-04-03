---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: Write multiple data records into a Kinesis data stream in a single call.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/PutRecordsInputs'
inputFieldOrder:
- region
- streamName
- records
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutRecordsOutputs'
permissions:
- kinesis:PutRecords
source: amazon-kinesis
title: Put records
---

Write multiple data records into a Kinesis data stream in a single call.

{{< workflows >}}
