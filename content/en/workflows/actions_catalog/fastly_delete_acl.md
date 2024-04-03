---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Delete an ACL from the specified service version. To remove an ACL from
  use, the ACL must be deleted from a draft version and the version without the ACL
  must be activated.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/DeleteAclInputs'
inputFieldOrder:
- serviceId
- versionId
- aclName
keywords:
- delete
- remove
output: '#/$defs/DeleteAclOutputs'
source: fastly
title: Delete ACL
---

Delete an ACL from the specified service version. To remove an ACL from use, the ACL must be deleted from a draft version and the version without the ACL must be activated.

{{< workflows >}}
