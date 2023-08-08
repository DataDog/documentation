---
dependencies: []
disable_edit: true
---
# azure_mysql_flexible_server_configuration

## `allowed_values`
**Type**: `STRING`<br>
**Provider name**: `properties.allowedValues`<br>
**Description**: Allowed values of the configuration.<br>
## `data_type`
**Type**: `STRING`<br>
**Provider name**: `properties.dataType`<br>
**Description**: Data type of the configuration.<br>
## `default_value`
**Type**: `STRING`<br>
**Provider name**: `properties.defaultValue`<br>
**Description**: Default value of the configuration.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `properties.description`<br>
**Description**: Description of the configuration.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `is_config_pending_restart`
**Type**: `STRING`<br>
**Provider name**: `properties.isConfigPendingRestart`<br>
**Description**: If is the configuration pending restart or not.<br>
## `is_dynamic_config`
**Type**: `STRING`<br>
**Provider name**: `properties.isDynamicConfig`<br>
**Description**: If is the configuration dynamic.<br>
## `is_read_only`
**Type**: `STRING`<br>
**Provider name**: `properties.isReadOnly`<br>
**Description**: If is the configuration read only.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `resource_group`
**Type**: `STRING`<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `system_data`
**Type**: `STRUCT`<br>
**Provider name**: `systemData`<br>
**Description**: The system metadata relating to this resource.<br>
   - `created_at`<br>
    **Type**: `STRING`<br>
    **Provider name**: `createdAt`<br>
    **Description**: The timestamp of resource creation (UTC).<br>
   - `created_by`<br>
    **Type**: `STRING`<br>
    **Provider name**: `createdBy`<br>
    **Description**: The identity that created the resource.<br>
   - `created_by_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `createdByType`<br>
    **Description**: The type of identity that created the resource.<br>
   - `last_modified_at`<br>
    **Type**: `STRING`<br>
    **Provider name**: `lastModifiedAt`<br>
    **Description**: The timestamp of resource last modification (UTC)<br>
   - `last_modified_by`<br>
    **Type**: `STRING`<br>
    **Provider name**: `lastModifiedBy`<br>
    **Description**: The identity that last modified the resource.<br>
   - `last_modified_by_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `lastModifiedByType`<br>
    **Description**: The type of identity that last modified the resource.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `value`
**Type**: `STRING`<br>
**Provider name**: `properties.value`<br>
**Description**: Value of the configuration.<br>
