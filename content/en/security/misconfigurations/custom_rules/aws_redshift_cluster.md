---
dependencies: []
disable_edit: true
---
# aws_redshift_cluster

## `account_id`
**Type**: `STRING`<br>
## `allow_version_upgrade`
**Type**: `BOOLEAN`<br>
**Provider name**: `AllowVersionUpgrade`<br>
**Description**: A boolean value that, if <code>true</code>, indicates that major version upgrades will be applied automatically to the cluster during the maintenance window.<br>
## `aqua_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `AquaConfiguration`<br>
**Description**: The AQUA (Advanced Query Accelerator) configuration of the cluster.<br>
   - `aqua_configuration_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AquaConfigurationStatus`<br>
    **Description**: The value represents how the cluster is configured to use AQUA. Possible values include the following. <ul> <li> enabled - Use AQUA if it is available for the current Amazon Web Services Region and Amazon Redshift node type. </li> <li> disabled - Don't use AQUA.  </li> <li> auto - Amazon Redshift determines whether to use AQUA. </li> </ul>
   - `aqua_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AquaStatus`<br>
    **Description**: The value indicates the status of AQUA on the cluster. Possible values include the following. <ul> <li> enabled - AQUA is enabled. </li> <li> disabled - AQUA is not enabled.  </li> <li> applying - AQUA status is being applied.  </li> </ul>
## `automated_snapshot_retention_period`
**Type**: `INT32`<br>
**Provider name**: `AutomatedSnapshotRetentionPeriod`<br>
**Description**: The number of days that automatic cluster snapshots are retained.<br>
## `availability_zone`
**Type**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**Description**: The name of the Availability Zone in which the cluster is located.<br>
## `availability_zone_relocation_status`
**Type**: `STRING`<br>
**Provider name**: `AvailabilityZoneRelocationStatus`<br>
**Description**: Describes the status of the Availability Zone relocation operation.<br>
## `cluster_availability_status`
**Type**: `STRING`<br>
**Provider name**: `ClusterAvailabilityStatus`<br>
**Description**: The availability status of the cluster for queries. Possible values are the following: <ul> <li> Available - The cluster is available for queries.  </li> <li> Unavailable - The cluster is not available for queries. </li> <li> Maintenance - The cluster is intermittently available for queries due to maintenance activities. </li> <li> Modifying - The cluster is intermittently available for queries due to changes that modify the cluster. </li> <li> Failed - The cluster failed and is not available for queries. </li> </ul>
## `cluster_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `ClusterCreateTime`<br>
**Description**: The date and time that the cluster was created.<br>
## `cluster_identifier`
**Type**: `STRING`<br>
**Provider name**: `ClusterIdentifier`<br>
**Description**: The unique identifier of the cluster.<br>
## `cluster_logging`
**Type**: `STRUCT`<br>
**Provider name**: `LoggingStatus`<br>
   - `bucket_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `BucketName`<br>
    **Description**: The name of the S3 bucket where the log files are stored.<br>
   - `last_failure_message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LastFailureMessage`<br>
    **Description**: The message indicating that logs failed to be delivered.<br>
   - `last_failure_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastFailureTime`<br>
    **Description**: The last time when logs failed to be delivered.<br>
   - `last_successful_delivery_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastSuccessfulDeliveryTime`<br>
    **Description**: The last time that logs were delivered.<br>
   - `log_destination_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogDestinationType`<br>
    **Description**: The log destination type. An enum with possible values of <code>s3</code> and <code>cloudwatch</code>.<br>
   - `log_exports`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `LogExports`<br>
    **Description**: The collection of exported log types. Log types include the connection log, user log and user activity log.<br>
   - `logging_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `LoggingEnabled`<br>
    **Description**: <code>true</code> if logging is on, <code>false</code> if logging is off.<br>
   - `s3_key_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `S3KeyPrefix`<br>
    **Description**: The prefix applied to the log file names.<br>
## `cluster_namespace_arn`
**Type**: `STRING`<br>
**Provider name**: `ClusterNamespaceArn`<br>
**Description**: The namespace Amazon Resource Name (ARN) of the cluster.<br>
## `cluster_nodes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ClusterNodes`<br>
**Description**: The nodes in the cluster.<br>
   - `node_role`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NodeRole`<br>
    **Description**: Whether the node is a leader node or a compute node.<br>
   - `private_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PrivateIPAddress`<br>
    **Description**: The private IP address of a node within a cluster.<br>
   - `public_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PublicIPAddress`<br>
    **Description**: The public IP address of a node within a cluster.<br>
