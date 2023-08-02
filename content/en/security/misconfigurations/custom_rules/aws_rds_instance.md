---
dependencies: []
disable_edit: true
---
# aws_rds_instance

## `account_id`
**Type**: `STRING`<br>
## `activity_stream_engine_native_audit_fields_included`
**Type**: `BOOLEAN`<br>
**Provider name**: `ActivityStreamEngineNativeAuditFieldsIncluded`<br>
**Description**: Indicates whether engine-native audit fields are included in the database activity stream.<br>
## `activity_stream_kinesis_stream_name`
**Type**: `STRING`<br>
**Provider name**: `ActivityStreamKinesisStreamName`<br>
**Description**: The name of the Amazon Kinesis data stream used for the database activity stream.<br>
## `activity_stream_kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `ActivityStreamKmsKeyId`<br>
**Description**: The Amazon Web Services KMS key identifier used for encrypting messages in the database activity stream. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.<br>
## `activity_stream_mode`
**Type**: `STRING`<br>
**Provider name**: `ActivityStreamMode`<br>
**Description**: The mode of the database activity stream. Database events such as a change or access generate an activity stream event. RDS for Oracle always handles these events asynchronously.<br>
## `activity_stream_policy_status`
**Type**: `STRING`<br>
**Provider name**: `ActivityStreamPolicyStatus`<br>
**Description**: The status of the policy state of the activity stream.<br>
## `activity_stream_status`
**Type**: `STRING`<br>
**Provider name**: `ActivityStreamStatus`<br>
**Description**: The status of the database activity stream.<br>
## `allocated_storage`
**Type**: `INT32`<br>
**Provider name**: `AllocatedStorage`<br>
**Description**: Specifies the allocated storage size specified in gibibytes (GiB).<br>
## `associated_roles`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `AssociatedRoles`<br>
**Description**: The Amazon Web Services Identity and Access Management (IAM) roles associated with the DB instance.<br>
   - `feature_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `FeatureName`<br>
    **Description**: The name of the feature associated with the Amazon Web Services Identity and Access Management (IAM) role. For information about supported feature names, see <code>DBEngineVersion</code>.<br>
   - `role_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RoleArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the IAM role that is associated with the DB instance.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Describes the state of association between the IAM role and the DB instance. The Status property returns one of the following values: <ul> <li>  <code>ACTIVE</code> - the IAM role ARN is associated with the DB instance and can be used to access other Amazon Web Services services on your behalf. </li> <li>  <code>PENDING</code> - the IAM role ARN is being associated with the DB instance. </li> <li>  <code>INVALID</code> - the IAM role ARN is associated with the DB instance, but the DB instance is unable to assume the IAM role in order to access other Amazon Web Services services on your behalf. </li> </ul>
