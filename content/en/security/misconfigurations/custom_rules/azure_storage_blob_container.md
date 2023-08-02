---
dependencies: []
disable_edit: true
---
# azure_storage_blob_container

## `default_encryption_scope`
**Type**: `STRING`<br>
**Provider name**: `properties.defaultEncryptionScope`<br>
**Description**: Default the container to use specified encryption scope for all writes.<br>
## `deleted`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.deleted`<br>
**Description**: Indicates whether the blob container was deleted.<br>
## `deleted_time`
**Type**: `STRING`<br>
**Provider name**: `properties.deletedTime`<br>
**Description**: Blob container deletion time.<br>
## `deny_encryption_scope_override`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.denyEncryptionScopeOverride`<br>
**Description**: Block override of encryption scope from the container default.<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: Resource Etag.<br>
## `has_immutability_policy`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.hasImmutabilityPolicy`<br>
**Description**: The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container.<br>
## `has_legal_hold`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.hasLegalHold`<br>
**Description**: The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `last_modified_time`
**Type**: `STRING`<br>
**Provider name**: `properties.lastModifiedTime`<br>
**Description**: Returns the date and time the container was last modified.<br>
## `lease_duration`
**Type**: `STRING`<br>
**Provider name**: `properties.leaseDuration`<br>
**Description**: Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased.<br>
## `lease_state`
**Type**: `STRING`<br>
**Provider name**: `properties.leaseState`<br>
**Description**: Lease state of the container.<br>
## `lease_status`
**Type**: `STRING`<br>
**Provider name**: `properties.leaseStatus`<br>
**Description**: The lease status of the container.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `public_access`
**Type**: `STRING`<br>
**Provider name**: `properties.publicAccess`<br>
**Description**: Specifies whether data in the container may be accessed publicly and the level of access.<br>
## `remaining_retention_days`
**Type**: `INT64`<br>
**Provider name**: `properties.remainingRetentionDays`<br>
**Description**: Remaining retention days for soft deleted blob container.<br>
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
**Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `version`
**Type**: `STRING`<br>
**Provider name**: `properties.version`<br>
**Description**: The version of the deleted blob container.<br>
