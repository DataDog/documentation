---
bundle: com.datadoghq.circleci
bundle_title: CircleCI
description: Returns a job's artifacts.
icon:
  integration_id: circleci
  type: integration_logo
input: '#/$defs/GetJobArtifactsInputs'
inputFieldOrder:
- jobNumber
- projectSlug
keywords:
- describe
- get
- lookup
output: '#/$defs/GetJobArtifactsOutputs'
source: circleci
title: Get job artifacts
---

Returns a job's artifacts.

{{< workflows >}}