## `cluster_parameter_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ClusterParameterGroups`<br>
**Description**: The list of cluster parameter groups that are associated with this cluster. Each parameter group in the list is returned with its status.<br>
   - `cluster_parameter_status_list`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `ClusterParameterStatusList`<br>
    **Description**: The list of parameter statuses.  For more information about parameters and parameter groups, go to <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html">Amazon Redshift Parameter Groups</a> in the <i>Amazon Redshift Cluster Management Guide</i>.<br>
       - `parameter_apply_error_description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ParameterApplyErrorDescription`<br>
        **Description**: The error that prevented the parameter from being applied to the database.<br>
       - `parameter_apply_status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ParameterApplyStatus`<br>
        **Description**: The status of the parameter that indicates whether the parameter is in sync with the database, waiting for a cluster reboot, or encountered an error when being applied. The following are possible statuses and descriptions. <ul> <li>  <code>in-sync</code>: The parameter value is in sync with the database. </li> <li>  <code>pending-reboot</code>: The parameter value will be applied after the cluster reboots. </li> <li>  <code>applying</code>: The parameter value is being applied to the database. </li> <li>  <code>invalid-parameter</code>: Cannot apply the parameter value because it has an invalid value or syntax. </li> <li>  <code>apply-deferred</code>: The parameter contains static property changes. The changes are deferred until the cluster reboots. </li> <li>  <code>apply-error</code>: Cannot connect to the cluster. The parameter change will be applied after the cluster reboots. </li> <li>  <code>unknown-error</code>: Cannot apply the parameter change right now. The change will be applied after the cluster reboots. </li> </ul>
       - `parameter_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ParameterName`<br>
        **Description**: The name of the parameter.<br>
   - `parameter_apply_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterApplyStatus`<br>
    **Description**: The status of parameter updates.<br>
   - `parameter_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterGroupName`<br>
    **Description**: The name of the cluster parameter group.<br>
## `cluster_public_key`
**Type**: `STRING`<br>
**Provider name**: `ClusterPublicKey`<br>
**Description**: The public key for the cluster.<br>
## `cluster_revision_number`
**Type**: `STRING`<br>
**Provider name**: `ClusterRevisionNumber`<br>
**Description**: The specific revision number of the database in the cluster.<br>
## `cluster_security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ClusterSecurityGroups`<br>
**Description**: A list of cluster security group that are associated with the cluster. Each security group is represented by an element that contains <code>ClusterSecurityGroup.Name</code> and <code>ClusterSecurityGroup.Status</code> subelements.  Cluster security groups are used when the cluster is not created in an Amazon Virtual Private Cloud (VPC). Clusters that are created in a VPC use VPC security groups, which are listed by the <b>VpcSecurityGroups</b> parameter.<br>
   - `cluster_security_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ClusterSecurityGroupName`<br>
    **Description**: The name of the cluster security group.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the cluster security group.<br>
