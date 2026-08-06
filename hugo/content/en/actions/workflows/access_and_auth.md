---
title: Access and Authentication
description: Access and authentication for Workflow Automation
aliases:
- /workflows/access
- /workflows/service_accounts
- /service_management/workflows/access
- /actions/workflows/access
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
disable_toc: false
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
- link: "/actions/actions_catalog"
  tag: "Documentation"
  text: "See the list of workflow actions"
---

A few tools control access and authentication for workflows and their components.

## Workflow identity

Every run of a workflow uses a single Datadog identity, controlled by the workflow's {{< ui >}}Run as{{< /ui >}} setting. That identity determines:
- Which [connections][6] a run can resolve, including connections that use [private action runners][10]
- Which Datadog resources a run can read and modify
- Which user a run's actions are attributed to, in [audit trails][1] and in the products those actions touch

A workflow can run as one of the following identities:

{{< ui >}}Owner{{< /ui >}}
: The workflow runs as its owner, and any editor of the workflow can access the same resources as the owner. A new workflow runs as its owner by default.

{{< ui >}}Initiator{{< /ui >}}
: The workflow runs as the user who triggered the run, so each run is limited to the resources that user can access. The Initiator identity is only supported for [triggers][4] that have an end user.

{{< ui >}}Service Account{{< /ui >}}
: The workflow runs as a service account associated with the workflow. Use a service account to control the exact permissions a run has, with roles you choose for the workflow.

### Set the workflow identity

Select an identity when you publish a workflow, or change it at any time:

1. In the workflow editor, click the cog ({{< ui >}}Settings{{< /ui >}}) icon.
1. Click {{< ui >}}Edit permissions{{< /ui >}}.
1. Under {{< ui >}}Run as{{< /ui >}}, select {{< ui >}}Owner{{< /ui >}}, {{< ui >}}Initiator{{< /ui >}}, or {{< ui >}}Service Account{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

The following restrictions apply:
- Only the owner of the workflow can select {{< ui >}}Owner{{< /ui >}} or {{< ui >}}Initiator{{< /ui >}}.
- To select {{< ui >}}Service Account{{< /ui >}}, you need either the Datadog Admin Role or a custom role with the {{< ui >}}Service Account Write{{< /ui >}} permission.

To see the identity a workflow uses, hover over the workflow name in the editor and read the {{< ui >}}Run as{{< /ui >}} field.

### Run as the owner

When a workflow runs as its owner, every run uses the owner's identity, whoever triggers it. A run can use the connections and Datadog resources the owner can access, even when the user who triggered it cannot access them.

The owner resolves the connections defined in the workflow actions. The owner needs the `connections_resolve` permission, plus {{< ui >}}Resolver{{< /ui >}} access to each connection the workflow uses.

### Run as the initiator

When a workflow runs as the initiator, each run uses the identity of the user who triggered it. A run can only use the connections and Datadog resources that this user can access, and the actions the workflow takes are attributed to them. For example, if the workflow declares an incident, the incident is created by the user who triggered the workflow.

The initiator resolves the connections defined in the workflow actions. Each user who triggers the workflow needs the `connections_resolve` permission, plus {{< ui >}}Resolver{{< /ui >}} access to each connection the workflow uses.

### Run as a service account

When a workflow runs as a service account, every run uses that account's identity, whoever triggers it. Because you choose which roles the service account has, you control the exact permissions a run has, independently of any user's permissions.

Attach an existing service account to the workflow, or create a service account when you set the identity. When you create one, you select its roles. You can assign any subset of the roles you have. With the {{< ui >}}User Access Manage{{< /ui >}} permission, you can assign any role in your organization. For more information, see [Service accounts][2] or [Role based access control][3].

The service account resolves the connections defined in the workflow actions. It needs a role with the `workflows_run` and `connections_resolve` permissions, plus {{< ui >}}Resolver{{< /ui >}} access to each connection the workflow uses.

## Action credentials

Because workflow [actions][5] connect with external software systems, you may need to authenticate your Datadog account to the corresponding integration. A workflow can run successfully only if every workflow action that requires authentication can verify the identity of your Datadog account.

Workflow actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Connection credentials

For more information on configuring credentials, see [Connections][6].

## Workflow permissions

Use [role-based access control (RBAC)][3] to control access to your workflows and connections. To see the list of permissions that apply to workflows and connections, see [Datadog Role Permissions][7].

By default, the author of a workflow or connection is the only user who receives {{< ui >}}Editor{{< /ui >}} access. The rest of the Datadog organization receives {{< ui >}}Viewer{{< /ui >}} access to the workflow or connection.

### Restrict access on a specific connection

Set permissions on each connection to limit modifications or restrict their use. The granular permissions include {{< ui >}}Viewer{{< /ui >}}, {{< ui >}}Resolver{{< /ui >}}, and {{< ui >}}Editor{{< /ui >}}. By default, only the author of the connection receives {{< ui >}}Editor{{< /ui >}} access. The author can choose to grant access to additional users, roles, or teams.

{{< ui >}}Viewer{{< /ui >}}
: Can view the connection

{{< ui >}}Resolver{{< /ui >}}
: Can resolve and view the connection

{{< ui >}}Editor{{< /ui >}}
: Can edit, resolve, and view the connection

Resolving a connection includes getting the connection object assigned to a step and retrieving the secret associated with it.

Follow the steps below to modify the permissions on a specific connection:

1. Navigate to the [Workflow Automation page][8].
1. Click {{< ui >}}Connections{{< /ui >}} in the upper right. A list of connections appears.
1. Hover over the connection on which you would like to set granular permissions. {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}}, and {{< ui >}}Delete{{< /ui >}} icons appear on the right.
1. Click the padlock ({{< ui >}}Permissions{{< /ui >}}) icon.
1. Select {{< ui >}}Restrict Access{{< /ui >}}.
1. Select a role from the dropdown menu. Click {{< ui >}}Add{{< /ui >}}. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click {{< ui >}}Save{{< /ui >}}.

