---
title: Update role
type: apicontent
order: 37.04
external_redirect: /api/#update-role
---

## Update role

Updates an existing role's name. Returns role name and UUID.

**PAYLOAD**:

* `type="roles"`
* `id`: The Role UUID to update
* `attributes["name"]`: The Role name to update.

**Note:** See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

