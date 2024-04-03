---
bundle: com.datadoghq.okta
bundle_title: Okta
description: Creates a new user in your Okta organization with or without credentials.
icon:
  integration_id: okta
  type: integration_logo
input: '#/$defs/CreateUserInputs'
inputFieldOrder:
- profile
- activate
- credentials
- groupIds
- requirePasswordChange
output: '#/$defs/CreateUserOutputs'
source: okta
title: Create user
---

Creates a new user in your Okta organization with or without credentials.

{{< workflows >}}
