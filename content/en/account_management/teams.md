---
title: Teams
kind: documentation
---

<div class="alert alert-warning">The Teams feature is in beta and is not yet generally available.</div>

## Overview
Datadog Teams allow groups of users to organize their team assets within Datadog and automatically filter their Datadog-wide experience to prioritize these assets.

Use Teams to link resources such as dashboards, services, monitors, and incidents to a group of users. You can also add team-specific links to Slack channels, Jira boards, GitHub repositories, and more.

Team membership is flexible. Users can join teams, be added by other members, or be added by an administrator. Users can belong to multiple teams.

## Setup

### Navigation

To find the [team directory page][1]:

1. Navigate to **Organization Settings** from your account menu.
1. Under **Groups**, select **Teams**.

The [team directory page][1] lists all teams within your organization. Use the **Only My Teams** slider in the upper right to toggle the view between your teams and all teams in the organization.

{{< img src="account_management/teams-directory.jpg" alt="Organization Settings page, Teams tab, showing a panel highlighting the Caching team" >}}

### Create team

1. On the [team directory page][1], click **New Team** at the upper right.
1. Choose a **Team Name**.
1. The **Handle** populates based on your team name.
1. Provide an optional **Description**.
1. Use the dropdown menu to select team members.
1. Click **Create**.

### Modify team

1. On the [team directory page][1], click the team you would like to modify. A side panel appears with the team details.
1. Mouse over the item you wish to modify. A pencil icon appears.
1. Click the pencil icon. A pop-up window appears.
1. Make your changes, then click the appropriate button to save your changes.

## Team handle

A team handle links teams to Datadog resources. Team handles appear in search bars and facets in the format `team:<team-handle>` or `teams:<team-handle>`. 

To find a team handle:
1. Click the team's name in the team directory page. A side panel appears with team details.
1. Look for the **handle** field at the top of the panel. 

To associate a resource with a defined team, a Team must exist in Datadog with a matching team handle. When you click on a resource associated with a defined team, a small window appears with the team handle and additional information. Defined teams provide additional functionality such as the Team filter below. 

Team handles that aren’t associated with a defined team in Datadog behave similarly to tags. Convert any undefined team handles to defined teams to take advantage of Teams features.

### Associate resources with team handles

Datadog supports associating the following resources with team handles:

- [Dashboards][2]
- [Incidents][3]
- [Monitors][4]
- [Service Catalog][5]

## Filter

The team filter tailors a user's experiences across Datadog to content associated with their teams.

The team filter appears in two places in each list view: 
- A list of search facets at the top left
- A search term in the search bar


When a user enables a team filter, they see only the resources associated with their teams or with the services owned by their teams. The team filter state is global and persistent. Therefore, Datadog maintains team context across a user's navigation journey over all applicable products.

The table below describes the products in which you can use the team filter:

| Product List Page       | Filter basis                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][7]         | Team handle                                                                      |
| [Service Catalog][8]    | Team handle                                                                      |
| [Incidents][9]          | Team handle                                                                      |
| [Monitors][10]           | Team handle                                                                      |
| [APM Error Tracking][11] | Service owned by teams (determined by ownership inside the [Service Catalog][8]) |
| [Logs Error Tracking][12] | Service owned by teams (determined by ownership inside the [Service Catalog][8]) |


## Permissions

Any user in a role with the Teams Manage permission can create teams, rename teams, delete teams, and change team handles. Users with `user_access_manage` can add, remove, and promote team members and managers.

## Manage teams

### Team membership

To differentiate members of your team, designate them as team managers. In the member list, a "TEAM MANAGER" badge appears next to team managers' names.

Under the team's settings, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. Set default rules with the **Default Settings** button on the team directory page. Override these policies for an individual team on the team details panel.

### Delegate team management

For an open membership model, configure your default team settings so **Anyone in the organization** can add or remove members. Assign the `teams_manage` permission to the appropriate roles to let anyone create teams or edit team details.

If you prefer a team-driven membership model, set your default team settings so **Team Managers** or **Team Managers and Members** can add or remove members. Assign the `teams_manage` permission to a role containing all of your team managers.

To enforce a strict membership model, configure your default team settings so **Only users with user_access_manage** can add or remove members. Assign the `teams_manage` permission only to organization administrators.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /dashboards/#edit-details
[3]: /monitors/incident_management/incident_details#overview-section
[4]: /monitors/configuration/?tab=thresholdalert#add-metadata
[5]: /tracing/service_catalog/setup#add-service-definition-metadata
[6]: /monitors/service_level_objectives/#slo-tags
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/incidents
[10]: https://app.datadoghq.com/monitors/manage
[11]: https://app.datadoghq.com/apm/error-tracking
[12]: https://app.datadoghq.com/logs/error-tracking
