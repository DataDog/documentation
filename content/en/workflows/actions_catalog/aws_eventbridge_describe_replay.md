---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Retrieve details about a replay. Use `DescribeReplay` to determine the
  progress of a running replay.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/DescribeReplayInputs'
inputFieldOrder:
- region
- name
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeReplayOutputs'
permissions:
- events:DescribeReplay
source: amazon-event-bridge
title: Describe replay
---

Retrieve details about a replay. Use `DescribeReplay` to determine the progress of a running replay.

{{< workflows >}}
