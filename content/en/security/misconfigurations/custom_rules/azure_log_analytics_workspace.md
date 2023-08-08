---
dependencies: []
disable_edit: true
---
# azure_log_analytics_workspace

## `created_date`
**Type**: `STRING`<br>
**Provider name**: `properties.createdDate`<br>
**Description**: Workspace creation date.<br>
## `customer_id`
**Type**: `STRING`<br>
**Provider name**: `properties.customerId`<br>
**Description**: This is a read-only property. Represents the ID associated with the workspace.<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: The etag of the workspace.<br>
## `features`
**Type**: `STRUCT`<br>
**Provider name**: `properties.features`<br>
**Description**: Workspace features.<br>
   - `cluster_resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `clusterResourceId`<br>
    **Description**: Dedicated LA cluster resourceId that is linked to the workspaces.<br>
   - `disable_local_auth`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `disableLocalAuth`<br>
    **Description**: Disable Non-AAD based Auth.<br>
   - `enable_data_export`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enableDataExport`<br>
    **Description**: Flag that indicate if data should be exported.<br>
   - `enable_log_access_using_only_resource_permissions`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enableLogAccessUsingOnlyResourcePermissions`<br>
    **Description**: Flag that indicate which permission to use - resource or workspace or both.<br>
   - `immediate_purge_data_on30_days`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `immediatePurgeDataOn30Days`<br>
    **Description**: Flag that describes if we want to remove the data after 30 days.<br>
## `force_cmk_for_query`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.forceCmkForQuery`<br>
**Description**: Indicates whether customer managed storage is mandatory for query management.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The geo-location where the resource lives<br>
## `modified_date`
**Type**: `STRING`<br>
**Provider name**: `properties.modifiedDate`<br>
**Description**: Workspace modification date.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `private_link_scoped_resources`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.privateLinkScopedResources`<br>
**Description**: List of linked private link scope resources.<br>
   - `resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `resourceId`<br>
    **Description**: The full resource Id of the private link scope resource.<br>
   - `scope_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `scopeId`<br>
    **Description**: The private link scope unique Identifier.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: The provisioning state of the workspace.<br>
## `public_network_access_for_ingestion`
**Type**: `STRING`<br>
**Provider name**: `properties.publicNetworkAccessForIngestion`<br>
**Description**: The network access type for accessing Log Analytics ingestion.<br>
## `public_network_access_for_query`
**Type**: `STRING`<br>
**Provider name**: `properties.publicNetworkAccessForQuery`<br>
**Description**: The network access type for accessing Log Analytics query.<br>
## `resource_group`
**Type**: `STRING`<br>
## `retention_in_days`
**Type**: `INT32`<br>
**Provider name**: `properties.retentionInDays`<br>
**Description**: The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `properties.sku`<br>
**Description**: The SKU of the workspace.<br>
   - `capacity_reservation_level`<br>
    **Type**: `INT32`<br>
    **Provider name**: `capacityReservationLevel`<br>
    **Description**: The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected.<br>
   - `last_sku_update`<br>
    **Type**: `STRING`<br>
    **Provider name**: `lastSkuUpdate`<br>
    **Description**: The last time when the sku was updated.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the SKU.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `workspace_capping`
**Type**: `STRUCT`<br>
**Provider name**: `properties.workspaceCapping`<br>
**Description**: The daily volume cap for ingestion.<br>
   - `daily_quota_gb`<br>
    **Type**: `DOUBLE`<br>
    **Provider name**: `dailyQuotaGb`<br>
    **Description**: The workspace daily quota for ingestion.<br>
   - `data_ingestion_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dataIngestionStatus`<br>
    **Description**: The status of data ingestion for this workspace.<br>
   - `quota_next_reset_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `quotaNextResetTime`<br>
    **Description**: The time when the quota will be rest.<br>
