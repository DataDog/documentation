---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Add ACL entries to an ACL.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/CreateAclEntriesInputs'
inputFieldOrder:
- serviceId
- aclId
- ipAddresses
- negated
output: '#/$defs/CreateAclEntriesOutputs'
source: fastly
title: Create ACL entries
---

Add ACL entries to an ACL.

{{< workflows >}}
