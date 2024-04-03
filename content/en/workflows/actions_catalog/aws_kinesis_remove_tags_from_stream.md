---
bundle: com.datadoghq.aws.kinesis
bundle_title: AWS Kinesis
description: Remove tags from a Kinesis data stream.
icon:
  integration_id: amazon-kinesis
  type: integration_logo
input: '#/$defs/RemoveTagsFromStreamInputs'
inputFieldOrder:
- region
- streamName
- tagKeys
keywords:
- delete
- remove
output: '#/$defs/RemoveTagsFromStreamOutputs'
permissions:
- kinesis:RemoveTagsFromStream
source: amazon-kinesis
title: Remove tags from stream
---

Remove tags from a Kinesis data stream.

{{< workflows >}}
