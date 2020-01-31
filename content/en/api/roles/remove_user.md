---
title: Remove a user from a role
type: apicontent
order: 37.11
external_redirect: /api/#remove-user
---

## Remove a user from a role

Removes a user from a role.

**PAYLOAD**:

* `data["type"]="users"`
* `data["id"]`: The user UUID to remove from a Role.

**Note:** See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

