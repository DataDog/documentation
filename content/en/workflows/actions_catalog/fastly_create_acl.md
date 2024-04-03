---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Create a new ACL attached to the specified service version. A new, empty
  ACL must be attached to a draft version of a service. The version associated with
  the ACL must be activated to be used.
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/CreateAclInputs'
inputFieldOrder:
- serviceId
- versionId
- aclName
output: '#/$defs/CreateAclOutputs'
source: fastly
title: Create ACL
---

Create a new ACL attached to the specified service version. A new, empty ACL must be attached to a draft version of a service. The version associated with the ACL must be activated to be used.

{{< workflows >}}
