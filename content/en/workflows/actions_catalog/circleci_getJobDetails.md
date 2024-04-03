---
bundle: com.datadoghq.circleci
bundle_title: CircleCI
description: Returns job details.
icon:
  integration_id: circleci
  type: integration_logo
input: '#/$defs/GetJobDetailsInputs'
inputFieldOrder:
- jobNumber
- projectSlug
keywords:
- describe
- get
- lookup
output: '#/$defs/GetJobDetailsOutputs'
source: circleci
title: Get job details
---

Returns job details.

{{< workflows >}}
