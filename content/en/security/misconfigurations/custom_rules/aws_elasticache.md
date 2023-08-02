---
dependencies: []
disable_edit: true
---
# aws_elasticache

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `ARN`<br>
**Description**: The ARN (Amazon Resource Name) of the cache cluster.<br>
## `at_rest_encryption_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `AtRestEncryptionEnabled`<br>
**Description**: A flag that enables encryption at-rest when set to <code>true</code>. You cannot modify the value of <code>AtRestEncryptionEnabled</code> after the cluster is created. To enable at-rest encryption on a cluster you must set <code>AtRestEncryptionEnabled</code> to <code>true</code> when you create a cluster.  <b>Required:</b> Only available when creating a replication group in an Amazon VPC using redis version <code>3.2.6</code>, <code>4.x</code> or later.<br>
**Default**: <code>false</code>
## `auth_token_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `AuthTokenEnabled`<br>
**Description**: A flag that enables using an <code>AuthToken</code> (password) when issuing Redis commands.<br>
**Default**: <code>false</code>
## `auth_token_last_modified_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `AuthTokenLastModifiedDate`<br>
**Description**: The date the auth token was last modified<br>
## `auto_minor_version_upgrade`
**Type**: `BOOLEAN`<br>
**Provider name**: `AutoMinorVersionUpgrade`<br>
**Description**: If you are running Redis engine version 6.0 or later, set this parameter to yes if you want to opt-in to the next auto minor version upgrade campaign. This parameter is disabled for previous versions.<br>
## `cache_cluster_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CacheClusterCreateTime`<br>
**Description**: The date and time when the cluster was created.<br>
## `cache_cluster_id`
**Type**: `STRING`<br>
**Provider name**: `CacheClusterId`<br>
**Description**: The user-supplied identifier of the cluster. This identifier is a unique key that identifies a cluster.<br>
## `cache_cluster_status`
**Type**: `STRING`<br>
**Provider name**: `CacheClusterStatus`<br>
**Description**: The current state of this cluster, one of the following values: <code>available</code>, <code>creating</code>, <code>deleted</code>, <code>deleting</code>, <code>incompatible-network</code>, <code>modifying</code>, <code>rebooting cluster nodes</code>, <code>restore-failed</code>, or <code>snapshotting</code>.<br>
## `cache_node_type`
**Type**: `STRING`<br>
**Provider name**: `CacheNodeType`<br>
**Description**: The name of the compute and memory capacity node type for the cluster. The following node types are supported by ElastiCache. Generally speaking, the current generation types provide more memory and computational power at lower cost when compared to their equivalent previous generation counterparts. <ul> <li> General purpose: <ul> <li> Current generation:   <b>M6g node types</b> (available only for Redis engine version 5.0.6 onward and for Memcached engine version 1.5.16 onward): <code>cache.m6g.large</code>, <code>cache.m6g.xlarge</code>, <code>cache.m6g.2xlarge</code>, <code>cache.m6g.4xlarge</code>, <code>cache.m6g.8xlarge</code>, <code>cache.m6g.12xlarge</code>, <code>cache.m6g.16xlarge</code>  <note> For region availability, see <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheNodes.SupportedTypes.html#CacheNodes.SupportedTypesByRegion">Supported Node Types</a>  </note>  <b>M5 node types:</b> <code>cache.m5.large</code>, <code>cache.m5.xlarge</code>, <code>cache.m5.2xlarge</code>, <code>cache.m5.4xlarge</code>, <code>cache.m5.12xlarge</code>, <code>cache.m5.24xlarge</code>   <b>M4 node types:</b> <code>cache.m4.large</code>, <code>cache.m4.xlarge</code>, <code>cache.m4.2xlarge</code>, <code>cache.m4.4xlarge</code>, <code>cache.m4.10xlarge</code>   <b>T4g node types</b> (available only for Redis engine version 5.0.6 onward and Memcached engine version 1.5.16 onward): <code>cache.t4g.micro</code>, <code>cache.t4g.small</code>, <code>cache.t4g.medium</code>   <b>T3 node types:</b> <code>cache.t3.micro</code>, <code>cache.t3.small</code>, <code>cache.t3.medium</code>   <b>T2 node types:</b> <code>cache.t2.micro</code>, <code>cache.t2.small</code>, <code>cache.t2.medium</code>  </li> <li> Previous generation: (not recommended. Existing clusters are still supported but creation of new clusters is not supported for these types.)  <b>T1 node types:</b> <code>cache.t1.micro</code>   <b>M1 node types:</b> <code>cache.m1.small</code>, <code>cache.m1.medium</code>, <code>cache.m1.large</code>, <code>cache.m1.xlarge</code>   <b>M3 node types:</b> <code>cache.m3.medium</code>, <code>cache.m3.large</code>, <code>cache.m3.xlarge</code>, <code>cache.m3.2xlarge</code>  </li> </ul> </li> <li> Compute optimized: <ul> <li> Previous generation: (not recommended. Existing clusters are still supported but creation of new clusters is not supported for these types.)  <b>C1 node types:</b> <code>cache.c1.xlarge</code>  </li> </ul> </li> <li> Memory optimized: <ul> <li> Current generation:   <b>R6g node types</b> (available only for Redis engine version 5.0.6 onward and for Memcached engine version 1.5.16 onward).  <code>cache.r6g.large</code>, <code>cache.r6g.xlarge</code>, <code>cache.r6g.2xlarge</code>, <code>cache.r6g.4xlarge</code>, <code>cache.r6g.8xlarge</code>, <code>cache.r6g.12xlarge</code>, <code>cache.r6g.16xlarge</code>  <note> For region availability, see <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheNodes.SupportedTypes.html#CacheNodes.SupportedTypesByRegion">Supported Node Types</a>  </note>  <b>R5 node types:</b> <code>cache.r5.large</code>, <code>cache.r5.xlarge</code>, <code>cache.r5.2xlarge</code>, <code>cache.r5.4xlarge</code>, <code>cache.r5.12xlarge</code>, <code>cache.r5.24xlarge</code>   <b>R4 node types:</b> <code>cache.r4.large</code>, <code>cache.r4.xlarge</code>, <code>cache.r4.2xlarge</code>, <code>cache.r4.4xlarge</code>, <code>cache.r4.8xlarge</code>, <code>cache.r4.16xlarge</code>  </li> <li> Previous generation: (not recommended. Existing clusters are still supported but creation of new clusters is not supported for these types.)  <b>M2 node types:</b> <code>cache.m2.xlarge</code>, <code>cache.m2.2xlarge</code>, <code>cache.m2.4xlarge</code>   <b>R3 node types:</b> <code>cache.r3.large</code>, <code>cache.r3.xlarge</code>, <code>cache.r3.2xlarge</code>, <code>cache.r3.4xlarge</code>, <code>cache.r3.8xlarge</code>  </li> </ul> </li> </ul>  <b>Additional node type info</b>  <ul> <li> All current generation instance types are created in Amazon VPC by default. </li> <li> Redis append-only files (AOF) are not supported for T1 or T2 instances. </li> <li> Redis Multi-AZ with automatic failover is not supported on T1 instances. </li> <li> Redis configuration variables <code>appendonly</code> and <code>appendfsync</code> are not supported on Redis version 2.8.22 and later. </li> </ul>
## `cache_nodes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `CacheNodes`<br>
**Description**: A list of cache nodes that are members of the cluster.<br>
   - `cache_node_create_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CacheNodeCreateTime`<br>
    **Description**: The date and time when the cache node was created.<br>
   - `cache_node_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CacheNodeId`<br>
    **Description**: The cache node identifier. A node ID is a numeric identifier (0001, 0002, etc.). The combination of cluster ID and node ID uniquely identifies every cache node used in a customer's Amazon account.<br>
   - `cache_node_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CacheNodeStatus`<br>
    **Description**: The current state of this cache node, one of the following values: <code>available</code>, <code>creating</code>, <code>rebooting</code>, or <code>deleting</code>.<br>
   - `customer_availability_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomerAvailabilityZone`<br>
    **Description**: The Availability Zone where this node was created and now resides.<br>
   - `customer_outpost_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomerOutpostArn`<br>
    **Description**: The customer outpost ARN of the cache node.<br>
   - `endpoint`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Endpoint`<br>
    **Description**: The hostname for connecting to this cache node.<br>
       - `address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Address`<br>
        **Description**: The DNS hostname of the cache node.<br>
       - `port`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Port`<br>
        **Description**: The port number that the cache engine is listening on.<br>
   - `parameter_group_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterGroupStatus`<br>
    **Description**: The status of the parameter group applied to this cache node.<br>
   - `source_cache_node_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SourceCacheNodeId`<br>
    **Description**: The ID of the primary node to which this read replica node is synchronized. If this field is empty, this node is not associated with a primary cluster.<br>
