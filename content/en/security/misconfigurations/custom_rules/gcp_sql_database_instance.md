---
dependencies: []
disable_edit: true
---
# gcp_sql_database_instance

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `available_maintenance_versions`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `availableMaintenanceVersions`<br>
**Description**: List all maintenance versions applicable on the instance<br>
## `backend_type`
**Type**: `STRING`<br>
**Provider name**: `backendType`<br>
**Description**: The backend type. `SECOND_GEN`: Cloud SQL database instance. `EXTERNAL`: A database server that is not managed by Google. This property is read-only; use the `tier` property in the `settings` object to determine the database type. <br>
**Possible values**:<br>
  - `SQL_BACKEND_TYPE_UNSPECIFIED` - This is an unknown backend type for instance.<br>
  - `FIRST_GEN` - V1 speckle instance.<br>
  - `SECOND_GEN` - V2 speckle instance.<br>
  - `EXTERNAL` - On premises instance.<br>
## `connection_name`
**Type**: `STRING`<br>
**Provider name**: `connectionName`<br>
**Description**: Connection name of the Cloud SQL instance used in connection strings.<br>
## `create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `createTime`<br>
**Description**: Output only. The time when the instance was created in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.<br>
## `current_disk_size`
**Type**: `INT64`<br>
**Provider name**: `currentDiskSize`<br>
**Description**: The current disk usage of the instance in bytes. This property has been deprecated. Use the "cloudsql.googleapis.com/database/disk/bytes_used" metric in Cloud Monitoring API instead. Please see [this announcement](https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ) for details.<br>
## `database_installed_version`
**Type**: `STRING`<br>
**Provider name**: `databaseInstalledVersion`<br>
**Description**: Output only. Stores the current database version running on the instance including minor version such as `MYSQL_8_0_18`.<br>
## `database_version`
**Type**: `STRING`<br>
**Provider name**: `databaseVersion`<br>
**Description**: The database engine type and version. The `databaseVersion` field cannot be changed after instance creation. <br>
**Possible values**:<br>
  - `SQL_DATABASE_VERSION_UNSPECIFIED` - This is an unknown database version.<br>
  - `MYSQL_5_1` - The database version is MySQL 5.1.<br>
  - `MYSQL_5_5` - The database version is MySQL 5.5.<br>
  - `MYSQL_5_6` - The database version is MySQL 5.6.<br>
  - `MYSQL_5_7` - The database version is MySQL 5.7.<br>
  - `SQLSERVER_2017_STANDARD` - The database version is SQL Server 2017 Standard.<br>
  - `SQLSERVER_2017_ENTERPRISE` - The database version is SQL Server 2017 Enterprise.<br>
  - `SQLSERVER_2017_EXPRESS` - The database version is SQL Server 2017 Express.<br>
  - `SQLSERVER_2017_WEB` - The database version is SQL Server 2017 Web.<br>
  - `POSTGRES_9_6` - The database version is PostgreSQL 9.6.<br>
  - `POSTGRES_10` - The database version is PostgreSQL 10.<br>
  - `POSTGRES_11` - The database version is PostgreSQL 11.<br>
  - `POSTGRES_12` - The database version is PostgreSQL 12.<br>
  - `POSTGRES_13` - The database version is PostgreSQL 13.<br>
  - `POSTGRES_14` - The database version is PostgreSQL 14.<br>
  - `MYSQL_8_0` - The database version is MySQL 8.<br>
  - `MYSQL_8_0_18` - The database major version is MySQL 8.0 and the minor version is 18.<br>
  - `MYSQL_8_0_26` - The database major version is MySQL 8.0 and the minor version is 26.<br>
  - `MYSQL_8_0_27` - The database major version is MySQL 8.0 and the minor version is 27.<br>
  - `MYSQL_8_0_28` - The database major version is MySQL 8.0 and the minor version is 28.<br>
  - `MYSQL_8_0_29` - The database major version is MySQL 8.0 and the minor version is 29.<br>
  - `MYSQL_8_0_30` - The database major version is MySQL 8.0 and the minor version is 30.<br>
  - `MYSQL_8_0_31` - The database major version is MySQL 8.0 and the minor version is 31.<br>
  - `MYSQL_8_0_32` - The database major version is MySQL 8.0 and the minor version is 32.<br>
  - `SQLSERVER_2019_STANDARD` - The database version is SQL Server 2019 Standard.<br>
  - `SQLSERVER_2019_ENTERPRISE` - The database version is SQL Server 2019 Enterprise.<br>
  - `SQLSERVER_2019_EXPRESS` - The database version is SQL Server 2019 Express.<br>
  - `SQLSERVER_2019_WEB` - The database version is SQL Server 2019 Web.<br>
