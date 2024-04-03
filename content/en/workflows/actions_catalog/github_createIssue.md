---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Creates an issue
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CreateIssueInputs'
inputFieldOrder:
- repository
- title
- body
- labels
- assignees
output: '#/$defs/CreateIssueOutputs'
source: github
title: Create issue
---

Creates an issue

{{< workflows >}}
