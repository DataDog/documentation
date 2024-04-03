---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Clone the current configuration into a new version.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/CloneServiceVersionInputs'
inputFieldOrder:
- serviceId
- versionId
keywords:
- clone
- duplicate
output: '#/$defs/CloneServiceVersionOutputs'
source: fastly
title: Clone service version
---

Clone the current configuration into a new version.

{{< workflows >}}
