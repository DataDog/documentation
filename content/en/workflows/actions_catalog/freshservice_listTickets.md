---
bundle: com.datadoghq.freshservice
bundle_title: Freshservice
description: List Freshservice tickets.
icon:
  integration_id: freshservice
  type: integration_logo
input: '#/$defs/ListTicketsInputs'
inputFieldOrder:
- requesterEmail
- createdTimeRange
- status
- priority
keywords:
- all
- list
output: '#/$defs/ListTicketsOutputs'
source: freshservice
stability: stable
title: List tickets
---

List Freshservice tickets.

{{< workflows >}}
