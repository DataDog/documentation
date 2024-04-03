---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Delete an archive.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/DeleteArchiveInputs'
inputFieldOrder:
- region
- name
keywords:
- delete
- remove
output: '#/$defs/DeleteArchiveOutputs'
permissions:
- events:DeleteArchive
source: amazon-event-bridge
title: Delete archive
---

Delete an archive.

{{< workflows >}}
