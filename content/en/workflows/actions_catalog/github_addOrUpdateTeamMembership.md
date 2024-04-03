---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Add or update team membership for a GitHub user.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/AddOrUpdateTeamMembershipInputs'
inputFieldOrder:
- organization
- teamName
- username
- role
output: '#/$defs/AddOrUpdateTeamMembershipOutputs'
source: github
title: Add or update team member
---

Add or update team membership for a GitHub user.

{{< workflows >}}
