---
bundle: com.datadoghq.okta
bundle_title: Okta
description: Suspends a user. This operation can only be performed on users with an
  ACTIVE status. The user has a status of SUSPENDED when the process is complete.
icon:
  integration_id: okta
  type: integration_logo
input: '#/$defs/SuspendUserInputs'
inputFieldOrder:
- userIdOrLogin
output: '#/$defs/SuspendUserOutputs'
source: okta
title: Suspend user
---

Suspends a user. This operation can only be performed on users with an ACTIVE status. The user has a status of SUSPENDED when the process is complete.

{{< workflows >}}
