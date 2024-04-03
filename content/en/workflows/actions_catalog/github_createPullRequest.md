---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Creates a pull request
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CreatePullRequestInputs'
inputFieldOrder:
- repository
- baseBranch
- branchWithChanges
- prTitle
- prDescription
maintainInputDeclarationOrder: true
output: '#/$defs/CreatePullRequestOutputs'
source: github
title: Create pull request
---

Creates a pull request

{{< workflows >}}
