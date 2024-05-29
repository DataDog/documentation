---
title: Access and Authentication
kind: documentation
description: Access and authentication for App builder
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

A few tools control access and authentication for apps and their components.

## Action credentials

Because app [actions][1] connect with external software systems, you may need to authenticate your Datadog account to a corresponding integration. An app can run successfully only if every action that requires authentication can verify the identity of your Datadog account.

Actions can be authenticated in the following ways:
- Credentials and permissions configured in the integration tile
- Connection credentials

For more information on configuring credentials, see [Connections][2]. App Builder shares the Action Catalog and the connection credentials for each integration with [Datadog Workflow Automation][3].

## App permissions

By default:
- While the app is in draft, the author of an app is the only user who has access to the app.
- After the app is published, the author maintains **Editor** access, while the rest of the author's Datadog organization receives **Viewer** access to the app.

You can expand access to a draft of published app using access control.

### Permissions and access control

Use [role-based access control (RBAC)][4] to control access to your apps and connections.

The coarse permissions that apply to apps include the following:

Apps View
: View and run apps. Datadog Standard and Admin roles have view access to App Builder by default.

Apps Write
: Create and edit new and existing apps. Datadog Standard and Admin roles have write access to App Builder by default.

Connections Read
: List and view available connections. Datadog Read Only, Standard, and Admin roles have read access to connections by default.

### Restrict access to a specific connection

Set permissions on individual connections to restrict their use or limit modifications. App Builder provides the following permissions for each connection:

Viewer
: View the connection

Resolver
: Resolve and view the connection

Editor
: Edit, resolve, and view the connection

By default, only the author of the connection receives **Editor** access. The author can choose to grant access to additional users, roles, or teams.

**Note**: Permission to resolve a connection includes permission to get the connection object assigned to a step and retrieve the secret associated with it.

Use the following steps to modify the permissions on a specific connection:

1. Navigate to the [App Builder page][5].
1. Click the **Connections** tab. A list of connections appears.
1. Hover over the connection that you would like to set granular permissions on. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu and click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select the desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

### Restrict access to a specific app

Set permissions on each app to restrict modifications to the app. By default:
- The author of an app is the only user who has access to the app.
- After the app is published, the author maintains **Editor** access, while the rest of the author's Datadog organization receives **Viewer** access to the app.

App Builder provides the following permissions for each app:

Viewer
: Run and view the app

Editor
: Edit, run, and view the app

To restrict access to the app, perform the following steps in the app canvas:
1. Navigate to the detailed editing view for the app you want to restrict access to.
1. In the app editor, click on the cog (**Settings**) icon.
1. Select **Permissions** from the dropdown.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][6].

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /service_management/app_builder/connections/
[3]: /service_management/workflows/
[4]: /account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/
[6]: https://datadoghq.slack.com/