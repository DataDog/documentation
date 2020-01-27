---
title: Grant permission
type: apicontent
order: 37.08
external_redirect: /api/#grant-permission
---

## Grant permission

Adds a permission to a role.

#### Required payload

`data["type"]="permissions"`<br>
`data["id"]=$PERMISSION_UUID`

**Note:** Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