## `auto_minor_version_upgrade`
**Type**: `BOOLEAN`<br>
**Provider name**: `AutoMinorVersionUpgrade`<br>
**Description**: A value that indicates that minor version patches are applied automatically.<br>
## `automatic_restart_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `AutomaticRestartTime`<br>
**Description**: The time when a stopped DB instance is restarted automatically.<br>
## `automation_mode`
**Type**: `STRING`<br>
**Provider name**: `AutomationMode`<br>
**Description**: The automation mode of the RDS Custom DB instance: <code>full</code> or <code>all paused</code>. If <code>full</code>, the DB instance automates monitoring and instance recovery. If <code>all paused</code>, the instance pauses automation for the duration set by <code>--resume-full-automation-mode-minutes</code>.<br>
## `availability_zone`
**Type**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**Description**: Specifies the name of the Availability Zone the DB instance is located in.<br>
## `aws_backup_recovery_point_arn`
**Type**: `STRING`<br>
**Provider name**: `AwsBackupRecoveryPointArn`<br>
**Description**: The Amazon Resource Name (ARN) of the recovery point in Amazon Web Services Backup.<br>
## `backup_retention_period`
**Type**: `INT32`<br>
**Provider name**: `BackupRetentionPeriod`<br>
**Description**: Specifies the number of days for which automatic DB snapshots are retained.<br>
## `backup_target`
**Type**: `STRING`<br>
**Provider name**: `BackupTarget`<br>
**Description**: Specifies where automated backups and manual snapshots are stored: Amazon Web Services Outposts or the Amazon Web Services Region.<br>
## `ca_certificate_identifier`
**Type**: `STRING`<br>
**Provider name**: `CACertificateIdentifier`<br>
**Description**: The identifier of the CA certificate for this DB instance.<br>
## `character_set_name`
**Type**: `STRING`<br>
**Provider name**: `CharacterSetName`<br>
**Description**: If present, specifies the name of the character set that this instance is associated with.<br>
## `copy_tags_to_snapshot`
**Type**: `BOOLEAN`<br>
**Provider name**: `CopyTagsToSnapshot`<br>
**Description**: Specifies whether tags are copied from the DB instance to snapshots of the DB instance.  <b>Amazon Aurora</b>  Not applicable. Copying tags to snapshots is managed by the DB cluster. Setting this value for an Aurora DB instance has no effect on the DB cluster setting. For more information, see <code>DBCluster</code>.<br>
## `custom_iam_instance_profile`
**Type**: `STRING`<br>
**Provider name**: `CustomIamInstanceProfile`<br>
**Description**: The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance. The instance profile must meet the following requirements: <ul> <li> The profile must exist in your account. </li> <li> The profile must have an IAM role that Amazon EC2 has permissions to assume. </li> <li> The instance profile name and the associated IAM role name must start with the prefix <code>AWSRDSCustom</code>. </li> </ul> <p>For the list of permissions required for the IAM role, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-setup-orcl.html#custom-setup-orcl.iam-vpc"> Configure IAM and your VPC</a> in the <i>Amazon RDS User Guide</i>.</p>
## `customer_owned_ip_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `CustomerOwnedIpEnabled`<br>
**Description**: Specifies whether a customer-owned IP address (CoIP) is enabled for an RDS on Outposts DB instance. A <i>CoIP </i>provides local or external connectivity to resources in your Outpost subnets through your on-premises network. For some use cases, a CoIP can provide lower latency for connections to the DB instance from outside of its virtual private cloud (VPC) on your local network. For more information about RDS on Outposts, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-on-outposts.html">Working with Amazon RDS on Amazon Web Services Outposts</a> in the <i>Amazon RDS User Guide</i>. For more information about CoIPs, see <a href="https://docs.aws.amazon.com/outposts/latest/userguide/outposts-networking-components.html#ip-addressing">Customer-owned IP addresses</a> in the <i>Amazon Web Services Outposts User Guide</i>.<br>
## `db_cluster_identifier`
**Type**: `STRING`<br>
**Provider name**: `DBClusterIdentifier`<br>
**Description**: If the DB instance is a member of a DB cluster, contains the name of the DB cluster that the DB instance is a member of.<br>
## `db_instance_arn`
**Type**: `STRING`<br>
**Provider name**: `DBInstanceArn`<br>
**Description**: The Amazon Resource Name (ARN) for the DB instance.<br>
## `db_instance_automated_backups_replications`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DBInstanceAutomatedBackupsReplications`<br>
**Description**: The list of replicated automated backups associated with the DB instance.<br>
   - `db_instance_automated_backups_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBInstanceAutomatedBackupsArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the replicated automated backups.<br>
## `db_instance_class`
**Type**: `STRING`<br>
**Provider name**: `DBInstanceClass`<br>
**Description**: Contains the name of the compute and memory capacity class of the DB instance.<br>
## `db_instance_identifier`
**Type**: `STRING`<br>
**Provider name**: `DBInstanceIdentifier`<br>
**Description**: Contains a user-supplied database identifier. This identifier is the unique key that identifies a DB instance.<br>
## `db_instance_port`
**Type**: `INT32`<br>
**Provider name**: `DbInstancePort`<br>
**Description**: Specifies the port that the DB instance listens on. If the DB instance is part of a DB cluster, this can be a different port than the DB cluster port.<br>
## `db_instance_status`
**Type**: `STRING`<br>
**Provider name**: `DBInstanceStatus`<br>
**Description**: Specifies the current state of this database. For information about DB instance statuses, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/accessing-monitoring.html#Overview.DBInstance.Status">Viewing DB instance status</a> in the <i>Amazon RDS User Guide.</i><br>
## `db_name`
**Type**: `STRING`<br>
**Provider name**: `DBName`<br>
**Description**: The meaning of this parameter differs according to the database engine you use.  <b>MySQL, MariaDB, SQL Server, PostgreSQL</b>  Contains the name of the initial database of this instance that was provided at create time, if one was specified when the DB instance was created. This same name is returned for the life of the DB instance. Type: String  <b>Oracle</b>  Contains the Oracle System ID (SID) of the created DB instance. Not shown when the returned parameters do not apply to an Oracle DB instance.<br>
## `db_parameter_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DBParameterGroups`<br>
**Description**: Provides the list of DB parameter groups applied to this DB instance.<br>
   - `db_parameter_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBParameterGroupName`<br>
    **Description**: The name of the DB parameter group.<br>
   - `parameter_apply_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ParameterApplyStatus`<br>
    **Description**: The status of parameter updates.<br>
## `db_security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DBSecurityGroups`<br>
**Description**: A list of DB security group elements containing <code>DBSecurityGroup.Name</code> and <code>DBSecurityGroup.Status</code> subelements.<br>
   - `db_security_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBSecurityGroupName`<br>
    **Description**: The name of the DB security group.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the DB security group.<br>
## `db_subnet_group`
**Type**: `STRUCT`<br>
**Provider name**: `DBSubnetGroup`<br>
**Description**: Specifies information on the subnet group associated with the DB instance, including the name, description, and subnets in the subnet group.<br>
   - `db_subnet_group_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBSubnetGroupArn`<br>
    **Description**: The Amazon Resource Name (ARN) for the DB subnet group.<br>
   - `db_subnet_group_description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBSubnetGroupDescription`<br>
    **Description**: Provides the description of the DB subnet group.<br>
   - `db_subnet_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBSubnetGroupName`<br>
    **Description**: The name of the DB subnet group.<br>
   - `subnet_group_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SubnetGroupStatus`<br>
    **Description**: Provides the status of the DB subnet group.<br>
   - `subnets`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Subnets`<br>
    **Description**: Contains a list of <code>Subnet</code> elements.<br>
       - `subnet_availability_zone`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `SubnetAvailabilityZone`<br>
           - `name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Name`<br>
            **Description**: The name of the Availability Zone.<br>
       - `subnet_identifier`<br>
        **Type**: `STRING`<br>
        **Provider name**: `SubnetIdentifier`<br>
        **Description**: The identifier of the subnet.<br>
       - `subnet_outpost`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `SubnetOutpost`<br>
        **Description**: If the subnet is associated with an Outpost, this value specifies the Outpost. For more information about RDS on Outposts, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-on-outposts.html">Amazon RDS on Amazon Web Services Outposts</a> in the <i>Amazon RDS User Guide.</i><br>
           - `arn`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Arn`<br>
            **Description**: The Amazon Resource Name (ARN) of the Outpost.<br>
       - `subnet_status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `SubnetStatus`<br>
        **Description**: The status of the subnet.<br>
   - `supported_network_types`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SupportedNetworkTypes`<br>
    **Description**: The network type of the DB subnet group. Valid values: <ul> <li>  <code>IPV4</code>  </li> <li>  <code>DUAL</code>  </li> </ul> A <code>DBSubnetGroup</code> can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (<code>DUAL</code>). For more information, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html"> Working with a DB instance in a VPC</a> in the <i>Amazon RDS User Guide.</i><br>
   - `vpc_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **Description**: Provides the VpcId of the DB subnet group.<br>