## `cache_parameter_group`
**Type**: `STRUCT`<br>
**Provider name**: `CacheParameterGroup`<br>
**Description**: Status of the cache parameter group.<br>
   - `cache_node_ids_to_reboot`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `CacheNodeIdsToReboot`<br>
    **Description**: A list of the cache node IDs which need to be rebooted for parameter changes to be applied. A node ID is a numeric identifier (0001, 0002, etc.).<br>
   - `cache_parameter_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CacheParameterGroupName`<br>
    **Description**: The name of the cache parameter group.<br>
   - `parameter_apply_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterApplyStatus`<br>
    **Description**: The status of parameter updates.<br>
## `cache_security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `CacheSecurityGroups`<br>
**Description**: A list of cache security group elements, composed of name and status sub-elements.<br>
   - `cache_security_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CacheSecurityGroupName`<br>
    **Description**: The name of the cache security group.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The membership status in the cache security group. The status changes when a cache security group is modified, or when the cache security groups assigned to a cluster are modified.<br>
## `cache_subnet_group_name`
**Type**: `STRING`<br>
**Provider name**: `CacheSubnetGroupName`<br>
**Description**: The name of the cache subnet group associated with the cluster.<br>
## `client_download_landing_page`
**Type**: `STRING`<br>
**Provider name**: `ClientDownloadLandingPage`<br>
**Description**: The URL of the web page where you can download the latest ElastiCache client library.<br>
## `configuration_endpoint`
**Type**: `STRUCT`<br>
**Provider name**: `ConfigurationEndpoint`<br>
**Description**: Represents a Memcached cluster endpoint which can be used by an application to connect to any node in the cluster. The configuration endpoint will always have <code>.cfg</code> in it. Example: <code>mem-3.9dvc4r<u>.cfg</u>.usw2.cache.amazonaws.com:11211</code><br>
   - `address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Address`<br>
    **Description**: The DNS hostname of the cache node.<br>
   - `port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Port`<br>
    **Description**: The port number that the cache engine is listening on.<br>
