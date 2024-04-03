---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: Add or update tags for a Kinesis data stream.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/AddTagsToStreamInputs'
inputFieldOrder:
- region
- streamName
- tagMap
output: '#/$defs/AddTagsToStreamOutputs'
permissions:
- kinesis:AddTagsToStream
source: amazon-kinesis
title: Add tags to stream
---

Add or update tags for a Kinesis data stream.

{{< workflows >}}
