---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: List details about a partner event source shared with your account.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/DescribeEventSourceInputs'
inputFieldOrder:
- region
- name
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeEventSourceOutputs'
permissions:
- events:DescribeEventSource
source: amazon-event-bridge
title: Describe event source
---

List details about a partner event source shared with your account.

{{< workflows >}}
