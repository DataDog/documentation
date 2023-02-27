---
title: Teams
kind: documentation
---

## Overview
Datadog Teams allow groups of users to organize their team assets within Datadog and automatically filter their Datadog-wide experience to prioritize these assets.

Use Teams to link resources such as dashboards, services, monitors, and incidents to a group of users. You can also add team-specific links to Slack channels, Jira boards, and GitHub repositories.

Team membership is flexible. Users can join teams or be added by an administrator. Users can belong to multiple teams. 

## Setup

### Navigation

To find the [Team directory page][1]: 

1. Navigate to **Organization Settings** from your account menu.
1. Under **Groups**, select **Teams**.

The [Team directory page][1] lists all teams within your organization. Use the **Only My Teams** slider in the upper right to toggle the view between your teams and all teams in the organization.

{{< img src="account_management/teams-directory.png" alt="Organization Settings page, Teams tab, showing a panel highlighting the Caching team" >}}

### Create team

1. On the [Team directory page][1], click **New Team** at the upper right.
1. Choose a **Team Name**.
1. The **Handle** populates based on your team name.
1. Optionally, choose an **Avatar Color**.
1. Provide an optional **Summary**.
1. Use the drop-down to select team members.
1. Click **Create**.

### Modify team

1. On the [Team directory page][1], click the team you would like to modify. A side panel appears with the team details.
1. Mouse over the item you wish to modify. A pencil icon appears.
1. Click the pencil icon. A pop-up window appears.
1. Make your changes, then click the appropriate button to save your changes.

## Team handle

A team handle links teams to Datadog resources. Team handles appear in search bars and facets in the format `team:<team-name>`. 

To find a team handle:
1. Click the team's name in the Team directory page. A side panel appears with team details.
1. Look for the **handle** field at the top of the panel. 

To associate a resource with a defined team, a Team must exist in Datadog with a matching team handle. When you click on a resource associated with a defined team, a small window appears with the team handle and additional information. Defined teams provide additional functionality such as the Team filter below. 

Team handles that aren’t associated with a defined team in Datadog have a tag-like experience. Convert any undefined team handles to defined teams to take advantage of Teams features. 

### Associate resources with team handles

Datadog supports associating the following resources with team handles:

- Dashboards
- Service Catalog
- Incidents
- Monitors

## Filter

The team filter tailors user experiences to content associated with their team.

The team filter appears in two places in each list view: 
- A list of search facets at the top left
- A search term in the search bar

Enabling a team filter refines the list of resources based on a user's team memberships or the services owned by their teams. The team filter provides a global and persistent context that follows a user’s journey across products.

The table below describes the products in which you can use the team filter:

| Product List Page       | Filter basis                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][2]         | Team handle                                                                      |
| [Service Catalog][3]    | Team handle                                                                      |
| [Incidents][4]          | Team handle                                                                      |
| [Monitors][5]           | Team handle                                                                      |
| [APM Error Tracking][6] | Service owned by teams (determined by ownership inside the [Service Catalog][3]) |


## Permissions

Any user in a role with the Teams Manage permission can create teams, rename teams, delete teams, and change team handles.

### Team membership

To differentiate members of your team, designate them as team managers. In the member list, team managers have a key icon next to their names. 

Under the team's settings, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. These policies can be overridden for individual teams.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/incidents
[5]: https://app.datadoghq.com/monitors/manage
[6]: https://app.datadoghq.com/apm/error-tracking
