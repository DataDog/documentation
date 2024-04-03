---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: List archives.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/ListAWSEventsArchiveInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListAWSEventsArchiveOutputs'
permissions:
- events:ListArchives
source: amazon-event-bridge
stability: stable
title: List archives
---

List archives.

{{< workflows >}}
