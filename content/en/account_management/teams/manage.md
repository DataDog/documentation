---
title: Team Management
description: Customize team pages, manage membership, set up subteams, and configure team access through identity providers or SAML attribute mapping.
---

## Team detail

Each team has a detail page that displays information about the team, its members, and its associated resources. Navigate to a team detail page by clicking on a team from the [Teams directory][1].

The team detail page is organized into three tabs:

- **Info**: Core team details and membership.
- **Resources**: The Datadog resources associated with the team.
- **On-Call**: The team's [Datadog On-Call][6] configuration.

The team header displays the team's avatar, banner, name, and description. Customize the look of your team by choosing an emoji avatar and banner. The emoji avatar displays next to the team name in lists across Datadog.

### Info tab

Core team details: notification channels, links, connections, hierarchy (parent team and subteams), and members.

### Resources tab

The Datadog resources the team owns, grouped by area such as productivity, software, performance, and cloud cost. If the team has subteams, use the **Include Subteams** toggle to show their resources alongside the team's own.

### On-Call tab

The team's [Datadog On-Call][6] setup: members, schedules, escalation policies, routing, and handover automation.

### Customize settings

To modify a team's details, you must have the `user_access_manage` or `teams_manage` permission. Alternately, you can be a team member or team manager of a team that is configured to allow members and managers to edit team details.

Edit a team's details directly from its detail page:

- **Avatar, name, and description**: Mouse over the team name and click the edit (pencil) icon.
- **Banner**: Mouse over the banner and click the edit (pencil) icon.
- **Info tab sections**: Mouse over a section, such as Links, Members, or Notification Channels, and click its edit icon to update it in place.

Use the Settings (gear) menu in the team header for the following actions:

- **Configure Notifications**: Add or update the team's notification channels. Supported targets include Slack, Microsoft Teams, PagerDuty, email, and ServiceNow.
- **Edit Roles and Permissions**: Manage the roles and permissions associated with the team.
- **Edit Team Handle**: Change the team's handle.
- **Edit Connections**: Connect the team to external systems. Connect a **GitHub team** to associate the Datadog team with a GitHub team, or connect a **ServiceNow assignment group** to route incidents and change requests automatically.
- **Join Team** or **Leave Team**: Add yourself to or remove yourself from the team.

## Team membership

### Team manager

To differentiate members of your team, designate some of them as team managers. In the member list, a "TEAM MANAGER" badge appears next to team managers' names.

### Team modification permissions

In the team's roles and permissions settings, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

The list is sorted in order of increasing permissiveness. Each option in the list includes the group in the entries above it. For example, selecting "team managers" means that both team managers and users with `user_access_manage` can modify membership.

The option that you select for which users can add and remove members determines whether you can add the team to access control lists. Two types of teams exist: invite only teams and open teams.

Invite only teams
: Teams with restricted membership. Can be set as access control recipients. Created when you restrict team membership modification to one of the first three options.

Open teams
: Teams with unrestricted membership. Cannot be set as access control recipients. Created when you allow {{< ui >}}Anyone in the organization{{< /ui >}} to modify team membership.

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. Set default rules with the {{< ui >}}Default Settings{{< /ui >}} button on the team directory page. Override these policies for an individual team on the team details panel.

### Teams managed outside Datadog

In some cases, a team's membership cannot be directly modified within Datadog by anyone (including a user with `user_access_manage`):
- If your org has selected SAML as the only team provisioning source, then the SAML team mappings control team membership. You cannot modify the team membership through Datadog.
- If a team is managed through an identity provider, then the identity provider controls team membership. You cannot modify the team membership through Datadog.

A team that is managed externally from an identity provider displays a **Managed** badge in its header.

### Subteams (hierarchical teams)

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
This feature is not supported for your selected Datadog site ({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

With subteams, you can nest teams within each other to mimic your company's hierarchy in Datadog, allowing for a more complete and accurate ownership model. Subteams also provide an enhanced filtering experience; select a larger team (like a director-level group) to find all the data connected to any of its subteams.
    {{< img src="account_management/teams/teams_filter_hierarchies.png" alt="Filter Hierarchical Teams" >}}

A team's subteams appear in the **Hierarchy** section of its Info tab.
To automate subteam management based on your organization's hierarchical structure, use the [Teams APIs][5].

## Manage teams through an identity provider

When you set up a managed team, you configure the following properties of the team externally through an identity provider integration:
 - Team name
 - Team handle
 - Team membership (synchronized from the corresponding identity provider group)

To keep managed teams consistent with their configuration in your identity provider, make changes to managed properties in the identity provider rather than through the Datadog site or API.

Datadog supports Okta and other SCIM-compliant identity providers for managed teams.

For more information on the capabilities of managed teams and how to set them up, see [SCIM][3].

## SAML attribute mapping

To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][2].

## Delegate team management

For an open membership model, configure your default team settings so {{< ui >}}Anyone in the organization{{< /ui >}} can add or remove members. Assign the `teams_manage` permission to the appropriate roles to let anyone create teams or edit team details.

If you prefer a team-driven membership model, set your default team settings so {{< ui >}}Team Managers{{< /ui >}} or {{< ui >}}Team Managers and Members{{< /ui >}} can add or remove members. Assign the `teams_manage` permission to a role containing all of your team managers.

To enforce a strict membership model, configure your default team settings so {{< ui >}}Only users with user_access_manage{{< /ui >}} can add or remove members. Assign the `teams_manage` permission only to organization administrators.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /account_management/scim/
[5]: /api/latest/teams/#add-a-member-team
[6]: /incident_response/on-call/