## `disk_encryption_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `diskEncryptionConfiguration`<br>
**Description**: Disk encryption configuration specific to an instance.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#diskEncryptionConfiguration`.<br>
   - `kms_key_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kmsKeyName`<br>
    **Description**: Resource name of KMS key for disk encryption<br>
## `disk_encryption_status`
**Type**: `STRUCT`<br>
**Provider name**: `diskEncryptionStatus`<br>
**Description**: Disk encryption status specific to an instance.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#diskEncryptionStatus`.<br>
   - `kms_key_version_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kmsKeyVersionName`<br>
    **Description**: KMS key version used to encrypt the Cloud SQL instance resource<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: This field is deprecated and will be removed from a future version of the API. Use the `settings.settingsVersion` field instead.<br>
## `failover_replica`
**Type**: `STRUCT`<br>
**Provider name**: `failoverReplica`<br>
**Description**: The name and status of the failover replica.<br>
   - `available`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `available`<br>
    **Description**: The availability status of the failover replica. A false status indicates that the failover replica is out of sync. The primary instance can only failover to the failover replica when the status is true.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the failover replica. If specified at instance creation, a failover replica is created for the instance. The name doesn't include the project ID.<br>
## `gce_zone`
**Type**: `STRING`<br>
**Provider name**: `gceZone`<br>
**Description**: The Compute Engine zone that the instance is currently serving from. This value could be different from the zone that was specified when the instance was created if the instance has failed over to its secondary zone. WARNING: Changing this might restart the instance.<br>
## `instance_type`
**Type**: `STRING`<br>
**Provider name**: `instanceType`<br>
**Description**: The instance type. <br>
**Possible values**:<br>
  - `SQL_INSTANCE_TYPE_UNSPECIFIED` - This is an unknown Cloud SQL instance type.<br>
  - `CLOUD_SQL_INSTANCE` - A regular Cloud SQL instance that is not replicating from a primary instance.<br>
  - `ON_PREMISES_INSTANCE` - An instance running on the customer's premises that is not managed by Cloud SQL.<br>
  - `READ_REPLICA_INSTANCE` - A Cloud SQL instance acting as a read-replica.<br>
## `ip_addresses`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ipAddresses`<br>
**Description**: The assigned IP addresses for the instance.<br>
   - `ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ipAddress`<br>
    **Description**: The IP address assigned.<br>
   - `time_to_retire`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `timeToRetire`<br>
    **Description**: The due time for this IP to be retired in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. This field is only available when the IP is scheduled to be retired.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of this IP address. A `PRIMARY` address is a public address that can accept incoming connections. A `PRIVATE` address is a private address that can accept incoming connections. An `OUTGOING` address is the source address of connections originating from the instance, if supported. <br>
    **Possible values**:<br>
      - `SQL_IP_ADDRESS_TYPE_UNSPECIFIED` - This is an unknown IP address type.<br>
      - `PRIMARY` - IP address the customer is supposed to connect to. Usually this is the load balancer's IP address<br>
      - `OUTGOING` - Source IP address of the connection a read replica establishes to its external primary instance. This IP address can be allowlisted by the customer in case it has a firewall that filters incoming connection to its on premises primary instance.<br>
      - `PRIVATE` - Private IP used when using private IPs and network peering.<br>
      - `MIGRATED_1ST_GEN` - V1 IP of a migrated instance. We want the user to decommission this IP as soon as the migration is complete. Note: V1 instances with V1 ip addresses will be counted as PRIMARY.<br>
