---
title: Team Management
description: Customize team pages, manage membership, set up subteams, and configure team access through identity providers or SAML attribute mapping.
---

## Team detail

Each team has a detail page that displays information about the team, its members, and its associated resources. Navigate to a team detail page by clicking on a team from the [Teams directory][1].

The team page displays the following resources associated with your team:
- Dashboards
- Notebooks
- Monitors
- Services
- Links
- Ongoing incidents
- API endpoints

You can change which resources are shown and their order on the page.

Customize the look of your team by choosing an emoji avatar and banner. The emoji avatar displays next to the team name in lists across Datadog.

See the following instructions to customize your team.

### Customize layout

To modify the team page layout, you must have the `user_access_manage` or `teams_manage` permission. Alternately, you can be a team member or team manager of a team that is configured to allow members and managers to edit team details.

1. Click **Page Layout**. The page layout dialog appears.
1. To reorder the resources, click and drag the drag handle icons.
1. To hide a resource, mouse over an item and click the eye (**Hide content**) icon.

Hidden resources appear at the bottom of the page layout dialog. To reveal a resource, mouse over it and click the **Unhide content** icon.

### Customize settings

To modify the team details, you must have the `user_access_manage` or `teams_manage` permission. Alternately, you can be a team member or team manager of a team that is configured to allow members and managers to edit team details.

Click **Settings**. The settings dialog appears.

From the settings dialog, use the menu to customize the following team settings:
- Members
- Links
- Name and description
- Avatar and banner
- Page layout
- Permissions
- Notifications
- GitHub connection

## Team membership

### Team manager

To differentiate members of your team, designate some of them as team managers. In the member list, a "TEAM MANAGER" badge appears next to team managers' names.

### Team modification permissions

Under the team's settings, in the **Permissions** tab, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

The list is sorted in order of increasing permissiveness. Each option in the list includes the group in the entries above it. For example, selecting "team managers" means that both team managers and users with `user_access_manage` can modify membership.

The option that you select for which users can add and remove members determines whether you can add the team to access control lists. Two types of teams exist: invite only teams and open teams.

Invite only teams
: Teams with restricted membership. Can be set as access control recipients. Created when you restrict team membership modification to one of the first three options.

Open teams
: Teams with unrestricted membership. Cannot be set as access control recipients. Created when you allow **Anyone in the organization** to modify team membership.

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. Set default rules with the **Default Settings** button on the team directory page. Override these policies for an individual team on the team details panel.

### Teams managed outside Datadog

In some cases, a team's membership cannot be directly modified within Datadog by anyone (including a user with `user_access_manage`):
- If your org has selected SAML as the only team provisioning source, then the SAML team mappings control team membership. You cannot modify the team membership through Datadog.
- If a team is managed through an identity provider, then the identity provider controls team membership. You cannot modify the team membership through Datadog.

### Subteams (hierarchical teams)

With subteams, you can nest teams within each other to mimic your company's hierarchy in Datadog, allowing for a more complete and accurate ownership model. Subteams also provide an enhanced filtering experience; select a larger team (like a director-level group) to find all the data connected to any of its subteams.
    {{< img src="account_management/teams/teams_filter_hierarchies.png" alt="Filter Hierarchical Teams" >}}
    
On the **Subteams** tab, you can add and remove existing teams. For a clear view of a team's place in its hierarchy, go to [ **Teams** > **Map View**][4], then search for the team by name.
To automate subteam management based on your organization’s hierarchical structure, use the [Teams APIs][5].

## Manage teams through an identity provider

When you set up a managed team, you configure the following properties of the team externally through an identity provider integration:
 - Team name
 - Team handle
 - Team membership (synchronized from the corresponding identity provider group)

To ensure that managed teams stay consistent with their configuration in your identity provider, you must make changes to managed properties in the identity provider, not through the Datadog site or API.

Datadog supports Okta and other SCIM-compliant identity providers for managed teams.

For more information on the capabilities of managed teams and how to set them up, see [SCIM][3].

## SAML attribute mapping

To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][2].

## Delegate team management

For an open membership model, configure your default team settings so **Anyone in the organization** can add or remove members. Assign the `teams_manage` permission to the appropriate roles to let anyone create teams or edit team details.

If you prefer a team-driven membership model, set your default team settings so **Team Managers** or **Team Managers and Members** can add or remove members. Assign the `teams_manage` permission to a role containing all of your team managers.

To enforce a strict membership model, configure your default team settings so **Only users with user_access_manage** can add or remove members. Assign the `teams_manage` permission only to organization administrators.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /account_management/scim/
[4]: https://app.datadoghq.com/teams/map
[5]: /api/latest/teams/#add-a-member-team
