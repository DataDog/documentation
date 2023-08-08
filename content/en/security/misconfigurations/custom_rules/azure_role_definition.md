---
dependencies: []
disable_edit: true
---
# azure_role_definition

## `assignable_scopes`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.assignableScopes`<br>
**Description**: Role definition assignable scopes.<br>
## `created_by`
**Type**: `STRING`<br>
**Provider name**: `properties.createdBy`<br>
**Description**: Id of the user who created the assignment<br>
## `created_on`
**Type**: `STRING`<br>
**Provider name**: `properties.createdOn`<br>
**Description**: Time it was created<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `properties.description`<br>
**Description**: The role definition description.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: The role definition ID.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The role definition name.<br>
## `permissions`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.permissions`<br>
**Description**: Role definition permissions.<br>
   - `actions`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `actions`<br>
    **Description**: Allowed actions.<br>
   - `not_actions`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `notActions`<br>
    **Description**: Denied actions.<br>
## `properties_type`
**Type**: `STRING`<br>
**Provider name**: `properties.type`<br>
**Description**: The role type.<br>
## `resource_group`
**Type**: `STRING`<br>
## `role_name`
**Type**: `STRING`<br>
**Provider name**: `properties.roleName`<br>
**Description**: The role name.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The role definition type.<br>
## `updated_by`
**Type**: `STRING`<br>
**Provider name**: `properties.updatedBy`<br>
**Description**: Id of the user who updated the assignment<br>
## `updated_on`
**Type**: `STRING`<br>
**Provider name**: `properties.updatedOn`<br>
**Description**: Time it was updated<br>