## `engine`
**Type**: `STRING`<br>
**Provider name**: `Engine`<br>
**Description**: The name of the cache engine (<code>memcached</code> or <code>redis</code>) to be used for this cluster.<br>
## `engine_version`
**Type**: `STRING`<br>
**Provider name**: `EngineVersion`<br>
**Description**: The version of the cache engine that is used in this cluster.<br>
## `ip_discovery`
**Type**: `STRING`<br>
**Provider name**: `IpDiscovery`<br>
**Description**: The network type associated with the cluster, either <code>ipv4</code> | <code>ipv6</code>. IPv6 is supported for workloads using Redis engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the <a href="https://aws.amazon.com/ec2/nitro/">Nitro system</a>.<br>
## `log_delivery_configurations`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `LogDeliveryConfigurations`<br>
**Description**: Returns the destination, format and type of the logs.<br>
   - `destination_details`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `DestinationDetails`<br>
    **Description**: Configuration details of either a CloudWatch Logs destination or Kinesis Data Firehose destination.<br>
       - `cloud_watch_logs_details`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `CloudWatchLogsDetails`<br>
        **Description**: The configuration details of the CloudWatch Logs destination.<br>
           - `log_group`<br>
            **Type**: `STRING`<br>
            **Provider name**: `LogGroup`<br>
            **Description**: The name of the CloudWatch Logs log group.<br>
       - `kinesis_firehose_details`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `KinesisFirehoseDetails`<br>
        **Description**: The configuration details of the Kinesis Data Firehose destination.<br>
           - `delivery_stream`<br>
            **Type**: `STRING`<br>
            **Provider name**: `DeliveryStream`<br>
            **Description**: The name of the Kinesis Data Firehose delivery stream.<br>
   - `destination_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DestinationType`<br>
    **Description**: Returns the destination type, either <code>cloudwatch-logs</code> or <code>kinesis-firehose</code>.<br>
   - `log_format`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogFormat`<br>
    **Description**: Returns the log format, either JSON or TEXT.<br>
   - `log_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogType`<br>
    **Description**: Refers to <a href="https://redis.io/commands/slowlog">slow-log</a> or engine-log.<br>
   - `message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Message`<br>
    **Description**: Returns an error message for the log delivery configuration.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Returns the log delivery configuration status. Values are one of <code>enabling</code> | <code>disabling</code> | <code>modifying</code> | <code>active</code> | <code>error</code><br>
## `network_type`
**Type**: `STRING`<br>
**Provider name**: `NetworkType`<br>
**Description**: Must be either <code>ipv4</code> | <code>ipv6</code> | <code>dual_stack</code>. IPv6 is supported for workloads using Redis engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the <a href="https://aws.amazon.com/ec2/nitro/">Nitro system</a>.<br>
## `notification_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `NotificationConfiguration`<br>
**Description**: Describes a notification topic and its status. Notification topics are used for publishing ElastiCache events to subscribers using Amazon Simple Notification Service (SNS).<br>
   - `topic_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TopicArn`<br>
    **Description**: The Amazon Resource Name (ARN) that identifies the topic.<br>
   - `topic_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TopicStatus`<br>
    **Description**: The current state of the topic.<br>
