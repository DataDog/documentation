---
dependencies: []
disable_edit: true
---
# aws_dynamodb

## `account_id`
**Type**: `STRING`<br>
## `archival_summary`
**Type**: `STRUCT`<br>
**Provider name**: `ArchivalSummary`<br>
**Description**: Contains information about the table archive.<br>
   - `archival_backup_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ArchivalBackupArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the backup the table was archived to, when applicable in the archival reason. If you wish to restore this backup to the same table name, you will need to delete the original table.<br>
   - `archival_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `ArchivalDateTime`<br>
    **Description**: The date and time when table archival was initiated by DynamoDB, in UNIX epoch time format.<br>
   - `archival_reason`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ArchivalReason`<br>
    **Description**: The reason DynamoDB archived the table. Currently, the only possible value is: <ul> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS</code> - The table was archived due to the table's KMS key being inaccessible for more than seven days. An On-Demand backup was created at the archival time. </li> </ul>
## `attribute_definitions`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `AttributeDefinitions`<br>
**Description**: An array of <code>AttributeDefinition</code> objects. Each of these objects describes one attribute in the table and index key schema. Each <code>AttributeDefinition</code> object in this array is composed of:<br>
   - `attribute_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AttributeName`<br>
    **Description**: A name for the attribute.<br>
   - `attribute_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AttributeType`<br>
    **Description**: The data type for the attribute, where: <ul> <li>  <code>S</code> - the attribute is of type String </li> <li>  <code>N</code> - the attribute is of type Number </li> <li>  <code>B</code> - the attribute is of type Binary </li> </ul>
## `billing_mode_summary`
**Type**: `STRUCT`<br>
**Provider name**: `BillingModeSummary`<br>
**Description**: Contains the details for the read/write capacity mode.<br>
   - `billing_mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `BillingMode`<br>
    **Description**: Controls how you are charged for read and write throughput and how you manage capacity. This setting can be changed later. <ul> <li>  <code>PROVISIONED</code> - Sets the read/write capacity mode to <code>PROVISIONED</code>. We recommend using <code>PROVISIONED</code> for predictable workloads. </li> <li>  <code>PAY_PER_REQUEST</code> - Sets the read/write capacity mode to <code>PAY_PER_REQUEST</code>. We recommend using <code>PAY_PER_REQUEST</code> for unpredictable workloads.  </li> </ul>
   - `last_update_to_pay_per_request_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastUpdateToPayPerRequestDateTime`<br>
    **Description**: Represents the time when <code>PAY_PER_REQUEST</code> was last set as the read/write capacity mode.<br>
