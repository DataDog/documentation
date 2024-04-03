---
bundle: com.datadoghq.github
bundle_title: GitHub
description: List members of given team.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/ListTeamMembersInputs'
inputFieldOrder:
- organization
- teamName
- role
keywords:
- all
- list
output: '#/$defs/ListTeamMembersOutputs'
source: github
title: List team members
---

List members of given team.

{{< workflows >}}
