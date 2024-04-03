---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Delete an ACL Entry.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/DeleteAclEntryInputs'
inputFieldOrder:
- serviceId
- aclId
- aclEntryId
keywords:
- delete
- remove
output: '#/$defs/DeleteAclOutputs'
source: fastly
title: Delete ACL entry
---

Delete an ACL Entry.

{{< workflows >}}
