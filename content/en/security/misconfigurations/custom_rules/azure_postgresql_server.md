---
dependencies: []
disable_edit: true
---
# azure_postgresql_server

## `administrator_login`
**Type**: `STRING`<br>
**Provider name**: `properties.administratorLogin`<br>
**Description**: The administrator's login name of a server. Can only be specified when the server is being created (and is required for creation).<br>
## `byok_enforcement`
**Type**: `STRING`<br>
**Provider name**: `properties.byokEnforcement`<br>
**Description**: Status showing whether the server data encryption is enabled with customer-managed keys.<br>
## `earliest_restore_date`
**Type**: `STRING`<br>
**Provider name**: `properties.earliestRestoreDate`<br>
**Description**: Earliest restore point creation time (ISO8601 format)<br>
## `firewall_rules`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `FirewallRule`<br>
   - `end_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.endIpAddress`<br>
    **Description**: The end IP address of the server firewall rule. Must be IPv4 format.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource<br>
   - `start_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.startIpAddress`<br>
    **Description**: The start IP address of the server firewall rule. Must be IPv4 format.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `fully_qualified_domain_name`
**Type**: `STRING`<br>
**Provider name**: `properties.fullyQualifiedDomainName`<br>
**Description**: The fully qualified domain name of a server.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
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
## `infrastructure_encryption`
**Type**: `STRING`<br>
**Provider name**: `properties.infrastructureEncryption`<br>
**Description**: Status showing whether the server enabled infrastructure encryption.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The geo-location where the resource lives<br>
## `master_server_id`
**Type**: `STRING`<br>
**Provider name**: `properties.masterServerId`<br>
**Description**: The master server id of a replica server.<br>
## `minimal_tls_version`
**Type**: `STRING`<br>
**Provider name**: `properties.minimalTlsVersion`<br>
**Description**: Enforce a minimal Tls version for the server.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the resource<br>
## `public_network_access`
**Type**: `STRING`<br>
**Provider name**: `properties.publicNetworkAccess`<br>
**Description**: Whether or not public network access is allowed for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'<br>
## `replica_capacity`
**Type**: `INT32`<br>
**Provider name**: `properties.replicaCapacity`<br>
**Description**: The maximum number of replicas that a master server can have.<br>
## `replication_role`
**Type**: `STRING`<br>
**Provider name**: `properties.replicationRole`<br>
**Description**: The replication role of the server.<br>
## `resource_group`
**Type**: `STRING`<br>
## `server_configs`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Configuration`<br>
   - `allowed_values`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.allowedValues`<br>
    **Description**: Allowed values of the configuration.<br>
   - `data_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.dataType`<br>
    **Description**: Data type of the configuration.<br>
   - `default_value`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.defaultValue`<br>
    **Description**: Default value of the configuration.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.description`<br>
    **Description**: Description of the configuration.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the resource<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
   - `value`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.value`<br>
    **Description**: Value of the configuration.<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `sku`<br>
**Description**: The SKU (pricing tier) of the server.<br>
   - `capacity`<br>
    **Type**: `INT32`<br>
    **Provider name**: `capacity`<br>
    **Description**: The scale up/out capacity, representing server's compute units.<br>
   - `family`<br>
    **Type**: `STRING`<br>
    **Provider name**: `family`<br>
    **Description**: The family of hardware.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: The name of the sku, typically, tier + family + cores, e.g. B_Gen4_1, GP_Gen5_8.<br>
   - `size`<br>
    **Type**: `STRING`<br>
    **Provider name**: `size`<br>
    **Description**: The size code, to be interpreted by resource as appropriate.<br>
   - `tier`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tier`<br>
    **Description**: The tier of the particular SKU, e.g. Basic.<br>
## `ssl_enforcement`
**Type**: `STRING`<br>
**Provider name**: `properties.sslEnforcement`<br>
**Description**: Enable ssl enforcement or not when connect to server.<br>
## `storage_profile`
**Type**: `STRUCT`<br>
**Provider name**: `properties.storageProfile`<br>
**Description**: Storage profile of a server.<br>
   - `backup_retention_days`<br>
    **Type**: `INT32`<br>
    **Provider name**: `backupRetentionDays`<br>
    **Description**: Backup retention days for the server.<br>
   - `geo_redundant_backup`<br>
    **Type**: `STRING`<br>
    **Provider name**: `geoRedundantBackup`<br>
    **Description**: Enable Geo-redundant or not for server backup.<br>
   - `storage_autogrow`<br>
    **Type**: `STRING`<br>
    **Provider name**: `storageAutogrow`<br>
    **Description**: Enable Storage Auto Grow.<br>
   - `storage_mb`<br>
    **Type**: `INT32`<br>
    **Provider name**: `storageMB`<br>
    **Description**: Max storage allowed for a server.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"<br>
## `user_visible_state`
**Type**: `STRING`<br>
**Provider name**: `properties.userVisibleState`<br>
**Description**: A state of a server that is visible to user.<br>
## `version`
**Type**: `STRING`<br>
**Provider name**: `properties.version`<br>
**Description**: Server version.<br>
