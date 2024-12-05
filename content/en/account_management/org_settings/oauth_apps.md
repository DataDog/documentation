---
title: OAuth Apps
further_reading:
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Learn more about organization settings"
---
## Overview

Use the **OAuth Apps** management page under [Organization Settings][1] to manage and gain visibility into your organization's OAuth applications, such as the scopes and permissions granted to an application and the users that have authorized access for it.

{{< img src="account_management/oauth_apps/org-management-page.png" alt="OAuth Apps management page in Datadog" style="width:100%;">}}

## Setup
### Permissions

By default, users with [Datadog Standard and Datadog Admin roles][2] can access the OAuth Apps management page. If your organization has [custom roles][3] defined, add your user to any custom role with `org_authorized_apps_read` and `org_authorized_apps_write` permissions. 

Only users with the Datadog Admin role or the `org_authorized_apps_write` permission can manage OAuth applications on this page, such as disabling applications or revoking OAuth access for a user.

### Enable

Enabled OAuth applications allow users with necessary permissions to authorize access on their behalf. OAuth applications include the Datadog Mobile App<!-- and your custom [UI Extensions][4] that have [OAuth API Access][5]-->. 

### Disable

Disabling OAuth access for an application revokes access to this application for all users in your organization. While the application remains installed, users are no longer able to use the application and are prompted with an error if they attempt to authorize it.

There are two ways to disable an application from the OAuth Apps management page:
1. Hover over your application in the apps table to reveal the **Disable** button on the right side of the row.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="Disable button in apps table" style="width:100%;">}}

2. Click on your application to open the detailed view of the application and click the **Disable Application** button.
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="Disable button in app's detailed view" style="width:100%;">}}

**Note**: When re-enabled, users that previously authorized the application are required to re-authorize the application to regain access.

### Revoke access

Revoking a user's OAuth access to an application removes all access to that application. If the user has the required permissions to authorize the application, they can regain access by re-authorizing it.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="Disable button in apps detailed view" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /account_management/rbac/permissions/#general-permissions
[3]: /account_management/rbac/?tab=datadogapplication#custom-role
[4]: /developers/ui_extensions/
[5]: /developers/ui_extensions/#oauth-api-access
