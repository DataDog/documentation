---
dependencies: []
disable_edit: true
---
# azure_policy_assignment

## `description`
**Type**: `STRING`<br>
**Provider name**: `properties.description`<br>
**Description**: This message will be part of response in case of policy violation.<br>
## `display_name`
**Type**: `STRING`<br>
**Provider name**: `properties.displayName`<br>
**Description**: The display name of the policy assignment.<br>
## `enforcement_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.enforcementMode`<br>
**Description**: The policy assignment enforcement mode. Possible values are Default and DoNotEnforce.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: The ID of the policy assignment.<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
**Description**: The managed identity associated with the policy assignment.<br>
   - `principal_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalId`<br>
    **Description**: The principal ID of the resource identity.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: The tenant ID of the resource identity.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The identity type. This is the only required field when adding a system assigned identity to a resource.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The location of the policy assignment. Only required when utilizing managed identity.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the policy assignment.<br>
## `not_scopes`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `properties.notScopes`<br>
**Description**: The policy's excluded scopes.<br>
## `parameters`
**Type**: `MAP_STRING_STRING`<br>
**Provider name**: `properties.parameters`<br>
**Description**: The parameter values for the assigned policy rule. The keys are the parameter names.<br>
## `policy_definition_id`
**Type**: `STRING`<br>
**Provider name**: `properties.policyDefinitionId`<br>
**Description**: The ID of the policy definition or policy set definition being assigned.<br>
## `resource_group`
**Type**: `STRING`<br>
## `scope`
**Type**: `STRING`<br>
**Provider name**: `properties.scope`<br>
**Description**: The scope for the policy assignment.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The type of the policy assignment.<br>
