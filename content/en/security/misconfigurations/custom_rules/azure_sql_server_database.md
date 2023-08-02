---
dependencies: []
disable_edit: true
---
# azure_sql_server_database

## `auto_pause_delay`
**Type**: `INT64`<br>
**Provider name**: `properties.autoPauseDelay`<br>
**Description**: Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled<br>
## `catalog_collation`
**Type**: `STRING`<br>
**Provider name**: `properties.catalogCollation`<br>
**Description**: Collation of the metadata catalog.<br>
## `collation`
**Type**: `STRING`<br>
**Provider name**: `properties.collation`<br>
**Description**: The collation of the database.<br>
## `create_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.createMode`<br>
**Description**: Specifies the mode of database creation.Default: regular database creation.Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.<br>
## `creation_date`
**Type**: `STRING`<br>
**Provider name**: `properties.creationDate`<br>
**Description**: The creation date of the database (ISO8601 format).<br>
## `current_service_objective_name`
**Type**: `STRING`<br>
**Provider name**: `properties.currentServiceObjectiveName`<br>
**Description**: The current service level objective name of the database.<br>
## `current_sku`
**Type**: `STRUCT`<br>
**Provider name**: `properties.currentSku`<br>
**Description**: The name and tier of the SKU.<br>
   - `capacity`<br>
    **Type**: `INT32`<br>
    **Provider name**: `capacity`<br>
    **Description**: Capacity of the particular SKU.<br>
   - `family`<br>
    **Type**: `STRING`<br>
    **Provider name**: `family`<br>
    **Description**: If the service has different generations of hardware, for the same SKU, then that can be captured here.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the SKU, typically, a letter + Number code, e.g. P3.<br>
   - `size`<br>
    **Type**: `STRING`<br>
    **Provider name**: `size`<br>
    **Description**: Size of the particular SKU<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The tier or edition of the particular SKU, e.g. Basic, Premium.<br>
