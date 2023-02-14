---
dependencies: []
disable_edit: true
---
# azure_mysql_flexible_server_configuration

## `allowed_values`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.allowedValues`<br>
**説明**: 構成で許容される値。<br>
## `data_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.dataType`<br>
**説明**: 構成のデータタイプ。<br>
## `default_value`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.defaultValue`<br>
**説明**: 構成のデフォルト値。<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.description`<br>
**説明**: 構成についての説明。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `is_config_pending_restart`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.isConfigPendingRestart`<br>
**説明**: 構成が再起動待ちかどうか。<br>
## `is_dynamic_config`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.isDynamicConfig`<br>
**説明**: 構成が動的かどうか。<br>
## `is_read_only`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.isReadOnly`<br>
**説明**: 構成が読み取り専用かどうか。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースの名前<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `system_data`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `systemData`<br>
**説明**: このリソースに関連するシステムメタデータ。<br>
   - `created_at`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `createdAt`<br>
    **Description**: The timestamp of resource creation (UTC).<br>
   - `created_by`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `createdBy`<br>
    **Description**: The identity that created the resource.<br>
   - `created_by_type`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `createdByType`<br>
    **Description**: The type of identity that created the resource.<br>
   - `last_modified_at`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `lastModifiedAt`<br>
    **Description**: The timestamp of resource last modification (UTC)<br>
   - `last_modified_by`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `lastModifiedBy`<br>
    **Description**: The identity that last modified the resource.<br>
   - `last_modified_by_type`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `lastModifiedByType`<br>
    **Description**: The type of identity that last modified the resource.<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `value`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.value`<br>
**説明**: 構成の値。<br>