### Restrict access on a specific workflow

Set permissions on each workflow to restrict modifications or usage of the workflow. The granular permissions include {{< ui >}}Viewer{{< /ui >}}, {{< ui >}}Runner{{< /ui >}}, and {{< ui >}}Editor{{< /ui >}}. By default, only the author of the workflow receives {{< ui >}}Editor{{< /ui >}} access. The author can choose to grant access to additional users, roles, or teams.

{{< ui >}}Viewer{{< /ui >}}
: Can view the workflow

{{< ui >}}Runner{{< /ui >}}
: Can run and view the workflow

{{< ui >}}Editor{{< /ui >}}
: Can edit, run, and view the workflow

You can restrict access on a specific workflow either from the workflow list page or from the workflow canvas while editing the workflow.

**Restricting permissions from the workflow list page**
1. Navigate to the [Workflow Automation page][8].
1. Hover over the workflow on which you would like to set granular permissions. Action icons, including {{< ui >}}Permissions{{< /ui >}}, appear on the right.
1. Click the padlock ({{< ui >}}Permissions{{< /ui >}}) icon.
1. Select {{< ui >}}Restrict Access{{< /ui >}}.
1. Select a role from the dropdown menu. Click {{< ui >}}Add{{< /ui >}}. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click {{< ui >}}Save{{< /ui >}}.

**Restricting permissions from the workflow editor**
1. In the workflow editor, click the cog ({{< ui >}}Settings{{< /ui >}}) icon.
1. Select {{< ui >}}Edit permissions{{< /ui >}} from the dropdown.
1. Under {{< ui >}}Who has access{{< /ui >}}, select {{< ui >}}Custom{{< /ui >}}.
1. Select {{< ui >}}Restrict Access{{< /ui >}}.
1. Select a role from the dropdown menu. Click {{< ui >}}Add{{< /ui >}}. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown menu.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click {{< ui >}}Done{{< /ui >}}, then click {{< ui >}}Save{{< /ui >}}.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][9].

[1]: /account_management/audit_trail/#overview
[2]: /account_management/org_settings/service_accounts/
[3]: /account_management/rbac/
[4]: /actions/workflows/trigger/
[5]: /actions/actions_catalog/
[6]: /actions/connections/
[7]: /account_management/rbac/permissions/#workflow-automation
[8]: https://app.datadoghq.com/workflow
[9]: https://chat.datadoghq.com/
[10]: /actions/private_actions/