## `dbi_resource_id`
**Type**: `STRING`<br>
**Provider name**: `DbiResourceId`<br>
**Description**: The Amazon Web Services Region-unique, immutable identifier for the DB instance. This identifier is found in Amazon Web Services CloudTrail log entries whenever the Amazon Web Services KMS key for the DB instance is accessed.<br>
## `deletion_protection`
**Type**: `BOOLEAN`<br>
**Provider name**: `DeletionProtection`<br>
**Description**: Indicates if the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. For more information, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html"> Deleting a DB Instance</a>.<br>
## `domain_memberships`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DomainMemberships`<br>
**Description**: The Active Directory Domain membership records associated with the DB instance.<br>
   - `domain`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Domain`<br>
    **Description**: The identifier of the Active Directory Domain.<br>
   - `fqdn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `FQDN`<br>
    **Description**: The fully qualified domain name of the Active Directory Domain.<br>
   - `iam_role_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IAMRoleName`<br>
    **Description**: The name of the IAM role to be used when making API calls to the Directory Service.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the Active Directory Domain membership for the DB instance or cluster. Values include joined, pending-join, failed, and so on.<br>
## `enabled_cloudwatch_logs_exports`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `EnabledCloudwatchLogsExports`<br>
**Description**: A list of log types that this DB instance is configured to export to CloudWatch Logs. Log types vary by DB engine. For information about the log types for each DB engine, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html">Amazon RDS Database Log Files</a> in the <i>Amazon RDS User Guide.</i><br>
## `endpoint`
**Type**: `STRUCT`<br>
**Provider name**: `Endpoint`<br>
**Description**: Specifies the connection endpoint. <note> The endpoint might not be shown for instances whose status is <code>creating</code>. </note><br>
   - `address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Address`<br>
    **Description**: Specifies the DNS address of the DB instance.<br>
   - `hosted_zone_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HostedZoneId`<br>
    **Description**: Specifies the ID that Amazon Route 53 assigns when you create a hosted zone.<br>
   - `port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Port`<br>
    **Description**: Specifies the port that the database engine is listening on.<br>
