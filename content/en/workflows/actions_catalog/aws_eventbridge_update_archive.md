---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Update an archive.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/UpdateArchiveInputs'
inputFieldOrder:
- region
- name
- retentionDays
- eventPattern
- description
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateArchiveOutputs'
permissions:
- events:UpdateArchive
source: amazon-event-bridge
title: Update archive
---

Update an archive.

{{< workflows >}}
