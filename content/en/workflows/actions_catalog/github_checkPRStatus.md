---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Gets a pull request's status
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CheckPRStatusInputs'
inputFieldOrder:
- repository
- prNumber
output: '#/$defs/CheckPRStatusOutputs'
source: github
title: Get pull request status
---

Gets a pull request's status

{{< workflows >}}
