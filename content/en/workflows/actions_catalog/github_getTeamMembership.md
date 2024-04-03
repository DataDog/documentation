---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Get team membership information for a GitHub user.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/GetTeamMembershipInputs'
inputFieldOrder:
- organization
- teamName
- username
keywords:
- describe
- get
- lookup
output: '#/$defs/GetTeamMembershipOutputs'
source: github
title: Get team membership
---

Get team membership information for a GitHub user.

{{< workflows >}}
