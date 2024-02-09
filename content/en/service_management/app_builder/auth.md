---
title: Access and Authentication
kind: documentation
description: Access and authentication for App builder
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

A few tools control access and authentication for apps and their components.

## Action credentials

Because app [actions][1] connect with external software systems, you may need to authenticate your Datadog account to a corresponding integration. An app can run successfully only if every action that requires authentication can verify the identity of your Datadog account.

Actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Connection credentials

For more information on configuring credentials, see [Connections][2]. App Builder shares the Action Catalog and the connection credentials for each integration with [Datadog Workflow Automation][3].

## App permissions

### Coarse access to apps and connections

Use [role-based access control (RBAC)][4] to control access to your apps and connections. 

The coarse permissions that apply to apps include `apps_run`, `apps_write`, and `connections_read`.

`apps_write`
: Can create and edit new and existing apps. Datadog Standard and Admin roles have write access to App Builder by default.

`apps_run`
: Can interact with apps. Datadog Standard and Admin roles have run access to App Builder by default.

`connections_read`
: Can list and view available connections. Datadog Read Only, Standard, and Admin roles have read access to connections by default.

### Restrict access to a specific connection

Set permissions on each connection to limit modifications or restrict their use. The granular permissions include **Viewer**, **Resolver**, and **Editor**.

Viewer
: Can view the connection

Resolver
: Can resolve and view the connection

Editor
: Can edit, resolve, and view the connection

Resolving a connection includes getting the connection object assigned to a step and retrieving the secret associated with it.

Use the following steps to modify the permissions on a specific connection:

1. Navigate to the [App Builder page][5].
1. Click the **Connections** tab. A list of connections appears.
1. Hover over the connection on which you would like to set granular permissions. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

### Restrict access to a specific app

Set permissions on each app to restrict modifications to the app. The granular permissions include **Runner** and **Editor**.

Runner
: Can run and view the app

Editor
: Can edit, run, and view the app

Restrict access while editing the app in the app canvas.
1. First, navigate to the detailed editing view for the app for which you want to restrict access.
1. In the app editor, click on the cog (**Settings**) icon.
1. Select **Permissions** from the dropdown.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

[1]: /service_management/workflows/actions_catalog/
[2]: /service_management/workflows/connections/
[3]: /service_management/workflows/
[4]: /account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/
