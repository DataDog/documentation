---
dependencies: []
disable_edit: true
---
# azure_key_vault

## `create_mode`
**Type**: `STRING`<br>
**Provider name**: `properties.createMode`<br>
**Description**: The vault's create mode to indicate whether the vault need to be recovered or not.<br>
## `diagnostic_settings`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DiagnosticSettingsResource`<br>
   - `event_hub_authorization_rule_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.eventHubAuthorizationRuleId`<br>
    **Description**: The resource Id for the event hub authorization rule.<br>
   - `event_hub_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.eventHubName`<br>
    **Description**: The name of the event hub. If none is specified, the default event hub will be selected.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: Azure resource Id<br>
   - `log_analytics_destination_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.logAnalyticsDestinationType`<br>
    **Description**: A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.)<br>
   - `logs`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `properties.logs`<br>
    **Description**: The list of logs settings.<br>
       - `category`<br>
        **Type**: `STRING`<br>
        **Provider name**: `category`<br>
        **Description**: Name of a Diagnostic Log category for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: a value indicating whether this log is enabled.<br>
       - `retention_policy`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `retentionPolicy`<br>
        **Description**: the retention policy for this log.<br>
           - `days`<br>
            **Type**: `INT32`<br>
            **Provider name**: `days`<br>
            **Description**: the number of days for the retention in days. A value of 0 will retain the events indefinitely.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enabled`<br>
            **Description**: a value indicating whether the retention policy is enabled.<br>
   - `metrics`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `properties.metrics`<br>
    **Description**: The list of metric settings.<br>
       - `category`<br>
        **Type**: `STRING`<br>
        **Provider name**: `category`<br>
        **Description**: Name of a Diagnostic Metric category for a resource type this setting is applied to. To obtain the list of Diagnostic metric categories for a resource, first perform a GET diagnostic settings operation.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: a value indicating whether this category is enabled.<br>
       - `retention_policy`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `retentionPolicy`<br>
        **Description**: the retention policy for this category.<br>
           - `days`<br>
            **Type**: `INT32`<br>
            **Provider name**: `days`<br>
            **Description**: the number of days for the retention in days. A value of 0 will retain the events indefinitely.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `enabled`<br>
            **Description**: a value indicating whether the retention policy is enabled.<br>
       - `time_grain`<br>
        **Type**: `STRING`<br>
        **Provider name**: `timeGrain`<br>
        **Description**: the timegrain of the metric in ISO8601 format.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Azure resource name<br>
   - `service_bus_rule_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.serviceBusRuleId`<br>
    **Description**: The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility.<br>
   - `storage_account_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.storageAccountId`<br>
    **Description**: The resource ID of the storage account to which you would like to send Diagnostic Logs.<br>
   - `type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `type`<br>
    **Description**: Azure resource type<br>
   - `workspace_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `properties.workspaceId`<br>
    **Description**: The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2<br>
## `enable_purge_protection`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enablePurgeProtection`<br>
**Description**: Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value.<br>
## `enable_rbac_authorization`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enableRbacAuthorization`<br>
**Description**: Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be  ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC.<br>
## `enable_soft_delete`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enableSoftDelete`<br>
**Description**: Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false.<br>
## `enabled_for_deployment`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enabledForDeployment`<br>
**Description**: Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.<br>
## `enabled_for_disk_encryption`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enabledForDiskEncryption`<br>
**Description**: Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.<br>
## `enabled_for_template_deployment`
**Type**: `BOOLEAN`<br>
**Provider name**: `properties.enabledForTemplateDeployment`<br>
**Description**: Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Fully qualified identifier of the key vault resource.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: Azure location of the key vault resource.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Name of the key vault resource.<br>
## `provisioning_state`
**Type**: `STRING`<br>
**Provider name**: `properties.provisioningState`<br>
**Description**: Provisioning state of the vault.<br>
## `resource_group`
**Type**: `STRING`<br>
## `sku`
**Type**: `STRUCT`<br>
**Provider name**: `properties.sku`<br>
**Description**: SKU details<br>
   - `family`<br>
    **Type**: `STRING`<br>
    **Provider name**: `family`<br>
    **Description**: SKU family name<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: SKU name to specify whether the key vault is a standard vault or a premium vault.<br>
## `soft_delete_retention_in_days`
**Type**: `INT64`<br>
**Provider name**: `properties.softDeleteRetentionInDays`<br>
**Description**: softDelete data retention days. It accepts >=7 and <=90.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tenant_id`
**Type**: `STRING`<br>
**Provider name**: `properties.tenantId`<br>
**Description**: The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type of the key vault resource.<br>
## `vault_uri`
**Type**: `STRING`<br>
**Provider name**: `properties.vaultUri`<br>
**Description**: The URI of the vault for performing operations on keys and secrets. This property is readonly<br>