## `ipv6_address`
**Type**: `STRING`<br>
**Provider name**: `ipv6Address`<br>
**Description**: The IPv6 address assigned to the instance. (Deprecated) This property was applicable only to First Generation instances.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: This is always `sql#instance`.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `maintenance_version`
**Type**: `STRING`<br>
**Provider name**: `maintenanceVersion`<br>
**Description**: The current software version on the instance.<br>
## `master_instance_name`
**Type**: `STRING`<br>
**Provider name**: `masterInstanceName`<br>
**Description**: The name of the instance which will act as primary in the replication setup.<br>
## `max_disk_size`
**Type**: `INT64`<br>
**Provider name**: `maxDiskSize`<br>
**Description**: The maximum disk size of the instance in bytes.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Name of the Cloud SQL instance. This does not include the project ID.<br>
## `on_premises_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `onPremisesConfiguration`<br>
**Description**: Configuration specific to on-premises instances.<br>
   - `ca_certificate`<br>
    **Type**: `STRING`<br>
    **Provider name**: `caCertificate`<br>
    **Description**: PEM representation of the trusted CA's x509 certificate.<br>
   - `client_certificate`<br>
    **Type**: `STRING`<br>
    **Provider name**: `clientCertificate`<br>
    **Description**: PEM representation of the replica's x509 certificate.<br>
   - `client_key`<br>
    **Type**: `STRING`<br>
    **Provider name**: `clientKey`<br>
    **Description**: PEM representation of the replica's private key. The corresponsing public key is encoded in the client's certificate.<br>
   - `dump_file_path`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dumpFilePath`<br>
    **Description**: The dump file to create the Cloud SQL replica.<br>
   - `host_port`<br>
    **Type**: `STRING`<br>
    **Provider name**: `hostPort`<br>
    **Description**: The host and port of the on-premises instance in host:port format<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#onPremisesConfiguration`.<br>
   - `password`<br>
    **Type**: `STRING`<br>
    **Provider name**: `password`<br>
    **Description**: The password for connecting to on-premises instance.<br>
   - `source_instance`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `sourceInstance`<br>
    **Description**: The reference to Cloud SQL instance if the source is Cloud SQL.<br>
       - `name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `name`<br>
        **Description**: The name of the Cloud SQL instance being referenced. This does not include the project ID.<br>
       - `project`<br>
        **Type**: `STRING`<br>
        **Provider name**: `project`<br>
        **Description**: The project ID of the Cloud SQL instance being referenced. The default is the same project ID as the instance references it.<br>
       - `region`<br>
        **Type**: `STRING`<br>
        **Provider name**: `region`<br>
        **Description**: The region of the Cloud SQL instance being referenced.<br>
   - `username`<br>
    **Type**: `STRING`<br>
    **Provider name**: `username`<br>
    **Description**: The username for connecting to on-premises instance.<br>
## `organization_id`
**Type**: `STRING`<br>
## `out_of_disk_report`
**Type**: `STRUCT`<br>
**Provider name**: `outOfDiskReport`<br>
**Description**: This field represents the report generated by the proactive database wellness job for OutOfDisk issues. * Writers: * the proactive database wellness job for OOD. * Readers: * the proactive database wellness job<br>
   - `sql_min_recommended_increase_size_gb`<br>
    **Type**: `INT32`<br>
    **Provider name**: `sqlMinRecommendedIncreaseSizeGb`<br>
    **Description**: The minimum recommended increase size in GigaBytes This field is consumed by the frontend * Writers: * the proactive database wellness job for OOD. * Readers:<br>
   - `sql_out_of_disk_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sqlOutOfDiskState`<br>
    **Description**: This field represents the state generated by the proactive database wellness job for OutOfDisk issues. * Writers: * the proactive database wellness job for OOD. * Readers: * the proactive database wellness job <br>
    **Possible values**:<br>
      - `SQL_OUT_OF_DISK_STATE_UNSPECIFIED` - Unspecified state<br>
      - `NORMAL` - The instance has plenty space on data disk<br>
      - `SOFT_SHUTDOWN` - Data disk is almost used up. It is shutdown to prevent data corruption.<br>
## `parent`
**Type**: `STRING`<br>
## `project`
**Type**: `STRING`<br>
**Provider name**: `project`<br>
**Description**: The project ID of the project containing the Cloud SQL instance. The Google apps domain is prefixed if applicable.<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `region`
**Type**: `STRING`<br>
**Provider name**: `region`<br>
**Description**: The geographical region. Can be: * `us-central` (`FIRST_GEN` instances only) * `us-central1` (`SECOND_GEN` instances only) * `asia-east1` or `europe-west1`. Defaults to `us-central` or `us-central1` depending on the instance type. The region cannot be changed after instance creation.<br>
## `replica_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `replicaConfiguration`<br>
**Description**: Configuration specific to failover replicas and read replicas.<br>
   - `failover_target`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `failoverTarget`<br>
    **Description**: Specifies if the replica is the failover target. If the field is set to `true` the replica will be designated as a failover replica. In case the primary instance fails, the replica instance will be promoted as the new primary instance. Only one replica can be specified as failover target, and the replica has to be in different zone with the primary instance.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#replicaConfiguration`.<br>
   - `mysql_replica_configuration`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `mysqlReplicaConfiguration`<br>
    **Description**: MySQL specific configuration when replicating from a MySQL on-premises primary instance. Replication configuration information such as the username, password, certificates, and keys are not stored in the instance metadata. The configuration information is used only to set up the replication connection and is stored by MySQL in a file named `master.info` in the data directory.<br>
       - `ca_certificate`<br>
        **Type**: `STRING`<br>
        **Provider name**: `caCertificate`<br>
        **Description**: PEM representation of the trusted CA's x509 certificate.<br>
       - `client_certificate`<br>
        **Type**: `STRING`<br>
        **Provider name**: `clientCertificate`<br>
        **Description**: PEM representation of the replica's x509 certificate.<br>
       - `client_key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `clientKey`<br>
        **Description**: PEM representation of the replica's private key. The corresponsing public key is encoded in the client's certificate.<br>
       - `connect_retry_interval`<br>
        **Type**: `INT32`<br>
        **Provider name**: `connectRetryInterval`<br>
        **Description**: Seconds to wait between connect retries. MySQL's default is 60 seconds.<br>
       - `dump_file_path`<br>
        **Type**: `STRING`<br>
        **Provider name**: `dumpFilePath`<br>
        **Description**: Path to a SQL dump file in Google Cloud Storage from which the replica instance is to be created. The URI is in the form gs://bucketName/fileName. Compressed gzip files (.gz) are also supported. Dumps have the binlog co-ordinates from which replication begins. This can be accomplished by setting --master-data to 1 when using mysqldump.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always `sql#mysqlReplicaConfiguration`.<br>
       - `master_heartbeat_period`<br>
        **Type**: `INT64`<br>
        **Provider name**: `masterHeartbeatPeriod`<br>
        **Description**: Interval in milliseconds between replication heartbeats.<br>
       - `password`<br>
        **Type**: `STRING`<br>
        **Provider name**: `password`<br>
        **Description**: The password for the replication connection.<br>
       - `ssl_cipher`<br>
        **Type**: `STRING`<br>
        **Provider name**: `sslCipher`<br>
        **Description**: A list of permissible ciphers to use for SSL encryption.<br>
       - `username`<br>
        **Type**: `STRING`<br>
        **Provider name**: `username`<br>
        **Description**: The username for the replication connection.<br>
       - `verify_server_certificate`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `verifyServerCertificate`<br>
        **Description**: Whether or not to check the primary instance's Common Name value in the certificate that it sends during the SSL handshake.<br>
