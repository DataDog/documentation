---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Creates a new branch.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CreateBranchInputs'
inputFieldOrder:
- repository
- baseBranch
- branchToCreate
output: '#/$defs/CreateBranchOutputs'
source: github
title: Create branch
---

Creates a new branch.

{{< workflows >}}
