---
title: Team Management
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

## Team membership

To differentiate members of your team, designate them as team managers. In the member list, a "TEAM MANAGER" badge appears next to team managers' names.

Under the team's settings, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. Set default rules with the **Default Settings** button on the team directory page. Override these policies for an individual team on the team details panel.

## SAML attribute mapping

To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][2].

## Delegate team management

For an open membership model, configure your default team settings so **Anyone in the organization** can add or remove members. Assign the `teams_manage` permission to the appropriate roles to let anyone create teams or edit team details.

If you prefer a team-driven membership model, set your default team settings so **Team Managers** or **Team Managers and Members** can add or remove members. Assign the `teams_manage` permission to a role containing all of your team managers.

To enforce a strict membership model, configure your default team settings so **Only users with user_access_manage** can add or remove members. Assign the `teams_manage` permission only to organization administrators.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /account_management/saml/mapping/#map-saml-attributes-to-teams
