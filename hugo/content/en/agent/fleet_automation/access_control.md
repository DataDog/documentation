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

Fleet Automation uses two layers of access control:

- **Role permissions** control which actions a user can take in Fleet Automation, such as upgrading or configuring Agents. Role permissions are available in every organization.
- **Scoped permissions** limit those actions to specific Agents. Scoped permissions are part of granular access controls, which are in Preview.

To upgrade or configure an Agent, a user needs the role permission for that action. If your organization uses scoped permissions, a scoped permission must also grant the user that action on that Agent.

**Note**: Neither layer restricts which Agents users can see. Any user who can open Fleet Automation can see every Agent and its configuration.

## Role permissions for Fleet Automation

Assign the following permissions through [roles][1] to control which Fleet Automation actions a user can take:

| Permission | Allows users to |
|---|---|
| Hosts Read | View Fleet Automation. |
| API Keys Read | View API key details on Agents and filter Agents by API key. |
| Agent Upgrade | Upgrade Agents and create upgrade schedules. To start or cancel upgrades through the API, users also need Agent Configuration Management. |
| Agent Configuration Management | Create Agent configurations. Deploying a configuration also requires Agent Upgrade. |
| Agent Flare Collection | Send flares remotely from Fleet Automation. |
| User Access Manage | Create, edit, and delete scoped permissions. |

For descriptions of all Datadog permissions, see [Datadog Role Permissions][2].

## Scoped permissions for Fleet Automation

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Granular access controls for Fleet Automation are in Preview. To request access, contact your Customer Success Manager or <a href="/help/">Datadog Support</a>.
{{< /callout >}}

With granular access controls, you use scoped permissions to limit which Agents a team, role, or user can upgrade or configure. For example, you can let each application team manage only the Agents tagged with their team name, while a central platform team manages every Agent.

Scoped permissions are checked whenever an upgrade or configuration deployment starts, whether from the Fleet Automation UI, the API, or the Datadog MCP Server. For API requests, Datadog checks the access of the user or service account that owns the application key. For MCP Server requests, it checks the signed-in user's access. Upgrade schedules managed with Terraform follow the same rules as schedules created in the UI.

