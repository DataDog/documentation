---
dependencies: []
disable_edit: true
---
# azure_security_contact

## `alert_notifications`
**Type**: `STRUCT`<br>
**Provider name**: `properties.alertNotifications`<br>
**Description**: Defines whether to send email notifications about new security alerts<br>
   - `minimal_severity`<br>
    **Type**: `STRING`<br>
    **Provider name**: `minimalSeverity`<br>
    **Description**: Defines the minimal alert severity which will be sent as email notifications<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: Defines if email notifications will be sent about new security alerts<br>
## `emails`
**Type**: `STRING`<br>
**Provider name**: `properties.emails`<br>
**Description**: List of email addresses which will get notifications from Azure Security Center by the configurations defined in this security contact.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: Resource Id<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Resource name<br>
## `notifications_by_role`
**Type**: `STRUCT`<br>
**Provider name**: `properties.notificationsByRole`<br>
**Description**: Defines whether to send email notifications from Azure Security Center to persons with specific RBAC roles on the subscription.<br>
   - `roles`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `roles`<br>
    **Description**: Defines which RBAC roles will get email notifications from Azure Security Center. List of allowed RBAC roles:<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: Defines whether to send email notifications from Azure Security Center to persons with specific RBAC roles on the subscription.<br>
## `phone`
**Type**: `STRING`<br>
**Provider name**: `properties.phone`<br>
**Description**: The security contact's phone number<br>
## `resource_group`
**Type**: `STRING`<br>
## `subscription_id`
**Type**: `STRING`<br>
## `subscription_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `type`<br>
**Description**: Resource type<br>