## `cluster_snapshot_copy_status`
**Type**: `STRUCT`<br>
**Provider name**: `ClusterSnapshotCopyStatus`<br>
**Description**: A value that returns the destination region and retention period that are configured for cross-region snapshot copy.<br>
   - `destination_region`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DestinationRegion`<br>
    **Description**: The destination region that snapshots are automatically copied to when cross-region snapshot copy is enabled.<br>
   - `manual_snapshot_retention_period`<br>
    **Type**: `INT32`<br>
    **Provider name**: `ManualSnapshotRetentionPeriod`<br>
    **Description**: The number of days that automated snapshots are retained in the destination region after they are copied from a source region. If the value is -1, the manual snapshot is retained indefinitely.  The value must be either -1 or an integer between 1 and 3,653.<br>
   - `retention_period`<br>
    **Type**: `INT64`<br>
    **Provider name**: `RetentionPeriod`<br>
    **Description**: The number of days that automated snapshots are retained in the destination region after they are copied from a source region.<br>
   - `snapshot_copy_grant_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SnapshotCopyGrantName`<br>
    **Description**: The name of the snapshot copy grant.<br>
## `cluster_status`
**Type**: `STRING`<br>
**Provider name**: `ClusterStatus`<br>
**Description**: The current state of the cluster. Possible values are the following: <ul> <li>  <code>available</code>  </li> <li>  <code>available, prep-for-resize</code>  </li> <li>  <code>available, resize-cleanup</code>  </li> <li>  <code>cancelling-resize</code>  </li> <li>  <code>creating</code>  </li> <li>  <code>deleting</code>  </li> <li>  <code>final-snapshot</code>  </li> <li>  <code>hardware-failure</code>  </li> <li>  <code>incompatible-hsm</code>  </li> <li>  <code>incompatible-network</code>  </li> <li>  <code>incompatible-parameters</code>  </li> <li>  <code>incompatible-restore</code>  </li> <li>  <code>modifying</code>  </li> <li>  <code>paused</code>  </li> <li>  <code>rebooting</code>  </li> <li>  <code>renaming</code>  </li> <li>  <code>resizing</code>  </li> <li>  <code>rotating-keys</code>  </li> <li>  <code>storage-full</code>  </li> <li>  <code>updating-hsm</code>  </li> </ul>
## `cluster_subnet_group_name`
**Type**: `STRING`<br>
**Provider name**: `ClusterSubnetGroupName`<br>
**Description**: The name of the subnet group that is associated with the cluster. This parameter is valid only when the cluster is in a VPC.<br>
## `cluster_version`
**Type**: `STRING`<br>
**Provider name**: `ClusterVersion`<br>
**Description**: The version ID of the Amazon Redshift engine that is running on the cluster.<br>
## `data_transfer_progress`
**Type**: `STRUCT`<br>
**Provider name**: `DataTransferProgress`<br>
**Description**: <br>
   - `current_rate_in_mega_bytes_per_second`<br>
    **Type**: `DOUBLE`<br>
    **Provider name**: `CurrentRateInMegaBytesPerSecond`<br>
    **Description**: Describes the data transfer rate in MB's per second.<br>
   - `data_transferred_in_mega_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `DataTransferredInMegaBytes`<br>
    **Description**: Describes the total amount of data that has been transfered in MB's.<br>
   - `elapsed_time_in_seconds`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ElapsedTimeInSeconds`<br>
    **Description**: Describes the number of seconds that have elapsed during the data transfer.<br>
   - `estimated_time_to_completion_in_seconds`<br>
    **Type**: `INT64`<br>
    **Provider name**: `EstimatedTimeToCompletionInSeconds`<br>
    **Description**: Describes the estimated number of seconds remaining to complete the transfer.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Describes the status of the cluster. While the transfer is in progress the status is <code>transferringdata</code>.<br>
   - `total_data_in_mega_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `TotalDataInMegaBytes`<br>
    **Description**: Describes the total amount of data to be transfered in megabytes.<br>
