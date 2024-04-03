---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: List the tags of a Kinesis data stream.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/ListTagsForStreamInputs'
inputFieldOrder:
- region
- streamName
- limit
keywords:
- all
- list
output: '#/$defs/ListTagsForStreamOutputs'
permissions:
- kinesis:ListTagsForStream
source: amazon-kinesis
title: List tags for stream
---

List the tags of a Kinesis data stream.

{{< workflows >}}
