---
title: OAuth Apps
kind: documentation
further_reading:
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Learn more about organization settings"
---
## Overview

The **OAuth Apps** management page in [Organization Settings][1] helps you manage and gain visibility into your organization’s OAuth applications, such as the scopes and permissions granted to an application and the users that have authorized access for it. This includes the Datadog Mobile App and your custom [Datadog Apps][2] that have [OAuth API Access][3] enabled. 

{{< img src="account_management/oauth_apps/org-management-page.png" alt="OAuth Apps management page in Datadog" style="width:100%;">}}

## Setup
### Permissions

By default, users with [Datadog Standard and Datadog Admin roles][4] can access the OAuth Apps management page. If your organization has [custom roles][5] defined, add your user to any custom role with `org_authorized_apps_read` and `org_authorized_apps_write` permissions. 

Only users with the Datadog Admin role or the `org_authorized_apps_write` permission can manage OAuth applications on this page, such as disabling applications or revoking OAuth access for a user.

## Disable an OAuth application

Disabling OAuth access for an application revokes access to this application for all users in your organization. While the application remains installed, users are no longer able to use the application and are prompted with an error if they attempt to authorize it.

There are two ways to disable an application from the OAuth Apps management page:
1. Hover over your application in the apps table to reveal the **Disable** button on the right-hand side of the row.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="Disable button in apps table" style="width:100%;">}}

2. Click on your application to open the detailed view of the application and reveal the **Disable Application** button.
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="Disable button in app's detailed view" style="width:100%;">}}

**Note**: Enabled applications allow users with necessary permissions to grant it access on their behalf. When re-enabled, users that previously authorized the application are required to re-authorize the application to regain access.

## Revoke OAuth access for a user

Revoking OAuth access to an application removes all access that a user has to the application. If the user has the required permissions to authorize the application, they can gain access again by re-authorizing it.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="Disable button in apps detailed view" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /developers/datadog_apps/
[3]: /developers/datadog_apps/#oauth-api-access
[4]: /account_management/rbac/permissions/#general-permissions
[5]: /account_management/rbac/?tab=datadogapplication#custom-role
