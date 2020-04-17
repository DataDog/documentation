---
title: Assign permission to a role
type: apicontent
order: 37.08
external_redirect: /api/#assign-permissions-to-a-role
---

## Assign permission to a role

Assigns a permission to a role.

To assign "scoped" permissions for logs, use the [Roles v1 API][1].

**PAYLOAD**:

* `data["type"]="permissions"`
* `data["id"]`: The permission ID to add to the role.

[1]: /account_management/rbac/permissions/?tab=api#logs-write-pipelines