## `replica_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `replicaNames`<br>
**Description**: The replicas of the instance.<br>
## `resource_name`
**Type**: `STRING`<br>
## `root_password`
**Type**: `STRING`<br>
**Provider name**: `rootPassword`<br>
**Description**: Initial root password. Use only on creation. You must set root passwords before you can connect to PostgreSQL instances.<br>
## `satisfies_pzs`
**Type**: `BOOLEAN`<br>
**Provider name**: `satisfiesPzs`<br>
**Description**: The status indicating if instance satisfiesPzs. Reserved for future use.<br>
## `scheduled_maintenance`
**Type**: `STRUCT`<br>
**Provider name**: `scheduledMaintenance`<br>
**Description**: The start time of any upcoming scheduled maintenance for this instance.<br>
   - `can_defer`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `canDefer`<br>
   - `can_reschedule`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `canReschedule`<br>
    **Description**: If the scheduled maintenance can be rescheduled.<br>
   - `schedule_deadline_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `scheduleDeadlineTime`<br>
    **Description**: Maintenance cannot be rescheduled to start beyond this deadline.<br>
   - `start_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `startTime`<br>
    **Description**: The start time of any upcoming scheduled maintenance for this instance.<br>
## `secondary_gce_zone`
**Type**: `STRING`<br>
**Provider name**: `secondaryGceZone`<br>
**Description**: The Compute Engine zone that the failover instance is currently serving from for a regional instance. This value could be different from the zone that was specified when the instance was created if the instance has failed over to its secondary/failover zone.<br>
## `self_link`
**Type**: `STRING`<br>
**Provider name**: `selfLink`<br>
**Description**: The URI of this resource.<br>
## `server_ca_cert`
**Type**: `STRUCT`<br>
**Provider name**: `serverCaCert`<br>
**Description**: SSL configuration.<br>
   - `cert`<br>
    **Type**: `STRING`<br>
    **Provider name**: `cert`<br>
    **Description**: PEM representation.<br>
   - `cert_serial_number`<br>
    **Type**: `STRING`<br>
    **Provider name**: `certSerialNumber`<br>
    **Description**: Serial number, as extracted from the certificate.<br>
   - `common_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `commonName`<br>
    **Description**: User supplied name. Constrained to [a-zA-Z.-_ ]+.<br>
   - `create_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `createTime`<br>
    **Description**: The time when the certificate was created in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.<br>
   - `expiration_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `expirationTime`<br>
    **Description**: The time when the certificate expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.<br>
   - `instance`<br>
    **Type**: `STRING`<br>
    **Provider name**: `instance`<br>
    **Description**: Name of the database instance.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#sslCert`.<br>
   - `self_link`<br>
    **Type**: `STRING`<br>
    **Provider name**: `selfLink`<br>
    **Description**: The URI of this resource.<br>
   - `sha1_fingerprint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sha1Fingerprint`<br>
    **Description**: Sha1 Fingerprint.<br>
