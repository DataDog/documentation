---
title: Access and Authentication
kind: documentation
description: Access and authentication for Workflows
aliases:
  - "/workflows/service_accounts"
disable_toc: false
is_beta: true
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
- link: "/workflows/actions_catalog"
  tag: "Documentation"
  text: "See the list of workflow actions"
---

{{< callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows are in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.
{{< /callout >}}

A few tools control access and authentication for workflows and their components.

## Workflow identity

A workflow can run using the identity of the owner of the workflow, or a service account associated with the workflow. By default, a workflow uses the Datadog user identity of its author.


### Claim ownership of a workflow

<div class="alert alert-info">To claim ownership of a workflow, your Datadog user must have the roles and permissions required by the workflow's connections.</div>


1. Click the cog (**Settings**) icon. 
1. Select **Take ownership of workflow**. This option only appears if you are not already the owner of the workflow.
1. Click **Confirm** to take ownership of the workflow.

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
1. Select your service account from the drop-down menu.

#### Remove a service account associated with workflow

1. Click the cog (**Settings**) icon.
1. Select your service account from the drop-down menu.
1. Click **Remove service account**.

## Action credentials

Because workflow [actions][5] connect with external software systems, you may need to authenticate your Datadog account to the corresponding integration. A workflow can run successfully only if every workflow action that requires authentication can verify the identity of your Datadog account.

Workflow actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Custom connection credentials

### Integration tile credentials

Credentials and account authentication that you set up in the following Datadog integration tiles automatically propagate to the corresponding actions in Workflows:
- Jira
- PagerDuty
- Slack

Configure the integration tiles by following instructions in [Datadog Integrations][6].

### Connection credentials

Use a custom [connection][7] to authenticate a [generic action][8] or any action for which the integration tile does not offer authentication. The workflow connection object allows you to provide credentials to connect to an integration. The parameters vary by integration.

To connect to an arbitrary service, use the HTTP Connection type and choose from two authentication options:
- Token-based authentication
- A username and password combination

### Add credentials to an action

Whether you configured credentials in the integration tile or created a custom connection, Workflows makes your credentials available for each workflow action. To add credentials to an action, follow the steps below:

1. Navigate to the [Workflows list][9].
1. Select the workflow containing the action to which you need to add a credential. The workflow builder appears.
1. In the workflow visualization, click the action to which you need to add a credential.
1. The right side panel populates with the action details.
1. Under the **Configure** tab, look for the **Authentication** dropdown. Choose your desired credential from the dropdown. Or, click **Add New** to create a new credential.
1. Click **Save**.

## Workflow permissions

Use [role-based access control (RBAC)][3] to control access to your workflows and connections. To see the list of permissions that apply to workflows and connections, see [Datadog Role Permissions][10].

### Restrict connection use

Set permissions on each connection to limit modifications or restrict their use. The granular permissions include **Viewer**, **Resolver**, and **Editor**.

Viewer
: Can view

Resolver
: Can resolve and view

Editor
: Can edit, resolve, and view

Resolving a connection includes getting the connection object assigned to a step and retrieving the secret associated with it.

Follow the steps below to modify the permissions on a specific connection:

1. Navigate to the [Workflows list][9].
1. Click **Connections** in the upper right. A list of connections appears.
1. Hover over the connection on which you would like to set granular permissions. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/audit_trail/#overview
[2]: /account_management/org_settings/service_accounts/
[3]: /account_management/rbac/
[4]: /workflows/trigger/
[5]: /workflows/actions_catalog/
[6]: /integrations/
[7]: /workflows/connections/
[8]: /workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
[10]: /account_management/rbac/permissions/#workflows
