---
dependencies: []
disable_edit: true
---
# azure_network_watcher

## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: A unique read-only string that changes whenever the resource is updated.<br>
## `flow_logs`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `FlowLog`<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.enabled`<br>
    **Description**: Flag to enable/disable flow logging.<br>
   - `etag`<br>
    **Type**: `STRING`<br>
    **Provider name**: `etag`<br>
    **Description**: A unique read-only string that changes whenever the resource is updated.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `provisioning_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.provisioningState`<br>
    **Description**: The provisioning state of the flow log.<br>
   - `retention_policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.retentionPolicy`<br>
    **Description**: Parameters that define the retention policy for flow log.<br>
       - `days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `days`<br>
        **Description**: Number of days to retain flow log records.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Flag to enable/disable retention.<br>
   - `storage_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageId`<br>
    **Description**: ID of the storage account which is used to store the flow log.<br>
   - `target_resource_guid`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.targetResourceGuid`<br>
    **Description**: Guid of network security group to which flow log will be applied.<br>
   - `target_resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.targetResourceId`<br>
    **Description**: ID of network security group to which flow log will be applied.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource ID.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: The provisioning state of the network watcher resource.<br>
## `resource_group`
**Type**: `STRING`<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type.<br>
