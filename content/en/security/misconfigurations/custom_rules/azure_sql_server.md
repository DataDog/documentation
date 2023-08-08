---
dependencies: []
disable_edit: true
---
# azure_sql_server

## `active_directory_administrators`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ServerAzureADAdministrator`<br>
   - `administrator_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.administratorType`<br>
    **Description**: Type of the sever administrator.<br>
   - `azure_ad_only_authentication`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.azureADOnlyAuthentication`<br>
    **Description**: Azure Active Directory only Authentication enabled.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `login`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.login`<br>
    **Description**: Login name of the server administrator.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `sid`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.sid`<br>
    **Description**: SID (object ID) of the server administrator.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.tenantId`<br>
    **Description**: Tenant ID of the administrator.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `administrator_login`
**Type**: `STRING`<br>
**Provider name**: `properties.administratorLogin`<br>
**Description**: Administrator username for the server. Once created it cannot be changed.<br>
## `administrator_login_password`
**Type**: `STRING`<br>
**Provider name**: `properties.administratorLoginPassword`<br>
**Description**: The administrator login password (required for server creation).<br>
## `administrators`
**Type**: `STRUCT`<br>
**Provider name**: `properties.administrators`<br>
**Description**: The Azure Active Directory identity of the server.<br>
   - `administrator_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `administratorType`<br>
    **Description**: Type of the sever administrator.<br>
   - `azure_ad_only_authentication`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `azureADOnlyAuthentication`<br>
    **Description**: Azure Active Directory only Authentication enabled.<br>
   - `login`<br>
    **Type**: `STRING`<br>
    **Provider name**: `login`<br>
    **Description**: Login name of the server administrator.<br>
   - `principal_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalType`<br>
    **Description**: Principal Type of the sever administrator.<br>
   - `sid`<br>
    **Type**: `STRING`<br>
    **Provider name**: `sid`<br>
    **Description**: SID (object ID) of the server administrator.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: Tenant ID of the administrator.<br>
## `advanced_threat_protection_setting`
**Type**: `STRUCT`<br>
**Provider name**: `ServerAdvancedThreatProtection`<br>
   - `creation_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.creationTime`<br>
    **Description**: Specifies the UTC creation time of the policy.<br>
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
    **Description**: Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `alert_policies`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ServerSecurityAlertPolicy`<br>
   - `creation_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.creationTime`<br>
    **Description**: Specifies the UTC creation time of the policy.<br>
   - `disabled_alerts`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.disabledAlerts`<br>
    **Description**: Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force<br>
   - `email_account_admins`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.emailAccountAdmins`<br>
    **Description**: Specifies that the alert is sent to the account administrators.<br>
   - `email_addresses`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.emailAddresses`<br>
    **Description**: Specifies an array of e-mail addresses to which the alert is sent.<br>
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
    **Description**: Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.<br>
   - `storage_account_access_key`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageAccountAccessKey`<br>
    **Description**: Specifies the identifier key of the Threat Detection audit storage account.<br>
   - `storage_endpoint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageEndpoint`<br>
    **Description**: Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.<br>
   - `system_data`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `systemData`<br>
    **Description**: SystemData of SecurityAlertPolicyResource.<br>
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
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `audit_setting`
**Type**: `STRUCT`<br>
**Provider name**: `ServerBlobAuditingPolicy`<br>
   - `audit_actions_and_groups`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `properties.auditActionsAndGroups`<br>
    **Description**: Specifies the Actions-Groups and Actions to audit.The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:BATCH_COMPLETED_GROUP,SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,FAILED_DATABASE_AUTHENTICATION_GROUP.This above combination is also the set that is configured by default when enabling auditing from the Azure portal.The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):APPLICATION_ROLE_CHANGE_PASSWORD_GROUPBACKUP_RESTORE_GROUPDATABASE_LOGOUT_GROUPDATABASE_OBJECT_CHANGE_GROUPDATABASE_OBJECT_OWNERSHIP_CHANGE_GROUPDATABASE_OBJECT_PERMISSION_CHANGE_GROUPDATABASE_OPERATION_GROUPDATABASE_PERMISSION_CHANGE_GROUPDATABASE_PRINCIPAL_CHANGE_GROUPDATABASE_PRINCIPAL_IMPERSONATION_GROUPDATABASE_ROLE_MEMBER_CHANGE_GROUPFAILED_DATABASE_AUTHENTICATION_GROUPSCHEMA_OBJECT_ACCESS_GROUPSCHEMA_OBJECT_CHANGE_GROUPSCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUPSCHEMA_OBJECT_PERMISSION_CHANGE_GROUPSUCCESSFUL_DATABASE_AUTHENTICATION_GROUPUSER_CHANGE_PASSWORD_GROUPBATCH_STARTED_GROUPBATCH_COMPLETED_GROUPDBCC_GROUPDATABASE_OWNERSHIP_CHANGE_GROUPDATABASE_CHANGE_GROUPThese are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:SELECTUPDATEINSERTDELETEEXECUTERECEIVEREFERENCESThe general form for defining an action to be audited is:{action} ON {object} BY {principal}Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.For example:SELECT on dbo.myTable by publicSELECT on DATABASE::myDatabase by publicSELECT on SCHEMA::mySchema by publicFor more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `is_azure_monitor_target_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.isAzureMonitorTargetEnabled`<br>
    **Description**: Specifies whether audit events are sent to Azure Monitor. In order to send the events to Azure Monitor, specify 'state' as 'Enabled' and 'isAzureMonitorTargetEnabled' as true.When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.Note that for server level audit you should use the 'master' database as {databaseName}.Diagnostic Settings URI format:PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-previewFor more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)<br>
   - `is_storage_secondary_key_in_use`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.isStorageSecondaryKeyInUse`<br>
    **Description**: Specifies whether storageAccountAccessKey value is the storage's secondary key.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `queue_delay_ms`<br>
    **Type**: `INT32`<br>
    **Provider name**: `properties.queueDelayMs`<br>
    **Description**: Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.<br>
   - `retention_days`<br>
    **Type**: `INT64`<br>
    **Provider name**: `properties.retentionDays`<br>
    **Description**: Specifies the number of days to keep in the audit logs in the storage account.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.state`<br>
    **Description**: Specifies the state of the policy. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.<br>
   - `storage_account_access_key`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageAccountAccessKey`<br>
    **Description**: Specifies the identifier key of the auditing storage account. If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.Prerequisites for using managed identity authentication:1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)<br>
   - `storage_account_subscription_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageAccountSubscriptionId`<br>
    **Description**: Specifies the blob storage subscription Id.<br>
   - `storage_endpoint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageEndpoint`<br>
    **Description**: Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `encryption_protector`
**Type**: `STRUCT`<br>
**Provider name**: `EncryptionProtector`<br>
   - `auto_rotation_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `properties.autoRotationEnabled`<br>
    **Description**: Key auto rotation opt-in flag. Either true or false.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: Kind of encryption protector. This is metadata used for the Azure portal experience.<br>
   - `location`<br>
    **Type**: `STRING`<br>
    **Provider name**: `location`<br>
    **Description**: Resource location.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `server_key_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.serverKeyName`<br>
    **Description**: The name of the server key.<br>
   - `server_key_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.serverKeyType`<br>
    **Description**: The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.<br>
   - `subregion`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.subregion`<br>
    **Description**: Subregion of the encryption protector.<br>
   - `thumbprint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.thumbprint`<br>
    **Description**: Thumbprint of the server key.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
   - `uri`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.uri`<br>
    **Description**: The URI of the server key.<br>