## `service_account_email_address`
**Type**: `STRING`<br>
**Provider name**: `serviceAccountEmailAddress`<br>
**Description**: The service account email address assigned to the instance. \This property is read-only.<br>
## `settings`
**Type**: `STRUCT`<br>
**Provider name**: `settings`<br>
**Description**: The user settings.<br>
   - `activation_policy`<br>
    **Type**: `STRING`<br>
    **Provider name**: `activationPolicy`<br>
    **Description**: The activation policy specifies when the instance is activated; it is applicable only when the instance state is RUNNABLE. Valid values: * `ALWAYS`: The instance is on, and remains so even in the absence of connection requests. * `NEVER`: The instance is off; it is not activated, even if a connection request arrives. <br>
    **Possible values**:<br>
      - `SQL_ACTIVATION_POLICY_UNSPECIFIED` - Unknown activation plan.<br>
      - `ALWAYS` - The instance is always up and running.<br>
      - `NEVER` - The instance never starts.<br>
      - `ON_DEMAND` - The instance starts upon receiving requests.<br>
   - `active_directory_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `activeDirectoryConfig`<br>
    **Description**: Active Directory configuration, relevant only for Cloud SQL for SQL Server.<br>
       - `domain`<br>
        **Type**: `STRING`<br>
        **Provider name**: `domain`<br>
        **Description**: The name of the domain (e.g., mydomain.com).<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always sql#activeDirectoryConfig.<br>
   - `authorized_gae_applications`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `authorizedGaeApplications`<br>
    **Description**: The App Engine app IDs that can access this instance. (Deprecated) Applied to First Generation instances only.<br>
   - `availability_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `availabilityType`<br>
    **Description**: Availability type. Potential values: * `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data accessibility. * `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available)./ For more information, see [Overview of the High Availability Configuration](https://cloud.google.com/sql/docs/mysql/high-availability). <br>
    **Possible values**:<br>
      - `SQL_AVAILABILITY_TYPE_UNSPECIFIED` - This is an unknown Availability type.<br>
      - `ZONAL` - Zonal available instance.<br>
      - `REGIONAL` - Regional available instance.<br>
   - `backup_configuration`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `backupConfiguration`<br>
    **Description**: The daily backup configuration for the instance.<br>
       - `backup_retention_settings`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `backupRetentionSettings`<br>
        **Description**: Backup retention settings.<br>
           - `retained_backups`<br>
            **Type**: `INT32`<br>
            **Provider name**: `retainedBackups`<br>
            **Description**: Depending on the value of retention_unit, this is used to determine if a backup needs to be deleted. If retention_unit is 'COUNT', we will retain this many backups.<br>
           - `retention_unit`<br>
            **Type**: `STRING`<br>
            **Provider name**: `retentionUnit`<br>
            **Description**: The unit that 'retained_backups' represents. <br>
            **Possible values**:<br>
              - `RETENTION_UNIT_UNSPECIFIED` - Backup retention unit is unspecified, will be treated as COUNT.<br>
              - `COUNT` - Retention will be by count, eg. 'retain the most recent 7 backups'.<br>
       - `binary_log_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `binaryLogEnabled`<br>
        **Description**: (MySQL only) Whether binary log is enabled. If backup configuration is disabled, binarylog must be disabled as well.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: Whether this configuration is enabled.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always `sql#backupConfiguration`.<br>
       - `location`<br>
        **Type**: `STRING`<br>
        **Provider name**: `location`<br>
        **Description**: Location of the backup<br>
       - `point_in_time_recovery_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `pointInTimeRecoveryEnabled`<br>
        **Description**: (Postgres only) Whether point in time recovery is enabled.<br>
       - `replication_log_archiving_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `replicationLogArchivingEnabled`<br>
        **Description**: Reserved for future use.<br>
       - `start_time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `startTime`<br>
        **Description**: Start time for the daily backup configuration in UTC timezone in the 24 hour format - `HH:MM`.<br>
       - `transaction_log_retention_days`<br>
        **Type**: `INT32`<br>
        **Provider name**: `transactionLogRetentionDays`<br>
        **Description**: The number of days of transaction logs we retain for point in time restore, from 1-7.<br>
   - `collation`<br>
    **Type**: `STRING`<br>
    **Provider name**: `collation`<br>
    **Description**: The name of server Instance collation.<br>
   - `connector_enforcement`<br>
    **Type**: `STRING`<br>
    **Provider name**: `connectorEnforcement`<br>
    **Description**: Specifies if connections must use Cloud SQL connectors. Option values include the following: `NOT_REQUIRED` (Cloud SQL instances can be connected without Cloud SQL Connectors) and `REQUIRED` (Only allow connections that use Cloud SQL Connectors) Note that using REQUIRED disables all existing authorized networks. If this field is not specified when creating a new instance, NOT_REQUIRED is used. If this field is not specified when patching or updating an existing instance, it is left unchanged in the instance. <br>
    **Possible values**:<br>
      - `CONNECTOR_ENFORCEMENT_UNSPECIFIED` - The requirement for Cloud SQL connectors is unknown.<br>
      - `NOT_REQUIRED` - Do not require Cloud SQL connectors.<br>
      - `REQUIRED` - Require all connections to use Cloud SQL connectors, including the Cloud SQL Auth Proxy and Cloud SQL Java, Python, and Go connectors. Note: This disables all existing authorized networks.<br>
   - `crash_safe_replication_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `crashSafeReplicationEnabled`<br>
    **Description**: Configuration specific to read replica instances. Indicates whether database flags for crash-safe replication are enabled. This property was only applicable to First Generation instances.<br>
   - `data_disk_size_gb`<br>
    **Type**: `INT64`<br>
    **Provider name**: `dataDiskSizeGb`<br>
    **Description**: The size of data disk, in GB. The data disk size minimum is 10GB.<br>
   - `data_disk_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `dataDiskType`<br>
    **Description**: The type of data disk: `PD_SSD` (default) or `PD_HDD`. Not used for First Generation instances. <br>
    **Possible values**:<br>
      - `SQL_DATA_DISK_TYPE_UNSPECIFIED` - This is an unknown data disk type.<br>
      - `PD_SSD` - An SSD data disk.<br>
      - `PD_HDD` - An HDD data disk.<br>
      - `OBSOLETE_LOCAL_SSD` - This field is deprecated and will be removed from a future version of the API.<br>
   - `database_flags`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `databaseFlags`<br>
    **Description**: The database flags passed to the instance at startup.<br>
       - `name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `name`<br>
        **Description**: The name of the flag. These flags are passed at instance startup, so include both server options and system variables. Flags are specified with underscores, not hyphens. For more information, see [Configuring Database Flags](https://cloud.google.com/sql/docs/mysql/flags) in the Cloud SQL documentation.<br>
       - `value`<br>
        **Type**: `STRING`<br>
        **Provider name**: `value`<br>
        **Description**: The value of the flag. Boolean flags are set to `on` for true and `off` for false. This field must be omitted if the flag doesn't take a value.<br>
   - `database_replication_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `databaseReplicationEnabled`<br>
    **Description**: Configuration specific to read replica instances. Indicates whether replication is enabled or not. WARNING: Changing this restarts the instance.<br>
   - `deletion_protection_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `deletionProtectionEnabled`<br>
    **Description**: Configuration to protect against accidental instance deletion.<br>
   - `deny_maintenance_periods`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `denyMaintenancePeriods`<br>
    **Description**: Deny maintenance periods<br>
       - `end_date`<br>
        **Type**: `STRING`<br>
        **Provider name**: `endDate`<br>
        **Description**: "deny maintenance period" end date. If the year of the end date is empty, the year of the start date also must be empty. In this case, it means the deny maintenance period recurs every year. The date is in format yyyy-mm-dd i.e., 2020-11-01, or mm-dd, i.e., 11-01<br>
       - `start_date`<br>
        **Type**: `STRING`<br>
        **Provider name**: `startDate`<br>
        **Description**: "deny maintenance period" start date. If the year of the start date is empty, the year of the end date also must be empty. In this case, it means the deny maintenance period recurs every year. The date is in format yyyy-mm-dd i.e., 2020-11-01, or mm-dd, i.e., 11-01<br>
       - `time`<br>
        **Type**: `STRING`<br>
        **Provider name**: `time`<br>
        **Description**: Time in UTC when the "deny maintenance period" starts on start_date and ends on end_date. The time is in format: HH:mm:SS, i.e., 00:00:00<br>
   - `insights_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `insightsConfig`<br>
    **Description**: Insights configuration, for now relevant only for Postgres.<br>
       - `query_insights_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `queryInsightsEnabled`<br>
        **Description**: Whether Query Insights feature is enabled.<br>
       - `query_plans_per_minute`<br>
        **Type**: `INT32`<br>
        **Provider name**: `queryPlansPerMinute`<br>
        **Description**: Number of query execution plans captured by Insights per minute for all queries combined. Default is 5.<br>
       - `query_string_length`<br>
        **Type**: `INT32`<br>
        **Provider name**: `queryStringLength`<br>
        **Description**: Maximum query length stored in bytes. Default value: 1024 bytes. Range: 256-4500 bytes. Query length more than this field value will be truncated to this value. When unset, query length will be the default value. Changing query length will restart the database.<br>
       - `record_application_tags`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `recordApplicationTags`<br>
        **Description**: Whether Query Insights will record application tags from query when enabled.<br>
       - `record_client_address`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `recordClientAddress`<br>
        **Description**: Whether Query Insights will record client address when enabled.<br>
   - `ip_configuration`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ipConfiguration`<br>
    **Description**: The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled for Second Generation instances.<br>
       - `allocated_ip_range`<br>
        **Type**: `STRING`<br>
        **Provider name**: `allocatedIpRange`<br>
        **Description**: The name of the allocated ip range for the private ip Cloud SQL instance. For example: "google-managed-services-default". If set, the instance ip will be created in the allocated range. The range name must comply with [RFC 1035](https://tools.ietf.org/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?.`<br>
       - `authorized_networks`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `authorizedNetworks`<br>
        **Description**: The list of external networks that are allowed to connect to the instance using the IP. In 'CIDR' notation, also known as 'slash' notation (for example: `157.197.200.0/24`).<br>
           - `expiration_time`<br>
            **Type**: `TIMESTAMP`<br>
            **Provider name**: `expirationTime`<br>
            **Description**: The time when this access control entry expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.<br>
           - `kind`<br>
            **Type**: `STRING`<br>
            **Provider name**: `kind`<br>
            **Description**: This is always `sql#aclEntry`.<br>
           - `name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `name`<br>
            **Description**: Optional. A label to identify this entry.<br>
           - `value`<br>
            **Type**: `STRING`<br>
            **Provider name**: `value`<br>
            **Description**: The allowlisted value for the access control list.<br>
       - `enable_private_path_for_google_cloud_services`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enablePrivatePathForGoogleCloudServices`<br>
        **Description**: Controls connectivity to private IP instances from Google services, such as BigQuery.<br>
       - `ipv4_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `ipv4Enabled`<br>
        **Description**: Whether the instance is assigned a public IP address or not.<br>
       - `private_network`<br>
        **Type**: `STRING`<br>
        **Provider name**: `privateNetwork`<br>
        **Description**: The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `/projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set.<br>
       - `require_ssl`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `requireSsl`<br>
        **Description**: Whether SSL connections over IP are enforced or not.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: This is always `sql#settings`.<br>
   - `location_preference`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `locationPreference`<br>
    **Description**: The location preference settings. This allows the instance to be located as near as possible to either an App Engine app or Compute Engine zone for better performance. App Engine co-location was only applicable to First Generation instances.<br>
       - `follow_gae_application`<br>
        **Type**: `STRING`<br>
        **Provider name**: `followGaeApplication`<br>
        **Description**: The App Engine application to follow, it must be in the same region as the Cloud SQL instance. WARNING: Changing this might restart the instance.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always `sql#locationPreference`.<br>
       - `secondary_zone`<br>
        **Type**: `STRING`<br>
        **Provider name**: `secondaryZone`<br>
        **Description**: The preferred Compute Engine zone for the secondary/failover (for example: us-central1-a, us-central1-b, etc.).<br>
       - `zone`<br>
        **Type**: `STRING`<br>
        **Provider name**: `zone`<br>
        **Description**: The preferred Compute Engine zone (for example: us-central1-a, us-central1-b, etc.). WARNING: Changing this might restart the instance.<br>
   - `maintenance_window`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `maintenanceWindow`<br>
    **Description**: The maintenance window for this instance. This specifies when the instance can be restarted for maintenance purposes.<br>
       - `day`<br>
        **Type**: `INT32`<br>
        **Provider name**: `day`<br>
        **Description**: day of week (1-7), starting on Monday.<br>
       - `hour`<br>
        **Type**: `INT32`<br>
        **Provider name**: `hour`<br>
        **Description**: hour of day - 0 to 23.<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always `sql#maintenanceWindow`.<br>
       - `update_track`<br>
        **Type**: `STRING`<br>
        **Provider name**: `updateTrack`<br>
        **Description**: Maintenance timing setting: `canary` (Earlier) or `stable` (Later). [Learn more](https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen). <br>
        **Possible values**:<br>
          - `SQL_UPDATE_TRACK_UNSPECIFIED` - This is an unknown maintenance timing preference.<br>
          - `canary` - For instance update that requires a restart, this update track indicates your instance prefer to restart for new version early in maintenance window.<br>
          - `stable` - For instance update that requires a restart, this update track indicates your instance prefer to let Cloud SQL choose the timing of restart (within its Maintenance window, if applicable).<br>
   - `password_validation_policy`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `passwordValidationPolicy`<br>
    **Description**: The local user password validation policy of the instance.<br>
       - `complexity`<br>
        **Type**: `STRING`<br>
        **Provider name**: `complexity`<br>
        **Description**: The complexity of the password. <br>
        **Possible values**:<br>
          - `COMPLEXITY_UNSPECIFIED` - Complexity check is not specified.<br>
          - `COMPLEXITY_DEFAULT` - A combination of lowercase, uppercase, numeric, and non-alphanumeric characters.<br>
       - `disallow_username_substring`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `disallowUsernameSubstring`<br>
        **Description**: Disallow username as a part of the password.<br>
       - `enable_password_policy`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enablePasswordPolicy`<br>
        **Description**: Whether the password policy is enabled or not.<br>
       - `min_length`<br>
        **Type**: `INT32`<br>
        **Provider name**: `minLength`<br>
        **Description**: Minimum number of characters allowed.<br>
       - `password_change_interval`<br>
        **Type**: `STRING`<br>
        **Provider name**: `passwordChangeInterval`<br>
        **Description**: Minimum interval after which the password can be changed. This flag is only supported for PostgreSQL.<br>
       - `reuse_interval`<br>
        **Type**: `INT32`<br>
        **Provider name**: `reuseInterval`<br>
        **Description**: Number of previous passwords that cannot be reused.<br>
   - `pricing_plan`<br>
    **Type**: `STRING`<br>
    **Provider name**: `pricingPlan`<br>
    **Description**: The pricing plan for this instance. This can be either `PER_USE` or `PACKAGE`. Only `PER_USE` is supported for Second Generation instances. <br>
    **Possible values**:<br>
      - `SQL_PRICING_PLAN_UNSPECIFIED` - This is an unknown pricing plan for this instance.<br>
      - `PACKAGE` - The instance is billed at a monthly flat rate.<br>
      - `PER_USE` - The instance is billed per usage.<br>
   - `replication_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `replicationType`<br>
    **Description**: The type of replication this instance uses. This can be either `ASYNCHRONOUS` or `SYNCHRONOUS`. (Deprecated) This property was only applicable to First Generation instances. <br>
    **Possible values**:<br>
      - `SQL_REPLICATION_TYPE_UNSPECIFIED` - This is an unknown replication type for a Cloud SQL instance.<br>
      - `SYNCHRONOUS` - The synchronous replication mode for First Generation instances. It is the default value.<br>
      - `ASYNCHRONOUS` - The asynchronous replication mode for First Generation instances. It provides a slight performance gain, but if an outage occurs while this option is set to asynchronous, you can lose up to a few seconds of updates to your data.<br>
   - `settings_version`<br>
    **Type**: `INT64`<br>
    **Provider name**: `settingsVersion`<br>
    **Description**: The version of instance settings. This is a required field for update method to make sure concurrent updates are handled properly. During update, use the most recent settingsVersion value for this instance and do not try to update this value.<br>
   - `sql_server_audit_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `sqlServerAuditConfig`<br>
    **Description**: SQL Server specific audit configuration.<br>
       - `bucket`<br>
        **Type**: `STRING`<br>
        **Provider name**: `bucket`<br>
        **Description**: The name of the destination bucket (e.g., gs://mybucket).<br>
       - `kind`<br>
        **Type**: `STRING`<br>
        **Provider name**: `kind`<br>
        **Description**: This is always sql#sqlServerAuditConfig<br>
       - `retention_interval`<br>
        **Type**: `STRING`<br>
        **Provider name**: `retentionInterval`<br>
        **Description**: How long to keep generated audit files.<br>
       - `upload_interval`<br>
        **Type**: `STRING`<br>
        **Provider name**: `uploadInterval`<br>
        **Description**: How often to upload generated audit files.<br>
   - `storage_auto_resize`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `storageAutoResize`<br>
    **Description**: Configuration to increase storage size automatically. The default value is true.<br>
   - `storage_auto_resize_limit`<br>
    **Type**: `INT64`<br>
    **Provider name**: `storageAutoResizeLimit`<br>
    **Description**: The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit.<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The tier (or machine type) for this instance, for example `db-custom-1-3840`. WARNING: Changing this restarts the instance.<br>
   - `time_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `timeZone`<br>
    **Description**: Server timezone, relevant only for Cloud SQL for SQL Server.<br>
   - `user_labels`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `userLabels`<br>
    **Description**: User-provided labels, represented as a dictionary where each label is a single key value pair.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `state`<br>
**Description**: The current serving state of the Cloud SQL instance. <br>
**Possible values**:<br>
  - `SQL_INSTANCE_STATE_UNSPECIFIED` - The state of the instance is unknown.<br>
  - `RUNNABLE` - The instance is running, or has been stopped by owner.<br>
  - `SUSPENDED` - The instance is not available, for example due to problems with billing.<br>
  - `PENDING_DELETE` - The instance is being deleted.<br>
  - `PENDING_CREATE` - The instance is being created.<br>
  - `MAINTENANCE` - The instance is down for maintenance.<br>
  - `FAILED` - The creation of the instance failed or a fatal error occurred during maintenance.<br>
  - `ONLINE_MAINTENANCE` - Deprecated<br>
## `suspension_reason`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `suspensionReason`<br>
**Description**: If the instance state is SUSPENDED, the reason for the suspension.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
