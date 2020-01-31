---
title: Revoke permission
type: apicontent
order: 37.09
external_redirect: /api/#revoke-permission
---

## Revoke permission

Removes a permission from a role.

#### REQUIRED PAYLOAD:

* `data["type"]="permissions"`
* `data["id"]=` The permission UUID to remove from the role.

**Note:** See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

