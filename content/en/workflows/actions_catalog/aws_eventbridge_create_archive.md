---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Create an archive of events with the specified settings. Incoming events
  may not immediately start being sent to the archive, so allow a short period of
  time for changes to take effect.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/CreateArchiveInputs'
inputFieldOrder:
- region
- name
- eventSourceArn
- retentionDays
- eventPattern
- description
output: '#/$defs/CreateArchiveOutputs'
permissions:
- events:CreateArchive
source: amazon-event-bridge
title: Create archive
---

Create an archive of events with the specified settings. Incoming events may not immediately start being sent to the archive, so allow a short period of time for changes to take effect.

{{< workflows >}}
