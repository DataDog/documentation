---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Get details about an archive.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/GetAWSEventsArchiveInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSEventsArchiveOutputs'
permissions:
- events:DescribeArchive
source: amazon-event-bridge
stability: stable
title: Describe archive
---

Get details about an archive.

{{< workflows >}}
