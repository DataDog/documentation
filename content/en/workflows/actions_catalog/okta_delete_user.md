---
bundle: com.datadoghq.okta
bundle_title: Okta
description: Deletes a user permanently. This operation can only be performed on users
  that have a DEPROVISIONED status. This action cannot be recovered!
icon:
  integration_id: okta
  type: integration_logo
input: '#/$defs/DeleteUserInputs'
inputFieldOrder:
- userIdOrLogin
- sendEmail
keywords:
- delete
- remove
output: '#/$defs/DeleteUserOutputs'
source: okta
title: Delete user
---

Deletes a user permanently. This operation can only be performed on users that have a DEPROVISIONED status. This action cannot be recovered!

{{< workflows >}}
