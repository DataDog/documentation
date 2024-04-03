---
bundle: com.datadoghq.okta
bundle_title: Okta
description: Deactivates a user. This operation can only be performed on users that
  do not have a DEPROVISIONED status.
icon:
  integration_id: okta
  type: integration_logo
input: '#/$defs/DeactivateUserInputs'
inputFieldOrder:
- userIdOrLogin
- sendEmail
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/DeactivateUserOutputs'
source: okta
title: Deactivate user
---

Deactivates a user. This operation can only be performed on users that do not have a DEPROVISIONED status.

{{< workflows >}}