## `num_cache_nodes`
**Type**: `INT32`<br>
**Provider name**: `NumCacheNodes`<br>
**Description**: The number of cache nodes in the cluster. For clusters running Redis, this value must be 1. For clusters running Memcached, this value must be between 1 and 40.<br>
## `pending_modified_values`
**Type**: `STRUCT`<br>
**Provider name**: `PendingModifiedValues`<br>
   - `auth_token_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AuthTokenStatus`<br>
    **Description**: The auth token status<br>
   - `cache_node_ids_to_remove`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `CacheNodeIdsToRemove`<br>
    **Description**: A list of cache node IDs that are being removed (or will be removed) from the cluster. A node ID is a 4-digit numeric identifier (0001, 0002, etc.).<br>
   - `cache_node_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CacheNodeType`<br>
    **Description**: The cache node type that this cluster or replication group is scaled to.<br>
   - `engine_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `EngineVersion`<br>
    **Description**: The new cache engine version that the cluster runs.<br>
   - `log_delivery_configurations`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `LogDeliveryConfigurations`<br>
    **Description**: The log delivery configurations being modified<br>
       - `destination_details`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `DestinationDetails`<br>
        **Description**: Configuration details of either a CloudWatch Logs destination or Kinesis Data Firehose destination.<br>
           - `cloud_watch_logs_details`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `CloudWatchLogsDetails`<br>
            **Description**: The configuration details of the CloudWatch Logs destination.<br>
               - `log_group`<br>
                **Type**: `STRING`<br>
                **Provider name**: `LogGroup`<br>
                **Description**: The name of the CloudWatch Logs log group.<br>
           - `kinesis_firehose_details`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `KinesisFirehoseDetails`<br>
            **Description**: The configuration details of the Kinesis Data Firehose destination.<br>
               - `delivery_stream`<br>
                **Type**: `STRING`<br>
                **Provider name**: `DeliveryStream`<br>
                **Description**: The name of the Kinesis Data Firehose delivery stream.<br>
       - `destination_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `DestinationType`<br>
        **Description**: Returns the destination type, either CloudWatch Logs or Kinesis Data Firehose.<br>
       - `log_format`<br>
        **Type**: `STRING`<br>
        **Provider name**: `LogFormat`<br>
        **Description**: Returns the log format, either JSON or TEXT<br>
       - `log_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `LogType`<br>
        **Description**: Refers to <a href="https://redis.io/commands/slowlog">slow-log</a> or engine-log..<br>
   - `num_cache_nodes`<br>
    **Type**: `INT32`<br>
    **Provider name**: `NumCacheNodes`<br>
    **Description**: The new number of cache nodes for the cluster. For clusters running Redis, this value must be 1. For clusters running Memcached, this value must be between 1 and 40.<br>
## `preferred_availability_zone`
**Type**: `STRING`<br>
**Provider name**: `PreferredAvailabilityZone`<br>
**Description**: The name of the Availability Zone in which the cluster is located or "Multiple" if the cache nodes are located in different Availability Zones.<br>
## `preferred_maintenance_window`
**Type**: `STRING`<br>
**Provider name**: `PreferredMaintenanceWindow`<br>
**Description**: Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period. Valid values for <code>ddd</code> are: <ul> <li>  <code>sun</code>  </li> <li>  <code>mon</code>  </li> <li>  <code>tue</code>  </li> <li>  <code>wed</code>  </li> <li>  <code>thu</code>  </li> <li>  <code>fri</code>  </li> <li>  <code>sat</code>  </li> </ul> Example: <code>sun:23:00-mon:01:30</code><br>
## `preferred_outpost_arn`
**Type**: `STRING`<br>
**Provider name**: `PreferredOutpostArn`<br>
**Description**: The outpost ARN in which the cache cluster is created.<br>
## `replication_group_id`
**Type**: `STRING`<br>
**Provider name**: `ReplicationGroupId`<br>
**Description**: The replication group to which this cluster belongs. If this field is empty, the cluster is not associated with any replication group.<br>
## `replication_group_log_delivery_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `ReplicationGroupLogDeliveryEnabled`<br>
**Description**: A boolean value indicating whether log delivery is enabled for the replication group.<br>
## `security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `SecurityGroups`<br>
**Description**: A list of VPC Security Groups associated with the cluster.<br>
   - `security_group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SecurityGroupId`<br>
    **Description**: The identifier of the cache security group.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the cache security group membership. The status changes whenever a cache security group is modified, or when the cache security groups assigned to a cluster are modified.<br>
## `snapshot_retention_limit`
**Type**: `INT32`<br>
**Provider name**: `SnapshotRetentionLimit`<br>
**Description**: The number of days for which ElastiCache retains automatic cluster snapshots before deleting them. For example, if you set <code>SnapshotRetentionLimit</code> to 5, a snapshot that was taken today is retained for 5 days before being deleted. <important>  If the value of SnapshotRetentionLimit is set to zero (0), backups are turned off. </important><br>
## `snapshot_window`
**Type**: `STRING`<br>
**Provider name**: `SnapshotWindow`<br>
**Description**: The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your cluster. Example: <code>05:00-09:00</code><br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `transit_encryption_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `TransitEncryptionEnabled`<br>
**Description**: A flag that enables in-transit encryption when set to <code>true</code>. You cannot modify the value of <code>TransitEncryptionEnabled</code> after the cluster is created. To enable in-transit encryption on a cluster you must set <code>TransitEncryptionEnabled</code> to <code>true</code> when you create a cluster.  <b>Required:</b> Only available when creating a replication group in an Amazon VPC using redis version <code>3.2.6</code>, <code>4.x</code> or later.<br>
**Default**: <code>false</code>
