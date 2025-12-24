---
title: Teams
description: Organize team assets, filter Datadog experiences, and manage team membership with team handles, notifications, and resource associations.

further_reading:
  - link: https://www.datadoghq.com/blog/datadog-teams-github-integration
    tag: Blog
    text: Keep service ownership up to date with Datadog Teams' GitHub integration

---

## Overview
Datadog Teams allow groups of users to organize their team assets within Datadog and automatically filter their Datadog-wide experience to prioritize these assets.

Use Teams to link resources such as dashboards, services, monitors, and incidents to a group of users. You can also add team-specific links to Slack channels, Jira boards, GitHub repositories, and more.

Team membership is flexible. Users can join teams, be added by other members, or be added by an administrator. Users can belong to multiple teams.

## Setup

### Navigation

Access the team directory page from [Organization Settings][1] or by navigating to [**Teams**][2]. The [team directory page][1] lists all teams within your organization.

### Create team

1. On the [team directory page][1], click **New Team** at the upper right.
1. Choose a **Team Name**.
1. The **Handle** populates based on your team name.
1. Use the dropdown menu to select team members and team managers.
1. Provide an optional **Description**.
1. Click **Create**.

**Notes**: 

- Allowed characters for team names are `a-z`, `A-Z`, `0-9`, and `._-:/`. Replace spaces with underscores. 
- Allowed characters for team handles are `a-z`, `0-9`, and `._-:/`. The last character cannot be an underscore.

### Modify team

1. On the [team directory page][1], click the team you wish to modify. The [team detail page][3] appears. 
1. Click the **Settings** cog at the top of the screen. A pop-up window appears.
1. Select the item you wish to modify.
1. Make your changes, then click **Save**.

### Choose provisioning source

Choose from three options to determine how admins and team managers may update team membership:

UI and API
: Update membership through UI actions and API calls only

SAML
: Use a *SAML strict* model so the identity provider data determines team membership

All sources
: Use SAML as a starting point, and allow overrides through the UI and API

1. On the [team directory page][1], click **Teams Settings**.
1. Select one of the options under **Team Provisioning Sources**.

If you have teams with existing members, picking the SAML strict option overrides your settings and removes team members from those teams. Picking the All Sources option preserves existing memberships. To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][4].

## Team handle

A team handle links teams to Datadog resources. Team handles appear in search bars and facets in the format `team:<team-handle>` or `teams:<team-handle>`. 

To find a team handle:
1. Click the team's name in the team directory page. The team detail page appears.
1. The team handle appears to the right of the name, at the top of the page.

To associate a resource with a defined team, a Team must exist in Datadog with a matching team handle. When you click on a resource associated with a defined team, a small window appears with the team handle and additional information. Defined teams provide additional functionality such as the Team filter below. 

Team handles that aren't associated with a defined team in Datadog behave similarly to tags. Convert any undefined team handles to defined teams to take advantage of Teams features.

### Associate resources with team handles

Datadog supports associating the following resources with team handles:

- [Dashboards][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [Service Level Objectives][10]
- Synthetic Tests, Global Variables, Private Locations

### Send notifications to a specific communication channel 

Add a notification channel to your Team to route alerts to communication channels such as Slack or Microsoft Teams. Monitor alerts targeting `@team-<handle>` are redirected to the selected channel. 

1. On the [team directory page][1], click the team you wish to modify. 
1. Click the **Settings** cog at the top of the screen. A pop-up window appears.
1. Select **Notifications**.
1. Add a channel, then click **Save**.

## Team filter

The team filter tailors your experience across Datadog by showing you content associated with your teams. The **My Teams** list includes teams you are a member of and teams you selected as a favorite.

{{< img src="/account_management/teams/team-filter.png" alt="Monitor list page with red box around the team filter. Two out of three My Teams selected.">}}

When you enable the team filter, you see only the resources associated with your teams or with the services owned by your teams. The team filter state is global and persistent, so Datadog applies your team context as you navigate across different products.

The team filter works by adding team-based search terms to the search query. When you enable the team filter, you can see the team-based search terms it adds in the search bar.

### Favorite teams

You may be interested in a particular team's resources without being a member of that team. Adding a team to your favorite teams allows you to get filtered views on that team's resources without joining the team.

Your favorite teams appear alongside teams you belong to at the top of the team directory page and in the team filter.

#### Add or remove favorite teams

You can add or remove a team from your favorites from the team directory page or from the team filter.

From the [team directory page][1]:
1. Click the team you wish to add as a favorite. The [team detail page][3] appears.
1. Click **Add Favorite** or **Remove Favorite** in the upper right.

Alternatively, also from the team directory page:
1. Hover over the team you wish to add or remove. Inline icons appear to the right of the team name.
1. Click the star (**Add to Favorites** or **Remove from Favorites**) icon.

From the team filter:
1. If the filter is collapsed, click **My Teams** to expand it.
1. Click **Add Favorites**. A search box and list of teams appear.
1. To narrow the list of teams, start typing a team name in the search box.
1. Click the star next to the desired team to add or remove it from your favorites.

### Supported products

The following table describes the products in which you can use the team filter:

| Product List Page       | Filter basis                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][11]         | Team handle                                                                      |
| [Resource Catalog][8]   | Team handle                                                                      |
| [Software Catalog][12]    | Team handle                                                                      |
| [Incidents][13]          | Team handle                                                                      |
| [Monitors][14]          | Team handle                                                                      |
| [APM Error Tracking][15] | Service owned by teams (determined by ownership inside the [Software Catalog][12]) |
| [Logs Error Tracking][16] | Service owned by teams (determined by ownership inside the [Software Catalog][12]) |
| [Service Level Objectives][17] | Team handle                                                                 |
| [Data Streams Monitoring][18]  | Team handle                                                                 |
| [Synthetic Tests][19]          | Team handle                                                                 |
| [Notebooks][20]          | Team handle                                                                      |


## Permissions

Any user in a role with the Teams Manage permission can create teams, rename teams, delete teams, and change team handles. Users with `user_access_manage` can add, remove, and promote team members and managers.

## Manage teams

To customize your team, see [Team Management][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /account_management/teams/manage/
[4]: /account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /dashboards/#dashboard-details
[6]: /service_management/incident_management/
[7]: /monitors/configuration/?tab=thresholdalert#add-metadata
[8]: /infrastructure/resource_catalog/
[9]: /tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /service_level_objectives/#slo-tags
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://app.datadoghq.com/services
[13]: https://app.datadoghq.com/incidents
[14]: https://app.datadoghq.com/monitors/manage
[15]: https://app.datadoghq.com/apm/error-tracking
[16]: https://app.datadoghq.com/logs/error-tracking
[17]: https://app.datadoghq.com/slo/manage
[18]: https://app.datadoghq.com/data-streams
[19]: https://app.datadoghq.com/synthetics
[20]: https://app.datadoghq.com/notebook/list/