## `db_name`
**Type**: `STRING`<br>
**Provider name**: `DBName`<br>
**Description**: The name of the initial database that was created when the cluster was created. This same name is returned for the life of the cluster. If an initial database was not specified, a database named <code>dev</code>dev was created by default.<br>
## `default_iam_role_arn`
**Type**: `STRING`<br>
**Provider name**: `DefaultIamRoleArn`<br>
**Description**: The Amazon Resource Name (ARN) for the IAM role set as default for the cluster.<br>
## `deferred_maintenance_windows`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DeferredMaintenanceWindows`<br>
**Description**: Describes a group of <code>DeferredMaintenanceWindow</code> objects.<br>
   - `defer_maintenance_end_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `DeferMaintenanceEndTime`<br>
    **Description**: A timestamp for the end of the time period when we defer maintenance.<br>
   - `defer_maintenance_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeferMaintenanceIdentifier`<br>
    **Description**: A unique identifier for the maintenance window.<br>
   - `defer_maintenance_start_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `DeferMaintenanceStartTime`<br>
    **Description**: A timestamp for the beginning of the time period when we defer maintenance.<br>
## `elastic_ip_status`
**Type**: `STRUCT`<br>
**Provider name**: `ElasticIpStatus`<br>
**Description**: The status of the elastic IP (EIP) address.<br>
   - `elastic_ip`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticIp`<br>
    **Description**: The elastic IP (EIP) address for the cluster.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the elastic IP (EIP) address.<br>
## `elastic_resize_number_of_node_options`
**Type**: `STRING`<br>
**Provider name**: `ElasticResizeNumberOfNodeOptions`<br>
**Description**: The number of nodes that you can resize the cluster to with the elastic resize method.<br>
## `encrypted`
**Type**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**Description**: A boolean value that, if <code>true</code>, indicates that data in the cluster is encrypted at rest.<br>
## `endpoint`
**Type**: `STRUCT`<br>
**Provider name**: `Endpoint`<br>
**Description**: The connection endpoint.<br>
   - `address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Address`<br>
    **Description**: The DNS address of the Cluster.<br>
   - `port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Port`<br>
    **Description**: The port that the database engine is listening on.<br>
   - `vpc_endpoints`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `VpcEndpoints`<br>
    **Description**: Describes a connection endpoint.<br>
       - `network_interfaces`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `NetworkInterfaces`<br>
        **Description**: One or more network interfaces of the endpoint. Also known as an interface endpoint.<br>
           - `availability_zone`<br>
            **Type**: `STRING`<br>
            **Provider name**: `AvailabilityZone`<br>
            **Description**: The Availability Zone.<br>
           - `network_interface_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `NetworkInterfaceId`<br>
            **Description**: The network interface identifier.<br>
           - `private_ip_address`<br>
            **Type**: `STRING`<br>
            **Provider name**: `PrivateIpAddress`<br>
            **Description**: The IPv4 address of the network interface within the subnet.<br>
           - `subnet_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `SubnetId`<br>
            **Description**: The subnet identifier.<br>
       - `vpc_endpoint_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcEndpointId`<br>
        **Description**: The connection endpoint ID for connecting an Amazon Redshift cluster through the proxy.<br>
       - `vpc_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcId`<br>
        **Description**: The VPC identifier that the endpoint is associated.<br>
## `enhanced_vpc_routing`
**Type**: `BOOLEAN`<br>
**Provider name**: `EnhancedVpcRouting`<br>
**Description**: An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html">Enhanced VPC Routing</a> in the Amazon Redshift Cluster Management Guide. If this option is <code>true</code>, enhanced VPC routing is enabled.<br>
**Default**: false
## `expected_next_snapshot_schedule_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `ExpectedNextSnapshotScheduleTime`<br>
**Description**: The date and time when the next snapshot is expected to be taken for clusters with a valid snapshot schedule and backups enabled.<br>
## `expected_next_snapshot_schedule_time_status`
**Type**: `STRING`<br>
**Provider name**: `ExpectedNextSnapshotScheduleTimeStatus`<br>
**Description**: The status of next expected snapshot for clusters having a valid snapshot schedule and backups enabled. Possible values are the following: <ul> <li> OnTrack - The next snapshot is expected to be taken on time.  </li> <li> Pending - The next snapshot is pending to be taken.  </li> </ul>
## `hsm_status`
**Type**: `STRUCT`<br>
**Provider name**: `HsmStatus`<br>
**Description**: A value that reports whether the Amazon Redshift cluster has finished applying any hardware security module (HSM) settings changes specified in a modify cluster command. Values: active, applying<br>
   - `hsm_client_certificate_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HsmClientCertificateIdentifier`<br>
    **Description**: Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM.<br>
   - `hsm_configuration_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HsmConfigurationIdentifier`<br>
    **Description**: Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Reports whether the Amazon Redshift cluster has finished applying any HSM settings changes specified in a modify cluster command. Values: active, applying<br>