## `creation_date_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreationDateTime`<br>
**Description**: The date and time when the table was created, in <a href="http://www.epochconverter.com/">UNIX epoch time</a> format.<br>
## `global_secondary_indexes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `GlobalSecondaryIndexes`<br>
**Description**: The global secondary indexes, if any, on the table. Each index is scoped to a given partition key value. If the table is in the <code>DELETING</code> state, no information about indexes will be returned.<br>
   - `backfilling`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Backfilling`<br>
    **Description**: Indicates whether the index is currently backfilling. <i>Backfilling</i> is the process of reading items from the table and determining whether they can be added to the index. (Not all items will qualify: For example, a partition key cannot have any duplicate values.) If an item can be added to the index, DynamoDB will do so. After all items have been processed, the backfilling operation is complete and <code>Backfilling</code> is false. You can delete an index that is being created during the <code>Backfilling</code> phase when <code>IndexStatus</code> is set to CREATING and <code>Backfilling</code> is true. You can't delete the index that is being created when <code>IndexStatus</code> is set to CREATING and <code>Backfilling</code> is false.  <note> For indexes that were created during a <code>CreateTable</code> operation, the <code>Backfilling</code> attribute does not appear in the <code>DescribeTable</code> output. </note><br>
   - `index_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IndexArn`<br>
    **Description**: The Amazon Resource Name (ARN) that uniquely identifies the index.<br>
   - `index_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IndexName`<br>
    **Description**: The name of the global secondary index.<br>
   - `index_size_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `IndexSizeBytes`<br>
    **Description**: The total size of the specified index, in bytes. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
   - `index_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IndexStatus`<br>
    **Description**: The current state of the global secondary index: <ul> <li>  <code>CREATING</code> - The index is being created. </li> <li>  <code>UPDATING</code> - The index is being updated. </li> <li>  <code>DELETING</code> - The index is being deleted. </li> <li>  <code>ACTIVE</code> - The index is ready for use. </li> </ul>
   - `item_count`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ItemCount`<br>
    **Description**: The number of items in the specified index. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
   - `key_schema`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `KeySchema`<br>
    **Description**: The complete key schema for a global secondary index, which consists of one or more pairs of attribute names and key types: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note><br>
       - `attribute_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `AttributeName`<br>
        **Description**: The name of a key attribute.<br>
       - `key_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `KeyType`<br>
        **Description**: The role that this key attribute will assume: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note><br>
   - `projection`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Projection`<br>
    **Description**: Represents attributes that are copied (projected) from the table into the global secondary index. These are in addition to the primary key attributes and index key attributes, which are automatically projected.<br>
       - `non_key_attributes`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `NonKeyAttributes`<br>
        **Description**: Represents the non-key attribute names which will be projected into the index. For local secondary indexes, the total count of <code>NonKeyAttributes</code> summed across all of the local secondary indexes, must not exceed 100. If you project the same attribute into two different indexes, this counts as two distinct attributes when determining the total.<br>
       - `projection_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ProjectionType`<br>
        **Description**: The set of attributes that are projected into the index: <ul> <li>  <code>KEYS_ONLY</code> - Only the index and primary keys are projected into the index. </li> <li>  <code>INCLUDE</code> - In addition to the attributes described in <code>KEYS_ONLY</code>, the secondary index will include other non-key attributes that you specify. </li> <li>  <code>ALL</code> - All of the table attributes are projected into the index. </li> </ul>
   - `provisioned_throughput`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ProvisionedThroughput`<br>
    **Description**: Represents the provisioned throughput settings for the specified global secondary index. For current minimum and maximum provisioned throughput values, see <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">Service, Account, and Table Quotas</a> in the <i>Amazon DynamoDB Developer Guide</i>.<br>
       - `last_decrease_date_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `LastDecreaseDateTime`<br>
        **Description**: The date and time of the last provisioned throughput decrease for this table.<br>
       - `last_increase_date_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `LastIncreaseDateTime`<br>
        **Description**: The date and time of the last provisioned throughput increase for this table.<br>
       - `number_of_decreases_today`<br>
        **Type**: `INT64`<br>
        **Provider name**: `NumberOfDecreasesToday`<br>
        **Description**: The number of provisioned throughput decreases for this table during this UTC calendar day. For current maximums on provisioned throughput decreases, see <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">Service, Account, and Table Quotas</a> in the <i>Amazon DynamoDB Developer Guide</i>.<br>
       - `read_capacity_units`<br>
        **Type**: `INT64`<br>
        **Provider name**: `ReadCapacityUnits`<br>
        **Description**: The maximum number of strongly consistent reads consumed per second before DynamoDB returns a <code>ThrottlingException</code>. Eventually consistent reads require less effort than strongly consistent reads, so a setting of 50 <code>ReadCapacityUnits</code> per second provides 100 eventually consistent <code>ReadCapacityUnits</code> per second.<br>
       - `write_capacity_units`<br>
        **Type**: `INT64`<br>
        **Provider name**: `WriteCapacityUnits`<br>
        **Description**: The maximum number of writes consumed per second before DynamoDB returns a <code>ThrottlingException</code>.<br>
## `global_table_version`
**Type**: `STRING`<br>
**Provider name**: `GlobalTableVersion`<br>
**Description**: Represents the version of <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html">global tables</a> in use, if the table is replicated across Amazon Web Services Regions.<br>
## `item_count`
**Type**: `INT64`<br>
**Provider name**: `ItemCount`<br>
**Description**: The number of items in the specified table. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
## `key_schema`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `KeySchema`<br>
**Description**: The primary key structure for the table. Each <code>KeySchemaElement</code> consists of: <ul> <li>  <code>AttributeName</code> - The name of the attribute. </li> <li>  <code>KeyType</code> - The role of the attribute: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note> </li> </ul> For more information about primary keys, see <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModelPrimaryKey">Primary Key</a> in the <i>Amazon DynamoDB Developer Guide</i>.<br>
   - `attribute_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AttributeName`<br>
    **Description**: The name of a key attribute.<br>
   - `key_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KeyType`<br>
    **Description**: The role that this key attribute will assume: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note><br>
## `latest_stream_arn`
**Type**: `STRING`<br>
**Provider name**: `LatestStreamArn`<br>
**Description**: The Amazon Resource Name (ARN) that uniquely identifies the latest stream for this table.<br>
## `latest_stream_label`
**Type**: `STRING`<br>
**Provider name**: `LatestStreamLabel`<br>
**Description**: A timestamp, in ISO 8601 format, for this stream. Note that <code>LatestStreamLabel</code> is not a unique identifier for the stream, because it is possible that a stream from another table might have the same timestamp. However, the combination of the following three elements is guaranteed to be unique: <ul> <li> Amazon Web Services customer ID </li> <li> Table name </li> <li>  <code>StreamLabel</code>  </li> </ul>
## `local_secondary_indexes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `LocalSecondaryIndexes`<br>
**Description**: Represents one or more local secondary indexes on the table. Each index is scoped to a given partition key value. Tables with one or more local secondary indexes are subject to an item collection size limit, where the amount of data within a given item collection cannot exceed 10 GB. If the table is in the <code>DELETING</code> state, no information about indexes will be returned.<br>
   - `index_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IndexArn`<br>
    **Description**: The Amazon Resource Name (ARN) that uniquely identifies the index.<br>
   - `index_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IndexName`<br>
    **Description**: Represents the name of the local secondary index.<br>
   - `index_size_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `IndexSizeBytes`<br>
    **Description**: The total size of the specified index, in bytes. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
   - `item_count`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ItemCount`<br>
    **Description**: The number of items in the specified index. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
   - `key_schema`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `KeySchema`<br>
    **Description**: The complete key schema for the local secondary index, consisting of one or more pairs of attribute names and key types: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note><br>
       - `attribute_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `AttributeName`<br>
        **Description**: The name of a key attribute.<br>
       - `key_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `KeyType`<br>
        **Description**: The role that this key attribute will assume: <ul> <li>  <code>HASH</code> - partition key </li> <li>  <code>RANGE</code> - sort key </li> </ul> <note> The partition key of an item is also known as its <i>hash attribute</i>. The term "hash attribute" derives from DynamoDB's usage of an internal hash function to evenly distribute data items across partitions, based on their partition key values. The sort key of an item is also known as its <i>range attribute</i>. The term "range attribute" derives from the way DynamoDB stores items with the same partition key physically close together, in sorted order by the sort key value. </note><br>
   - `projection`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Projection`<br>
    **Description**: Represents attributes that are copied (projected) from the table into the global secondary index. These are in addition to the primary key attributes and index key attributes, which are automatically projected.<br>
       - `non_key_attributes`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `NonKeyAttributes`<br>
        **Description**: Represents the non-key attribute names which will be projected into the index. For local secondary indexes, the total count of <code>NonKeyAttributes</code> summed across all of the local secondary indexes, must not exceed 100. If you project the same attribute into two different indexes, this counts as two distinct attributes when determining the total.<br>
       - `projection_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ProjectionType`<br>
        **Description**: The set of attributes that are projected into the index: <ul> <li>  <code>KEYS_ONLY</code> - Only the index and primary keys are projected into the index. </li> <li>  <code>INCLUDE</code> - In addition to the attributes described in <code>KEYS_ONLY</code>, the secondary index will include other non-key attributes that you specify. </li> <li>  <code>ALL</code> - All of the table attributes are projected into the index. </li> </ul>
## `provisioned_throughput`
**Type**: `STRUCT`<br>
**Provider name**: `ProvisionedThroughput`<br>
**Description**: The provisioned throughput settings for the table, consisting of read and write capacity units, along with data about increases and decreases.<br>
   - `last_decrease_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastDecreaseDateTime`<br>
    **Description**: The date and time of the last provisioned throughput decrease for this table.<br>
   - `last_increase_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastIncreaseDateTime`<br>
    **Description**: The date and time of the last provisioned throughput increase for this table.<br>
   - `number_of_decreases_today`<br>
    **Type**: `INT64`<br>
    **Provider name**: `NumberOfDecreasesToday`<br>
    **Description**: The number of provisioned throughput decreases for this table during this UTC calendar day. For current maximums on provisioned throughput decreases, see <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">Service, Account, and Table Quotas</a> in the <i>Amazon DynamoDB Developer Guide</i>.<br>
   - `read_capacity_units`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ReadCapacityUnits`<br>
    **Description**: The maximum number of strongly consistent reads consumed per second before DynamoDB returns a <code>ThrottlingException</code>. Eventually consistent reads require less effort than strongly consistent reads, so a setting of 50 <code>ReadCapacityUnits</code> per second provides 100 eventually consistent <code>ReadCapacityUnits</code> per second.<br>
   - `write_capacity_units`<br>
    **Type**: `INT64`<br>
    **Provider name**: `WriteCapacityUnits`<br>
    **Description**: The maximum number of writes consumed per second before DynamoDB returns a <code>ThrottlingException</code>.<br>
