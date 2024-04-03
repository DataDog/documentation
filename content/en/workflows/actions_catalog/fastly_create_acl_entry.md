---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Add an ACL entry to an ACL.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/CreateAclEntryInputs'
inputFieldOrder:
- serviceId
- aclId
- ipAddress
- negated
output: '#/$defs/CreateAclEntryOutputs'
source: fastly
title: Create ACL entry
---

Add an ACL entry to an ACL.

{{< workflows >}}
