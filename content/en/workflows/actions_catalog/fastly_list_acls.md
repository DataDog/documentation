---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: List ACLs for a given service.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/ListAclsInputs'
inputFieldOrder:
- serviceId
- versionId
keywords:
- all
- list
output: '#/$defs/ListAclsOutputs'
source: fastly
title: List ACLs
---

List ACLs for a given service.

{{< workflows >}}