Scoped permissions also cover [the Agent's Collector][10]. Configuration changes to the Agent's Collector are checked like any other Agent configuration deployment. When the Collector is installed as part of the Agent, upgrading the Agent also upgrades the Collector.

### How scoped permissions work

Each scoped permission has the following parts:

**Description**
: A name for the scoped permission.

**Scope**
: A tag filter that selects a group of Agents, such as `team:checkout` or `env:prod`. Scopes match host tags as they appear on the [Host Map][11] and [Infrastructure List][12]. A scope with no filters matches all Agents. On the {{< ui >}}Access Controls{{< /ui >}} page, it appears as {{< ui >}}Any Agent{{< /ui >}} in the {{< ui >}}Scope{{< /ui >}} column. A host tag change applies to the next deployment after the new tag appears on the host.

**Features**
: The actions the scoped permission covers: {{< ui >}}Configurations{{< /ui >}}, {{< ui >}}Upgrades{{< /ui >}}, or both.

**Has access**
: The Datadog Teams, roles, users, and service accounts that get Edit access to the Agents in the scope. Granting access to a team includes its [subteams][9].

{{< img src="/agent/fleet_automation/access_controls_list.png" alt="The Access Controls page listing six scoped permissions with Description, Scope, Features, and Has Access columns. One scoped permission has the scope Any Agent, and another shows Unrestricted under Has Access." style="width:100%;" >}}

### How scoped permissions combine

- **Access is denied by default**: A user can upgrade or configure an Agent only if a scoped permission grants them that feature on that Agent.
- **Scoped permissions only add access**: When scoped permissions overlap, a user gets the combined access of all of them. You cannot exclude a user or team from a scoped permission.
- **Unrestricted scoped permissions grant access to everyone**: A scoped permission with nobody listed under {{< ui >}}Has access{{< /ui >}} appears as {{< ui >}}Unrestricted{{< /ui >}}. Any user with the [matching role permission](#role-permissions-for-fleet-automation) can act on its Agents. If an Unrestricted scoped permission's scope is {{< ui >}}Any Agent{{< /ui >}}, no other scoped permission restricts the features it covers. A scoped permission with {{< ui >}}Organization access{{< /ui >}} set to {{< ui >}}Editor{{< /ui >}} works the same way, but appears with your organization listed under {{< ui >}}Has access{{< /ui >}}.

For examples of how scoped permissions combine, see [Example setups](#example-setups).

### Before you begin

- To create, edit, or delete scoped permissions, you need the User Access Manage permission. Users without it see the {{< ui >}}Access Controls{{< /ui >}} page in read-only mode.
- Make sure the Agents you want to group share a host tag, such as `team` or `env`.

### Replace the Default scoped permission

When Datadog enables scoped permissions for your organization, it creates a starter scoped permission called {{< ui >}}Default{{< /ui >}}. The Default scoped permission covers all Agents and grants access to every user who already has the Agent Upgrade or Agent Configuration Management permission. As a result, nobody gains or loses access when the Preview is enabled.

To move from the Default scoped permission to your own:

1. [Create scoped permissions](#create-a-scoped-permission) for each group of Agents and the teams that manage them.
1. Confirm that every team that needs to upgrade or configure Agents has access through one of your new scoped permissions.
1. Delete the Default scoped permission. Until you delete it, your other scoped permissions don't restrict access.

<div class="alert alert-warning">If you delete all of your scoped permissions, Datadog restores the Default scoped permission. The Default scoped permission gives every user with the matching role permission Upgrades and Configurations access to all Agents.</div>

### Create a scoped permission

1. In [Fleet Automation][3], click {{< ui >}}Permissions{{< /ui >}} to open the [{{< ui >}}Access Controls{{< /ui >}} page][4].
1. Click {{< ui >}}Add Permission{{< /ui >}}.
1. Enter a description.
1. Under {{< ui >}}Grant access to{{< /ui >}}, choose {{< ui >}}Configurations{{< /ui >}}, {{< ui >}}Upgrades{{< /ui >}}, or both.
1. Under {{< ui >}}Select the Agents this permission applies to{{< /ui >}}, use the {{< ui >}}env{{< /ui >}} dropdown, or click {{< ui >}}Filter{{< /ui >}} to add a filter for another tag, such as `team`. The table lists the matching Agents.

   {{< img src="/agent/fleet_automation/create_scoped_permission.png" alt="The Create Scoped Permission dialog with the description Checkout, both Configurations and Upgrades selected, and a team:checkout filter that matches 214 Agents." style="width:100%;" >}}

1. Click {{< ui >}}Save & Define Access{{< /ui >}}. The scoped permission is created as Unrestricted.
1. In the {{< ui >}}Who has access?{{< /ui >}} dialog, click {{< ui >}}Restrict Access{{< /ui >}}.
1. Select teams, roles, users, or service accounts, then click {{< ui >}}Add{{< /ui >}}. You are added as an Editor by default. To remove yourself, select {{< ui >}}Remove Access{{< /ui >}} from the dropdown next to your name.
1. Click {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">A scoped permission is Unrestricted if you click <strong>Do It Later</strong> instead of restricting access. Setting <strong>Organization access</strong> to <strong>Editor</strong> has the same effect. In both cases, any user with the matching role permission can act on its Agents. To restrict access, leave <strong>Organization access</strong> set to <strong>Viewer</strong>.</div>

### Edit or delete a scoped permission

On the [{{< ui >}}Access Controls{{< /ui >}} page][4], hover over a scoped permission, then click one of the following:

- {{< ui >}}Edit Definition{{< /ui >}} (pencil icon): Change the description, features, or scope.
- {{< ui >}}Modify who has access{{< /ui >}} (people icon): Add or remove teams, roles, users, or service accounts.
- {{< ui >}}Delete{{< /ui >}} (trash can icon): Delete the scoped permission.

### Example setups

The following examples show how to combine scoped permissions for common goals. Replace the tags, teams, and roles with your own.

#### Example: Central platform team and application teams

In this example, a platform team manages all Agents, and each application team manages only its own Agents.

| Description | Scope | Features | Has access |
|---|---|---|---|
| Platform | Any Agent | Configurations, Upgrades | Platform team |
| Checkout | `team:checkout` | Configurations, Upgrades | Checkout team |
| Payments | `team:payments` | Configurations, Upgrades | Payments team |

After you [delete the Default scoped permission](#replace-the-default-scoped-permission), members of the platform team can upgrade and configure every Agent. Members of the checkout and payments teams can upgrade and configure only the Agents tagged with their team. Other users cannot upgrade or configure any Agent.

#### Example: Separate production upgrades from staging configuration

In this example, only site reliability engineers (SREs) can upgrade production Agents, and developers can change configurations in staging.

| Description | Scope | Features | Has access |
|---|---|---|---|
| Production upgrades | `env:prod` | Upgrades | SRE role |
| Staging configuration | `env:staging` | Configurations | Developer role |

Because deploying a configuration requires the Agent Upgrade permission, the developers need both Agent Upgrade and Agent Configuration Management in their role. Even so, after you [delete the Default scoped permission](#replace-the-default-scoped-permission), they can't upgrade any Agents, because no scoped permission grants them Upgrades.

### Troubleshooting

#### A user can't upgrade or configure an Agent

- Check that the user's role has the required permissions:
  - Upgrades in the UI: Agent Upgrade
  - Upgrades through the API: Agent Upgrade and Agent Configuration Management
  - Configuration deployments: Agent Upgrade and Agent Configuration Management
- Check that a scoped permission grants the user access to that feature, with a scope that includes the Agent.
- When the user starts an upgrade or configuration change, open the {{< ui >}}Excluded from deployment{{< /ui >}} tab to see why each Agent was excluded. Agents the user doesn't have access to are listed under {{< ui >}}Outside your access{{< /ui >}}. Agents can also be excluded for other reasons, such as [Remote Agent Management][5] not being enabled.
- If an Agent matches your deployment filter but is listed under {{< ui >}}Outside your access{{< /ui >}}, compare its host tags on the [Host Map][11] with the tags in your filter. Scopes match host tags, but deployment filters match the tags that the Agent reports, and the two can differ.

#### A user can still upgrade or configure an Agent you restricted

Scoped permissions only add access, so another scoped permission might grant it. Check for any of the following scoped permissions that include the Agent:

- Unrestricted scoped permissions, including any with the scope {{< ui >}}Any Agent{{< /ui >}}
- Scoped permissions that list your organization as an Editor under {{< ui >}}Has access{{< /ui >}}
- Scoped permissions granted to a team or role that the user belongs to
- The Default scoped permission

#### An upgrade schedule skipped some Agents

[Upgrade schedules][6] run with the access of the user who created them. Each time a schedule runs, it skips Agents outside that user's upgrade access, without a warning. The default upgrade schedule is not affected.

To fix this, give the schedule's creator access to the skipped Agents, or have a user with access recreate the schedule. Editing the schedule doesn't change whose access it runs with.

### Limitations

- Scoped permissions do not restrict viewing. To keep sensitive values out of Agent configurations, use [secrets management][7].
- Scoped permissions do not apply to flares, failover policies, Kubernetes deployments, or Agent installation.
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
[9]: /account_management/teams/manage/#team-hierarchies
[10]: /opentelemetry/setup/ddot_collector/install/
[11]: /infrastructure/hostmap/
[12]: /infrastructure/list/
