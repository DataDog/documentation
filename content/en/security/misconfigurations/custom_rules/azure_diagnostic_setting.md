---
dependencies: []
disable_edit: true
---
# azure_diagnostic_setting

## `event_hub_authorization_rule_id`
**Type**: `STRING`<br>
**Provider name**: `properties.eventHubAuthorizationRuleId`<br>
**Description**: The resource Id for the event hub authorization rule.<br>
## `event_hub_name`
**Type**: `STRING`<br>
**Provider name**: `properties.eventHubName`<br>
**Description**: The name of the event hub. If none is specified, the default event hub will be selected.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Azure resource Id<br>
## `log_analytics_destination_type`
**Type**: `STRING`<br>
**Provider name**: `properties.logAnalyticsDestinationType`<br>
**Description**: A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.)<br>
## `logs`
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
## `metrics`
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
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Azure resource name<br>
## `resource_group`
**Type**: `STRING`<br>
## `service_bus_rule_id`
**Type**: `STRING`<br>
**Provider name**: `properties.serviceBusRuleId`<br>
**Description**: The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility.<br>
## `storage_account_id`
**Type**: `STRING`<br>
**Provider name**: `properties.storageAccountId`<br>
**Description**: The resource ID of the storage account to which you would like to send Diagnostic Logs.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Azure resource type<br>
## `workspace_id`
**Type**: `STRING`<br>
**Provider name**: `properties.workspaceId`<br>
**Description**: The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2<br>
