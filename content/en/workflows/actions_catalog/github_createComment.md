---
bundle: com.datadoghq.github
bundle_title: GitHub
description: Creates a comment on a pull request
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/CreateCommentInputs'
inputFieldOrder:
- repository
- prNumber
- body
output: '#/$defs/CreateCommentOutputs'
source: github
title: Create comment
---

Creates a comment on a pull request

{{< workflows >}}
