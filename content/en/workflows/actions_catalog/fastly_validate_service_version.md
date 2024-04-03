---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Validate the version for a particular service and version.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/ValidateServiceVersionInputs'
inputFieldOrder:
- serviceId
- versionId
output: '#/$defs/ValidateServiceVersionOutputs'
source: fastly
title: Validate service version
---

Validate the version for a particular service and version.

{{< workflows >}}
