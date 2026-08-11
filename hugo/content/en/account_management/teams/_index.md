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

1. On the [team directory page][1], click {{< ui >}}New Team{{< /ui >}} at the upper right.
1. Choose a {{< ui >}}Team Name{{< /ui >}}.
1. The {{< ui >}}Handle{{< /ui >}} populates based on your team name.
1. Use the dropdown menu to select team members and team managers.
1. Provide an optional {{< ui >}}Description{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}}.

**Notes**: 

- Allowed characters for team names are `a-z`, `A-Z`, `0-9`, and `._-:/`. Replace spaces with underscores. 
- Allowed characters for team handles are `a-z`, `0-9`, and `._-:/`. The last character cannot be an underscore.

### Modify team

1. On the [team directory page][1], click the team you wish to modify. The [team detail page][3] appears. 
1. Click the {{< ui >}}Settings{{< /ui >}} cog at the top of the screen. A pop-up window appears.
1. Select the item you wish to modify.
1. Make your changes, then click {{< ui >}}Save{{< /ui >}}.

### Choose provisioning source

Choose from three options to determine how admins and team managers may update team membership:

UI and API
: Update membership through UI actions and API calls only

SAML
: Use a *SAML strict* model so the identity provider data determines team membership

All sources
: Use SAML as a starting point, and allow overrides through the UI and API

1. On the [team directory page][1], click {{< ui >}}Teams Settings{{< /ui >}}.
1. Select one of the options under {{< ui >}}Team Provisioning Sources{{< /ui >}}.

If you have teams with existing members, picking the SAML strict option overrides your settings and removes team members from those teams. Picking the All Sources option preserves existing memberships. To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][4].

## Team hierarchies

Nest teams within each other (subteams) to mirror your organization's structure, and visualize the result as a Teams map. To define hierarchical relationships between teams with GitHub Teams, the Teams API, Terraform, or the Datadog UI, see [Team hierarchies][39].

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
- [Catalog][9]
- [Service Level Objectives][10]
- Synthetic Tests, Global Variables, Private Locations

### Send notifications to a specific communication channel 

Add a notification channel to your Team to route alerts to communication channels such as Slack or Microsoft Teams. Monitor alerts targeting `@team-<handle>` are redirected to the selected channel. 

1. On the [team directory page][1], click the team you wish to modify. 
1. Click the {{< ui >}}Settings{{< /ui >}} cog at the top of the screen. A pop-up window appears.
1. Select {{< ui >}}Notifications{{< /ui >}}.
1. Add a channel, then click {{< ui >}}Save{{< /ui >}}.

## Team filter

The team filter scopes your view to the teams you select. It appears on list pages across Datadog, and on dashboards and notebooks as a [template variable][40] on the `team` tag key.

The filter combines two kinds of values in one control:

- **Teams**: Datadog Teams defined in your organization. The filter offers every team in your organization, not only the teams you belong to.
- **Team tags**: `team` tag values found on your data that have no matching Datadog Team. These appear in a section below the teams.

{{< img src="account_management/teams/teams_filter_hierarchies2.png" alt="Team filter dropdown showing a team hierarchy at the top and an All Teams section below, with a search box above both" style="width:35%;" >}}

The team filter works by adding team-based search terms to the search query. After you make a selection, you can see the team-based search terms it adds in the search bar. To stop filtering by team, clear your selection.

Each section of the filter lists up to 50 items, sorted alphabetically. To reach a value beyond that limit, search for it.

### Pin your selection

Pin the team filter to carry your selection to the other pages you open. The pin sits at the top of the team filter and behaves like the time range pin.

- Changing your selection while the filter is pinned changes what carries across pages.
- Unpinning the filter means each page opens with no team selected.

Pinned selections are stored in your browser, on the device where you set them. They are not stored on your Datadog account, so opening Datadog in a different browser or on a different machine starts with no team selected.

Opening a link that carries team selections applies those selections to that view without replacing your own stored selection. To return the filter to your stored selection, click {{< ui >}}Reapply{{< /ui >}}.

### Select a team with or without its subteams

Clicking a team selects that team and every team beneath it in the [team hierarchy][39].

To select a team without cascading to the whole branch, shift+click the team. Two additional options appear:

- **The team on its own**: selects the team and excludes its subteams. Use this to see the data attributed to one team node without the aggregate of everything below it.
- **The subteams without the team**: selects everything beneath the team and excludes the team itself. Teams added to that branch later are included automatically.

The first few times you open the team filter, a hint in the dropdown points out shift+click.

### Search for a team

Search matches your term as a substring anywhere in the value, and matching is case-insensitive. Both the team handle and the display name are searched, so a team named `Payments` with the handle `payments-platform` matches either term.

To match a value exactly, wrap the term in double quotes. With the teams `a`, `aa`, and `aaa`, searching for `a` returns all three, and searching for `"a"` returns only `a`.

### Supported products

The following table describes the products in which you can use the team filter:

| Product List Page              | Filter basis                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | Service owned by teams (determined by ownership inside the [Catalog][12]) |
| [Apps][21]                     | Team handle                                                                        |
| [Case Management projects][22] | Team handle                                                                        |
| [Connections][23]              | Team handle                                                                        |
| [Connection Groups][24]        | Team handle                                                                        |
| [Cross Org Connections][25]    | Team handle                                                                        |
| [Datastores][26]               | Team handle                                                                        |
| [Data Streams Monitoring][18]  | Team handle                                                                        |
| [Dashboards][11]               | Team handle                                                                        |
| [Incidents][13]                | Team handle                                                                        |
| [Integrations][27]             | Team handle                                                                        |
| [Logs Error Tracking][16]      | Service owned by teams (determined by ownership inside the [Catalog][12]) |
| [Logs Pipelines][28]           | Team handle                                                                        |
| [Monitors][14]                 | Team handle                                                                        |
| [Notebooks][20]                | Team handle                                                                        |
| [Observability Pipelines][29]  | Team handle                                                                        |
| [On-Call][30]                  | Service owned by teams (determined by ownership inside the [Catalog][12]) |
| [Powerpacks][32]               | Team handle                                                                        |
| [Private Action Runner][31]    | Team handle                                                                        |
| [Reference tables][33]         | Team handle                                                                        |
| [Resource Catalog][8]          | Team handle                                                                        |
| [RUM apps][34]                 | Team handle                                                                        |
| [Security rules][35]           | Team handle                                                                        |
| [Security suppressions][36]    | Team handle                                                                        |
| [Service Level Objectives][17] | Team handle                                                                        |
| [Sheets][37]                   | Team handle                                                                        |
| [Catalog][12]         | Team handle                                                                        |
| [Synthetic Tests][19]          | Team handle                                                                        |
| [Workflows][38]                | Team handle                                                                        |


## Permissions

Any user in a role with the Teams Manage permission can create teams, rename teams, delete teams, and change team handles. Users with `user_access_manage` can add, remove, and promote team members and managers.

## Manage teams

To customize your team, see [Team Management][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /account_management/teams/manage/
[4]: /account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /dashboards/#dashboard-details
[6]: /incident_response/incident_management/
[7]: /monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /internal_developer_portal/catalog/entity_model/
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
[21]: https://app.datadoghq.com/app-builder/apps/list
[22]: https://app.datadoghq.com/cases
[23]: https://app.datadoghq.com/actions/connections
[24]: https://app.datadoghq.com/actions/connections?sort=-updated_at&tab=groups
[25]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[26]: https://app.datadoghq.com/actions/datastores
[27]: https://app.datadoghq.com/integrations
[28]: https://app.datadoghq.com/logs/pipelines
[29]: https://app.datadoghq.com/observability-pipelines
[30]: https://app.datadoghq.com/on-call/summary
[31]: https://app.datadoghq.com/actions/private-action-runners
[32]: /dashboards/widgets/powerpack/#powerpack-permissions
[33]: https://app.datadoghq.com/reference-tables
[34]: https://app.datadoghq.com/rum/list
[35]: https://app.datadoghq.com/security/configuration/notification-rules
[36]: https://app.datadoghq.com/security/configuration/suppressions
[37]: https://app.datadoghq.com/sheets
[38]: https://app.datadoghq.com/workflow
[39]: /account_management/teams/manage/#team-hierarchies
[40]: /dashboards/template_variables/#team-filter
