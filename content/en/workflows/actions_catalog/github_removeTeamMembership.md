---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Remove team membership for a GitHub user.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/RemoveTeamMembershipInputs'
inputFieldOrder:
- organization
- teamName
- username
keywords:
- delete
- remove
output: '#/$defs/RemoveTeamMembershipOutputs'
source: github
title: Remove team member
---

Remove team membership for a GitHub user.

{{< workflows >}}