## `firewall_rules`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `FirewallRule`<br>
   - `end_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.endIpAddress`<br>
    **Description**: The end IP address of the firewall rule. Must be IPv4 format. Must be greater than or equal to startIpAddress. Use value '0.0.0.0' for all Azure-internal IP addresses.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `start_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.startIpAddress`<br>
    **Description**: The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `fully_qualified_domain_name`
**Type**: `STRING`<br>
**Provider name**: `properties.fullyQualifiedDomainName`<br>
**Description**: The fully qualified domain name of the server.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource ID.<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
**Description**: The Azure Active Directory identity of the server.<br>
   - `principal_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `principalId`<br>
    **Description**: The Azure Active Directory principal id.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: The Azure Active Directory tenant id.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource.<br>
## `key_id`
**Type**: `STRING`<br>
**Provider name**: `properties.keyId`<br>
**Description**: A CMK URI of the key to use for encryption.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: Kind of sql server. This is metadata used for the Azure portal experience.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Resource location.<br>
## `minimal_tls_version`
**Type**: `STRING`<br>
**Provider name**: `properties.minimalTlsVersion`<br>
**Description**: Minimal TLS version. Allowed values: '1.0', '1.1', '1.2'<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name.<br>
## `primary_user_assigned_identity_id`
**Type**: `STRING`<br>
**Provider name**: `properties.primaryUserAssignedIdentityId`<br>
**Description**: The resource id of a user assigned identity to be used by default.<br>
## `private_endpoint_connections`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `properties.privateEndpointConnections`<br>
**Description**: List of private endpoint connections on a server<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `private_endpoint`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.privateEndpoint`<br>
    **Description**: Private endpoint which the connection belongs to.<br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `id`<br>
        **Description**: Resource id of the private endpoint.<br>
   - `private_link_service_connection_state`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.privateLinkServiceConnectionState`<br>
    **Description**: Connection state of the private endpoint connection.<br>
       - `actions_required`<br>
        **Type**: `STRING`<br>
        **Provider name**: `actionsRequired`<br>
        **Description**: The actions required for private link service connection.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `description`<br>
        **Description**: The private link service connection description.<br>
       - `status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `status`<br>
        **Description**: The private link service connection status.<br>
   - `provisioning_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.provisioningState`<br>
    **Description**: State of the private endpoint connection.<br>
## `public_network_access`
**Type**: `STRING`<br>
**Provider name**: `properties.publicNetworkAccess`<br>
**Description**: Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'<br>
## `resource_group`
**Type**: `STRING`<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `properties.state`<br>
**Description**: The state of the server.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type.<br>
## `version`
**Type**: `STRING`<br>
**Provider name**: `properties.version`<br>
**Description**: The version of the server.<br>
## `vulnerability_assessments`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ServerVulnerabilityAssessment`<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Resource ID.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Resource name.<br>
   - `recurring_scans`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `properties.recurringScans`<br>
    **Description**: The recurring scans settings<br>
       - `email_subscription_admins`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `emailSubscriptionAdmins`<br>
        **Description**: Specifies that the schedule scan notification will be is sent to the subscription administrators.<br>
       - `emails`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `emails`<br>
        **Description**: Specifies an array of e-mail addresses to which the scan notification is sent.<br>
       - `is_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `isEnabled`<br>
        **Description**: Recurring scans state.<br>
   - `storage_account_access_key`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageAccountAccessKey`<br>
    **Description**: Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall<br>
   - `storage_container_path`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageContainerPath`<br>
    **Description**: A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).<br>
   - `storage_container_sas_key`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageContainerSasKey`<br>
    **Description**: A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Resource type.<br>
## `workspace_feature`
**Type**: `STRING`<br>
**Provider name**: `properties.workspaceFeature`<br>
**Description**: Whether or not existing server has a workspace created and if it allows connection from workspace<br>
