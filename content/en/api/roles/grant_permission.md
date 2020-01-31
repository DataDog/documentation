---
title: Grant permission
type: apicontent
order: 37.08
external_redirect: /api/#grant-permission
---

## Grant permission

Adds a permission to a role.

**PAYLOAD**:

* `data["type"]="permissions"`
* `data["id"]`: The permission id to add to the role.

**Note:** See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

