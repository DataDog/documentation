---
bundle: com.datadoghq.okta
bundle_title: Okta
description: Adds a user to a group of OKTA_GROUP type.
icon:
  integration_id: okta
  type: integration_logo
input: '#/$defs/AddUserToGroupInputs'
inputFieldOrder:
- userIdOrLogin
- groupIdOrName
output: '#/$defs/AddUserToGroupOutputs'
source: okta
title: Add user to group
---

Adds a user to a group of OKTA_GROUP type.

{{< workflows >}}
