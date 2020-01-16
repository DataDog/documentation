---
title: Add a user to a role
type: apicontent
order: 37.10
external_redirect: /api/#add-user-to-role
---

## Add a user to a role

Adds a user to a role.

#### REQUIRED PAYLOAD:

`data["type"]="users"`<br>
`data["id"]=$USER_UUID`

**Note:** Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