## `iam_roles`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `IamRoles`<br>
**Description**: A list of Identity and Access Management (IAM) roles that can be used by the cluster to access other Amazon Web Services services.<br>
   - `apply_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ApplyStatus`<br>
    **Description**: A value that describes the status of the IAM role's association with an Amazon Redshift cluster. The following are possible statuses and descriptions. <ul> <li>  <code>in-sync</code>: The role is available for use by the cluster. </li> <li>  <code>adding</code>: The role is in the process of being associated with the cluster. </li> <li>  <code>removing</code>: The role is in the process of being disassociated with the cluster. </li> </ul>
   - `iam_role_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IamRoleArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the IAM role, for example, <code>arn:aws:iam::123456789012:role/RedshiftCopyUnload</code>.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: The Key Management Service (KMS) key ID of the encryption key used to encrypt data in the cluster.<br>
## `maintenance_track_name`
**Type**: `STRING`<br>
**Provider name**: `MaintenanceTrackName`<br>
**Description**: The name of the maintenance track for the cluster.<br>
## `manual_snapshot_retention_period`
**Type**: `INT32`<br>
**Provider name**: `ManualSnapshotRetentionPeriod`<br>
**Description**: The default number of days to retain a manual snapshot. If the value is -1, the snapshot is retained indefinitely. This setting doesn't change the retention period of existing snapshots. The value must be either -1 or an integer between 1 and 3,653.<br>
## `master_username`
**Type**: `STRING`<br>
**Provider name**: `MasterUsername`<br>
**Description**: The admin user name for the cluster. This name is used to connect to the database that is specified in the <b>DBName</b> parameter.<br>
## `modify_status`
**Type**: `STRING`<br>
**Provider name**: `ModifyStatus`<br>
**Description**: The status of a modify operation, if any, initiated for the cluster.<br>
## `next_maintenance_window_start_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `NextMaintenanceWindowStartTime`<br>
**Description**: The date and time in UTC when system maintenance can begin.<br>
## `node_type`
**Type**: `STRING`<br>
**Provider name**: `NodeType`<br>
**Description**: The node type for the nodes in the cluster.<br>
## `number_of_nodes`
**Type**: `INT32`<br>
**Provider name**: `NumberOfNodes`<br>
**Description**: The number of compute nodes in the cluster.<br>
## `parameters`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Parameters`<br>
**Description**: A list of Parameter instances. Each instance lists the parameters of one cluster parameter group.<br>
   - `allowed_values`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AllowedValues`<br>
    **Description**: The valid range of values for the parameter.<br>
   - `apply_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ApplyType`<br>
    **Description**: Specifies how to apply the WLM configuration parameter. Some properties can be applied dynamically, while other properties require that any associated clusters be rebooted for the configuration changes to be applied. For more information about parameters and parameter groups, go to <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html">Amazon Redshift Parameter Groups</a> in the <i>Amazon Redshift Cluster Management Guide</i>.<br>
   - `data_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DataType`<br>
    **Description**: The data type of the parameter.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Description`<br>
    **Description**: A description of the parameter.<br>
   - `is_modifiable`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IsModifiable`<br>
    **Description**: If <code>true</code>, the parameter can be modified. Some parameters have security or operational implications that prevent them from being changed.<br>
   - `minimum_engine_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MinimumEngineVersion`<br>
    **Description**: The earliest engine version to which the parameter can apply.<br>
   - `parameter_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterName`<br>
    **Description**: The name of the parameter.<br>
   - `parameter_value`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterValue`<br>
    **Description**: The value of the parameter. If <code>ParameterName</code> is <code>wlm_json_configuration</code>, then the maximum size of <code>ParameterValue</code> is 8000 characters.<br>
