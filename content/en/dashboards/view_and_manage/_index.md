---
title: View and Manage
kind: Documentation
disable_toc: false
further_reading:
- link: "dashboards/"
  tag: "Documentation"
  text: "Dashboards Overview"
- link: "dashboards/guide/maintain-relevant-dashboards"
  tag: "Guide"
  text: "Best practices for maintaining relevant dashboards"
- link: "service_management/mobile/"
  tag: "Documentation"
  text: "Datadog Mobile App"
---

## Overview

Search, view, or create dashboards and lists on the [Dashboard List][4] page.

- Dashboard List page, see the list of dashboards in your organization, either custom created or available as an out-of-the-box integration dashboard. 
- Use the **All Dashboards** table to sort, search, and group your lists. 
- Organize your dashboard views through lists.

Take dashboard views wherever you go with Mobile views.


## View all dashboards

The **All Dashboards** table lists dashboards in your Datadog organization, either custom created or available as an out-of-the-box dashboard. Use the table to [bulk edit Teams](#teams) associated to dashboards or [add dashboards to lists](#dashboard-list).

By default, starred dashboards are listed at the top. You can sort by column headers *Name*, *Modified*, and *Popularity*. All columns with descriptions are listed below:

| Column     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | All dashboards starred by the current user.                                              |
| Name       | The name of the custom or preset dashboard.                                              |
| Author     | The profile icon of the dashboard's creator.                                             |
| Teams      | [Teams][7] assigned to the dashboard.                                                    |
| Modified   | The last modified date of a custom dashboard.                                            |
| Popularity | The relative [popularity](#popularity) of the dashboard for your organization.           |
| Icon       | An icon indicating the type of dashboard (Timeboard or Screenboard).                     |


### Popularity

An organization's most popular dashboard displays five popularity bars. All other dashboards are relative to this dashboard. Popularity is based on the amount of traffic a dashboard receives. Popularity is updated daily; new dashboards have zero popularity bars for up to 24 hours.

**Note**: Traffic to public dashboard URLs is ignored for popularity.

## Teams

Use the **My Teams** toggle to switch between viewing all dashboards and only dashboards owned by your [teams][5].

To edit the teams associated with one or more dashboards, take the following steps:
1. Select the checkbox next to each dashboard you wish to modify.
1. Open the **Edit Teams** dropdown in the upper right.
1. Use the checkboxes to select the appropriate teams for the dashboards.
1. Click **Apply Changes**.

## Dashboard list

Dashboard lists groups dashboards so you and your team can switch between dashboards within the same context. You can add dashboards to [preset lists](#preset-lists) or to a custom list.

1. To create a dashboard list, click **+ New List** in the upper right.
1. Click the pencil icon to change a list's title. The list's title is automatically set with the user's first name. For example, `John's list`. 
1. Add dashboards to a list. In the **[All Dashboards](#view-all-dashboards)** table, check the check boxes next to the Dashboard title. Then click the **Add to** dropdown in the upper right corner of the Dashboard list and select the list.

The left sidebar displays all lists, which you can filter by Team or through search terms. Toggle **Hide Controls** to hide this sidebar.

### Favorite lists

Favorite lists are dashboard lists starred by the current logged in user. **Note**: If you have no starred lists, the *Favorite Lists* category is hidden.

### Preset lists

Preset lists are out-of-the-box dashboard lists in Datadog:

| List                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Custom dashboards made by any team member in your organization's account. |
| All Hosts                | Automatic dashboards created by Datadog when you add a host.              |
| All Integrations         | Automatic dashboards created by Datadog when you install an integration.  |
| All Shared               | Dashboards with authenticated or public link sharing enabled.             |
| Created By You           | Custom dashboards created by the current user.                            |
| Frequently Viewed By You | All dashboards frequently viewed by the current user.                     |
| Recently Deleted         | Dashboards deleted within the last 30 days. [Restore deleted dashboards](#restore-deleted-dashboards) from this list.|
| Security and Compliance  | Out-of-the-box Security dashboards.                                       |

### Restore deleted dashboards

Use the preset **Recently Deleted** list to restore deleted dashboards. From the list, select all dashboards to restore and click **Restore to**. Select a specific list to restore the dashboards to, or select **All Custom** to restore them without a custom list. Dashboards in **Recently Deleted** are permanently deleted after 30 days.

{{< img src="dashboards/recently_deleted.png" alt="Restore deleted dashboard" style="width:100%;">}}

## View dashboards on mobile devices

View your dashboards in a mobile-friendly format with the Datadog Mobile App. The Mobile App comes equipped with mobile home screen widgets which allow you to monitor service health and infrastructure without opening the mobile app. 

**Note**: To set up or edit a dashboard, you must log in to the Datadog browser UI. For more information on installing the app, see the [Datadog Mobile App][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists
[5]: /account_management/teams/
[6]: /dashboards/template_variables/#saved-views
[7]: /account_management/teams/