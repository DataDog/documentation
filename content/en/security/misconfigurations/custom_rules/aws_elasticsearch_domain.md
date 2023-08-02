---
dependencies: []
disable_edit: true
---
# aws_elasticsearch_domain

## `access_policies`
**Type**: `STRING`<br>
**Provider name**: `AccessPolicies`<br>
**Description**: IAM access policy as a JSON-formatted string.<br>
## `account_id`
**Type**: `STRING`<br>
## `advanced_options`
**Type**: `MAP_STRING_STRING`<br>
**Provider name**: `AdvancedOptions`<br>
**Description**: Specifies the status of the <code>AdvancedOptions</code><br>
## `advanced_security_options`
**Type**: `STRUCT`<br>
**Provider name**: `AdvancedSecurityOptions`<br>
**Description**: The current status of the Elasticsearch domain's advanced security options.<br>
   - `anonymous_auth_disable_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `AnonymousAuthDisableDate`<br>
    **Description**: Specifies the Anonymous Auth Disable Date when Anonymous Auth is enabled.<br>
   - `anonymous_auth_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `AnonymousAuthEnabled`<br>
    **Description**: True if Anonymous auth is enabled. Anonymous auth can be enabled only when AdvancedSecurity is enabled on existing domains.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: True if advanced security is enabled.<br>
   - `internal_user_database_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `InternalUserDatabaseEnabled`<br>
    **Description**: True if the internal user database is enabled.<br>
   - `saml_options`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `SAMLOptions`<br>
    **Description**: Describes the SAML application configured for a domain.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Enabled`<br>
        **Description**: True if SAML is enabled.<br>
       - `idp`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `Idp`<br>
        **Description**: Describes the SAML Identity Provider's information.<br>
           - `entity_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `EntityId`<br>
            **Description**: The unique Entity ID of the application in SAML Identity Provider.<br>
           - `metadata_content`<br>
            **Type**: `STRING`<br>
            **Provider name**: `MetadataContent`<br>
            **Description**: The Metadata of the SAML application in xml format.<br>
       - `roles_key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `RolesKey`<br>
        **Description**: The key used for matching the SAML Roles attribute.<br>
       - `session_timeout_minutes`<br>
        **Type**: `INT32`<br>
        **Provider name**: `SessionTimeoutMinutes`<br>
        **Description**: The duration, in minutes, after which a user session becomes inactive.<br>
       - `subject_key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `SubjectKey`<br>
        **Description**: The key used for matching the SAML Subject attribute.<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `ARN`<br>
**Description**: The Amazon resource name (ARN) of an Elasticsearch domain. See <a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/index.html?Using_Identifiers.html" target="_blank">Identifiers for IAM Entities</a> in <i>Using AWS Identity and Access Management</i> for more information.<br>
## `auto_tune_options`
**Type**: `STRUCT`<br>
**Provider name**: `AutoTuneOptions`<br>
**Description**: The current status of the Elasticsearch domain's Auto-Tune options.<br>
   - `error_message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ErrorMessage`<br>
    **Description**: Specifies the error message while enabling or disabling the Auto-Tune.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `State`<br>
    **Description**: Specifies the <code>AutoTuneState</code> for the Elasticsearch domain.<br>
## `change_progress_details`
**Type**: `STRUCT`<br>
**Provider name**: `ChangeProgressDetails`<br>
**Description**: Specifies change details of the domain configuration change.<br>
   - `change_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ChangeId`<br>
    **Description**: The unique change identifier associated with a specific domain configuration change.<br>
   - `message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Message`<br>
    **Description**: Contains an optional message associated with the domain configuration change.<br>
## `cognito_options`
**Type**: `STRUCT`<br>
**Provider name**: `CognitoOptions`<br>
**Description**: The <code>CognitoOptions</code> for the specified domain. For more information, see <a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-cognito-auth.html" target="_blank">Amazon Cognito Authentication for Kibana</a>.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: Specifies the option to enable Cognito for Kibana authentication.<br>
   - `identity_pool_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IdentityPoolId`<br>
    **Description**: Specifies the Cognito identity pool ID for Kibana authentication.<br>
   - `role_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RoleArn`<br>
    **Description**: Specifies the role ARN that provides Elasticsearch permissions for accessing Cognito resources.<br>
   - `user_pool_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserPoolId`<br>
    **Description**: Specifies the Cognito user pool ID for Kibana authentication.<br>
## `created`
**Type**: `BOOLEAN`<br>
**Provider name**: `Created`<br>
**Description**: The domain creation status. <code>True</code> if the creation of an Elasticsearch domain is complete. <code>False</code> if domain creation is still in progress.<br>
## `deleted`
**Type**: `BOOLEAN`<br>
**Provider name**: `Deleted`<br>
**Description**: The domain deletion status. <code>True</code> if a delete request has been received for the domain but resource cleanup is still in progress. <code>False</code> if the domain has not been deleted. Once domain deletion is complete, the status of the domain is no longer returned.<br>
## `domain_endpoint_options`
**Type**: `STRUCT`<br>
**Provider name**: `DomainEndpointOptions`<br>
**Description**: The current status of the Elasticsearch domain's endpoint options.<br>
   - `custom_endpoint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomEndpoint`<br>
    **Description**: Specify the fully qualified domain for your custom endpoint.<br>
   - `custom_endpoint_certificate_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CustomEndpointCertificateArn`<br>
    **Description**: Specify ACM certificate ARN for your custom endpoint.<br>
   - `custom_endpoint_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `CustomEndpointEnabled`<br>
    **Description**: Specify if custom endpoint should be enabled for the Elasticsearch domain.<br>
   - `enforce_https`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `EnforceHTTPS`<br>
    **Description**: Specify if only HTTPS endpoint should be enabled for the Elasticsearch domain.<br>
   - `tls_security_policy`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TLSSecurityPolicy`<br>
    **Description**: Specify the TLS security policy that needs to be applied to the HTTPS endpoint of Elasticsearch domain. <br/> It can be one of the following values: <ul> <li><b>Policy-Min-TLS-1-0-2019-07: </b> TLS security policy which supports TLSv1.0 and higher.</li> <li><b>Policy-Min-TLS-1-2-2019-07: </b> TLS security policy which supports only TLSv1.2</li> </ul>
## `domain_id`
**Type**: `STRING`<br>
**Provider name**: `DomainId`<br>
**Description**: The unique identifier for the specified Elasticsearch domain.<br>
## `domain_name`
**Type**: `STRING`<br>
**Provider name**: `DomainName`<br>
**Description**: The name of an Elasticsearch domain. Domain names are unique across the domains owned by an account within an AWS region. Domain names start with a letter or number and can contain the following characters: a-z (lowercase), 0-9, and - (hyphen).<br>
## `ebs_options`
**Type**: `STRUCT`<br>
**Provider name**: `EBSOptions`<br>
**Description**: The <code>EBSOptions</code> for the specified domain. See <a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-ebs" target="_blank">Configuring EBS-based Storage</a> for more information.<br>
   - `ebs_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `EBSEnabled`<br>
    **Description**: Specifies whether EBS-based storage is enabled.<br>
   - `iops`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Iops`<br>
    **Description**: Specifies the IOPS for Provisioned IOPS And GP3 EBS volume (SSD).<br>
   - `throughput`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Throughput`<br>
    **Description**: Specifies the Throughput for GP3 EBS volume (SSD).<br>
   - `volume_size`<br>
    **Type**: `INT32`<br>
    **Provider name**: `VolumeSize`<br>
    **Description**: Integer to specify the size of an EBS volume.<br>
   - `volume_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VolumeType`<br>
    **Description**: Specifies the volume type for EBS-based storage.<br>
