---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Creates or updates a file in the specified GitHub repository.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CreateOrUpdateFileInputs'
inputFieldOrder:
- repository
- path
- content
- baseBranch
- branchWithChanges
- createPr
- prTitle
- prDescription
output: '#/$defs/CreateOrUpdateFileOutputs'
source: github
title: Create or update file
---

Creates or updates a file in the specified GitHub repository.

{{< workflows >}}