## `database_id`
**Type**: `STRING`<br>
**Provider name**: `properties.databaseId`<br>
**Description**: The ID of the database.<br>
## `default_secondary_location`
**Type**: `STRING`<br>
**Provider name**: `properties.defaultSecondaryLocation`<br>
**Description**: The default secondary region for this database.<br>
## `earliest_restore_date`
**Type**: `STRING`<br>
**Provider name**: `properties.earliestRestoreDate`<br>
**Description**: This records the earliest start date and time that restore is available for this database (ISO8601 format).<br>
## `elastic_pool_id`
**Type**: `STRING`<br>
**Provider name**: `properties.elasticPoolId`<br>
**Description**: The resource identifier of the elastic pool containing this database.<br>
## `failover_group_id`
**Type**: `STRING`<br>
**Provider name**: `properties.failoverGroupId`<br>
**Description**: Failover Group resource identifier that this database belongs to.<br>
## `high_availability_replica_count`
**Type**: `INT32`<br>
**Provider name**: `properties.highAvailabilityReplicaCount`<br>
**Description**: The number of secondary replicas associated with the database that are used to provide high availability.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource ID.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: Kind of database. This is metadata used for the Azure portal experience.<br>
## `license_type`
**Type**: `STRING`<br>
**Provider name**: `properties.licenseType`<br>
**Description**: The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location.<br>
## `long_term_retention_backup_resource_id`
**Type**: `STRING`<br>
**Provider name**: `properties.longTermRetentionBackupResourceId`<br>
**Description**: The resource identifier of the long term retention backup associated with create operation of this database.<br>
## `maintenance_configuration_id`
**Type**: `STRING`<br>
**Provider name**: `properties.maintenanceConfigurationId`<br>
**Description**: Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur.<br>
## `managed_by`
**Type**: `STRING`<br>
**Provider name**: `managedBy`<br>
**Description**: Resource that manages the database.<br>
## `max_log_size_bytes`
**Type**: `INT64`<br>
**Provider name**: `properties.maxLogSizeBytes`<br>
**Description**: The max log size for this database.<br>
## `max_size_bytes`
**Type**: `INT64`<br>
**Provider name**: `properties.maxSizeBytes`<br>
**Description**: The max size of the database expressed in bytes.<br>
## `min_capacity`
**Type**: `DOUBLE`<br>
**Provider name**: `properties.minCapacity`<br>
**Description**: Minimal capacity that database will always have allocated, if not paused<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name.<br>
## `paused_date`
**Type**: `STRING`<br>
**Provider name**: `properties.pausedDate`<br>
**Description**: The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready.<br>
## `read_scale`
**Type**: `STRING`<br>
**Provider name**: `properties.readScale`<br>
**Description**: The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region.<br>
## `recoverable_database_id`
**Type**: `STRING`<br>
**Provider name**: `properties.recoverableDatabaseId`<br>
**Description**: The resource identifier of the recoverable database associated with create operation of this database.<br>
## `recovery_services_recovery_point_id`
**Type**: `STRING`<br>
**Provider name**: `properties.recoveryServicesRecoveryPointId`<br>
**Description**: The resource identifier of the recovery point associated with create operation of this database.<br>
## `requested_service_objective_name`
**Type**: `STRING`<br>
**Provider name**: `properties.requestedServiceObjectiveName`<br>
**Description**: The requested service level objective name of the database.<br>
## `resource_group`
**Type**: `STRING`<br>
## `restorable_dropped_database_id`
**Type**: `STRING`<br>
**Provider name**: `properties.restorableDroppedDatabaseId`<br>
**Description**: The resource identifier of the restorable dropped database associated with create operation of this database.<br>
## `restore_point_in_time`
**Type**: `STRING`<br>
**Provider name**: `properties.restorePointInTime`<br>
**Description**: Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.<br>
## `resumed_date`
**Type**: `STRING`<br>
**Provider name**: `properties.resumedDate`<br>
**Description**: The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused.<br>
## `sample_name`
**Type**: `STRING`<br>
**Provider name**: `properties.sampleName`<br>
**Description**: The name of the sample schema to apply when creating this database.<br>
## `secondary_type`
**Type**: `STRING`<br>
**Provider name**: `properties.secondaryType`<br>
**Description**: The secondary type of the database if it is a secondary.  Valid values are Geo and Named.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
**Description**: The database SKU.The list of SKUs may vary by region and support offer. To determine the SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or one of the following commands:```azurecliaz sql db list-editions -l <location> -o table```````powershellGet-AzSqlServerServiceObjective -Location <location>````<br>
   - `capacity`<br>
    **Type**: `INT32`<br>
    **Provider name**: `capacity`<br>
    **Description**: Capacity of the particular SKU.<br>
   - `family`<br>
    **Type**: `STRING`<br>
    **Provider name**: `family`<br>
    **Description**: If the service has different generations of hardware, for the same SKU, then that can be captured here.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the SKU, typically, a letter + Number code, e.g. P3.<br>
   - `size`<br>
    **Type**: `STRING`<br>
    **Provider name**: `size`<br>
    **Description**: Size of the particular SKU<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The tier or edition of the particular SKU, e.g. Basic, Premium.<br>
## `source_database_deletion_date`
**Type**: `STRING`<br>
**Provider name**: `properties.sourceDatabaseDeletionDate`<br>
**Description**: Specifies the time that the database was deleted.<br>
## `source_database_id`
**Type**: `STRING`<br>
**Provider name**: `properties.sourceDatabaseId`<br>
**Description**: The resource identifier of the source database associated with create operation of this database.<br>
## `status`
**Type**: `STRING`<br>
**Provider name**: `properties.status`<br>
**Description**: The status of the database.<br>
## `storage_account_type`
**Type**: `STRING`<br>
**Provider name**: `properties.storageAccountType`<br>
**Description**: The storage account type used to store backups for this database.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `transparent_data_encryption`
**Type**: `STRUCT`<br>
**Provider name**: `LogicalDatabaseTransparentDataEncryption`<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.state`<br>
    **Description**: Specifies the state of the transparent data encryption.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type.<br>
## `zone_redundant`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.zoneRedundant`<br>
**Description**: Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones.<br>