## `engine`
**Type**: `STRING`<br>
**Provider name**: `Engine`<br>
**Description**: The name of the database engine to be used for this DB instance.<br>
## `engine_version`
**Type**: `STRING`<br>
**Provider name**: `EngineVersion`<br>
**Description**: Indicates the database engine version.<br>
## `enhanced_monitoring_resource_arn`
**Type**: `STRING`<br>
**Provider name**: `EnhancedMonitoringResourceArn`<br>
**Description**: The Amazon Resource Name (ARN) of the Amazon CloudWatch Logs log stream that receives the Enhanced Monitoring metrics data for the DB instance.<br>
## `iam_database_authentication_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `IAMDatabaseAuthenticationEnabled`<br>
**Description**: True if mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts is enabled, and otherwise false. IAM database authentication can be enabled for the following database engines <ul> <li> For MySQL 5.6, minor version 5.6.34 or higher </li> <li> For MySQL 5.7, minor version 5.7.16 or higher </li> <li> Aurora 5.6 or higher. To enable IAM database authentication for Aurora, see DBCluster Type. </li> </ul>
## `instance_create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `InstanceCreateTime`<br>
**Description**: Provides the date and time the DB instance was created.<br>
## `iops`
**Type**: `INT32`<br>
**Provider name**: `Iops`<br>
**Description**: Specifies the Provisioned IOPS (I/O operations per second) value.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: If <code>StorageEncrypted</code> is true, the Amazon Web Services KMS key identifier for the encrypted DB instance. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.<br>
## `latest_restorable_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `LatestRestorableTime`<br>
**Description**: Specifies the latest time to which a database can be restored with point-in-time restore.<br>
## `license_model`
**Type**: `STRING`<br>
**Provider name**: `LicenseModel`<br>
**Description**: License model information for this DB instance. This setting doesn't apply to RDS Custom.<br>
## `listener_endpoint`
**Type**: `STRUCT`<br>
**Provider name**: `ListenerEndpoint`<br>
**Description**: Specifies the listener connection endpoint for SQL Server Always On.<br>
   - `address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Address`<br>
    **Description**: Specifies the DNS address of the DB instance.<br>
   - `hosted_zone_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HostedZoneId`<br>
    **Description**: Specifies the ID that Amazon Route 53 assigns when you create a hosted zone.<br>
   - `port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Port`<br>
    **Description**: Specifies the port that the database engine is listening on.<br>
