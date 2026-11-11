---
title: Control Access to Fleet Automation
description: Use role permissions and scoped permissions to control who can upgrade and configure Datadog Agents in Fleet Automation, and on which Agents.
disable_toc: false
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role-based access control"
- link: "/account_management/rbac/granular_access/"
  tag: "Documentation"
  text: "Granular access control"
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Datadog Teams"
---

<!-- TODO(Ethan): Confirm customer-facing terminology. Draft uses "Access Controls" (UI page name) made up of "scoped permissions." -->

Fleet Automation uses two layers of access control:

- **Role permissions** control which actions a user can take in Fleet Automation, such as upgrading or configuring Agents. Role permissions are available in every organization.
- **Scoped permissions** control which Agents a user can take those actions on. Scoped permissions are in Preview.

To upgrade or configure an Agent, a user needs the role permission for that action. If your organization uses scoped permissions, the user also needs Edit access to a scoped permission that includes that Agent.

**Note**: Neither layer restricts viewing. Any user who can open Fleet Automation can see every Agent and its configuration.

## Role permissions for Fleet Automation

Assign the following permissions through [roles][1] to control which Fleet Automation actions a user can take:

| Permission | Allows users to |
|---|---|
| Hosts Read | View Fleet Automation. <!-- TODO(Emil): The index page said Fleet is "available to all users." Is Hosts Read the gate? It's in all default roles. --> |
| API Keys Read | View and search Agents by API key. |
| Agent Upgrade | Upgrade Agents and create upgrade schedules. |
| Agent Configuration Management | Create Agent configurations. Deploying a configuration also requires Agent Upgrade. |
| Agent Flare Collection | Send flares remotely from Fleet Automation. |
| User Access Manage | Create, edit, and delete scoped permissions. |

For descriptions of all Datadog permissions, see [Datadog Role Permissions][2].

## Scoped permissions for Fleet Automation

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Scoped permissions for Fleet Automation are in Preview. To request access, contact your Customer Success Manager or <a href="/help/">Datadog Support</a>.
{{< /callout >}}
<!-- TODO(Ethan): Is there a Preview request form? If so, add the URL and unhide the button. -->

Scoped permissions limit which Agents a team, role, or user can upgrade or configure. For example, you can let each application team manage only the Agents tagged with their team name, while a central platform team manages every Agent.

Scoped permissions apply to every deployment, whether it starts in the Fleet Automation UI, the API, Terraform, or the Datadog MCP Server.

<!-- TODO(Emil): Page description says scopes cover "Agents and collectors." Which OTel Collectors (DDOT, standalone), and for which features? -->

### How scoped permissions work

Each scoped permission has the following parts:

**Description**
: A name for the scoped permission.

**Features**
: The actions the scoped permission covers: {{< ui >}}Configurations{{< /ui >}}, {{< ui >}}Upgrades{{< /ui >}}, or both.

**Scope**
: A tag filter that selects a group of Agents, such as `team:checkout` or `env:prod`. Scopes match host tags. A scope with no filters matches all Agents, and appears as {{< ui >}}Any Agent{{< /ui >}}. <!-- TODO(Emil): What counts as an "Agent-side tag" that doesn't match? Do scopes update immediately when host tags change? -->

**Has access**
: The Datadog Teams, roles, users, and service accounts that get Edit access to the Agents in the scope. Granting access to a team includes its subteams. <!-- TODO(Emil): Confirm subteams are included. -->

### How scoped permissions combine

- **Access is denied by default**: A user can only upgrade or configure an Agent if a scoped permission grants them that feature on that Agent.
- **Scoped permissions only add access**: When scoped permissions overlap, a user gets the combined access of all of them. You cannot exclude a user or team from a scoped permission.
- **Unrestricted scoped permissions grant access to everyone**: A scoped permission with nobody listed under {{< ui >}}Has access{{< /ui >}} appears as {{< ui >}}Unrestricted{{< /ui >}}. Any user with the matching role permission can act on its Agents.

For example, an organization has two scoped permissions:

| Description | Scope | Features | Has access |
|---|---|---|---|
| Platform team | Any Agent | Configurations, Upgrades | Platform team |
| Checkout team | `team:checkout` | Configurations | Checkout team |

Members of the platform team can upgrade and configure every Agent, including the checkout team's Agents. Members of the checkout team can configure Agents tagged `team:checkout`, but cannot upgrade them. Users in neither team cannot upgrade or configure any Agent.

<div class="alert alert-warning">An Unrestricted scoped permission whose scope is <strong>Any Agent</strong> lets every user with the matching role permission act on every Agent. While it exists, no other scoped permission restricts those features.</div>

### Before you begin

- To create, edit, or delete scoped permissions, you need the User Access Manage permission. Users without it see the {{< ui >}}Access Controls{{< /ui >}} page in read-only mode.
- Make sure the Agents you want to group share a host tag, such as `team` or `env`.

### Replace the starter scoped permission

When Datadog enables scoped permissions for your organization, it creates a starter scoped permission. The starter scoped permission covers all Agents and grants access to every user who already has the Agent Upgrade or Agent Configuration Management permission. As a result, nobody gains or loses access when the Preview is enabled.

<!-- TODO(Emil): What is the starter scoped permission called in the UI? Is it created automatically when the flag is enabled, or by a backfill script? -->

To move from the starter scoped permission to your own:

