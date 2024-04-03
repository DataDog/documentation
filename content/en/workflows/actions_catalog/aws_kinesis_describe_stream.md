---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: Describe a Kinesis data stream.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/DescribeStreamInputs'
inputFieldOrder:
- region
- streamName
- limit
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeStreamOutputs'
permissions:
- kinesis:DescribeStream
source: amazon-kinesis
title: Describe stream
---

Describe a Kinesis data stream.

{{< workflows >}}
