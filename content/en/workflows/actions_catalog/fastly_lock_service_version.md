---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Locks the specified version.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/LockServiceVersionInputs'
inputFieldOrder:
- serviceId
- versionId
output: '#/$defs/LockServiceVersionOutputs'
source: fastly
title: Locks service version
---

Locks the specified version.

{{< workflows >}}
