---
bundle: com.datadoghq.github
bundle_title: GitHub
description: List commits in repo.
icon:
  integration_id: github
  type: integration_logo
input: '#/$defs/ListCommitsInputs'
inputFieldOrder:
- repository
- path
- timePeriod
keywords:
- all
- list
output: '#/$defs/ListCommitsOutputs'
source: github
title: List commits
---

List commits in repo.

{{< workflows >}}