## `master_username`
**Type**: `STRING`<br>
**Provider name**: `MasterUsername`<br>
**Description**: Contains the master username for the DB instance.<br>
## `max_allocated_storage`
**Type**: `INT32`<br>
**Provider name**: `MaxAllocatedStorage`<br>
**Description**: The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance.<br>
## `monitoring_interval`
**Type**: `INT32`<br>
**Provider name**: `MonitoringInterval`<br>
**Description**: The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance.<br>
## `monitoring_role_arn`
**Type**: `STRING`<br>
**Provider name**: `MonitoringRoleArn`<br>
**Description**: The ARN for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs.<br>
## `multi_az`
**Type**: `BOOLEAN`<br>
**Provider name**: `MultiAZ`<br>
**Description**: Specifies if the DB instance is a Multi-AZ deployment. This setting doesn't apply to RDS Custom.<br>
## `nchar_character_set_name`
**Type**: `STRING`<br>
**Provider name**: `NcharCharacterSetName`<br>
**Description**: The name of the NCHAR character set for the Oracle DB instance. This character set specifies the Unicode encoding for data stored in table columns of type NCHAR, NCLOB, or NVARCHAR2.<br>
## `network_type`
**Type**: `STRING`<br>
**Provider name**: `NetworkType`<br>
**Description**: The network type of the DB instance. Valid values: <ul> <li>  <code>IPV4</code>  </li> <li>  <code>DUAL</code>  </li> </ul> <p>The network type is determined by the <code>DBSubnetGroup</code> specified for the DB instance. A <code>DBSubnetGroup</code> can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (<code>DUAL</code>). For more information, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html"> Working with a DB instance in a VPC</a> in the <i>Amazon RDS User Guide</i> and <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html"> Working with a DB instance in a VPC</a> in the <i>Amazon Aurora User Guide.</i></p>
## `option_group_memberships`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `OptionGroupMemberships`<br>
**Description**: Provides the list of option group memberships for this DB instance.<br>
   - `option_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `OptionGroupName`<br>
    **Description**: The name of the option group that the instance belongs to.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the DB instance's option group membership. Valid values are: <code>in-sync</code>, <code>pending-apply</code>, <code>pending-removal</code>, <code>pending-maintenance-apply</code>, <code>pending-maintenance-removal</code>, <code>applying</code>, <code>removing</code>, and <code>failed</code>.<br>
## `pending_modified_values`
**Type**: `STRUCT`<br>
**Provider name**: `PendingModifiedValues`<br>
**Description**: A value that specifies that changes to the DB instance are pending. This element is only included when changes are pending. Specific changes are identified by subelements.<br>
   - `allocated_storage`<br>
    **Type**: `INT32`<br>
    **Provider name**: `AllocatedStorage`<br>
    **Description**: The allocated storage size for the DB instance specified in gibibytes (GiB).<br>
   - `automation_mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AutomationMode`<br>
    **Description**: The automation mode of the RDS Custom DB instance: <code>full</code> or <code>all-paused</code>. If <code>full</code>, the DB instance automates monitoring and instance recovery. If <code>all-paused</code>, the instance pauses automation for the duration set by <code>--resume-full-automation-mode-minutes</code>.<br>
   - `backup_retention_period`<br>
    **Type**: `INT32`<br>
    **Provider name**: `BackupRetentionPeriod`<br>
    **Description**: The number of days for which automated backups are retained.<br>
   - `ca_certificate_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CACertificateIdentifier`<br>
    **Description**: The identifier of the CA certificate for the DB instance.<br>
   - `db_instance_class`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBInstanceClass`<br>
    **Description**: The name of the compute and memory capacity class for the DB instance.<br>
   - `db_instance_identifier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBInstanceIdentifier`<br>
    **Description**: The database identifier for the DB instance.<br>
   - `db_subnet_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DBSubnetGroupName`<br>
    **Description**: The DB subnet group for the DB instance.<br>
   - `engine_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `EngineVersion`<br>
    **Description**: The database engine version.<br>
   - `iam_database_authentication_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IAMDatabaseAuthenticationEnabled`<br>
    **Description**: Whether mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts is enabled.<br>
   - `iops`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Iops`<br>
    **Description**: The Provisioned IOPS value for the DB instance.<br>
   - `license_model`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LicenseModel`<br>
    **Description**: The license model for the DB instance. Valid values: <code>license-included</code> | <code>bring-your-own-license</code> | <code>general-public-license</code><br>
   - `master_user_password`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MasterUserPassword`<br>
    **Description**: The master credentials for the DB instance.<br>
   - `multi_az`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `MultiAZ`<br>
    **Description**: A value that indicates that the Single-AZ DB instance will change to a Multi-AZ deployment.<br>
   - `pending_cloudwatch_logs_exports`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `PendingCloudwatchLogsExports`<br>
       - `log_types_to_disable`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `LogTypesToDisable`<br>
        **Description**: Log types that are in the process of being enabled. After they are enabled, these log types are exported to CloudWatch Logs.<br>
       - `log_types_to_enable`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `LogTypesToEnable`<br>
        **Description**: Log types that are in the process of being deactivated. After they are deactivated, these log types aren't exported to CloudWatch Logs.<br>
   - `port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Port`<br>
    **Description**: The port for the DB instance.<br>
   - `processor_features`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `ProcessorFeatures`<br>
    **Description**: The number of CPU cores and the number of threads per core for the DB instance class of the DB instance.<br>
       - `name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Name`<br>
        **Description**: The name of the processor feature. Valid names are <code>coreCount</code> and <code>threadsPerCore</code>.<br>
       - `value`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Value`<br>
        **Description**: The value of a processor feature name.<br>
   - `resume_full_automation_mode_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `ResumeFullAutomationModeTime`<br>
    **Description**: The number of minutes to pause the automation. When the time period ends, RDS Custom resumes full automation. The minimum value is 60 (default). The maximum value is 1,440.<br>
   - `storage_throughput`<br>
    **Type**: `INT32`<br>
    **Provider name**: `StorageThroughput`<br>
    **Description**: The storage throughput of the DB instance.<br>
   - `storage_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `StorageType`<br>
    **Description**: The storage type of the DB instance.<br>
## `performance_insights_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `PerformanceInsightsEnabled`<br>
**Description**: True if Performance Insights is enabled for the DB instance, and otherwise false.<br>
## `performance_insights_kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `PerformanceInsightsKMSKeyId`<br>
**Description**: The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.<br>
## `performance_insights_retention_period`
**Type**: `INT32`<br>
**Provider name**: `PerformanceInsightsRetentionPeriod`<br>
**Description**: The number of days to retain Performance Insights data. The default is 7 days. The following values are valid: <ul> <li> 7 </li> <li>  <i>month</i> * 31, where <i>month</i> is a number of months from 1-23 </li> <li> 731 </li> </ul> <p>For example, the following values are valid:</p> <ul> <li> 93 (3 months * 31) </li> <li> 341 (11 months * 31) </li> <li> 589 (19 months * 31) </li> <li> 731 </li> </ul>
## `preferred_backup_window`
**Type**: `STRING`<br>
**Provider name**: `PreferredBackupWindow`<br>
**Description**: Specifies the daily time range during which automated backups are created if automated backups are enabled, as determined by the <code>BackupRetentionPeriod</code>.<br>
## `preferred_maintenance_window`
**Type**: `STRING`<br>
**Provider name**: `PreferredMaintenanceWindow`<br>
**Description**: Specifies the weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).<br>
## `processor_features`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ProcessorFeatures`<br>
**Description**: The number of CPU cores and the number of threads per core for the DB instance class of the DB instance.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: The name of the processor feature. Valid names are <code>coreCount</code> and <code>threadsPerCore</code>.<br>
   - `value`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Value`<br>
    **Description**: The value of a processor feature name.<br>
## `promotion_tier`
**Type**: `INT32`<br>
**Provider name**: `PromotionTier`<br>
**Description**: A value that specifies the order in which an Aurora Replica is promoted to the primary instance after a failure of the existing primary instance. For more information, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.FaultTolerance"> Fault Tolerance for an Aurora DB Cluster</a> in the <i>Amazon Aurora User Guide</i>.<br>
## `publicly_accessible`
**Type**: `BOOLEAN`<br>
**Provider name**: `PubliclyAccessible`<br>
**Description**: Specifies the accessibility options for the DB instance. When the DB cluster is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB cluster's virtual private cloud (VPC). It resolves to the public IP address from outside of the DB cluster's VPC. Access to the DB cluster is ultimately controlled by the security group it uses. That public access isn't permitted if the security group assigned to the DB cluster doesn't permit it. When the DB instance isn't publicly accessible, it is an internal DB instance with a DNS name that resolves to a private IP address. For more information, see CreateDBInstance.<br>
## `read_replica_db_cluster_identifiers`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `ReadReplicaDBClusterIdentifiers`<br>
**Description**: Contains one or more identifiers of Aurora DB clusters to which the RDS DB instance is replicated as a read replica. For example, when you create an Aurora read replica of an RDS for MySQL DB instance, the Aurora MySQL DB cluster for the Aurora read replica is shown. This output doesn't contain information about cross-Region Aurora read replicas. <note> Currently, each RDS DB instance can have only one Aurora read replica. </note><br>
## `read_replica_db_instance_identifiers`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `ReadReplicaDBInstanceIdentifiers`<br>
**Description**: Contains one or more identifiers of the read replicas associated with this DB instance.<br>
## `read_replica_source_db_instance_identifier`
**Type**: `STRING`<br>
**Provider name**: `ReadReplicaSourceDBInstanceIdentifier`<br>
**Description**: Contains the identifier of the source DB instance if this DB instance is a read replica.<br>
## `replica_mode`
**Type**: `STRING`<br>
**Provider name**: `ReplicaMode`<br>
**Description**: The open mode of an Oracle read replica. The default is <code>open-read-only</code>. For more information, see <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-read-replicas.html">Working with Oracle Read Replicas for Amazon RDS</a> in the <i>Amazon RDS User Guide</i>. <note> This attribute is only supported in RDS for Oracle. </note><br>
## `resume_full_automation_mode_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `ResumeFullAutomationModeTime`<br>
**Description**: The number of minutes to pause the automation. When the time period ends, RDS Custom resumes full automation. The minimum value is 60 (default). The maximum value is 1,440.<br>
## `secondary_availability_zone`
**Type**: `STRING`<br>
**Provider name**: `SecondaryAvailabilityZone`<br>
**Description**: If present, specifies the name of the secondary Availability Zone for a DB instance with multi-AZ support.<br>
## `status_infos`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `StatusInfos`<br>
**Description**: The status of a read replica. If the instance isn't a read replica, this is blank.<br>
   - `message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Message`<br>
    **Description**: Details of the error if there is an error for the instance. If the instance isn't in an error state, this value is blank.<br>
   - `normal`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Normal`<br>
    **Description**: Boolean value that is true if the instance is operating normally, or false if the instance is in an error state.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: Status of the DB instance. For a StatusType of read replica, the values can be replicating, replication stop point set, replication stop point reached, error, stopped, or terminated.<br>
   - `status_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `StatusType`<br>
    **Description**: This value is currently "read replication."<br>
