---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Retrieve a single ACL by name for the specified version and service.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/GetAclInputs'
inputFieldOrder:
- serviceId
- versionId
- aclName
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAclOutputs'
source: fastly
title: Get ACL
---

Retrieve a single ACL by name for the specified version and service.

{{< workflows >}}