## `replicas`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Replicas`<br>
**Description**: Represents replicas of the table.<br>
   - `global_secondary_indexes`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `GlobalSecondaryIndexes`<br>
    **Description**: Replica-specific global secondary index settings.<br>
       - `index_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `IndexName`<br>
        **Description**: The name of the global secondary index.<br>
       - `provisioned_throughput_override`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `ProvisionedThroughputOverride`<br>
        **Description**: If not described, uses the source table GSI's read capacity settings.<br>
           - `read_capacity_units`<br>
            **Type**: `INT64`<br>
            **Provider name**: `ReadCapacityUnits`<br>
            **Description**: Replica-specific read capacity units. If not specified, uses the source table's read capacity settings.<br>
   - `kms_master_key_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KMSMasterKeyId`<br>
    **Description**: The KMS key of the replica that will be used for KMS encryption.<br>
   - `provisioned_throughput_override`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ProvisionedThroughputOverride`<br>
    **Description**: Replica-specific provisioned throughput. If not described, uses the source table's provisioned throughput settings.<br>
       - `read_capacity_units`<br>
        **Type**: `INT64`<br>
        **Provider name**: `ReadCapacityUnits`<br>
        **Description**: Replica-specific read capacity units. If not specified, uses the source table's read capacity settings.<br>
   - `region_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RegionName`<br>
    **Description**: The name of the Region.<br>
   - `replica_inaccessible_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `ReplicaInaccessibleDateTime`<br>
    **Description**: The time at which the replica was first detected as inaccessible. To determine cause of inaccessibility check the <code>ReplicaStatus</code> property.<br>
   - `replica_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ReplicaStatus`<br>
    **Description**: The current state of the replica: <ul> <li>  <code>CREATING</code> - The replica is being created. </li> <li>  <code>UPDATING</code> - The replica is being updated. </li> <li>  <code>DELETING</code> - The replica is being deleted. </li> <li>  <code>ACTIVE</code> - The replica is ready for use. </li> <li>  <code>REGION_DISABLED</code> - The replica is inaccessible because the Amazon Web Services Region has been disabled. <note> If the Amazon Web Services Region remains inaccessible for more than 20 hours, DynamoDB will remove this replica from the replication group. The replica will not be deleted and replication will stop from and to this region. </note> </li> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS </code> - The KMS key used to encrypt the table is inaccessible. <note> If the KMS key remains inaccessible for more than 20 hours, DynamoDB will remove this replica from the replication group. The replica will not be deleted and replication will stop from and to this region. </note> </li> </ul>
   - `replica_status_description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ReplicaStatusDescription`<br>
    **Description**: Detailed information about the replica status.<br>
   - `replica_status_percent_progress`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ReplicaStatusPercentProgress`<br>
    **Description**: Specifies the progress of a Create, Update, or Delete action on the replica as a percentage.<br>
   - `replica_table_class_summary`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ReplicaTableClassSummary`<br>
       - `last_update_date_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `LastUpdateDateTime`<br>
        **Description**: The date and time at which the table class was last updated.<br>
       - `table_class`<br>
        **Type**: `STRING`<br>
        **Provider name**: `TableClass`<br>
        **Description**: The table class of the specified table. Valid values are <code>STANDARD</code> and <code>STANDARD_INFREQUENT_ACCESS</code>.<br>