## `pending_actions`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `PendingActions`<br>
**Description**: Cluster operations that are waiting to be started.<br>
## `pending_modified_values`
**Type**: `STRUCT`<br>
**Provider name**: `PendingModifiedValues`<br>
**Description**: A value that, if present, indicates that changes to the cluster are pending. Specific pending changes are identified by subelements.<br>
   - `automated_snapshot_retention_period`<br>
    **Type**: `INT32`<br>
    **Provider name**: `AutomatedSnapshotRetentionPeriod`<br>
    **Description**: The pending or in-progress change of the automated snapshot retention period.<br>
   - `cluster_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ClusterIdentifier`<br>
    **Description**: The pending or in-progress change of the new identifier for the cluster.<br>
   - `cluster_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ClusterType`<br>
    **Description**: The pending or in-progress change of the cluster type.<br>
   - `cluster_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ClusterVersion`<br>
    **Description**: The pending or in-progress change of the service version.<br>
   - `encryption_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `EncryptionType`<br>
    **Description**: The encryption type for a cluster. Possible values are: KMS and None.<br>
   - `enhanced_vpc_routing`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `EnhancedVpcRouting`<br>
    **Description**: An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html">Enhanced VPC Routing</a> in the Amazon Redshift Cluster Management Guide. If this option is <code>true</code>, enhanced VPC routing is enabled.<br>
    **Default**: false
   - `maintenance_track_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MaintenanceTrackName`<br>
    **Description**: The name of the maintenance track that the cluster will change to during the next maintenance window.<br>
   - `master_user_password`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MasterUserPassword`<br>
    **Description**: The pending or in-progress change of the admin user password for the cluster.<br>
   - `node_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NodeType`<br>
    **Description**: The pending or in-progress change of the cluster's node type.<br>
   - `number_of_nodes`<br>
    **Type**: `INT32`<br>
    **Provider name**: `NumberOfNodes`<br>
    **Description**: The pending or in-progress change of the number of nodes in the cluster.<br>
   - `publicly_accessible`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `PubliclyAccessible`<br>
    **Description**: The pending or in-progress change of the ability to connect to the cluster from the public network.<br>