1. [Create scoped permissions](#create-a-scoped-permission) for each group of Agents and the teams that manage them.
1. Confirm that every team that needs to upgrade or configure Agents has access through one of your new scoped permissions.
1. Delete the starter scoped permission.

<div class="alert alert-danger">If you delete the starter scoped permission before you create your own, users cannot upgrade or configure any Agents until you add new scoped permissions.</div>

### Create a scoped permission

1. In [Fleet Automation][3], click {{< ui >}}Permissions{{< /ui >}} to open the [{{< ui >}}Access Controls{{< /ui >}} page][4].
1. Click {{< ui >}}Add Permission{{< /ui >}}.
1. Enter a description.
1. Under {{< ui >}}Grant access to{{< /ui >}}, select {{< ui >}}Configurations{{< /ui >}}, {{< ui >}}Upgrades{{< /ui >}}, or both.
1. Under {{< ui >}}Select the Agents this permission applies to{{< /ui >}}, use the {{< ui >}}env{{< /ui >}} dropdown or click {{< ui >}}Filter{{< /ui >}} to filter by tag. The table lists the matching Agents.
1. Click {{< ui >}}Save & Define Access{{< /ui >}}. The scoped permission is created as Unrestricted.
1. In the {{< ui >}}Who has access?{{< /ui >}} dialog, click {{< ui >}}Restrict Access{{< /ui >}}.
1. Select teams, roles, users, or service accounts, then click {{< ui >}}Add{{< /ui >}}. You are added as an Editor by default. To remove yourself, select {{< ui >}}Remove Access{{< /ui >}} from the dropdown next to your name.
1. Click {{< ui >}}Save{{< /ui >}}.

<!-- TODO(Emil): What does Organization access Viewer vs. Editor do here? If Editor gives everyone edit access, add a step and a warning. -->

<div class="alert alert-warning">If you click <strong>Do It Later</strong> instead of restricting access, the scoped permission stays Unrestricted. Any user with the matching role permission can act on its Agents.</div>

### Edit or delete a scoped permission

On the [{{< ui >}}Access Controls{{< /ui >}} page][4], hover over a scoped permission, then click one of the following icons:

- **Pencil**: Edit the description, features, or scope.
- **People**: Change who has access.
- **Trash can**: Delete the scoped permission.

### Example setups

The following examples show how to combine scoped permissions for common goals. Replace the tags, teams, and roles with your own.

#### Example: Central platform team and application teams

In this example, a platform team manages all Agents, and each application team manages only its own Agents.

| Description | Scope | Features | Has access |
|---|---|---|---|
| Platform | Any Agent | Configurations, Upgrades | Platform team |
| Checkout | `team:checkout` | Configurations, Upgrades | Checkout team |
| Payments | `team:payments` | Configurations, Upgrades | Payments team |

#### Example: Separate production upgrades from staging configuration

In this example, only site reliability engineers (SREs) can upgrade production Agents, and developers can change configurations in staging.

| Description | Scope | Features | Has access |
|---|---|---|---|
| Production upgrades | `env:prod` | Upgrades | SRE role |
| Staging configuration | `env:staging` | Configurations | Developer role |

Because deploying a configuration requires the Agent Upgrade permission, the developers need both Agent Upgrade and Agent Configuration Management in their role.

### Troubleshooting

#### A user can't upgrade or configure an Agent

- Check that the user's role has the required permission: Agent Upgrade for upgrades, and both Agent Configuration Management and Agent Upgrade for configuration deployments.
- Check that a scoped permission grants the user access to that feature, with a scope that includes the Agent.
- When the user starts an upgrade or configuration change, open the {{< ui >}}Excluded from deployment{{< /ui >}} tab to see why each Agent was excluded. Agents the user doesn't have access to are listed under {{< ui >}}Outside your access{{< /ui >}}. Agents can also be excluded for other reasons, such as [Remote Agent Management][5] not being enabled. <!-- TODO(Emil): Confirm the "Outside your access" label in the Excluded from deployment tab. -->

#### A user can still upgrade or configure an Agent you restricted

Scoped permissions only add access, so another scoped permission might grant it. Look for scoped permissions that include the Agent and are:

- Unrestricted, including any with the scope {{< ui >}}Any Agent{{< /ui >}}
- Granted to a team or role that the user belongs to
- The starter scoped permission

#### An upgrade schedule skipped some Agents

[Upgrade schedules][6] run with the access of the user who created them. Each time a schedule runs, it skips Agents outside that user's upgrade access, without a warning. The default upgrade schedule is not affected.

To fix this, give the schedule's creator access to the skipped Agents, or have a user with access recreate the schedule.

### Limitations

- Scoped permissions do not restrict viewing. To keep sensitive values out of Agent configurations, use [secrets management][7].
- Scoped permissions do not apply to flares, failover policies, Kubernetes deployments, or Agent installation. <!-- TODO(Emil): Confirm "failover policies" is a customer-facing term. -->
- You can manage scoped permissions only in the Datadog UI. The API and Terraform do not support creating or editing scoped permissions.
- Scoped permissions are separate from [Data Access Control][8]. Data Access Control does not hide Agents in Fleet Automation, and scoped permissions do not restrict data elsewhere in Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/permissions/
[3]: https://app.datadoghq.com/fleet
[4]: https://app.datadoghq.com/fleet/access-scopes
[5]: /agent/guide/setup_remote_config/#enable-remote-agent-management
[6]: /agent/fleet_automation/upgrade_agents/#schedule-agent-upgrades
[7]: /agent/configuration/secrets-management/
[8]: /account_management/rbac/data_access/
