---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Deletes a file in the specified GitHub repository.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/DeleteFileInputs'
inputFieldOrder:
- repository
- path
- baseBranch
- branchWithChanges
- createPr
- prTitle
- prDescription
keywords:
- delete
- remove
output: '#/$defs/DeleteFileOutputs'
source: github
title: Delete file
---

Deletes a file in the specified GitHub repository.

{{< workflows >}}
