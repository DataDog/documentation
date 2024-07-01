---
title: Access and Authentication
kind: documentation
description: Access and authentication for Workflow Automation
aliases:
- /workflows/access
- /workflows/service_accounts
algolia:
  tags: [workflow, workflows, workflow automation]
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Getting Started with Workflow Automation
- link: /integrations/
  tag: Documentation
  text: Learn about integrations
- link: /service_management/workflows/actions_catalog
  tag: Documentation
  text: See the list of workflow actions
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

A few tools control access and authentication for workflows and their components.

## Workflow identity

A workflow can run using the identity of the owner of the workflow, or a service account associated with the workflow. By default, a workflow uses the Datadog user identity of its author.

### Use a service account

A service account can be associated with a workflow and act as the identity of the workflow when it runs. A service account can:
- resolve the connections defined in the workflow actions at runtime
- provide an identity for workflow executions
- provide an identity for workflow [audit trails][1]

To create a service account for a workflow, you must have either the Datadog admin role, or a custom role with the **Service Account Write** permission. The service account you create adopts your role and permissions. For more information on service accounts and permissions, see [Service accounts][2] or [Role based access control][3].

#### Associate a service account with a workflow

You can dynamically create a service account for your workflow when you [add an automatic trigger][4].

1. Click the cog (**Settings**) icon.
1. Click **Create a service account**.
1. Select a role for your service account user.
1. Click **Create** to save the service account.
1. Save your workflow to apply the changes.

When you run a workflow, the service account user resolves the connections defined in the workflow actions. Therefore, the service account user needs the `connections_resolve` permission. The Datadog Admin Role and the Datadog Standard Role include the `connections_resolve` permission.

#### View service account details

1. Click the cog (**Settings**) icon.
1. Select your service account from the dropdown menu.

#### Remove a service account associated with workflow

1. Click the cog (**Settings**) icon.
1. Select your service account from the dropdown menu.
1. Click **Remove service account**.

## Action credentials

Because workflow [actions][5] connect with external software systems, you may need to authenticate your Datadog account to the corresponding integration. A workflow can run successfully only if every workflow action that requires authentication can verify the identity of your Datadog account.

Workflow actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Connection credentials

For more information on configuring credentials, see [Connections][6].

## Workflow permissions

Use [role-based access control (RBAC)][3] to control access to your workflows and connections. To see the list of permissions that apply to workflows and connections, see [Datadog Role Permissions][7].

By default, the author of a workflow or connection is the only user who receives **Editor** access. The rest of the Datadog organization receives **Viewer** access to the workflow or connection.

### Restrict access on a specific connection

Set permissions on each connection to limit modifications or restrict their use. The granular permissions include **Viewer**, **Resolver**, and **Editor**. By default, only the author of the connection receives **Editor** access. The author can choose to grant access to additional users, roles, or teams.

Viewer
: Can view the connection

Resolver
: Can resolve and view the connection

Editor
: Can edit, resolve, and view the connection

Resolving a connection includes getting the connection object assigned to a step and retrieving the secret associated with it.

Follow the steps below to modify the permissions on a specific connection:

1. Navigate to the [Workflow Automation page][8].
1. Click **Connections** in the upper right. A list of connections appears.
1. Hover over the connection on which you would like to set granular permissions. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

### Restrict access on a specific workflow

Set permissions on each workflow to restrict modifications or usage of the workflow. The granular permissions include **Viewer**, **Runner**, and **Editor**. By default, only the author of the workflow receives **Editor** access. The author can choose to grant access to additional users, roles, or teams.

Viewer
: Can view the workflow

Runner
: Can run and view the workflow

Editor
: Can edit, run, and view the workflow

You can restrict access on a specific workflow either from the workflow list page or from the workflow canvas while editing the workflow.

**Restricting permissions from the workflow list page**
1. Navigate to the [Workflow Automation page][8].
1. Hover over the workflow on which you would like to set granular permissions. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

**Restricting permissions from the workflow editor**
1. In the workflow editor click on the cog (**Settings**) icon.
1. Select **Edit Permissions** from the dropdown.
1. Select **Restrict Access**.
1. Select a role from the dropdown menu. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][9].

[1]: /account_management/audit_trail/#overview
[2]: /account_management/org_settings/service_accounts/
[3]: /account_management/rbac/
[4]: /service_management/workflows/trigger/
[5]: /service_management/workflows/actions_catalog/
[6]: /service_management/workflows/connections/
[7]: /account_management/rbac/permissions/#workflow-automation
[8]: https://app.datadoghq.com/workflow
[9]: https://datadoghq.slack.com/
