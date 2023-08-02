---
dependencies: []
disable_edit: true
---
# aws_rds_db_snapshot

## `account_id`
**Type**: `STRING`<br>
## `allocated_storage`
**Type**: `INT32`<br>
**Provider name**: `AllocatedStorage`<br>
**Description**: Specifies the allocated storage size in gibibytes (GiB).<br>
## `availability_zone`
**Type**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**Description**: Specifies the name of the Availability Zone the DB instance was located in at the time of the DB snapshot.<br>
## `db_instance_identifier`
**Type**: `STRING`<br>
**Provider name**: `DBInstanceIdentifier`<br>
**Description**: Specifies the DB instance identifier of the DB instance this DB snapshot was created from.<br>
## `db_snapshot_arn`
**Type**: `STRING`<br>
**Provider name**: `DBSnapshotArn`<br>
**Description**: The Amazon Resource Name (ARN) for the DB snapshot.<br>
## `db_snapshot_attributes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DBSnapshotAttributes`<br>
**Description**: The list of attributes and values for the manual DB snapshot.<br>
   - `attribute_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AttributeName`<br>
    **Description**: The name of the manual DB snapshot attribute. The attribute named <code>restore</code> refers to the list of Amazon Web Services accounts that have permission to copy or restore the manual DB cluster snapshot. For more information, see the <code>ModifyDBSnapshotAttribute</code> API action.<br>
   - `attribute_values`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `AttributeValues`<br>
    **Description**: The value or values for the manual DB snapshot attribute. If the <code>AttributeName</code> field is set to <code>restore</code>, then this element returns a list of IDs of the Amazon Web Services accounts that are authorized to copy or restore the manual DB snapshot. If a value of <code>all</code> is in the list, then the manual DB snapshot is public and available for any Amazon Web Services account to copy or restore.<br>
## `db_snapshot_identifier`
**Type**: `STRING`<br>
**Provider name**: `DBSnapshotIdentifier`<br>
**Description**: The identifier of the manual DB snapshot that the attributes apply to.<br>
## `dbi_resource_id`
**Type**: `STRING`<br>
**Provider name**: `DbiResourceId`<br>
**Description**: The identifier for the source DB instance, which can't be changed and which is unique to an Amazon Web Services Region.<br>
## `encrypted`
**Type**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**Description**: Specifies whether the DB snapshot is encrypted.<br>
## `engine`
**Type**: `STRING`<br>
**Provider name**: `Engine`<br>
**Description**: Specifies the name of the database engine.<br>
## `engine_version`
**Type**: `STRING`<br>
**Provider name**: `EngineVersion`<br>
**Description**: Specifies the version of the database engine.<br>
## `iam_database_authentication_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `IAMDatabaseAuthenticationEnabled`<br>
**Description**: True if mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts is enabled, and otherwise false.<br>
## `instance_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `InstanceCreateTime`<br>
**Description**: Specifies the time in Coordinated Universal Time (UTC) when the DB instance, from which the snapshot was taken, was created.<br>
## `iops`
**Type**: `INT32`<br>
**Provider name**: `Iops`<br>
**Description**: Specifies the Provisioned IOPS (I/O operations per second) value of the DB instance at the time of the snapshot.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: If <code>Encrypted</code> is true, the Amazon Web Services KMS key identifier for the encrypted DB snapshot. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.<br>
## `license_model`
**Type**: `STRING`<br>
**Provider name**: `LicenseModel`<br>
**Description**: License model information for the restored DB instance.<br>
## `master_username`
**Type**: `STRING`<br>
**Provider name**: `MasterUsername`<br>
**Description**: Provides the master username for the DB snapshot.<br>
## `option_group_name`
**Type**: `STRING`<br>
**Provider name**: `OptionGroupName`<br>
**Description**: Provides the option group name for the DB snapshot.<br>
## `original_snapshot_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `OriginalSnapshotCreateTime`<br>
**Description**: Specifies the time of the CreateDBSnapshot operation in Coordinated Universal Time (UTC). Doesn't change when the snapshot is copied.<br>
## `percent_progress`
**Type**: `INT32`<br>
**Provider name**: `PercentProgress`<br>
**Description**: The percentage of the estimated data that has been transferred.<br>
## `port`
**Type**: `INT32`<br>
**Provider name**: `Port`<br>
**Description**: Specifies the port that the database engine was listening on at the time of the snapshot.<br>
## `processor_features`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ProcessorFeatures`<br>
**Description**: The number of CPU cores and the number of threads per core for the DB instance class of the DB instance when the DB snapshot was created.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: The name of the processor feature. Valid names are <code>coreCount</code> and <code>threadsPerCore</code>.<br>
   - `value`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Value`<br>
    **Description**: The value of a processor feature name.<br>
## `snapshot_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `SnapshotCreateTime`<br>
**Description**: Specifies when the snapshot was taken in Coordinated Universal Time (UTC). Changes for the copy when the snapshot is copied.<br>
## `snapshot_database_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `SnapshotDatabaseTime`<br>
**Description**: The timestamp of the most recent transaction applied to the database that you're backing up. Thus, if you restore a snapshot, SnapshotDatabaseTime is the most recent transaction in the restored DB instance. In contrast, originalSnapshotCreateTime specifies the system time that the snapshot completed. If you back up a read replica, you can determine the replica lag by comparing SnapshotDatabaseTime with originalSnapshotCreateTime. For example, if originalSnapshotCreateTime is two hours later than SnapshotDatabaseTime, then the replica lag is two hours.<br>
## `snapshot_target`
**Type**: `STRING`<br>
**Provider name**: `SnapshotTarget`<br>
**Description**: Specifies where manual snapshots are stored: Amazon Web Services Outposts or the Amazon Web Services Region.<br>
## `snapshot_type`
**Type**: `STRING`<br>
**Provider name**: `SnapshotType`<br>
**Description**: Provides the type of the DB snapshot.<br>
## `source_db_snapshot_identifier`
**Type**: `STRING`<br>
**Provider name**: `SourceDBSnapshotIdentifier`<br>
**Description**: The DB snapshot Amazon Resource Name (ARN) that the DB snapshot was copied from. It only has a value in the case of a cross-account or cross-Region copy.<br>
## `source_region`
**Type**: `STRING`<br>
**Provider name**: `SourceRegion`<br>
**Description**: The Amazon Web Services Region that the DB snapshot was created in or copied from.<br>
## `status`
**Type**: `STRING`<br>
**Provider name**: `Status`<br>
**Description**: Specifies the status of this DB snapshot.<br>
## `storage_throughput`
**Type**: `INT32`<br>
**Provider name**: `StorageThroughput`<br>
**Description**: Specifies the storage throughput for the DB snapshot.<br>
## `storage_type`
**Type**: `STRING`<br>
**Provider name**: `StorageType`<br>
**Description**: Specifies the storage type associated with DB snapshot.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tde_credential_arn`
**Type**: `STRING`<br>
**Provider name**: `TdeCredentialArn`<br>
**Description**: The ARN from the key store with which to associate the instance for TDE encryption.<br>
## `timezone`
**Type**: `STRING`<br>
**Provider name**: `Timezone`<br>
**Description**: The time zone of the DB snapshot. In most cases, the <code>Timezone</code> element is empty. <code>Timezone</code> content appears only for snapshots taken from Microsoft SQL Server DB instances that were created with a time zone specified.<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: Provides the VPC ID associated with the DB snapshot.<br>
