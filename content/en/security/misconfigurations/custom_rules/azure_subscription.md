---
dependencies: []
disable_edit: true
---
# azure_subscription

## `authorization_source`
**Type**: `STRING`<br>
**Provider name**: `authorizationSource`<br>
**Description**: The authorization source of the request. Valid values are one or more combinations of Legacy, RoleBased, Bypassed, Direct and Management. For example, 'Legacy, RoleBased'.<br>
## `display_name`
**Type**: `STRING`<br>
**Provider name**: `displayName`<br>
**Description**: The subscription display name.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: The fully qualified ID for the subscription. For example, /subscriptions/00000000-0000-0000-0000-000000000000.<br>
## `managed_by_tenants`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `managedByTenants`<br>
**Description**: An array containing the tenants managing the subscription.<br>
   - `tenant_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **Description**: The tenant ID of the managing tenant. This is a GUID.<br>
## `resource_group`
**Type**: `STRING`<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `state`<br>
**Description**: The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted.<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `subscription_policies`
**Type**: `STRUCT`<br>
**Provider name**: `subscriptionPolicies`<br>
**Description**: The subscription policies.<br>
   - `location_placement_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `locationPlacementId`<br>
    **Description**: The subscription location placement ID. The ID indicates which regions are visible for a subscription. For example, a subscription with a location placement Id of Public_2014-09-01 has access to Azure public regions.<br>
   - `quota_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `quotaId`<br>
    **Description**: The subscription quota ID.<br>
   - `spending_limit`<br>
    **Type**: `STRING`<br>
    **Provider name**: `spendingLimit`<br>
    **Description**: The subscription spending limit.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tenant_id`
**Type**: `STRING`<br>
**Provider name**: `tenantId`<br>
**Description**: The subscription tenant ID.<br>
