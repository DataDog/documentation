---
title: Mobile and Third-Party Access
aliases:
- /account_management/org_settings/oauth_apps/
description: Manage and monitor OAuth applications in your organization, including permissions, Application Scope Management, user access, and application status controls.
further_reading:
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Learn more about organization settings"
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Datadog Role Permissions"
---
## Overview

Use the **Mobile and Third-Party Access** page under [Organization Settings][1] to manage and gain visibility into your organization's OAuth applications, such as the scopes and permissions granted to an application and the users that have authorized access for it.

{{< img src="account_management/mobile_third_party_access/org-management-page.png" alt="Mobile and Third-Party Access management page in Datadog" style="width:100%;">}}

## Setup
### Permissions

By default, users with the [Datadog Admin role][2] can access the Mobile and Third-Party Access page. If your organization has [custom roles][3] defined, add your user to any custom role with the `org_authorized_apps_read` and `org_authorized_apps_write` permissions.

Only users with the Datadog Admin role or the `org_authorized_apps_read` and `org_authorized_apps_write` permissions can manage OAuth applications on this page, such as disabling applications or revoking OAuth access for a user.

### Enable

Enabled OAuth applications allow users with necessary permissions to authorize access on their behalf. OAuth applications include the Datadog Mobile App.

### Disable

Disabling OAuth access for an application revokes access to this application for all users in your organization. While the application remains installed, users are no longer able to use the application and are prompted with an error if they attempt to authorize it.

To disable an application from the Mobile and Third-Party Access page:
1. Hover over your application in the apps table to reveal the **Disable** button on the right side of the row.
{{< img src="account_management/mobile_third_party_access/disable-app-table.png" alt="Apps table showing the Disable button on hover" style="width:100%;">}}

2. Click on your application to open the detailed view of the application and click the **Disable Application** button.
{{< img src="account_management/mobile_third_party_access/app-detail-scopes.png" alt="Application detail view showing scopes and Disable Application button" style="width:100%;">}}

**Note**: When re-enabled, users that previously authorized the application are required to re-authorize the application to regain access.

### Revoke access

Revoking a user's OAuth access to an application removes all access to that application. If the user has the required permissions to authorize the application, they can regain access by re-authorizing it.

{{< img src="account_management/mobile_third_party_access/revoke-user.png" alt="Application detail view showing the Users tab with the option to revoke a user's access" style="width:100%;">}}

### Application Scope Management

Enable Application Scope Management to modify the allowed scopes for an application. Adding or removing a scope affects access to this application for all users in your organization. Disabling a scope revokes any existing authorizations for applications that have the scope granted.

Only MCP applications support Application Scope Management.

1. On the **Mobile and Third-Party Access page**, click an application to open its detail view.

2. Select the **Scopes** tab and use the **Allowed** checkbox for each scope to control whether to grant the application that scope.

3. Click **Enable** to save the scope configuration.

{{< img src="account_management/mobile_third_party_access/scope-restrictions-enable.png" alt="Application Scope Management view with Enable and Restore to Full Access buttons" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /account_management/rbac/permissions/#general-permissions
[3]: /account_management/rbac/?tab=datadogapplication#custom-role
