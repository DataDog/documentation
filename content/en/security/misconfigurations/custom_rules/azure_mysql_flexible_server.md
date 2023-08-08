---
dependencies: []
disable_edit: true
---
# azure_mysql_flexible_server

## `administrator_login`
**Type**: `STRING`<br>
**Provider name**: `properties.administratorLogin`<br>
**Description**: The administrator's login name of a server. Can only be specified when the server is being created (and is required for creation).<br>
## `administrator_login_password`
**Type**: `STRING`<br>
**Provider name**: `properties.administratorLoginPassword`<br>
**Description**: The password of the administrator login (required for server creation).<br>
## `availability_zone`
**Type**: `STRING`<br>
**Provider name**: `properties.availabilityZone`<br>
**Description**: availability Zone information of the server.<br>
## `backup`
**Type**: `STRUCT`<br>
**Provider name**: `properties.backup`<br>
**Description**: Backup related properties of a server.<br>
   - `backup_retention_days`<br>
    **Type**: `INT32`<br>
    **Provider name**: `backupRetentionDays`<br>
    **Description**: Backup retention days for the server.<br>
   - `earliest_restore_date`<br>
    **Type**: `STRING`<br>
    **Provider name**: `earliestRestoreDate`<br>
    **Description**: Earliest restore point creation time (ISO8601 format)<br>
   - `geo_redundant_backup`<br>
    **Type**: `STRING`<br>
    **Provider name**: `geoRedundantBackup`<br>
    **Description**: Whether or not geo redundant backup is enabled.<br>
## `create_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.createMode`<br>
**Description**: The mode to create a new MySQL server.<br>
## `data_encryption`
**Type**: `STRUCT`<br>
**Provider name**: `properties.dataEncryption`<br>
**Description**: The Data Encryption for CMK.<br>
   - `geo_backup_key_uri`<br>
    **Type**: `STRING`<br>
    **Provider name**: `geoBackupKeyURI`<br>
    **Description**: Geo backup key uri as key vault can't cross region, need cmk in same region as geo backup<br>
   - `geo_backup_user_assigned_identity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `geoBackupUserAssignedIdentityId`<br>
    **Description**: Geo backup user identity resource id as identity can't cross region, need identity in same region as geo backup<br>
   - `primary_key_uri`<br>
    **Type**: `STRING`<br>
    **Provider name**: `primaryKeyURI`<br>
    **Description**: Primary key uri<br>
   - `primary_user_assigned_identity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `primaryUserAssignedIdentityId`<br>
    **Description**: Primary user identity resource id<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The key type, AzureKeyVault for enable cmk, SystemManaged for disable cmk.<br>
## `fully_qualified_domain_name`
**Type**: `STRING`<br>
**Provider name**: `properties.fullyQualifiedDomainName`<br>
**Description**: The fully qualified domain name of a server.<br>
## `high_availability`
**Type**: `STRUCT`<br>
**Provider name**: `properties.highAvailability`<br>
**Description**: High availability related properties of a server.<br>
   - `mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `mode`<br>
    **Description**: High availability mode for a server.<br>
   - `standby_availability_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `standbyAvailabilityZone`<br>
    **Description**: Availability zone of the standby server.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: The state of server high availability.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
**Description**: The cmk identity for the server.<br>
   - `principal_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalId`<br>
    **Description**: ObjectId from the KeyVault<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: TenantId from the KeyVault<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Type of managed service identity.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The geo-location where the resource lives<br>
## `maintenance_window`
**Type**: `STRUCT`<br>
**Provider name**: `properties.maintenanceWindow`<br>
**Description**: Maintenance window of a server.<br>
   - `custom_window`<br>
    **Type**: `STRING`<br>
    **Provider name**: `customWindow`<br>
    **Description**: indicates whether custom window is enabled or disabled<br>
   - `day_of_week`<br>
    **Type**: `INT32`<br>
    **Provider name**: `dayOfWeek`<br>
    **Description**: day of week for maintenance window<br>
   - `start_hour`<br>
    **Type**: `INT32`<br>
    **Provider name**: `startHour`<br>
    **Description**: start hour for maintenance window<br>
   - `start_minute`<br>
    **Type**: `INT32`<br>
    **Provider name**: `startMinute`<br>
    **Description**: start minute for maintenance window<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `network`
**Type**: `STRUCT`<br>
**Provider name**: `properties.network`<br>
**Description**: Network related properties of a server.<br>
   - `delegated_subnet_resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `delegatedSubnetResourceId`<br>
    **Description**: Delegated subnet resource id used to setup vnet for a server.<br>
   - `private_dns_zone_resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `privateDnsZoneResourceId`<br>
    **Description**: Private DNS zone resource id.<br>
   - `public_network_access`<br>
    **Type**: `STRING`<br>
    **Provider name**: `publicNetworkAccess`<br>
    **Description**: Whether or not public network access is allowed for this server. Value is 'Disabled' when server has VNet integration.<br>
## `replica_capacity`
**Type**: `INT32`<br>
**Provider name**: `properties.replicaCapacity`<br>
**Description**: The maximum number of replicas that a primary server can have.<br>
## `replication_role`
**Type**: `STRING`<br>
**Provider name**: `properties.replicationRole`<br>
**Description**: The replication role.<br>
## `resource_group`
**Type**: `STRING`<br>
## `restore_point_in_time`
**Type**: `STRING`<br>
**Provider name**: `properties.restorePointInTime`<br>
**Description**: Restore point creation time (ISO8601 format), specifying the time to restore from.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
**Description**: The SKU (pricing tier) of the server.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the sku, e.g. Standard_D32s_v3.<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The tier of the particular SKU, e.g. GeneralPurpose.<br>
## `source_server_resource_id`
**Type**: `STRING`<br>
**Provider name**: `properties.sourceServerResourceId`<br>
**Description**: The source MySQL server id.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `properties.state`<br>
**Description**: The state of a server.<br>
## `storage`
**Type**: `STRUCT`<br>
**Provider name**: `properties.storage`<br>
**Description**: Storage related properties of a server.<br>
   - `auto_grow`<br>
    **Type**: `STRING`<br>
    **Provider name**: `autoGrow`<br>
    **Description**: Enable Storage Auto Grow or not.<br>
   - `iops`<br>
    **Type**: `INT32`<br>
    **Provider name**: `iops`<br>
    **Description**: Storage IOPS for a server.<br>
   - `storage_size_gb`<br>
    **Type**: `INT32`<br>
    **Provider name**: `storageSizeGB`<br>
    **Description**: Max storage size allowed for a server.<br>
   - `storage_sku`<br>
    **Type**: `STRING`<br>
    **Provider name**: `storageSku`<br>
    **Description**: The sku name of the server storage.<br>
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
## `version`
**Type**: `STRING`<br>
**Provider name**: `properties.version`<br>
**Description**: Server version.<br>