## `preferred_maintenance_window`
**Type**: `STRING`<br>
**Provider name**: `PreferredMaintenanceWindow`<br>
**Description**: The weekly time range, in Universal Coordinated Time (UTC), during which system maintenance can occur.<br>
## `publicly_accessible`
**Type**: `BOOLEAN`<br>
**Provider name**: `PubliclyAccessible`<br>
**Description**: A boolean value that, if <code>true</code>, indicates that the cluster can be accessed from a public network.<br>
## `redshift_cluster_arn`
**Type**: `STRING`<br>
## `reserved_node_exchange_status`
**Type**: `STRUCT`<br>
**Provider name**: `ReservedNodeExchangeStatus`<br>
**Description**: The status of the reserved-node exchange request. Statuses include in-progress and requested.<br>
   - `request_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `RequestTime`<br>
    **Description**: A date and time that indicate when the reserved-node exchange was requested.<br>
   - `reserved_node_exchange_request_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ReservedNodeExchangeRequestId`<br>
    **Description**: The identifier of the reserved-node exchange request.<br>
   - `source_reserved_node_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `SourceReservedNodeCount`<br>
    **Description**: The source reserved-node count in the cluster.<br>
   - `source_reserved_node_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SourceReservedNodeId`<br>
    **Description**: The identifier of the source reserved node.<br>
   - `source_reserved_node_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SourceReservedNodeType`<br>
    **Description**: The source reserved-node type, for example ds2.xlarge.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the reserved-node exchange request. Statuses include in-progress and requested.<br>
   - `target_reserved_node_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `TargetReservedNodeCount`<br>
    **Description**: The count of target reserved nodes in the cluster.<br>
   - `target_reserved_node_offering_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TargetReservedNodeOfferingId`<br>
    **Description**: The identifier of the target reserved node offering.<br>
   - `target_reserved_node_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TargetReservedNodeType`<br>
    **Description**: The node type of the target reserved node, for example ra3.4xlarge.<br>
## `resize_info`
**Type**: `STRUCT`<br>
**Provider name**: `ResizeInfo`<br>
**Description**: Returns the following: <ul> <li> AllowCancelResize: a boolean value indicating if the resize operation can be cancelled. </li> <li> ResizeType: Returns ClassicResize </li> </ul>
   - `allow_cancel_resize`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `AllowCancelResize`<br>
    **Description**: A boolean value indicating if the resize operation can be cancelled.<br>
   - `resize_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ResizeType`<br>
    **Description**: Returns the value <code>ClassicResize</code>.<br>
## `restore_status`
**Type**: `STRUCT`<br>
**Provider name**: `RestoreStatus`<br>
**Description**: A value that describes the status of a cluster restore action. This parameter returns null if the cluster was not created by restoring a snapshot.<br>
   - `current_restore_rate_in_mega_bytes_per_second`<br>
    **Type**: `DOUBLE`<br>
    **Provider name**: `CurrentRestoreRateInMegaBytesPerSecond`<br>
    **Description**: The number of megabytes per second being transferred from the backup storage. Returns the average rate for a completed backup. This field is only updated when you restore to DC2 and DS2 node types.<br>
   - `elapsed_time_in_seconds`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ElapsedTimeInSeconds`<br>
    **Description**: The amount of time an in-progress restore has been running, or the amount of time it took a completed restore to finish. This field is only updated when you restore to DC2 and DS2 node types.<br>
   - `estimated_time_to_completion_in_seconds`<br>
    **Type**: `INT64`<br>
    **Provider name**: `EstimatedTimeToCompletionInSeconds`<br>
    **Description**: The estimate of the time remaining before the restore will complete. Returns 0 for a completed restore. This field is only updated when you restore to DC2 and DS2 node types.<br>
   - `progress_in_mega_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `ProgressInMegaBytes`<br>
    **Description**: The number of megabytes that have been transferred from snapshot storage. This field is only updated when you restore to DC2 and DS2 node types.<br>
   - `snapshot_size_in_mega_bytes`<br>
    **Type**: `INT64`<br>
    **Provider name**: `SnapshotSizeInMegaBytes`<br>
    **Description**: The size of the set of snapshot data used to restore the cluster. This field is only updated when you restore to DC2 and DS2 node types.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the restore action. Returns starting, restoring, completed, or failed.<br>
## `snapshot_schedule_identifier`
**Type**: `STRING`<br>
**Provider name**: `SnapshotScheduleIdentifier`<br>
**Description**: A unique identifier for the cluster snapshot schedule.<br>
## `snapshot_schedule_state`
**Type**: `STRING`<br>
**Provider name**: `SnapshotScheduleState`<br>
**Description**: The current state of the cluster snapshot schedule.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `total_storage_capacity_in_mega_bytes`
**Type**: `INT64`<br>
**Provider name**: `TotalStorageCapacityInMegaBytes`<br>
**Description**: The total storage capacity of the cluster in megabytes.<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: The identifier of the VPC the cluster is in, if the cluster is in a VPC.<br>
## `vpc_security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `VpcSecurityGroups`<br>
**Description**: A list of Amazon Virtual Private Cloud (Amazon VPC) security groups that are associated with the cluster. This parameter is returned only if the cluster is in a VPC.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the VPC security group.<br>
   - `vpc_security_group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VpcSecurityGroupId`<br>
    **Description**: The identifier of the VPC security group.<br>