## `storage_encrypted`
**Type**: `BOOLEAN`<br>
**Provider name**: `StorageEncrypted`<br>
**Description**: Specifies whether the DB instance is encrypted.<br>
## `storage_throughput`
**Type**: `INT32`<br>
**Provider name**: `StorageThroughput`<br>
**Description**: Specifies the storage throughput for the DB instance.<br>
## `storage_type`
**Type**: `STRING`<br>
**Provider name**: `StorageType`<br>
**Description**: Specifies the storage type associated with the DB instance.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tde_credential_arn`
**Type**: `STRING`<br>
**Provider name**: `TdeCredentialArn`<br>
**Description**: The ARN from the key store with which the instance is associated for TDE encryption.<br>
## `timezone`
**Type**: `STRING`<br>
**Provider name**: `Timezone`<br>
**Description**: The time zone of the DB instance. In most cases, the <code>Timezone</code> element is empty. <code>Timezone</code> content appears only for Microsoft SQL Server DB instances that were created with a time zone specified.<br>
## `vpc_security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `VpcSecurityGroups`<br>
**Description**: Provides a list of VPC security group elements that the DB instance belongs to.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The membership status of the VPC security group. Currently, the only valid status is <code>active</code>.<br>
   - `vpc_security_group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VpcSecurityGroupId`<br>
    **Description**: The name of the VPC security group.<br>