## `elasticsearch_cluster_config`
**Type**: `STRUCT`<br>
**Provider name**: `ElasticsearchClusterConfig`<br>
**Description**: The type and number of instances in the domain cluster.<br>
   - `cold_storage_options`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ColdStorageOptions`<br>
    **Description**: Specifies the <code>ColdStorageOptions</code> config for Elasticsearch Domain<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Enabled`<br>
        **Description**: Enable cold storage option. Accepted values true or false<br>
   - `dedicated_master_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `DedicatedMasterCount`<br>
    **Description**: Total number of dedicated master nodes, active and on standby, for the cluster.<br>
   - `dedicated_master_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `DedicatedMasterEnabled`<br>
    **Description**: A boolean value to indicate whether a dedicated master node is enabled. See <a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains.html#es-managedomains-dedicatedmasternodes" target="_blank">About Dedicated Master Nodes</a> for more information.<br>
   - `dedicated_master_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DedicatedMasterType`<br>
    **Description**: The instance type for a dedicated master node.<br>
   - `instance_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `InstanceCount`<br>
    **Description**: The number of instances in the specified domain cluster.<br>
   - `instance_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `InstanceType`<br>
    **Description**: The instance type for an Elasticsearch cluster. UltraWarm instance types are not supported for data instances.<br>
   - `warm_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `WarmCount`<br>
    **Description**: The number of warm nodes in the cluster.<br>
   - `warm_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `WarmEnabled`<br>
    **Description**: True to enable warm storage.<br>
   - `warm_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `WarmType`<br>
    **Description**: The instance type for the Elasticsearch cluster's warm nodes.<br>
   - `zone_awareness_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ZoneAwarenessConfig`<br>
    **Description**: Specifies the zone awareness configuration for a domain when zone awareness is enabled.<br>
       - `availability_zone_count`<br>
        **Type**: `INT32`<br>
        **Provider name**: `AvailabilityZoneCount`<br>
        **Description**: An integer value to indicate the number of availability zones for a domain when zone awareness is enabled. This should be equal to number of subnets if VPC endpoints is enabled<br>
   - `zone_awareness_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `ZoneAwarenessEnabled`<br>
    **Description**: A boolean value to indicate whether zone awareness is enabled. See <a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains.html#es-managedomains-zoneawareness" target="_blank">About Zone Awareness</a> for more information.<br>
