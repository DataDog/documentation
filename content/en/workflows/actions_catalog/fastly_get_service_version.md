---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Get the version for a particular service.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/GetServiceVersionInputs'
inputFieldOrder:
- serviceId
- versionId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetServiceVersionOutputs'
source: fastly
title: Get service version
---

Get the version for a particular service.

{{< workflows >}}
