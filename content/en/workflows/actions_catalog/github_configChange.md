---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Performs modifications on configuration files, such as yaml or ini, and
  creates a PR.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/ConfigChangeInputs'
inputFieldOrder:
- repository
- operations
- targetBranch
- headBranch
- createPr
- prTitle
- prDescription
output: '#/$defs/ConfigChangeOutputs'
source: github
title: Edit configuration files
---

Performs modifications on configuration files, such as yaml or ini, and creates a PR.

{{< workflows >}}