## `elasticsearch_version`
**Type**: `STRING`<br>
**Provider name**: `ElasticsearchVersion`<br>
## `encryption_at_rest_options`
**Type**: `STRUCT`<br>
**Provider name**: `EncryptionAtRestOptions`<br>
**Description**: Specifies the status of the <code>EncryptionAtRestOptions</code>.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: Specifies the option to enable Encryption At Rest.<br>
   - `kms_key_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `KmsKeyId`<br>
    **Description**: Specifies the KMS Key ID for Encryption At Rest options.<br>
## `endpoint`
**Type**: `STRING`<br>
**Provider name**: `Endpoint`<br>
**Description**: The Elasticsearch domain endpoint that you use to submit index and search requests.<br>
## `endpoints`
**Type**: `MAP_STRING_STRING`<br>
**Provider name**: `Endpoints`<br>
**Description**: Map containing the Elasticsearch domain endpoints used to submit index and search requests. Example <code>key, value</code>: <code>'vpc','vpc-endpoint-h2dsd34efgyghrtguk5gt6j2foh4.us-east-1.es.amazonaws.com'</code>.<br>
## `node_to_node_encryption_options`
**Type**: `STRUCT`<br>
**Provider name**: `NodeToNodeEncryptionOptions`<br>
**Description**: Specifies the status of the <code>NodeToNodeEncryptionOptions</code>.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: Specify true to enable node-to-node encryption.<br>
## `processing`
**Type**: `BOOLEAN`<br>
**Provider name**: `Processing`<br>
**Description**: The status of the Elasticsearch domain configuration. <code>True</code> if Amazon Elasticsearch Service is processing configuration changes. <code>False</code> if the configuration is active.<br>
## `service_software_options`
**Type**: `STRUCT`<br>
**Provider name**: `ServiceSoftwareOptions`<br>
**Description**: The current status of the Elasticsearch domain's service software.<br>
   - `automated_update_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `AutomatedUpdateDate`<br>
    **Description**: Timestamp, in Epoch time, until which you can manually request a service software update. After this date, we automatically update your service software.<br>
   - `cancellable`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Cancellable`<br>
    **Description**: <code>True</code> if you are able to cancel your service software version update. <code>False</code> if you are not able to cancel your service software version.<br>
   - `current_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CurrentVersion`<br>
    **Description**: The current service software version that is present on the domain.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Description`<br>
    **Description**: The description of the <code>UpdateStatus</code>.<br>
   - `new_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NewVersion`<br>
    **Description**: The new service software version if one is available.<br>
   - `optional_deployment`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `OptionalDeployment`<br>
    **Description**: <code>True</code> if a service software is never automatically updated. <code>False</code> if a service software is automatically updated after <code>AutomatedUpdateDate</code>.<br>
   - `update_available`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `UpdateAvailable`<br>
    **Description**: <code>True</code> if you are able to update you service software version. <code>False</code> if you are not able to update your service software version.<br>
   - `update_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UpdateStatus`<br>
    **Description**: The status of your service software update. This field can take the following values: <code>ELIGIBLE</code>, <code>PENDING_UPDATE</code>, <code>IN_PROGRESS</code>, <code>COMPLETED</code>, and <code>NOT_ELIGIBLE</code>.<br>
## `snapshot_options`
**Type**: `STRUCT`<br>
**Provider name**: `SnapshotOptions`<br>
**Description**: Specifies the status of the <code>SnapshotOptions</code><br>
   - `automated_snapshot_start_hour`<br>
    **Type**: `INT32`<br>
    **Provider name**: `AutomatedSnapshotStartHour`<br>
    **Description**: Specifies the time, in UTC format, when the service takes a daily automated snapshot of the specified Elasticsearch domain. Default value is <code>0</code> hours.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `upgrade_processing`
**Type**: `BOOLEAN`<br>
**Provider name**: `UpgradeProcessing`<br>
**Description**: The status of an Elasticsearch domain version upgrade. <code>True</code> if Amazon Elasticsearch Service is undergoing a version upgrade. <code>False</code> if the configuration is active.<br>
## `vpc_options`
**Type**: `STRUCT`<br>
**Provider name**: `VPCOptions`<br>
**Description**: The <code>VPCOptions</code> for the specified domain. For more information, see <a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-vpc.html" target="_blank">VPC Endpoints for Amazon Elasticsearch Service Domains</a>.<br>
   - `availability_zones`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `AvailabilityZones`<br>
    **Description**: The availability zones for the Elasticsearch domain. Exists only if the domain was created with VPCOptions.<br>
   - `security_group_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SecurityGroupIds`<br>
    **Description**: Specifies the security groups for VPC endpoint.<br>
   - `subnet_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SubnetIds`<br>
    **Description**: Specifies the subnets for VPC endpoint.<br>
   - `vpc_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VPCId`<br>
    **Description**: The VPC Id for the Elasticsearch domain. Exists only if the domain was created with VPCOptions.<br>
