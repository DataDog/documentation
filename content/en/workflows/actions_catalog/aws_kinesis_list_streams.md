---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: List your Kinesis data streams. May require multiple calls to `ListStreams`.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/ListStreamsInputs'
inputFieldOrder:
- region
- limit
keywords:
- all
- list
output: '#/$defs/ListStreamsOutputs'
permissions:
- kinesis:ListStreams
source: amazon-kinesis
title: List streams
---

List your Kinesis data streams. May require multiple calls to `ListStreams`.

{{< workflows >}}
