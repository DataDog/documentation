---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Lookup user by email.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/GetUserByEmailInputs'
inputFieldOrder:
- teamId
- userEmail
keywords:
- describe
- get
- lookup
output: '#/$defs/GetUserByEmailOutputs'
source: slack
title: Get user by email
---

Lookup user by email.

{{< workflows >}}