## `restore_summary`
**Type**: `STRUCT`<br>
**Provider name**: `RestoreSummary`<br>
**Description**: Contains details for the restore.<br>
   - `restore_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `RestoreDateTime`<br>
    **Description**: Point in time or source backup time.<br>
   - `restore_in_progress`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `RestoreInProgress`<br>
    **Description**: Indicates if a restore is in progress or not.<br>
   - `source_backup_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SourceBackupArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the backup from which the table was restored.<br>
   - `source_table_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SourceTableArn`<br>
    **Description**: The ARN of the source table of the backup that is being restored.<br>
## `sse_description`
**Type**: `STRUCT`<br>
**Provider name**: `SSEDescription`<br>
**Description**: The description of the server-side encryption status on the specified table.<br>
   - `inaccessible_encryption_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `InaccessibleEncryptionDateTime`<br>
    **Description**: Indicates the time, in UNIX epoch date format, when DynamoDB detected that the table's KMS key was inaccessible. This attribute will automatically be cleared when DynamoDB detects that the table's KMS key is accessible again. DynamoDB will initiate the table archival process when table's KMS key remains inaccessible for more than seven days from this date.<br>
   - `kms_master_key_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KMSMasterKeyArn`<br>
    **Description**: The KMS key ARN used for the KMS encryption.<br>
   - `sse_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SSEType`<br>
    **Description**: Server-side encryption type. The only supported value is: <ul> <li>  <code>KMS</code> - Server-side encryption that uses Key Management Service. The key is stored in your account and is managed by KMS (KMS charges apply). </li> </ul>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Represents the current state of server-side encryption. The only supported values are: <ul> <li>  <code>ENABLED</code> - Server-side encryption is enabled. </li> <li>  <code>UPDATING</code> - Server-side encryption is being updated. </li> </ul>
## `stream_specification`
**Type**: `STRUCT`<br>
**Provider name**: `StreamSpecification`<br>
**Description**: The current DynamoDB Streams configuration for the table.<br>
   - `stream_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `StreamEnabled`<br>
    **Description**: Indicates whether DynamoDB Streams is enabled (true) or disabled (false) on the table.<br>
   - `stream_view_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `StreamViewType`<br>
    **Description**: When an item in the table is modified, <code>StreamViewType</code> determines what information is written to the stream for this table. Valid values for <code>StreamViewType</code> are: <ul> <li>  <code>KEYS_ONLY</code> - Only the key attributes of the modified item are written to the stream. </li> <li>  <code>NEW_IMAGE</code> - The entire item, as it appears after it was modified, is written to the stream. </li> <li>  <code>OLD_IMAGE</code> - The entire item, as it appeared before it was modified, is written to the stream. </li> <li>  <code>NEW_AND_OLD_IMAGES</code> - Both the new and the old item images of the item are written to the stream. </li> </ul>
## `table_arn`
**Type**: `STRING`<br>
**Provider name**: `TableArn`<br>
**Description**: The Amazon Resource Name (ARN) that uniquely identifies the table.<br>
## `table_class_summary`
**Type**: `STRUCT`<br>
**Provider name**: `TableClassSummary`<br>
**Description**: Contains details of the table class.<br>
   - `last_update_date_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastUpdateDateTime`<br>
    **Description**: The date and time at which the table class was last updated.<br>
   - `table_class`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TableClass`<br>
    **Description**: The table class of the specified table. Valid values are <code>STANDARD</code> and <code>STANDARD_INFREQUENT_ACCESS</code>.<br>
## `table_id`
**Type**: `STRING`<br>
**Provider name**: `TableId`<br>
**Description**: Unique identifier for the table for which the backup was created.<br>
## `table_name`
**Type**: `STRING`<br>
**Provider name**: `TableName`<br>
**Description**: The name of the table.<br>
## `table_size_bytes`
**Type**: `INT64`<br>
**Provider name**: `TableSizeBytes`<br>
**Description**: The total size of the specified table, in bytes. DynamoDB updates this value approximately every six hours. Recent changes might not be reflected in this value.<br>
## `table_status`
**Type**: `STRING`<br>
**Provider name**: `TableStatus`<br>
**Description**: The current state of the table: <ul> <li>  <code>CREATING</code> - The table is being created. </li> <li>  <code>UPDATING</code> - The table is being updated. </li> <li>  <code>DELETING</code> - The table is being deleted. </li> <li>  <code>ACTIVE</code> - The table is ready for use. </li> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS</code> - The KMS key used to encrypt the table in inaccessible. Table operations may fail due to failure to use the KMS key. DynamoDB will initiate the table archival process when a table's KMS key remains inaccessible for more than seven days.  </li> <li>  <code>ARCHIVING</code> - The table is being archived. Operations are not allowed until archival is complete.  </li> <li>  <code>ARCHIVED</code> - The table has been archived. See the ArchivalReason for more information.  </li> </ul>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
